import {Request, Response} from 'express'


const todos = [
                {id: 1, text: 'Buy Milk', createdAt: new Date()},
                {id: 2, text: 'Buy bread', createdAt: null},
                {id: 3, text: 'Buy butter', createdAt: new Date()},
            ]

export class AppTodos {

    constructor(){}

public getTodos = (req:Request, res:Response) => {
    res.json(todos)           
}

public getTodosId = (req:Request, res:Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({err: `El id ingresado no es un numero`})
   const getTodoId = todos.find( todo => todo.id == id);

    (getTodoId)
    ? res.json(getTodoId)
    : res.status(404).json({err: `el id ${id} no se encuentra`})          
}

public createTodo = (req: Request, res: Response) => {
     
    const {text} = req.body;

    const newTodo = {
        id: todos.length + 1,
        text: text,
        createdAt: null
    }

    todos.push(newTodo);

    res.json(newTodo);
}

public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({err: 'El id ingresado no es un numero'});

    const getTodo = todos.find( todo => todo.id == id);
    if(!getTodo) return res.status(404).json({err: `El objeto con id ${id} no se encuentra`})

    const {text, createdAt} = req.body;
    getTodo.text = text || getTodo.text;

    (createdAt === null) 
    ? getTodo.createdAt = null
    : getTodo.createdAt = new Date(createdAt || getTodo.createdAt)


    res.json(getTodo)

}

public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({err: 'El id ingresado no es un numero'});

    const todoDelete = todos.find(tod => tod.id == id);
    
    if(!todoDelete) return res.status(400).json({err: `El elemto con id ${id} no existe`});

    
    todos.splice(todos.indexOf(todoDelete),1) 
    

    res.json(todos)

}

}