import z from "zod";

export const actionHandlers: string[] = ["debug"];

export const eventBody = (args: z.ZodObject<any>) =>
  z.object({
    action: z.enum(["$connect", "$disconnect", "broadcast"]),
    handler: z.enum(["debug"]),
  });

export const bodyValidator = (args: z.ZodObject<any>) =>
  z.object({
    action: z.enum(["$connect", "$disconnect", "broadcast"]),
    handler: z.enum(["debug"]),
  });
