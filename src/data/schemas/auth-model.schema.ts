import * as z from "zod";

/**
 * Zod Schema for Login Credentials
 */
export const LoginCredentialsSchema = z.object({
    "identifier": z.string(),
    "password": z.string(),
});

export const AuthUserSchema = z.object({
    "id": z.string(),
    "email": z.string(),
    "username": z.string(),
});

export const AuthDataSchema = z.object({
    "token": z.string(),
    "refresh_token": z.string(),
    "user": AuthUserSchema,
});

export const AuthResponseSchema = z.object({
    "success": z.boolean(),
    "data": AuthDataSchema,
    "message": z.string(),
});