import fs from "node:fs/promises";
import { createReadStream , existsSync} from "node:fs";
 

export const FILE_NOT_FOUND = "Le fichier n'existe pas";
export const FILE_NOT_TEXT = "Le fichier n'est pas un fichier texte";
export const STAT_NOT_READABLE =
    "Impossible de lire les statistiques du fichier";
export const FILE_NOT_GIVEN = "Aucun fichier donné";


export async function analyseFile(nom_fichier) {
    if(nom_fichier === undefined || nom_fichier === null || nom_fichier === "") {
        throw new Error(FILE_NOT_GIVEN);
    }
    if (!existsSync(nom_fichier)) {
        throw new Error(FILE_NOT_FOUND);
    }
    const stat = await getStat(nom_fichier);
    if (!stat.isFile()) {
        throw new Error(FILE_NOT_TEXT);
    }
    if(!nom_fichier.endsWith(".txt")) {
        throw new Error(FILE_NOT_TEXT);
    }
    const content_file = await fs.readFile(nom_fichier, "utf8");
    const phraseCount = getPhraseCount(content_file);
    const wordCount = getWordCount(content_file);
    const letterCount = getLetterCount(content_file);
    const chunkCount = await getChunkCount(nom_fichier);

    return {
        phraseCount,
        wordCount,
        letterCount,
        chunkCount,
        stat: {
            size: stat.size,
            uid: stat.uid,
            gid: stat.gid
        }
    };
     
}

// getStat,getWordCount,getPhrase,getChuncCount,getLetterCount

export function getPhraseCount(texte) {
    let phraseCount = 0;
    texte.split("").forEach((caratere) => {
        if (caratere === "." || caratere === "!" || caratere === "?") {
            phraseCount++;
        }
    });
    console.log(`Nombre de phrases: ${phraseCount}`);
    return phraseCount;
}

export function getWordCount(texte) {
    // let nombre_mots = texte.match(/\S+/g);
    // console.log(nombre_mots);
    // return nombre_mots ? nombre_mots.length : 0;

    const counts = {};
    // Convert to lowercase
    const lowerText = texte.toLowerCase();

    const words = lowerText.match(/\b[\w']+\b/g);

    if (!words) return counts;

    let occurrence = words.length || 0;
    console.log(`Nombre de mots: ${occurrence}`);
    return occurrence;
}

export function getLetterCount(texte) {
    let apparution = 0;
    let text = texte.toLowerCase();

    const letters = text.match(/[a-z]/g);

    if (!letters) return apparution;

    apparution = letters.length || 0;
    console.log(`Nombre de lettres: ${apparution}`);
    return apparution;
}

export async function getChunkCount(nom_fichier) {
    let chunkCount = 0;
    const stream = createReadStream(nom_fichier,"utf8" );

    for await (const chunk of stream) {
        chunkCount++;
    }

    return chunkCount;
}

export async function getStat(nom_fichier) {
    try {
        let stat = await fs.stat(nom_fichier);
        return stat;
    } catch (error) {
        console.log(error.message);
        throw new Error(STAT_NOT_READABLE);
    }
}
