import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/nosotros/informacion/"; //url de la api 

class InformacionAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      titulo: "",
      contenido1: "",
      contenido2: "",
      tipoModal: "",
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

  //peticion actualizar
  peticionPut = () => {
    axios.put(url, this.state.form).then(response => {
      console.log(response);
      this.modalInsertar();
      this.peticionGet();
    })
  }

  //para abrir y cerrar el modal insertar
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  // para selecionar la empleado
  seleccionEmpleado = (empleado) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: empleado.id,
        titulo: empleado.titulo,
        contenido1: empleado.contenido1,
        contenido2: empleado.contenido2,
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
                <th>Titulo</th>
                <th>Contenido 1</th>
                <th>Contenido 2</th>
                <th>Modificar</th>
              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(empleado => {
                return (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.titulo.slice(0, 15)}...</td>
                    <td>{empleado.contenido1.slice(0, 35)}...</td>
                    <td>{empleado.contenido2 ? empleado.contenido2.slice(0, 35)+"...":<i>"No se usa este campo..."</i>}</td>
                  <td>
                      <button className="btn btn-primary" onClick={() => { this.seleccionEmpleado(empleado); this.modalInsertar() }}><i className="bi bi-pencil-fill"></i></button>
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
                <label htmlFor="titulo">titulo</label>
                <input className="form-control" type="text" name="titulo" titulo="titulo"
                  onChange={this.handleChange} value={form ? form.titulo : ''} />
                <br />
                <label htmlFor="contenido1">contenido1</label>
                <textarea rows="2" maxLength="240" name="contenido1" contenido1="contenido1"
                  onChange={this.handleChange} value={form ? form.contenido1 : ''} ></textarea>
                <br />
                <label htmlFor="contenido2">contenido2</label>
                <textarea rows="2" maxLength="240" name="contenido2" contenido2="contenido2"
                  onChange={this.handleChange} value={form ? form.contenido2 : ''} ></textarea>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary"
                onClick={() => this.peticionPut()}>
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={() => this.modalInsertar()} >Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }

}

export default InformacionAdmin;
