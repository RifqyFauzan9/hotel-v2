import * as z from "zod";


export const LoginCredentialsSchemaSchema = z.object({
    "identifier": z.string(),
    "password": z.string(),
});

export type LoginCredentialsInput = z.infer<typeof LoginCredentialsSchemaSchema>;
