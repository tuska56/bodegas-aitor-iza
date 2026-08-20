(function () {
  "use strict";

  const money = (n) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  const STORAGE_KEY = "aii_cart_v1";

  /* ---------------- state ---------------- */
  let cart = loadCart(); // { [wineId]: qty }
  let activeFilter = "todos";

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  /* ---------------- elements ---------------- */
  const catalogGrid = document.getElementById("catalogGrid");
  const filterChips = document.querySelectorAll(".filter-chip");

  const cartToggle = document.getElementById("cartToggle");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartClose = document.getElementById("cartClose");
  const cartCount = document.getElementById("cartCount");
  const fabCart = document.getElementById("fabCart");
  const fabCartCount = document.getElementById("fabCartCount");

  const cartLines = document.getElementById("cartLines");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartWhatsBtn = document.getElementById("cartWhatsBtn");

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- catalog render ---------------- */
  function wineById(id) { return WINES.find((w) => w.id === id); }

  function renderCatalog() {
    const list = WINES.filter((w) => activeFilter === "todos" || w.type === activeFilter);
    catalogGrid.innerHTML = list.map((w) => {
      const qty = cart[w.id] || 0;
      return `
      <article class="wine-card is-${w.type}">
        <div class="wine-card-media">
          <img src="${w.img}" alt="${w.alt}" loading="lazy">
          <span class="wine-type-badge ${w.type}">${labelFor(w.type)}</span>
        </div>
        <div class="wine-card-label">
          <h3>${w.name}</h3>
          <p class="wine-card-tag">${w.tag}</p>
          <p class="wine-card-desc">${w.desc}</p>
          <div class="wine-card-foot">
            <div>
              <span class="wine-card-price">${money(w.price)}</span>
              <span class="wine-card-vol">${w.vol}</span>
            </div>
            <div class="qty-add">
              ${qty > 0 ? `
                <div class="qty-stepper" data-id="${w.id}">
                  <button type="button" data-action="dec" aria-label="Quitar una unidad">−</button>
                  <span>${qty}</span>
                  <button type="button" data-action="inc" aria-label="Añadir una unidad">+</button>
                </div>
              ` : `
                <button class="add-btn" type="button" data-action="add" data-id="${w.id}" aria-label="Añadir ${w.name} a la cesta">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
              `}
            </div>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  function labelFor(type) {
    return type === "tinto" ? "Tinto" : type === "blanco" ? "Blanco" : "Rosado";
  }

  catalogGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id || btn.closest(".qty-stepper").dataset.id;
    if (action === "add" || action === "inc") addToCart(id, 1);
    if (action === "dec") addToCart(id, -1);
  });

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeFilter = chip.dataset.filter;
      renderCatalog();
    });
  });

  /* ---------------- cart logic ---------------- */
  function addToCart(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = next;
    saveCart();
    renderCatalog();
    renderCart();
  }

  function cartItems() {
    return Object.keys(cart).map((id) => ({ wine: wineById(id), qty: cart[id] })).filter((x) => x.wine);
  }

  function cartTotal() {
    return cartItems().reduce((sum, item) => sum + item.wine.price * item.qty, 0);
  }

  function totalUnits() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function renderCart() {
    const items = cartItems();
    const units = totalUnits();

    cartCount.textContent = units;
    fabCartCount.textContent = units;
    fabCart.hidden = units === 0;

    cartEmpty.hidden = items.length > 0;
    cartLines.innerHTML = items.map((item) => `
      <div class="cart-line">
        <img src="${item.wine.img}" alt="${item.wine.alt}">
        <div>
          <div class="cart-line-name">${item.wine.name} <span style="font-weight:400;opacity:.75">— ${item.wine.tag}</span></div>
          <div class="cart-line-price">${money(item.wine.price)} · ${item.qty} ud.</div>
        </div>
        <div class="cart-line-right">
          <div class="qty-stepper" data-id="${item.wine.id}">
            <button type="button" data-action="dec" aria-label="Quitar una unidad">−</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" aria-label="Añadir una unidad">+</button>
          </div>
          <button class="cart-line-remove" type="button" data-action="remove" data-id="${item.wine.id}">Quitar</button>
        </div>
      </div>
    `).join("");

    cartSubtotal.textContent = money(cartTotal());
    updateWhatsAppLink();
  }

  cartLines.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id || btn.closest(".qty-stepper").dataset.id;
    if (action === "inc") addToCart(id, 1);
    if (action === "dec") addToCart(id, -1);
    if (action === "remove") { delete cart[id]; saveCart(); renderCatalog(); renderCart(); }
  });

  /* ---------------- drawer open/close ---------------- */
  function openCart() {
    cartOverlay.classList.add("is-open");
    cartDrawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartOverlay.classList.remove("is-open");
    cartDrawer.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  cartToggle.addEventListener("click", openCart);
  fabCart.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  /* ---------------- build WhatsApp order message ---------------- */
  function buildOrderMessage() {
    const items = cartItems();
    const lines = items.map((it) => `• ${it.qty} x ${it.wine.name} (${it.wine.tag}) — ${money(it.wine.price * it.qty)}`);
    const total = money(cartTotal());

    let msg = `Hola, quiero hacer este pedido a Bodega Aitor Iza Ibáñez:\n\n`;
    msg += lines.join("\n") + "\n\n";
    msg += `Subtotal: ${total}\n\n`;
    msg += `¿Podéis confirmarme disponibilidad, precio final y forma de entrega? Gracias.`;
    return msg;
  }

  function updateWhatsAppLink() {
    const items = cartItems();
    const text = encodeURIComponent(buildOrderMessage());
    cartWhatsBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    const ready = items.length > 0;
    cartWhatsBtn.style.opacity = ready ? "1" : ".55";
    cartWhatsBtn.style.pointerEvents = ready ? "auto" : "none";
  }

  cartWhatsBtn.addEventListener("click", () => {
    // clear the cart once the order has been handed off to WhatsApp
    setTimeout(() => {
      cart = {};
      saveCart();
      renderCatalog();
      renderCart();
      closeCart();
    }, 600);
  });

  /* ---------------- init ---------------- */
  renderCatalog();
  renderCart();
})();
