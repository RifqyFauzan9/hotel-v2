export interface AuthUser {
    id: string;
    email: string;
    username: string;
}

export interface AuthResponse {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export type AuthTokens = Pick<AuthResponse, "accessToken" | "refreshToken">;