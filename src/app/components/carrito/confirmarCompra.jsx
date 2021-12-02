import React from "react";

import emailjs from 'emailjs-com';
import axios from 'axios';
import Swal from "sweetalert2";

export default function Reserva() {

    const datos = obtenerDatos();

    const datosCliente1 = (
        <tr>
            <td> {datos[0]} </td>
            <td colSpan="2"> {datos[2]} </td>

        </tr>


    );


    const datosCliente2 = (
        <tr>
            <td> {datos[1]} </td>
            <td colSpan="2">{datos[3]} </td>
        </tr>
    );

    const datosReserva = (
        datos[4].map((item) => (
            <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.qty}</td>
                <td>{item.precio}</td>
            </tr>
        )));

    const valorCompra = (
        <td id="valorCompra">
            {datos[5]}
        </td>);


    return (

        <>
            <main id="main">

                <section id="contact" className="contact">
                    <div className="container">
                        <div className="section-title">
                            <h2>Haz Tu pedido</h2>
                            <p>Confirmación del pedido</p>
                        </div>
                    </div>

                </section>
                <div className="confirmar-reserva">
                    <table>
                        <tbody>
                            <tr className="negrilla">
                                <td>Nombre</td>
                                <td colSpan="2">Email</td>
                            </tr>
                            {datosCliente1}
                            <tr className="negrilla">
                                <td>Teléfono</td>
                                <td colSpan="2">Recomendaciones</td>
                            </tr>
                            {datosCliente2}

                            <tr >
                                <td></td>
                            </tr>
                            <tr >
                                <td></td>
                            </tr>

                            <tr>
                                <td colSpan="2"><h3>Listado de productos</h3></td>
                            </tr>

                            <tr className="negrilla">
                                <td>Producto</td>
                                <td>Cantidad</td>
                                <td>Precio</td>
                            </tr>
                            {datosReserva}


                            <tr >
                                <td></td>
                            </tr>

                            <tr >
                                <td></td>

                                <td className="negrilla">Valor Total</td>
                                {valorCompra}
                            </tr>

                            <tr>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                    <button onClick={() => sendMail()} id="btn-reserva" className="reserva-btn-enviar">
                        Confirmar Compra
                    </button>
                </div>

            </main>
        </>


    );
}

function obtenerDatos() {
    return [
        localStorage.getItem("nombre").replaceAll('"', ''),
        localStorage.getItem("telefono").replaceAll('"', ''),
        localStorage.getItem("email").replaceAll('"', ''),
        localStorage.getItem("recomendaciones").replaceAll('"', ''),
        localStorage.getItem("Carro") ? JSON.parse(localStorage.getItem("Carro")) : [],
        localStorage.getItem("ValorF").replaceAll('"', ''),

    ]
}

function mapearPedido(datosJSON) {
    return datosJSON.map((item) => (
        "<br>" +
        "Producto: " + item.title +
        "<br>" +
        "Cantidad: " + item.qty +
        "<br>" +
        "Precio (Unidad): " + item.precio +
        "<br>" +
        "Precio (Parcial): " + (item.precio * item.qty) +
        "<br>"
    ));
}



//funcion para enviar correo
async function sendMail() {

    emailjs.init("user_O0lEJgrwrKpZePPdle1VC");

    var datos = obtenerDatos();

    var parametrosAPI = {
        nombreCliente: datos[0],
        telefonoCliente: datos[1],
        emailCliente: datos[2],
        indicaciones: datos[3],
        productosCompra: (mapearPedido(datos[4])).toString().replaceAll('<br>', '\n'),
        valorCompra: datos[5],
        estado: "Pendiente"
    };


    var url = "https://cafecito-backend.herokuapp.com/api/pedido/"; //url de la api 

    console.log(parametrosAPI)

    axios.post(url, parametrosAPI).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.message);
    })

    var parametrosPedido = {
        nombreCliente: datos[0],
        telefonoCliente: datos[1],
        emailCliente: datos[2],
        indicaciones: datos[3],
        productosCompra: mapearPedido(datos[4]),
        valorCompra: datos[5],
        estado: "Pendiente"
    };
    emailjs
        .send('email-cafe-bar', 'email_pedidos', parametrosPedido)
        .then(function () {

            localStorage.clear();

            Swal.fire({
                title: 'Factura realizada...',
                text: 'Revisa tu correo para mayor información.',
                icon: 'success',
                timer: 2800,
                showConfirmButton: false,

            });

            setTimeout(() => {
                window.location.replace("#/menu");
            }, 3500);
        }, function (error) {
            console.log('Error...', error);
            Swal.fire({
                title: 'Factura fallida...',
                text: 'Se genero un error al realizar la reserva, intenta de nuevo.',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,

            });
        });
}