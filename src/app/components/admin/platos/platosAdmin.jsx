import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/platos"; //url de la api 

class PlatosAdmin extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: "",
            title: "",
            descripcion: "",
            imgsrc: "",
            precio:"",
            tipoModal: "",
        }
    }

    // peticion get para obtener los datos de la api
    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //peticion post
    peticionPost = async () => {
        delete this.state.form.id
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    //peticion actualizar
    peticionPut = () => {
        axios.put(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    //peticion eliminar
    peticionDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    //para abrir y cerrar el modal insertar
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    // para selecionar la reserva
    seleccionPlatos = (platos) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: platos.id,
                title: platos.title,
                descripcion: platos.descripcion,
                imgsrc: platos.imgsrc,
                precio: platos.precio,
            }
        })
    }

    // capturar los daots del formulario modal
    handleChange = async e => {
        e.persist();
        this.setState({
            form: {
                //esta linea es para que no se borre lo que hay en los campos
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }


    componentDidMount() {
        this.peticionGet();
    }

    render() {
        //capturar los valores de los campos
        const { form } = this.state;
        return (
            <div className="head-admin">
                <div className="tabla-resposive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Imagen</th>
                                <th>Precio</th>


                                <th>Acciones</th>

                            </tr>
                        </thead>

                        <tbody className="table-dark">
                            {this.state.data.map(platos => {
                                return (
                                    <tr key={platos.id}>
                                        <td>{platos.id}</td>
                                        <td>{platos.title}</td>
                                        <td>{platos.descripcion}</td>
                                        <td>
                                            <img src={platos.imgsrc} alt="img" width="100" height="100" />
                                        </td>
                                        <td>{platos.precio}</td>

                                        <td>
                                            <button className="btn btn-primary" onClick={() => { this.seleccionPlatos(platos); this.modalInsertar() }}><i className="bi bi-pencil-fill"></i></button>
                                            {"   "}
                                            <button className="btn btn-danger" onClick={() => { this.seleccionPlatos(platos); this.setState({ modalEliminar: true }) }}><i className="bi bi-trash-fill"></i></button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {/* modal para editar los campos */}
                    <Modal isOpen={this.state.modalInsertar} className="modal-bg">
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input className="form-control" type="text" name="id" id="id" readOnly
                                    onChange={this.handleChange} value={form ? form.id : 'Auto-Generado'} />
                                <br />
                                <label htmlFor="title">Nombre</label>
                                <input className="form-control" type="text" name="title" title="title"
                                    onChange={this.handleChange} value={form ? form.title : ''} />
                                <br />
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea rows="2" maxLength="250" className="form-control" type="text" name="descripcion" descripcion="descripcion"
                                    onChange={this.handleChange} value={form ? form.descripcion : ''} />
                                <br />
                                <label htmlFor="imagen">Imagen</label>
                                <input className="form-control" type="url" name="imgsrc" imgsrc="imgsrc"
                                    onChange={this.handleChange} value={form ? form.imgsrc : ''} ></input>
                                <br />
                                <label htmlFor="precio">Precio</label>
                                <input name="precio" precio="precio" type="number" min="0" max="5000"
                                    onChange={this.handleChange} value={form ? form.precio : ''} ></input>
                                <br />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.tipoModal === 'insertar' ?
                                <button className="btn btn-success"
                                    onClick={() => this.peticionPost()} >
                                    Insertar
                                </button> : <button className="btn btn-primary"
                                    onClick={() => this.peticionPut()}>
                                    Actualizar
                                </button>
                            }
                            <button className="btn btn-danger" onClick={() => this.modalInsertar()} >Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalEliminar} className="modal-bg">
                        <ModalBody>
                            Estas seguro de eliminar este PLato {form && form.title}
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                            <button className="btn btn-warning" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="bt-insertar">
                    <button className="btn btn-success bt-add"
                        onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>
                        <i className="bi bi-plus icon-add"></i>
                    </button>
                </div>
            </div>
        );
    }

}

export default PlatosAdmin;
