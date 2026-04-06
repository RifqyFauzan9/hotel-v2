
import { Stack } from "expo-router";

export default function GuestLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    );
}