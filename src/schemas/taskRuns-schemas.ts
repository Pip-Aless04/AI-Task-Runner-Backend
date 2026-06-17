import type { TaskRunModel } from "../../generated/prisma/models.ts"
import { Prisma } from "../../generated/prisma/client.ts";

export type TaskRunCreateInput = {
    input: Prisma.InputJsonValue,
    startedAt: Date,
    userId: string,
    taskId: string
}

export type TaskRun = TaskRunModel

export type TaskUpdateRunInput = Pick<TaskRun,"status">
