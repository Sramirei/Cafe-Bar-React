import React, { useState, useEffect } from "react";
import axios from "axios";

import Historia from "./historia";

export default function HistoriaC() {

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get("https://cafecito-backend.herokuapp.com/api/nosotros/historia");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const historia = data.map((info, i) => (
        <div key="{i}">
            <Historia
                descripcion={info.descripcion}
                titulo={info.titulo}
                contenido={info.contenido}
                imagen={info.imagen}
                background={info.background}
            />
        </div>
    ));
    
    return (
        <div>
            {historia}
        </div>
    );

}