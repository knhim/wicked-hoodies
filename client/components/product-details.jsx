import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails() {
    const productId = this.props.params.productId;
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <>
          <h2 onClick={() => this.props.setView('catalog', { params: {} })}>&lt; Back to catalog</h2>
          <div className="card m-3" /* onClick={props.setView} */>
            <img className="card-img-top image-contain" src={this.state.product.image} alt={this.state.product.name} />
            <div className="card-body pt-2">
              <h5 className="card-title">{this.state.product.name}</h5>
              <p>${(this.state.product.price / 100).toFixed(2)}</p>
              <p className="card-text">{this.state.product.shortDescription}</p>
              <button onClick={() => this.props.addToCart(this.props.params)}>Add to Cart</button>
            </div>
          </div>
          <p className="px-3">{this.state.product.longDescription}</p>
        </>
      );
    }
  }

}
