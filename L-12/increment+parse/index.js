const http = require('http') 

const file = require('fs/promises')

const url = require('url')

const m1 = require('./module1.js')

const server = http.createServer( async (req, res) => {
    const log = `${new Date().getTime()}: ${req.url}\n`
    await file.appendFile('./log.txt', log)

    m1()
    
    const route = req.url
    const {pathname , query} = url.parse(route , true)
    console.log(pathname)
    console.log(query)
    switch(route) 
    {
        case '/' : {
            res.end('<h1 style="color : red ;">Hello Dreamers! </h1>');
            break;
        }
        case '/about' : {
            res.end('<h1 style="color : green ;">About page</h1>');
            break;
        }
        case '/help' : {
            res.end('<h1 style="color : blue ;">Help page</h1>');
            break;
        }
        case '/hell' : {
            res.end('<h1>I know your pain</h1>');
            break;
        }
        default : {
            res.writeHead (404 , {
                'Content-Type' : 'text/html'
            })
            res.end('<h1 style="color : blue ;">Page Not Found</h1>');
            break;
        }
    }


})

server.listen(6969 , () => {
    console.log('Server started')
    console.log('listening on *:6969')
})

