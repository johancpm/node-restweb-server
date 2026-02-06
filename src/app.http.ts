import http from 'http'
import fs from 'fs'

const petitionHttp = http.createServer((req, res) => {

    //el argumento req se refiere a la peticion que hace el usuario al servidor
    console.log(req.url);

    //el argumento res se refiere a la respuesta del servido para el usuario
    //res.write para crear el mensaje de respuesta 
    //res.write('Hola Mundo')
    
    //  res.end para finalizar el proceso de respuesta
    //res.end()

    //Enviar codigo html

    //res.writeHead(200,{'content-type': 'text/html'});
    //res.write(`<h1>URL/${req.url}</h1>`);
    //res.end();

    //Enviar una data
    //const data = {name: 'John Doe', age: 34, city: 'Bogota Dc'}

    //res.writeHead(200, {'Content-Type': 'application/json'})
    //res.end(JSON.stringify(data));

    //Enviar un archivo externo

    if(req.url === '/'){
        const readHtml = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/html'})     
        res.end(readHtml)
        return
    }
    
    
    if(req.url?.endsWith('.js')){    
        res.writeHead(200, {'Content-Type': 'application/javascript'})   
    }
    else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'})
        
    }
    
    const returtResComplet = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(returtResComplet);
})

//luego se selecciona el puerto por donde se va hacer esta comunicacion entre el usuario y el servidor
//se agrega la variable anteriormente creada y se le agrega el metodo listen y esto retorna un callback

petitionHttp.listen(8080, () => {
    console.log('Server runing on Port 8080');
    
})