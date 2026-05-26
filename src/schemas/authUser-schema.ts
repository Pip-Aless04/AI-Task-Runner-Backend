import { email, minLength, object, pipe, string } from "valibot";


const emailSchema = pipe(string(),email())
const passwordSchema = pipe(string(), minLength(8))


export const authSchema = object({
    email : emailSchema,
    password: passwordSchema
})

