import * as z from "zod";

/**
 * Zod Schema for Login Credentials
 */
export const LoginCredentialsSchema = z.object({
    "identifier": z.string(),
    "password": z.string(),
});

export const UserSchema = z.object({
    "id": z.string(),
    "email": z.string(),
    "username": z.string(),
});

export const DataSchema = z.object({
    "user": UserSchema,
    "token": z.string(),
    "refresh_token": z.string(),
});

export const AuthResponseSchema = z.object({
    "success": z.boolean(),
    "data": DataSchema,
    "message": z.string(),
});

/**
 * Type inference from schemas
 */
export type LoginCredentialsInput = z.infer<typeof LoginCredentialsSchema>;