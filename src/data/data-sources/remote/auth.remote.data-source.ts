import { IHttpClient } from "@/src/core/http/http-client";
import { ZodError } from "zod";
import { AuthResponseModel, AuthTokensModel, LoginCredentialsModel } from "../../models/auth.model";
import { AuthResponseSchema } from "../../schemas/auth-model.schema";

export interface IAuthRemoteDataSource {
    login(credentials: LoginCredentialsModel): Promise<AuthResponseModel>;
    logout(): Promise<void>;
    refreshToken(refreshToken: string): Promise<AuthTokensModel>;
}

export class AuthRemoteDataSource implements IAuthRemoteDataSource {
    constructor(private httpClient: IHttpClient) { }

    async login(credentials: LoginCredentialsModel): Promise<AuthResponseModel> {
        try {
            const response = await this.httpClient.post<AuthResponseModel>(
                '/auth/login',
                credentials,
            );

            console.log("📥 Raw API Response:", JSON.stringify(response, null, 2));

            const validated = AuthResponseSchema.safeParse(response);

            if (!validated.success) {
                console.error("❌ Validation Error:", validated.error.issues);
                throw new Error(
                    "Invalid response from server: " +
                    JSON.stringify(validated.error.issues)
                );
            }

            return validated.data;
        } catch (error: any) {
            // Handle backend error response format
            if (error.data) {
                const errorData = error.data;

                // Check if it's our backend's error format
                if (errorData.success === false) {
                    // Extract error message from the response
                    let errorMessage = errorData.message || "Login failed";

                    // If there are specific field errors, use the general error
                    if (errorData.errors?.general) {
                        errorMessage = errorData.errors.general;
                    }

                    console.error("❌ Login Error:", errorMessage, errorData);
                    throw new Error(errorMessage);
                }
            }

            // Handle Zod validation errors
            if (error instanceof ZodError) {
                console.error("❌ Zod Error:", error.issues);
                throw new Error(
                    "Invalid response from server: " + JSON.stringify(error.issues)
                );
            }

            // Default error handling
            throw new Error(error.message || "Login failed");
        }
    }

    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }


    refreshToken(refreshToken: string): Promise<AuthTokensModel> {
        throw new Error("Method not implemented.");
    }
}