package com.linguacity.backend.city.controller;

import com.linguacity.backend.city.dto.CityDtos.BuildResultDto;
import com.linguacity.backend.city.dto.CityDtos.CityDto;
import com.linguacity.backend.city.service.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CityController {

    private final CityService city;

    public CityController(CityService city) {
        this.city = city;
    }

    @GetMapping("/city")
    public CityDto city(@RequestHeader("X-Guest-UUID") UUID guest) {
        return city.city(guest);
    }

    @PostMapping("/buildings/{code}/build")
    public BuildResultDto build(@RequestHeader("X-Guest-UUID") UUID guest, @PathVariable String code) {
        return city.build(guest, code);
    }
}
