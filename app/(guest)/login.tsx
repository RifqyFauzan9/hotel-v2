import { di } from "@/src/core/di/container";
import { Colors, Fonts } from "@/src/core/theme";
import { LoginCredentials } from "@/src/domain/entities/auth.entity";
import Button from "@/src/presentation/components/button";
import FormInput from "@/src/presentation/components/form-input";
import { useAuth } from "@/src/presentation/contexts/auth.context";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string>('');

    async function handleSubmit(data: LoginCredentials) {
        setIsLoading(true);

        try {
            const loginRespnose = await di.loginUseCase.execute(data);
            const user = await di.getCurrentUserUseCase.execute();

            console.log("✅ Login response:", {
                user: loginRespnose.user,
                hasTokens: !!loginRespnose.accessToken && !!loginRespnose.refreshToken,
                accessToken: loginRespnose.accessToken ? "present" : "missing",
            });

            login(user, loginRespnose.accessToken);

            console.log("✅ Auth context updated.")

            console.log("✅ Navigating to home (tabs)...");

            router.replace("/(auth)/(tabs)");
        } catch (error: any) {
            console.error("❌ Login error:", error);
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Image source={require('@/assets/app/images/logo.png')} alt="App's Logo" style={styles.image} />

                    <View style={styles.form}>
                        <Text style={styles.title}>Log in to your account</Text>
                        <FormInput
                            value={identifier}
                            onChangeText={setIdentifier}
                            placeholder="Email/Username"
                        />

                        <FormInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            isPasswordField
                        />

                        {/* <FormErrorBanner message={errors.root?.message} /> */}

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        <Button disabled={isLoading} onPress={() => handleSubmit({ identifier, password })} label="Sign In" />
                    </View>

                    {/* <View style={styles.footer}>
                        <Text style={styles.footerHeaderText}>- Or sign in with -</Text>

                        <View style={styles.footerBody}>
                            <View style={styles.footerBodyItem}>
                                <Ionicons name="logo-google" size={24} color='red' />
                            </View>
                            <View style={styles.footerBodyItem}>
                                <Ionicons name="logo-facebook" size={24} color='blue' />
                            </View>
                            <View style={styles.footerBodyItem}>
                                <Ionicons name="logo-twitter" size={24} color='lightblue' />
                            </View>
                        </View>
                    </View> */}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 26,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 100,
        objectFit: 'cover',
        marginHorizontal: 'auto',
        marginBottom: 24,
    },
    errorText: {
        fontFamily: Fonts?.sansM,
        color: Colors.light.destructiveForeground,
    },
    form: {
        gap: 16,
        marginBottom: 32,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts?.sansB,
        color: '#595959'
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 18,
        fontSize: 14,
        fontFamily: Fonts?.sansSB,
        borderRadius: 6,
        elevation: 1,
    },
    footer: {
        alignItems: 'center'
    },
    footerHeaderText: {
        fontFamily: Fonts?.sansSB,
        color: Colors.light.mutedForeground,
        marginBottom: 14,
    },
    footerBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    footerBodyItem: {
        elevation: 1,
        paddingHorizontal: 28,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 8,
    }
});