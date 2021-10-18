

const main = document.querySelector('main');
const shoppingCart = document.querySelector('.shopping-cart');

makeCartOverlay();
const cartOverlay = document.querySelector('.cart-overlay');


const products = [
	{
		name: 'Gateron Black Ink V2',
		type: 'Linear',
		price: '1.00',
		img: 'gateron-black-ink-v2-linear.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Gateron Orange',
		type: 'Tactile',
		price: '1.40',
		img: 'gateron-orange-tactile.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Gateron Pink',
		type: 'Linear',
		price: '2.10',
		img: 'gateron-pink-linear.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Gateron Red Ink V2',
		type: 'Linear',
		price: '1.80',
		img: 'gateron-red-ink-v2-linear.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'JWICK Red',
		type: 'Linear',
		price: '2.40',
		img: 'jwick-red-linear.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Tealios V2',
		type: 'Linear',
		price: '5.00',
		img: 'tealios-v2-linear.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Zealios V2',
		type: 'Tactile',
		price: '2.40',
		img: 'zealios-v2-tactile.png',
		quantity: 1,
		description: 'Crazy good switch that makes amazing clicky sound',
		inCart: false,
	},
	{
		name: 'Zilents',
		type: 'Tactile',
		price: '1.90',
		img: 'zilents-tactile.png',
		quantity: 1,
		description: 'Tactile, 62g bottom out, ',
		inCart: false,
	},
];

function makeProductItems(product) {
	const productListItem = document.createElement('div');
	productListItem.classList.add('product-list-item');

	const figure = document.createElement('figure');

	const img = document.createElement('img');
	img.setAttribute('src', `../assets/shop-item-images/${product.img}`);
	img.setAttribute('alt', `image of a ${product.name.toLowerCase()} switch`);
	figure.appendChild(img);

	const productHeader = document.createElement('h2');
	productHeader.innerText = `${product.name} (${product.type})`;

	const priceTagDiv = document.createElement('div');
	priceTagDiv.classList.add('price-tag');

	const priceTagSpan = document.createElement('span');
	priceTagSpan.innerText = `$${product.price}`;
	priceTagDiv.appendChild(priceTagSpan);

	const productControlsContainer = document.createElement('div');
	productControlsContainer.classList.add('product-controls-container');

	const addToCartButton = document.createElement('button');
	addToCartButton.classList.add('add-to-cart');
	addToCartButton.setAttribute('aria-label', 'Add item to cart');
	productControlsContainer.appendChild(addToCartButton);
	addToCartButton.innerText = 'Add';

	const productQuantityControls = document.createElement('div');
	productQuantityControls.classList.add('product-quantity-controls');

	const decreaseQuantity = document.createElement('a');
	decreaseQuantity.setAttribute('option', 'dec');
	decreaseQuantity.setAttribute('aria-label', 'Decrease quantity');
	decreaseQuantity.setAttribute('href', '#');
	decreaseQuantity.innerText = '-';

	const quantityInput = document.createElement('input');
	quantityInput.setAttribute('value', '1');
	quantityInput.setAttribute('type', 'tel');
	quantityInput.setAttribute('id', 'product-quantity');
	quantityInput.setAttribute('name', 'product-quantity');
	quantityInput.setAttribute('maxlength', '3');
	quantityInput.setAttribute('aria-label', 'Number of Products');

	const increaseQuantity = document.createElement('a');
	increaseQuantity.setAttribute('option', 'inc');
	increaseQuantity.setAttribute('aria-label', 'Increase quantity');
	increaseQuantity.setAttribute('href', '#');
	increaseQuantity.innerText = '+';

	productQuantityControls.append(
		decreaseQuantity,
		quantityInput,
		increaseQuantity
	);

	productControlsContainer.append(addToCartButton, productQuantityControls);

	productListItem.append(
		figure,
		productHeader,
		priceTagDiv,
		productControlsContainer
	);

	main.appendChild(productListItem);
}

//CART ICON

