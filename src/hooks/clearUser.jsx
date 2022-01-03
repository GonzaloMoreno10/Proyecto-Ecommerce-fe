import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();
export const clearUser = (user) => {
  cookies.remove('id');
  cookies.remove('nombre');
  cookies.remove('direccion');
  cookies.remove('avatar');
  cookies.remove('email');
  cookies.remove('telefono');
  cookies.remove('edad');
  cookies.remove('admin');
  localStorage.clear();
};
