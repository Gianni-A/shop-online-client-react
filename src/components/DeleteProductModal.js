import React from 'react';

import Modal from './Modal';

function DeleteProductModal(props) {
  return <Modal isOpen={props.isOpen} onClose={props.onClose} >
		<div className="DeleteBadgeModal">
			<h1>Deleting item</h1>
			<p>Are you sure you want to delete this product?</p>

			<div className="btn btn-danger mr-4" onClick={props.onDeleteProduct}>Delete</div>
			<div className="btn btn-primary" onClick={props.onClose}>Cancel</div>
		</div>
		</Modal>
}

export default DeleteProductModal;