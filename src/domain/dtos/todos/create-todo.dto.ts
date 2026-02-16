




export class CreateTodoDto {


    private constructor (
        public readonly text: string,
        public readonly createdAt: Date 
    ) {}

    

    static create (props: {[key: string]: any}): [string?, CreateTodoDto? ] {
        
        const {text,createdAt} = props;
        if(!text) return ['El texto es requerido'];  
        let verifidCreateAt = createdAt
        if(createdAt){
         verifidCreateAt = new Date(createdAt)
         if(verifidCreateAt.toString() === 'Invalid Date'){
            return ['El formato de la fecha ingresada es incorrecto',]
         }
        }else{
             verifidCreateAt = null
        }
        

        return[ ,new CreateTodoDto(text,verifidCreateAt)]
    }
}