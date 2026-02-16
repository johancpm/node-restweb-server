
import {Request, Response} from 'express'
import { prisma } from '../../data/postgres'
import { json } from 'node:stream/consumers'
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto'
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto'


const todos = [
                {id: 1, text: 'Buy Milk', createdAt: new Date()},
                {id: 2, text: 'Buy bread', createdAt: null},
                {id: 3, text: 'Buy butter', createdAt: new Date()},
            ]

export class AppTodos {

    constructor(){}

public getTodos = async(req:Request, res:Response) => {

    const getAllTodos = await prisma.todo.findMany()

    res.json(getAllTodos)           
}

public getTodosId = async(req:Request, res:Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({err: `El id ingresado no es un numero`})
     const getTodoId = await prisma.todo.findUnique({
          where: {id}
     });

    (getTodoId)
    ? res.json(getTodoId)
    : res.status(404).json({err: `el id ${id} no se encuentra`})          
}

 public createTodo = async (req: Request, res: Response) => {
      
    const [error, createTodoDto] = CreateTodoDto.create({...req.body})
    if(error) return res.status(400).json({error});

    const newTodo = await prisma.todo.create({
        data:  createTodoDto!
    })

    res.json(newTodo);
}

public updateTodo = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.updateTodo({id, ...req.body})
    if(error) return res.status(400).json({error})
    
    const getTodoBd = await prisma.todo.findFirst({
        where: {id}
    })    

  const newTodo = await prisma.todo.update({
        where:{
            id
        },
        data: updateTodoDto!.values
    })    

    /* const {text, createdAt} = req.body;
    getTodo.text = text || getTodo.text;

    (createdAt === null) 
    ? getTodo.createdAt = null
    : getTodo.createdAt = new Date(createdAt || getTodo.createdAt) */


    res.json(newTodo)

}

public deleteTodo = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({err: 'El id ingresado no es un numero'});

    const todoDelete = await prisma.todo.delete({
        where: {id}
    });
    
    if(!todoDelete) return res.status(400).json({err: `El elemto con id ${id} no existe`});

    
    /* todos.splice(todos.indexOf(todoDelete),1)  */
    

    res.json(todoDelete)

}

}