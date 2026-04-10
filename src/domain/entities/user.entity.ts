import * as z from 'zod';
import { ProfileSchema, RoleSchema, ScopeSchema, UserResponseSchema, UserSchema } from "../schemas/user.schema";

export type ProfileInput = z.infer<typeof ProfileSchema>;
export type Scope = z.infer<typeof ScopeSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserRespnse = z.infer<typeof UserResponseSchema>;