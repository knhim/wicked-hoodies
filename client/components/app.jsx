import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <ProductList />
          </div>
        </div>
      </>
    );
  }

}
