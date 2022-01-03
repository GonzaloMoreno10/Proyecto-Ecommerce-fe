import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';
import React from 'react';
import { NavBar } from '../components/Navbar';
import { Home } from '../views/Home';
import { Detail } from '../views/Detail';
import { Category } from '../views/Category';
import { Access } from '../views/Login';
import { Carrito } from '../views/Carrito';
import { ConfigUser } from '../views/UserConfig';
import { UserEdit } from '../views/EditUser';
import { SinginRoute } from '../views/Singin';
import { OrdersView } from '../views/Orders';
import { EditProductView } from '../views/editProduct';
import { CreateProductView } from '../views/CreateProductView';
import { useUser } from '../hooks/useUser';
import { MensajeView } from '../views/MensajesView';
import { ChatView } from '../views/ChatView';
export const Rutas = () => {
  const user = useUser();
  const logged = user.id ? true : false;

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/products"
          element={user.id ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/products/:productId"
          element={logged ? <Detail /> : <Navigate to="/login" />}
        ></Route>
        <Route exact path="/login" element={<Access />}></Route>
        <Route
          exact
          path="/userConfig"
          element={logged ? <ConfigUser /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/editUser"
          element={logged ? <UserEdit /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/orders"
          element={logged ? <OrdersView /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/chat"
          element={user?.admin ? <ChatView /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/products/create"
          element={
            user?.admin ? <CreateProductView /> : <Navigate to="/login" />
          }
        ></Route>
        <Route exact path="/singin" element={<SinginRoute />}></Route>
        <Route
          exact
          path="/category/:categoryId"
          element={logged ? <Category /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/editProduct/:productId"
          element={logged ? <EditProductView /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/misMensajes"
          element={logged ? <MensajeView /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/carrito"
          element={logged ? <Carrito /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
