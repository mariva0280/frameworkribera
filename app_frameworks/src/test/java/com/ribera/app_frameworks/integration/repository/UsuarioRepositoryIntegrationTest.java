package com.ribera.app_frameworks.integration.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = Replace.ANY)
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=MySQL",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.flyway.enabled=false"
})
class UsuarioRepositoryIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void findByNombreUsuario_ShouldReturnUser_WhenUserExists() {
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
    void findByNombreUsuario_ShouldReturnEmpty_WhenUserDoesNotExist() {
        Optional<Usuario> result = usuarioRepository.findByNombreUsuario("noexiste");
        assertTrue(result.isEmpty());
    }
}