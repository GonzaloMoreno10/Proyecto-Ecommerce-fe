/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import { producService } from '../services/ApiEcommerce';

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const resolveProductDetail = async () => {
    try {
      const product = await producService.getProductById(params.productId);
      setProduct(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    resolveProductDetail();
  }, []);

  return <ItemDetail product={product} />;
};
