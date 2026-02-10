

import { Router } from "express";
import { AppTodos } from "./appTodos";





export class TodosRoutes {

    static get router(): Router {

        const route = Router();
        const Todos = new AppTodos();
        
        /* GET-Mostrar */
        route.get('/', Todos.getTodos)
        route.get('/:id', Todos.getTodosId)
        /* POST-Insertar */
        route.post('/post', Todos.createTodo)
        /* PUT-Actualizar */
        route.put('/:id',Todos.updateTodo)
        /* DELETE-Eliminar */
        route.delete('/:id', Todos.deleteTodo)

        return route
    }
}