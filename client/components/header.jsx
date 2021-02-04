import React from 'react';

export default function Header(props) {

  return (
    <div className="row bg-secondary text-light">
      <h1 className="col-7 text-center">$ Wicked Hoodies</h1>
      <h2 className="col-5 text-center" onClick={() => props.setView('cart', {})}>{props.cartItemCount} item(s) <i className="fas fa-shopping-cart"></i></h2>
    </div>
  );

}
