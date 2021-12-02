import React, { Component } from 'react';
import "../admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

const url = "https://cafecito-backend.herokuapp.com/api/pedido/"; //url de la api 

class PedidoAdmin extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      nombreCliente: "",
      telefonoCliente: "",
      emailCliente: "",
      indicaciones: "",
      productosCompra: "",
      estado: "",
      valorCompra: "",
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

  // para selecionar la pedido
  seleccionPedido = (pedido) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: pedido.id,
        nombreCliente: pedido.nombreCliente,
        telefonoCliente: pedido.telefonoCliente,
        emailCliente: pedido.emailCliente,
        valorCompra: pedido.valorCompra,
        indicaciones: pedido.indicaciones,
        productosCompra: pedido.productosCompra,
        estado: pedido.estado
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
                <th>Telefono</th>
                <th>Correo</th>
                <th>Indicaciones</th>
                <th>Productos</th>
                <th>Valor Total</th>
                <th>Estado</th>
                <th>Acciones</th>

              </tr>
            </thead>

            <tbody className="table-dark">
              {this.state.data.map(pedido => {
                return (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.nombreCliente.slice(0, 10)}...</td>
                    <td>{pedido.telefonoCliente.slice(0, 7)}...</td>
                    <td>{pedido.emailCliente.slice(0, 10)}...</td>
                    <td>{pedido.indicaciones}</td>
                    <td>{pedido.productosCompra.slice(0, 18)}...</td>
                    <td>{pedido.valorCompra}</td>
                    <td>{pedido.estado}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.seleccionPedido(pedido); this.modalInsertar() }}><i className="bi bi-pencil-fill"></i></button>
                      {"   "}
                      <button className="btn btn-danger" onClick={() => { this.seleccionPedido(pedido); this.setState({ modalEliminar: true }) }}><i className="bi bi-trash-fill"></i></button>

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
                <label htmlFor="nombreCliente">Nombre</label>
                <input className="form-control" type="text" name="nombreCliente" nombreCliente="nombreCliente" readOnly
                  onChange={this.handleChange} value={form ? form.nombreCliente : ''} />
                <br />
                <label htmlFor="telefonoCliente">Telefono</label>
                <input className="form-control" type="telefonoCliente" name="telefonoCliente" telefonoCliente="telefonoCliente" readOnly
                  onChange={this.handleChange} value={form ? form.telefonoCliente : ''} />
                <br />
                <label htmlFor="emailCliente">emailCliente</label>
                <input className="form-control" type="text" name="emailCliente" emailCliente="emailCliente" readOnly
                  onChange={this.handleChange} value={form ? form.emailCliente : ''} />
                <br />
                <label htmlFor="valorCompra">valorCompra</label>
                <input className="form-control" type="number" name="valorCompra" valorCompra="valorCompra" readOnly
                  onChange={this.handleChange} value={form ? form.valorCompra : ''} />
                <br />
                <label htmlFor="indicaciones">Indicaciones</label>
                <textarea rows="2" maxLength="245" name="indicaciones" indicaciones="indicaciones" readOnly
                  onChange={this.handleChange} value={form ? form.indicaciones : ''} ></textarea>
                <br />
                <label htmlFor="productosCompra">Productos</label>
                <textarea rows="2" name="productosCompra" productosCompra="productosCompra" readOnly
                  onChange={this.handleChange} value={form ? form.productosCompra : ''} ></textarea>
                <br />
                <label htmlFor="estado">Estado</label>
                <div className="formulario-select">
                  <select className="formulario__select" aria-label=".form-select-sm example" name="estado" id="estado"
                    required value={form ? form.estado : 'Seleccione'} onChange={this.handleChange}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Terminado">Terminado</option>
                  </select>
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
              Estas seguro de eliminar esta Reserva {form && form.nombreCliente}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
              <button className="btn btn-warning" onClick={() => this.setState({ modalEliminar: false })}>No</button>
            </ModalFooter>
          </Modal>
        </div>
        {/* <div className="bt-insertar">
          <button className="btn btn-success bt-add"
            onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>
            <i className="bi bi-plus icon-add"></i>
          </button>
        </div> */}
      </div>
    );
  }

}

export default PedidoAdmin;
