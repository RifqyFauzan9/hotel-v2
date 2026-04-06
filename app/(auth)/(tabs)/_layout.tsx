
import { Colors } from "@/src/core/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabsLayout() {
    return (
        <SafeAreaProvider>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Colors.light.tint,
                headerShown: false,
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />
                    }} />
            </Tabs>
        </SafeAreaProvider>
    );
}