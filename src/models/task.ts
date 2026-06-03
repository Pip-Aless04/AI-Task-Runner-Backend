
import { prisma } from "../../lib/prisma.ts";
import type { TaskCreateInput, Task, TaskUpdateInput } from "../schemas/index.ts";

export class TasksModel {

    static async create(task: TaskCreateInput): Promise<{ newTask: Task; message: string }> {
        try {
            const newTask = await prisma.task.create({
                data: {
                    title: task.title,
                    type: task.type,
                    instructions: task.instructions,
                    user: {
                        connect: { id: task.userId }
                    }
                }
            });
            return { newTask, message: "New task created successfully" };
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        }
    }

    static async getAll(filters: Partial<Task>): Promise<Task[]> {
        try {
            return await prisma.task.findMany({
                where: filters
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks");
        }
    }

    static async update(id: string, updateData: TaskUpdateInput): Promise<boolean> {
        try {
            await prisma.task.update({
                where: { id },
                data: updateData
            });
            return true;
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task");
        }
    }

}