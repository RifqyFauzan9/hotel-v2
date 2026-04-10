import * as z from 'zod';
import { AuthDataSchema, AuthResponseSchema, AuthUserSchema, LoginCredentialsSchema } from '../schemas/auth-model.schema';

export type LoginCredentialsModel = z.infer<typeof LoginCredentialsSchema>;
export type AuthUserModel = z.infer<typeof AuthUserSchema>;
export type AuthTokensModel = z.infer<typeof AuthDataSchema>;
export type AuthResponseModel = z.infer<typeof AuthResponseSchema>;