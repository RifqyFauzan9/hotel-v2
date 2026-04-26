import { ActiveTabStatus } from '@/app/(auth)/(tabs)/inspections';
import { Colors, Fonts } from '@/src/core/theme';
import { capitalizeFirstLetter } from '@/src/core/utils/inspection.utils';
import { Pressable, StyleSheet, Text } from 'react-native';


export default function TabbarItem({ label, activeTab, setActiveTab }: { label: ActiveTabStatus, activeTab: ActiveTabStatus; setActiveTab: (value: ActiveTabStatus) => void; }) {
    return (
        <Pressable
            style={[styles.tabBarItem,
            { backgroundColor: activeTab === label ? Colors.light.tint : Colors.light.muted }
            ]}
            onPress={() => setActiveTab(label)}
        >
            <Text style={[styles.tabBarItemText, { color: activeTab === label ? Colors.light.tintForeground : Colors.light.mutedForeground }]}>{capitalizeFirstLetter(label)}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tabBarItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 1
    },
    tabBarItemText: {
        fontFamily: Fonts?.sansSB,
        fontSize: 14,
        textAlign: 'center'
    }
});