
import { ProfileInput } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

export class GetCurrentUserProfileUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(): Promise<ProfileInput> {
        return await this.userRepository.getCurrentUserProfile();
    }
}