import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { producService, categoriaService } from '../services/ApiEcommerce';
toast.configure();
export const EditProduct = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [product, setProduct] = useState({});
  const [categorias, setCategorias] = useState();
  const [categoria, setCategoria] = useState(product.categoria);
  const name = product.nombre;
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    getProduct();

    console.log(categorias);
  }, []);

  const getProduct = async () => {
    try {
      const res = await producService.getProductById(productId);
      const result = await categoriaService.getCategorias();
      console.log(result);
      setCategorias(result.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async () => {
    try {
      const payload = {
        nombre: nombre,
        descripcion: descripcion,
        foto: foto,
        precio: precio,
        stock: stock,
        categoria: categoria,
      };
      const result = await producService.putProduct(product._id, payload);
      console.log(result);
      toast.success('Producto actualizado');
      navigate('/products');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    console.log('entre en handleSubmit');
    e.preventDefault();
    editProduct();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          placeholder="Nombre"
          value={name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          placeholder="Descripcion"
          value={product.descripcion}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setFoto(e.target.value);
          }}
          placeholder="Imagen"
          value={product.foto}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setPrecio(e.target.value);
          }}
          value={product.precio}
          placeholder="Precio"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setStock(e.target.value);
          }}
          value={product.stock}
          placeholder="Stock"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        {categorias ? (
          <Form.Select
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            {categorias.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.nombre}{' '}
              </option>
            ))}
          </Form.Select>
        ) : (
          ''
        )}
      </Form.Group>
      <Button type="submit" style={{ width: '100%' }}>
        Aceptar
      </Button>
    </Form>
  );
};
