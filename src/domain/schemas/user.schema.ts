import * as z from "zod";

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

export type EditProfileInput = z.infer<typeof EditProfileSchema>;