import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    ip: z.optional(z.string().ip()),
});

export const UserUpdateSchema = z.object({
    data: UserSchema.partial(),
});

export type User = z.infer<typeof UserSchema>;
