import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../menu/menu.css";
import Button from "../menu/buttonPdf";
import useLocalStorage from "../hooks/useLocalStorage";
import alertamsg from "../menu/alert";



function usePagination() {

  const [cartItems, setCartItems] = useLocalStorage([], "Carro");

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);



  //function
  const getData = async () => {
    const res = await axios.get(
      `https://cafecito-backend.herokuapp.com/api/platos`
    );
    const data = res.data;
    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((pd) => (
      <section key={pd.id} className="menu">
        <div className="container">
          <div className="menu-container">
            <div className="menu-item filter-starters">
              <img src={pd.imgsrc} className="menu-img" alt="" />
              <div className="menu-content">
                <label className="nombre">{pd.title}</label>
                <span className="precio">{pd.precio} $</span>
              </div>
              <div className="menu-ingredients">
                <p className="descrip">
                  {pd.descripcion}
                  <i
                    className="bi-cart add-to-cart-btn"
                    
                    onClick={() => {
                      recarga();
                      onAdd(pd);
                      alertamsg();
                    }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const onAdd = (pd) => {
    const exist = cartItems.find((x) => x.id === pd.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === pd.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...pd, qty: 1 }]);
    }
  };
 
  const recarga = ()=>{
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  useEffect(() => {
    // eslint-disable-next-line
    getData();
    // eslint-disable-next-line
  }, [offset]);

  return (
    <section className="section">
      <div className="menu-button">
        <label className="text-menu">Menú</label>
        <Button />
      </div>
      <div className="platos-menu">{data}</div>
      <div>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </section>
  );
}

export default usePagination;
