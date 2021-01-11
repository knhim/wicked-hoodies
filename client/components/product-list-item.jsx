import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card m-3 shadow-sm" style={{ width: '30%' }}>
      <img className="card-img-top image-contain" src={props.image} alt={props.name} />
      <div className="card-body pt-2">
        <h5 className="card-title">{props.name}</h5>
        <p>${(props.price / 100).toFixed(2)}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}
