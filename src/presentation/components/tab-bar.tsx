import { ActiveTabStatus } from "@/app/(auth)/(tabs)/inspections";
import { Colors } from "@/src/core/theme";
import { StyleSheet, View } from 'react-native';
import TabbarItem from "./tab-bar-item";

type Props = {
    activeTab: ActiveTabStatus;
    setActiveTab: (value: ActiveTabStatus) => void;
};

export default function Tabbar({ activeTab, setActiveTab }: Props) {
    return (
        <View style={styles.tabBar}>
            <TabbarItem label="semua" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabbarItem label="menunggu" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabbarItem label="selesai" activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
});