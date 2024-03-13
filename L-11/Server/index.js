const http = require('http');

const file = require('fs/promises');

const server = http.createServer(async (req, res) => {
    try {
        console.log('Server started');
        const html = await file.readFile('./index.html');
        const css = await file.readFile('./style.css');
        res.write(html);
        res.write(`<style>${css}</style>`);
        res.end();
    }
    catch(err) {
        console.log(err);
        console.log('Thik se kaam kar');
        res.end();
    }
});

server.listen(6969, () => {
  console.log('listening on *:6969');
});