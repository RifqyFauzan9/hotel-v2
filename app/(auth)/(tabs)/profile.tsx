import { Colors, Fonts } from "@/src/core/theme";
import AppHeader from "@/src/presentation/components/app-header";
import { useAuth } from "@/src/presentation/contexts/auth.context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ActionButton = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
}

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);

    const sourceImage = user?.avatarUrl ? { uri: user?.avatarUrl } : require('@/assets/app/images/no-profile.jpeg');

    const [options] = useState<ActionButton[]>([
        { icon: 'settings-outline', label: 'Edit Profil', onPress: () => router.push('/(auth)/profile/edit') },
        { icon: 'lock-closed-outline', label: 'Ganti Kata Sandi', onPress: () => { } },
        // { icon: 'notifications-outline', label: 'Notifikasi', onPress: () => { } },
    ]);

    return (
        <SafeAreaView style={styles.wrapper} edges={['top', 'right', 'left']}>
            <AppHeader label="Profil" />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileSection}>
                    <Pressable style={styles.imageWrapper} onPress={() => setShowImagePreview(true)}>
                        <Image source={sourceImage} style={styles.userImage} alt="User's profile picture" />
                    </Pressable>
                    <Text style={styles.userName}>{user?.profile?.name || 'Guest'}</Text>
                    <Text style={styles.userRole}>{user?.departement || 'Inspektor'}</Text>
                    <Text style={styles.userId}>ID: {user?.id.split('-')[0] || 'none'}</Text>
                </View>
                <View style={styles.actionButtonSection}>
                    <Text style={styles.actionButtonSectionLabel}>AKUN</Text>
                    <View style={styles.actionButtonList}>
                        {options.map((item, index) => {
                            const isFirst = index === 0;
                            const isLast = index === options.length - 1;

                            return (
                                <Pressable
                                    style={[
                                        styles.actionButtonItem,
                                        isFirst && {
                                            borderTopStartRadius: 12,
                                            borderTopEndRadius: 12,
                                        },
                                        isLast && {
                                            borderBottomStartRadius: 12,
                                            borderBottomEndRadius: 12,
                                        },
                                        !isLast && { borderBottomWidth: 0 }
                                    ]}
                                    key={item.label}
                                    onPress={item.onPress}
                                >
                                    <View style={styles.actionButtonItemIcon}>
                                        <Ionicons name={item.icon} size={18} color={Colors.light.foreground} />
                                    </View>
                                    <View style={styles.actionButtonItemContent}>
                                        <Text style={styles.actionButtonItemTitle} numberOfLines={1} ellipsizeMode="tail">{item.label}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward-outline" size={18} color={Colors.light.foreground} />
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    content: {
        flex: 1,
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 6,
        borderBottomColor: Colors.light.border,
        borderBottomWidth: 1,
        paddingVertical: 32,
    },
    imageWrapper: {
        padding: 4,
        borderRadius: '50%',
        elevation: 3,
        backgroundColor: Colors.light.background,
        marginBottom: 12
    },
    userImage: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    userName: {
        fontSize: 18,
        fontFamily: Fonts?.sansSB,
    },
    userRole: {
        fontSize: 14,
        color: Colors.light.tint,
        fontFamily: Fonts?.sans,
    },
    userId: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
        fontFamily: Fonts?.sans,
    },
    actionButtonSection: {
        padding: 16,
        backgroundColor: Colors.light.background,
        flex: 1,
        gap: 14,
    },
    actionButtonSectionLabel: {
        color: Colors.light.mutedForeground,
        fontFamily: Fonts?.sansSB,
        fontSize: 14,
    },
    actionButtonList: {},
    actionButtonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.light.border,
        padding: 16,
    },
    actionButtonItemIcon: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: Colors.light.muted
    },
    actionButtonItemTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansSB,
    },
    actionButtonItemSubtitle: {
        fontSize: 14,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground,
    },
    actionButtonItemContent: {
        gap: 4,
        flex: 1,
    },
});
