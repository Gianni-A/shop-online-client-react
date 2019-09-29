import React from 'react';
import { Link } from 'react-router-dom';

import DeleteProductModal from '../components/DeleteProductModal';

import api from '../api'

class ProductEdit extends React.Component {

  state= {
    loading: false,
    error: null,
    modalIsOpen: false,
    form: {
      pId: 0,
      pName: '',
      pBrand: '',
    }
  }

  componentDidMount() {
    this.getValues()
  }

  getValues = async () => {
    this.setState({ loading: true, error: null })

    try {
      const data = await api.products.getOne(
        this.props.match.params.productId
      );

      this.setState({ loading: false, form: data })
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null })

    try {
      await api.products.createOrEdit(this.state.form)

      alert('Product Updated')

      this.props.history.push('/products')
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  handleDelete = e => {
    this.setState({ modalIsOpen: true })
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true })
  }

  handleCloseModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: false })
  }

  handleDeleteProduct = async e => {
    this.setState({ loading: true, error: null })

    try {
      await api.products.remove(this.props.match.params.productId)

      alert('Product deleted')

      this.props.history.push('/products')
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/products">Back to Main</Link>
        <h1>Edit Product</h1>
        <form action="" className="col-3">
          <div className="form-group">

            <label>Name of the product</label>
            <input onChange={this.handleChange} className="form-control" type="text" name="pName" value={this.state.form.pName} />
          </div>

          <div className="form-group">
            <label>Brand of the product</label>
            <input onChange={this.handleChange} className="form-control" type="text" name="pBrand" value={this.state.form.pBrand} />
          </div>

          <button className="btn btn-primary" onClick={this.handleSubmit}>Update data</button>

          <button className="btn btn-danger" onClick={this.handleOpenModal}>Delete product</button>

          {this.state.error && <p className="text-danger">{ this.state.error.message }</p>}

          <DeleteProductModal 
            isOpen={this.state.modalIsOpen}
            onClose={this.handleCloseModal}
            onDeleteProduct={this.handleDeleteProduct}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default ProductEdit;