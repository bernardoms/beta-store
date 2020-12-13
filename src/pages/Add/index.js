import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addMessage } from '../../store/ducks/layout'
import { addProductFetch, validateToken } from '../../store/fetchActions'

export default function Add() {
	const [form, setForm] = useState({name: '', image: '', price: '', description: '', sku: '', quantity: ''})

	const dispatch = useDispatch()

	const formChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value})
	}
	
	useEffect(
		() => {dispatch(validateToken(localStorage.getItem('token')))}, [dispatch]
	)

	const onSubmit = (e) => {
		e.preventDefault();
		if(isValid(form)) {
			dispatch(addProductFetch(form))
			setForm({name: '', image: '', price: '', description: '', sku: '', quantity: ''})
			dispatch(addMessage("Product created with success!"))
		} 
	}

	const isValid = (form) => {
		let isValid = true;
		if(!form.name && form.name.trim() === "") {
			isValid = false
			dispatch(addMessage("name field required"))
		}
		if(!form.image && form.image.trim() === "") {
			isValid = false
			dispatch(addMessage("image field required"))
		}
		if(!form.quantity && form.quantity.trim() === "") {
			isValid = false
			dispatch(addMessage("quantity field required"))
		}
		if(!form.sku && form.sku.trim() === "") {
			isValid = false
			dispatch(addMessage("sku field required"))
		}
		if(!form.price && form.price.trim() === "") {
			isValid = false
			dispatch(addMessage("price field required"))
		}
		return isValid;
	}

	return (
		<form className="container mt-5" onSubmit={onSubmit}>
			<div className="form-group">
				<label>Name</label>
				<input type="text" name="name" className="form-control" placeholder="test product name" onChange={formChange} value={form.name}/>
			</div>
			<div className="form-group">
				<label>Image Url:</label>
				<input type="text" name="image" className="form-control" placeholder="ihttps://image" onChange={formChange} value={form.image}/>
			</div>
			<div className="form-group">
				<label>Description:</label>
				<input type="text" name="description" className="form-control" placeholder="test product description" onChange={formChange} value={form.description}/>
			</div>
			<div className="form-group">
				<label>SKU:</label>
				<input type="number" name="sku" className="form-control" placeholder="1234" onChange={formChange} value={form.sku}/>
			</div>
			<div className="form-group">
				<label>Quantity:</label>
				<input type="number" name="quantity" className="form-control" placeholder="1" onChange={formChange} value={form.quantity}/>
			</div>
			<div className="form-group">
				<label>Price:</label>
				<input type="number" name="price" className="form-control" placeholder="19.99" onChange={formChange} value={form.price}/>
			</div>
			<button type="submit" className="btn btn-primary">
				Add
			</button>
		</form>
	);
}
