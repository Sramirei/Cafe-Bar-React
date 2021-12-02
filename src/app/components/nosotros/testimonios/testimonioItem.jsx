import React, { Component } from "react";

class TestimonioItem extends Component {
    render(props) {

        return (
            <>

                <div className=" col-lg-5 testimonial-item " key={this.props.id}>
                    <p>
                        <i className=" bx bxs-quote-alt-left quote-icon-left "></i>
                        {this.props.comentario}
                        <i className=" bx bxs-quote-alt-right quote-icon-right "></i>
                    </p>
                    <img src={this.props.foto} className=" testimonial-img " alt=" " />
                    <h3>{this.props.nombre}</h3>
                    <h4>{this.props.descripcion}</h4>
                </div>

            </>

        );
    }
}

export default TestimonioItem;