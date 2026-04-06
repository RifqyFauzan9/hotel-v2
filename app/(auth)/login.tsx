import { Colors, Fonts } from "@/src/core/theme";
import Button from "@/src/presentation/components/button";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleSubmit() { }

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
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            style={styles.input}
                        />

                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry
                            style={styles.input}
                        />

                        {/* <FormErrorBanner message={errors.root?.message} /> */}

                        <Button disabled={isLoading} onPress={handleSubmit} label="Sign In" />
                    </View>

                    <View style={styles.footer}>
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
                    </View>
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
        paddingHorizontal: 24,
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
        marginBottom: 18,
    },
    form: {
        gap: 18,
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