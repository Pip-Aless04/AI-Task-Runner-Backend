import { date, email, minLength, nonEmpty, object, picklist, pipe, string, uuid, type InferOutput } from "valibot";


const emailSchema = pipe(string(), nonEmpty("Email is required"), email("Invalid email"));
const passwordSchema = pipe(string(), nonEmpty("Password is required"), minLength(8, "Password must be at least 8 characters"));
const nameSchema = pipe(string(), nonEmpty("Name is required"))

export type emailType = InferOutput<typeof emailSchema>

// Login: solo email + password
export const loginUserSchema = object({
    email: emailSchema,
    password: passwordSchema,
});

// Register: extiende login + name + confirmPassword
export const registerUserSchema = object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

const publicUser = object({
    id: pipe(string(), uuid("The ID must be a valid UUID"), nonEmpty("ID is required")),
    name: nameSchema,
    email: emailSchema,
    role: pipe(picklist(["ADMIN", "USER"],"Invalid role, only ADMIN or USER are allowed"), nonEmpty("Role is required")),
    status: pipe(picklist(["ACTIVE", "INACTIVE"], "Invalid status, only ACTIVE or INACTIVE are allowed"), nonEmpty("Status is required")),
    createdAt: pipe(date()),
    updatedAt: pipe(date())
});

export type LoginUser = InferOutput<typeof loginUserSchema>;
export type RegisterUser = InferOutput<typeof registerUserSchema>;
export type PublicUser = InferOutput<typeof publicUser>;
