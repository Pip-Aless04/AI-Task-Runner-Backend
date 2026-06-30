import { Router } from "../../utils/router.ts"
import { UserController } from "./user.controller.ts"
import type { UserRepository } from "./user.repository.ts"

export const createUserRouter = ({ userRepository }: { userRepository: UserRepository }) => {

    const userRouter = new Router()

    userRouter.get("/", userController.getAll())

    return userRouter;
}