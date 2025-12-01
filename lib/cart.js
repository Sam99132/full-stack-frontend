export const addToCart = (product, quantity = 1) => {
    if (typeof window === 'undefined') return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    window.dispatchEvent(new Event('cart-updated'));
};

export const getCart = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const removeFromCart = (productId) => {
    if (typeof window === 'undefined') return;

    const cart = getCart().filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};

export const clearCart = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));
};

export const updateQuantity = (productId, quantity) => {
    if (typeof window === 'undefined') return;

    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    }
};
