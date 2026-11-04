import { createServer } from "node:http"
import { json } from "node:stream/consumers"

const PORT = 3000;
const users = [
    { "id": 1, "username": "admin_user", "email": "admin@example.com", "password": "SuperSecureAdminPassword2026!" },
    { "id": 2, "username": "alice_smith", "email": "alice.smith@example.com", "password": "Password_Alice123" },
    { "id": 3, "username": "bob_johnson", "email": "bob.johnson@example.com", "password": "12345678password" },
    { "id": 4, "username": "chloe", "email": "chloe.disabled@example.com", "password": "ValidPassword987*" },
    { "id": 5, "username": "mod_max", "email": "max.mod@example.com", "password": "passwordAdmIn!" },
    { "id": 6, "username": "Jeanne", "email": "expired@example.com", "password": "ExpiredPassword555!" }
]

function getMax(users) {
    if (users.length == 0) {
        return 0;
    }
    let max_id = 1;
    for (let user of users) {
        if (user.id > max_id) {
            max_id = user.id
        }
    }
    return max_id;
}


const app = createServer((request, response) => {
    const { method: verb, url: endpoint } = request;
    let url = `${verb}${endpoint}`
    console.log(url);

    response.setHeader("Content-type", 'application/json');
    let body;
    switch (url) {
        case "POST/api/auth/register":
            body = json(request);
            body.then((user) => {
                let { username, email, password } = user;
                console.log(email);

                if (!username || !email || !password) {
                    response.writeHead(400);
                    return response.end(JSON.stringify({ "message": "Veuillez renseigner tous les champs" }));
                }

                const existUser = users.find((user_current) => user_current.email === email);
                if (existUser) {
                    response.writeHead(400);
                    return response.end(JSON.stringify({ "message": "Cet email est deja inscrit" }));
                }

                users.push({
                    id: getMax(users) + 1,
                    email: email,
                    username: username,
                    password: password
                })

                console.log(users);

                response.writeHead(201);
                response.end(JSON.stringify({ "message": "Utilisateur enregistré avec succès" }));

            }).catch((error) => {
                console.error(error);
                response.writeHead(500);
                response.end(JSON.stringify({ "message": "Erreur lors du traitement" }));
            })
            break;
        case "POST/api/auth/login":
            body = json(request);
            body.then((user) => {
                let { email, password } = user;
                console.log(email);

                if (!email || !password) {
                    response.writeHead(400);
                    return response.end(JSON.stringify({ "message": "Veuillez renseigner tous les champs" }));
                }

                const existUser = users.find((user_current) => user_current.email === email);
                console.log(existUser);
                if (!existUser || existUser.password !== password) {
                    response.writeHead(400);
                    return response.end(JSON.stringify({ "message": "Cet utilisateur n'existe pas" }));
                }


                response.writeHead(200);
                response.end(JSON.stringify({ "message": "Utilisateur connecté avec succès" }));

            }).catch((error) => {
                console.error(error);
                response.writeHead(500);
                response.end(JSON.stringify({ "message": "Erreur lors du traitement" }));
            })
            break
        default:
            response.writeHead(404)
            response.end(JSON.stringify({ "status": "not found" }))
    }
})

app.listen(PORT, () => {
    console.log(`Auth Api started on http://127.0.0.1:${PORT}`)
})
