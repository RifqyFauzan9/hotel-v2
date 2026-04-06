import { User } from "../../entities/user.entity";
import { IAuthRepository } from "../../repositories/auth.repository";

export class GetCurrentUserUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(): Promise<User> {
        return await this.authRepository.getCurrentUser();
    }
}