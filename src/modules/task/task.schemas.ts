import { date, object, picklist, pipe, string, uuid, type InferInput, type InferOutput } from "valibot";

const taskSchema = object({
    id: pipe(string(), uuid()),
    title: pipe(string()),
    type: pipe(picklist(["CLASSIFICATION", "GENERATION", "EXTRACTION", "SUMMARIZATION"])),
    instructions: pipe(string()),
    status: pipe(picklist(["ACTIVE", "INACTIVE"])),
    userId: pipe(string(), uuid()),
    createdAt: pipe(date()),
    updatedAt: pipe(date())
})

export type Task = InferOutput<typeof taskSchema>;