import React, { Component } from "react";

class Historia extends Component {
    render(props) {
        return (
            <>
                <section
                    id="about"
                    className="about"
                    style={{
                        backgroundImage: `url(${this.props.background})`
                    }}
                >
                    <div className="container">
                        <div className="section-title content">
                            <div className="titulo-seccion1">
                                <h2>{this.props.descripcion}</h2>
                            </div>
                            <p>{this.props.titulo}</p>
                        </div>
                        <div className="row">
                            <div className=" col-lg-6 content parrafo">
                                <p>
                                    {this.props.contenido}
                                </p>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="about-img">
                                    <img src={this.props.imagen} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </>

        );
    }
}

export default Historia;