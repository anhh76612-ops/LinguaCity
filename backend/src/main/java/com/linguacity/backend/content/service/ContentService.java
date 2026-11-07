package com.linguacity.backend.content.service;

import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.content.dto.ContentDtos.*;
import com.linguacity.backend.content.entity.*;
import com.linguacity.backend.content.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.Clock;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Phân phối nội dung tĩnh theo gói (ADR-012, system-design §10.3.1, §10.4.1).
 * <ul>
 *   <li>{@code CORE}: dữ liệu thế giới dùng chung (nhỏ).</li>
 *   <li>{@code <BUILDING>:<level>}: từ vựng + câu hỏi (không đáp án) + bài thi của Level đó.</li>
 * </ul>
 */
@Service
@Transactional(readOnly = true)
public class ContentService {

    public static final String SCOPE_GLOBAL = "GLOBAL";
    public static final String CORE = "CORE";

    private final ContentPackRepository packs;
    private final ThemeRepository themes;
    private final BuildingRepository buildings;
    private final BuildingThemeRepository buildingThemes;
    private final BuildingLevelRepository buildingLevels;
    private final BlueprintRepository blueprints;
    private final VocabularyRepository vocabularies;
    private final QuestionRepository questions;
    private final QuestionVocabularyRepository questionVocabularies;
    private final ExamRepository exams;
    private final ExamRequirementRepository examRequirements;
    private final ExamQuestionRepository examQuestions;
    private final ObjectMapper json;
    private final Clock clock;

    public ContentService(ContentPackRepository packs, ThemeRepository themes, BuildingRepository buildings,
                          BuildingThemeRepository buildingThemes, BuildingLevelRepository buildingLevels,
                          BlueprintRepository blueprints, VocabularyRepository vocabularies,
                          QuestionRepository questions, QuestionVocabularyRepository questionVocabularies,
                          ExamRepository exams, ExamRequirementRepository examRequirements,
                          ExamQuestionRepository examQuestions, ObjectMapper json, Clock clock) {
        this.packs = packs;
        this.themes = themes;
        this.buildings = buildings;
        this.buildingThemes = buildingThemes;
        this.buildingLevels = buildingLevels;
        this.blueprints = blueprints;
        this.vocabularies = vocabularies;
        this.questions = questions;
        this.questionVocabularies = questionVocabularies;
        this.exams = exams;
        this.examRequirements = examRequirements;
        this.examQuestions = examQuestions;
        this.json = json;
        this.clock = clock;
    }

    /** Danh sách gói và version — app so với Room để biết gói nào cần tải lại. */
    public Manifest manifest() {
        Map<Long, String> codeById = buildingCodes();
        List<PackRef> refs = packs.findByScopeOrderByIdAsc(SCOPE_GLOBAL).stream()
                .map(p -> new PackRef(p.getCode(), codeById.get(p.getBuildingId()), p.getLevel(), p.getVersion()))
                .toList();
        return new Manifest(Instant.now(clock), refs);
    }

    public Core core() {
        ContentPack pack = packs.findByScopeAndCode(SCOPE_GLOBAL, CORE)
                .orElseThrow(() -> packNotFound(CORE));
        List<Building> allBuildings = buildings.findAllByOrderBySortOrderAsc();
        Map<Long, String> buildingCode = allBuildings.stream()
                .collect(Collectors.toMap(Building::getId, Building::getCode));
        Map<Long, String> themeCode = themes.findAll().stream()
                .collect(Collectors.toMap(Theme::getId, Theme::getCode));
        Map<Long, List<String>> themesOfBuilding = buildingThemes.findAll().stream()
                .collect(Collectors.groupingBy(bt -> bt.getId().getBuildingId(), TreeMap::new,
                        Collectors.mapping(bt -> themeCode.get(bt.getId().getThemeId()), Collectors.toList())));

        List<ThemeDto> themeDtos = themes.findAll().stream()
                .sorted(Comparator.comparing(Theme::getId))
                .map(t -> new ThemeDto(t.getId(), t.getCode(), t.getName(), t.getDescription()))
                .toList();
        List<BuildingDto> buildingDtos = allBuildings.stream()
                .map(b -> new BuildingDto(b.getId(), b.getCode(), b.getName(), b.getMaxLevel(), b.getSortOrder(),
                        themesOfBuilding.getOrDefault(b.getId(), List.of()).stream().sorted().toList()))
                .toList();
        List<BuildingLevelDto> levelDtos = buildingLevels.findAll().stream()
                .sorted(Comparator.comparing((BuildingLevel l) -> l.getId().getBuildingId())
                        .thenComparing(l -> l.getId().getLevel()))
                .map(l -> new BuildingLevelDto(buildingCode.get(l.getId().getBuildingId()), l.getId().getLevel(),
                        l.getKnowledgeCost(), l.getConstructionTime(), l.getRequiredCollected()))
                .toList();
        List<BlueprintDto> blueprintDtos = blueprints.findAll().stream()
                .sorted(Comparator.comparing(Blueprint::getId))
                .map(b -> new BlueprintDto(b.getId(), b.getCode(), buildingCode.get(b.getBuildingId()), b.getTargetLevel()))
                .toList();

        return new Core(pack.getCode(), pack.getVersion(), themeDtos, buildingDtos, levelDtos, blueprintDtos,
                List.of(), List.of());
    }

