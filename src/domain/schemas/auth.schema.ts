import { z } from "zod";

/**
 * Zod Schema for Login Credentials
 */
export const LoginCredentialsSchema = z.object({
    identifier: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long"),
});

export const UserSchema = z.object({
    "id": z.string(),
    "email": z.string(),
    "username": z.string(),
});


export const AuthResponseSchema = z.object({
    "accessToken": z.string(),
    "refreshToken": z.string(),
    "user": UserSchema,
});