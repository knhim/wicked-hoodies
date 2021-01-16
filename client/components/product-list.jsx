import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts(props) {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    const products = this.state.products;
    const listProducts = products.map(item =>
      <ProductListItem key={item.productId}
        productId={item.productId }
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription}
        setView={() => this.props.setView('details', { productId: item.productId })}
      />
    );

    return (
      <>
        { listProducts }
      </>
    );
  }

}
