import {pipe,string,trim,strictObject,email,minLength, type InferOutput} from "valibot";

export const UserAuthSchema = strictObject({
    email: pipe(string(), trim(), email()),
    password: pipe(string(), minLength(8)),
});

export type UserAuthInput = InferOutput<typeof UserAuthSchema>;