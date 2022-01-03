import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { producService, categoriaService } from '../services/ApiEcommerce';
toast.configure();
export const CreateProduct = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState(1);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, []);
  const getCategorias = async () => {
    try {
      const { data } = await categoriaService.getCategorias();
      console.log(data);
      setCategorias(data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const createProduct = async () => {
    try {
      const payload = {
        nombre: nombre,
        descripcion: descripcion,
        foto: foto,
        precio: precio,
        stock: stock,
        categoria: categoria,
      };
      const result = await producService.postProduct(payload);
      console.log(result);
      toast.success('Producto Cread');
      navigate('/products');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    console.log('entre en handleSubmit');
    e.preventDefault();
    createProduct();
  };
  console.log(categoria);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          placeholder="Nombre"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          placeholder="Descripcion"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setFoto(e.target.value);
          }}
          placeholder="Imagen"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setPrecio(e.target.value);
          }}
          placeholder="Precio"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setStock(e.target.value);
          }}
          placeholder="Stock"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Select
          onChange={(e) => {
            setCategoria(e.target.value);
          }}
        >
          <option>1</option>
          {categorias.map((cat) => (
            <option value={cat._id} key={cat._id}>
              {cat.nombre}{' '}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button type="submit" style={{ width: '100%' }}>
        Aceptar
      </Button>
    </Form>
  );
};
