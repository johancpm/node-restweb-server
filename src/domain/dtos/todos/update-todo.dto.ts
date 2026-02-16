import { prisma } from "../../../data/postgres"



export class UpdateTodoDto {

    private constructor(
        public readonly text?: string,
        public readonly createdAt?: Date 
    ) {}


    get values() {
        const returntObj: {[key: string]: any} = {};

        if(this.text) returntObj.text = this.text;
        if(this.createdAt) returntObj.createdAt = this.createdAt;

        return returntObj;
    }


    static  updateTodo  (props: {[key: string]: any}): [string?, UpdateTodoDto?]  {
        
        const {id, text, createdAt} = props
        let verifidCreatedAt = createdAt;
        if(!id ||isNaN(id)) return ['El id Ingresado no es un numero',]

        if(createdAt){
            verifidCreatedAt = new Date(createdAt);
            if(verifidCreatedAt.toString() === 'Invalid Date'){
                return['La fecha Ingresada Tiene un formato Incorrecto',]
            }
        }
        
        
        
      return [, new UpdateTodoDto(text, verifidCreatedAt)]
    }
}