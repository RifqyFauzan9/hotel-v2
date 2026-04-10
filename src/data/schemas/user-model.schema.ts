import * as z from "zod";

export const ProfileSchema = z.object({
    employeeId: z.string(),
    name: z.string(),
    phone_number: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
    birth_date: z.string(),
    address: z.string(),
    job_title: z.string(),
    join_date: z.string(),
    employment_status: z.enum(["PERMANENT", "CONTRACT", "INTERN"]),
    emergency_contact: z.string(),
    blood_type: z.enum(["A", "B", "AB", "O"]),
    picture: z.string().optional(),
});

export const ScopeSchema = z.object({
    "type": z.string(),
    "value": z.string(),
});

export const RoleSchema = z.object({
    "id": z.string(),
    "name": z.string(),
    "description": z.string(),
    "scope": ScopeSchema,
});

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string(),
    departement: z.string(),
    is_active: z.boolean(),
    avatar_id: z.string().nullable(),
    avatar_url: z.string().nullable(),
    email_verified: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    roles: z.array(RoleSchema),
    permissions: z.array(z.string()),
    profile: ProfileSchema,
});

export const UserResponseSchema = z.object({
    "success": z.boolean(),
    "data": UserSchema,
    "message": z.string(),
});