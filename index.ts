
import { ROLE } from "./generated/prisma/enums.ts";
import { UsersModel } from "./src/models/user.ts";


const user = {
    name: "Mary",
    role: ROLE.ADMIN,
    email: "Mary@gmail.com",
    id: "",
    createdAt: new Date(),
    password: "1234"
}

//UserMode.create(user)
UsersModel.getAll({email:"wdewef@gmail.com"})