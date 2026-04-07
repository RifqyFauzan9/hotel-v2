import { Colors, Fonts } from "@/src/core/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    prefixIcon?: keyof typeof Ionicons.glyphMap;
    suffixIcon?: keyof typeof Ionicons.glyphMap;
}
export default function AppHeader({ label, prefixIcon, suffixIcon }: Props) {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable style={[styles.iconButtonContainer, { backgroundColor: prefixIcon ? Colors.light.muted : undefined }]} onPress={() => router.back()}>
                {prefixIcon && <Ionicons name={prefixIcon} size={20} color={Colors.light.foreground} />}
            </Pressable>

            <Text style={styles.headerLabel}>{label}</Text>

            <Pressable style={[styles.iconButtonContainer, { backgroundColor: suffixIcon ? Colors.light.muted : undefined }]}>
                {suffixIcon && <Ionicons name={suffixIcon} size={18} color={Colors.light.foreground} />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
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
    },
});