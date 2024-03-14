const http = require('http') 

const file = require('fs/promises')

const server = http.createServer( async (req, res) => {
    const log = `${new Date().getTime()}: ${req.url}\n`
    await file.appendFile('./log.txt', log)
    let html = await file.readFile('./index.html' , 'utf-8')
    const css = await file.readFile('./style.css')
    html = html.replace('cssVar_#1', css)
    res.write(html)

    const route = req.url

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
        case '/products' : {
            const data = await file.readFile('./dummyData.json')
            console.log(data.products);
            res.end(data.products[1]);
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
            res.end('<h1 style="color : blue ;">Page Not Found</h1>');
            break;
        }
    }
})

server.listen(6969 , () => {
    console.log('Server started')
    console.log('listening on *:6969')
})

// let dummyData
// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(data => {
//     dummyData = data;
// });