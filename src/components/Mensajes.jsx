import { mensajeService } from '../services/ApiEcommerce';
import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export const Mensaje = () => {
  const { email } = useUser();
  console.log(email);
  const [mensajes, setMensajes] = useState([]);
  useEffect(() => {
    getMensajes();
  }, []);

  const getMensajes = async () => {
    try {
      const { data } = await mensajeService.getByEmail(email);
      setMensajes(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container-sm"
      style={{
        textAlign: 'center',
        border: '1px solid gray',
        borderRadius: '5px',
        margin: '0px auto',
        background: 'white',
      }}
    >
      {mensajes
        ? mensajes.map((msj) => (
            <div className="row">
              <div className="col">
                <p>{msj.author.email} </p>
              </div>
              <div className="col">
                <p>{msj.texto} </p>
              </div>
              <div className="col">{msj.fecha}</div>
            </div>
          ))
        : ''}
    </div>
  );
};
