package com.ribera.app_frameworks; // Paquete donde se encuentra la clase principal del proyecto

// Importaciones necesarias para la aplicación Spring Boot
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Anotación que indica que esta es la clase principal de una aplicación Spring Boot
public class AppFrameworksApplication { // Definición de la clase principal

	public static void main(String[] args) {
		SpringApplication.run(AppFrameworksApplication.class, args); // Método principal que inicia la aplicación Spring Boot
	}

}
