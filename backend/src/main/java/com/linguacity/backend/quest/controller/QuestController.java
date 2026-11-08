package com.linguacity.backend.quest.controller;

import com.linguacity.backend.quest.dto.QuestDtos.ClaimResultDto;
import com.linguacity.backend.quest.dto.QuestDtos.QuestsDto;
import com.linguacity.backend.quest.service.QuestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/** Nhiệm vụ chính tuyến, hằng ngày và thưởng hôm nay (system-design §11.4). */
@RestController
@RequestMapping("/api/v1/quests")
public class QuestController {

    private final QuestService quests;

    public QuestController(QuestService quests) {
        this.quests = quests;
    }

    @GetMapping
    public QuestsDto overview(@RequestHeader("X-Guest-UUID") UUID guest) {
        return quests.overview(guest);
    }

    @PostMapping("/{code}/claim")
    public ClaimResultDto claim(@RequestHeader("X-Guest-UUID") UUID guest,
            @PathVariable String code) {
        return quests.claim(guest, code);
    }
}