function addToCart(event) {
	if (event.target.classList.contains('add-to-cart') || event.target.classList.contains('remove-item-from-cart')) {
		const title =
			event.target.parentElement.parentElement.childNodes[1].innerText;
			
			if(title === '0') {
				document.querySelector('.shopping-cart-items-count').classList.add('hide')
			}
		const trimmedTitle = trimTitle(title);

		products.forEach((product) => {
			if (product.name === trimmedTitle) {
				quantityCheck(product)
			}
		});

		cartFunctionality(products)
	}
}

function trimTitle(string) {
	const title = string.slice(0, string.indexOf('('));
	return title.trim();
}

function quantityCheck(product){
	if(product.inCart){
		product.quantity++
	} else {
		product.inCart = true;
	}
}

function cartFunctionality(products){
	// const items = products.filter((product) => {
	// 	if(product.inCart){
	// 		return product;
	// 	}
	// })

	// items.every(product => {
	// 	if(product.inCart){
	// 		return true
	// 	}
	// })
	createCartCounter(productsInCartFilter(products))
	document.querySelector('.shopping-cart-items-count').classList.remove('hide')
}

function createCartCounter(items) {
	let cartCount = 0;
	items.forEach(item => cartCount += item.quantity)
	const cartCounter = document.createElement('div');
	cartCounter.classList.add('shopping-cart-items-count');
	cartCounter.innerText = cartCount;
	
	document.querySelector('.shopping-cart').insertAdjacentElement('beforeend', cartCounter)

}

main.addEventListener('click', addToCart);

products.forEach((product) => makeProductItems(product));



// CART OVERLAY


function makeCartOverlay(products){
	//CART OVERLAY HEADER
	let cartOverlay = document.createElement('section');
	cartOverlay.classList.add('cart-overlay');

	const closeCart = document.createElement('div');
	closeCart.appendChild(document.createElement('span'))
	closeCart.classList.add('close-cart')

	const closeCartImg = document.createElement('img');
	closeCartImg.setAttribute('src', '../assets/cart-overlay/close-icon.svg')
	closeCartImg.setAttribute('alt', 'close cart');
	closeCart.children[0].appendChild(closeCartImg);

	const cartHeaderContainer = document.createElement('div');
	cartHeaderContainer.classList.add('cart-header-container');

	const cartHeaderContainerHeader = document.createElement('h1');
	cartHeaderContainerHeader.innerText = 'Your Cart';

	const cartHeaderDetailsContainer = document.createElement('div');
	cartHeaderDetailsContainer.classList.add('cart-header-details-container');

	for(let index = 0; index < 3; index++) {
		cartHeaderDetailsContainer.appendChild(document.createElement('span'));
	}

	cartHeaderDetailsContainer.children[0].innerText = 'Price';
	cartHeaderDetailsContainer.children[1].innerText = 'Quantity';
	cartHeaderDetailsContainer.children[2].innerText = 'Total';

	cartHeaderContainer.append(cartHeaderContainerHeader, cartHeaderDetailsContainer);

	cartOverlay.append(closeCart, cartHeaderContainer)

	main.appendChild(cartOverlay)

	//CART OVERLAY PRODUCTS

	//CART OVERLAY FOOTER
	const cartOverlayFooter = document.createElement('div');
	cartOverlayFooter.classList.add('cart-overlay-footer');

	cartOverlayFooter.innerHTML = `
	<div>
		<p>Total to pay: <span id="total-of-cart">$0</span></p>
	</div>
	<div>
		<button>Continue Shopping</button>
		<button>Check Out</button>
	</div>
	`

	cartOverlay.appendChild(cartOverlayFooter);
	cartOverlay.classList.add('hide')
	cartOverlayThing = document.querySelector('.cart-overlay')

	const productsContainer = document.createElement('div');
	productsContainer.classList.add('products-container');
	
	cartHeaderContainer.insertAdjacentElement("afterend", productsContainer)
}


