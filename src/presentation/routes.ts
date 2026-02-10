import { Router } from "express";
import { TodosRoutes } from "./todos/routesTodos";




export class AppRoute {

    static get router(): Router {

        const route = Router();

        route.use('/api/todos', TodosRoutes.router)

        return route
    }
}