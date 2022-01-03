import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Form, Button } from 'react-bootstrap';
import { userService } from '../services/ApiEcommerce';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../hooks/setUser';
toast.configure();

export const EditUser = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [email, setEmail] = useState(user.email);
  const [nombre, setNombre] = useState(user.nombre);
  const [telefono, setTelefono] = useState(user.telefono);
  const [direccion, setDireccion] = useState(user.direccion);
  const [edad, setEdad] = useState(user.edad);
  const handleSubmit = (e) => {
    e.preventDefault();
    edit();
  };

  const edit = async () => {
    const payload = {
      email: email,
      nombre: nombre,
      telefono: telefono,
      direccion: direccion,
      edad: edad,
    };

    const toSet = {
      email: email,
      nombre: nombre,
      telefono: telefono,
      direccion: direccion,
      edad: edad,
      _id: user.id,
      avatar: user.avatar,
    };

    console.log(user._id);
    const response = userService.editUser(payload, user.id).then((res) => {
      console.log(res.data);
      return res.data;
    });

    try {
      const res = await response;
      console.log(res);
      setUser(toSet);
      toast.success(`Perfil actualizado`);
      navigate('/userConfig');
    } catch (err) {
      toast.error('Ocurrio un error');
      navigate('/userConfig');
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="group">
        <input
          type="email"
          name="email"
          className="used"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>
      <div className="group">
        <input
          type="text"
          name="nombre"
          className="used"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Nombre</label>
      </div>
      <div className="group">
        <input
          type="text"
          name="direccion"
          className="used"
          onChange={(e) => {
            setDireccion(e.target.value);
          }}
          value={direccion}
        />{' '}
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Direccion</label>
      </div>
      <div className="group">
        <input
          type="text"
          name="edad"
          className="used"
          value={edad}
          onChange={(e) => {
            setEdad(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Edad</label>
      </div>
      <div className="group">
        <input
          type="text"
          name="telefono"
          className="used"
          value={telefono}
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Telefono</label>
      </div>
      <Button type="submit" style={{ width: '100%' }}>
        Confirmar
      </Button>
    </Form>
  );
};
