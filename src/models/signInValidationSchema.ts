import { z } from "zod";

export const signInForm = z.object({
  email: z.string().email(),
});

export type SignInForm = z.infer<typeof signInForm>;
