import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/servicio"; //url de la api 

class ServicioAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      numero: "",
      titulo: "",
      descripcion: "",
      foto: "",
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

  // para selecionar la reserva
  seleccionServicio = (servicio) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: servicio.id,
        numero: servicio.numero,
        titulo: servicio.titulo,
        descripcion: servicio.descripcion,
        foto: servicio.foto
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
                <th>Numero</th>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Foto</th>
                
                
                <th>Acciones</th>

              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(servicio => {
                return (
                  <tr key={servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.numero}</td>
                    <td>{servicio.titulo}</td>
                    <td>{servicio.descripcion}</td>
                    <td>{servicio.foto}</td>
                    
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.seleccionServicio(servicio); this.modalInsertar() }}><i className="bi bi-pencil-fill"></i></button>
                      {"   "}
                      <button className="btn btn-danger" onClick={() => { this.seleccionServicio(servicio); this.setState({ modalEliminar: true }) }}><i className="bi bi-trash-fill"></i></button>

                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* modal para editar los campos */}
          <Modal isOpen={this.state.modalInsertar} className="modal-bg">
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input className="form-control" type="text" name="id" id="id" readOnly
                  onChange={this.handleChange} value={form ? form.id : 'Auto-Generado'} />
                <br />
                <label htmlFor="numero">Numero</label>
                <input className="form-control" type="text" name="numero" numero="numero"
                  onChange={this.handleChange} value={form ? form.numero : ''} />
                <br />
                <label htmlFor="titulo">Titulo</label>
                <input className="form-control" type="titulo" name="titulo" titulo="titulo"
                  onChange={this.handleChange} value={form ? form.titulo : ''} />
                <br />
                <label htmlFor="descripcion">Descripcion</label>
                <textarea  rows="2" maxLength="250" className="form-control" type="text" name="descripcion" descripcion="descripcion"
                  onChange={this.handleChange} value={form ? form.descripcion : ''} ></textarea>
                <br />
                <label htmlFor="foto">Foto</label>
                <textarea  name="foto" foto="foto"
                  onChange={this.handleChange} value={form ? form.foto : ''} ></textarea>
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
              Estas seguro de eliminar esta Reserva {form && form.nombre}
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

export default ServicioAdmin;
