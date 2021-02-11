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
    this.props.placeOrder(this.state);
  }

  render() {
    return (
      <>
        <h2 className="pointer" onClick={() => this.props.setView('catalog', { params: {} })}>&lt; Continue Shopping</h2>
        <form className="my-2" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" onChange={this.handleChange} className="form-control" name="name" placeholder="Enter Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="number">Credit Card:</label>
            <input type="number" onChange={this.handleChange} className="form-control" name="creditCard" placeholder="####-####-####-####" required />
          </div>
          <div className="form-group">
            <label htmlFor="shipping-address">Shipping Address:</label>
            <textarea name="shippingAddress" onChange={this.handleChange} className="form-control" placeholder="1234 LFZ Lane" rows="4" required />
          </div>
          <div className="d-flex justify-content-end font-weight-bold my-2">
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </>
    );
  }

}
