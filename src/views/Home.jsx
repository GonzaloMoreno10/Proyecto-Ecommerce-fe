import React from 'react';
import { ItemListContainer } from '../components/ItemListContainer';
import { Carrousel } from '../components/Carrousel';

export const Home = () => {
  return (
    <>
      <Carrousel />
      <ItemListContainer />
    </>
  );
};