    /**
     * Gói (công trình, level): từ có level đó thuộc các chủ đề của công trình, câu hỏi TARGET của các từ đó,
     * và bài thi lên level + 1 (system-design §10.2.1).
     */
    public Pack pack(String buildingCode, int level) {
        String code = buildingCode + ":" + level;
        Building building = buildings.findByCode(buildingCode).orElseThrow(() -> packNotFound(code));
        ContentPack pack = packs.findByScopeAndBuildingIdAndLevel(SCOPE_GLOBAL, building.getId(), level)
                .orElseThrow(() -> packNotFound(code));

        Map<Long, String> themeCode = themes.findAll().stream()
                .collect(Collectors.toMap(Theme::getId, Theme::getCode));
        List<Long> themeIds = buildingThemes.findByIdBuildingId(building.getId()).stream()
                .map(bt -> bt.getId().getThemeId()).toList();
        List<Vocabulary> vocabs = themeIds.isEmpty() ? List.of()
                : vocabularies.findByThemeIdInAndLevelOrderByIdAsc(themeIds, level);
        Set<Long> vocabIds = vocabs.stream().map(Vocabulary::getId).collect(Collectors.toSet());

        Set<Long> questionIds = vocabIds.isEmpty() ? Set.of()
                : questionVocabularies.findByIdVocabularyIdIn(vocabIds).stream()
                .filter(qv -> "TARGET".equals(qv.getRelationType()))
                .map(qv -> qv.getId().getQuestionId())
                .collect(Collectors.toCollection(TreeSet::new));
        List<Question> qs = questionIds.isEmpty() ? List.of() : questions.findByIdInOrderByIdAsc(questionIds);
        List<QuestionVocabulary> links = questionIds.isEmpty() ? List.of()
                : questionVocabularies.findByIdQuestionIdIn(questionIds);

        return new Pack(pack.getCode(), pack.getVersion(),
                vocabs.stream().map(v -> toDto(v, themeCode)).toList(),
                qs.stream().map(this::toDto).toList(),
                links.stream()
                        .sorted(Comparator.comparing((QuestionVocabulary l) -> l.getId().getQuestionId())
                                .thenComparing(l -> l.getId().getVocabularyId()))
                        .map(l -> new QuestionVocabularyDto(l.getId().getQuestionId(), l.getId().getVocabularyId(),
                                l.getRelationType()))
                        .toList(),
                examsFor(building, level + 1));
    }

    private List<ExamDto> examsFor(Building building, int targetLevel) {
        List<Exam> list = exams.findByBuildingIdAndTargetLevel(building.getId(), targetLevel);
        if (list.isEmpty()) {
            return List.of();
        }
        List<Long> examIds = list.stream().map(Exam::getId).toList();
        Map<Long, ExamRequirement> requirement = examRequirements.findByExamIdIn(examIds).stream()
                .collect(Collectors.toMap(ExamRequirement::getExamId, Function.identity()));
        Map<Long, List<Long>> pool = examQuestions.findByIdExamIdIn(examIds).stream()
                .collect(Collectors.groupingBy(eq -> eq.getId().getExamId(),
                        Collectors.mapping(eq -> eq.getId().getQuestionId(), Collectors.toList())));
        Map<Long, String> blueprintCode = blueprints.findAllById(
                        list.stream().map(Exam::getRewardBlueprintId).toList()).stream()
                .collect(Collectors.toMap(Blueprint::getId, Blueprint::getCode));

        return list.stream().map(e -> {
            ExamRequirement r = requirement.get(e.getId());
            ExamRequirementDto rDto = r == null ? new ExamRequirementDto(0, 0, 0)
                    : new ExamRequirementDto(r.getRequiredCardCount(), r.getRequiredKnowledge(),
                    r.getRequiredBlueprintShards());
            return new ExamDto(e.getId(), e.getCode(), building.getCode(), e.getTargetLevel(),
                    blueprintCode.get(e.getRewardBlueprintId()), e.getQuestionCount(), rDto,
                    pool.getOrDefault(e.getId(), List.of()).stream().sorted().toList());
        }).toList();
    }

    private VocabularyDto toDto(Vocabulary v, Map<Long, String> themeCode) {
        return new VocabularyDto(v.getId(), v.getWord(), v.getMeaning(), v.getWordType(), v.getIpa(),
                stringList(v.getExamples()), v.getImageUrl(), themeCode.get(v.getThemeId()), v.getLevel(),
                v.getDifficultyRank());
    }

    /** Cố ý không đọc answer / acceptedAnswers / explanation (NFR-01). */
    private QuestionDto toDto(Question q) {
        return new QuestionDto(q.getId(), q.getContentType(), q.getSkill(), q.getQuestionType(), q.getTier(),
                q.getQuestionText(), q.getAudioUrl(), node(q.getMetadata()));
    }

    private Map<Long, String> buildingCodes() {
        return buildings.findAll().stream().collect(Collectors.toMap(Building::getId, Building::getCode));
    }

    private List<String> stringList(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of();
        }
        return json.readValue(raw, new TypeReference<List<String>>() {
        });
    }

    private JsonNode node(String raw) {
        return raw == null || raw.isBlank() ? null : json.readTree(raw);
    }

    private static ApiException packNotFound(String code) {
        return new ApiException(HttpStatus.NOT_FOUND, "PACK_NOT_FOUND", "Content pack not found: " + code);
    }
}
