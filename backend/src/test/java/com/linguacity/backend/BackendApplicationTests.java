package com.linguacity.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import com.linguacity.backend.identity.repository.UserProfileRepository;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:linguacity_test;DB_CLOSE_DELAY=-1",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
		"spring.jpa.show-sql=false"
})
class BackendApplicationTests {

	@Autowired
	private WebApplicationContext context;

	@Autowired
	private UserProfileRepository users;

	@Test
	void relocatedIdentityModulePersistsGuestAndHandlesRepeatedOnboarding() throws Exception {
		var api = MockMvcBuilders.webAppContextSetup(context).build();
		UUID id = UUID.randomUUID();
		long originalCount = users.count();

		api.perform(post("/api/v1/users/onboard").header("X-Guest-UUID", id.toString()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.userId").value(id.toString()))
				.andExpect(jsonPath("$.knowledgePoints").value(0));

		var saved = users.findById(id).orElseThrow();
		saved.setKnowledgePoints(25);
		users.saveAndFlush(saved);

		api.perform(post("/api/v1/users/onboard").header("X-Guest-UUID", id.toString()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.knowledgePoints").value(25));

		assertEquals(originalCount + 1, users.count());
		assertEquals(25, users.findById(id).orElseThrow().getKnowledgePoints());
	}

}
