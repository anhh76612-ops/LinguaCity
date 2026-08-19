package com.linguacity.backend.controller;

import com.linguacity.backend.entity.UserProfile;
import com.linguacity.backend.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileRepository userProfileRepository;

    public UserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    // Lấy danh sách tất cả người chơi
    @GetMapping
    public List<UserProfile> getAllUsers() {
        return userProfileRepository.findAll();
    }

    // Tạo tài khoản người chơi mới
    @PostMapping
    public UserProfile createUser(@RequestBody UserProfile userProfile) {
        return userProfileRepository.save(userProfile);
    }
}