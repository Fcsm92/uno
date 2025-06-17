<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
        <div class="game-container">

            <div class="player" id="player-3">
                <p id="joueur2" class="player-label">Joueur 3</p>
            </div>
            <div class="player" id="player-2">
                <p id="joueur3" class="player-label">Joueur 2</p>
            </div>
            <div class="game-area"> <div class="rivière"></div></div>
            <div class="player" id="player-4">
                <p id="joueur4" class="player-label">Joueur 4</p>
            </div>
            <div class="player" id="player-1"> 
                 <p id="joueur" class="player-label">Moi</p>
            </div>
            <div class ="pioche"></div>
            <div class ="turn"></div>
            <div id="tour-jeu" ></div>
            <div id="changeTour" ></div>
            <div id="couleur" ></div>
        </div>
    
    <script type="module" src="index.js"></script> 
    <script type="module" src="deck.js"></script>
    <script type="module" src="joueur.js"></script>
    <script type="module" src="jeu.js"></script>  
  

</body>
</html>


