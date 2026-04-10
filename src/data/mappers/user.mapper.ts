import { ProfileInput, User } from "@/src/domain/entities/user.entity";
import { ProfileInputModel, UserModel } from "../models/user.model";

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
            profile: this.toProfileDomain(model.profile),
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
            profile: this.toProfileModel(entity.profile),
        }
    }

    static toProfileModel(entity: ProfileInput): ProfileInputModel {
        return {
            employeeId: entity.employeeId,
            name: entity.name,
            phone_number: String(entity.phoneNumber),
            gender: entity.gender,
            birth_date: entity.birthDate,
            address: entity.address,
            job_title: entity.jobTitle,
            join_date: entity.joinDate,
            employment_status: entity.employmentStatus,
            emergency_contact: String(entity.emergencyContact),
            blood_type: entity.bloodType,
            picture: entity.picture ?? undefined,
        };
    }

    static toProfileDomain(model: ProfileInputModel): ProfileInput {
        return {
            employeeId: model.employeeId,
            name: model.name,
            phoneNumber: Number(model.phone_number),
            gender: model.gender,
            birthDate: model.birth_date,
            address: model.address,
            jobTitle: model.job_title,
            joinDate: model.join_date,
            employmentStatus: model.employment_status,
            emergencyContact: Number(model.emergency_contact),
            bloodType: model.blood_type,
        };
    }
}