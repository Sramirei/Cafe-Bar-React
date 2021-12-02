import React from "react";

import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import axios from 'axios';

import "./contactenos.css";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ContactoC() {
  const [nombreCliente, setNombre] = useLocalStorage("", "nombreCliente");
  const [emailCliente, setEmail] = useLocalStorage("", "emailCliente");
  const [servicioComentario, setServicio] = useLocalStorage(
    "",
    "servicioComentario"
  );
  const [mensaje, setMensaje] = useLocalStorage("", "mensaje");


  const sendEmail = async (e) => {
    emailjs.init("user_jsn9rn4WYbeoN7GVQdUjY");

    var datos = obtenerDatos();

    var parametrosAPI = {
      nombre: datos[0],
      email: datos[1],
      servicio: datos[2],
      mensaje: datos[3],
    };

    var url = "https://cafecito-backend.herokuapp.com/api/contactenos/"; //url de la api 

    axios.post(url, parametrosAPI).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.message);
    })


    var parametrosCorreo = {
      nombreCliente: datos[0],
      emailCliente: datos[1],
      servicio: datos[2],
      mensaje: datos[3],
    };

    emailjs.send("email-cafe-bar", "email_comentario", parametrosCorreo).then(
      function () {
        localStorage.clear();

        Swal.fire({
          title: "Comentario realizado...",
          text: "Revisa tu correo para mayor información.",
          icon: "success",
          timer: 2800,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.replace("#/");
        }, 3500);

      },
      function (error) {
        console.log("Error...", error);
        Swal.fire({
          title: "Comentario fallido...",
          text: "Se genero in error al realizar comentario, intenta de nuevo.",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    );
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contacto</h2>
            <p>Comunicate con nosotros</p>
          </div>
        </div>

        <div>
          <iframe
            className="mapa"
            title="Ubicación restaurante"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          ></iframe>
        </div>

        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Locacion:</h4>
                  <p>Calle siempre viva 123</p>
                </div>

                <div className="open-hours">
                  <i className="bi bi-clock"></i>
                  <h4>Hora De Apertuta:</h4>
                  <p>
                    Lunes - Sabado:
                    <br />
                    11:00 AM - 23:00 PM
                  </p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>info@example.com</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Telefono:</h4>
                  <p>+57 3124567658</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">
              <form onSubmit={sendEmail} className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Su nombre"
                      required
                      value={nombreCliente}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Su Email"
                      required
                      value={emailCliente}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <select
                    className="form-select form-select-sm contacto"
                    aria-label=".form-select-sm example"
                    required
                    value={servicioComentario}
                    onChange={(e) => setServicio(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Asunto
                    </option>
                    <option value="Comentario">Comentario</option>
                    <option value="Queja">Queja</option>
                    <option value="Peticion">Petición</option>
                    <option value="Pregunta">Pregunta</option>
                  </select>
                </div>

                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="8"
                    placeholder="Mensaje"
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  ></textarea>
                </div>

                <input type="checkbox" name="option" id="check1" required />
                <label htmlFor="check1">
                  He leido los terminos y Condiciones.
                </label>

                <br />

                <div className="my-3">
                  <div className="loading">Cargando</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Su mensaje Fue enviado con Exito Gracias!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Enviar mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function obtenerDatos() {
  return [
    localStorage.getItem("nombreCliente").replaceAll('"', ""),
    localStorage.getItem("emailCliente").replaceAll('"', ""),
    localStorage.getItem("servicioComentario").replaceAll('"', ""),
    localStorage.getItem("mensaje").replaceAll('"', ""),
  ];
}
