<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche PHP : Variables et Affichage</title>
    <link rel="stylesheet" href="style.css"> 
</head>
<body>
    
    <header>
        <h1>Fiche Récapitulative : Introduction au PHP</h1>
        <p>Ce contenu est généré dynamiquement côté serveur par le moteur PHP.</p>
    </header>

    <main>
        
        <section id="declaration-variables">
            <h2>1. Déclaration des Variables</h2>
            
            <?php
            // -------------------------------------------------------------------
            // Partie Déclaration
            // Toutes les variables PHP commencent par le signe dollar ($)
            // -------------------------------------------------------------------

            // Variable de type Chaîne de caractères (string)
            $nom_utilisateur = "Alice Dupont";
            
            // Variable de type Entier (integer)
            $annee_courante = 2025;
            
            // Variable de type Nombre à virgule flottante (float)
            $taux_tva = 0.20; // 20%
            
            // Variable de type Booléen (boolean)
            $est_actif = true;
            
            ?>
            
            <div class="info-block">
                <h3>Affichage des Types Simples</h3>
                <ul>
                    <li>Nom de l'utilisateur (String) : 
                        <strong><?php echo $nom_utilisateur; ?></strong>
                    </li>
                    
                    <li>Année courante (Integer) : 
                        <strong><?php echo $annee_courante; ?></strong>
                    </li>
                    
                    <li>Taux TVA (Float) : 
                        <strong><?php echo $taux_tva * 100; ?>%</strong>
                    </li>
                    
                    <li>Statut Actif (Boolean) : 
                        <strong><?php echo $est_actif ? "Oui" : "Non"; ?></strong>
                    </li>
                </ul>
            </div>
            
        </section>

        <section id="operations-calculs">
            <h2>2. Opérations et Affichage de Résultats</h2>

            <?php
            // -------------------------------------------------------------------
            // Partie Calculs
            // -------------------------------------------------------------------
            
            $nombre1 = 50;
            $nombre2 = 7;
            
            // Calculs simples
            $somme = $nombre1 + $nombre2;
            $difference = $nombre1 - $nombre2;
            $produit = $nombre1 * $nombre2;
            $quotient = $nombre1 / $nombre2;
            $reste = $nombre1 % $nombre2;
            
            // Concaténation de chaînes
            $message_complet = "Bonjour " . $nom_utilisateur . ", bienvenue en " . $annee_courante . ".";
            
            ?>

            <div class="info-block">
                <h3>Opérations Mathématiques</h3>
                <ul>
                    <li>Addition (<?php echo $nombre1; ?> + <?php echo $nombre2; ?>) : 
                        <strong><?php echo $somme; ?></strong>
                    </li>
                    <li>Soustraction (<?php echo $nombre1; ?> - <?php echo $nombre2; ?>) : 
                        <strong><?php echo $difference; ?></strong>
                    </li>
                    <li>Multiplication (<?php echo $nombre1; ?> * <?php echo $nombre2; ?>) : 
                        <strong><?php echo $produit; ?></strong>
                    </li>
                    <li>Division (<?php echo $nombre1; ?> / <?php echo $nombre2; ?>) : 
                        <strong><?php echo number_format($quotient, 2); ?></strong>
                    </li>
                    <li>Modulo (Reste de la division) : 
                        <strong><?php echo $reste; ?></strong>
                    </li>
                </ul>
            </div>
            
            <div class="info-block">
                <h3>Concaténation de Chaînes</h3>
                <p>
                    <?php 
                    // Affichage direct d'une variable interpolée dans une chaîne
                    echo "Le message concaténé est : <strong>$message_complet</strong>";
                    ?>
                </p>
            </div>
        </section>

        <section id="syntaxe-php">
            <h2>3. Syntaxe d'Affichage (Rappel)</h2>
            <p>On utilise <code>&lt;?php echo ...; ?&gt;</code> pour insérer la valeur d'une variable ou d'un calcul.</p>
            <p>Exemple de code PHP exécuté :</p>
            <pre><code>&lt;?php
    $annee = 2025;
    echo "Nous sommes en " . $annee . ";
?&gt;</code></pre>
            <p>Résultat affiché : <strong>Nous sommes en <?php echo $annee_courante; ?></strong></p>
        </section>

        <p><a href="index.html" class="button-retour">Retour à la Calculatrice (HTML/JS)</a></p>

    </main>

    <footer>
        <p>&copy; TP 6 - Fiche PHP | Réalisé par [Votre Nom]</p>
    </footer>
    
</body>
</html>