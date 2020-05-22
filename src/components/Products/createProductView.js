import React, { useState, useEffect, useLayoutEffect } from 'react';
import history from '../../history';
import AxiosAuth from '../../components/Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';

const CreateProductView = () => {
	// valdation for posting - if true that it posts and pushes to the dashboard screen
	const [ readyToPost, setReadyToPost ] = useState(false);
	//Prevents useEffect from running on inital load
	const [ checkErrors, setCheckErros ] = useState(false);
	//Keeps track of what field is empty
	const [ errorState, setErrorState ] = useState();
	// The object that is posted
	const [ productData, setProductData ] = useState({
		productName: '',
		price: '',
		category: '',
		description: '',
		photos: [],
		variants: []
	});
	//The state that holds the "addVaraint" component info (onClick creates an obj that is added to the Variants array)
	const [ formData, setFormData ] = useState({
		variantName: '',
		variantOption: '',
		variantPrice: ''
	});
	//Used to check input fields for validation in real time
	useEffect(
		() => {
			if (
				productData.productName.length > 0 &&
				productData.price.length > 0 &&
				productData.category.length > 0 &&
				productData.photos.length > 0
			) {
				return setCheckErros(true);
			}
		},
		[ productData ]
	);

	useEffect(
		() => {
			if (checkErrors === false) {
				return console.log('not ready');
			}

			if (!productData.productName) {
				return setErrorState('productName');
			}
			console.log(errorState);
			if (!productData.price) {
				return setErrorState('price');
			}
			if (!productData.category) {
				return setErrorState('category');
			}

			if (productData.photos.length < 1) {
				return setErrorState('photos');
			}

			setErrorState('');
			console.log('Its now true');
			setReadyToPost(true);
		},
		[ productData, checkErrors ]
	);

	// Post to the server if all checks out
	function submitHandler() {
		setCheckErros(true);
		console.log(readyToPost);
		setTimeout(function() {
			if (readyToPost === false) {
				return console.log(readyToPost);
			}

			AxiosAuth()
				.post('https://shopping-cart-be.herokuapp.com/api/store/products', productData)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
			history.push('/dashboard');
		}, 1000);
	}

	return (
		<div className="createProductView">
			<div className="createProductHeader">
				<h1>Create Product</h1>
				<button onClick={submitHandler} className="createProduct">
					Create Product
				</button>
			</div>
			<div className="basicDetailsVariantsContainer">
				<div className="leftContainer">
					<Addphoto
						productData={productData}
						setProductData={setProductData}
						errorState={errorState}
						setErrorState={setErrorState}
					/>
				</div>
				<div className="rightContainer">
					<BasicDetails
						productData={productData}
						setProductData={setProductData}
						setErrorState={setErrorState}
						errorState={errorState}
					/>
					<AddVariants
						setFormData={setFormData}
						formData={formData}
						productData={productData}
						setProductData={setProductData}
					/>
				</div>
				<button
					onClick={() => {
						console.log('errorState', errorState, 'readyToPost', readyToPost);
					}}
				>
					{' '}
					Console Log
				</button>
			</div>
		</div>
	);
};

export default CreateProductView;
