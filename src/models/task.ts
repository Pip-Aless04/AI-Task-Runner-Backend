import type { TaskModel } from "../../generated/prisma/models.ts";
import { prisma } from "../../lib/prisma.ts";
``

export class TasksModel {

    static async create(task: TaskModel): Promise<Object>{
        
        const newTask = await prisma.task.create({
            data:{
                title: task.title,
                type: task.type,
                instructions: task.instructions,
                status: task.status,
                userId: task.userId,
            }
        })

        console.log("Created tasks:")

        return {
            newTask,
            message: "New task created succesfully"
        }
    }


}