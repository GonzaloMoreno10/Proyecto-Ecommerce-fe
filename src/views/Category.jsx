import React from 'react';
import { Carrousel } from '../components/Carrousel';
import { ItemListContainer } from '../components/ItemListContainer';
import { useParams } from 'react-router-dom';

export const Category = () => {
  const params = useParams();
  return (
    <>
      <Carrousel />
      <ItemListContainer category={params.categoryId} />
    </>
  );
};
