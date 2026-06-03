import type { Prisma } from "../../generated/prisma/client.ts";
import type { UserModel } from "../../generated/prisma/models.ts";

export type UserCreateInput = Pick<Prisma.UserCreateInput, "email" | "name" | "password" | "role" | "status">


export type User = UserModel

export type UserAuthInput = Pick<User, "email" | "password">

export type UserUpdateInput = Pick<User, "email" | "name"|"role"|"status">
