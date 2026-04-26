import { Colors, Fonts } from '@/src/core/theme';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    onPress?: () => void;
    label: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary',
};

export default function Button({ onPress, label, disabled = false, variant = 'primary' }: Props) {
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
        flex: 1,
        paddingVertical: 14,
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 1,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts?.sansSB,
    },
});