import React from 'react';
import { Link } from 'react-router-dom';

import api from '../api'

class ProductNew extends React.Component {

  state = {
    loading: false,
    error: null,
    formValues: {
      pName: '',
      pBrand: '',
    }
  }

  handleChange = e => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })

    try {
      await api.products.createOrEdit(this.state.formValues)
      this.setState({ loading: false })

      alert("Added product")

      this.props.history.push('/products')
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/products">Back to Main</Link>
        <h1>Creating a new product</h1>
        <form action="" className="col-6" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name of the product</label>
            <input onChange={this.handleChange} className="form-control" type="text" name="pName" value={this.state.formValues.pName} />
          </div>

          <div className="form-group">
            <label>Brand of the product</label>
            <input onChange={this.handleChange} className="form-control" type="text" name="pBrand" value={this.state.formValues.pBrand} />
          </div>

          <button className="btn btn-primary">Save data</button>

          {this.state.error && <p className="text-danger">{ this.state.error.message }</p>}
        </form>
      </React.Fragment>
      
    );
  }
}

export default ProductNew;