import type { IncomingMessage, ServerResponse } from "http";
import { HttpMethod } from "../models/api.ts";
import { parseBody } from "../utils/parseBody.ts";
import { safeParse } from "valibot";
import { UserAuthSchema } from "../schemas/index.ts"
import type { AuthService } from "../services/auth-service.ts";


export class AuthRouter {

    constructor(private authServise: AuthService){
        this.authServise = authServise;
    }

    authRouter = async (req: IncomingMessage, res: ServerResponse) => {
        const {method, url} = req;

        if (url === "/user/auth" && method === HttpMethod.POST){
            const body = await parseBody(req)
            const result = safeParse(UserAuthSchema , body)

            if (result.issues) {
                res.statusCode = 400;
                res.end(JSON.stringify({message: "Bad Request" }))
                return
            }

            const {email, password} = body

            try {
                const user = await this.authServise.authUser({email, password})
                res.statusCode = 201
                res.end(JSON.stringify({user}))
            } catch (error) {
                if (error instanceof Error){
                    res.end(JSON.stringify({message: error.message}))
                } else {
                    res.end(JSON.stringify({message:"Internal Server Error"}))
                }
            }

        }

        
    }


}

