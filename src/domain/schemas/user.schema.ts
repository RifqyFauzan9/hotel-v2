import * as z from "zod";

export const ProfileSchema = z.object({
    employeeId: z.string(),
    name: z.string(),
    phoneNumber: z.number(),
    gender: z.enum(["MALE", "FEMALE"]),
    birthDate: z.string(),
    address: z.string(),
    jobTitle: z.string(),
    joinDate: z.string(),
    employmentStatus: z.enum(["PERMANENT", "CONTRACT", "INTERN"]),
    emergencyContact: z.number(),
    bloodType: z.enum(["A", "B", "AB", "O"]),
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
    isActive: z.boolean(),
    avatarId: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    emailVerified: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    roles: z.array(RoleSchema),
    permissions: z.array(z.string()),
    profile: ProfileSchema,
});

export const UserResponseSchema = z.object({
    "success": z.boolean(),
    "data": UserSchema,
    "message": z.string(),
});