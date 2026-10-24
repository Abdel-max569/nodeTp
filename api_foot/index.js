/**
 * Creer un serveur d'API HTTP
 * Gerer les equipes de foot 
 * GET / => {"status":"ok"}
 * -GET /teams :Recuperer toutes les equipes
 * -GET /teams/:id : Recuperer une equipe
 * POST /teams : Creer une equipe
 * PUT /teams/:id :Mise a jour completement 
 * PATCH /teams/:id : mettre a jour partielement une equipes 
 * DELETE /teams/:id : Supprimer une equipes 
 */

/**
 * 
 * id 
 * nom
 * cover
 * players_number
 * coach
 * capitaine
 */

import { error } from "node:console";
import { createServer } from "node:http"
import { json } from "node:stream/consumers";

const PORT = 3000;

const teams = [
    {
        "id": 1,
        "cover": "/covers/team1.jpeg",
        "name": "Black Stars",
        "players_number": 11,
        "coach": "Carlos",
        "capitaine": "Jordan Ayew",
    }
]


const app = createServer((request, response) => {
    // console.log(request.url);
    // console.log(request.method);
    // console.log(request.headers);

    // const url = new URL(`http://127.0.0.1:${request.url}`);


    const { url: endpoint, method: verb } = request;

    let url = `${verb}${endpoint}`
    console.log(url);

    response.setHeader("Content-type", 'application/json');

    switch (url) {
        case "GET/":
            response.writeHead(200)
            response.end(JSON.stringify({ "status": "ok" }))
            break;


        case "GET/teams":
            response.writeHead(200)
            response.end(JSON.stringify(teams))
            break;

        case "POST/teams":
            response.writeHead(200)

            const body = json(request);
            body.then((value) => {
                console.log(value);
                let idPecedent = teams[teams.length-1].id
                console.log(idPecedent);
                
                value.id = idPecedent + 1;
                
                teams.push(value)
                console.log(teams);
                
            })
            .catch((error)=>{
                console.log(error);
                
            })


            // request.on("data", (chunk) => {
            //     console.log(chunk);

            // })

            request.on('end', () => {
                console.log("Flux tergo");

            })
            response.end(JSON.stringify({}))
            break;

        default:
            response.writeHead(404)
            response.end(JSON.stringify({ "message": `Ressource ${url} non trouvé` }))
            break;
    }


    //Definir les entete
    // response.writeHead(200, {
    //     'content-type': 'application/json'
    // });

    //Tranmettre une reponse
    // response.end(JSON.stringify(teams));
});


app.listen(PORT, () => {
    console.log(`Foot Api started on http://127.0.0.1:${PORT}`)
})

