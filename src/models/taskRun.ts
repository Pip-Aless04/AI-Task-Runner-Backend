import { prisma } from "../../lib/prisma.ts";
import type { TaskRun, TaskRunCreateInput, TaskUpdateRunInput } from "../schemas/index.ts";


export class TaskRuns {

    static async create(taskRun: TaskRunCreateInput): Promise<{ newTaskRun: TaskRun; message: string }> {
        try {
            const newTaskRun = await prisma.taskRun.create({
                data: {
                    input: taskRun.input,
                    startedAt: taskRun.startedAt,
                    user: {
                        connect: { id: taskRun.userId }
                    },
                    task: {
                        connect: { id: taskRun.taskId }
                    }
                }
            });
            return { newTaskRun, message: "New task run created successfully" };
        } catch (error) {
            console.error("Error creating task run:", error);
            throw new Error("Failed to create task run");
        }
    }


    static async getAll(filters: Partial<Omit<TaskRun,"input"|"output">>): Promise<TaskRun[]>{
        
        try{
            return await prisma.taskRun.findMany({
                where: filters
            })
        } catch(error){
            console.error("Error fetching task runs:", error);
            throw new Error("Failed to fetch task runs");
        }
    }

    static async update(id: string, data: TaskUpdateRunInput): Promise<boolean> {
        try {
            await prisma.taskRun.update({
                where: { id },
                data
            });
            return true
        } catch (error) {
            console.error("Error updating task run:", error);
            throw new Error("Failed to update task run");
        }
    }

}