import React, { useState, useEffect } from "react";
import axios from "axios";

import Carousel from 'react-bootstrap/Carousel'
import TestimonioItem from "./testimonioItem";

export default function TestimoniosC() {

    const [data, setData] = useState(
        []
    );

    const getData = async () => {
        try {
            const res = await axios.get("https://cafecito-backend.herokuapp.com/api/nosotros/testimonio");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);



    const testimonios = data.map(testimonio => (

        <Carousel.Item key={testimonio.id}>

            <div className="slider-testimonio">
                    <TestimonioItem
                        descripcion={testimonio.descripcion}
                        nombre={testimonio.nombre}
                        comentario={testimonio.comentario}
                        foto={testimonio.foto}
                    />
                </div>
        </Carousel.Item>
    ));

    return (
        <div>
            <section id=" testimonials " className=" testimonials section-bg3 ">

                <div className=" container ">
                    <div className=" section-title ">
                        <div className=" titulo-seccion ">
                            <h2>Testimonios</h2>
                        </div>
                        <p>Conoce la experiencia de nuestros comensales</p>
                    </div>
                    <Carousel>
                        {testimonios}
                    </Carousel>

                </div>
            </section>
        </div>
    );

}