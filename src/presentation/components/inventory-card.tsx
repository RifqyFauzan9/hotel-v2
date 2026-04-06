import { Colors, Fonts } from '@/src/core/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type Naon = {
    label: string;
    value: number;
}

type Props = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    items: Naon[],
}

export default function InventoryCard({ label, icon, items }: Props) {
    return (
        <View style={styles.inventoryCard}>
            <View style={styles.inventoryCardHeader}>
                <Ionicons name={icon} size={24} color={Colors.light.tint} />
                <Text style={styles.inventoryCardHeaderTitle}>{label}</Text>
            </View>

            <View style={styles.spacer} />

            {items.map((i) => (
                <View style={styles.cardItem} key={i.label}>
                    <Text style={styles.cardItemLabel}>{i.label}</Text>
                    <Text style={styles.cardItemValue}>{i.value}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    inventoryCard: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 1,
        gap: 16,
    },
    inventoryCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    inventoryCardHeaderTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansSB,
    },
    spacer: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.light.muted,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardItemLabel: {
        fontSize: 16,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground
    },
    cardItemValue: {
        fontSize: 16,
        fontFamily: Fonts?.sansB,
        color: Colors.light.foreground
    },
})