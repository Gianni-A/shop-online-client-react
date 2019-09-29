import React from 'react';
import { Link } from 'react-router-dom';

function ListProduct(props) {
  const products = props.products
  
  //Condition to know if products array has data and show them in a table
  if(products === undefined) {
    return (
      <h3>No data found</h3>
    );
  }
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Brand</th>
          <th></th>
        </tr>
      </thead>
      
      <tbody>
        {products.map(function (product)  {
          return (
            <tr key={product.pId}>
              <td>{product.pId}</td>
              <td>{product.pName}</td>
              <td>{product.pBrand}</td>
              <td> <Link to={`/products/${product.pId}/edit`}>Edit</Link></td>
            </tr>
            );
          })
        }
      </tbody>
    </table>
  );
  
}

export default ListProduct;