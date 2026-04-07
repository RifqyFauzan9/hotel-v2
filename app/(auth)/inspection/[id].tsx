import { di } from "@/src/core/di/container";
import { Colors, Fonts } from "@/src/core/theme";
import { InspectionOrder } from "@/src/domain/entities/inspection-order.entity";
import AppHeader from "@/src/presentation/components/app-header";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from 'expo-checkbox';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailPage() {
    const { id } = useLocalSearchParams();
    const [detail, setDetail] = useState<InspectionOrder | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkbox, setCheckbox] = useState<boolean>(false);

    console.log(detail?.order_items[0].details.name)

    useEffect(() => {
        const loadDetailInspection = async () => {
            setIsLoading(true);
            try {
                const result = await di.getInspectionOrderByIdUseCase.execute(id as string);

                if (result === null) setDetail(null);

                setDetail(result);
            } catch (apiError) {
                console.log('Gagal fetch inspection order detail: ', apiError);
                throw apiError;

            } finally {
                setIsLoading(false);
            }
        }

        loadDetailInspection();
    }, [id]);

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader label="Detail Inspeksi" prefixIcon="arrow-back" />

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color={Colors.light.tint} />
                </View>
            ) : !detail ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Tidak ada inspection order detail yang di cari.</Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <DetailCard detail={detail} />
                    <TaskSection detail={detail} checkbox={checkbox} setCheckbox={setCheckbox} />
                </View>
            )}
        </SafeAreaView>
    )
}

function DetailCard({ detail }: { detail: InspectionOrder }) {
    return (
        <View style={styles.detailCard}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderIcon}>
                    <Ionicons name="bed-outline" size={24} color={Colors.light.tint} />
                </View>
                <View style={styles.cardHeaderLabel}>
                    <Text style={styles.cardHeaderTitle}>{detail.asset_name}</Text>
                    <Text style={styles.cardHeaderType}>{detail.asset_type}</Text>
                </View>
            </View>
            <View style={styles.badgeContainer}>
                <View style={[styles.badge, { backgroundColor: Colors.light.muted }]}>
                    <Text style={[styles.badgeLabel, { color: Colors.light.mutedForeground }]}>{detail.status}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: Colors.light.destructive }]}>
                    <Text style={[styles.badgeLabel, { color: Colors.light.destructiveForeground }]}>{detail.priority}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.light.mutedForeground} />
                    <Text style={styles.infoText}>{detail.planned_date.toISOString().split('T')[0]}, {detail.planned_date.toISOString().split('T')[1].split('.')[0]}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={14} color={Colors.light.mutedForeground} />
                    <Text style={styles.infoText}>Estimasi: {detail.estimated_man_hours}jam</Text>
                </View>
            </View>
            <View style={styles.noteCard}>
                <View style={styles.noteHeader}>
                    <Ionicons name="document-outline" color={Colors.light.foreground} size={20} />
                    <Text style={styles.noteTitle}>Catatan Supervisor</Text>
                </View>
                <Text style={styles.noteBody}>{detail.notes ?? 'Tidak ada catatan dari supervisor'}</Text>
            </View>
        </View>
    )
}

type TaskSectionProps = {
    detail: InspectionOrder;
    checkbox: boolean;
    setCheckbox: (value: boolean) => void;
};

function TaskSection({ detail, checkbox, setCheckbox }: TaskSectionProps) {
    return (
        <View style={styles.taskSection}>
            <Text style={styles.taskSectionTitle}>Daftar Tugas ({detail.order_items.length})</Text>
            <View style={styles.taskList}>
                {detail.order_items.map((item, index) => {
                    const isFirst = index === 0;
                    const isLast = index === detail.order_items.length - 1;

                    return (
                        <View style={[
                            styles.taskItem,
                            isFirst && {
                                borderTopStartRadius: 12,
                                borderTopEndRadius: 12,
                            },
                            isLast && {
                                borderBottomStartRadius: 12,
                                borderBottomEndRadius: 12,
                            },
                            !isLast && { borderBottomWidth: 0 }
                        ]} key={item.id}>
                            <Checkbox
                                style={styles.checkbox}
                                value={checkbox}
                                onValueChange={setCheckbox}
                                color={true ? Colors.light.tint : undefined}
                            />
                            <View style={styles.taskItemContent}>
                                <Text style={styles.taskItemTitle} numberOfLines={1} ellipsizeMode="tail">{item.details.name}</Text>
                                <Text style={styles.taskItemSubtitle} numberOfLines={2} ellipsizeMode="tail">{item.details.description}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 16,
        gap: 24,
        backgroundColor: Colors.light.background
    },
    detailCard: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 16,
        padding: 12,
        backgroundColor: 'white',
        gap: 16
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardHeaderIcon: {
        backgroundColor: Colors.light.muted,
        padding: 12,
        borderRadius: 8,
    },
    cardHeaderLabel: {
        gap: 2,
    },
    cardHeaderTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansB,
    },
    cardHeaderType: {
        fontSize: 14,
        fontFamily: Fonts?.sans,
        color: Colors.light.mutedForeground,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    badge: {
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 5
    },
    badgeLabel: {
        fontSize: 12,
        fontFamily: Fonts?.sansM,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 6
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    infoText: {
        fontSize: 12,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground
    },
    noteCard: {
        backgroundColor: Colors.light.muted,
        borderRadius: 14,
        padding: 14,
        gap: 6,
        elevation: 1
    },
    noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    noteTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansSB,
    },
    noteBody: {
        fontFamily: Fonts?.sansM,
        lineHeight: 20,
        color: Colors.light.mutedForeground
    },
    taskSection: {
        gap: 16,
        paddingHorizontal: 4,
    },
    taskSectionTitle: {
        fontFamily: Fonts?.sansB,
        fontSize: 18,
    },
    taskList: {
        // wrapper list
    },
    taskItem: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.light.border,
        paddingHorizontal: 14,
        paddingVertical: 16,
    },
    checkbox: {
        borderRadius: '50%',
        marginTop: 6,
    },
    taskItemTitle: {
        fontSize: 16,
        fontFamily: Fonts?.sansSB,
    },
    taskItemSubtitle: {
        fontSize: 14,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground,
    },
    taskItemContent: {
        gap: 4,
        flex: 1,
    },
});