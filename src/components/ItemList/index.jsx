import React from 'react';
import './styles.css';

function ItemList({title, description, link}) {
  return (
    <div className='item-list'>
        <a href={link} target="_blank">
        <strong>{title}</strong>
        </a>
        <p>{description}</p>
        <hr />
    </div>
  );
}

export default ItemList;