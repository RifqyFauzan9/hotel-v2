import { di } from "@/src/core/di/container";
import { ProfileInput } from "@/src/domain/entities/user.entity";
import { ProfileSchema } from "@/src/domain/schemas/user.schema";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ZodError } from "zod";
import { useAuth } from "../contexts/auth.context";

export function useEditProfile() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileInput, string>>>({});
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [initialForm, setInitialForm] = useState<ProfileInput | null>(null);
    const [image, setImage] = useState<string | null>(null)

    const [form, setForm] = useState<ProfileInput>({
        // email: '',
        employeeId: '',
        name: '',
        phoneNumber: 0,
        gender: 'MALE',
        birthDate: '',
        address: '',
        jobTitle: '',
        joinDate: '',
        employmentStatus: 'CONTRACT',
        emergencyContact: 0,
        bloodType: 'A',
    });

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission required", "Permission to access the media library is required.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            setForm(prev => ({ ...prev, picture: uri }));
        }
    }

    async function handleSubmit(data: ProfileInput) {
        setIsLoading(true);
        setErrors({});

        try {
            ProfileSchema.parse(data);

            const updatedUser = await di.updateUserProfileUseCase.execute(data);

            const updatedPicture = updatedUser.avatarUrl ?? data.picture;
            setForm(prev => ({ ...prev, picture: updatedPicture }));
            setInitialForm(prev => prev ? { ...prev, picture: updatedPicture } : prev);

            refreshUser();
            router.replace('/profile')
        } catch (err: any) {
            if (err instanceof ZodError) {
                const fieldErrors: Partial<Record<keyof ProfileInput, string>> = {};

                err.issues.forEach((e) => {
                    const field = e.path[0] as keyof ProfileInput;
                    fieldErrors[field] = e.message;
                });

                setErrors(fieldErrors);
            } else {
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchProfile() {
        setIsFetching(true);
        try {
            const user = await di.getCurrentUserUseCase.execute();
            const profile = await di.getCurrentUserProfileUseCase.execute();

            const profileData = {
                ...profile,
                picture: user.avatarUrl ?? '',
            };

            setForm(profileData);
            setInitialForm(profileData);

        } catch (err) {
            console.error("❌ Failed fetch profile:", err);
        } finally {
            setIsFetching(false)
        }
    }

    function handleChange(field: keyof ProfileInput, value: string) {
        setForm(prev => ({
            ...prev,
            [field]:
                field === 'phoneNumber' || field === 'emergencyContact'
                    ? value === ''
                        ? 0
                        : Number(value.replace(/[^0-9]/g, '')) || 0
                    : value
        }));

        setErrors(prev => ({
            ...prev,
            [field]: undefined
        }));
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        isLoading,
        isFetching,
        errors,
        handleSubmit,
        form,
        handleChange,
        pickImage
    }
}