function createCartItems(products){
	if(productsInCartFilter(products).length === 0) {
		const productsContainer = document.querySelector('.products-container')
		const emptyCartMessage = document.createElement('h2');
		emptyCartMessage.innerText = 'Your cart is empty! :(';

		productsContainer.appendChild(emptyCartMessage);
		document.querySelector('#total-of-cart').innerText = `$${formatPrice(calculateTotalOfCart(products))}`;
		
	}
	const productsContainer = document.querySelector('.products-container');
	const items = productsInCartFilter(products);

	items.forEach(item => {
		const productCartItemContainer = document.createElement('div');
		productCartItemContainer.classList.add('product-cart-item-container');

		productCartItemContainer.innerHTML = `
		<div>
						<figure>
							<img
								src="../assets/cart-overlay/cart-overlay-item-images/${item.img}"
								alt="picture of ${item.name} switch"
							/>
						</figure>
						<div class="product-cart-text-container">
							<h2>${item.name} (${item.type})</h2>
							<p>${item.description}</p>
						</div>
					</div>

					<div class="shopping-cart-details-container">
						<p>$${item.price}</p>

						<div class="product-quantity-controls">
							<a option="dec" aria-label="Decrease quantity" href="#">-</a>
							<input
								value="${item.quantity}"
								type="tel"
								id="product-quantity"
								name="product-quantity"
								maxlength="3"
								aria-label="Number of Products"
							/>
							<a option="inc" aria-label="Increase quantity" href="#">+</a>
						</div>

						<p class="shopping-cart-total-price">$${calculateTotalOneItem(item)}</p>
						<span>
							<a href="#" class="remove-product" aria-label="Remove product">
								<img
									class="remove-item-from-cart"
									src="../assets/cart-overlay/close-icon.svg"
									alt="delete item"
								/>
							</a>
						</span>
					</div>
		`

		document.querySelector('#total-of-cart').innerText = `$${formatPrice(calculateTotalOfCart(products))}`;
		
		productsContainer.appendChild(productCartItemContainer)
	})
}


function createCartItemsOnClick(event){
	
	event.target.classList.toggle('active');


	if(event.target.classList.contains('active')){
		resetCartProducts();
	}
	createCartItems(products);
}



function toggleOverlay(event) {
	
	cartOverlayThing.classList.toggle('hide')
}

shoppingCart.addEventListener('click', toggleOverlay);

shoppingCart.addEventListener('click', createCartItemsOnClick)

// Calculate total
function productsInCartFilter(products){
	if(!products) return;
	const items = products.filter((product) => {
		if(product.inCart){
			return product;
		}
	})

	return items
}

function calculateTotalOfCart(products){
	if(!products) return;
	const items = productsInCartFilter(products)
	return items.reduce((previousValue, currentValue) => {
		let total = currentValue.price * currentValue.quantity;

		previousValue += total;
		
		return Math.round(previousValue * 10) / 10;
	}, 0)
}

function calculateTotalOneItem(product){
	const total = product.price * product.quantity;
	return total.toFixed(2);
}


function resetCartProducts() {
	document.querySelector('.products-container').innerHTML = '';
}

function formatPrice(price) {
	if(String(price).length === 1){
		price += ".0";
	}

	let priceString = String(price);
	const endOfPrice = priceString.slice(priceString.indexOf('.') + 1).padEnd(2, 0);
	const startOfPrice = priceString.slice(0, priceString.indexOf('.') + 1).padStart(3, 0);
	
	return startOfPrice + endOfPrice;
 }

 cartOverlay.addEventListener('click', removeItemFromCart);
function removeItemFromCart(event) {
	const removeItemClicked = event.target.classList.contains('remove-item-from-cart')

	if(removeItemClicked){
		const title = event.target.closest('div').parentElement.childNodes[1].childNodes[3].childNodes[1].innerText;
		const trimmedTitle = trimTitle(title)
		products.forEach(product => {
			if(product.name === trimmedTitle) {
				product.inCart = false;
				product.quantity = 1;
			}
		})

		event.target.closest('.product-cart-item-container').remove();

		if(productsInCartFilter(products).length === 0) {
			const productsContainer = document.querySelector('.products-container')
			const emptyCartMessage = document.createElement('h2');
			emptyCartMessage.innerText = 'Your cart is empty! :(';
	
			productsContainer.appendChild(emptyCartMessage);
			document.querySelector('#total-of-cart').innerText = `$${formatPrice(calculateTotalOfCart(products))}`;
		}

		addToCart(event);

		document.querySelector('#total-of-cart').innerText = `$${formatPrice(calculateTotalOfCart(products))}`;
	}
}

