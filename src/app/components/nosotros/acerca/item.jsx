import React, { Component } from "react";

class Item extends Component {
    render(props) {

        return (

            <div className="box-acerca">
                <span>{this.props.titulo}</span>
                <br />
                <p>
                    {this.props.contenido1}
                </p>
                <br />
                <p>
                    {this.props.contenido2}
                </p>
            </div>

        );
    }
}

export default Item;