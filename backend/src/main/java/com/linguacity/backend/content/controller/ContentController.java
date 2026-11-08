package com.linguacity.backend.content.controller;

import com.linguacity.backend.auth.security.CurrentUser;
import com.linguacity.backend.content.dto.ContentDtos.Core;
import com.linguacity.backend.content.dto.ContentDtos.Manifest;
import com.linguacity.backend.content.dto.ContentDtos.Pack;
import com.linguacity.backend.content.service.ContentService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * UC_03 Sync Static Content (system-design §10.4.1). Cần xác thực như mọi API (Bearer JWT, hoặc
 * header {@code X-Guest-UUID} của app bản cũ — ADR-016).
 */
@RestController
@RequestMapping("/api/v1/content")
public class ContentController {

    private final ContentService content;

    public ContentController(ContentService content) {
        this.content = content;
    }

    @GetMapping("/manifest")
    public Manifest manifest(@CurrentUser UUID guestUuid) {
        return content.manifest();
    }

    @GetMapping("/core")
    public Core core(@CurrentUser UUID guestUuid) {
        return content.core();
    }

    @GetMapping("/packs/{buildingCode}/{level}")
    public Pack pack(
            @CurrentUser UUID guestUuid,
            @PathVariable String buildingCode,
            @PathVariable int level) {
        return content.pack(buildingCode.toUpperCase(), level);
    }
}
