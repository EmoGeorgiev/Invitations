package com.invitations;

import com.invitations.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class InvitationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvitationsApplication.class, args);
	}
}