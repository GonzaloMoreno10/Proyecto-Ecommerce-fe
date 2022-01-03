import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();
export const setUser = (user) => {
  cookies.set('id', user._id, { path: '/' });
  cookies.set('nombre', user.nombre, { path: '/' });
  cookies.set('direccion', user.direccion, { path: '/' });
  cookies.set('avatar', user.avatar, { path: '/' });
  cookies.set('email', user.email, { path: '/' });
  cookies.set('telefono', user.telefono, { path: '/' });
  cookies.set('edad', user.edad, { path: '/' });
  cookies.set('admin', user.admin, { path: '/' });
};
