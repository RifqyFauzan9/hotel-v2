import { Colors, Fonts } from "@/src/core/theme";
import { TaskUI } from "@/src/domain/entities/program-detail.entity";
import AppHeader from "@/src/presentation/components/app-header";
import Button from "@/src/presentation/components/button";
import FormInput from "@/src/presentation/components/form-input";
import { Checkbox } from "expo-checkbox";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const tasks = [
    { taskTitle: 'Lantai Kamar Mandi Kering & Bersih' },
    { taskTitle: 'Kaca & Cermin Bebas Bercak Air' },
    { taskTitle: 'Bathub Bersih & Cemerlang' },
    // { taskTitle: 'Closet Bersih & Berfungsi Baik' },
];

export default function TaskDetailPage() {
    const [checkbox, setCheckbox] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    // const [programDetail, setProgramDetail] = useState<ProgramDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { item } = useLocalSearchParams();
    const parsedItem = item ? JSON.parse(item as string) : null;
    const [taskList, setTaskList] = useState<TaskUI[]>([]);

    const toggleCheckbox = (id: string) => {
        setTaskList(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    };

    // useEffect(() => {
    //     async function loadProgramDetail() {
    //         setIsLoading(true);
    //         try {
    //             const result = await di.getInspectionProgramByIdUseCase.execute(id as string);
    //             setProgramDetail(result);
    //         } catch (apiError: any) {
    //             console.error(apiError);
    //             setError(apiError);
    //             throw apiError;
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     loadProgramDetail();
    // }, []);

    useEffect(() => {
        if (programDetail) {
            const mapped = programDetail.inspectionProgramTask.map(item => ({
                ...item, checked: false,
            }));

            setTaskList(mapped);
        }
    }, [programDetail]);

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size="large" color={Colors.light.tint} />
    //         </View>
    //     );
    // }

    // if (error) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <Text style={{ color: Colors.light.destructiveForeground, fontFamily: Fonts?.sansM, fontSize: 16 }}>{error}</Text>
    //         </View>
    //     );
    // }

    // if (!programDetail) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <Text style={{ color: Colors.light.destructiveForeground, fontFamily: Fonts?.sansM, fontSize: 16 }}>Data Tidak Ditemukan</Text>
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader prefixIcon="arrow-back" label="Pemeriksaan Tugas" />

            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                style={styles.container}
                bottomOffset={62}
            >
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{programDetail.name}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{programDetail.type}</Text>
                        </View>
                    </View>
                    <Text style={styles.cardDescription}>
                        {programDetail.description}
                    </Text>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Ceklis Pengecekan</Text>
                    <View>
                        {taskList.length > 0
                            ? taskList.map((item, index) => {
                                const isSingle = taskList.length === 1;
                                const hasMultiple = taskList.length > 1;

                                const isFirst = hasMultiple && index === 0;
                                const isLast = hasMultiple && index === taskList.length - 1;

                                return (
                                    <Pressable
                                        key={item.id}
                                        style={[
                                            styles.taskItem,
                                            isSingle && styles.taskItemSingle,
                                            isFirst && styles.taskItemFirst,
                                            isLast && styles.taskItemLast,
                                            hasMultiple && !isLast && styles.taskItemDivider
                                        ]}
                                    >
                                        <Checkbox
                                            style={styles.checkbox}
                                            value={item.checked}
                                            onValueChange={() => toggleCheckbox(item.id)}
                                            color={checkbox ? Colors.light.tint : undefined}
                                        />
                                        <View style={styles.taskItemContent}>
                                            <Text style={styles.taskItemTitle} numberOfLines={1} ellipsizeMode="tail">
                                                {item.parameterName}
                                            </Text>
                                            <Text style={styles.taskItemSubtitle}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            })
                            : <Text style={{ fontSize: 14, fontFamily: Fonts?.sansM, color: Colors.light.mutedForeground }}>Tidak ada tugas yang diberikan.</Text>
                        }
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Laporan Pengecekan</Text>
                    <FormInput label="Catatan (opsional)" onChangeText={setValue} type="textarea" placeholder="Tambahkan catatan hasil inspeksi atau temuan khusus disini..." />
                </View>

                <Button label="Simpan & Selesai" />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContainer: {
        padding: 16,
        gap: 24,
    },
    card: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.light.border,
        gap: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    cardTitle: {
        flex: 1,
        fontSize: 15,
        fontFamily: Fonts?.sansB,
    },
    badge: {
        backgroundColor: Colors.light.warning,
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    badgeText: {
        color: Colors.light.warningForeground,
        fontFamily: Fonts?.sansSB,
        fontSize: 12,
    },
    cardDescription: {
        fontSize: 12,
        fontFamily: Fonts?.sans,
        color: Colors.light.mutedForeground,
    },
    sectionTitle: {
        fontFamily: Fonts?.sansB,
        fontSize: 16,
        marginBottom: 12,
    },
    taskItem: {
        flexDirection: 'row',
        gap: 14,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.light.border,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    taskItemSingle: {
        borderRadius: 10,
    },
    taskItemFirst: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    taskItemLast: {
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    taskItemDivider: {
        borderBottomWidth: 0,
    },
    checkbox: {
        marginTop: 5,
        height: 20,
        width: 20,
        borderRadius: 4,
    },
    taskItemContent: {
        flex: 1,
        gap: 4,
    },
    taskItemTitle: {
        fontSize: 14,
        fontFamily: Fonts?.sansSB,
    },
    taskItemSubtitle: {
        fontSize: 14,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground,
    },
});