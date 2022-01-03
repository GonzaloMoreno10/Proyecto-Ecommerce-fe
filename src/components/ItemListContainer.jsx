import React from 'react';
import { ItemList } from './itemList';

export const ItemListContainer = ({ category }) => {
  return (
    <div className="itemListContainer">
      <ItemList category={category} />;
    </div>
  );
};
