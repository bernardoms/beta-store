import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../store/ducks/cart'

import ItemCart from '../../components/ItemCart'

export default function Cart() {
	const cart = useSelector(state => state.cart)
	
	const dispatch = useDispatch()

	const removeItemCart = (sku) => {
		dispatch(removeItem(sku))
		console.log(sku);
	}

	return <div className='container-fluid'>
		<div className='row'> {cart.length === 0 ?
			<p className="col-sm-12 mt-5 text-warning text-center">Cart Empty...</p>
			: 
			<React.Fragment>
				{cart.map(product => (<ItemCart key= {product.id} product={product} removeItemCart={removeItemCart}></ItemCart>))}
			</React.Fragment>}
		</div>
	</div>
}
