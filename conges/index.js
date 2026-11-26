
/**
 * Creer un serveur d'API HTTP
 * Gerer les etudiants
 *
 * GET / => {"status":"ok"}
 *
 * GET /students : Recuperer tous les etudiants
 * GET /students/:id : Recuperer un etudiant
 * POST /students : Creer un etudiant
 * PUT /students/:id : Modifier completement un etudiant
 * DELETE /students/:id : Supprimer un etudiant
 */

/**
 * Un etudiant est represente par :
 *
 * id
 * firstname
 * lastname
 * sexe
 * dateNaissance
 */

import { createServer } from "node:http";
import { json } from "node:stream/consumers";

const PORT = 3000;

const students = [
    {
        id: 1,
        firstname: "Abdel",
        lastname: "AGOUDA",
        sexe: "M",
        dateNaissance: "2004-05-12"
    },
    {
        id: 2,
        firstname: "AFi",
        lastname: "ALI",
        sexe: "F",
        dateNaissance: "2005-08-20"
    }
];

function getMax(users) {
    if (users.length == 0) {
        return 0;
    }

    let max_id = 0;

    for (let user of users) {
        if (user.id > max_id) {
            max_id = user.id;
        }
    }

    return max_id;
}

const app = createServer(async (request, response) => {

    const { url: endpoint, method: verb } = request;

    let url = `${verb}${endpoint}`;

    console.log(url);

    response.setHeader("Content-type", "application/json");

    switch (url) {

        case "GET/":

            response.writeHead(200);

            response.end(JSON.stringify({
                status: "ok"
            }));

            break;


        case "GET/students":

            response.writeHead(200);

            response.end(JSON.stringify(students));

            break;


        case "POST/students":

            try {
                const body = await json(request);

                const new_student = {
                    id: getMax(students) + 1,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    sexe: body.sexe,
                    dateNaissance: body.dateNaissance
                };

                students.push(new_student);

                response.writeHead(201);

                response.end(JSON.stringify(new_student));

            } catch (error) {

                response.writeHead(400);

                response.end(JSON.stringify({
                    message: "Donnees invalides"
                }));
            }

            break;

        case "PUT/student":
            const idUpdate = Number(url.searchParams.get("id"));

            const student_update = students.find(
                (student) => student.id === idUpdate
            );

            if (!student_update) {

                response.writeHead(404);

                response.end(JSON.stringify({
                    message: "Etudiant non trouve"
                }));

                break;
            }

            try {

                const body = await json(request);

                student_update.firstname = body.firstname;
                student_update.lastname = body.lastname;
                student_update.sexe = body.sexe;
                student_update.dateNaissance = body.dateNaissance;

                response.writeHead(200);

                response.end(JSON.stringify(student_update));

            } catch (error) {

                response.writeHead(400);

                response.end(JSON.stringify({
                    message: "Donnees invalides"
                }));
            }

            break;


        case "DELETE/student":
            const idDel = Number(url.searchParams.get("id"));

            const index = students.findIndex(
                (student) => student.id === idDel
            );

            if (index !== -1) {

                students.splice(index, 1);

                response.writeHead(200);

                response.end(JSON.stringify({
                    message: "Etudiant supprime"
                }));

            } else {

                response.writeHead(404);

                response.end(JSON.stringify({
                    message: "Etudiant non trouve"
                }));
            }

            break;


        default:

            response.writeHead(404);

            response.end(JSON.stringify({
                message: `Ressource ${url} non trouvee`
            }));

            break;
    }

});

app.listen(PORT, () => {
    console.log(`Student API started on http://127.0.0.1:${PORT}`);
});
