import { User } from "@/src/domain/entities/user.entity";
import { IUserRepository } from "@/src/domain/repositories/user.repository";
import { EditProfileInput } from "@/src/domain/schemas/user.schema";
import { IUserRemoteDataSource } from "../data-sources/remote/user.remote.data-source";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepository implements IUserRepository {
    constructor(private remoteDataSource: IUserRemoteDataSource) { }

    async getCurrentUser(): Promise<User> {
        const userModel = await this.remoteDataSource.getCurrentUser();
        return UserMapper.toDomain(userModel);
    }

    async updateUserProfile(data: EditProfileInput): Promise<User> {
        const userModel = await this.remoteDataSource.updateCurrentUser(data);
        return UserMapper.toDomain(userModel);
    }
}