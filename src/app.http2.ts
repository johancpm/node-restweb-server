import http2 from 'http2'
import fs from 'fs'

const petitionHttp = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
},
    (req, res) => {

    
    console.log(req.url);

    

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

    try {
        const returtResComplet = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(returtResComplet);
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end()
    }
    
})

//luego se selecciona el puerto por donde se va hacer esta comunicacion entre el usuario y el servidor
//se agrega la variable anteriormente creada y se le agrega el metodo listen y esto retorna un callback

petitionHttp.listen(8080, () => {
    console.log('Server runing on Port 8080');
    
})