package com.linguacity.backend.controller;

import com.linguacity.backend.entity.Building;
import com.linguacity.backend.repository.BuildingRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingRepository buildingRepository;

    public BuildingController(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    // Lấy danh sách tòa nhà CỦA RIÊNG MỘT NGƯỜI CHƠI (Dựa vào ID)
    @GetMapping("/user/{userId}")
    public List<Building> getBuildingsByUser(@PathVariable Long userId) {
        return buildingRepository.findByUserId(userId);
    }
}