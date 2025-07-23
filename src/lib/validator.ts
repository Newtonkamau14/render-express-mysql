import { z } from "zod";

export const bodyValidator = z.object({
  body: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.email(),
    password: z
      .string("Password is required")
      .min(3, "Password cannot be less than 3 characters long"),
  }),
});

export const paramsValidator = z.object({
  params: z.object({
    id: z.coerce.number("Invalid id!"),
  }),
});

export const queryStringValidator = z.object({
  query: z.object({}),
});
