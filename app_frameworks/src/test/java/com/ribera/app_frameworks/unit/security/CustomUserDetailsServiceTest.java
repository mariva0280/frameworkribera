package com.ribera.app_frameworks.unit.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;
import com.ribera.app_frameworks.security.CustomUserDetailsService;

public class CustomUserDetailsServiceTest {
    @Mock
    private UsuarioRepository usuarioRepository;

    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        customUserDetailsService = new CustomUserDetailsService(usuarioRepository);
    }

    @Test
    public void testLoadUserByUsername_ShouldReturnUserDetails_WhenUserExists() {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setPassword("123456");
        usuario.setRole("USER");

        when(usuarioRepository.findByNombreUsuario("maria")).thenReturn(Optional.of(usuario));

        UserDetails result = customUserDetailsService.loadUserByUsername("maria");

        assertNotNull(result);
        assertEquals("maria", result.getUsername());
        assertEquals("123456", result.getPassword());
    }

    @Test
    public void loadUserByUsername_ShouldThrowException_WhenUserDoesNotExist() {
        when(usuarioRepository.findByNombreUsuario("maria")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            customUserDetailsService.loadUserByUsername("maria");
        });
    }
}
