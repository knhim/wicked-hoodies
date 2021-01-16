import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);

  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {

    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header />
          <div className="container">
            <div className="row">
              <ProductList setView={this.setView} />
            </div>
          </div>
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header/>
          <ProductDetails setView={this.setView} params={this.state.view.params}/>;
        </>
      );

    }

  }

}
