import * as z from 'zod';
import { AuthResponseSchema, LoginCredentialsSchema, UserSchema } from '../schemas/auth.schema';

export type AuthUser = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type AuthTokens = Pick<z.infer<typeof AuthResponseSchema>, 'accessToken' | 'refreshToken'>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;