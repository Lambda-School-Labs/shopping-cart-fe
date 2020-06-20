import React, { useEffect } from 'react';
import ProductCard from '../categories/ProductCard';
const AllProducts = ({ categorySearch, filteredProducts, inventory, searchString }) => {
	return (
		<div className="mainProductContainer">
			<div className="ProductAreaContainer">
				{categorySearch.length === 0 ? (
					inventory.products && inventory.products.map((item) => {
						return (
							<ProductCard
								id={item._id}
								image={item.images}
								productName={item.productName}
								price={item.price}
							/>
						);
					})
				) : (
					filteredProducts.map((item) => {
						return (
							<ProductCard
								id={item._id}
								image={item.images}
								productName={item.productName}
								price={item.price}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};
export default AllProducts;