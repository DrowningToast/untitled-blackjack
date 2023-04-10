import z from "zod";

export const authBody = z.object({
  sessId: z.string().min(1),
});
