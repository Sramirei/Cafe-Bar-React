import "./header.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Modal from "../login/modal"

export default function header() {
  return (
    <>
      <div className="navbar">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="fixed-top d-flex align-items-center "
          variant="dark">

          <Navbar.Brand>
            <Link to="/"> <h1 className="logo me-auto me-lg-0 titulo">El cafecito</h1></Link></Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto items" >


              <Nav.Link as={Link} to="/">
                <div className="item">
                  Inicio
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/nosotros">
                <div className="item">
                  Nosotros
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                <div className="item">
                  Menú
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/servicios">
                <div className="item">
                  Servicios
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto">
                <div className="item">
                  Contacto
                </div>
              </Nav.Link>

              <Nav.Link as={Link} to="/carrito" className="carrito-campo">

                <div className="carrito-btn">
                  <i className="bi bi-cart"></i>
                </div>
              </Nav.Link>

              <Modal />

            </Nav>

          </Navbar.Collapse>

        </Navbar>
      </div>
    </>
  );
}
