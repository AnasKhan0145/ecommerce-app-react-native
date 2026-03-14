import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { dummyProducts } from '../data/dummy-data';

export default function ShopScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Discover</Text>
                <Text style={styles.subtitle}>Premium gear for everyday use</Text>
            </View>
            <FlatList
                data={dummyProducts}
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
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
    },
    listContent: {
        padding: 8,
        paddingBottom: 24,
    },
    row: {
        justifyContent: 'space-between',
    }
});
