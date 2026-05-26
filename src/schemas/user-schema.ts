import type { InferInput } from "valibot";
import type { authSchema } from "./authUser-schema.ts";
import type { ROLE } from "../../generated/prisma/enums.ts";


export type User = InferInput<typeof authSchema> & {
    id: string,
    name: string,
    role: ROLE
    status?: string,
    refreshToken?: string,
    createdAt: Date,
    updatedAt?: Date
}

