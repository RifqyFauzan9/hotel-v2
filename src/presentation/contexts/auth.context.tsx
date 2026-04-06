import { AUTH_EVENTS, authEvents } from "@/src/core/events/auth-event";
import { httpClient } from "@/src/core/http/http-client";
import { tokenStorage } from "@/src/core/storage/token-storage";
import { userStorage } from "@/src/core/storage/user-storage";
import { User } from "@/src/domain/entities/user.entity";
import { useRouter } from "expo-router";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { showGlobalToast } from "./toast.context";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const isLoggingOut = useRef(false);
    const router = useRouter();

    // Handle session expired event - MUST be set up first
    useEffect(() => {
        console.log(
            "🔔 AuthProvider mounted - setting up SESSION_EXPIRED listener"
        );

        const handleSessionExpired = async () => {
            console.log("🔔🔔🔔 SESSION_EXPIRED handler called!");

            if (isLoggingOut.current) {
                console.log("🔔 Already logging out, skipping...");
                return;
            }
            isLoggingOut.current = true;

            console.log("🔒 Performing force logout...");

            try {
                await tokenStorage.clearTokens();
                await userStorage.clearUser();
                httpClient.removeAuthToken();

                // Clear the session expired flag
                authEvents.clearSessionExpiredFlag();

                // Update state
                setUser(null);
                setHasToken(false);

                console.log("🔒 Tokens cleared, redirecting to login...");

                // Use setTimeout to ensure state updates are processed before navigation
                setTimeout(() => {
                    router.replace("/(guest)/login");

                    // Show toast notification
                    showGlobalToast({
                        title: "Session Expired",
                        description: "Your session has expired. Please log in again.",
                        type: "warning",
                        duration: 5000,
                    });
                }, 100);
            } catch (error) {
                console.error("Error during force logout:", error);
            } finally {
                isLoggingOut.current = false;
            }
        };

        const unsubscribe = authEvents.on(
            AUTH_EVENTS.SESSION_EXPIRED,
            handleSessionExpired
        );

        return () => {
            console.log("🔔 Cleaning up SESSION_EXPIRED listener");
            unsubscribe();
        };
    }, [router]);

    const checkAuth = async () => {
        console.log("🔍 checkAuth: Starting authentication check...");
        try {
            const tokens = await tokenStorage.getTokens();
            console.log("🔍 checkAuth: Tokens retrieved:", {
                hasAccessToken: !!tokens?.accessToken,
                hasRefreshToken: !!tokens?.refreshToken,
            });

            if (tokens?.accessToken) {
                httpClient.setAuthToken(tokens.accessToken);
                setHasToken(true);

                // Restore user data from storage
                console.log("🔍 checkAuth: Attempting to restore user data...");
                const savedUser = await userStorage.getUser();
                console.log("🔍 checkAuth: User data from storage:", savedUser);

                if (savedUser) {
                    setUser(savedUser);
                    console.log("✅ User data restored successfully:", {
                        name: savedUser.username,
                        email: savedUser.email,
                        role: savedUser.roles,
                    });
                } else {
                    console.log("⚠️ No saved user data found in storage");
                }
            } else {
                console.log("❌ No access token found");
                setHasToken(false);
            }
        } catch (error) {
            console.error("❌ Error checking auth:", error);
            await tokenStorage.clearTokens();
            await userStorage.clearUser();
            setHasToken(false);
        } finally {
            setIsLoading(false);
            console.log("🔍 checkAuth: Complete");
        }
    };

    // Run checkAuth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const login = (userData: User, accessToken: string) => {
        console.log("🔐 login: Logging in user:", {
            name: userData.username,
            email: userData.email,
            role: userData.roles,
        });

        setUser(userData);
        setHasToken(true);
        httpClient.setAuthToken(accessToken);

        // Save user data to storage
        console.log("💾 login: Saving user data to storage...");
        userStorage
            .saveUser(userData)
            .then(() => {
                console.log("✅ login: User data saved successfully");
            })
            .catch((error) => {
                console.error("❌ login: Error saving user data:", error);
            });
    };

    const logout = async () => {
        try {
            await tokenStorage.clearTokens();
            await userStorage.clearUser();
            httpClient.removeAuthToken();
            setUser(null);
            setHasToken(false);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: hasToken,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
