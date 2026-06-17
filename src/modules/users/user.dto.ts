import type { Role, User, UserStatus } from "../../../generated/prisma/client.ts";

export type RegisterUserDto = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: Role
    status?: UserStatus
};

export type CreateUserDto = Omit<RegisterUserDto, "password"| "confirmPassword"> & {
    passwordHash: string
}

export type UserFiltersDTO = Partial<Omit<User,"password" | "refreshToken">>

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    role?: Role;
    status?: UserStatus;
}
