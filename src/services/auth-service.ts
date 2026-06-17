import { encryptionPlugin } from "../../lib/bcrypt.ts";
import { UsersModel } from "../models/user.ts";
import type { PublicUser, UserAuthInput } from "../schemas/index.ts";


export class AuthService {

    constructor(private usersModel: UsersModel) {
        this.usersModel = usersModel;
    }

    authUser = async ({ email, password }: UserAuthInput): Promise<{ user: PublicUser; message: string }> => {
        try {
            const [userExist] = await this.usersModel.getAll({ email });

            if (!userExist) throw new Error("User not found");
            if (userExist.status === "INACTIVE") throw new Error("User not active");

            const isValid = await encryptionPlugin.compare(password, userExist.password);
            if (!isValid) throw new Error("Invalid password");

            const { password: _password, refreshToken: _refreshToken, ...publicUser } = userExist;

            return {
                user: { ...publicUser },
                message: "User authenticated successfully"
            };
        } catch (error) {
            console.error("Error authenticating user:", error);
            throw error; // re-lanza porque los errores de negocio (user not found, invalid password) deben llegar al middleware
        }
    }


}