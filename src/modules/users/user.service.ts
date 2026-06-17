import type { Role } from "../../../generated/prisma/client.ts";
import { encryptionPlugin } from "../../../lib/bcrypt.ts";
import type { RegisterUserDto, UpdateUserDTO, UserFiltersDTO } from "./user.dto.ts";
import { UserRepository } from "./user.repository.ts";
import type { PublicUser } from "./user.schemas.ts";

export class UserService {

    static create = async (user: RegisterUserDto) => {
        const {password, confirmPassword} = user

        if (password !== confirmPassword){
            console.error("The passwords do not mathc")
            throw new Error("The confirm password must be the same as the password")
        }

        const passwordHash = await encryptionPlugin.hash(password)

        try {
            return await UserRepository.create({
                email: user.email,
                name: user.name,
                passwordHash,
                role: user.role,
                status: user.status
            })

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user (Service)");
        }

    }

    static getAll = async (filters: UserFiltersDTO): Promise<PublicUser[]> => {
        try {
            return await UserRepository.getAll(filters)
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users (Service)");
        }
    }

    static update = async (id: string, userInfo: UpdateUserDTO) => {
        try {
            return UserRepository.update(id, userInfo)
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user (Service)");
        }
    }

    //REVISAR DESPUES 
    static revokeToken = async (id: string) => {
        try {
            return UserRepository.revokeToken(id)

        } catch (error) {
            console.error("Error revoking user token:", error);
            throw new Error("Failed to revoke user token (Service)");
        }
    }

    static updatePasswor = async (id: string, password: string) => {
        try {
            const passwordHash = await encryptionPlugin.hash(password)
            return await UserRepository.updatePassword(id, passwordHash)
        } catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Failed to update password (Service)");
        }
    }

    static updateRole = async (id: string, newRole: Role) => {
        try {
            return await UserRepository.updateRole(id, newRole)
        } catch (error) {
            console.error("Error updating role:", error);
            throw new Error("Failed to update role (Service)");
        }
    }

    static findByEmail = async (email: string) => {
        try {
            return await UserRepository.findByEmail(email)
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("Failed to fetch user (Service)");
        }
    }

    static inactivateUser = async (id: string) => {
        try {
            return await UserRepository.inactivateUser(id)
        } catch (error) {
            console.error("Error inactivating the user")
            throw new Error("Failed to inactivate the user (Service)")
        }
    }

}