const products = [
  {
    id: 1, 
    name: "T-Shirt", 
    price: 499, 
    discount: 10,
    image: "tshirt.jpeg",
     fabric: "Cotton",
      color: "Blue",
    sizes: ["S", "M", "L", "XL"], 
    rating: 4.3, 
    combo: false
  },
  {
    id: 2, 
    name: "Mug",
    price: 199,
    discount: 5,
    image: "mug.jpeg", 
    fabric: "Ceramic", 
    color: "White",
    sizes: [], 
    rating: 4.0, 
    combo: false
  },
  {
    id: 3, 
    name: "Cap", 
    price: 299, 
    discount: 15,
    image: "cap.jpeg", 
    fabric: "Polyester", 
    color: "Black",
    sizes: ["Free Size"], 
    rating: 4.1, 
    combo: false
  },
  {
    id: 4, 
    name: "Jean", 
    price: 999, 
    discount: 25,
    image: "jean.jpeg", 
    fabric: "Denim", 
    color: "Blue",
    sizes: ["S", "M", "L", "XL"], 
    rating: 4.6, 
    combo: true
  },
  {
    id: 5, 
    name: "Winter Coat", 
    price: 1999, 
    discount: 40,
    image: "winter coat.jpeg", 
    fabric: "Wool", color: "Brown",
    sizes: ["M", "L", "XL"], 
    rating: 4.8, combo: false
  },
  {
    id: 6, 
    name: "Kurti", 
    price: 699, 
    discount: 35,
    image: "kurti.jpg", 
    fabric: "Rayon", 
    color: "Green",
    sizes: ["S", "M", "L"], 
    rating: 4.4, 
    combo: false
  },
  {
    id: 7, 
    name: "Sneakers", 
    price: 1299, 
    discount: 20,
    image: "sneaker.jpg", 
    fabric: "Synthetic", 
    color: "White",
    sizes: ["7", "8", "9", "10"], 
    rating: 4.2, 
    combo: false
  },
  {
    id: 8, 
    name: "Frock", 
    price: 899, 
    discount: 30,
    image: "frock.jpg", 
    fabric: "Cotton", 
    color: "Pink",
    sizes: ["6M", "12M", "18M", "24M"],
    rating: 4.5, 
    combo: true
  },
  {
  id: 9,
  name: "Boy Baby Set",
  price: 799,
  discount: 30,
  image: "cotton boy set.jpg",
  fabric: "Cotton",
  color: "Multicolor",
  sizes: ["6M", "12M", "18M", "24M"],
  rating: 4.5,
  combo: true
},
{
  id: 10,
  name: "Cooling Glass",
  price: 499,
  discount: 15,
  image: "cooling glass.jpg",
  fabric: "Plastic Frame",
  color: "Black",
  sizes: [],
  rating: 4.2,
  combo: false
}

];

const cart = {};

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Fabric: ${product.fabric}</p>
      <p>Color: ${product.color}</p>
      <p>Discount: ${product.discount}%</p>
      <p>Rating: ${product.rating} ⭐</p>
      <p>Price: ₹${product.price}</p>
      ${product.sizes.length > 0 ? `
        <label for="size-${product.id}">Size:</label>
        <select id="size-${product.id}">
          ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
      ` : `<p>No size selection</p>`}
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => addToCart(parseInt(button.dataset.id)));
  });
}

function addToCart(productId) {
  const sizeSelect = document.getElementById(`size-${productId}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "Default";
  const cartKey = `${productId}-${selectedSize}`;

  if (cart[cartKey]) {
    cart[cartKey].quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    cart[cartKey] = { ...product, quantity: 1, selectedSize };
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");
  cartItems.innerHTML = "";
  let sum = 0;

  Object.entries(cart).forEach(([key, item]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.selectedSize}) - ₹${item.price} x ${item.quantity}
      <button onclick="increment('${key}')">+</button>
      <button onclick="decrement('${key}')">-</button>
    `;
    cartItems.appendChild(li);
    sum += item.price * item.quantity;
  });

  total.textContent = sum.toFixed(2);
}

function increment(key) {
  cart[key].quantity++;
  updateCart();
}

function decrement(key) {
  cart[key].quantity--;
  if (cart[key].quantity <= 0) {
    delete cart[key];
  }
  updateCart();
}

function toggleLogin() {
  document.getElementById("login-page").classList.remove("hidden");
  document.getElementById("shop-page").classList.add("hidden");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "admin") {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("shop-page").classList.remove("hidden");
    document.getElementById("login-btn").classList.add("hidden");
    document.getElementById("logout-btn").classList.remove("hidden");
    displayProducts();
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  document.getElementById("login-page").classList.remove("hidden");
  document.getElementById("shop-page").classList.add("hidden");
  document.getElementById("login-btn").classList.remove("hidden");
  document.getElementById("logout-btn").classList.add("hidden");
}

window.onload = toggleLogin;
