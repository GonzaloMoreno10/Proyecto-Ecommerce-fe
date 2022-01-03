/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Item } from './item';
import { Row, Spinner } from 'react-bootstrap';
import { producService } from '../services/ApiEcommerce';
export const ItemList = ({ category }) => {
  const [product, setProduct] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [categorys, setCategorys] = useState(category);
  useEffect(() => {
    resolve();
  }, []);

  const handleDelete = (e) => {
    console.log(e);
    setProduct(product.filter((item) => item._id !== e));
  };
  const resolve = async () => {
    const products = await producService.getProducts();
    console.log(products.data);
    const filter = products.data.filter((item) => item.categoria === categorys);
    console.log(filter);
    setProduct(!category ? products.data : filter);
    setLoader(true);
    return products;
  };

  return (
    <div>
      <div className="container-fluid" id="Products">
        {isLoader ? (
          <Row md={8} key={product._id}>
            {product.map((product) => (
              <Item
                id={product._id}
                key={product._id}
                product={product}
                onHandleDelete={handleDelete}
              />
            ))}
          </Row>
        ) : (
          <div className="contenedorLoader">
            <Spinner animation="border" className="loader" variant="primary" />
          </div>
        )}
      </div>
    </div>
  );
};
