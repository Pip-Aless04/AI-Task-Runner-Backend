
export type CreateTaskRunDTO = {
    taskId: string;
    userId: string;
    input: string;
    startedAt: Date;
}


export type CompletedTaskDTO = {
    staus: "COMPLETED";
    output: string;
    duration: number;
    finishedAt: Date;
}

export type FailedTaskDTO = {
    staus: "FAILED";
    error: string;
    duration: number;
    finishedAt: Date;
}