import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { Router } from "./src/utils/router.ts";
import { config } from "./config.ts";
import { UserController } from "./src/modules/users/user.controller.ts";
//import { authenticateToken } from "./src/middleware/authentication.ts";

const router = new Router()
// Import and register routes

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // Pass the request and response to the router's handle method
    router.handle(req, res)

    //PRUEBA
    router.get("/prueba",(req, res)=>{
        console.log(req.query)
        res.end()
    })
    
    //USUARIO
    //router.get('/users', authenticateToken, UserController.getAll())
    router.get('/users/:id')
    router.post('/users')
    router.put('/users/:id')
    router.delete('/users/:id')

    //AUTH
    router.post('/register')
    router.post('/login')

    //TASK
    router.get('/tasks')
    router.get('/tasks/:id')
    router.post('/tasks')
    router.put('/tasks/:id')
    router.delete('/tasks/:id')

    //TASKRUN
    router.get('/taskruns')
    router.get('/taskruns/:id')
    router.post('/taskruns')
    router.put('/taskruns/:id')
    router.delete('/taskruns/:id')
    
});

server.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
