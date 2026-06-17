import {pipe,string,trim,strictObject,email,minLength, type InferOutput, union, literal} from "valibot";
import type { UserModel } from "../../generated/prisma/models.ts";

export const UserRegisterSchema = strictObject({
    name: pipe(string(), trim(), minLength(2)),
    email: pipe(string(), trim(), email()),
    password: pipe(string(),minLength(8)),
});

export type UserRegisterInput = InferOutput<typeof UserRegisterSchema>;

export type User = UserModel;
export type PublicUser = Omit<User, "password" | "refreshToken">;

export const UserUpdateSchema = strictObject({
    email: pipe(string(), trim(), email()),
    name: pipe(string(), trim(), minLength(2)),
    status: union([literal("ACTIVE"), literal("INACTIVE")]),
});

export type UserUpdateInput = InferOutput<typeof UserUpdateSchema>;
