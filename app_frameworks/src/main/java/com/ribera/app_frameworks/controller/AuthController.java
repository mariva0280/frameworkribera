package com.ribera.app_frameworks.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ribera.app_frameworks.dto.AuthResponse;
import com.ribera.app_frameworks.dto.LoginRequest;
import com.ribera.app_frameworks.dto.RegisterRequest;
import com.ribera.app_frameworks.model.Usuario;
import com.ribera.app_frameworks.repository.UsuarioRepository;
import com.ribera.app_frameworks.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (usuarioRepository.existsByNombreUsuario(registerRequest.getNombreUsuario())) {
            return ResponseEntity.badRequest().body("Error: Nombre de usuario ya existe");
        }

        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email ya está en uso");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(registerRequest.getNombreUsuario());
        nuevoUsuario.setEmail(registerRequest.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        nuevoUsuario.setRole("USER");

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getNombreUsuario(), 
                loginRequest.getPassword()
            )
        );

        Usuario usuario = usuarioRepository.findByNombreUsuario(loginRequest.getNombreUsuario())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = jwtService.generateToken(usuario);

        return ResponseEntity.ok(new AuthResponse(token));
    }
    
}
