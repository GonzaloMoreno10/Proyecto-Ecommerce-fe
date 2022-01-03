export const productServices = (instance) => {
  const getProducts = () => instance.get('/productos/');
  const getProductById = (id) => instance.get(`/productos/${id}`);
  const postProduct = (product) => instance.post('/productos/', product);
  const delProduct = (id) => instance.delete(`/productos/${id}`);
  const putProduct = (id, product) => instance.put(`/productos/${id}`, product);

  return {
    getProducts,
    getProductById,
    postProduct,
    delProduct,
    putProduct,
  };
};

export const categoriasService = (instance) => {
  const getCategorias = () => instance.get('/categorias/');
  return {
    getCategorias,
  };
};

export const userServices = (instance) => {
  const login = (user) => instance.post('/users/login', user);
  const singin = (user) => instance.post('/users/singin', user);
  const getUser = (userId) => instance.get(`/users/userInfo/${userId}`);
  const editPicture = (userId, avatar) =>
    instance.post(`/users/editPicture/${userId}`, avatar);
  const editUser = (user, userId) =>
    instance.put(`/users/edit/${userId}`, user);
  return {
    login,
    singin,
    getUser,
    editUser,
    editPicture,
  };
};

export const ordesServices = (instance) => {
  const crear = (payload) => instance.post('orders/', payload);
  const listar = (userId) => instance.get(`/orders/${userId}`);
  return {
    crear,
    listar,
  };
};

export const msjServices = (instance) => {
  const getByEmail = (email) => instance.get(`/mensajes/${email}`);
  return { getByEmail };
};
export const carritoServices = (instance) => {
  const agregar = (payload, cantidad) =>
    instance.post(`/carrito/${payload.productId}/${payload.userId}`, cantidad);
  const listar = (userId) => instance.get(`/carrito/${userId} `);
  const comprar = (userId) => instance.post(`/carrito/compra/new/${userId}`);
  const eliminar = (userId, productId) =>
    instance.delete(`/carrito/${productId}/${userId}`);
  return {
    agregar,
    listar,
    comprar,
    eliminar,
  };
};
