import React from 'react';

export default function Header(props) {

  return (
    <div className="row bg-secondary text-light">
      <h1 className="col-8">$ Wicked Sales</h1>
      <h2 className="col-4" onClick={() => props.setView('cart', {})}>{props.cartItemCount} item(s) <i className="fas fa-shopping-cart"></i></h2>
    </div>
  );

}
