import fs from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs';

// lire_fichier();
// ecrire_dans_fichier()

async function lire_fichier() {

    try {
        const data = await fs.readFile('./files/fichier1.txt', 'utf-8')
        console.log(data);
    } catch (error) {
        console.log(error.message);

    }

}
// ecrire_dans_fichier()
async function ecrire_dans_fichier() {

    try {
        let content = "";
        for (let index = 0; index < 100000000; index++) {
            content += "New content line " + index + " \n";

        }
        const data = await fs.writeFile(
            './files/fichier1.txt',
            content,

            {
                flag: "w"
            }
        )
        console.log(data);
    } catch (error) {
        console.log(error.message);

    }

}

// lire_ecrire_fichier_avec_open()
async function lire_ecrire_fichier_avec_open() {

    try {
        // a+ pour lire et ecrire
        const fichier = await fs.open('./files/fichier1.txt', 'r+');

        //Lecture
        console.log(await fichier.readFile("utf-8"));

        console.log("------------------------");

        //Ecriture
        // await fichier.writeFile("sssssssssssssss\n");


        await fichier.close();

    } catch (error) {
        console.log(error.message);

    }

}
afficher_statistiques_du_fichier()
async function afficher_statistiques_du_fichier() {
    try {
        const stats = await fs.stat('./files/fichier1.txt');
        console.log(stats);
        console.log(stats.isFile());

    } catch (error) {
        console.log(error.message);
    }
}
// lire_fichier_en_stream()
function lire_fichier_en_stream() {
    const flux_lecture = createReadStream("./files/fichier1.txt", "utf-8")
    let message_complet = "ssss";

    flux_lecture.on('data', (chunk) => {
        // console.log("==============================================================");
        // console.log(chunk.length);
        // console.log("==============================================================");

        message_complet += chunk;
        console.log(message_complet)


    })

    flux_lecture.on('end', () => {
        console.log("Flux stopped");


    })
    // console.log(message_complet);



}
