package com.linguacity.backend.progression;

import com.linguacity.backend.achievement.entity.Achievement;
import com.linguacity.backend.achievement.repository.AchievementRepository;
import com.linguacity.backend.city.entity.UserBlueprint;
import com.linguacity.backend.city.entity.UserBuilding;
import com.linguacity.backend.city.repository.UserBlueprintRepository;
import com.linguacity.backend.city.repository.UserBuildingRepository;
import com.linguacity.backend.content.entity.Blueprint;
import com.linguacity.backend.content.entity.Building;
import com.linguacity.backend.content.entity.BuildingLevel;
import com.linguacity.backend.content.entity.BuildingLevelId;
import com.linguacity.backend.content.entity.BuildingTheme;
import com.linguacity.backend.content.entity.BuildingThemeId;
import com.linguacity.backend.content.entity.ContentPack;
import com.linguacity.backend.content.entity.Exam;
import com.linguacity.backend.content.entity.ExamQuestion;
import com.linguacity.backend.content.entity.ExamQuestionId;
import com.linguacity.backend.content.entity.ExamRequirement;
import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.content.entity.QuestionVocabulary;
import com.linguacity.backend.content.entity.QuestionVocabularyId;
import com.linguacity.backend.content.entity.Theme;
import com.linguacity.backend.content.entity.Vocabulary;
import com.linguacity.backend.content.repository.BlueprintRepository;
import com.linguacity.backend.content.repository.BuildingLevelRepository;
import com.linguacity.backend.content.repository.BuildingRepository;
import com.linguacity.backend.content.repository.BuildingThemeRepository;
import com.linguacity.backend.content.repository.ContentPackRepository;
import com.linguacity.backend.content.repository.ExamQuestionRepository;
import com.linguacity.backend.content.repository.ExamRepository;
import com.linguacity.backend.content.repository.ExamRequirementRepository;
import com.linguacity.backend.content.repository.QuestionRepository;
import com.linguacity.backend.content.repository.QuestionVocabularyRepository;
import com.linguacity.backend.content.repository.ThemeRepository;
import com.linguacity.backend.content.repository.VocabularyRepository;
import com.linguacity.backend.event.entity.CityEventTemplate;
import com.linguacity.backend.event.repository.CityEventTemplateRepository;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.entity.UserVocabProgress;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import com.linguacity.backend.quest.entity.Quest;
import com.linguacity.backend.quest.entity.UserQuest;
import com.linguacity.backend.quest.repository.QuestRepository;
import com.linguacity.backend.quest.repository.UserQuestRepository;
import com.linguacity.backend.support.MutableClock;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Thế giới nhỏ cho đợt 2 (ADR-015) và các hàm gọi API dùng chung.
 * <ul>
 *   <li>HOUSING (max Lv2): 30 từ Lv1 + 30 từ Lv2 (chủ đề HOUSE + DAILY_LIFE).
 *       Lv1: 100 KP, 10 giây, 20 từ. Lv2: 300 KP, 3600 giây, 3 mảnh, cần bản vẽ.</li>
 *   <li>SCHOOL: 30 từ Lv1 (EDUCATION); Lv1: 150 KP, 60 giây, 20 từ.</li>
 *   <li>PARK: không có nội dung.</li>
 *   <li>EXAM_HOUSING_LV2: 10 câu từ pool 20 câu tier 3 (10 từ Lv1 đầu + 10 từ Lv2 đầu), cần 45
 *       từ House, 200 KP, School Lv1, đậu ≥ 80%.</li>
 *   <li>Nhiệm vụ như V007; 4 mẫu sự kiện; danh hiệu cũ + STREAK_3 / STREAK_10 (revocable).</li>
 * </ul>
 */
abstract class ProgressionTestBase {

    static final String HOUSING = "HOUSING";
    static final String SCHOOL = "SCHOOL";
    static final ZoneId VN = ZoneId.of("Asia/Ho_Chi_Minh");

