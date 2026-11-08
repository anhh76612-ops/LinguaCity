package com.linguacity.backend.cosmetic;

import com.linguacity.backend.achievement.entity.Achievement;
import com.linguacity.backend.achievement.repository.AchievementRepository;
import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.content.entity.ContentPack;
import com.linguacity.backend.content.repository.ContentPackRepository;
import com.linguacity.backend.cosmetic.entity.CosmeticItem;
import com.linguacity.backend.cosmetic.repository.CosmeticItemRepository;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tuỳ biến nhân vật và nhà qua API trên H2 (TC-COS-01..05, docs/06-testing/test-plan.md §6).
 * DB riêng để không đụng dữ liệu của các lớp test khác. Mỗi test dùng một người chơi mới.
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:linguacity_cosmetic;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=false"
})
class CosmeticFlowTests {

    private static final String AVATAR_OK =
            "{\"skin\":\"SKIN_4\",\"hairStyle\":\"HAIR_SPIKY\",\"hairColor\":\"HAIR_BLONDE\",\"shirtColor\":\"SHIRT_RED\","
                    + "\"pantsColor\":\"PANTS_NAVY\",\"accessory\":\"ACC_GLASSES\"}";

    @Autowired private WebApplicationContext context;
    @Autowired private CosmeticItemRepository items;
    @Autowired private AchievementRepository achievementCatalog;
    @Autowired private AchievementService achievements;
    @Autowired private UserProfileRepository users;
    @Autowired private ContentPackRepository packs;

    private MockMvc api;

    @BeforeEach
    void setUp() {
        api = MockMvcBuilders.webAppContextSetup(context).build();
        if (items.count() == 0) seed();
    }

    // TC-COS-01: ngoại hình mặc định, đổi hợp lệ thì lưu; /users/me trả cùng cấu hình
    @Test
    void defaultsThenSaveAvatar() throws Exception {
        String user = newUser();
        get("/api/v1/users/me/cosmetics", user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.avatar.skin").value("SKIN_2"))
                .andExpect(jsonPath("$.houseStyle.wall").value("WALL_CREAM"))
                .andExpect(jsonPath("$.unlocked", hasItem("WALL_MINT")))
                .andExpect(jsonPath("$.unlocked", not(hasItem("WALL_SKY"))))
                .andExpect(jsonPath("$.unlocked", not(hasItem("WALL_BRICK"))));

        put("/api/v1/users/me/avatar", user, AVATAR_OK)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.avatar.hairStyle").value("HAIR_SPIKY"))
                .andExpect(jsonPath("$.avatar.accessory").value("ACC_GLASSES"));
        get("/api/v1/users/me", user)
                .andExpect(jsonPath("$.avatar.skin").value("SKIN_4"))
                .andExpect(jsonPath("$.houseStyle.floor").value("FLOOR_OAK"));
    }

    // TC-COS-01: mã sai nhóm / mã lạ / thiếu trường → 400 INVALID_COSMETIC
    @Test
    void invalidAvatarCodesRejected() throws Exception {
        String user = newUser();
        put("/api/v1/users/me/avatar", user, AVATAR_OK.replace("\"SKIN_4\"", "\"HAIR_BLONDE\""))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_COSMETIC"))
                .andExpect(jsonPath("$.details.field").value("skin"))
                .andExpect(jsonPath("$.details.reason").value("WRONG_CATEGORY"));
        put("/api/v1/users/me/avatar", user, AVATAR_OK.replace("\"ACC_GLASSES\"", "\"ACC_CROWN\""))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details.reason").value("UNKNOWN"));
        put("/api/v1/users/me/avatar", user, "{\"skin\":\"SKIN_2\"}")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details.field").value("hairStyle"));
        get("/api/v1/users/me/cosmetics", user).andExpect(jsonPath("$.avatar.skin").value("SKIN_2")); // không lưu gì
    }

    // TC-COS-02: món KP — thiếu KP → 409; đủ → trừ KP, mở; mua lại → 409; rồi mới dùng được
    @Test
    void unlockWallWithKp() throws Exception {
        String user = newUser();
        put("/api/v1/users/me/house-style", user, "{\"wall\":\"WALL_SKY\",\"floor\":\"FLOOR_OAK\"}")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details.reason").value("LOCKED"));
        setKp(user, 50);
        post("/api/v1/cosmetics/WALL_SKY/unlock", user)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("INSUFFICIENT_KP"))
                .andExpect(jsonPath("$.details.missingKnowledge").value(10));
        setKp(user, 100);
        post("/api/v1/cosmetics/WALL_SKY/unlock", user)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.knowledgePoints").value(40))
                .andExpect(jsonPath("$.unlocked", hasItem("WALL_SKY")));
        post("/api/v1/cosmetics/WALL_SKY/unlock", user)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ALREADY_UNLOCKED"));
        put("/api/v1/users/me/house-style", user, "{\"wall\":\"WALL_SKY\",\"floor\":\"FLOOR_TILE\"}")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.houseStyle.wall").value("WALL_SKY"))
                .andExpect(jsonPath("$.houseStyle.floor").value("FLOOR_TILE"));
    }

