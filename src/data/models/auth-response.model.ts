export interface AuthResponseModel {
    success: boolean;
    data: Data;
    message: string;
}

export interface Data {
    token: string;
    refresh_token: string;
    user: AuthUserModel;
}

export interface AuthUserModel {
    id: string;
    email: string;
    username: string;
}

export interface LoginCredentialsModel {
    identifier: string;
    password: string;
}

export type AuthTokensModel = Pick<Data, "token" | "refresh_token">;