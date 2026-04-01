package com.ribera.app_frameworks.unit.security;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.security.JwtService;

class JwtServiceTest {

    private JwtService jwtService;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        String secret = "miclavesupersegurademinimo32caracteres123";
        long expirationMs = 3600000; // 1 hora

        jwtService = new JwtService(secret, expirationMs);

        usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setPassword("123456");
        usuario.setRole("USER");
    }

    @Test
    void generateToken_ShouldReturnToken_WhenUserIsValid() {
        String token = jwtService.generateToken(usuario);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void getUsernameFromToken_ShouldReturnCorrectUsername() {
        String token = jwtService.generateToken(usuario);

        String username = jwtService.getUsernameFromToken(token);

        assertEquals("maria", username);
    }

    @Test
    void isTokenValid_ShouldReturnTrue_WhenTokenIsCorrect() {
        String token = jwtService.generateToken(usuario);

        boolean result = jwtService.isTokenValid(token);

        assertTrue(result);
    }

    @Test
    void isTokenValid_ShouldReturnFalse_WhenTokenIsInvalid() {
        String invalidToken = "esto.no.es.un.jwt.valido";

        boolean result = jwtService.isTokenValid(invalidToken);

        assertFalse(result);
    }
}