    // TC-COS-03: món FREE / ACHIEVEMENT không mua được; mã lạ → 404
    @Test
    void onlyKpItemsArePurchasable() throws Exception {
        String user = newUser();
        setKp(user, 500);
        post("/api/v1/cosmetics/WALL_MINT/unlock", user)
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("NOT_PURCHASABLE"));
        post("/api/v1/cosmetics/WALL_BRICK/unlock", user)
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("NOT_PURCHASABLE"));
        post("/api/v1/cosmetics/WALL_GOLD/unlock", user)
                .andExpect(status().isNotFound()).andExpect(jsonPath("$.code").value("COSMETIC_NOT_FOUND"));
        get("/api/v1/users/me", user).andExpect(jsonPath("$.knowledgePoints").value(500));
    }

    // TC-COS-04: món ACHIEVEMENT mở khi có danh hiệu, không trừ KP
    @Test
    void achievementUnlocksItem() throws Exception {
        String user = newUser();
        put("/api/v1/users/me/house-style", user, "{\"wall\":\"WALL_BRICK\",\"floor\":\"FLOOR_OAK\"}")
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.details.reason").value("LOCKED"));
        achievements.grant(UUID.fromString(user), "GOOD_START", LocalDateTime.now());
        get("/api/v1/users/me/cosmetics", user).andExpect(jsonPath("$.unlocked", hasItem("WALL_BRICK")));
        put("/api/v1/users/me/house-style", user, "{\"wall\":\"WALL_BRICK\",\"floor\":\"FLOOR_OAK\"}")
                .andExpect(status().isOk()).andExpect(jsonPath("$.houseStyle.wall").value("WALL_BRICK"));
    }

    // TC-COS-05: danh mục nằm trong gói CORE (app cần asset_key để vẽ)
    @Test
    void catalogInCore() throws Exception {
        api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/v1/content/core")
                        .header("X-Guest-UUID", newUser()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cosmetics[?(@.code=='WALL_SKY')].priceKp").value(hasItem(60)))
                .andExpect(jsonPath("$.cosmetics[?(@.code=='HAIR_SPIKY')].assetKey").value(hasItem("spiky")));
    }

    // ---------------------------------------------------------------------------------

    private void seed() {
        ContentPack core = new ContentPack();
        core.setCode("CORE");
        core.setScope("GLOBAL");
        core.setVersion(3);
        core.setUpdatedAt(LocalDateTime.now());
        packs.save(core);
        achievement("GOOD_START");
        item("SKIN_2", "SKIN", "FREE", 0, null, "#f1c7a5");
        item("SKIN_4", "SKIN", "FREE", 0, null, "#c98f66");
        item("HAIR_SHORT", "HAIR_STYLE", "FREE", 0, null, "short");
        item("HAIR_SPIKY", "HAIR_STYLE", "FREE", 0, null, "spiky");
        item("HAIR_BROWN", "HAIR_COLOR", "FREE", 0, null, "#4a3426");
        item("HAIR_BLONDE", "HAIR_COLOR", "FREE", 0, null, "#e6c27a");
        item("SHIRT_TEAL", "SHIRT_COLOR", "FREE", 0, null, "#4db6ac");
        item("SHIRT_RED", "SHIRT_COLOR", "FREE", 0, null, "#e57373");
        item("PANTS_NAVY", "PANTS_COLOR", "FREE", 0, null, "#3949ab");
        item("ACC_NONE", "ACCESSORY", "FREE", 0, null, "none");
        item("ACC_GLASSES", "ACCESSORY", "FREE", 0, null, "glasses");
        item("WALL_CREAM", "WALL", "FREE", 0, null, "#f3e7d3");
        item("WALL_MINT", "WALL", "FREE", 0, null, "#cfe7d6");
        item("WALL_SKY", "WALL", "KP", 60, null, "#cfe0f0");
        item("WALL_BRICK", "WALL", "ACHIEVEMENT", 0, "GOOD_START", "#d98c6a");
        item("FLOOR_OAK", "FLOOR", "FREE", 0, null, "oak");
        item("FLOOR_TILE", "FLOOR", "FREE", 0, null, "tile");
    }

    private void achievement(String code) {
        if (achievementCatalog.existsById(code)) return;
        Achievement a = new Achievement();
        a.setCode(code);
        a.setName(code);
        a.setDescription(code);
        a.setTier("EASY");
        a.setConditionType("TEST");
        a.setThreshold(0);
        a.setSortOrder(1);
        achievementCatalog.save(a);
    }

    private void item(String code, String category, String unlock, int price, String achievement, String asset) {
        CosmeticItem i = new CosmeticItem();
        i.setCode(code);
        i.setCategory(category);
        i.setName(code);
        i.setUnlockType(unlock);
        i.setPriceKp(price);
        i.setAchievementCode(achievement);
        i.setAssetKey(asset);
        i.setSortOrder(1);
        items.save(i);
    }

    private void setKp(String user, int kp) {
        UserProfile p = users.findById(UUID.fromString(user)).orElseThrow();
        p.setKnowledgePoints(kp);
        users.save(p);
    }

    private String newUser() throws Exception {
        String id = UUID.randomUUID().toString();
        api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                .post("/api/v1/users/onboard").header("X-Guest-UUID", id)).andExpect(status().isOk());
        return id;
    }

    private ResultActions get(String url, String user) throws Exception {
        return api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get(url).header("X-Guest-UUID", user));
    }

    private ResultActions post(String url, String user) throws Exception {
        return api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post(url).header("X-Guest-UUID", user));
    }

    private ResultActions put(String url, String user, String body) throws Exception {
        return api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put(url)
                .header("X-Guest-UUID", user).contentType(MediaType.APPLICATION_JSON).content(body));
    }
}
