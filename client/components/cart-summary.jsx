import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cart = props.cart;
  let total = 0;

  // used to call multiple functions
  function handleClick() {
    props.setView('checkout', { params: {} });
    props.handleModal();
  }

  const cartItems = cart.map(items => {
    return (
      <CartSummaryItem
        key={items.cartItemId}
        image={items.image}
        name={items.name}
        price={items.price}
        shortDescription={items.shortDescription}
        setView={() => this.props.setView('cart', {})}
      />
    );
  });

  for (let i = 0; i < props.cart.length; i++) {
    total += props.cart[i].price;
  }

  if (cart.length === 0) {
    return (
      <>
        <p onClick={() => props.setView('catalog', { params: {} })}>&lt; Back to catalog</p>
        <p>There are no items in your cart!</p>
        <p>Cart Total: ${(total).toFixed(2)}</p>
      </>
    );
  } else {
    return (
      <>
        <p className="font-weight-bold" onClick={() => props.setView('catalog', { params: {} })}>&lt; Back to catalog</p>
        { cartItems}
        <div className="d-flex justify-content-between align-items-center">
          <p className="font-weight-bold">Cart Total: ${(total / 100).toFixed(2)}</p>
          <button onClick={() => handleClick()} type="submit" className="btn btn-primary">Checkout</button>
        </div>
      </>

    );
  }
}
