import type { Task } from "../../../generated/prisma/client.ts"
import type { TaskType } from "../../../generated/prisma/enums.ts"


export type CreateTaskDTO = {
    title: string,
    type: TaskType,
    instructions: string,
    userId: string,
}

export type TaskFiltersDTO = Partial<Task>