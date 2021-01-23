import React from 'react';

export default function Header(props) {
  return (
    <div className="d-flex align-items-center justify-content-around bg-secondary text-light">
      <h1>$ Wicked Sales</h1>
      <h2>{props.cartItemCount} item(s) <i className="fas fa-shopping-cart"></i></h2>
    </div>
  );

}
