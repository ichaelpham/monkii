import React, { useState, useEffect } from "react"
import 'normalize.css/normalize.css';
import "../styles/global.scss"
import data from '../data/products'


const IndexPage = () => {
	const [products] = useState(data)
	const [productListing, setProductListing] = useState(products)
	
	const [filters, setFilters] = useState('all')
	const [orderby, setOrderby] = useState('asc')

	const handleOrderby = (e) => {
		setOrderby(e.target.value)
	}

	const handleFilter = (e) => {
		setFilters(e.target.value)
	}

	useEffect(() => {
		// Reset
		if (filters === 'all') {
			const getProductSize = products.filter((item) => {
				return item
			})
			setProductListing(getProductSize)
		}
		else {
			const getProductSize = products.filter(({ sizes }) => {
				return sizes.includes(filters)
			})
			setProductListing(getProductSize)
		}
	}, [filters, orderby, products])

	useEffect(() => {
		if (orderby === 'asc') {
			setProductListing((prevState) => prevState.sort(
					(a, b) => {
						return parseFloat(a.price) - parseFloat(b.price)
					}
				))
			} else {
				setProductListing((prevState) => prevState.sort(
					(a, b) => {
						return parseFloat(b.price) - parseFloat(a.price)
					}
				))
			}
	}, [orderby, productListing, filters])

	return (
		<main>
			<title>Monkii Test</title>

			<header className="header">
				<div className="inner-wrapper">
					<a className="header__logo" title="Return Home" href="/">
						<img src="/images/monkii-logo.png" alt="Monkii Logo" />
					</a>
				</div>
			</header>

		{
			productListing && (
			<section className="body-wrapper">
				<div className="inner-wrapper">
					<h1 className="section-header">Products</h1>
					<nav className="filter-nav">
						<p className="filter-nav__total">
							{`${productListing.length} items`}
						</p>
							
							<div className="filter-nav__actions">
							<div className="order-by">
								<label className="order-by__label" htmlFor="price">
									Order by:
								</label>
									<select className="order-by__select"
											name="price"
											onChange={handleOrderby}
											value={orderby}
										>
										<option value="asc">Price - Low to High</option>
										<option value="desc">Price - High to low</option>
								</select>
							</div>
							<div className="order-by">
								<label className="order-by__label" htmlFor="size">
									Filter by size:
								</label>
									<select name="size"
										className="order-by__select"
										onChange={handleFilter}
										value={filters}>
										<option value="all">All</option>
										<option value="S">Small</option>
										<option value="M">Medium</option>
										<option value="L">Large</option>
										<option value="XL">X-large</option>
								</select>
							</div>
						</div>
					</nav>
					
					<div className="grid product-archive">
						{
							productListing.map((product) => (
								<div className="product-card"
									key={product.id}
									>
									<div className="product-card__image">
										{
											product.image && (
												<img src={`/images/${product.image}`}
													alt={product.name} />
											)
										}
									</div>
									{
										product.name && (
											<h3 className="product-card__title">
												{product.name}
											</h3>
										)
									}
									{
										product.price && (
											<p className="product-card__price">
												{`$${product.price}`}
											</p>
										)
									}
								</div>
							))
						}
					</div>
				</div>
				</section>
			)
		}
		</main>
	)
}

export default IndexPage
