import { z } from "zod";

export const Purchase = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  product: z.string(),
  productname: z.string(),
  price: z.number(),
  country: z.enum([
    "United_States",
    "Canada",
    "United_Kingdom",
    "Australia",
    "Philippines",
    "Other",
  ]),
});
