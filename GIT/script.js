document.addEventListener('DOMContentLoaded', () => {

    // 1. Filter Products Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Shopping Cart Functionality
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Toggle Modal
    cartIcon.addEventListener('click', () => cartModal.classList.add('open'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('open'));

    // Close Modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.remove('open');
    });

    // Add To Cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCartUI();
        });
    });

    // Update Cart Display
    function updateCartUI() {
        // Update Count
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalCount;

        // Update Items List
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong>
                        <div>$${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div>
                        <strong style="color: var(--primary-mauve);">$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                </div>
            `).join('');
        }

        // Update Total Price
        const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceEl.textContent = `$${totalSum.toFixed(2)}`;
    }
});