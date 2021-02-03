import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text"onChange={this.handleChange} className="form-control" name="name" placeholder="Enter Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="numbers">Credit Card:</label>
          <input type="numbers" onChange={this.handleChange} className="form-control" name="creditCard" placeholder="####-####-####-####"/>
        </div>
        <div className="form-group">
          <label htmlFor="shipping-address">Shipping Address:</label>
          <textarea name="shippingAddress" onChange={this.handleChange} className="form-control" placeholder="1234 LFZ Lane" rows="4"/>
        </div>
        <div className="d-flex justify-content-between font-weight-bold">
          <p onClick={() => this.props.setView('catalog', { params: {} })}>&lt; Continue Shopping</p>
          <button onClick={() => this.props.placeOrder(this.state)} type="submit" className="btn btn-primary">Place Order</button>
        </div>
      </form>

    );
  }

}
