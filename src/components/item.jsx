import React from 'react';
import { Card } from 'react-bootstrap';
import { carritoService } from '../services/ApiEcommerce';
import { useUser } from '../hooks/useUser';
import { producService } from '../services/ApiEcommerce';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
toast.configure();
export const Item = ({ product, onHandleDelete }) => {
  const user = useUser();
  const navigate = useNavigate();
  const onClickDelete = async () => {
    try {
      await producService.delProduct(product._id);
      toast.success('Producto eliminado');
      onHandleDelete(product._id);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (id) => {
    try {
      const payload = { productId: id, userId: user.id };
      await carritoService.agregar(payload, {
        cantidad: 1,
      });
      toast.success(`${product.nombre} added`);
    } catch (err) {
      toast.error('El producto ya se encuentra en el carrito');
    }
  };
  return (
    <Card className="productTemplate" id={product._id} key={product._id}>
      {parseInt(user.admin) === 1 ? (
        <Card.Body style={{ textAlign: 'right' }}>
          <button
            className="btn btn-danger"
            style={{ margin: '10px' }}
            onClick={() => onClickDelete()}
          >
            <i className="fa fa-trash"></i>
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/editProduct/${product._id}`)}
          >
            <i className="fa fa-edit"></i>
          </button>
        </Card.Body>
      ) : (
        ''
      )}
      <div
        className="productThumb"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img src={product.foto} alt="" />
      </div>
      <Card.Body id="productTemplateBody">
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>
          <small> {product.descripcion}</small>
        </Card.Text>
      </Card.Body>

      {user.id ? (
        <Card.Body id="productTemplateBottom">
          <hr />
          <button
            onClick={() => addProduct(product._id)}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <i
              style={{ fontSize: '20px' }}
              className="fa fa-cart-arrow-down"
            ></i>
          </button>
        </Card.Body>
      ) : (
        ''
      )}
    </Card>
  );
};
