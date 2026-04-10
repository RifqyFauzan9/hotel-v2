import { Colors, Fonts } from "@/src/core/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Dropdown from "./dropdown";

type Option = {
    label: string;
    value: string;
}

type Props = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText: (value: string) => void;
    isPasswordField?: boolean;
    type?: 'dropdown' | 'text' | 'datepicker' | 'number';
    suffixIcon?: keyof typeof Ionicons.glyphMap;
    options?: Option[];
    error?: string;
}

export default function FormInput({
    label, placeholder, value, onChangeText,
    isPasswordField = false, type = 'text', suffixIcon,
    options = [], error }: Props) {
    const [focused, setFocused] = useState<boolean>(false);
    const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState<boolean>(false);
    const [showIOSPicker, setShowIOSPicker] = useState<boolean>(false);

    // Menangani perubahan tanggal
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'ios') {
            setShowIOSPicker(false); // Tutup picker di iOS setelah memilih
        }

        if (event.type === 'set' && selectedDate) {
            const formattedDate = selectedDate.toISOString();
            onChangeText(formattedDate);
        }
    };

    const showMode = (currentMode: 'date' | 'time') => {
        const currentDate = value ? new Date(value) : new Date();

        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: currentDate,
                onChange: onChangeDate,
                mode: currentMode,
                is24Hour: true,
            });
        } else if (Platform.OS === 'ios') {
            setShowIOSPicker(true);
        }
    }

    const showDatePicker = () => {
        showMode('date');
    }

    // --- RENDER UNTUK DATEPICKER ---
    if (type === 'datepicker') {
        return (
            <View style={styles.wrapper}>
                {label && <Text style={styles.inputLabel}>{label}</Text>}

                <Pressable onPress={showDatePicker}>
                    {/* pointerEvents="none" agar klik tembus ke Pressable, mencegah keyboard muncul */}
                    <View style={[styles.inputContainer, { borderColor: focused ? Colors.light.tint : Colors.light.border }]} pointerEvents="none">
                        <TextInput
                            value={value}
                            placeholder={placeholder ?? "Pilih tanggal"}
                            style={styles.input}
                            editable={false}
                        />

                        <Ionicons
                            name={suffixIcon || "calendar-outline"}
                            size={18}
                            color={Colors.light.mutedForeground}
                        />
                    </View>
                </Pressable>

                {error && (
                    <Text style={styles.errorMessage}>{error}</Text>
                )}

                {/* Render spesifik untuk iOS */}
                {showIOSPicker && Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={value ? new Date(value) : new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
            </View>
        );
    }

    if (type === 'dropdown') {
        return (
            <View style={styles.wrapper}>
                {label && <Text style={styles.inputLabel}>{label}</Text>}
                <Dropdown
                    options={options}
                    value={value ?? null}
                    onChange={onChangeText} // Langsung gunakan onChangeText
                    placeholder={placeholder}
                    icon={suffixIcon}
                    width="100%" // Gunakan 100% agar responsif dalam container
                />

                {error && (
                    <Text style={styles.errorMessage}>{error}</Text>
                )}
            </View>
        );
    }

    // --- RENDER UNTUK TEXT INPUT BIASA ---
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <View style={[styles.inputContainer, { borderColor: focused ? Colors.light.tint : Colors.light.border }]}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={styles.input}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    secureTextEntry={isPasswordField && !isPasswordFieldVisible}
                    keyboardType={type === 'number' ? 'numeric' : undefined}
                />

                {/* Handling untuk icon mata pada password atau suffixIcon biasa */}
                {isPasswordField ? (
                    <Pressable onPress={() => setIsPasswordFieldVisible(prev => !prev)}>
                        <Ionicons name={isPasswordFieldVisible ? 'eye-off' : 'eye'} size={18} color={Colors.light.mutedForeground} />
                    </Pressable>
                ) : suffixIcon ? (
                    <Ionicons name={suffixIcon} size={18} color={Colors.light.mutedForeground} />
                ) : null}
            </View>

            {error && (
                <Text style={styles.errorMessage}>{error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    input: {
        fontFamily: Fonts?.sansM,
        flex: 1,
        paddingVertical: 14,
        color: Colors.light.foreground,
    },
    inputLabel: {
        fontFamily: Fonts?.sansM,
        color: Colors.light.mutedForeground,
    },
    errorMessage: {
        fontSize: 12,
        fontFamily: Fonts?.sansSB,
        color: Colors.light.destructiveForeground
    },
    wrapper: { gap: 6 }
});