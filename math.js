export const ARGUMENT_MANQUANT_ERROR = "Le nombre d'argument est insuffisant";
export const TYPE_ARGUMENT_INVALID = "Le type des arguments est invalide"
export const somme = (a, b, c) => {
    if (a === undefined || b === undefined || c === undefined) {
        throw new Error("Erreur : Un ou plusieurs arguments sont manquants.");
    }
    
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number' || Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
        throw new Error("Erreur : Tous les arguments doivent être des nombres valides.");
    }
    
    return a + b + c;
};