    @Autowired protected WebApplicationContext context;
    @Autowired protected MutableClock clock;
    @Autowired protected ObjectMapper json;
    @Autowired protected ThemeRepository themes;
    @Autowired protected BuildingRepository buildings;
    @Autowired protected BuildingThemeRepository buildingThemes;
    @Autowired protected BuildingLevelRepository buildingLevels;
    @Autowired protected VocabularyRepository vocabularies;
    @Autowired protected QuestionRepository questions;
    @Autowired protected QuestionVocabularyRepository questionVocabularies;
    @Autowired protected ContentPackRepository packs;
    @Autowired protected BlueprintRepository blueprints;
    @Autowired protected ExamRepository exams;
    @Autowired protected ExamRequirementRepository examRequirements;
    @Autowired protected ExamQuestionRepository examQuestions;
    @Autowired protected QuestRepository questCatalog;
    @Autowired protected UserQuestRepository userQuests;
    @Autowired protected CityEventTemplateRepository eventTemplates;
    @Autowired protected AchievementRepository achievementCatalog;
    @Autowired protected UserProfileRepository users;
    @Autowired protected UserVocabProgressRepository progress;
    @Autowired protected UserBuildingRepository userBuildings;
    @Autowired protected UserBlueprintRepository userBlueprints;

    protected MockMvc api;

    /** Id từ theo gói, lấy lại từ DB mỗi test (thứ tự id tăng dần). */
    protected List<Long> house1;
    protected List<Long> house2;
    protected List<Long> school1;

    @BeforeEach
    void setUpWorld() {
        api = MockMvcBuilders.webAppContextSetup(context).build();
        if (buildings.findByCode(HOUSING).isEmpty()) {
            seedWorld();
        }
        house1 = wordIds("h1-");
        house2 = wordIds("h2-");
        school1 = wordIds("s1-");
    }

    // =============================================================================================
    // Trạng thái người chơi (đặt thẳng vào DB để test đi nhanh tới điểm cần kiểm)
    // =============================================================================================

    protected String newUser() throws Exception {
        String id = UUID.randomUUID().toString();
        api.perform(MockMvcRequestBuilders.post("/api/v1/users/onboard")
                .header("X-Guest-UUID", id)).andExpect(status().isOk());
        return id;
    }

    protected String newDoneUser() throws Exception {
        String user = newUser();
        setStep(user, TutorialStep.DONE);
        return user;
    }

    protected void setStep(String user, TutorialStep step) {
        UserProfile profile = profile(user);
        profile.setTutorialStep(step);
        users.save(profile);
    }

    protected void setResources(String user, int kp, int shards) {
        UserProfile profile = profile(user);
        profile.setKnowledgePoints(kp);
        profile.setBlueprintShards(shards);
        users.save(profile);
    }

    protected UserProfile profile(String user) {
        return users.findById(UUID.fromString(user)).orElseThrow();
    }

    protected void collect(String user, List<Long> vocabIds) {
        LocalDateTime now = nowUtc();
        for (Long vocabId : vocabIds) {
            UserVocabProgress row = progress.findByUserIdAndVocabularyId(
                    UUID.fromString(user), vocabId).orElseGet(UserVocabProgress::new);
            row.setUserId(UUID.fromString(user));
            row.setVocabularyId(vocabId);
            row.setMasteryScore(1);
            row.setFirstSeenAt(now.minusDays(30));
            row.setCollectedAt(now.minusDays(30));
            row.setUpdatedAt(now.minusDays(30));
            progress.save(row);
        }
    }

    protected int mastery(String user, long vocabId) {
        return progress.findByUserIdAndVocabularyId(UUID.fromString(user), vocabId)
                .map(UserVocabProgress::getMasteryScore).orElse(0);
    }

    protected boolean isCollected(String user, long vocabId) {
        return progress.findByUserIdAndVocabularyId(UUID.fromString(user), vocabId)
                .map(UserVocabProgress::isCollected).orElse(false);
    }

