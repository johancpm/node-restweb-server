import { envs } from "./config/envs";
import { Server } from "./presentation/server";




(async() => {
  main()
})();


function main () {
   const {PORT, PUBLIC_PATH} = envs
   const startServer = new Server({
    port: PORT,
    public_path: PUBLIC_PATH
   });

   startServer.start();
}