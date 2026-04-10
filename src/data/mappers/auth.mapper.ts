import { AuthResponse, AuthUser } from "@/src/domain/entities/auth.entity";
import { AuthResponseModel, AuthUserModel } from "../models/auth.model";


export class AuthUserMapper {
    static toDomain(model: AuthUserModel): AuthUser {
        return {
            id: model.id,
            email: model.email,
            username: model.username,
        }
    }

    static toModel(entity: AuthUser): AuthUserModel {
        return {
            id: entity.id,
            email: entity.email,
            username: entity.username,
        }
    }
}

export class AuthMapper {
    static toDomain(model: AuthResponseModel): AuthResponse {
        console.log(
            "🔄 AuthMapper.toDomain called with:",
            JSON.stringify(model, null, 2),
        );

        if (!model?.data) {
            console.error("❌ AuthMapper: model.data is missing");
            throw new Error("Invalid auth response: missing data object");
        }

        if (!model.data.user) {
            console.error("❌ AuthMapper: model.data.user is missing");
            throw new Error("Invalid auth response: missing user object");
        }

        if (!model.data.token) {
            console.error("❌ AuthMapper: model.data.token is missing");
            throw new Error("Invalid auth response: missing token");
        }

        if (!model.data.refresh_token) {
            console.error("❌ AuthMapper: model.data.refresh_token is missing");
            throw new Error("Invalid auth response: missing refresh token");
        }

        return {
            user: AuthUserMapper.toDomain(model.data.user),
            accessToken: model.data.token,
            refreshToken: model.data.refresh_token,
        };
    }
}