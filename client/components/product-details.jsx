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

          <div className="container shadow-sm">
            <h2 onClick={() => this.props.setView('catalog', { params: {} })}>&lt; Back to catalog</h2>
            <div className="row">
              <img className="image-contain col-6" src={this.state.product.image} alt={this.state.product.name} />
              <div className="col-6">
                <h3>{this.state.product.name}</h3>
                <p>${(this.state.product.price / 100).toFixed(2)}</p>
                <p>{this.state.product.shortDescription}</p>
                <button onClick={() => this.props.addToCart(this.props.params)}>Add to Cart</button>
              </div>

            </div>

            <p>{this.state.product.longDescription}</p>
          </div>
        </>
      );
    }
  }

}
