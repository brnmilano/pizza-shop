import { z } from "zod";

export const storeProfile = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

export type StoreProfile = z.infer<typeof storeProfile>;
