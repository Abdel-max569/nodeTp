import { createServer } from 'node:http'

//Creation d'un nouveau server
const app = createServer((request, response) => {
    console.log("Hello.....");
    console.log(request);
    console.log(response)
    response.writeHead(404, {
        'content-type': 'application/json'
    });
    const maPage = `<button onclick  = alert('zzzzz')>aaaaaaaaaaa</button>`

    const data = {}
    response.end(JSON.stringify(data));
})

//Demarrer le server sur le port 3000
app.listen('2000', () => {
    console.log("Server started......")
})














