package com.ribera.app_frameworks.controller; // Define el package donde está la clase

import org.springframework.web.bind.annotation.GetMapping; // Importa la anotación para mapear solicitudes GET
import org.springframework.web.bind.annotation.RequestParam; // Importa la anotación para manejar parámetros de solicitud
import org.springframework.web.bind.annotation.RestController; // Importa la anotación para definir un controlador REST


@RestController // Indica que esta clase es un controlador REST que devuelve datos en vez de vistas HTML
public class HelloController {
    
    @GetMapping("/api/hello") // Mapea las solicitudes tipo Get en la url /api/hello
    public String hello(@RequestParam(defaultValue = "world") String name) {
        //@RequestParam permite recibir parametros en la url (?name=valor)
        //defaultValue = "world" significa que si no se pasa un nombre, se usará "world" por defecto
        return "Hello " + name + "!";
        // Devuelve un texto como respuesta al cliente que hizo la solicitud
    }
    
}
