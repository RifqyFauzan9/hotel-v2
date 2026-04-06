
import { LoginCredentialsSchema } from "@/src/data/schemas/auth.schema";
import { ZodError } from "zod";
import { AuthResponse, LoginCredentials } from "../../entities/auth.entity";
import { IAuthRepository } from "../../repositories/auth.repository";

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            // Validate and sanitized input with zod
            const validatedCredentials = LoginCredentialsSchema.parse(credentials);
            return await this.authRepository.login(validatedCredentials);
        } catch (error) {
            if (error instanceof ZodError) {
                // Return first validation error message
                const firstError = error.issues[0];
                throw new Error(firstError.message);
            }
            throw error;
        }
    }
}