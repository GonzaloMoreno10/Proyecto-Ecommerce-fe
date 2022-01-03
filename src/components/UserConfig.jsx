import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/ApiEcommerce';
import Cookies from 'universal-cookie/es6';
import { toast } from 'react-toastify';
toast.configure();
export const UserConfig = () => {
  const cookies = new Cookies();
  const user = useUser();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(user.avatar);
  const displayForm = () => {
    const doc = document.getElementById('formDiv');
    console.log(doc);
    doc.style.display = 'block';
  };

  const onClickSend = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const response = await userService.editPicture(user.id, formData);
      cookies.set('avatar', response.data.avatar, { path: '/' });
      toast.success('Perfil actualizado');
      navigate('/userConfig');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '5%' }}>
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card" style={{ textAlign: 'center' }}>
              <div
                className="card-body"
                style={{ paddingTop: '80px', textAlign: 'center' }}
              >
                <div
                  className="d-flex flex-column align-items-center text-center"
                  style={{ textAlign: 'center' }}
                >
                  <img
                    src={avatar}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                    height="150"
                  />
                  <br />
                  <input
                    onClick={() => displayForm()}
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '150px' }}
                    value="Modificar Imagen"
                    id="modifImage"
                  />

                  <div
                    className="mb-3"
                    id="formDiv"
                    style={{ display: 'none' }}
                  >
                    <input
                      className="form-control form-control-sm"
                      name="avatar"
                      id="formFileSm"
                      onChange={(e) => {
                        console.log(e);
                        setAvatar(e.target.files[0]);
                      }}
                      type="file"
                    />
                    <br />
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Aceptar"
                      onClick={() => onClickSend()}
                      style={{ width: '100px' }}
                    />
                  </div>
                  <div className="mt-3">
                    <h4>{user.nombre}</h4>
                    <p className="text-muted font-size-sm">{user.direccion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body" style={{ paddingTop: '20px' }}>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">nombre y Apellido</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.nombre}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.telefono}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">edad</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.edad} años
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.direccion}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12" style={{ textAlign: 'center' }}>
                    <input
                      type="button"
                      className="btn btn-info "
                      target="__blank"
                      value="Editar"
                      style={{ width: '20%' }}
                      onClick={() => navigate('/editUser')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
