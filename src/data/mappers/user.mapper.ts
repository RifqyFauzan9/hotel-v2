import { User } from "@/src/domain/entities/user.entity";
import { UserModel } from "../models/user.model";

export class UserMapper {
    static toDomain(model: UserModel): User {
        return {
            id: model.id,
            username: model.username,
            email: model.email,
            roles: model.roles,
            avatarUrl: model.avatar_url,
            departement: model.departement,
            isActive: model.is_active,
            avatarId: model.avatar_id,
            emailVerified: model.email_verified,
            createdAt: model.created_at,
            updatedAt: model.updated_at,
            permissions: model.permissions,
            profile: model.profile,
        }
    }

    static toModel(entity: User): UserModel {
        return {
            id: entity.id,
            email: entity.email,
            username: entity.username,
            departement: entity.departement,
            is_active: entity.isActive,
            avatar_id: entity.avatarId,
            avatar_url: entity.avatarUrl,
            email_verified: entity.emailVerified,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
            roles: entity.roles,
            permissions: entity.permissions,
            profile: entity.profile,
        }
    }
}