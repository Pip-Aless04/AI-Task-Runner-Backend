import { object, picklist, pipe, string, uuid, type InferOutput } from "valibot";

export const TaskRunSchema = object({
    id: pipe(string(),uuid()),
    userId: pipe(string(),uuid()),
    task: object({
        title: pipe(string())
    }),
    status: pipe(picklist(["PENDING", "IN_PROGRESS", "COMPLETED","FAILED"])),
    input: pipe(string())
})

export type TaskRun = InferOutput<typeof TaskRunSchema>;

export type FinishedTask= TaskRun & {
    output: string | null
    error: string | null
    duration: number | null
    startedAt: Date | null
    finishedAt: Date | null
}