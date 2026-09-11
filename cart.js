let cart = JSON.parse(localStorage.getItem("beanBoutiqueCart")) || [];


// Add product to cart
function addToCart(name, price, image) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(name + " has been added to your cart!");
}


// Save cart
function saveCart() {

    localStorage.setItem(
        "beanBoutiqueCart",
        JSON.stringify(cart)
    );

}


// Update cart number
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;

    }

}


// Display cart
function displayCart() {

    const cartContainer = document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Add some coffee or brewing equipment to get started.</p>
            </div>
        `;

        updateTotal();

        return;
    }


    cartContainer.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h2>${item.name}</h2>

                    <p>$${item.price.toFixed(2)}</p>

                </div>


                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <div class="item-total">
                    $${itemTotal.toFixed(2)}
                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

    });


    updateTotal();

}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

    updateCartCount();

}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// Calculate total
function updateTotal() {

    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );


    const cartTotal = document.getElementById("cart-total");
    const finalTotal = document.getElementById("final-total");


    if (cartTotal) {
        cartTotal.textContent = "$" + total.toFixed(2);
    }


    if (finalTotal) {
        finalTotal.textContent = "$" + total.toFixed(2);
    }

}


// Empty cart
function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to empty your cart?"
    );


    if (confirmClear) {

        cart = [];

        saveCart();

        displayCart();

        updateCartCount();

    }

}


// Checkout
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert("Thank you for shopping with Bean Boutique Cafe!");

}



updateCartCount();
displayCart();