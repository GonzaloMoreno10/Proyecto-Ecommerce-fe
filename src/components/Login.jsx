import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../hooks/setUser';
import axios from 'axios';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = async () => {
    const objeto = { email, password };
    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/login',
        objeto
      );
      const token = res.data.token;
      console.log(token);
      const usuario = jwt(token).user;
      console.log(usuario);
      console.log(localStorage.getItem('token'));
      setUser(usuario);
      localStorage.setItem('token', token);
      navigate('/products');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <Form onSubmit={handleSubmit}>
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
