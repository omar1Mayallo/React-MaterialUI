import * as z from "zod";
import useFormValidation from "../../../../../shared/hooks/useFormValidation";

// LOGIN SCHEMA OBJECT
const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .max(25, "Password cannot be longer than 25 characters"),
});

// LOGIN SCHEMA OBJECT TYPE
export type LoginFormData = z.infer<typeof loginSchema>;

// LOGIN FORM DATA HOOK
export default function useLoginFormData() {
  return useFormValidation<LoginFormData>(loginSchema);
}
