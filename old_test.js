const somme = (a, b, c) => {
    if (a === undefined || b === undefined || c === undefined) {
        throw new Error("Erreur : Un ou plusieurs arguments sont manquants.");
    }
    
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number' || Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
        throw new Error("Erreur : Tous les arguments doivent être des nombres valides.");
    }
    
    return a + b + c;
};

/**
 * somme : nbr1: number , nbr2: number , nbr3: number -> number
 * Cas 1 : normal : 2,3,4 -> 10
 * Cas 2 : non normal propager une erreur 
 *  ->argument qui manque 
 *  -> valeur non number (NAN)
 */

test_somme_cas_normal();

function test_somme_cas_normal() {
    //Arrange 
    let nbr1 = Math.random() * (1000 - 1) + 1;
    let nbr2 = Math.random() * (1000 - 1) + 1;
    let nbr3 = Math.random() * (1000 - 1) + 1;

    const resultatAttendu = nbr1 + nbr2 + nbr3;

    //Act
    const resultatObtenu = somme(nbr1, nbr2, nbr3)

    //Assert 
    if (resultatAttendu === resultatObtenu) {
        console.log("PASSED...........");

    } else {
        console.log("FAILED...........");

    }
}


function test_somme_cas_non_normal() {
    //Arrange 
    const nbr1 = 2;
    const nbr2 = 3;

    try {
        somme(nbr1, nbr2);
        console.log("FAILED...........(Aucune erreur n'a éte levé)");
    } catch (erreur) {
        console.log("PASSED...........(erreur a bien été propagé : " + erreur.message );
    }
}

test_somme_cas_non_normal();



