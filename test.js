import assert from 'node:assert'
import test from 'node:test'
import {
    somme,
    ARGUMENT_MANQUANT_ERROR,
    TYPE_ARGUMENT_INVALID,
} from './math.js';


test("Cas normal", () => {
    //Arrange 
    let nbr1 = Math.random() * (1000 - 1) + 1;
    let nbr2 = Math.random() * (1000 - 1) + 1;
    let nbr3 = Math.random() * (1000 - 1) + 1;

    const resultatAttendu = nbr1 + nbr2 + nbr3;

    //Act
    const resultatObtenu = somme(nbr1, nbr2, nbr3)

    //Assert 
    assert.strictEqual(resultatAttendu, resultatObtenu)
})


test("Cas où le nombre d'argument n'est pas respacter", () => {
  // Arrange
  let nbr1 = 14;
  let nbr2 = 3;
  let nbr3 = 1;
  const resultatAttendut = ARGUMENT_MANQUANT_ERROR;

  // Act
  let resultatObtenu;
  try {
    resultatObtenu = somme(nbr1, nbr2);
  } catch (error) {
    resultatObtenu = error.message;
  }
  // Assert
  assert.strictEqual(resultatAttendut, resultatObtenu);
});


test("Cas où le type d'argument est invalide", () => {
  // Arrange
  let nbr1 = 14;
  let nbr2 = 3;
  let nbr3 = "12345";
  const resultatAttendut = TYPE_ARGUMENT_INVALID;

  // Act
  let resultatObtenu;
  try {
    resultatObtenu = somme(nbr1,nbr2,nbr3);
  } catch (error) {
    resultatObtenu = error.message;
  }
  // Assert

  assert.strictEqual(resultatAttendut,resultatObtenu);
});


























