import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    timeAdded: z.date(),
    user: z.string(),
    quantity: z.number(),
    extra: z.string(),
    pic: z.string(),
    shop: z.string(),
});

export const ItemReqSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    extra: z.string(),
    pic: z.string(),

});

export type Item = z.infer<typeof ItemSchema>;
