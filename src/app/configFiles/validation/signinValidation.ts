import { z } from "zod";
export const signInInfoSchema: any = z.object({
  email: z.string().email({ message: "An email is required." }),

  password: z.string(),

  //isVerified: z.boolean().optional()
});
