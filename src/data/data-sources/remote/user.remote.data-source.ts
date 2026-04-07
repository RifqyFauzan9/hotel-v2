import { IHttpClient } from "@/src/core/http/http-client";
import { ZodError } from "zod";
import { UserModel, UserResponseModel } from "../../models/user.model";
import { UpdateCurrentUserModelInput, UserResponseSchema } from "../../schemas/user-model.schema";

export interface IUserRemoteDataSource {
    getCurrentUser(): Promise<UserModel>;
    updateCurrentUser(data: UpdateCurrentUserModelInput): Promise<UserModel>;
}

export class UserRemoteDataSource implements IUserRemoteDataSource {
    constructor(private httpClient: IHttpClient) { }

    async getCurrentUser(): Promise<UserModel> {
        try {
            const response = await this.httpClient.get<UserResponseModel>("/users/me");

            // Validated API response
            const validated = UserResponseSchema.parse(response);
            return validated.data;
        } catch (error: any) {
            if (error instanceof ZodError) {
                throw new Error("Invalid response from server");
            }
            throw new Error(error.message || "Failed to fetch user");
        }
    }

    async updateCurrentUser(data: UpdateCurrentUserModelInput): Promise<UserModel> {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'picture' && value) {
                    formData.append('picture', {
                        uri: value,
                        type: 'image/jpeg',
                        name: 'profile.jpg'
                    } as any)
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            const response = await this.httpClient.patch<UserResponseModel>("/users/me", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Validate API response
            const validated = UserResponseSchema.parse(response);
            return validated.data;
        } catch (error: any) {
            if (error instanceof ZodError) {
                console.error("Zod issues:", JSON.stringify(error.issues, null, 2));
                throw new Error("Invalid response from server");
            }
            throw new Error(error.message || "Failed to patch user");
        }
    }
}