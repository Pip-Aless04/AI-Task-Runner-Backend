import { encryptionPlugin } from "../../lib/bcrypt.ts";
import { prisma } from "../../lib/prisma.ts";
import type { User, UserAuthInput, UserCreateInput, UserUpdateInput } from "../schemas/index.ts";
import jwt from "jsonwebtoken";
import "dotenv/config"

export class UsersModel {

    static async create(user: UserCreateInput): Promise<{ newUser: User; message: string }> {
        try {
            const hashPassword = await encryptionPlugin.hash(user.password);
            const newUser = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: hashPassword,
                    role: user.role,
                    status: user.status,
                }
            });
            return { newUser, message: "New user created successfully" };
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    static async getAll(filters: Partial<User>): Promise<User[]> {
        try {
            return await prisma.user.findMany({
                where: filters
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users");
        }
    }

    static async authUser({ email, password }: UserAuthInput): Promise<{ user: Omit<User, "password">; message: string }> {
        try {
            const [userExist] = await this.getAll({ email });

            if (!userExist) throw new Error("User not found");
            if (userExist.status === "INACTIVE") throw new Error("User not active");

            const isValid = await encryptionPlugin.compare(password, userExist.password);
            if (!isValid) throw new Error("Invalid password");

            const refreshToken = jwt.sign(
                { id: userExist.id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );

            const { password: _, ...userWithoutPassword } = userExist;

            return {
                user: { ...userWithoutPassword, refreshToken },
                message: "User authenticated successfully"
            };
        } catch (error) {
            console.error("Error authenticating user:", error);
            throw error; // re-lanza porque los errores de negocio (user not found, invalid password) deben llegar al middleware
        }
    }

    static async update(id: string, data: UserUpdateInput): Promise<void> {
        try {
            await prisma.user.update({
                where: { id },
                data
            });
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    }

    static async revokeToken(id: string): Promise<void> {
        try {
            await prisma.user.update({
                where: { id },
                data: { refreshToken: null }
            });
        } catch (error) {
            console.error("Error revoking refresh token:", error);
            throw new Error("Failed to revoke refresh token");
        }
    }

    static async updatePassword(id:string, newPassword:string){
        try {
            const hashPassword = await encryptionPlugin.hash(newPassword);

            await prisma.user.update({
                where: {id},
                data:{
                    password: hashPassword
                }
            })
        } catch (error) {
            console.error("Error updating password", error)
            throw new Error("Failed to updated password")
        }
    }

}