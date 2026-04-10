import { Colors, Fonts } from '@/src/core/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { DimensionValue, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: Option[];
    value: string | null;
    placeholder?: string;
    onChange: (value: string) => void;
    width?: DimensionValue;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
};

type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export default function Dropdown({ options, value, placeholder = 'Pilih...', onChange, width = '100%', icon, iconColor = Colors.light.foreground }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [layout, setLayout] = useState<Layout | null>(null);
    const triggerRef = useRef<View>(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    const openDropdown = () => {
        triggerRef.current?.measureInWindow((x, y, w, h) => {
            setLayout({ x, y, width: w, height: h });
            setIsOpen(true);
        });
    };

    return (
        <View style={{ width }}>
            {/* Trigger */}
            <View ref={triggerRef} style={{ width: '100%' }}>
                <Pressable
                    onPress={openDropdown}
                    style={styles.trigger}
                >
                    <View style={styles.triggerContent}>
                        {icon && <Ionicons name={icon} size={14} color={iconColor} />}
                        <Text style={styles.triggerText}>
                            {selectedLabel ?? placeholder}
                        </Text>
                    </View>
                    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color='#092361' />
                </Pressable>
            </View>

            {/* Modal */}
            <Modal visible={isOpen} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                    {layout && (
                        <View
                            style={[
                                styles.dropdownMenu,
                                {
                                    top: layout.y + layout.height + 6,
                                    left: layout.x,
                                    width: layout.width,
                                }
                            ]}
                        >
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => {
                                    const isSelected = item.value === value;
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                onChange(item.value);
                                                setIsOpen(false);
                                            }}
                                            style={[
                                                styles.optionItem,
                                                isSelected ? styles.optionItemSelected : styles.optionItemDefault
                                            ]}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                { color: isSelected ? Colors.light.successForeground : Colors.light.foreground }
                                            ]}>
                                                {item.label}
                                            </Text>
                                            {isSelected &&
                                                <Ionicons name="checkmark" size={16} color='#1f4a9c' />
                                            }
                                        </Pressable>
                                    );
                                }}
                            />
                        </View>
                    )}
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    triggerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    triggerText: {
        fontFamily: Fonts?.sansM,
        color: Colors.light.foreground
    },
    modalOverlay: {
        flex: 1,
    },
    dropdownMenu: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8, // rounded-2xl
        overflow: 'hidden',
        // Shadow untuk iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Shadow untuk Android
        elevation: 5,
    },
    optionItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    optionItemDefault: {
        backgroundColor: 'white',
    },
    optionItemSelected: {
        backgroundColor: Colors.light.success,
    },
    optionText: {
        fontFamily: Fonts?.sansM,
    },
});