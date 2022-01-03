/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

export const ItemCount = function ({
  cantidad,
  precio,
  onHandleCount,
  onHandlePrecio,
}) {
  let [number, setNumber] = useState(cantidad);
  let [price, setPrice] = useState(precio);
  const onClickOperation = (operacion) => {
    if (operacion === 'suma') {
      const num = number + 1;
      const prec = num * precio;
      onHandlePrecio(prec);
      onHandleCount(num);
      setNumber(num);
      setPrice(prec);
    } else {
      if (number > 1) {
        const num = number - 1;
        const prec = num * precio;
        onHandlePrecio(prec);
        onHandleCount(num);
        setNumber(num);
        setPrice(prec);
      }
    }
  };

  return (
    <>
      <div id="itemCount">
        <Row>
          <Col>
            <button
              className="btnOperation"
              id="buttonLess"
              onClick={() => {
                onClickOperation('resta');
              }}
            >
              <i className="fa fa-minus"></i>
            </button>
          </Col>
          <Col>
            <p>{number} </p>
          </Col>
          <Col>
            <button
              className="btnOperation"
              id="buttonPluss"
              onClick={() => {
                onClickOperation('suma');
              }}
            >
              <i className="fa fa-plus"></i>
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};
