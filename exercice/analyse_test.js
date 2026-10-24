import test from "node:test";
import assert from "node:assert";
import {
    getPhraseCount,
    FILE_NOT_GIVEN,
    FILE_NOT_FOUND,
    FILE_NOT_TEXT,
    analyseFile,
    getWordCount,
    getLetterCount,
    getChunkCount,
    getStat,
    STAT_NOT_READABLE

} from "./analyse_file.js";

// les test possibles sont :
// getStat,getWordCount,getPhrase,getChunkCount,getLetterCount
// verifier que le fichier existe avant de l'analyser
// verifier que le fichier est un fichier texte


test('test cas normal pour analyseFile', async () => {
    //Arrange 
    const resultatAttendu = {
        phraseCount: 0,
        wordCount: 8,
        letterCount: 198,
        chunkCount: 2,
        stat: {
            size: 205/1024,
            uid: 1000,
            gid: 1000
        }

    };
    //Act
    let resultatObtenu = await analyseFile("./test.txt");

    //Assert 
    assert.deepStrictEqual(resultatObtenu, resultatAttendu)
})

test('test cas où le fichier n\'est pas donné', async () => {
    //Arrange 
    const resultatAttendu = FILE_NOT_GIVEN;
    let resultatObtenu;
    //Act
    try {
        let resultatObtenu = await analyseFile();
    } catch (error) {
        resultatObtenu = error.message;
    }
    //Assert
     assert.strictEqual(resultatObtenu, resultatAttendu);
})

test('test cas où le fichier n\'existe pas', async () => {
    //Arrange 
   const resultatAttendu = FILE_NOT_FOUND;
    //Act
   let resultatObtenu;
   try {
    resultatObtenu = await analyseFile("./tesst.txt");
   } catch (error) {
    resultatObtenu = error.message;
   }
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})

test('test cas où le fichier n\'est pas un fichier texte',async () => {
    //Arrange 
    const resultatAttendu = FILE_NOT_TEXT;
    //Act
   let resultatObtenu;
   try {
    resultatObtenu = await analyseFile("./analyse_file.js");
   } catch (error) {
    resultatObtenu = error.message;
   }
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})




test('test cas normal pour getPhraseCount',() => {
    //Arrange 
    const resultatAttendu = 4;
    let content_file = "Ceci est une phrase. Ceci est une autre phrase. Et encore une autre phrase. ou l'est!";
    //Act
    const resultatObtenu = getPhraseCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getWordCount',() => {
    //Arrange 
    const resultatAttendu = 16;
    let content_file = "Ceci est une phrase. Ceci est une autre phrase. Et encore une autre phrase et l'est.";
    //Act
    const resultatObtenu = getWordCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getLetterCount',() => {
    //Arrange 
    const resultatAttendu = 8;
    const content_file = "Ceci.gfnf!:;:,;,";
    //Act
    const resultatObtenu = getLetterCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getChunkCount',async () => {
    //Arrange 
    const resultatAttendu = 5;
    //Act
    const resultatObtenu = await getChunkCount("./test.txt");
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getStat',async () => {
    //Arrange 
    const resultatAttendu = {
        size: 205,
        uid: 1000,
        gid: 1000
    };
    //Act
    let resultatObtenu =await getStat("./test.txt");
    resultatObtenu = {
        size: resultatObtenu.size,
        uid: resultatObtenu.uid,
        gid: resultatObtenu.gid
    }
    //Assert 
    assert.deepStrictEqual(resultatAttendu, resultatObtenu)
})


test('test cas où getStat donne une erreur',async () => {
    //Arrange 
    const resultatAttendu = STAT_NOT_READABLE;
    //Act
    let resultatObtenu;
    try {
        resultatObtenu = await getStat("./fichier_inexistant.txt");
    } catch (error) {
        resultatObtenu = error.message;
    }
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})

