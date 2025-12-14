/**
 * Fichier app.js - Logique de la Calculatrice, DOM et Validation
 */

// 1. Récupération des éléments du DOM nécessaires
const form = document.getElementById('calculator-form');
const inputA = document.getElementById('nombreA');
const inputB = document.getElementById('nombreB');
const selectOp = document.getElementById('operation');
const resultatSpan = document.getElementById('resultat');
const historiqueList = document.getElementById('historique-liste');
const erreurMessagesDiv = document.getElementById('erreur-messages');

// NOUVEAUX ÉLÉMENTS POUR LE TOGGLE DE L'HISTORIQUE
const toggleBtn = document.getElementById('toggle-historique-btn');
const historiqueConteneur = document.getElementById('historique-conteneur'); 


// Tableau pour stocker l'historique des opérations
let historiqueOperations = [];

// Fonction pour afficher dynamiquement les erreurs
function afficherErreur(message) {
    erreurMessagesDiv.textContent = message;
    erreurMessagesDiv.style.display = 'block';
}

// Fonction pour masquer la zone d'erreur
function masquerErreur() {
    erreurMessagesDiv.textContent = '';
    erreurMessagesDiv.style.display = 'none';
}

// Fonction principale de calcul
function calculer(nombreA, nombreB, operation) {
    let resultat;
    
    switch (operation) {
        case '+':
            resultat = nombreA + nombreB;
            break;
        case '-':
            resultat = nombreA - nombreB;
            break;
        case '*':
            resultat = nombreA * nombreB;
            break;
        case '/':
            // Validation : Interdire la division par zéro
            if (nombreB === 0) {
                afficherErreur("Erreur : Division par zéro impossible.");
                return null; // Retourne null en cas d'erreur critique
            }
            resultat = nombreA / nombreB;
            break;
        default:
            afficherErreur("Erreur: Opération non valide.");
            return null;
    }
    
    // Si le calcul a réussi, masquer toute erreur précédente
    masquerErreur();
    
    return resultat;
}

// Fonction pour mettre à jour la liste de l'historique dans le DOM
function mettreAJourHistoriqueDOM() {
    // 1. Vider le contenu actuel de la liste
    historiqueList.innerHTML = '';
    
    if (historiqueOperations.length === 0) {
        // Ajout d'un message si l'historique est vide
        const li = document.createElement('li');
        li.className = 'placeholder';
        li.textContent = 'Aucune opération effectuée pour l\'instant.';
        historiqueList.appendChild(li);
        return;
    }
    
    // 2. Parcourir le tableau de l'historique et reconstruire la liste
    // On affiche l'opération la plus récente en premier (inversion de l'ordre)
    historiqueOperations.slice().reverse().forEach(op => {
        const li = document.createElement('li');
        // Format de l'entrée : "A op B = Résultat"
        li.textContent = `${op.a} ${op.op} ${op.b} = ${op.res.toFixed(2)}`;
        historiqueList.appendChild(li);
    });
}

// =================================================================
// AJOUT DE LA LOGIQUE DE BASCULEMENT (TOGGLE)
// =================================================================

if (toggleBtn && historiqueConteneur) {
    
    // --- NOUVEAU : Initialisation pour cacher au chargement ---
    // Si l'historique n'a pas déjà la classe (ce qui est idéalement fait en HTML),
    // on la met ici, et on règle le texte du bouton.
    if (!historiqueConteneur.classList.contains('historique-cache')) {
        historiqueConteneur.classList.add('historique-cache');
    }
    toggleBtn.textContent = "Afficher l'Historique";


    // 1. Gestionnaire d'événement pour le bouton de basculement
    toggleBtn.addEventListener('click', function() {
        // Basculer la classe 'historique-cache' (définie dans style.css)
        historiqueConteneur.classList.toggle('historique-cache');
        
        // Mettre à jour le texte du bouton en fonction de l'état
        if (historiqueConteneur.classList.contains('historique-cache')) {
            toggleBtn.textContent = "Afficher l'Historique";
        } else {
            toggleBtn.textContent = "Masquer l'Historique";
        }
    });
}


// Gestionnaire d'événement pour la soumission du formulaire
form.addEventListener('submit', function(event) {
    // Empêcher le rechargement de la page par défaut
    event.preventDefault();
    
    // Réinitialiser les erreurs
    masquerErreur();

    // 2. Récupération et conversion des valeurs (Utilisation de parseFloat car les inputs sont des nombres)
    const valA = inputA.value;
    const valB = inputB.value;
    const operation = selectOp.value;

    // 3. Validation des données : Champs non vides
    if (valA === '' || valB === '' || isNaN(parseFloat(valA)) || isNaN(parseFloat(valB))) {
        afficherErreur("Veuillez saisir des nombres valides dans les deux champs.");
        resultatSpan.textContent = '??';
        return; // Arrête la fonction si la validation échoue
    }

    const nombreA = parseFloat(valA);
    const nombreB = parseFloat(valB);
    
    // 4. Exécuter le calcul (inclut la validation de division par zéro)
    const resultat = calculer(nombreA, nombreB, operation);
    
    // Si le résultat est null (à cause d'une erreur), on arrête ici
    if (resultat === null) {
        resultatSpan.textContent = 'ERREUR';
        return;
    }

    // 5. Affichage du résultat dans la zone dédiée
    resultatSpan.textContent = resultat.toFixed(2); // Affichage avec 2 décimales
    
    // 6. Ajout de l'opération dans le tableau JS
    const nouvelleOperation = {
        a: nombreA,
        b: nombreB,
        op: operation,
        res: resultat,
        date: new Date().toLocaleTimeString()
    };
    historiqueOperations.push(nouvelleOperation);
    
    // 7. Mise à jour de la section "Historique"
    mettreAJourHistoriqueDOM();
    
    // Optionnel : Afficher l'historique s'il était caché après un nouveau calcul
    if (historiqueConteneur && historiqueConteneur.classList.contains('historique-cache')) {
        historiqueConteneur.classList.remove('historique-cache');
        toggleBtn.textContent = "Masquer l'Historique";
    }
});

// Initialiser l'affichage de l'historique au chargement de la page
// La fonction d'initialisation du masquage (plus haut) s'occupe de l'état visuel.
document.addEventListener('DOMContentLoaded', mettreAJourHistoriqueDOM);