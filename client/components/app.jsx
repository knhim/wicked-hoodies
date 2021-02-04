import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', init)
      .then(res => res.json())
      .then(data => {
        const joinArr = [...this.state.cart, data];
        this.setState({ cart: joinArr });
      });
  }

  placeOrder(orderDetails) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    };

    fetch('/api/orders', init)
      .then(res => res.json())
      .then(data => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      });
  }

  render() {

    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container">
            <div className="row d-flex justify-content-center">
              <ProductList setView={this.setView} />
            </div>
          </div>
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container">
            <div className="row">
              <ProductDetails addToCart={this.addToCart} setView={this.setView} params={this.state.view.params} />
            </div>
          </div>
        </>
      );

    } else if (this.state.view.name === 'cart') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <div className="container">
            <CartSummary cart={this.state.cart} setView={this.setView} />
          </div>
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container">
            <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} />
          </div>

        </>
      );
    }

  }

}
