package com.linguacity.backend.cosmetic.controller;

import com.linguacity.backend.auth.security.CurrentUser;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.AvatarConfig;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.CosmeticsDto;
import com.linguacity.backend.cosmetic.dto.CosmeticDtos.HouseStyleConfig;
import com.linguacity.backend.cosmetic.service.CosmeticService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/** Tuỳ biến nhân vật và nhà (UC_14, system-design §10.4.4). */
@RestController
@RequestMapping("/api/v1")
public class CosmeticController {

    private final CosmeticService cosmetics;

    public CosmeticController(CosmeticService cosmetics) {
        this.cosmetics = cosmetics;
    }

    @GetMapping("/users/me/cosmetics")
    public CosmeticsDto mine(@CurrentUser UUID guest) {
        return cosmetics.get(guest);
    }

    @PostMapping("/cosmetics/{code}/unlock")
    public CosmeticsDto unlock(
            @CurrentUser UUID guest, @PathVariable String code) {
        return cosmetics.unlock(guest, code);
    }

    @PutMapping("/users/me/avatar")
    public CosmeticsDto avatar(
            @CurrentUser UUID guest, @RequestBody AvatarConfig body) {
        return cosmetics.setAvatar(guest, body);
    }

    @PutMapping("/users/me/house-style")
    public CosmeticsDto houseStyle(
            @CurrentUser UUID guest, @RequestBody HouseStyleConfig body) {
        return cosmetics.setHouseStyle(guest, body);
    }
}
