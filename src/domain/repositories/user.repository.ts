import { ProfileInput, User } from "../entities/user.entity";



export interface IUserRepository {
    /**
     * Get the currently authenticated user
     */
    getCurrentUser(): Promise<User>;

    /**
     * Update the currently authenticated user profile
     */
    updateUserProfile(data: ProfileInput): Promise<User>;

    /**
     * Get profile data of the currently authenticated user
     */
    getCurrentUserProfile(): Promise<ProfileInput>;
}
