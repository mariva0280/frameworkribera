package com.ribera.app_frameworks.integration.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;

@DataJpaTest
@ActiveProfiles("test")
class UsuarioRepositoryIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void findByNombreUsuario_ShouldReturnUser_WhenUserExists() {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setEmail("maria@test.com");
        usuario.setPassword("123456");
        usuario.setRole("USER");

        usuarioRepository.save(usuario);

        Optional<Usuario> result = usuarioRepository.findByNombreUsuario("maria");

        assertTrue(result.isPresent());
        assertEquals("maria", result.get().getNombreUsuario());
    }

    @Test
    public void findByNombreUsuario_ShouldReturnEmpty_WhenUserDoesNotExist() {
        Optional<Usuario> result = usuarioRepository.findByNombreUsuario("noexiste");

        assertTrue(result.isEmpty());
    }
}