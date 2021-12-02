import React, { Component } from "react";

class ChefItem extends Component {
    render(props) {

        return (

            <div className="col chef-item">
                <div className="member">
                    <img src={this.props.foto} className="img-fluid" alt="" />
                    <div className="member-info">
                        <div className="member-info-content">
                            <h4>{this.props.nombre} {this.props.apellido}</h4>
                            <span>{this.props.cargo}</span>
                        </div>

                        <div className="social">
                            <a target="_blank" rel="noopener noreferrer" href={this.props.twitter}>
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.facebook}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.instagram}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.youtube}>
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default ChefItem;