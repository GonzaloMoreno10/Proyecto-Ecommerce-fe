/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/ApiEcommerce';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';
import { Row, Col, Container } from 'react-bootstrap';
toast.configure();
export const Orders = () => {
  useEffect(() => {
    getOrders();
  }, []);
  const user = useUser();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const result = await orderService.listar(user.id);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {orders.length ? (
        <Container sm style={{ padding: '50px' }}>
          <div
            className="container-sm"
            style={{
              textAlign: 'center',
              margin: '15px',
              background: 'white',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <strong>Mis Compras</strong>
          </div>
          {orders.map((order) => (
            <Container
              sm
              style={{
                background: 'white',
                borderRadius: '10px',
                padding: '15px',
                margin: '10px',
              }}
            >
              <Row style={{ background: 'white' }}>
                <strong> Nro Orden: {order.nroOrden}</strong>
              </Row>
              {order.items.map((item) => (
                <>
                  <hr />

                  <Row style={{ background: 'white' }}>
                    <Col>
                      <div
                        className="productThumb"
                        style={{
                          width: '100px',
                          height: '100px',
                          border: '1px solid gray',
                          borderRadius: '5px',
                        }}
                      >
                        <img src={item.foto} width="" alt="" />
                      </div>
                    </Col>
                    <Col>
                      <p>
                        {item.descripcion} x {item.cantidad}{' '}
                      </p>
                      <strong>
                        $ {item.precioTotal ? item.precioTotal : item.precio}{' '}
                      </strong>
                    </Col>
                    <Col md={{ span: 3, offset: 3 }}>
                      <p style={{ color: 'green' }}>
                        {parseInt(order.estado) === 1
                          ? 'Confirmada'
                          : 'En camino'}
                      </p>
                    </Col>
                  </Row>
                </>
              ))}
              <br />
              <strong style={{ color: 'blue' }}>
                {' '}
                Total: ${order?.precioOrden?.toFixed(3)}{' '}
              </strong>
            </Container>
          ))}
        </Container>
      ) : (
        <Container sm style={{ padding: '50px' }}>
          <div
            className="container-sm"
            style={{
              textAlign: 'center',
              margin: '15px',
              background: 'white',
              padding: '50px',
              borderRadius: '5px',
            }}
          >
            <p>Aun no tienes compras, </p>
            <input
              type="button"
              value="Agrega uno"
              className="btn btn-primary"
              style={{ width: '20%' }}
              onClick={() => navigate('/products')}
            />
          </div>
        </Container>
      )}
    </>
  );
};
