import type { TaskType } from "../../generated/prisma/client.ts";
import type { TaskModel } from "../../generated/prisma/models.ts";

export type TaskCreateInput = Pick<TaskModel, "title" | "instructions"> & {
    type: TaskType,
    userId: string
}
export type Task = TaskModel

export type TaskUpdateInput = Pick<Task, "status" | "title" | "type"|"instructions">
