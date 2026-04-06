import { Colors, Fonts } from '@/src/core/theme';
import { formatInspectionStatus } from '@/src/core/utils/inspection.utils';
import { InspectionStatus } from '@/src/domain/entities/inspection.entity';
import Button from '@/src/presentation/components/button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function InspectionCard({ roomName, roomType, roomStatus }: { roomName: string; roomType: string; roomStatus: InspectionStatus }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <View style={styles.cardBodyLeft}>
                    <View style={styles.cardBodyLeftIcon}>
                        <Ionicons name="bed-outline" size={24} color={Colors.light.tint} />
                    </View>
                    <View style={styles.cardBodyLeftLabel}>
                        <Text style={styles.cardBodyTitle}>{roomName}</Text>
                        <Text style={styles.cardBodyType}>{roomType}</Text>
                    </View>
                </View>
                <View style={[styles.cardStatus, { backgroundColor: roomStatus === 'COMPLETED' ? Colors.light.success : Colors.light.warning }]}>
                    <Text style={[styles.cardStatusText, { color: roomStatus === 'COMPLETED' ? Colors.light.successForeground : Colors.light.warningForeground }]}>{formatInspectionStatus(roomStatus)}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <Button label="Detail" onPress={() => { }} variant="secondary" />
                <Button label="Start" onPress={() => { }} variant="primary" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 18,
        gap: 14
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardFooter: {
        flexDirection: 'row',
        flex: 1,
        gap: 8,
    },
    cardBodyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardBodyLeftIcon: {
        backgroundColor: Colors.light.muted,
        padding: 12,
        borderRadius: 8,
    },
    cardBodyLeftLabel: {
        gap: 2,
    },
    cardBodyTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansB,
    },
    cardBodyType: {
        fontSize: 14,
        fontFamily: Fonts?.sans,
        color: Colors.light.mutedForeground,
    },
    cardStatus: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cardStatusText: {
        fontFamily: Fonts?.sansSB,
        fontSize: 12,
    },
})