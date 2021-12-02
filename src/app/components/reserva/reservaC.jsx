import React from "react";
import "./reserva.css";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Reserva() {

    const [nombre, setNombre] = useLocalStorage("", "nombre");
    const [email, setEmail] = useLocalStorage("", "email");
    const [documento, setDocumento] = useLocalStorage("", "documento");
    const [telefono, setTelefono] = useLocalStorage("", "telefono");
    const [servicio, setServicio] = useLocalStorage("", "servicio");
    const [personas, setPersonas] = useLocalStorage("", "personas");
    const [fecha, setFecha] = useLocalStorage("", "fecha");
    const [hora, setHora] = useLocalStorage("", "hora");
    const [indicaciones, setIndicaciones] = useLocalStorage("", "indicaciones");

    return (

        <main className="reservas">
            <section id="contact" className="contact">
                <div className="container">

                    <div className="section-title">
                        <h2>Haz tu reserva</h2>
                        <p>Comparte tus momentos y fechas especiales con Nosotros</p>
                    </div>
                </div>

                <form onSubmit={redirigir} className="formulario" id="formulario">


                    <div className="formulario__grupo" id="grupo__nombre">
                        <label htmlFor="nombre" className="label_nombre">Nombre Completo</label>
                        <div className="formulario-input">
                            <input type="text" className="formulario__input" name="nombre" id="nombre" minLength="1" maxLength="40" placeholder="Escriba su nombre completo"
                                required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">En este campo no pueden ir numeros o caracteres especiales(#,%,&-1232) </p>
                    </div>

                    <div className="formulario__grupo" id="grupo__email">
                        <label htmlFor="email" className="label_email">Email</label>
                        <div className="formulario-input">
                            <input type="email" className="formulario__input" name="email" id="email" minLength="1" maxLength="50" placeholder="ejemplo@xxx.com"
                                required value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <p className="formulario__input-error">Por favor proporcione un email Valido</p>
                    </div>


                    <div className="formulario__grupo" id="grupo__documento">
                        <label htmlFor="documento" className="label_documento">Documento</label>
                        <div className="formulario-input">
                            <input type="text" className="formulario__input" name="documento" id="documento" maxLength="10" placeholder="128993994"
                                required value={documento} onChange={(e) => setDocumento(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">Por favor proporcione un numero de documento valido</p>
                    </div>


                    <div className="formulario__grupo" id="grupo__telefono">
                        <label htmlFor="telefono" className="label_telefono">Telefono</label>
                        <div className="formulario-input">
                            <input type="text" className="formulario__input" name="telefono" id="telefono" maxLength="10" placeholder="3124567845"
                                required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">Por favor proporcione un número de Telefono valido</p>
                    </div>


                    <div className="formulario__grupo" id="grupo__servicio">
                        <label htmlFor="servicio" className="label_servicio">Servicios</label>
                        <div className="formulario-select">
                            <select className="formulario__select" aria-label=".form-select-sm example" name="servicio" id="servicio"
                                required value={servicio} onChange={(e) => setServicio(e.target.value)}>
                                <option value="" selected disabled >Servicios</option>
                                <option value="cumpleanios">Cumpleaños</option>
                                <option value="aniversario">Aniversario</option>
                                <option value="fiesta">Fiesta Infantil</option>
                                <option value="propuestas">Declaraciones o Propuestas</option>
                                <option value="despedidas">Despedidas</option>
                                <option value="cena">Cena Con Amigos</option>
                            </select>
                        </div>

                    </div>

                    <div className="formulario__grupo" id="grupo__personas">
                        <label htmlFor="personas" className="label_personas">Personas que asistiran</label>
                        <div className="formulario-input">
                            <input type="number" className="formulario__input" name="personas" id="personas" placeholder="1" maxLength="2"
                                required value={personas} onChange={(e) => setPersonas(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">Por favor proporcione el numero de personas que van a asistir( hasta 15 personas)</p>
                        <p className="formulario__input-error">En este campo solo pueden ir Numeros(12345..)</p>
                    </div>


                    <div className="formulario__grupo" id="grupo__fecha">
                        <label htmlFor="fecha" className="label_fecha">Fecha de su reserva</label>
                        <div className="formulario-input">
                            <input type="date" className="formulario__input" name="fecha" id="fecha"
                                required value={fecha} onChange={(e) => setFecha(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">Por favor proporcione una fecha valida (Fecha dd/mm/aaaa)</p>
                    </div>

                    <div className="formulario__grupo" id="grupo__hora">
                        <label htmlFor="hora" className="label_hora">Hora de Su reserva</label>
                        <div className="formulario-input">
                            <input type="time" className="formulario__input" name="hora" id="hora"
                                required value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div>

                        <p className="formulario__input-error">Verifique si la hora Correctamente (Sistema horario de 24 horas hh:mm)</p>
                    </div>

                    <div className="box">
                        <label className="label_indicaciones">Dejanos Tus Indicaciones.</label>
                        <textarea rows="2" maxLength="150" className="indicaciones" id="indicaciones"
                            required value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)}></textarea>
                        <div id="contador">0/150</div>
                    </div>

                    <div className="formulario__grupo" id="grupo__terminos">
                        <label className="formulario__label">
                            <input className="formulario__checkbox" type="checkbox" name="terminos" id="terminos" required />
                            Acepto Todos los Terminos y Condiciones.
                        </label>

                        <p className="formulario__input-error">Por favor Aceptelos terminos y Condiciones</p>

                    </div>

                    <div className="formulario__grupo-btn-enviar">
                        <p className="formulario__mensaje" id="formulario__mensaje"> Rellene los campos Correctamente</p>
                    </div>
                    <button type="submit" className="reserva-btn-enviar" id="reserva-btn-enviar">Realizar reserva</button>
                </form>
            </section>
        </main>

    );
}


function redirigir() {
    window.location.replace("#/confirmarReserva");
}