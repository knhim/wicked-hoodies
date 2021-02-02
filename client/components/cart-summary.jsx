import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cart = props.cart;
  let total = 0;

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
        <p>Cart Total: {total}</p>
      </>
    );
  } else {
    return (
      <>
        <p onClick={() => props.setView('catalog', { params: {} })}>&lt; Back to catalog</p>
        { cartItems}
        <p>Cart Total: ${(total / 100).toFixed(2)}</p>
      </>

    );
  }
}
