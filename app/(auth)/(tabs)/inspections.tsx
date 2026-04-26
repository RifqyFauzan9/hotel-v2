import { Colors } from "@/src/core/theme";
import { InspectionOrder } from "@/src/domain/entities/inspection-order.entity";
import AppHeader from "@/src/presentation/components/app-header";
import InspectionCard from "@/src/presentation/components/inspection-card";
import Tabbar from "@/src/presentation/components/tab-bar";
import { useInspections } from "@/src/presentation/hooks/use-inspections";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ActiveTabStatus = 'semua' | 'menunggu' | 'selesai';

export default function InspectionPage() {
    const {
        activeTab,
        setActiveTab,
        isLoading,
        error,
        inspections,
        toDetail
    } = useInspections();

    const renderItem = ({ item }: { item: InspectionOrder }) => (
        <InspectionCard
            roomName={item.assetName}
            roomStatus={item.status}
            roomType={item.assetType}
            onDetailPress={() => toDetail(item.id)}
        />
    );

    return (
        <SafeAreaView style={styles.wrapper} edges={['top', 'right', 'left']}>
            <AppHeader label="Daftar Inspeksi" prefixIcon="filter" suffixIcon="search" />
            <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} />

            {isLoading
                ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color={Colors.light.tint} />
                </View>)
                : error ? (<Text>Terjadi Error: {error}</Text>)
                    : (<FlatList
                        data={inspections}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{
                            gap: 14,
                            padding: 18,
                            flexGrow: 1,
                        }}
                        style={{ flex: 1, backgroundColor: Colors.light.background }}
                        ListEmptyComponent={<Text>Tidak ada data</Text>}
                    />)
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
});