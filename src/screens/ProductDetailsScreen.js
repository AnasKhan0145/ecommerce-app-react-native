import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params;
    const { cart, addToCart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist } = useStore();
    const isWished = isInWishlist(product.id);
    const cartItem = cart.find(c => c.id === product.id);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </Pressable>
                <Pressable style={styles.wishlistBtn} onPress={() => toggleWishlist(product)}>
                    <Ionicons
                        name={isWished ? "heart" : "heart-outline"}
                        size={24}
                        color={isWished ? "#FF4444" : "#1A1A1A"}
                    />
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />

                <View style={styles.detailsContainer}>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                {cartItem ? (
                    <View style={styles.qtyControlsContainer}>
                        <Pressable
                            style={styles.qtyBtn}
                            onPress={() => {
                                if (cartItem.quantity === 1) {
                                    removeFromCart(product.id);
                                } else {
                                    updateQuantity(product.id, -1);
                                }
                            }}
                        >
                            <Ionicons name="remove" size={24} color="#FFFFFF" />
                        </Pressable>
                        <Text style={styles.qtyTextLarge}>{cartItem.quantity}</Text>
                        <Pressable
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(product.id, 1)}
                        >
                            <Ionicons name="add" size={24} color="#FFFFFF" />
                        </Pressable>
                    </View>
                ) : (
                    <Pressable style={styles.addToCartBtn} onPress={() => addToCart(product)}>
                        <Ionicons name="cart-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    wishlistBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
    },
    category: {
        fontSize: 14,
        color: '#666666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D6CDF',
        marginBottom: 24,
    },
    divider: {
        height: 1,
        backgroundColor: '#EAEAEC',
        marginBottom: 24,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666666',
        marginBottom: 40,
    },
    footer: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EAEAEC',
    },
    addToCartBtn: {
        backgroundColor: '#2D6CDF',
        flexDirection: 'row',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2D6CDF',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 4,
    },
    addToCartText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    qtyControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2D6CDF',
        height: 56,
        borderRadius: 28,
        paddingHorizontal: 8,
        shadowColor: '#2D6CDF',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 4,
    },
    qtyBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyTextLarge: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    }
});
