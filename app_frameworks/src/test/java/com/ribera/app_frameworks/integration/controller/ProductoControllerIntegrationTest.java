package com.ribera.app_frameworks.integration.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;
import com.ribera.app_frameworks.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String token;

    @BeforeEach
    void setUp() {
        usuarioRepository.deleteAll();

        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("maria");
        usuario.setEmail("maria@test.com");
        usuario.setPassword(passwordEncoder.encode("123456"));
        usuario.setRole("USER");

        usuarioRepository.save(usuario);

        token = jwtService.generateToken(usuario);
    }

    @Test
    void getAllProductos_ShouldReturnUnauthorized_WhenNoTokenIsSent() throws Exception {
        mockMvc.perform(get("/api/productos"))
                .andExpect(status().isForbidden());
    }

    @Test
    void getAllProductos_ShouldReturnOk_WhenTokenIsValid() throws Exception {
        mockMvc.perform(get("/api/productos")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void createProducto_ShouldReturnOk_WhenTokenIsValid() throws Exception {
        String requestBody = """
            {
              "nombre": "Teclado",
              "descripcion": "Teclado mecánico",
              "precio": 49.99,
              "stock": 10
            }
            """;

        mockMvc.perform(post("/api/productos")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk());
    }
}