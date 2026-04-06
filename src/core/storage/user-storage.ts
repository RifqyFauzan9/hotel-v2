import { User } from "@/src/domain/entities/user.entity";
import * as SecureStore from "expo-secure-store";

const USER_DATA_KEY = "auth_user_data";

export interface IUserStorage {
    saveUser(user: User): Promise<void>;
    getUser(): Promise<User | null>;
    clearUser(): Promise<void>;
}

export class UserStorage implements IUserStorage {
    async saveUser(user: User): Promise<void> {
        try {
            console.log("💾 UserStorage.saveUser: Saving user:", user);
            const userJson = JSON.stringify(user);
            console.log("💾 UserStorage.saveUser: JSON string:", userJson);
            await SecureStore.setItemAsync(USER_DATA_KEY, userJson);
            console.log("✅ UserStorage.saveUser: Successfully saved to SecureStore");
        } catch (error) {
            console.error("❌ UserStorage.saveUser: Error saving user data:", error);
            throw new Error("Failed to save user data");
        }
    }

    async getUser(): Promise<User | null> {
        try {
            console.log("📖 UserStorage.getUser: Reading from SecureStore...");
            const userJson = await SecureStore.getItemAsync(USER_DATA_KEY);
            console.log("📖 UserStorage.getUser: Retrieved JSON:", userJson);

            if (!userJson) {
                console.log("⚠️ UserStorage.getUser: No user data found");
                return null;
            }

            const user = JSON.parse(userJson) as User;
            console.log("✅ UserStorage.getUser: Parsed user:", user);
            return user;
        } catch (error) {
            console.error("❌ UserStorage.getUser: Error getting user data:", error);
            return null;
        }
    }

    async clearUser(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(USER_DATA_KEY);
        } catch (error) {
            console.error("Error clearing user data:", error);
            throw new Error("Failed to clear user data");
        }
    }
}

export const userStorage = new UserStorage();
