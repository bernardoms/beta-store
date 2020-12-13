import React from 'react'

export default function ItemCart({product, removeItemCart})  {
    return (
        <div key={product.sku} className="col-sm-3 mt-3">
					<div className="card text-white bg-primary mb-3">
						<div className="card-header">{product.name} </div>
						<div className="card-body" style={{padding: 0}}>
							<img src = {product.image} alt={product.name} style={{width:'100%'}}/>
						</div>
						<p className="card-text">{product.description}</p>
						<button onClick={() => removeItemCart(product.sku)} className="btn btn-danger" style={{width: 50, position: "absolute", bottom: 15, right: 15}}
							><i className='fa fa-trash fa-2x'></i>
						</button>
					</div>
				</div>
    )
}