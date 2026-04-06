import { AuthResponse, AuthTokens, LoginCredentials } from "../entities/auth.entity";
import { User } from "../entities/user.entity";


export interface IAuthRepository {
    /**
     * Login with credentials
     */
    login(credentials: LoginCredentials): Promise<AuthResponse>;

    /**
     * Logout the current user
     */
    logout(): Promise<void>;

    /**
     * Refresh the access token
     */
    refreshToken(refreshToken: string): Promise<AuthTokens>;

    /**
     * Get the currently authenticated user
     */
    getCurrentUser(): Promise<User>;
}
