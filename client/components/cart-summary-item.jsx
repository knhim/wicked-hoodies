import React from 'react';

export default function CartSummaryItem(props) {

  return (
    <>
      <div className="row border my-2">
        <img className="col-6 cart-images" alt={props.name} src={props.image}/>
        <div className="card-body col-6 font-weight-bold d-flex flex-column justify-content-center">
          <p>{props.name}</p>
          <p>${(props.price / 100).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}
