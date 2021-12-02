import React, { useState, useEffect } from "react";
import axios from "axios";

import Item from "./item";

export default function NosotrosC() {
    const [data, setData] = useState(
        []
    );

    const getData = async () => {
        try {
            const res = await axios.get("https://cafecito-backend.herokuapp.com/api/nosotros/informacion");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();

    }, []);



    const nosotros = data.map(item => (
        <div key={item.id} className="col-lg-4 mt-4 mt-lg-0">
            <Item
                titulo={item.titulo}
                contenido1={item.contenido1}
                contenido2={item.contenido2}
            />
        </div>
    ));

    return (
        <section id="why-us" className="why-us section-bg2">
            <div className="container">

                <div className="section-title">
                    <div className="titulo-seccion">
                        <h2>Acerca de nosotros</h2>
                    </div>
                    <p>Instalaciones / Social / Reconocimientos</p>
                </div>

                <div className="row">
                    {nosotros}
                </div>

            </div>
        </section>
    );

}