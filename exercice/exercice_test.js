import test from "node:test";
import assert from "node:assert";
import {
    getPhraseCount,
    FILE_NOT_FOUND,
    FILE_NOT_TEXT,
    analyseFile,
    getWordCount,
    getLetterCount,
    getChunkCount,
    getStat

} from "./exercice.js";

// les test possibles sont :
// getStat,getWordCount,getPhrase,getChunkCount,getLetterCount
// verifier que le fichier existe avant de l'analyser
// verifier que le fichier est un fichier texte


test('test cas normal pour analyseFile',() => {
    //Arrange 
    const resultatAttendu = {
        phraseCount: 3,
        wordCount: 15,
        letterCount: 60,
        chunkCount: 5,
        stat: {
            size: 1234,
            uid: 1000,
            gid: 1000
        }

    };
    //Act
   let resultatObtenu = analyseFile("exercice/test.txt");

    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas où le fichier n\'existe pas',() => {
    //Arrange 
    const resultatAttendu = FILE_NOT_FOUND;
    //Act
   let resultatObtenu;
   try {
    resultatObtenu = analyseFile("exercice/test1.txt");
   } catch (error) {
    resultatObtenu = error.message;
   }
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})

test('test cas où le fichier n\'est pas un fichier texte',() => {
    //Arrange 
    const resultatAttendu = FILE_NOT_TEXT;
    //Act
   let resultatObtenu;
   try {
    resultatObtenu = analyseFile("exercice/test.pdf");
   } catch (error) {
    resultatObtenu = error.message;
   }
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})




test('test cas normal pour getPhraseCount',() => {
    //Arrange 
    const resultatAttendu = 3;
    //Act
    const resultatObtenu = getPhraseCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getWordCount',() => {
    //Arrange 
    const resultatAttendu = 15;
    //Act
    const resultatObtenu = getWordCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getLetterCount',() => {
    //Arrange 
    const resultatAttendu = 60;
    //Act
    const resultatObtenu = getLetterCount(content_file);
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getChunkCount',() => {
    //Arrange 
    const resultatAttendu = 5;
    //Act
    const resultatObtenu = getChunkCount("exercice/test.txt");
    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test('test cas normal pour getStat',() => {
    //Arrange 
    const resultatAttendu = {
        size: 1234,
        uid: 1000,
        gid: 1000
    };
    //Act
    const resultatObtenu = getStat("exercice/test.txt");
    //Assert 
    assert.deepStrictEqual(resultatAttendu, resultatObtenu)
})
