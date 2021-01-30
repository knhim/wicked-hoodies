import React from 'react';

export default function CartSummaryItem(props) {

  return (
    <>
      <div className="row border my-4">
        <img className="col-4 cart-images" alt={props.name} src={props.image}/>
        <div className="card-body col-8 font-weight-bold d-flex flex-column align-items-center justify-content-center">
          <p>{props.name}</p>
          <p>${(props.price / 100).toFixed(2)}</p>
          <p>{props.shortDescription}</p>
        </div>
      </div>
    </>
  );
}
