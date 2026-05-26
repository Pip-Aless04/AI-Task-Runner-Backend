import { v4 } from "uuid";

export class Uuid{
    static getUuid = (): string => v4();
}
