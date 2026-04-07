import { Colors, Fonts } from "@/src/core/theme";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText: (value: string) => void;
    isPasswordField?: boolean;
}

export default function FormInput({ label, placeholder, value, onChangeText, isPasswordField = false }: Props) {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={[styles.input, { borderColor: focused ? Colors.light.tint : Colors.light.border }]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry={isPasswordField}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    inputLabel: {
        marginBottom: 10,
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground
    },
});