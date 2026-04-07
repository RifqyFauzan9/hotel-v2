import { di } from "@/src/core/di/container";
import { Colors } from "@/src/core/theme";
import { EditProfileInput } from "@/src/domain/schemas/user.schema";
import AppHeader from "@/src/presentation/components/app-header";
import Button from "@/src/presentation/components/button";
import FormInput from "@/src/presentation/components/form-input";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfilePage() {
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function handleSubmit(data: EditProfileInput) {
        setIsLoading(true);

        try {
            const response = await di.updateUserProfileUseCase.execute(data);

            console.log('✅ Update response:', {
                username: response.username,
                email: response.email,
                department: response.departement,
            });
        } catch (apiError: any) {
            console.error("❌ Update error:", apiError);
            setError(apiError.message || "Update user profile failed, Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const [form, setForm] = useState<EditProfileInput>({
        email: '',
        name: '',
        phone_number: 0,
        gender: 'MALE',
        birth_date: '2026-04-07T08:51:58.392Z',
        address: '',
        job_title: '',
        join_date: '2026-04-07T08:51:58.393Z',
        employment_status: 'PERMANENT',
        emergency_contact: 0,
        blood_type: 'A',
        picture: '',
    });

    function handleChange(field: keyof EditProfileInput, value: string) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader prefixIcon="arrow-back-outline" label="Edit Profile" />
            <KeyboardAvoidingView
                style={styles.keyboard}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.pictureWrapper}>
                        <View style={styles.imageWrapper}>
                            <Image source={require('@/assets/app/images/person.jpeg')} style={styles.userImage} alt="User's profile picture" />
                        </View>
                        <View style={styles.iconWrapper}>
                            <Ionicons name="camera-outline" size={16} color={Colors.light.tintForeground} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <FormInput label="Email" value={form.email} onChangeText={(value) => handleChange('email', value)} />
                        <FormInput label="Nama Lengkap" value={form.name} onChangeText={(value) => handleChange('name', value)} />
                        <FormInput label="Nomor Telepon" value={form.phone_number.toString()} onChangeText={(value) => handleChange('phone_number', value)} />
                        <FormInput label="Gender" value={form.gender} onChangeText={(value) => handleChange('gender', value)} />
                        <FormInput label="Tanggal Lahir" value={form.birth_date} onChangeText={(value) => handleChange('birth_date', value)} />
                        <FormInput label="Alamat" value={form.address} onChangeText={(value) => handleChange('address', value)} />
                        <FormInput label="Pekerjaan" value={form.job_title} onChangeText={(value) => handleChange('job_title', value)} />
                        <FormInput label="Tanggal Bergabung" value={form.join_date} onChangeText={(value) => handleChange('join_date', value)} />
                        <FormInput label="Status Karyawan" value={form.employment_status} onChangeText={(value) => handleChange('employment_status', value)} />
                        <FormInput label="Kontak Darurat" value={form.emergency_contact.toString()} onChangeText={(value) => handleChange('emergency_contact', value)} />
                        <FormInput label="Golongan Darah" value={form.blood_type} onChangeText={(value) => handleChange('blood_type', value)} />
                    </View>
                </ScrollView>
                <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                    <Button label="Simpan Perubahan" onPress={() => handleSubmit(form)} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    keyboard: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingVertical: 40,
        backgroundColor: Colors.light.background,
    },
    pictureWrapper: {
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 24,
    },
    imageWrapper: {
        padding: 4,
        borderRadius: '50%',
        elevation: 3,
        backgroundColor: Colors.light.background,
        marginBottom: 12
    },
    userImage: {
        width: 90,
        height: 90,
        borderRadius: 50
    },
    iconWrapper: {
        padding: 5,
        borderWidth: 2,
        borderColor: Colors.light.background,
        elevation: 1,
        borderRadius: '50%',
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        right: 3,
        bottom: 8,
    },
    inputContainer: {
        gap: 10
    },
    footer: {
        minHeight: 85,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 16,
        borderTopColor: Colors.light.border,
        borderTopWidth: 1,
        borderRightColor: Colors.light.border,
        borderRightWidth: 1,
        borderLeftColor: Colors.light.border,
        borderLeftWidth: 1,
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    }
});