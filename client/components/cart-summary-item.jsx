import React from 'react';

export default function CartSummaryItem(props) {

  return (
    <>
      <div className="row border my-4">
        <img className="col-4 mx-auto my-auto image-contain" src={props.image} />
        <div className="col-8 font-weight-bold mx-auto my-auto">
          <p>{props.name}</p>
          <p>${(props.price / 100).toFixed(2)}</p>
          <p>{props.shortDescription}</p>
        </div>
      </div>
    </>
  );
}
