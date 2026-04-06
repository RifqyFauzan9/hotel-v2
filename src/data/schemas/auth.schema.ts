import * as z from "zod";

export const UserSchema = z.object({
    "id": z.string(),
    "email": z.string(),
    "username": z.string(),
});

export const DataSchema = z.object({
    "token": z.string(),
    "refresh_token": z.string(),
    "user": UserSchema,
});

export const AuthResponseSchema = z.object({
    "success": z.boolean(),
    "data": DataSchema,
    "message": z.string(),
});