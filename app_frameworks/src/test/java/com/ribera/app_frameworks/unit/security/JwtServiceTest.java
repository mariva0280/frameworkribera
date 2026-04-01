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
    public void setUp() {
        String secret = "miclavesupersegurademinimo32caracteres123";
        long expirationMs = 3600000; // 1 hora

        jwtService = new JwtService(secret, expirationMs);

        usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setPassword("123456");
        usuario.setRole("USER");
    }

    @Test
    public void generateToken_ShouldReturnToken_WhenUserIsValid() {
        String token = jwtService.generateToken(usuario);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    public void getUsernameFromToken_ShouldReturnCorrectUsername() {
        String token = jwtService.generateToken(usuario);

        String username = jwtService.getUsernameFromToken(token);

        assertEquals("maria", username);
    }

    @Test
    public void isTokenValid_ShouldReturnTrue_WhenTokenIsCorrect() {
        String token = jwtService.generateToken(usuario);

        boolean result = jwtService.isTokenValid(token);

        assertTrue(result);
    }

    @Test
    public void isTokenValid_ShouldReturnFalse_WhenTokenIsInvalid() {
        String invalidToken = "esto.no.es.un.jwt.valido";

        boolean result = jwtService.isTokenValid(invalidToken);

        assertFalse(result);
    }

    @Test
    public void getUsernameFromToken_ShouldThrowException_WhenTokenIsInvalid() {
        String invalidToken = "token.invalido";

        assertThrows(Exception.class, () -> {
            jwtService.getUsernameFromToken(invalidToken);
        });
    }
}