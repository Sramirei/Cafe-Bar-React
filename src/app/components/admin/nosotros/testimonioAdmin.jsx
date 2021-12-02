import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/nosotros/testimonio/"; //url de la api 

class TestimonioAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      nombre: "",
      descripcion: "",
      comentario: "",
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

  // para selecionar la testimonio
  seleccionTestimonio = (testimonio) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: testimonio.id,
        nombre: testimonio.nombre,
        descripcion: testimonio.descripcion,
        comentario: testimonio.comentario,
        foto: testimonio.foto,
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
                <th>Comentario</th>
                <th>Foto</th>
                <th>Acciones</th>

              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(testimonio => {
                return (
                  <tr key={testimonio.id}>
                    <td>{testimonio.id}</td>
                    <td>{testimonio.nombre}</td>
                    <td>{testimonio.descripcion.slice(0, 15)}...</td>
                    <td>{testimonio.comentario.slice(0, 15)}...</td>
                    <td>
                      <img className="preview-imagen" src={testimonio.foto ? testimonio.foto : "https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280"} alt="" />
                    </td>
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.seleccionTestimonio(testimonio); this.modalInsertar() }}><i className="bi bi-pencil-fill"></i></button>
                      {"   "}
                      <button className="btn btn-danger" onClick={() => { this.seleccionTestimonio(testimonio); this.setState({ modalEliminar: true }) }}><i className="bi bi-trash-fill"></i></button>

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
                <label htmlFor="descripcion">Descripcion</label>
                <input className="form-control" type="text" name="descripcion" descripcion="descripcion"
                  onChange={this.handleChange} value={form ? form.descripcion : ''} />
                <br />
                <label htmlFor="comentario">Comentario</label>
                <input className="form-control" type="text" name="comentario" comentario="comentario"
                  onChange={this.handleChange} value={form ? form.comentario : ''} />
                <br />
                <label htmlFor="foto">Foto</label>
                <input className="form-control" title="Recomendación (400x400)" type="text" name="foto" foto="foto"
                  onChange={this.handleChange} value={form ? form.foto : ''} />
                <div className="cont-img">
                  <img className="preview-imagen-formulario"
                    src={
                      this.state.tipoModal === 'insertar' ?
                        form ? form.foto : 'https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280'
                        :
                        form.foto ? form.foto : 'https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280'
                    }
                    alt="" />
                </div>

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
              Estas seguro de eliminar esta testimonio {form && form.nombre}
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

export default TestimonioAdmin;
