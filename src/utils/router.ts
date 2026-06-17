import type { IncomingMessage, ServerResponse } from "node:http";
import type { ParsedUrlQuery } from "node:querystring";
import urlmodule from 'node:url';

type NextFunction = () => void

type RequestWithParams = IncomingMessage & {
    params: Record<string,string>
    query: ParsedUrlQuery
}

type Handler = (
    req: RequestWithParams,
    res: ServerResponse,
    next?: NextFunction
) => void | Promise<any>;

type Route = {
    regex: RegExp;
    params: string[];
    handlers: Handler[]
}

export class Router {

    routes: Record<string, Route[]>

    constructor() {
        // Structure: { GET: [{ regex, params, handlers }], POST: [], ... }
        this.routes = {}
    }

    // Registers a route by converting Express-style paths (e.g., '/api/users/:id') into Regex (e.g., /^\/api\/users\/([^/]+)$/) and extracting parameter names
    private _register(method: string, url:string, handlers: Handler[]){

        // If the method doesn't exist yet, initialize it with an empty array
        if(!this.routes[method]){
            this.routes[method] = []
        }

        const params: string[] = [];

        const regexPattern = url.replace(/:([^/]+)/g, (_: string, param: string): string => {
            params.push(param);
            return '([^/]+)';
        });

        // Match exact strings from start (^) to end ($)
        const regex = new RegExp(`^${regexPattern}$`);

        // Store the route profile for the given method
        this.routes[method].push({regex, params, handlers});
    }

    // HTTP Method registration helpers
    get(url: string, ...handlers: Handler[]) { this._register('GET', url, handlers)}
    post(url: string, ...handlers: Handler[]) { this._register('POST', url, handlers)}
    put(url: string, ...handlers: Handler[]) { this._register('PUT', url, handlers)}
    patch(url: string, ...handlers: Handler[]) { this._register('PATCH', url, handlers)}
    delete(url: string, ...handlers: Handler[]) { this._register('DELETE', url, handlers)}


    // The main request handler passed directly to http.createServer
    handle(req: IncomingMessage, res: ServerResponse){

        const customReq = req as RequestWithParams
        const parseUrl = urlmodule.parse(req.url as string, true)
        customReq.query = parseUrl.query
        const pathName = parseUrl.pathname
        const method = req.method as string

        res.setHeader('Content-Type', 'application/json')

        const methodRoutes = this.routes[method] || []

        // Find a matching route profile
        for (const route of methodRoutes) {

            const match = pathName?.match(route.regex)

            if (match){
                // Map dynamic parameter values back to their named keys
                customReq.params = {};

                route.params.forEach((param: string, index: number)=>{
                    const value = match[index + 1]
                    if (value !== undefined) {
                        customReq.params[param] = value
                    }
                });

                let index = 0;
                const handlers = route.handlers;

                const next = () => {

                    if (res.writableEnded) return;

                    if (index < handlers.length){
                        const currentHandler = handlers[index++]!

                        Promise
                        .resolve(currentHandler(customReq, res, next))
                        .catch((error)=>{
                            console.error('Error in handler:', error);

                            if (!res.writableEnded) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            }
                        }) ;
                    }
                };
                return next(); //Start the chain
            }
        }

        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Route not found'}))
    }

    

}