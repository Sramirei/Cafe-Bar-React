import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.precio, 0);
  const taxPrice = itemsPrice * 0.19;
  
  const totalPrice = itemsPrice + taxPrice;

  const valor = localStorage.setItem("ValorF",totalPrice);
  return (
    
      <main>
      <div className="container">
        {cartItems.length === 0 && <div>El Carrito esta vacio</div>}
        <table>
              <thead>
              <td><b>Referencia</b></td>
              <td><b>Nombre</b></td>
              <td><b></b></td>
              <td><b>Cantidad</b></td>
              <td><b>Precio</b></td>
              </thead>
              <tbody>
        {cartItems.map((item) => (    
            <tr>
                <td style={{ textAlign:'center'}}><img width="150px"src={item.imgsrc} alt={item.title} ></img></td>
                <td style={{ textAlign:'center'}}>{item.title}</td>
                <td style={{ textAlign:'center'}}><button  onClick={() => onRemove(item)} className="remove ">-</button>
                    <button onClick={() => onAdd(item)} className="add">+</button>
                </td>
                <td style={{ margin:'0px auto'}}>{item.qty}</td>
                <td style={{ textAlign:'center'}}>${item.precio.toFixed(2)}</td></tr>    
        ))}
        </tbody>
        </table>
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2 text-left">Precio </div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2 text-left">Iva</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            

            <div className="row">
              <div className="col-2 text-left">
                <strong>Precio Final</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
                {valor}
              </div>
            </div>
            <hr />
            <div >
              <button style={{ padding: '10px' }} className="btn">
               <Link as={Link} to="/compra">Termina tu compra </Link>  
              </button>
            </div>
          </>
        )}
      </div>
      
      </main>
  );
}
