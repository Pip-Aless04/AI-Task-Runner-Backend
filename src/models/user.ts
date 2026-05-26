import type { UserModel } from "../../generated/prisma/models.ts";
import { Bcrypt } from "../../lib/bcrypt.ts";
import { prisma } from "../../lib/prisma.ts";

export class UsersModel {

    static async create(user: UserModel): Promise<Object>{

        const {password} = user
        const hashPassword = await Bcrypt.hash(password)
        
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
                role: user.role,
                status: user.status,
            }
        })

        console.log("Created user:", newUser);

        return{
            newUser,
            message: "New user created succesfully"
        }
    }

    static async getAll(filters: Partial<UserModel>): Promise<UserModel[]|[]> {
        const users = await prisma.user.findMany({
            where: filters
        })
        console.log(users)
        return users
    }

    static async authUser({ email, password }: Pick<UserModel, "email" | "password">){
        const [userExist] = await this.getAll({email})

        if(!userExist) throw new Error("User not found")

        if(userExist.status === "INACTIVE") throw new Error("User is inactive")
        
        const isValid = await Bcrypt.compare(password, userExist.password) 

        if (!isValid) throw new Error("Invalid password")
        
        const userAuthenticated = {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            role: userExist.role,
            status: userExist.status,
            token:""
        }

        return{
            user: userAuthenticated,
            message: "User authenticated succesfully"
        }
    }

    static async revokeToken({ id }: Pick<UserModel, "id">):Promise<boolean>{
        await prisma.user.update({
            where: { id },
            data: { refreshToken: null }
        }).catch((error) => {
            console.error("Error revoking refreshToken:", error);
            throw new Error("Failed to revoke refreshToken");
        });

        return true
    }
    
}   