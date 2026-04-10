import { Colors } from "@/src/core/theme";
import AppHeader from "@/src/presentation/components/app-header";
import Button from "@/src/presentation/components/button";
import FormInput from "@/src/presentation/components/form-input";
import { useEditProfile } from "@/src/presentation/hooks/use-edit-profile";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfilePage() {
    const {
        isLoading,
        isFetching,
        errors,
        handleSubmit,
        form,
        handleChange,
        pickImage,
    } = useEditProfile();

    const sourceImage = form.picture
        ? { uri: form.picture }
        : require('@/assets/app/images/no-profile.jpeg');

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    if (isFetching) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={Colors.light.tint} />
            </View>
        );
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
                            <Image source={sourceImage} style={styles.userImage} alt="User's profile picture" />
                        </View>
                        <Pressable style={styles.iconWrapper} onPress={pickImage}>
                            <Ionicons name="camera-outline" size={16} color={Colors.light.tintForeground} />
                        </Pressable>
                    </View>

                    <View style={styles.inputContainer}>
                        <FormInput
                            label="Nama Lengkap"
                            value={form.name}
                            onChangeText={(value) => handleChange('name', value)}
                            error={errors.name}
                        />
                        <FormInput
                            label="Nomor Telepon"
                            type="number"
                            value={form.phoneNumber ? form.phoneNumber.toString() : ''}
                            onChangeText={(value) => handleChange('phoneNumber', value)}
                            error={errors.phoneNumber}
                        />
                        <FormInput
                            label="Gender"
                            type="dropdown"
                            placeholder="Pilih Gender"
                            value={form.gender}
                            options={[{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }]}
                            onChangeText={(val) => handleChange('gender', val)}
                            suffixIcon="male-female"
                            error={errors.gender}
                        />
                        <FormInput
                            label="Tanggal Lahir"
                            value={form.birthDate.split('T')[0]}
                            onChangeText={(value) => handleChange('birthDate', value)}
                            type="datepicker"
                            error={errors.birthDate}
                        />
                        <FormInput
                            label="Alamat"
                            value={form.address}
                            onChangeText={(value) => handleChange('address', value)}
                            error={errors.address}
                        />
                        <FormInput
                            label="Pekerjaan"
                            value={form.jobTitle}
                            onChangeText={(value) => handleChange('jobTitle', value)}
                            error={errors.jobTitle}
                        />
                        <FormInput
                            label="Tanggal Bergabung"
                            value={form.joinDate.split('T')[0]}
                            onChangeText={(value) => handleChange('joinDate', value)}
                            type="datepicker"
                            error={errors.joinDate}
                        />
                        <FormInput
                            label="Status Karyawan"
                            type="dropdown"
                            placeholder="Pilih Status Karyawan"
                            value={form.employmentStatus}
                            options={[{ label: 'Contract', value: 'CONTRACT' }, { label: 'Permanent', value: 'PERMANENT' }, { label: 'Intern', value: 'INTERN' }]}
                            onChangeText={(val) => handleChange('employmentStatus', val)}
                            suffixIcon="contract"
                            error={errors.employmentStatus}
                        />
                        <FormInput
                            label="Kontak Darurat"
                            type="number"
                            value={form.emergencyContact ? form.emergencyContact.toString() : ''}
                            onChangeText={(value) => handleChange('emergencyContact', value)}
                            error={errors.emergencyContact}
                        />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button label="Simpan Perubahan" onPress={() => handleSubmit(form)} disabled={isLoading} />
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
    inputContainer: { gap: 12 },
    footer: {
        minHeight: 85,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 16,
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