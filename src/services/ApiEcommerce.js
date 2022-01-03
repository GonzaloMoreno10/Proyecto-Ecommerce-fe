import axios from 'axios';
import {
  productServices,
  userServices,
  carritoServices,
  ordesServices,
  categoriasService,
  msjServices,
} from './ecommerce';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    bearer: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

export const producService = productServices(instance);
export const categoriaService = categoriasService(instance);
export const userService = userServices(instance);
export const carritoService = carritoServices(instance);
export const orderService = ordesServices(instance);
export const mensajeService = msjServices(instance);
