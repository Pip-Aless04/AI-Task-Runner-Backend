import { prisma } from "../../../lib/prisma.ts";
import type { CompletedTaskDTO, CreateTaskRunDTO, FailedTaskDTO } from "./task-run.dto.ts";
import type { FinishedTask, TaskRun } from "./task-run.schemas.ts";

export class TaskRunRepository {

    static createTaskRun = async(taskRun: CreateTaskRunDTO): Promise<TaskRun> => {
        try {
            return await prisma.taskRun.create({
                data: {
                    task: {
                        connect: {
                            id: taskRun.taskId
                        }
                    },
                    user: {
                        connect: {
                            id: taskRun.userId
                        }
                    },
                    input: taskRun.input,
                    startedAt: taskRun.startedAt
                },
                select: {
                    id: true,
                    userId: true,
                    task: {
                        select:{
                            title: true
                        }
                    },
                    status: true,
                    input: true
                }
            })
        } catch (error) {
            console.error("Error creating task run:", error);
            throw new Error("Failed to register task run (Repository)");
        }
    }
    

    static completedTaskRun = async(id: string, completedTask: CompletedTaskDTO): Promise<FinishedTask> => {
        try {
            return await prisma.taskRun.update({
                where: { id },
                data: completedTask,
                select: {
                    id: true,
                    userId: true,
                    task: {
                        select:{
                            title: true
                        }
                    },
                    status: true,
                    input: true,
                    output: true,
                    error: true,
                    duration: true,
                    startedAt: true,
                    finishedAt: true
                }
            })
        } catch (error) {
            console.error("Error creating task run:", error);
            throw new Error("Failed to register task run (Repository)");
        }
    }

    static failedTaskRun = async(id: string, failedTask: FailedTaskDTO): Promise<FinishedTask> => {
        try {
            return await prisma.taskRun.update({
                where: { id },
                data: failedTask,
                select: {
                    id: true,
                    userId: true,
                    task: {
                        select:{
                            title: true
                        }
                    },
                    status: true,
                    input: true,
                    output: true,
                    error: true,
                    duration: true,
                    startedAt: true,
                    finishedAt: true
                }
            })
        } catch (error) {
            console.error("Error creating task run:", error);
            throw new Error("Failed to register task run (Repository)");
        }
    }

    static getTaskRun = async(taskRunId: string): Promise<any> => {
        // Implementation for getting a task run by ID
    }

    static updateTaskRun = async(taskRunId: string, taskRun: any): Promise<any> => {
        // Implementation for updating a task run
    }

}