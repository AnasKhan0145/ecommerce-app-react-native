import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                <View style={styles.quantityContainer}>
                    <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.id, -1)}>
                        <Ionicons name="remove" size={16} color="#1A1A1A" />
                    </Pressable>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 1)}>
                        <Ionicons name="add" size={16} color="#1A1A1A" />
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.deleteBtn} onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#FF4444" />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={64} color="#CCCCCC" />
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Pressable style={styles.shopNowBtn} onPress={() => navigation.navigate('Shop')}>
                        <Text style={styles.shopNowText}>Start Shopping</Text>
                    </Pressable>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCartItem}
                        contentContainerStyle={styles.listContent}
                    />
                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
                        </View>
                        <Pressable style={styles.checkoutBtn}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEC',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    listContent: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EAEAEC',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F5F6F8',
    },
    details: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D6CDF',
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#F5F6F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 12,
        color: '#1A1A1A',
    },
    deleteBtn: {
        padding: 8,
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666666',
        marginTop: 16,
        marginBottom: 24,
    },
    shopNowBtn: {
        backgroundColor: '#2D6CDF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    shopNowText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    footer: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#EAEAEC',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        color: '#666666',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    checkoutBtn: {
        backgroundColor: '#1A1A1A',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});
