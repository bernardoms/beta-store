import React, { useEffect } from 'react';
import Product from '../../components/Product';
import { useDispatch, useSelector } from'react-redux'
import { getAllProducts } from '../../store/fetchActions'
import { addItem } from '../../store/ducks/cart'

export default function List() {
	const products = useSelector(state => state.products)
	
	const dispatch = useDispatch()

	useEffect(
		() => dispatch(getAllProducts()), [dispatch]
	)

	const addItemCart = (product) => {
		console.log(product)
		dispatch(addItem(product))
	}

	return (
		<div className="container-fluid">
			<div className="row">{products.map((product) => <Product key={product.sku} product={product} addItemCart={addItemCart}/>)}</div>
		</div>
	);
}
