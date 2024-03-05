import { z } from "zod";

export const socailMediaSchema = z.object({
  $id: z.string().optional(),
  value: z.string().min(4).max(50),
  href: z.string().min(4).max(50),
});


export type socialMediaType = z.infer<typeof socailMediaSchema>;
