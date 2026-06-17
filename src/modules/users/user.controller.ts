import { UserService } from "./user.service.ts";


export class UserController {

    static getAll = async (): Promise<any> => {
        return await UserService.getAll();
    }

    create = async() => {
        
    }

}