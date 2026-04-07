import { Colors, Fonts } from "@/src/core/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    suffixIcon?: keyof typeof Ionicons.glyphMap;
}
export default function AppHeader({ label, suffixIcon }: Props) {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable style={styles.iconButtonContainer} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color={Colors.light.foreground} />
            </Pressable>

            <Text style={styles.headerLabel}>{label}</Text>

            <Pressable style={styles.iconButtonContainer}>
                {suffixIcon && <Ionicons name={suffixIcon} size={18} color={Colors.light.foreground} />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderBottomColor: Colors.light.border,
        borderBottomWidth: 1,
    },
    headerLabel: {
        flex: 1,
        fontSize: 18,
        fontFamily: Fonts?.sansB,
        textAlign: 'center'
    },
    iconButtonContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: Colors.light.muted
    },
});