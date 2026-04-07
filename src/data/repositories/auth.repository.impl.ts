import { ITokenStorage } from "@/src/core/storage/token-storage";
import { AuthResponse, AuthTokens, LoginCredentials } from "@/src/domain/entities/auth.entity";
import { IAuthRepository } from "@/src/domain/repositories/auth.repository";
import { IAuthRemoteDataSource } from "../data-sources/remote/auth.remote.data-source";
import { AuthMapper } from "../mappers/auth.mapper";

export class AuthRepository implements IAuthRepository {
    constructor(
        private remoteDataSource: IAuthRemoteDataSource,
        private tokenStorage: ITokenStorage
    ) { }
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const credentialsModel = {
            identifier: credentials.identifier,
            password: credentials.password,
        }

        const response = await this.remoteDataSource.login(credentialsModel);
        const authResponse = AuthMapper.toDomain(response);

        // Save tokens to storage
        await this.tokenStorage.saveTokens(
            { accessToken: authResponse.accessToken, refreshToken: authResponse.refreshToken }
        );

        return authResponse;
    }

    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    refreshToken(refreshToken: string): Promise<AuthTokens> {
        throw new Error("Method not implemented.");
    }
}