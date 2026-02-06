import express from 'express'
import path from 'node:path'
import { envs } from '../config/envs'

export interface EnvsOptions {
    port: number,
    public_path?: string
}

export class Server {
  
    private app = express()
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: EnvsOptions) {
      const {port, public_path = 'public'} = options
      this.port = port,
      this.public_path = public_path

    }

    async start () {

        this.app.use(express.static(`./${this.public_path}`))


        this.app.get('/{*splat}', (req, res) => {
            const pathIndex = path.join(__dirname +`../../../${this.public_path}/index.html`);
            res.sendFile(pathIndex);
        })

        this.app.listen(3000, () => {
            console.log(`Servidor Conectado en el puerto ${this.port}`);
            
        })
    }


}