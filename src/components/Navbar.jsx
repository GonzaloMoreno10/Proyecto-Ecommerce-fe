/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import { CartWidget } from './CartWidget';
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { categoriaService } from '../services/ApiEcommerce';
import { clearUser } from '../hooks/clearUser';
const cookies = new Cookies();

export const NavBar = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const logout = () => {
    clearUser();
    navigate('/login');
  };
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

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav>
          <Nav.Link href="/products">
            <CartWidget />
          </Nav.Link>
          <Nav.Link
            href="/products"
            style={{ color: 'white', fontSize: '20px' }}
          >
            Ecommerce
          </Nav.Link>
          <NavDropdown id="dropdown" title="Categorias">
            {categorias.map((cat) => (
              <NavDropdown.Item
                onClick={() => navigate(`/category/${cat._id}`)}
                key={cat._id}
              >
                {cat.nombre}{' '}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>

        <Nav>
          {user.nombre ? (
            <>
              {parseInt(user.admin) === 1 ? (
                <Nav.Link href="/products/create">Add Product</Nav.Link>
              ) : (
                ''
              )}
              <Nav.Link href="/chat">
                <i
                  className="fa fa-bell"
                  style={{ fontSize: '30px', color: 'white' }}
                ></i>
              </Nav.Link>
              <Nav.Link href="/orders">
                <i
                  className="fa fa-tag"
                  style={{ fontSize: '30px', color: 'white' }}
                ></i>
              </Nav.Link>

              <Nav.Link eventKey={2} href="/carrito">
                <i
                  style={{ fontSize: '30px', color: 'white' }}
                  className="fa fa-cart-arrow-down"
                ></i>
              </Nav.Link>
              <NavDropdown
                title={
                  (user.nombre,
                  (
                    <img
                      src={user.avatar}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '100%',
                      }}
                      alt=""
                    />
                  ))
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/userConfig">
                  Configuration
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link eventKey={2} href="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