    protected void setLevel(String user, String buildingCode, int level) {
        Building building = buildings.findByCode(buildingCode).orElseThrow();
        UserBuilding row = userBuildings.findByUserIdAndBuildingId(
                UUID.fromString(user), building.getId()).orElseGet(UserBuilding::new);
        row.setUserId(UUID.fromString(user));
        row.setBuildingId(building.getId());
        row.setCurrentLevel(level);
        row.setUnlocked(level > 0);
        row.setStatus(UserBuilding.IDLE);
        row.setTargetLevel(null);
        row.setStartedAt(null);
        row.setFinishAt(null);
        userBuildings.save(row);
    }

    protected void giveBlueprint(String user, int quantity) {
        Blueprint blueprint = housingLv2Blueprint();
        UserBlueprint row = userBlueprints.findByUserIdAndBlueprintId(
                UUID.fromString(user), blueprint.getId()).orElseGet(UserBlueprint::new);
        row.setUserId(UUID.fromString(user));
        row.setBlueprintId(blueprint.getId());
        row.setQuantity(quantity);
        userBlueprints.save(row);
    }

    protected int blueprintCount(String user) {
        return userBlueprints.findByUserIdAndBlueprintId(
                UUID.fromString(user), housingLv2Blueprint().getId())
                .map(UserBlueprint::getQuantity).orElse(0);
    }

    /** Đủ điều kiện thi House Lv2: 45 từ House, KP cho trước, School Lv1. */
    protected String eligibleExamUser(int kp) throws Exception {
        String user = newDoneUser();
        collect(user, house1);
        collect(user, house2.subList(0, 15));
        setLevel(user, HOUSING, 1);
        setLevel(user, SCHOOL, 1);
        setResources(user, kp, 0);
        return user;
    }

    /**
     * Đặt sẵn bộ nhiệm vụ hằng ngày của hôm nay. Server chỉ tự chọn khi chưa có dòng nào, nên
     * test chọn được bộ cố định thay vì phụ thuộc hạt giống ngẫu nhiên.
     */
    protected void setTodayQuests(String user, String... codes) {
        LocalDate today = today();
        for (String code : codes) {
            UserQuest row = new UserQuest();
            row.setUserId(UUID.fromString(user));
            row.setQuestCode(code);
            row.setPeriodDate(today);
            row.setProgress(0);
            userQuests.save(row);
        }
    }

    // =============================================================================================
    // Gọi API
    // =============================================================================================

    protected ResultActions post(String url, String user, String body) throws Exception {
        var request = MockMvcRequestBuilders.post(url).header("X-Guest-UUID", user);
        if (!body.isEmpty()) {
            request = request.contentType(MediaType.APPLICATION_JSON).content(body);
        }
        return api.perform(request);
    }

