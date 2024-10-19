import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    phone: z
      .string()
      .max(15, "Phone number must be less than or equal to 15 characters"),

    gender: z.enum(["Male", "Female", "Other"], {
      message: "Gender must be one of Male, Female, Other",
    }),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"], // Specifies that the error relates to the confirmPassword field
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
      });
    }
  });
