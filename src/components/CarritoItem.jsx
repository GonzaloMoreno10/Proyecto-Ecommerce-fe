/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { carritoService } from '../services/ApiEcommerce';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';
import { ItemCount } from './ItemCount';
toast.configure();
export const CarritoItem = ({ product, onHandleEvent, onHandlePrice }) => {
  const [producto, setProducto] = useState(product);
  const [cantidad, setCantidad] = useState(product.cantidad);
  const [precio, setPrecio] = useState(product.precio);
  const user = useUser();
  const handleDelete = async () => {
    try {
      console.log(product._id);
      await carritoService.eliminar(user.id, producto._id);
      toast.success('Producto removido del carrito');
      onHandleEvent(product._id);
    } catch (err) {
      toast.error('Ocurrio un error');
      console.log(err);
    }
  };

  const onHandlePrecio = (e) => {
    setPrecio(e);
    const products = product;
    products.precio = precio;
    products.cantidad = cantidad;
    onHandlePrice(products);
  };

  const handleCount = (e) => {
    setCantidad(e);
  };
  return (
    <div
      className="row"
      style={{
        padding: '20px',
        margin: '0px auto',
        backgroundColor: 'white',
      }}
    >
      <div className="col producto-tumb">
        <img src={producto.foto} alt="" style={{ width: '60px' }} />
      </div>
      <div className="col" style={{ paddingTop: '30px' }}>
        <h6>
          {producto.nombre} x {cantidad}{' '}
        </h6>
      </div>
      <div className="col" style={{ paddingTop: '22px' }}>
        <h4>${precio.toFixed(3)}</h4>
      </div>
      <div className="col" style={{ paddingTop: '22px' }}>
        <ItemCount
          cantidad={cantidad}
          precio={producto.precio.toFixed(3)}
          onHandleCount={handleCount}
          onHandlePrecio={onHandlePrecio}
        />
      </div>
      <div className="col">
        <h4>
          <button
            className="btn btn-link"
            style={{ paddingTop: '22px' }}
            onClick={() => handleDelete()}
          >
            <i className="fa fa-trash" style={{ fontSize: '30px' }}></i>
          </button>
        </h4>
      </div>
    </div>
  );
};