    protected ResultActions put(String url, String user, String body) throws Exception {
        return api.perform(MockMvcRequestBuilders.put(url)
                .header("X-Guest-UUID", user)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    protected ResultActions getAs(String url, String user) throws Exception {
        return api.perform(get(url).header("X-Guest-UUID", user));
    }

    protected JsonNode body(ResultActions result) throws Exception {
        return json.readTree(result.andReturn().getResponse().getContentAsString());
    }

    /** Trả lời mọi câu của phiên: {@code correct} câu đầu đúng, còn lại sai. */
    protected void answerSession(String user, JsonNode session, int correct) throws Exception {
        String id = session.get("sessionId").asString();
        JsonNode items = session.get("items");
        for (int i = 0; i < items.size(); i++) {
            JsonNode item = items.get(i);
            String answer = i < correct ? answerOf(item.get("question").get("id").asLong()) : "sai";
            answer(id, user, item.get("itemNo").asInt(), answer).andExpect(status().isOk());
        }
    }

    protected ResultActions answer(String id, String user, int itemNo, String answer)
            throws Exception {
        return post("/api/v1/learning/sessions/" + id + "/items/" + itemNo + "/answer", user,
                json.writeValueAsString(Map.of("answer", answer)));
    }

    protected ResultActions complete(String sessionId, String user) throws Exception {
        return post("/api/v1/learning/sessions/" + sessionId + "/complete", user, "");
    }

    /** Một bài học House đầy đủ (bắt đầu, trả lời, kết thúc). Trả kết quả complete. */
    protected JsonNode lesson(String user, int correct) throws Exception {
        JsonNode session = body(post("/api/v1/learning/sessions", user,
                "{\"buildingCode\":\"HOUSING\"}"));
        answerSession(user, session, correct);
        return body(complete(session.get("sessionId").asString(), user)
                .andExpect(status().isOk()));
    }

    protected String answerOf(long questionId) {
        return questions.findById(questionId).orElseThrow().getAnswer();
    }

    protected List<Long> vocabIdsOf(JsonNode session) {
        List<Long> ids = new ArrayList<>();
        session.get("items").forEach(item -> ids.add(item.get("vocabularyId").asLong()));
        return ids;
    }

    protected LocalDateTime nowUtc() {
        return LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);
    }

    protected LocalDate today() {
        return LocalDate.ofInstant(clock.instant(), VN);
    }

    // =============================================================================================
    // Seed
    // =============================================================================================

    private List<Long> wordIds(String prefix) {
        return vocabularies.findAll().stream()
                .filter(word -> word.getWord().startsWith(prefix))
                .map(Vocabulary::getId)
                .sorted()
                .toList();
    }

    private Blueprint housingLv2Blueprint() {
        return blueprints.findAll().stream()
                .filter(blueprint -> "BLUEPRINT_HOUSING_LV2".equals(blueprint.getCode()))
                .findFirst().orElseThrow();
    }

    private void seedWorld() {
        Theme house = theme("HOUSE");
        Theme daily = theme("DAILY_LIFE");
        Theme education = theme("EDUCATION");
        Building housing = building(HOUSING, 1, 2);
        Building school = building(SCHOOL, 2, 3);
        building("PARK", 3, 3);
        link(housing, house);
        link(housing, daily);
        link(school, education);

        level(housing, 1, 100, 10, 20, 0);
        level(housing, 2, 300, 3600, 0, 3);
        level(school, 1, 150, 60, 20, 0);

        List<Question> pool = new ArrayList<>();
        for (int i = 1; i <= 30; i++) {
            Theme theme = i <= 15 ? house : daily;
            List<Question> lv1 = word("h1-" + i, theme, 1, i);
            List<Question> lv2 = word("h2-" + i, theme, 2, i);
            word("s1-" + i, education, 1, i);
            if (i <= 10) {
                pool.add(lv1.get(2));
                pool.add(lv2.get(2));
            }
        }
        seedExam(housing, school, pool);
        seedQuests();
        seedEvents();
        seedAchievements();

        ContentPack core = new ContentPack();
        core.setCode("CORE");
        core.setScope("GLOBAL");
        core.setVersion(4);
        core.setUpdatedAt(LocalDateTime.now());
        packs.save(core);
    }

    private void seedExam(Building housing, Building school, List<Question> pool) {
        Blueprint blueprint = new Blueprint();
        blueprint.setCode("BLUEPRINT_HOUSING_LV2");
        blueprint.setBuildingId(housing.getId());
        blueprint.setTargetLevel(2);
        blueprint = blueprints.save(blueprint);

        Exam exam = new Exam();
        exam.setCode("EXAM_HOUSING_LV2");
        exam.setBuildingId(housing.getId());
        exam.setTargetLevel(2);
        exam.setRewardBlueprintId(blueprint.getId());
        exam.setQuestionCount(10);
        exam.setPassPercent(80);
        exam = exams.save(exam);

        ExamRequirement requirement = new ExamRequirement();
        requirement.setExamId(exam.getId());
        requirement.setRequiredCardCount(45);
        requirement.setRequiredKnowledge(200);
        requirement.setRequiredBlueprintShards(0);
        requirement.setRequiredBuildingId(school.getId());
        requirement.setRequiredBuildingLevel(1);
        examRequirements.save(requirement);

        for (Question question : pool) {
            ExamQuestion link = new ExamQuestion();
            link.setId(new ExamQuestionId(exam.getId(), question.getId()));
            examQuestions.save(link);
        }
    }

    private void seedQuests() {
        quest("MAIN_BUILD_HOUSE", Quest.MAIN, "BUILDING_LEVEL", HOUSING, 1, 30, 0, null, 1);
        quest("MAIN_LEARN_SCHOOL", Quest.MAIN, "COLLECTED_WORDS", SCHOOL, 20, 40, 1,
                "MAIN_BUILD_HOUSE", 2);
        quest("MAIN_BUILD_SCHOOL", Quest.MAIN, "BUILDING_LEVEL", SCHOOL, 1, 50, 1,
                "MAIN_LEARN_SCHOOL", 3);
        quest("MAIN_PASS_HOUSE_EXAM", Quest.MAIN, "EXAM_PASSED", "EXAM_HOUSING_LV2", 1, 60, 1,
                "MAIN_BUILD_SCHOOL", 4);
        quest("MAIN_UPGRADE_HOUSE", Quest.MAIN, "BUILDING_LEVEL", HOUSING, 2, 100, 2,
                "MAIN_PASS_HOUSE_EXAM", 5);
        quest("DAILY_LESSON", Quest.DAILY, "LESSON_COMPLETED", null, 1, 10, 1, null, 1);
        quest("DAILY_NEW_WORDS", Quest.DAILY, "NEW_WORDS", null, 5, 10, 1, null, 2);
        quest("DAILY_EVENT", Quest.DAILY, "EVENT_RESOLVED", null, 1, 10, 1, null, 3);
        quest("DAILY_STREAK10", Quest.DAILY, "STREAK_CORRECT", null, 10, 10, 1, null, 4);
        quest("DAILY_REVIEW", Quest.DAILY, "REVIEW_WORDS", null, 10, 10, 1, null, 5);
        quest("DAILY_BONUS", Quest.BONUS, "DAILY_ALL", null, 3, 20, 1, null, 1);
    }

    private void seedEvents() {
        String[][] rows = {
            {"EVT_A", HOUSING, "Bà Lan"},
            {"EVT_B", HOUSING, "Anh Tuấn"},
            {"EVT_C", SCHOOL, "Bé Na"},
            {"EVT_D", "PARK", "Ông Bảy"}
        };
        for (int i = 0; i < rows.length; i++) {
            CityEventTemplate template = new CityEventTemplate();
            template.setCode(rows[i][0]);
            template.setBuildingCode(rows[i][1]);
            template.setResidentName(rows[i][2]);
            template.setSituation("Tình huống " + rows[i][0]);
            template.setSortOrder(i + 1);
            eventTemplates.save(template);
        }
    }

    private void seedAchievements() {
        Object[][] catalog = {
            {"NEW_RESIDENT", "EASY", "TUTORIAL_DONE", 0, false},
            {"GOOD_START", "EASY", "PLACEMENT_WORDS_CORRECT", 15, false},
            {"COLLECTOR", "EASY", "LEVEL_COLLECTED", 0, false},
            {"TOP_ENTRANT", "HARD", "PLACEMENT_TOP_PERCENT", 90, false},
            {"DILIGENT", "HARD", "STREAK_DAYS", 3, false},
            {"FLAWLESS", "HIDDEN", "PLACEMENT_PERFECT", 30, false},
            {"COMBO10", "HIDDEN", "ANSWER_STREAK", 10, false},
            {"STREAK_3", "EASY", "STREAK_DAYS", 3, true},
            {"STREAK_10", "HARD", "STREAK_DAYS", 10, true}
        };
        for (int i = 0; i < catalog.length; i++) {
            Achievement achievement = new Achievement();
            achievement.setCode((String) catalog[i][0]);
            achievement.setName((String) catalog[i][0]);
            achievement.setDescription("desc " + catalog[i][0]);
            achievement.setTier((String) catalog[i][1]);
            achievement.setConditionType((String) catalog[i][2]);
            achievement.setThreshold((Integer) catalog[i][3]);
            achievement.setRevocable((Boolean) catalog[i][4]);
            achievement.setSortOrder(i + 1);
            achievementCatalog.save(achievement);
        }
    }

    private void quest(String code, String kind, String goalType, String goalRef, int goal,
            int rewardKp, int rewardShards, String prerequisite, int sort) {
        Quest quest = new Quest();
        quest.setCode(code);
        quest.setKind(kind);
        quest.setTitle(code);
        quest.setDescription("desc " + code);
        quest.setGoalType(goalType);
        quest.setGoalRef(goalRef);
        quest.setGoalValue(goal);
        quest.setRewardKp(rewardKp);
        quest.setRewardShards(rewardShards);
        quest.setPrerequisiteCode(prerequisite);
        quest.setSortOrder(sort);
        questCatalog.save(quest);
    }

    /** Một từ + 3 câu TARGET: tier 1 trắc nghiệm, tier 2 và 3 điền từ. Trả 3 câu theo tier. */
    private List<Question> word(String text, Theme theme, int level, int index) {
        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setWord(text);
        vocabulary.setMeaning("nghĩa " + text);
        vocabulary.setWordType("NOUN");
        vocabulary.setExamples("[\"example " + text + "\", \"another " + text + "\"]");
        vocabulary.setThemeId(theme.getId());
        vocabulary.setLevel(level);
        vocabulary.setDifficultyRank(index % 5 == 0 ? "C" : "D");
        vocabulary = vocabularies.save(vocabulary);
        String meaning = vocabulary.getMeaning();
        return List.of(
                question(vocabulary, 1, "READING", "MULT_CHOICE", meaning,
                        "{\"options\":[\"" + meaning + "\",\"khác\"]}"),
                question(vocabulary, 2, "WRITING", "FILL_BLANK", text,
                        "{\"sentence\":\"___\",\"hint\":\"x\"}"),
                question(vocabulary, 3, "WRITING", "FILL_BLANK", text,
                        "{\"sentence\":\"a ___ here\"}"));
    }

    private Question question(Vocabulary vocabulary, int tier, String skill, String type,
            String answer, String metadata) {
        Question question = new Question();
        question.setContentType("VOCABULARY");
        question.setSkill(skill);
        question.setQuestionType(type);
        question.setTier(tier);
        question.setQuestionText("Q" + tier + " " + vocabulary.getWord());
        question.setAnswer(answer);
        question.setAcceptedAnswers(tier == 1 ? "[]" : "[\"alt-" + vocabulary.getWord() + "\"]");
        question.setExplanation("Giải thích cho " + vocabulary.getWord());
        question.setMetadata(metadata);
        question = questions.save(question);
        QuestionVocabulary link = new QuestionVocabulary();
        link.setId(new QuestionVocabularyId(question.getId(), vocabulary.getId()));
        link.setRelationType("TARGET");
        questionVocabularies.save(link);
        return question;
    }

    private Theme theme(String code) {
        Theme theme = new Theme();
        theme.setCode(code);
        theme.setName(code);
        return themes.save(theme);
    }

    private Building building(String code, int order, int maxLevel) {
        Building building = new Building();
        building.setCode(code);
        building.setName(code);
        building.setMaxLevel(maxLevel);
        building.setSortOrder(order);
        return buildings.save(building);
    }

    private void link(Building building, Theme theme) {
        BuildingTheme link = new BuildingTheme();
        link.setId(new BuildingThemeId(building.getId(), theme.getId()));
        buildingThemes.save(link);
    }

    private void level(Building building, int level, int kp, long seconds, int words,
            int shards) {
        BuildingLevel row = new BuildingLevel();
        row.setId(new BuildingLevelId(building.getId(), level));
        row.setKnowledgeCost(kp);
        row.setConstructionTime(seconds);
        row.setRequiredCollected(words);
        row.setRequiredShards(shards);
        buildingLevels.save(row);
    }
}
