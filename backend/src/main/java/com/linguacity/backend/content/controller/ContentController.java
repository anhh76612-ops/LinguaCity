package com.linguacity.backend.content.controller;

import com.linguacity.backend.content.dto.ContentDtos.Core;
import com.linguacity.backend.content.dto.ContentDtos.Manifest;
import com.linguacity.backend.content.dto.ContentDtos.Pack;
import com.linguacity.backend.content.service.ContentService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * UC_03 Sync Static Content (system-design §10.4.1). Header {@code X-Guest-UUID} bắt buộc như mọi
 * API (§7.2).
 */
@RestController
@RequestMapping("/api/v1/content")
public class ContentController {

    private final ContentService content;

    public ContentController(ContentService content) {
        this.content = content;
    }

    @GetMapping("/manifest")
    public Manifest manifest(@RequestHeader("X-Guest-UUID") UUID guestUuid) {
        return content.manifest();
    }

    @GetMapping("/core")
    public Core core(@RequestHeader("X-Guest-UUID") UUID guestUuid) {
        return content.core();
    }

    @GetMapping("/packs/{buildingCode}/{level}")
    public Pack pack(
            @RequestHeader("X-Guest-UUID") UUID guestUuid,
            @PathVariable String buildingCode,
            @PathVariable int level) {
        return content.pack(buildingCode.toUpperCase(), level);
    }
}
