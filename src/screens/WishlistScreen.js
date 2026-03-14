import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function WishlistScreen({ navigation }) {
    const { wishlist } = useStore();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Wishlist</Text>
            </View>

            {wishlist.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color="#CCCCCC" />
                    <Text style={styles.emptyText}>Your wishlist is empty</Text>
                    <Pressable style={styles.shopNowBtn} onPress={() => navigation.navigate('Shop')}>
                        <Text style={styles.shopNowText}>Discover Products</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductCard
                            item={item}
                            onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        />
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                />
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
        padding: 8,
        paddingBottom: 24,
    },
    row: {
        justifyContent: 'space-between',
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
    }
});
