import * as z from 'zod';

import { ProfileSchema, RoleSchema, ScopeSchema, UserResponseSchema, UserSchema } from "../schemas/user-model.schema";

export type UserResponseModel = z.infer<typeof UserResponseSchema>;
export type UserModel = z.infer<typeof UserSchema>;
export type UserRoleModel = z.infer<typeof RoleSchema>;
export type UserScopeModel = z.infer<typeof ScopeSchema>;
export type ProfileInputModel = z.infer<typeof ProfileSchema>;