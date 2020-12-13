import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './styles.css';
import jwt from 'jwt-decode' // import dependency

export default function Header() {

	const cartLength = useSelector(state => state.cart.length)

	const { isAuthenticated } = useSelector(state => state.auth)

	return (
		<nav className="l-header navbar navbar-expand-lg navbar-dark bg-primary">
			<NavLink to="/list" activeClassName="active" className="navbar-brand">
				Beta Store
			</NavLink>

			<div className="collapse navbar-collapse" id="navbarColor01">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink to="/list" activeClassName="active" className="nav-link">
							Products
						</NavLink>
					</li>
					<li className="nav-item">
						{isAuthenticated && localStorage.getItem('token') && jwt(localStorage.getItem('token')).role === 'ROLE_ADMIN' && <NavLink to="/add" activeClassName="active" className="nav-link">Add</NavLink>}
					</li>
				</ul>
			</div>
			<ul className="navbar-nav ml-md-auto">
				<NavLink to="/login" activeClassName="active" className="nav-item mt-2 mr-3">
					<i className="fa fa-user fa-2x" aria-hidden="true">
					</i>
				</NavLink>
			</ul> 
			<ul className="navbar-nav ml-md-auto">
				<NavLink to="/cart" activeClassName="active" className="nav-item">
					<i className="fa fa-shopping-cart fa-3x" aria-hidden="true">
					<span className="fa-counter">{cartLength}</span>
					</i>
				</NavLink>
			</ul>
		</nav>
	);
}
