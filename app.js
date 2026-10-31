const products = [
  {
    id: "top-flow",
    name: "Top Flow",
    category: "Tops",
    color: "Negro · Gris salvia",
    price: 28900,
    badge: "MÁS VENDIDO",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    alt: "Top deportivo negro de mujer",
  },
  {
    id: "legging-core",
    name: "Legging Core",
    category: "Leggings",
    color: "Negro · Verde oliva",
    price: 45900,
    badge: "FAVORITO",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80",
    alt: "Calza deportiva para entrenamiento",
  },
  {
    id: "buzo-studio",
    name: "Buzo Studio",
    category: "Buzos",
    color: "Crema · Gris",
    price: 52900,
    badge: "NUEVO",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    alt: "Buzo deportivo cómodo y ligero",
  },
  {
    id: "top-move",
    name: "Top Move",
    category: "Tops",
    color: "Terracota · Negro",
    price: 26900,
    badge: "",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    alt: "Atleta con top durante una sesión de entrenamiento",
  },
  {
    id: "legging-everyday",
    name: "Legging Everyday",
    category: "Leggings",
    color: "Chocolate · Negro",
    price: 42900,
    badge: "",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    alt: "Ropa cómoda para entrenar y moverse",
  },
  {
    id: "buzo-reset",
    name: "Buzo Reset",
    category: "Buzos",
    color: "Verde salvia · Crudo",
    price: 55900,
    badge: "",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
    alt: "Buzo de estilo urbano para antes y después de entrenar",
  },
];

const formatPrice = (price) => `$${new Intl.NumberFormat("es-AR").format(price)}`;
const productGrid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#product-search");
const cartDrawer = document.querySelector(".cart-drawer");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".bag-count");
const toast = document.querySelector(".toast");
let activeFilter = "Todos";
let cart = [];
let toastTimeout;

function renderProducts() {
  const search = searchInput.value.trim().toLocaleLowerCase("es");
  const filtered = products.filter((product) => {
    const matchesCategory = activeFilter === "Todos" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.category} ${product.color}`.toLocaleLowerCase("es").includes(search);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="quick-add" type="button" data-add="${product.id}" aria-label="Agregar ${product.name} a la bolsa">
          <span>Agregar a la bolsa</span><span aria-hidden="true">+</span>
        </button>
      </div>
      <div class="product-info">
        <div><h3 class="product-name">${product.name}</h3><p class="product-meta">${product.color}</p></div>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </article>
  `).join("");
  emptyState.hidden = filtered.length > 0;
}

function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const isEmpty = cart.length === 0;

  cartCount.textContent = String(count);
  cartDrawer.classList.toggle("is-empty", isEmpty);
  cartDrawer.querySelector(".cart-heading-count").textContent = `(${count})`;
  cartDrawer.querySelector(".cart-subtotal strong").textContent = formatPrice(subtotal);
  cartItems.innerHTML = cart.map(({ product, quantity }) => `
    <article class="cart-item">
      <img src="${product.image}" alt="" />
      <div>
        <h3 class="cart-item-name">${product.name}</h3>
        <p class="cart-item-price">${formatPrice(product.price)}</p>
        <div class="quantity-control" aria-label="Cantidad de ${product.name}">
          <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Quitar una unidad de ${product.name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-quantity="${product.id}" data-change="1" aria-label="Agregar una unidad de ${product.name}">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-remove="${product.id}" aria-label="Quitar ${product.name} de la bolsa">×</button>
    </article>
  `).join("");
}

function setCartOpen(isOpen) {
  cartDrawer.classList.toggle("is-open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  cartBackdrop.hidden = !isOpen;
  document.body.classList.toggle("cart-open", isOpen);
  if (isOpen) cartDrawer.querySelector(".cart-close").focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

document.querySelector(".filter-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((filterButton) => {
    const isActive = filterButton === button;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.add);
  if (!product) return;
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ product, quantity: 1 });
  renderCart();
  showToast(`${product.name} se agregó a tu bolsa`);
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    cart = cart.filter((item) => item.product.id !== removeButton.dataset.remove);
    renderCart();
    return;
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (!quantityButton) return;
  const item = cart.find(({ product }) => product.id === quantityButton.dataset.quantity);
  if (!item) return;
  item.quantity += Number(quantityButton.dataset.change);
  if (item.quantity <= 0) cart = cart.filter(({ product }) => product.id !== quantityButton.dataset.quantity);
  renderCart();
});

document.querySelector(".bag-button").addEventListener("click", () => setCartOpen(true));
document.querySelector(".cart-close").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));
document.querySelector(".continue-shopping").addEventListener("click", () => setCartOpen(false));
document.querySelector(".checkout-button").addEventListener("click", () => showToast("Este ejemplo no procesa pagos."));

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const menu = document.querySelector(".desktop-nav");
  const isOpen = menu.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

document.querySelectorAll(".desktop-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".desktop-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#email-address");
  document.querySelector(".newsletter-message").textContent = `¡Gracias! Pronto tendrás noticias nuestras en ${input.value}.`;
  input.value = "";
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderProducts();
renderCart();
