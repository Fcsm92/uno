<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
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
            <div class ="turn" title="Passez votre tour"><ion-icon name="refresh-outline"  size="large"></ion-icon></div>
            <div id="tour-jeu" ></div>
            <div id="changeTour" title="Règles du jeu" ><ion-icon name="help-outline"></ion-icon></div>
            <div id="couleur" ></div>


            <!-- La fenêtre modale -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Règles du jeu:</h2>
         <p><b>Vous ne pouvez jouez que pendant votre tour (indiquez en haut a gauche). </p>

         
          <p>Lors de votre tour, vous pouvez jouez une carte si: </p></b>
          
            <p>  .Elle est de la même couleur que la carte centrale </p>
            <p>  .Elle est de même type ou possède le même nombre que la carte au centre</p>
            <p>  .C'est une carte de type change couleur</p>

         
         <br>
          <div class="carteInfo">
          <img src="images\card-back.png" ><p> Vous permet de piochez une carte lors de votre tour (une seule fois). </p>
        </div>
        <br>
         <div class="carteInfo">
           <ion-icon name="refresh-outline" size="large"></ion-icon> <p> Permet de passer votre tour si vous ne pouvez pas jouer de carte. </p>
        </div>
        <br>
           <div class="carteInfo">
            <img src="images\cards-front\W.png" ><p> Carte change couleur, elle peux être jouer peux importe la carte ou la couleur centrale. </p>
        </div>
        <br>
        
        <div class="carteInfo">
            <img src="images\cards-front\D2R.png" ><p> Ajoute 2 cartes au joueur suivant. </p>
        </div>
         <br>
        <div class="carteInfo">
           <img src="images\cards-front\SkipR.png" > <p> Saute le tour du joueur suivant. </p>
        </div>


    </div>
</div>

        </div>
    
    <script type="module" src="index.js"></script> 
    <script type="module" src="deck.js"></script>
    <script type="module" src="joueur.js"></script>
    <script type="module" src="jeu.js"></script>  
  

</body>
</html>


