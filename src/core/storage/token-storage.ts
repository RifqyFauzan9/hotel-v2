import { AuthTokens } from '@/src/domain/entities/auth.entity';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

export interface ITokenStorage {
    saveTokens(tokens: AuthTokens): Promise<void>;
    getTokens(): Promise<AuthTokens | null>;
    clearTokens(): Promise<void>;
    getAccessToken(): Promise<string | null>;
    getRefreshToken(): Promise<string | null>;
}

export class TokenStorage implements ITokenStorage {
    async saveTokens(tokens: AuthTokens): Promise<void> {
        try {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
        } catch (error) {
            console.error("Error saving tokens:", error);
            throw new Error("Failed to save authentication tokens");
        }
    }

    async getTokens(): Promise<AuthTokens | null> {
        try {
            const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

            if (!accessToken || !refreshToken) {
                return null;
            }

            return { accessToken, refreshToken };
        } catch (error) {
            console.error("Error getting tokens:", error);
            return null;
        }
    }

    async clearTokens(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error("Error clearing tokens:", error);
            throw new Error("Failed to clear authentication tokens");
        }
    }

    async getAccessToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        } catch (error) {
            console.error("Error getting access token:", error);
            return null;
        }
    }

    async getRefreshToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error("Error getting refresh token:", error);
            return null;
        }
    }
}

export const tokenStorage = new TokenStorage();