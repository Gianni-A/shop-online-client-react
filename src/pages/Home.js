import React from 'react';
import { Link } from 'react-router-dom';

import ListProducts from '../components/ListProducts';

import api from '../api';

class Home extends React.Component {

  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: true,
    idSelected: 0,
  };

  componentDidMount() {
    this.getData()
  }

  getData = async () =>  {
    this.setState({ loading: true, error: null })

    try{
      const data = await api.products.list();

      this.setState({ loading: false, data: data })
    }catch (error) {
      this.setState({ loading: false, error: error })
    }
  }

  deleteProduct = async pId => {
    this.setState({ loading: true, error: null })

    try {
      await api.products.remove();
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  
  render() {
    return (
      <React.Fragment>
        <h1>List of products</h1>
        <Link to="/products/new">New product</Link>

        <ListProducts 
          products={this.state.data}
          openModal={this.handleOpenModal}
          idSelected={this.state.idSelected} />
      </React.Fragment>
    );
  }
}

export default Home;