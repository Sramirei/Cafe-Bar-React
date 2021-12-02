import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

export default function footer() {
    return (
        <div id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <h3>EL CAFECITO</h3>
                                <p>
                                    Calle siempre Viva 123, Springfield
                                    <br />
                                    <strong>
                                        Telefono:
                                    </strong>
                                    +57 3124567658
                                    <br />
                                    <strong>
                                        Email:
                                    </strong>
                                    info @ejemplo.com
                                    <br />
                                </p>
                                <div className="social-links mt-3">
                                    <a href="/#" className="twitter"><i className="bi bi-facebook" /></a>
                                    <a href="/#" className="facebook"><i className="bi bi-twitter" /></a>
                                    <a href="/#" className="instagram"><i className="bi bi-instagram" /></a>
                                    <a href="/#" className="google-plus"><i className="bi bi-skype" /></a>
                                    <a href="/#" className="linkedin"><i className="bi bi-linkedin" /></a>
                                </div>
                            </div>
                        </div >

                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Navegación</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <a href="index.html">Inicio</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Nosotros.html">Nosotros</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Menu.html">Menu</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html">Servicios</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="contactenos.html">Contacto</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Servicios</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#cumple">Celebración de cumpleaños</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#aniversario">Aniversarios</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#infantil">Fiestas infantiles</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#propuestas">Declaraciones o propuestas</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#despedidas">Despedidas</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="Servicios.html/#cena">Cena con amigos</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6 footer-newsletter">
                            <h4>¿Buscas descuentos?</h4>
                            <p>Entra en nuestra red de restaurantes</p>

                            <form action="" method="post">
                                <input type="email" name="email" />
                                <input type="submit" value="Subscribete" />
                            </form>


                        </div>
                    </div >
                </div >
            </div >

        </div>

    );
}
