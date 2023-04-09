import z from "zod";

export const authBody = z.object({
  sessID: z.string().min(1),
});

authBody.parse;
