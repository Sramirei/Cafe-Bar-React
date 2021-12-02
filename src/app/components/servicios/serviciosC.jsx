import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap';
import "./boton.css"
import reserved from "./reserved.png";
import { Link } from "react-router-dom";

function ServiciosC() {

  const [data, setData] = useState([]);
  //function
  const getData = async () => {
    const res = await axios.get(
      `https://cafecito-backend.herokuapp.com/api/servicio`
    );
    const data = res.data;
    const postData = data.map((pd) => (
      <section key={pd.id} className="menu">
        <div id="cumple" className="row">
          <div className="col-lg-5 col-md-6 align-self-center">
            <h1>{pd.numero}</h1>
            <div className="deshes-text">
              <h3><span>{pd.titulo}</span><br /></h3>
              <p className="pt-3">{pd.descripcion} </p>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-2 col-md-6 align-self-center mt-4 mt-md-0">
            <img src={pd.foto} alt="" className="img-fluid" />
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    ));
    setData(postData);

  };

  useEffect(() => {
    // eslint-disable-next-line
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section>
        <div className="deshes-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">

                <div className="section-title">
                  <h2>Nuestros servicios para tí</h2>
                  <p>Estos son algunos servicios para mejorar tu experiencia en nuestro restaurante.</p>
                </div>

              </div>
            </div>

            <div className="servicios">{data}</div>

          </div>
        </div>

        <div className="container-boton">
          <Link to="/reserva">
            <img className="boton" src={reserved} alt="" />
          </Link>
        </div>

      </section>
    </>
  );
}
export default ServiciosC;
