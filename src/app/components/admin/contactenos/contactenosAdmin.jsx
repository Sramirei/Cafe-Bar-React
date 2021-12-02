import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/contactenos/"; //url de la api 

class ContactenosAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      nombre: "",
      email: "",
      servicio: "",
      mensaje: "",
      tipoModal: ""
    }
  }

  // peticion get para obtener los datos de la api
  peticionGet = () => {
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  //peticion post
  peticionPost = async () => {
    delete this.state.form.id
    await axios.post(url, this.state.form).then(response => {
      console.log(response);
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  //peticion actualizar
  peticionPut = () => {
    axios.put(url, this.state.form).then(response => {
      console.log(response);
      this.modalInsertar();
      this.peticionGet();
    })
  }

  //peticion eliminar
  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(Response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }

  //para abrir y cerrar el modal insertar
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  // para selecionar la contactenos
  seleccionContactenos = (contactenos) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: contactenos.id,
        nombre: contactenos.nombre,
        email: contactenos.email,
        servicio: contactenos.servicio,
        mensaje: contactenos.mensaje
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
                <th>Email</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Acciones</th>

              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(Contactenos => {
                return (
                  <tr key={Contactenos.id}>
                    <td>{Contactenos.id}</td>
                    <td>{Contactenos.nombre}</td>
                    <td>{Contactenos.email}</td>
                    <td>{Contactenos.servicio}</td>
                    <td>{Contactenos.mensaje}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => { this.seleccionContactenos(Contactenos); this.setState({ modalEliminar: true }) }}><i className="bi bi-trash-fill"></i></button>

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
                <label htmlFor="nombre">Nombre</label>
                <input className="form-control" type="text" name="nombre" nombre="nombre"
                  onChange={this.handleChange} value={form ? form.nombre : ''} />
                <br />
                <label htmlFor="email">Correo Electronico</label>
                <input className="form-control" type="email" name="email" email="email"
                  onChange={this.handleChange} value={form ? form.email : ''} />
                <br />
                <label htmlFor="servicio">Asunto</label>
                <div className="formulario-select">
                  <select className="formulario__select" aria-label=".form-select-sm example" name="servicio" id="servicio"
                    required value={form ? form.servicio : ''} onChange={this.handleChange}>
                    <option value="" selected disabled >Asunto</option>
                    <option value="comentario">Comentario</option>
                    <option value="queja">Queja</option>
                    <option value="peticion">Peticion</option>
                  </select>
                </div>
                <br />
                <label htmlFor="mensaje">mensaje</label>
                <textarea rows="2" maxLength="150" name="mensaje" mensaje="mensaje"
                  onChange={this.handleChange} value={form ? form.mensaje : ''} ></textarea>
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
              Estas seguro de eliminar esta mensaje{form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
              <button className="btn btn-warning" onClick={() => this.setState({ modalEliminar: false })}>No</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }

}

export default ContactenosAdmin;
