import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // --- Cart Actions ---
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart((prevCart) => prevCart.map((item) => {
            if (item.id === productId) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    // --- Wishlist Actions ---
    const toggleWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.find((item) => item.id === product.id);
            if (exists) {
                return prevWishlist.filter((item) => item.id !== product.id);
            }
            return [...prevWishlist, product];
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const value = {
        cart, // array
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist, // array
        toggleWishlist,
        isInWishlist,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
