import express, { Router } from 'express'
import path from 'node:path'
import { envs } from '../config/envs'

export interface EnvsOptions {
    port: number,
    public_path?: string,
    routes: Router
}

export class Server {
  
    private app = express()
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: EnvsOptions) {
      const {port, public_path = 'public' , routes } = options
      this.port = port,
      this.public_path = public_path,
      this.routes = routes

    }

    async start () {

        /* Middlewares */
        this.app.use(express.json()); // recibir data por body raw
        this.app.use(express.urlencoded({extended: true})) // recibir data por body x-www-form-urlencoder

        /* Public Folder */
        this.app.use(express.static(`./${this.public_path}`))

        /* Router */
        this.app.use(this.routes)

        

        /* SPA */
        this.app.get('/{*splat}', (req, res) => {
            const pathIndex = path.join(__dirname +`../../../${this.public_path}/index.html`);
            res.sendFile(pathIndex);
        })

        /* Definir Pueto de Comunicacion */
        this.app.listen(3000, () => {
            console.log(`Servidor Conectado en el puerto ${this.port}`);
            
        })
    }


}