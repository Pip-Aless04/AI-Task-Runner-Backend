
import { prisma } from "../../../lib/prisma.ts";
import type { CreateTaskDTO, TaskFiltersDTO, UpdateTaskDTO } from "./task.dto.ts";
import type { Task } from "./task.schemas.ts";

export class TaskRepository {
    static create = async (task: CreateTaskDTO): Promise<Task> => {
        try {
            return await prisma.task.create({
                data:{
                    title: task.title,
                    type: task.type,
                    instructions: task.instructions,
                    user: {
                        connect: {id: task.userId}
                    }
                },
                select:{
                    id: true,
                    title: true,
                    type: true,
                    instructions: true,
                    status: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task (Repository)");
        }
    }

    static getAll = async (filters: TaskFiltersDTO): Promise<Task[]> => {
        try {
            return await prisma.task.findMany({
                where: filters,
                select: {
                    id: true,
                    title: true,
                    type: true,
                    instructions: true,
                    userId: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks (Repository)");
        }
    }

    static update = async (id: string, task: UpdateTaskDTO): Promise<Task> => {
        try {
            return await prisma.task.update({
                where: { id },
                data: task,
                select: {
                    id: true,
                    title: true,
                    type: true,
                    instructions: true,
                    userId: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task (Repository)");
        }
    }


    static incativateTask = async (id: string): Promise<boolean> => {
        try {
            await prisma.task.update({
                where: { id },
                data: { status: "INACTIVE" }
            })

            return true;

        } catch (error) {
            console.error("Error deactivating task:", error);
            throw new Error("Failed to deactivate task (Repository)");
        }
    }

}