import { di } from "@/src/core/di/container";
import { Colors, Fonts } from "@/src/core/theme";
import { InspectionOrder } from "@/src/domain/entities/inspection-order.entity";
import InspectionCard from "@/src/presentation/components/inspection-card";
import InventoryCard from "@/src/presentation/components/inventory-card";
import { useAuth } from "@/src/presentation/contexts/auth.context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuth();
  const [inspectionOrders, setInspectionOrders] = useState<InspectionOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [goodIssueItems] = useState([
    {
      label: 'Handuk',
      value: 24,
    },
    {
      label: 'Sabun',
      value: 50,
    },
    {
      label: 'Sandal',
      value: 30,
    }
  ]);

  const [trolleyItems] = useState([
    {
      label: 'Handuk',
      value: 8,
    },
    {
      label: 'Sabun',
      value: 2,
    },
    {
      label: 'Sandal',
      value: 12,
    }
  ]);

  useEffect(() => {
    const loadInspetionOrders = async () => {
      setIsLoading(true);
      try {
        const result = await di.getInspectionOrdersUseCase.execute({ page: 1, limit: 10 });
        setInspectionOrders(result.data || []);

      } catch (apiError) {
        console.log('Gagal fetch inspection orders: ', apiError);
        throw apiError;

      } finally {
        setIsLoading(false);
      }
    }

    loadInspetionOrders();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/app/images/person.jpeg')} style={styles.headerImage} alt="User's image" />
          <View style={styles.headerGreeting}>
            <Text style={styles.headerGreetingLabel}>Selamat Pagi,</Text>
            <Text style={styles.headerGreetingName}>{user?.profile.name || 'Guest'}</Text>
          </View>
        </View>
        <View style={styles.headerNotifButton}>
          <Ionicons name="notifications-outline" size={24} color='black' />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <SectionTitle label="Daftar Inspeksi" buttonLabel="Lihat Semua" onPress={() => { }} />
          {isLoading ? (
            <ActivityIndicator size='large' color={Colors.light.tint} />
          ) : inspectionOrders.slice(0, 2).map(i => (
            <InspectionCard
              key={i.id}
              roomName={i.asset_name}
              roomStatus={i.status}
              roomType={i.asset_type}
              onDetailPress={() => router.push(`../inspection/${i.id}`)}
            />
          ))}
        </View>
        <View style={styles.section}>
          <SectionTitle label="Status Inventaris" buttonLabel="Kelola" onPress={() => { }} />
          <View style={styles.inventoryContainer}>
            {/* Good Issue Card */}
            <InventoryCard
              label="Good Issue"
              icon="cube-outline"
              items={goodIssueItems}
            />

            {/* Troly Card */}
            <InventoryCard
              label="Troli Anda"
              icon="cart-outline"
              items={trolleyItems}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ label, buttonLabel, onPress }: { label: string; buttonLabel: string; onPress: () => void; }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleLabel}>{label}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.sectionTitleActionLabel}>{buttonLabel}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerGreeting: {
    gap: 2
  },
  headerImage: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 25,
  },
  headerNotifButton: {
    padding: 8,
    backgroundColor: Colors.light.muted,
    borderRadius: '50%',
  },
  headerGreetingLabel: {
    fontSize: 14,
    fontFamily: Fonts?.sans,
    color: Colors.light.mutedForeground,
  },
  headerGreetingName: {
    fontSize: 16,
    fontFamily: Fonts?.sansB
  },
  section: {
    gap: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleLabel: {
    fontSize: 18,
    fontFamily: Fonts?.sansB,
  },
  sectionTitleActionLabel: {
    fontSize: 16,
    fontFamily: Fonts?.sans,
    color: Colors.light.tint,
  },
  inventoryContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});