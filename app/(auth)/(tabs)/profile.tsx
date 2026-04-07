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

    const [options] = useState<ActionButton[]>([
        { icon: 'settings-outline', label: 'Edit Profil', onPress: () => { } },
        { icon: 'lock-closed-outline', label: 'Ganti Kata Sandi', onPress: () => { } },
        // { icon: 'notifications-outline', label: 'Notifikasi', onPress: () => { } },
    ]);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'right', 'left']}>
            <AppHeader label="Profil" />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    gap: 6,
                    borderBottomColor: Colors.light.border,
                    borderBottomWidth: 1,
                    paddingVertical: 32,
                }}>
                    <View style={{
                        padding: 4,
                        borderRadius: '50%',
                        elevation: 3,
                        backgroundColor: Colors.light.background,
                        marginBottom: 12
                    }}>
                        <Image source={require('@/assets/app/images/person.jpeg')} style={{ width: 90, height: 90, borderRadius: 50 }} />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: Fonts?.sansSB,
                    }}>{user?.profile.name || 'Guest'}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: Colors.light.tint,
                        fontFamily: Fonts?.sans,
                    }}>{user?.departement || 'Inspektor'}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: Colors.light.mutedForeground,
                        fontFamily: Fonts?.sans,
                    }}>ID: {user?.id.split('-')[0] || 'none'}</Text>
                </View>
                <View style={{
                    padding: 16,
                    backgroundColor: Colors.light.background,
                    flex: 2,
                    gap: 14,
                }}>
                    <Text style={{
                        color: Colors.light.mutedForeground,
                        fontFamily: Fonts?.sansSB,
                        fontSize: 14,
                    }}>AKUN</Text>
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
                                    <View style={{
                                        padding: 12,
                                        borderRadius: 10,
                                        backgroundColor: Colors.light.muted
                                    }}>
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
    content: {
        flex: 1,
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
