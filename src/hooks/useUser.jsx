import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();
export const useUser = () => {
  const id = cookies.get('id');
  const nombre = cookies.get('nombre');
  const direccion = cookies.get('direccion');
  const avatar = cookies.get('avatar');
  const email = cookies.get('email');
  const telefono = cookies.get('telefono');
  const edad = cookies.get('edad');
  const admin = cookies.get('admin');

  const user = {
    id: id,
    nombre: nombre,
    direccion: direccion,
    avatar: avatar,
    email: email,
    telefono: telefono,
    edad: edad,
    admin: admin,
  };

  return user;
};
