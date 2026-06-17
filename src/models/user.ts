import type { Role } from "../../generated/prisma/enums.ts";
import { encryptionPlugin } from "../../lib/bcrypt.ts";
import { prisma } from "../../lib/prisma.ts";
import type { User, UserRegisterInput, PublicUser, UserUpdateInput } from "../schemas/index.ts";

export class UsersModel {

    create = async (user: UserRegisterInput): Promise<{ newUser: PublicUser; message: string }> => {
        try {
            const hashPassword = await encryptionPlugin.hash(user.password);
            const newUser = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: hashPassword,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return { newUser, message: "New user created successfully" };
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    getAll = async(filters: Partial<User>): Promise<User[]> => {
        try {
            return await prisma.user.findMany({
                where: filters
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users");
        }
    }

    update = async (id: string, data: Partial<UserUpdateInput>): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: { id },
                data
            });
            return true;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    }

    revokeToken = async (id: string): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: { id },
                data: { refreshToken: null }
            });
            return true;
        } catch (error) {
            console.error("Error revoking refresh token:", error);
            throw new Error("Failed to revoke refresh token");
        }
    }

    updatePassword = async (id:string, newPassword:string): Promise<boolean> => {
        try {
            const hashPassword = await encryptionPlugin.hash(newPassword);

            await prisma.user.update({
                where: {id},
                data:{
                    password: hashPassword
                }
            });
            return true;
        } catch (error) {
            console.error("Error updating password", error)
            throw new Error("Failed to updated password")
        }
    }

    updateRole = async (id: string, newRole: Role): Promise<boolean> => {
        try {
            const updatedUser = await prisma.user.update({
                where: {id},
                data: {role: newRole},
            });
            return updatedUser.role === newRole;
        } catch (error) {
            console.error("Error updating role", error)
            throw new Error("Failed to update role")
        }
    }



}