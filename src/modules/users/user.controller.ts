import type { RegisterUserDto } from "./user.dto.ts";
import { UserService } from "./user.service.ts";


export class UserController {

    static create = async(user: RegisterUserDto) => {
        return await UserService.getAll( user )
    }

    

}