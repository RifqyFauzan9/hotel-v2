import { ProfileInput, User } from "@/src/domain/entities/user.entity";
import { IUserRepository } from "@/src/domain/repositories/user.repository";
import { IUserRemoteDataSource } from "../data-sources/remote/user.remote.data-source";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepository implements IUserRepository {
    constructor(private remoteDataSource: IUserRemoteDataSource) { }

    async getCurrentUser(): Promise<User> {
        const userModel = await this.remoteDataSource.getCurrentUser();
        return UserMapper.toDomain(userModel);
    }

    async updateUserProfile(data: ProfileInput): Promise<User> {
        const payload = UserMapper.toProfileModel(data);
        const userModel = await this.remoteDataSource.updateCurrentUser(payload);
        return UserMapper.toDomain(userModel);
    }

    async getCurrentUserProfile(): Promise<ProfileInput> {
        const user = await this.getCurrentUser();
        return user.profile;
    }

}