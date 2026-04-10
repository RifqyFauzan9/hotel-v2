import { Colors, Fonts } from "@/src/core/theme";
import { capitalizeFirstLetter } from "@/src/core/utils/inspection.utils";
import AppHeader from "@/src/presentation/components/app-header";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InspectionPage() {
    const [activeTab, setActiveTab] = useState<string>('semua');

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader label="Daftar Inspeksi" suffixIcon="filter" />
            <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </SafeAreaView>
    );
}

function Tabbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (value: string) => void; }) {
    return (
        <View style={styles.tabbar}>
            <TabbarItem label="semua" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabbarItem label="siap" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabbarItem label="berjalan" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabbarItem label="selesai" activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
    )
}

function TabbarItem({ label, activeTab, setActiveTab }: { label: string, activeTab: string; setActiveTab: (value: string) => void; }) {
    return (
        <Pressable
            style={[styles.tabbarItem,
            { backgroundColor: activeTab === label ? Colors.light.tint : Colors.light.muted }
            ]}
            onPress={() => setActiveTab(label)}
        >
            <Text style={[styles.tabbarItemText, { color: activeTab === label ? Colors.light.tintForeground : Colors.light.mutedForeground }]}>{capitalizeFirstLetter(label)}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    tabbar: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    tabbarItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
    },
    tabbarItemText: {
        fontFamily: Fonts?.sansSB,
        fontSize: 14,
        textAlign: 'center'
    }
});