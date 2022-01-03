import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
toast.configure();
export const Singin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [direccion, setCalle] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();
  const singin = async () => {
    const objeto = { email, password, nombre, edad, telefono, direccion };
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/users/singin',
        objeto
      );
      console.log(data);
      toast.success('Bienvenido ' + nombre);
      navigate('/login');
    } catch (err) {
      toast.error('Ocurrio un error');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    singin();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          placeholder="Nombre y Apellido"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="phone"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
          placeholder="Telefono"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setEdad(e.target.value);
          }}
          placeholder="Edad"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          onChange={(e) => {
            setCalle(e.target.value);
          }}
          placeholder="Calle"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="email@example.com"
        />
      </Form.Group>
      <Button type="submit" style={{ width: '100%' }}>
        Ingresar
      </Button>
      <br />
      <br />
      <a href="/singin" style={{ textDecoration: 'none' }}>
        No tenes cuenta? Registrate
      </a>
    </Form>
  );
};
