import { User } from "../entities/user.entity";
import { EditProfileInput } from "../schemas/user.schema";


export interface IUserRepository {
    /**
     * Get the currently authenticated user
     */
    getCurrentUser(): Promise<User>;

    /**
     * Update the currently authenticated user profile
     */
    updateUserProfile(data: EditProfileInput): Promise<User>;
}
