import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/nosotros/historia/"; //url de la api 

class HistoriaAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      titulo: "",
      descripcion: "",
      contenido: "",
      background: "",
      imagen: "",
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
        descripcion: empleado.descripcion,
        contenido: empleado.contenido,
        background: empleado.background,
        imagen: empleado.imagen,
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
                <th>Descripcion</th>
                <th>Contenido</th>
                <th>Background</th>
                <th>Imagen</th>
                <th>Modificar</th>
              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(empleado => {
                return (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.titulo}</td>
                    <td>{empleado.descripcion}</td>
                    <td>{empleado.contenido.slice(0, 15)}...</td>
                    <td>
                      <img className="preview-imagen-horizontal" src={empleado.background ? empleado.background : "https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280"} alt="" />
                    </td>
                    <td>
                      <img className="preview-imagen-horizontal" src={empleado.imagen ? empleado.imagen : "https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280"} alt="" />
                    </td>                    <td>
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
                <label htmlFor="descripcion">descripcion</label>
                <input className="form-control" type="text" name="descripcion" descripcion="descripcion"
                  onChange={this.handleChange} value={form ? form.descripcion : ''} />
                <br />
                <label htmlFor="contenido">Contenido</label>
                <textarea rows="2" maxLength="240" name="contenido" contenido="contenido"
                  onChange={this.handleChange} value={form ? form.contenido : ''} ></textarea>
                <br />
                <label htmlFor="background">background</label>
                <input className="form-control" title="Recomendación (1920x1280)" type="text" name="background" background="background"
                  onChange={this.handleChange} value={form ? form.background : ''} />
                <div className="cont-img">
                  <img className="preview-imagen-form-horizontal"
                    src={form.background ? form.background : 'https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280'}
                    alt="" />
                </div>

                <br />
                <label htmlFor="imagen">imagen</label>
                <input className="form-control" title="Recomendación (1000x600)" type="text" name="imagen" imagen="imagen"
                  onChange={this.handleChange} value={form ? form.imagen : ''} />
                <div className="cont-img">
                  <img className="preview-imagen-form-horizontal"
                    src={form.imagen ? form.imagen : 'https://firebasestorage.googleapis.com/v0/b/cafecito-ff329.appspot.com/o/nosotros-chefs%2Fsin-enlace.jpg?alt=media&token=8c95f969-2225-4894-8cd3-d01c2cc73280'}
                    alt="" />
                </div>

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

export default HistoriaAdmin;
