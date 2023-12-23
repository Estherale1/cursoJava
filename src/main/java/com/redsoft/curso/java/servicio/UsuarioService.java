package com.redsoft.curso.java.servicio;

import com.redsoft.curso.java.modelo.Usuario;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    private static final String RUTAJSON = "C:\\Dev\\cursojava\\src\\main\\resources\\json\\usuario.json";

    public List<Usuario> findAllUsuarios() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Usuario> usuarios = mapper.readValue(new File(RUTAJSON), new TypeReference<List<Usuario>>() {});
            return usuarios;
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public void agregarUsuario(Usuario nuevoUsuario) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            File archivoJson = new File(RUTAJSON);

            List<Usuario> usuarios = mapper.readValue(archivoJson, new TypeReference<List<Usuario>>() {});

            usuarios.add(nuevoUsuario);
            mapper.writeValue(archivoJson, usuarios);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void borrarUsuario(int idUsuario) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            File archivoJson = new File(RUTAJSON);

            List<Usuario> usuarios = mapper.readValue(archivoJson, new TypeReference<List<Usuario>>() {});

            List<Usuario> usuariosActualizados = usuarios.stream()
                    .filter(usuario -> usuario.getId() != idUsuario)
                    .collect(Collectors.toList());

            mapper.writeValue(archivoJson, usuariosActualizados);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
