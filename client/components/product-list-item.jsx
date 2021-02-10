import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card m-3 shadow-sm desktop pointer" onClick={props.setView} >
      <img className="image-contain" src={props.image} alt={props.name} />
      <div className="card-body d-flex flex-column text-center justify-content-center">
        <h5 className="card-title">{props.name}</h5>
        <div className="card-text">
          <p>${(props.price / 100).toFixed(2)}</p>
          <p>{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
