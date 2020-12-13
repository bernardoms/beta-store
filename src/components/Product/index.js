import React from 'react';

import './styles.css';

export default function Product({ product, addItemCart }) {
	return (
		<div className="col-sm-3 mt-3 mb-3">
			<div className="card">
				<img src={product.image} className="card-img-top" alt={product.name} />
				<div className="card-body">
					<h5 className="card-title">{product.name}</h5>
					<button className="btn btn-primary" onClick={() => addItemCart(product)}>
						<i className="fa fa-cart-plus fa-2x" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	);
}
