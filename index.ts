
import { Role, TaskType } from "./generated/prisma/enums.ts";
import { TasksModel } from "./src/models/task.ts";
import { UsersModel } from "./src/models/user.ts";


const user = {
    name: "Mary",
    role: Role.ADMIN,
    email: "Mary@gmail.com",
    id: "",
    createdAt: new Date(),
    password: "1234"
}

//UserMode.create(user)
//UsersModel.getAll({})
//UsersModel.authUser({email:"Mary@gmail.com", password:"1234"})
//UsersModel.revokeToken({id:"53f967a3-fae1-436b-bdfc-62e81e237497"})

// TasksModel.create({
//     title: "Task 1",
//     type: TaskType.CLASSIFICATION,
//     instructions: "Instructions for Task 1",
//     userId: "53f967a3-fae1-436b-bdfc-62e81e237400"
// })

// await TasksModel.getAll({})
// await TasksModel.update({id:"83ca3a48-87c2-47d6-9e3f-b7d696a6fa94"},{type:"GENERATION"})
await TasksModel.getAll({})
//TasksModel.delete({id:"53f967a3-fae1-436b-bdfc-62e81e237497"})