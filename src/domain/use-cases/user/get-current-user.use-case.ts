

import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

export class GetCurrentUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(): Promise<User> {
        return await this.userRepository.getCurrentUser();
    }
}