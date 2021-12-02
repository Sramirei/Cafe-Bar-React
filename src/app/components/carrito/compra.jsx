import useLocalStorage from "../hooks/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./car.css";
export default function Compra() {
  
  const [nombre, setNombre] = useLocalStorage("", "nombre");
  const [email, setEmail] = useLocalStorage("", "email");
  const [telefono, setTelefono] = useLocalStorage("", "telefono");
  const [recomendaciones, setRecomendaciones] = useLocalStorage("","recomendaciones");

  const valor = localStorage.getItem("ValorF");
  const menu = localStorage.getItem("Carro")
    ? JSON.parse(localStorage.getItem("Carro"))
    : [];
  console.log(menu);

  const data = menu.map((item) => (
    <tr key={item.id}>
      <td>{item.qty}</td>
      <td>{item.title}</td>
      <td>{item.precio}</td>
    </tr>
  ));

  

  return (
    <main id="main">
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Ya casi termina tu compra </h2>
            <p>Productos de la compra</p>
          </div>
          <table className="elementos" id="elementos">
            <thead>
              <tr>
                <td>
                  <b>Cantidad</b>
                </td>
                <td>
                  <b>Producto</b>
                </td>
                <td>
                  <b>Precio</b>
                </td>
              </tr>
            </thead>
            <tbody>{data}</tbody>
            <thead>
              <td>
                <b>Total</b>
              </td>
            </thead>
            <tbody>
              <td>{valor}</td>
            </tbody>
          </table>
        </div>

        <div className="section-title">
          <p>Completa tus datos</p>
        </div>

        <form onSubmit={redirigir} className="formulario" id="formulario">
          <div className="formulario__grupo" id="grupo__nombre_c">
            <label for="nombre" className="label_nombre">
              Nombre Completo
            </label>
            <div className="formulario-input">
              <input
                type="text"
                className="formulario__input"
                name="nombre"
                id="nombre_c"
                minlength="1"
                maxLenght="40"
                placeholder="Escriba su nombre completo"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <p className="formulario__input-error">
              En este campo no pueden ir numeros o caracteres
              especiales(#,%,&-1232){" "}
            </p>
          </div>

          <div className="formulario__grupo" id="grupo__email_c">
            <label for="email" className="label_email">
              Email
            </label>
            <div className="formulario-input">
              <input
                type="email"
                className="formulario__input"
                name="email"
                id="email_c"
                minlength="1"
                maxLenght="50"
                placeholder="ejemplo@xxx.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="formulario__input-error">
              Por favor proporcione un email Valido
            </p>
          </div>

          <div className="formulario__grupo" id="grupo__telefono_c">
            <label for="telefono" className="label_telefono">
              Telefono
            </label>
            <div className="formulario-input">
              <input
                type="text"
                className="formulario__input"
                name="telefono"
                id="telefono_c"
                maxLenght="10"
                required
                placeholder="3124567845"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <p className="formulario__input-error">
              Por favor proporcione un número de Telefono valido
            </p>
          </div>

          <div className="box">
            <label>¿Recomendaciones?</label>
            <textarea
              rows="2"
              maxLenght="150"
              className="indicaciones"
              required
              id="indicaciones_c"
              value={recomendaciones}
              onChange={(e) => setRecomendaciones(e.target.value)}
            ></textarea>
            
          </div>

          <div className="formulario__grupo" id="grupo__terminos">
            <label className="formulario__label">
              <input
                className="formulario__checkbox"
                type="checkbox"
                required
                name="terminos"
                id="terminos"
              />
              Acepto Todos los Terminos y Condiciones.
            </label>
          </div>
          <div>
            <p className="formulario__input-error">
              Por favor Aceptelos terminos y Condiciones
            </p>
          </div>

          <div className="formulario__grupo-btn-enviar">
            <button
              type="submit"
              className="reserva-btn-enviar"
              id="reserva-btn-enviar"
            >
              Completar compra
            </button>
            <p className="formulario__mensaje" id="formulario__mensaje">
              {" "}
              Rellene los campos Correctamente
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}


function redirigir() {
  window.location.replace("#/confirmarCompra");
}