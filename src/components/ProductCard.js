import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ item, onPress }) {
    const { cart, addToCart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist } = useStore();
    const isWished = isInWishlist(item.id);
    const cartItem = cart.find(c => c.id === item.id);

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Pressable
                    style={styles.wishlistBtn}
                    onPress={() => toggleWishlist(item)}
                >
                    <Ionicons
                        name={isWished ? "heart" : "heart-outline"}
                        size={22}
                        color={isWished ? "#FF4444" : "#666"}
                    />
                </Pressable>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    {cartItem ? (
                        <View style={styles.qtyControls}>
                            <Pressable
                                style={styles.qtyBtn}
                                onPress={() => {
                                    if (cartItem.quantity === 1) {
                                        removeFromCart(item.id);
                                    } else {
                                        updateQuantity(item.id, -1);
                                    }
                                }}
                            >
                                <Ionicons name="remove" size={16} color="#FFFFFF" />
                            </Pressable>
                            <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                            <Pressable
                                style={styles.qtyBtn}
                                onPress={() => updateQuantity(item.id, 1)}
                            >
                                <Ionicons name="add" size={16} color="#FFFFFF" />
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable
                            style={styles.addBtn}
                            onPress={() => addToCart(item)}
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </Pressable>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EAEAEC',
    },
    imageContainer: {
        width: '100%',
        height: 160,
        backgroundColor: '#F5F6F8',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    wishlistBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    detailsContainer: {
        padding: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    category: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 12,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D6CDF',
    },
    addBtn: {
        backgroundColor: '#2D6CDF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2D6CDF',
        borderRadius: 16,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    qtyBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 8,
    }
});
