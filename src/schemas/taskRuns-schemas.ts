import type { TaskRunModel } from "../../generated/prisma/models.ts"

export type TaskRunCreateInput = {
    input: Record<string,unknown>,
    startedAt: Date,
    userId: string,
    taskId: string
}

export type TaskRun = TaskRunModel

export type TaskUpdateRunInput = Pick<TaskRun,"status">
