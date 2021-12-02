import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import ChefItem from "./chefItem";

export default function ChefsC() {

    const [data, setData] = useState(
        []
    );

    const getData = async () => {
        try {
            const res = await axios.get("https://cafecito-backend.herokuapp.com/api/nosotros/empleado");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);



    const chefs = data.map(chef => (
        <Carousel.Item key={chef.id}>
            <ChefItem
                nombre={chef.nombre}
                apellido={chef.apellido}
                cargo={chef.cargo}
                foto={chef.foto}
                twitter={chef.twitter}
                facebook={chef.facebook}
                instagram={chef.instagram}
                youtube={chef.youtube}
            />
        </Carousel.Item>
    ));

    return (
        <div>
            <section id="chefs" className="chefs">
                <div className="container">
                    <div className="section-title">
                        <div className="titulo-seccion">
                            <h2>Chefs</h2>
                        </div>
                        <p>Conoce a nuestro personal</p>
                    </div>

                    <Carousel >
                        {chefs}
                    </Carousel>
                </div>
            </section>
        </div>
    );

}