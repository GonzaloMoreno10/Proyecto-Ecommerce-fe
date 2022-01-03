import React, { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ItemCount } from './ItemCount';
import { carritoService } from '../services/ApiEcommerce';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
toast.configure();

export const ItemDetail = ({ product }) => {
  const [cantidad, setCantidad] = useState(1);
  const user = cookies.get('id');
  const navigate = useNavigate();
  const onClickSend = async () => {
    try {
      const payload = { productId: product._id, userId: user };
      console.log(payload);
      const { data } = await carritoService.agregar(payload, {
        cantidad: cantidad,
      });
      toast.success(`${product.nombre} added`);
      navigate('/carrito');
      console.log(data);
    } catch (err) {
      toast.error('El producto ya se encuentra en el carrito');
    }
  };

  const handleCount = (e) => {
    console.log(e);
    setCantidad(e);
  };

  return (
    <div className="detailContainer">
      <Row className="justify-content-md-center">
        <Col className="image" sm={8}>
          {product ? (
            <div className="productThumb">
              <img src={product.foto} alt="" />
            </div>
          ) : (
            <Spinner animation="border" className="loader" variant="primary" />
          )}
        </Col>
        <Col className="info" sm={3}>
          <strong id="title">{product.nombre}</strong>
          <br />
          <p> {product.descripcion} </p>
          <div id="price">
            <p>$ {product.precio} X unidad </p>
          </div>
          <ItemCount product={product} onHandleCount={handleCount} />
          {user ? (
            <button className="btn btn-primary" onClick={() => onClickSend()}>
              Agregar al carrito
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
            >
              Loguearse
            </button>
          )}
        </Col>
      </Row>
    </div>
  );
};
