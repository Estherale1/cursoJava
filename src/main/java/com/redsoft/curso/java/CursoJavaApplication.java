package com.redsoft.curso.java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import com.redsoft.curso.java.servicio.UsuarioService;

@SpringBootApplication
public class CursoJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CursoJavaApplication.class, args);
		System.out.println("Hola mundo");
		UsuarioService usu = new UsuarioService();
		//usu.getUsuarios();
		//usu.agregarUsuario(usuario);
		usu.findAllUsuarios();
		

	}

}
