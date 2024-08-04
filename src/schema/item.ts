import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    created: z.date(),
    modified: z.date(),
    user: z.string(),
    quantity: z.number(),
    extra: z.string(),
    pic: z.string(),
    shop: z.string(),
    in_cart: z.boolean(),
    purchased: z.boolean(),
});

export const ItemCreateSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    extra: z.string(),
    pic: z.string(),
    shop: z.string(),
});

export const ItemUpdateSchema = z.object({
    id: z.string(),
    data: ItemSchema.partial(),
});

export type Item = z.infer<typeof ItemSchema>;
