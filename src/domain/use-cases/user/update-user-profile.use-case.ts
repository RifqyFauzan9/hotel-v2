import { ProfileInput, User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

export class UpdateUserProfileUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: ProfileInput): Promise<User> {
        return await this.userRepository.updateUserProfile(data);
    }
}