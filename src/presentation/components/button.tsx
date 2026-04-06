import { Colors, Fonts } from '@/src/core/theme';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function Button({ onPress, label, disabled = false, variant = 'primary' }: { onPress: () => void; label: string; disabled?: boolean; variant?: 'primary' | 'secondary' }) {
    if (variant === 'primary') {
        return (
            <Pressable style={[styles.button, { opacity: disabled ? 0.4 : 1 }]} onPress={onPress} disabled={disabled}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        )
    }

    return (
        <Pressable style={[styles.button, { opacity: disabled ? 0.4 : 1, backgroundColor: 'white' }]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.buttonLabel, { color: 'black' }]}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.tint,
        alignItems: 'center',
        padding: 14,
        borderRadius: 8,
        elevation: 2,
        flex: 1,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 16,
        fontFamily: Fonts?.sansM,
    },
});