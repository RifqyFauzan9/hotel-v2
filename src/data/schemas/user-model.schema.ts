import * as z from "zod";

export const ProfileSchema = z.object({
    "employeeId": z.string(),
    "name": z.string(),
    "phone_number": z.string(),
    "gender": z.string(),
    "birth_date": z.coerce.date(),
    "address": z.string(),
    "job_title": z.string(),
    "join_date": z.coerce.date(),
    "employment_status": z.string(),
    "emergency_contact": z.string(),
    "blood_type": z.string(),
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
    "id": z.string(),
    "email": z.string(),
    "username": z.string(),
    "departement": z.string(),
    "is_active": z.boolean(),
    "avatar_id": z.string(),
    "avatar_url": z.string().nullable(),
    "email_verified": z.null(),
    "created_at": z.coerce.date(),
    "updated_at": z.coerce.date(),
    "roles": z.array(RoleSchema),
    "permissions": z.array(z.string()),
    "profile": ProfileSchema,
});

export const UserResponseSchema = z.object({
    "success": z.boolean(),
    "data": UserSchema,
    "message": z.string(),
});

export const EditProfileSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1, "Nama wajib diisi"),
    phone_number: z.number({ message: "Nomor telepon wajib diisi" }),
    gender: z.string().min(1, "Gender wajib diisi"),
    birth_date: z.string().datetime({ message: "Format tanggal tidak valid" }),
    address: z.string().min(1, "Alamat wajib diisi"),
    job_title: z.string().min(1, "Jabatan wajib diisi"),
    join_date: z.string().datetime({ message: "Format tanggal tidak valid" }),
    employment_status: z.string().min(1, "Status pekerjaan wajib diisi"),
    emergency_contact: z.number({ message: "Kontak darurat wajib diisi" }),
    blood_type: z.string().min(1, "Golongan darah wajib diisi"),
    picture: z.string().optional(),
});

export type UpdateCurrentUserModelInput = z.infer<typeof EditProfileSchema>;