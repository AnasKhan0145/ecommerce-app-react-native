import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    // Temporary state for when editing
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const openEditModal = () => {
        setEditName(name);
        setEditEmail(email);
        setIsEditModalVisible(true);
    };

    const saveProfile = () => {
        if (editName.trim() && editEmail.trim()) {
            setName(editName);
            setEmail(editEmail);
            setIsEditModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={40} color="#CCCCCC" />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
                <Pressable style={styles.editBtn} onPress={openEditModal}>
                    <MaterialIcons name="edit" size={20} color="#2D6CDF" />
                </Pressable>
            </View>

            {/* Edit Profile Modal */}
            <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Personal Details</Text>

                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={editName}
                            onChangeText={setEditName}
                            placeholder="Enter your name"
                        />

                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={editEmail}
                            onChangeText={setEditEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalBtn, styles.cancelBtn]}
                                onPress={() => setIsEditModalVisible(false)}
                            >
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalBtn, styles.saveBtn]}
                                onPress={saveProfile}
                            >
                                <Text style={styles.saveBtnText}>Save Changes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#FFFFFF',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEC',
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F5F6F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666666',
    },
    editBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F6F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 16,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F5F6F8',
        borderWidth: 1,
        borderColor: '#EAEAEC',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1A1A1A',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    modalBtn: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    cancelBtn: {
        backgroundColor: '#F5F6F8',
    },
    cancelBtnText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
    },
    saveBtn: {
        backgroundColor: '#2D6CDF',
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});
