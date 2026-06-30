import type { CreateTaskDTO, TaskFiltersDTO, UpdateTaskDTO } from "./task.dto.ts";
import { TaskRepository } from "./task.repository.ts";
import type { Task } from "./task.schemas.ts";

export class TaskService {
    static create = async (task: CreateTaskDTO): Promise<Task> => {
        try {
            return await TaskRepository.create(task);
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task (Service)");
        }
    }

    static getAll = async (filters: TaskFiltersDTO): Promise<Task[]> => {
        try {
            return await TaskRepository.getAll(filters);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks (Service)");
        }
    }

    static update = async (id: string, task: UpdateTaskDTO): Promise<Task> => {
        try {
            return await TaskRepository.update(id, task);
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task (Service)");
        }
    }

    static incativateTask = async (id: string): Promise<boolean> => {
        try {
            return await TaskRepository.incativateTask(id);
        } catch (error) {
            console.error("Error deactivating task:", error);
            throw new Error("Failed to deactivate task (Service)");
        }
    }

}