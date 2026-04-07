/**
 * Dependency Injection Container
 * Creates and manages all dependencies
 */

import { AuthRemoteDataSource } from "@/src/data/data-sources/remote/auth.remote.data-source";
import { InspectionOrderRemoteDataSource } from "@/src/data/data-sources/remote/inspection-order.remote.data-source";
import { AuthRepository } from "@/src/data/repositories/auth.repository.impl";
import { InspectionOrderRepository } from "@/src/data/repositories/inspection-order.repository.impl";
import { IAuthRepository } from "@/src/domain/repositories/auth.repository";
import { IInspectionOrderRepository } from "@/src/domain/repositories/inspection-order.repository";
import { GetCurrentUserUseCase } from "@/src/domain/use-cases/auth/get-current-user.use-case";
import { LoginUseCase } from "@/src/domain/use-cases/auth/login.use-case";
import { GetInspectionOrderByIdUseCase } from "@/src/domain/use-cases/inspection-orders/get-inspection-order-by-id.use-case";
import { GetInspectionOrdersUseCase } from "@/src/domain/use-cases/inspection-orders/get-inspection-orders.use-case";
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
    private _inspectionOrderRepository?: IInspectionOrderRepository;

    // Data Sources
    private _authRemoteDataSource?: AuthRemoteDataSource;
    private _inspectionOrderRemoteDataSource?: InspectionOrderRemoteDataSource;

    // Auth Use Cases
    private _loginUseCase?: LoginUseCase;
    private _getCurrentUserUseCase?: GetCurrentUserUseCase;

    // Inspection Order Use Cases
    private _getInspectionOrdersUseCase?: GetInspectionOrdersUseCase;
    private _getInspectionOrderByIdUseCase?: GetInspectionOrderByIdUseCase;

    // Data Sources
    get authRemoteDataSource(): AuthRemoteDataSource {
        if (!this._authRemoteDataSource) {
            this._authRemoteDataSource = new AuthRemoteDataSource(httpClient);
        }

        return this._authRemoteDataSource;
    }

    get inspectionOrderRemoteDataSource(): InspectionOrderRemoteDataSource {
        if (!this._inspectionOrderRemoteDataSource) {
            this._inspectionOrderRemoteDataSource = new InspectionOrderRemoteDataSource(httpClient);
        }

        return this._inspectionOrderRemoteDataSource;
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

    get inspectionOrderRepository(): IInspectionOrderRepository {
        if (!this._inspectionOrderRepository) {
            this._inspectionOrderRepository = new InspectionOrderRepository(this.inspectionOrderRemoteDataSource);
        }

        return this._inspectionOrderRepository;
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

    get getInspectionOrdersUseCase(): GetInspectionOrdersUseCase {
        if (!this._getInspectionOrdersUseCase) {
            this._getInspectionOrdersUseCase = new GetInspectionOrdersUseCase(this.inspectionOrderRepository);
        }

        return this._getInspectionOrdersUseCase;
    }

    get getInspectionOrderByIdUseCase(): GetInspectionOrderByIdUseCase {
        if (!this._getInspectionOrderByIdUseCase) {
            this._getInspectionOrderByIdUseCase = new GetInspectionOrderByIdUseCase(this.inspectionOrderRepository);
        }
        return this._getInspectionOrderByIdUseCase;
    }

    // Reset for testing
    reset(): void {
        this._authRemoteDataSource = undefined;
        this._authRepository = undefined;
        this._loginUseCase = undefined;
        this._getCurrentUserUseCase = undefined;
        this._inspectionOrderRemoteDataSource = undefined;
        this._inspectionOrderRepository = undefined;
        this._getInspectionOrdersUseCase = undefined;
        this._getInspectionOrderByIdUseCase = undefined;
    }
}

// Export singleton instance
export const di = DIContainer.getInstance();