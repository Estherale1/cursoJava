function getUsuarios() {
  axios
    .get("http://localhost:8080/usuarios")
    .then(function (response) {
      if (Array.isArray(response.data)) {
        let listContent = response.data
          .map(
            (usuario) =>
              "<tr>" +
              "<td>" +
              usuario.id +
              "</td>" +
              "<td>" +
              usuario.nombre +
              "</td>" +
              "<td>" +
              usuario.correo +
              "</td>" +
              "<td>" +"<button style='background-color: #e40d0d;'  onclick=\"eliminarUsuario(" + usuario.id + ")\">Eliminar</button>" +

              "</td>" +
              "</tr>"
          )
          .join("");
        document.getElementById("result").innerHTML =
          "<tr>" +
          "<th>ID</th>" +
          "<th>Nombre</th>" +
          "<th>Correo</th>" +
          "<th>Acción</th>" +
          "</tr>" +
          listContent;
      } else {
        document.getElementById("result").innerHTML =
          "<tr><td colspan='4'>Respuesta inesperada del servidor</td></tr>";
      }
    })
    .catch(function (error) {
      document.getElementById("result").innerHTML =
        "<tr><td colspan='4'>Error: " +
        (error.response && error.response.data ? error.response.data : error) +
        "</td></tr>";
    });
}

function eliminarUsuario(usuarioId) {
  axios
    .post("http://localhost:8080/borrarUsuarios", { usuarioId: usuarioId })
    .then(function (response) {
      getUsuarios();
      alert("Usuario eliminado con éxito");
    })
    .catch(function (error) {
      document.getElementById("mensajes").textContent =
        "Error: " +
        (error.response && error.response.data ? error.response.data : error);
    });
}


function recibirDatos() {

  var id = document.getElementById('id');
  var nombre = document.getElementById('nombre');
  var correo = document.getElementById('correo');
  var contrasena = document.getElementById('contrasena');

  id.style.border = '';
  nombre.style.border = '';
  correo.style.border = '';
  contrasena.style.border = '';

  if (id.value === '') {
    alert('Por favor, ingrese un valor para el campo ID.');
    id.style.border = '2px solid #ff0000';
    return false;
  }

  if (id.value === '' || isNaN(id.value) || parseInt(id.value) <= 0 || parseInt(id.value) > 1000) {
    alert('Por favor, ingrese un ID válido');
    id.style.border = '2px solid #ff0000';
    return false;
  }

  if (nombre.value === '') {
    alert('Por favor, ingrese su nombre.');
    nombre.style.border = '2px solid #ff0000';
    return false;
  }

  var valiemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo.value === '' || !valiemail.test(correo.value)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    correo.style.border = '2px solid #ff0000';
    return false;
  }

  if (contrasena.value === '' || contrasena.value.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    contrasena.style.border = '2px solid #ff0000';
    return false;
  }

  id.style.border = '2px solid #008000';
  nombre.style.border = '2px solid #008000';
  correo.style.border = '2px solid #008000';
  contrasena.style.border = '2px solid #008000';

  axios.post("http://localhost:8080/insertUsuarios", { id: id.value, nombre: nombre.value, correo: correo.value, contrasena: contrasena.value })
      .then(function (response) {
          console.log("Respuesta del servidor:", response.data);
          getUsuarios();
          alert("Usuario agregado con éxito");
      })
      .catch(function (error) {
          console.error("Error al enviar los datos:", error);
          document.getElementById("mensajes").innerHTML =
              "<div style='background-color: #ffcccc;'>Error: " +
              (error.response && error.response.data ? error.response.data : error) +
              "</div>";
      });


  return false;
}



function borrarUsuario(usuarioId) {
  axios
    .post("http://localhost:8080/borrarUsuarios", { usuarioId: usuarioId })
    .then(function (response) {
      getUsuarios();
      document.getElementById("mensajes").textContent =
        "Usuario eliminado con éxito";
    })
    .catch(function (error) {
      document.getElementById("mensajes").textContent =
        "Error: " +
        (error.response && error.response.data ? error.response.data : error);
    });
}


function ocultar() {
  var tabla = document.getElementById("result");
  tabla.style.display = "none";
}

function mostrar() {
  var tabla = document.getElementById("result");
  tabla.style.display = "table"; 
  getUsuarios(); 
}


