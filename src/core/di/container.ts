/**
 * Dependency Injection Container
 * Creates and manages all dependencies
 */

import { AuthRemoteDataSource } from "@/src/data/data-sources/remote/auth.remote.data-source";
import { AuthRepository } from "@/src/data/repositories/auth.repository.impl";
import { IAuthRepository } from "@/src/domain/repositories/auth.repository";
import { GetCurrentUserUseCase } from "@/src/domain/use-cases/auth/get-current-user.use-case";
import { LoginUseCase } from "@/src/domain/use-cases/auth/login.use-case";
import { httpClient } from "../http/http-client";
import { tokenStorage } from "../storage/token-storage";

class DIContainer {
    private static instance: DIContainer;

    private constructor() { }

    static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    // Repositories
    private _authRepository?: IAuthRepository;

    // Data Sources
    private _authRemoteDataSource?: AuthRemoteDataSource;

    // Auth Use Cases
    private _loginUseCase?: LoginUseCase;
    private _getCurrentUserUseCase?: GetCurrentUserUseCase;

    // Data Sources
    get authRemoteDataSource(): AuthRemoteDataSource {
        if (!this._authRemoteDataSource) {
            this._authRemoteDataSource = new AuthRemoteDataSource(httpClient);
        }

        return this._authRemoteDataSource;
    }


    // Repositories
    get authRepository(): IAuthRepository {
        if (!this._authRepository) {
            this._authRepository = new AuthRepository(
                this.authRemoteDataSource,
                tokenStorage,
            );
        }
        return this._authRepository;
    }

    // Use Cases - Auth
    get loginUseCase(): LoginUseCase {
        if (!this._loginUseCase) {
            this._loginUseCase = new LoginUseCase(this.authRepository);
        }

        return this._loginUseCase;
    }

    get getCurrentUserUseCase(): GetCurrentUserUseCase {
        if (!this._getCurrentUserUseCase) {
            this._getCurrentUserUseCase = new GetCurrentUserUseCase(this.authRepository);
        }

        return this._getCurrentUserUseCase;
    }

    // Reset for testing
    reset(): void {
        this._authRemoteDataSource = undefined;
        this._authRepository = undefined;
        this._loginUseCase = undefined;
    }
}

// Export singleton instance
export const di = DIContainer.getInstance();