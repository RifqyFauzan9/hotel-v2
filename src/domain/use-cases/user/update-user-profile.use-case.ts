import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";
import { EditProfileInput } from "../../schemas/user.schema";

export class UpdateUserProfileUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: EditProfileInput): Promise<User> {
        return await this.userRepository.updateUserProfile(data);
    }
}