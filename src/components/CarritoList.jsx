/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoItem } from './CarritoItem';
import { carritoService, orderService } from '../services/ApiEcommerce';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';

export const CarritoList = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoader, setLoader] = useState(false);
  const [carrito2, setCarrito2] = useState([]);
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    resolve();
  }, []);

  const comprar = async () => {
    const payloadOrder = {
      items: carrito,
      userId: user.id,
      email: user.email,
    };
    const orden = orderService.crear(payloadOrder);
    const compra = carritoService.comprar(user.id);

    try {
      await orden;
      await compra;
      toast.success(`Compra realizada`);
      setCarrito([]);
      navigate('/orders');
    } catch (err) {
      toast.error(`Ocurrio un error`);
      console.log(err);
    }
  };

  const onHandleEvent = (e) => {
    const filter = carrito.filter((item) => item._id !== e);
    console.log(filter);
    setCarrito(filter);
    actualizarTotal(filter);
  };

  const onHandlePrice = (e) => {
    const cart = carrito;
    for (let i in cart) {
      if (cart[i]._id === e._id) {
        console.log(cart[i].precio);
        cart[i].cantidad = e.cantidad;
        cart[i].precio = e.precio;
      }
    }
    setCarrito(cart);
    actualizarTotal(cart);
  };

  const actualizarTotal = (productos) => {
    let total = 0;
    productos.map((cat) => {
      total += cat.precio;
      return total;
    });
    setTotal(total);
  };
  const resolve = async () => {
    try {
      const result = await carritoService.listar(user.id);
      setCarrito(result.data.productos);
      setCarrito2(result.data.productos);
      setTotal(result.data.total);
      setLoader(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container-sm"
      style={{
        marginTop: '30px',
        padding: '10px',
        background: 'white',
        borderRadius: '15px',
      }}
    >
      <div className="container">
        <h4>Carrito: {carrito.length}</h4>
        <hr />
      </div>
      {!isLoader ? (
        <div className="contenedorLoader">
          <Spinner animation="border" className="loader" variant="primary" />
        </div>
      ) : !carrito.length ? (
        <div
          className="container"
          style={{
            textAlign: 'center',
          }}
        >
          <p>No has agregado ningun producto al carrito aun</p>
          <input
            type="button"
            value="Agrega uno"
            className="btn btn-primary"
            style={{ width: '20%' }}
            onClick={() => navigate('/products')}
          />
        </div>
      ) : (
        carrito.map((product, index) => (
          <>
            <div
              className="container-sm"
              style={{
                textAlign: 'center',
                background: 'white',
              }}
            >
              {/* <div className="row">
                <div className="col-10"> */}
              <CarritoItem
                key={product._id}
                product={carrito[index]}
                onHandlePrice={onHandlePrice}
                onHandleEvent={onHandleEvent}
              />
              {/* </div> */}
              {/* <div className="col" style={{ paddingTop: '50px' }}>
                  <button
                    className="btn btn-link"
                    onClick={() => onClickDelete(product._id)}
                  >
                    {' '}
                    <i className="fa fa-trash"></i>
                  </button>
                </div> */}
              {/* </div> */}
              <hr />
            </div>
          </>
        ))
      )}
      {carrito.length ? (
        <div className="row" style={{ padding: '10px', textAlign: 'right' }}>
          <div className="col-md-3">
            <h4>Total: $ {total}</h4>
          </div>
          <div className="col-md-6 ">
            <h4>Se envia a: {user.direccion}</h4>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={() => comprar()}
              type="button"
            >
              Comprar
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
