package com.ribera.app_frameworks.integration.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=MySQL",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.flyway.enabled=false",
        "jwt.secret=miclavesupersegurademinimo32caracteres123",
        "jwt.expiration-ms=3600000"
})
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        usuarioRepository.deleteAll();
    }

    @Test
    void register_ShouldReturnOk_WhenRequestIsValid() throws Exception {
        String requestBody = """
            {
              "nombreUsuario": "maria",
              "email": "maria@test.com",
              "password": "123456"
            }
            """;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().string("Usuario registrado exitosamente"));
    }

    @Test
    void register_ShouldReturnBadRequest_WhenUsernameAlreadyExists() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setEmail("otro@test.com");
        usuario.setPassword(passwordEncoder.encode("123456"));
        usuario.setRole("USER");
        usuarioRepository.save(usuario);

        String requestBody = """
            {
              "nombreUsuario": "maria",
              "email": "nuevo@test.com",
              "password": "123456"
            }
            """;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Error: Nombre de usuario ya existe"));
    }

    @Test
    void login_ShouldReturnOkAndToken_WhenCredentialsAreValid() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setEmail("maria@test.com");
        usuario.setPassword(passwordEncoder.encode("123456"));
        usuario.setRole("USER");
        usuarioRepository.save(usuario);

        String requestBody = """
            {
              "nombreUsuario": "maria",
              "password": "123456"
            }
            """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk());
    }
}
