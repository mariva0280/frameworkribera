package com.ribera.app_frameworks.unit.security;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ribera.app_frameworks.security.SecurityConfig;

public class SecurityConfigTest {

    private SecurityConfig securityConfig;
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        securityConfig = new SecurityConfig(null);
        passwordEncoder = securityConfig.passwordEncoder();
    }

    @Test
   public void passwordEncoder_ShouldReturnEncoderInstance() {
        assertNotNull(passwordEncoder);
   }

   @Test
   public void passwordEncoder_ShouldEncodePasswordCorrectly() {
    String rawPassword = "123456";
    String encodedPassword = passwordEncoder.encode(rawPassword);

    assertNotNull(encodedPassword);
    assertNotEquals(rawPassword, encodedPassword);
    assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));  
   }

   @Test
   public void passwordEncoder_ShouldFailMatch_WhenPasswordIsIncorrect() {
    String rawPassword = "123456";
    String encodedPassword = passwordEncoder.encode(rawPassword);

    assertFalse(passwordEncoder.matches("wrongpassword", encodedPassword));
   }
}
