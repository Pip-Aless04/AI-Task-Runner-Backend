import type { Role } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import type { CreateUserDto, UserFiltersDTO, UpdateUserDTO } from "./user.dto.ts";
import type { PublicUser } from "./user.schemas.ts";

export class UserRepository {

    static create = async (userDTO: CreateUserDto): Promise<PublicUser> =>{
        try {
            const newUser = await prisma.user.create({
                data: {
                    email: userDTO.email,
                    name: userDTO.name,
                    password: userDTO.passwordHash,
                    role: userDTO.role,
                    status: userDTO.status
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                },
            });

            return newUser

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user (Repository)");
        }
    }

    static getAll = async(filters: UserFiltersDTO): Promise<PublicUser[]> => {
        try {
            return await prisma.user.findMany({
                where: filters,
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
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users (Repository)");
        }
    }

    static update = async (id: string, data: UpdateUserDTO): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: { id },
                data
            });
            return true;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user (Repository)");
        }
    }

    static revokeToken = async (id: string): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: { id },
                data: { refreshToken: null }
            });
            return true;
        } catch (error) {
            console.error("Error revoking refresh token:", error);
            throw new Error("Failed to revoke refresh token (Repository)");
        }
    }

    static updatePassword = async (id:string, newPassword:string): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: {id},
                data:{
                    password: newPassword
                }
            });
            return true;
        } catch (error) {
            console.error("Error updating password", error)
            throw new Error("Failed to updated password (Repository)")
        }
    }

    static updateRole = async (id: string, newRole: Role): Promise<boolean> => {
        try {
            const updatedUser = await prisma.user.update({
                where: {id},
                data: {role: newRole},
            });
            return updatedUser.role === newRole;
        } catch (error) {
            console.error("Error updating role", error)
            throw new Error("Failed to update role (Repository)")
        }
    }

    static findByEmail = async (email: string): Promise<PublicUser | null> => {
        try {
            return await prisma.user.findUnique({
                where: { email },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user by email (Repository)");
        }
    }

    static inactivateUser = async (id: string): Promise<boolean> => {
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    status: "INACTIVE"
                }
            });
            return true;

        } catch (error) {
            console.error("Error inactivating the user")
            throw new Error("Failed to inactivate the user (Repository)")
        }
    }

}
