import { creeDeck } from "./deck.js";
import { melanger } from "./deck.js";
import Joueur from "./joueur.js";

var Deck = creeDeck();
melanger(Deck);
var piochecount = 0;
var direction = 1;
let joueurIndex = 0;
var pile = [];
var couleursTab = ["B", "Y", "G", "R"];
var couleur = "";

function includeCss(chemin) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chemin;
  document.head.appendChild(link);
}

function tirer() {
  console.trace("tirer() appelée");
  console.log("pioche");
  if (Deck.length > 0) {
    var carte = Deck.splice(Deck.length - 1, 1);
    console.log("ajout d'une carte pour le joueur " + joueurIndex);
    tour[joueurIndex].main.push(carte[0]);
    console.log(carte[0]);
    console.log(tour[joueurIndex].main);
  } else {
    deck = pile.splice(0, originalArray.length - 1);
    var carte = Deck.splice(Deck.length - 1, 1);

    tour[joueurIndex].main.push(carte[0]);
  }

  majP(0);
}

function tourSuivant(jouer) {
  var temp;
  jeuAff("couleur", couleur);
  if (jouer == "skip") {
    idCarte2(1);
    temp = joueurIndex - direction;
  } else {
    idCarte();
  }
  if (joueurIndex == 4) {
    temp = 3;
  } else {
    temp = joueurIndex;
  }

  if (tour[temp].main.length == 0) {
    victoire(temp + 1);
  } else {
    joueurIndex = (joueurIndex + direction) % tour.length;
    if (joueurIndex < 0) {
      if (joueurIndex <= -1) {
        joueurIndex = 2;
      }
      if (joueurIndex > -1) {
        joueurIndex = 3;
      }
    }
    if ((joueurIndex - direction) % tour.length < 0) {
      temp = 0;
    } else {
      temp = joueurIndex;
    }

    if (joueurIndex == 0) {
      jeuAff("tour-jeu", "C'est ton tour ");
    } else {
      jeuAff("tour-jeu", "tour du joueur " + (joueurIndex + 1));
    }
    // correction si direction négative et jourIndex était égale a zero

    if (joueurIndex != 0) {
      console.log("tour ia " + (joueurIndex + 1));
      checkMain(tour[joueurIndex].main, 0);
    } else {
      setTimeout(() => {
        console.log("ton tour");
      }, 500);
    }
  }
}

function addPile(carte) {
  const im = document.getElementById("r");

  im.src = carte.image;
  pile.push(carte);
}

function jouerCarte(i, main) {
  // on enlèe la carte de la main et on la rajoute a la pile
  //animJouer(i);
  var jouer;
  const carte = main[i];
  //addPile(carte);
  tour[joueurIndex].main.splice(i, 1);

  //remettre a jour carte div (indexjoueur)

  //action de la carte joué
  switch (carte.type) {
    case "joker":
      var c = Math.floor(Math.random() * 4);
      couleur = couleursTab[c];
      console.log(carte);
      jouer = "joker";

      break;

    case "special":
      switch (carte.valeur) {
        case "skip":
          console.log("skip par joueur" + joueurIndex);

          joueurIndex = joueurIndex + direction;

          console.log("Saute le joueur " + joueurIndex);
          jouer = "skip";

          break;
        case "D2":
          console.log("+2 par joueur" + joueurIndex);
          jouer = "2";

          var carteTemp = Deck.shift();
          // on check si
          console.log(" 1 ere carte ajouté");
          console.log(carteTemp);
          if (direction == -1 && joueurIndex == 0) {
            tour[3].main.push(carteTemp);
          } else {
            tour[(joueurIndex + direction) % tour.length].main.push(carteTemp);
          }

          carteTemp = Deck.shift();
          console.log(" 2 ème carte ajouté");
          console.log(carteTemp);
          if (direction == -1 && joueurIndex == 0) {
            tour[3].main.push(carteTemp);
            console.log("Main après les 2 ajout");
            console.log(tour[3].main);
          } else {
            tour[(joueurIndex + direction) % tour.length].main.push(carteTemp);
            console.log("Main après les 2 ajout");
            console.log(tour[(joueurIndex + direction) % tour.length].main);
          }

          majP(1);

          break;
        case "I":
          console.log("sens inverser par joueur" + joueurIndex);
          jouer = "inverse";

          direction = direction * -1;
          break;
      }
      break;

    case "normal":
      jouer = "normal";

      console.log(carte);
      break;
  }
  setTimeout(() => {
    majP(0);
  }, 1500);
  //majP(0);

  setTimeout(() => {
    tourSuivant(jouer);
  }, 3000);
  //tourSuivant();
}

function checkCJoueur(i) {
  console.log(i);
  var carte = tour[0].main[i];
  console.log(tour[0].main[i]);
  console.log(tour[0].main);
  console.log(carte);

  if (carte.type == "joker") {
    piochecount = 0;
    animJouer(i, "jouer");

    addPile(carte);
    setTimeout(() => {
      jouerCarte(i, tour[0].main);
    }, 1000);
  } else {
    if (carte.couleur == couleur) {
      piochecount = 0;
      addPile(carte);
      animJouer(i, "jouer");
      setTimeout(() => {
        jouerCarte(i, tour[0].main);
      }, 1000);
    } else {
      if (carte.valeur == pile[pile.length - 1].valeur) {
        addPile(carte);
        piochecount = 0;
        animJouer(i, "jouer");
        couleur = carte.couleur;
        setTimeout(() => {
          jouerCarte(i, tour[0].main);
        }, 1000);
      } else {
        console.log(i);
        console.log("Mauvaise carte");
      }
    }
  }
}

function checkMain(main, pioche) {
  var choix = -1;
  var jouer = false;
  console.log("check de la main ia .");

  for (var i = 0; i < main.length; i++) {
    if (main[i].type == "joker" && jouer == false) {
      choix = i;
      jouer = true;
    }
  }

  //index de la carte choisi ou non

  // on regarde si carte change couleur

  // carte pouvant etre jouer
  if (jouer == true) {
    animJouer(choix, "jouer");
    const carte = main[choix];
    addPile(carte);
    //setTimeout(()=>{jouerCarte(choix,main);},2000);
    jouerCarte(choix, main);
  }

  //aucune carte joker
  else {
    console.log("check carte special .");
    //on regarde si, des carte spéciale
    for (var i = 0; i < main.length; i++) {
      if (main[i].type == "special" && main[i].couleur == couleur) {
        choix = i;
        jouer = true;
      }
    }

    // Si on peux jouer une carte spéciale
    if (jouer == true) {
      animJouer(choix, "jouer");
      const carte = main[choix];
      addPile(carte);
      //setTimeout(()=>{jouerCarte(choix,main);},2000);
      jouerCarte(choix, main);
    } else {
      // on checke si on a un carte de même couleur
      for (var i = 0; i < main.length; i++) {
        if (main[i].couleur == couleur) {
          choix = i;
          jouer = true;
        }
      }

      // si on peux jouer une carte de la même couleur
      if (jouer == true) {
        animJouer(choix, "jouer");
        const carte = main[choix];
        addPile(carte);
        //setTimeout(()=>{jouerCarte(choix,main);},2000);
        jouerCarte(choix, main);
      }

      //on dois piocher
      else {
        //on checke si on a des carte la même valeurs
        for (var i = 0; i < main.length; i++) {
          if (main[i].valeur == pile[pile.length - 1].valeur) {
            choix = i;
            jouer = true;
            couleur = main[i].couleur;
          }
        }

        if (jouer == true) {
          animJouer(choix, "jouer");
          const carte = main[choix];
          addPile(carte);
          //setTimeout(()=>{jouerCarte(choix,main);},2000);
          jouerCarte(choix, main);
        } else {
          // si on a pas deja piocher
          if (pioche == 0 && joueurIndex !== 0) {
            tirer();
            animJouer(0, "piocher");
            setTimeout(() => {
              checkMain(main, pioche + 1);
            }, 3000);
            //checkMain(main,pioche+1);
          }

          //Si on a piocher et que l'on peux tjr pas jouer
          else {
            setTimeout(() => {
              tourSuivant();
            }, 2000);
            //tourSuivant();
          }
        }
      }
    }
  }
}

function creerJoueur(deckC) {
  var joueur = [];

  for (var i = 0; i < 4; i++) {
    var main = deckC.splice(0, 7);
    if (i == 0) {
      var joueur1 = new Joueur("main", main);
      joueur.push(joueur1);
    } else {
      var joueurtemp = new Joueur("joueur", main);
      joueur.push(joueurtemp);
    }
  }
  pile = deckC.splice(0, 1);
  return joueur;
}

var tour = creerJoueur(Deck);

function InitPlateau() {
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 7; i++) {
      var n = j + 1;
      var nom = "player-" + n;

      const conteneur = document.getElementById(nom);
      const nDiv = document.createElement("div");

      const im = document.createElement("img");
      if (j == 0) {
        var image = tour[j].main[i].image;
        var s = image;
        im.src = s;
      } else {
        im.src = "./images/card-back.png";
      }

      nDiv.style.height = "auto%";
      im.style.width = "100%";
      im.style.height = "auto";
      im.className = "carte";
      if (j == 0) {
        nDiv.className = "jouable";
        nDiv.id = i;
        nDiv.addEventListener("click", function () {
          //Si c'est le tour du joueur
          if (joueurIndex == 0) {
            //On prend l'index de la carte dans la main
            var i = parseInt(nDiv.id, 10);
            //On check si la carte peut être jouer
            checkCJoueur(i);
          } else {
            console.log("Attendez votre tour.");
          }
        });
      }
      nDiv.id = i;
      conteneur.appendChild(nDiv);

      nDiv.appendChild(im);
    }
  }

  // image pour la carte de la rivière
  const conteneur = document.getElementsByClassName("rivière");
  const im = document.createElement("img");
  im.src = pile[0].image;
  im.id = "r";
  im.style.width = "100%";
  im.style.height = "90%";
  im.className = "carte";
  conteneur[0].appendChild(im);
  couleur = pile[pile.length - 1].couleur;

  //image pour la pioche
  const conteneur2 = document.getElementsByClassName("pioche");
  const im2 = document.createElement("img");
  im2.src = "./images/card-back.png";

  im2.style.width = "100%";
  im2.style.height = "90%";
  im2.className = "carte";
  conteneur2[0].appendChild(im2);

  // event pioche du joueur
  conteneur2[0].addEventListener("click", function () {
    //Si c'est le tour du joueur
    if (joueurIndex == 0 && piochecount == 0) {
      ++piochecount;

      animJouer(0, "piocher");
      setTimeout(() => {
        tirer();
      }, 2000);
      console.log(piochecount);
      // tirer(); //On prend l'index de la carte dans la main
    } else {
      console.log("Attendez votre tour. OU vous avez deja piochez");
    }
  });

  const conteneur3 = document.getElementsByClassName("turn");

  conteneur3[0].addEventListener("click", function () {
    //Si c'est le tour du joueur
    if (joueurIndex == 0) {
      piochecount = 0;
      tourSuivant();
    } else {
      console.log("Attendez votre tour pour pouvoir passer.");
    }
  });

  jeuAff("tour-jeu", "tour du joueur " + joueurIndex);
  jeuAff("couleur", couleur);
}

function bloquer(ms) {
  const fin = Date.now() + ms;

  while (Date.now() < fin) {}
}

function majP(nombre) {
  if (nombre == 0) {
    // on récupère les div du joueur
    var temp;
    if (joueurIndex == 4 || joueurIndex == -1) {
      temp = 0;
    } else {
      temp = joueurIndex;
    }
    var nom = "player-" + (temp + 1);
    console.log("Mise a jour du joueur " + nom);
    var ndiv = document.getElementById(nom);
    var childe = ndiv.children;
    var tailleMain = tour[temp].main.length;

    //on compte le nombre de div enfant
    var nombreDivEnfants = 0;
    for (var i = 0; i < childe.length; i++) {
      if (childe[i].tagName.toLowerCase() == "div") {
        nombreDivEnfants++;
      }
    }

    //Si main plus grande
    if (tailleMain > nombreDivEnfants) {
      // on ajoute une div

      for (var i = nombreDivEnfants; i < tailleMain; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = tailleMain - 1;

        const im = document.createElement("img");
        var image;
        if (joueurIndex == 0) {
          image = tour[joueurIndex].main[i].image;
        } else {
          image = "./images/card-back.png";
        }

        var s = image;
        im.src = s;

        im.style.width = "100%";
        im.style.height = "auto";
        im.className = "carte";
        if (joueurIndex == 0) {
          newDiv.classList.add("jouable");
          newDiv.addEventListener("click", function () {
            //Si c'est le tour du joueur
            if (joueurIndex == 0) {
              //On prend l'index de la carte dans la main

              //On check si la carte peut être jouer
              checkCJoueur(this.id);
            } else {
              console.log("Attendez votre tour.");
            }
          });
        }

        newDiv.appendChild(im);
        ndiv.appendChild(newDiv);

        /*
        for (var i = 0; i < childe.length; i++) {
          if (childe[i].tagName.toLowerCase() == "div") {
            var div = childe[i];
            console.log(childe[i]);

            console.log(div);
            var j = String(parseInt(div.id, 10));
            console.log("j égale a : " + j);
            childe[i].id = String(j);
            console.log(childe[i]);
          }
        }
          */
      }
    }
    // si main plus petite
    else {
      if (tailleMain < childe.length) {
        //on enlève la dernière div

        if (joueurIndex == 0) {
          //on met a jour les div restante
          for (var i = 0; i < tailleMain; i++) {
            childe[i].src = tour[joueurIndex].main[i].image;
          }
        } else {
          //on met a jour les div restante
          for (var i = 0; i < tailleMain; i++) {
            childe[i].src = "./images/card-back.png";
          }
        }

        // setTimeout(()=>{ndiv.removeChild(ndiv.lastElementChild);},1000);
      }
    }
  } else {
    if (nombre == 1) {
      console.log("Ajout de carte pour le joueur " + (joueurIndex + direction));
      // on récupère les div du joueur
      var nom;
      if (direction == -1 && joueurIndex == 0 && nombre != 0) {
        nom = "player-4";
      }
      if (joueurIndex == 0 && direction == -1) {
        nom = "player-4";
      } else {
        nom = "player-" + (((joueurIndex + direction) % tour.length) + 1);
      }
    }
    console.log(nom);

    const ndiv = document.getElementById(nom);
    console.log(ndiv);
    var childe = ndiv.children;
    var tailleMain;
    if (direction == -1 && joueurIndex == 0) {
      tailleMain = tour[3].main.length;
      console;
      console.log("Taille de la main ");
      console.log(tailleMain);
    } else {
      tailleMain = tour[(joueurIndex + direction) % tour.length].main.length;
      console;
      console.log("Taille de la main ");
      console.log(tailleMain);
    }
    //Si main plus grande
    if (tailleMain > childe.length) {
      // on ajoute une div
      for (var i = childe.length - 1; i < tailleMain; i++) {
        console.log("taille de la main " + tailleMain);
        console.log(i);
        const newDiv = document.createElement("div");
        const im = document.createElement("img");
        var image;

        if ((joueurIndex + direction) % tour.length == 0) {
          console.log((joueurIndex + direction) % tour.length);
          console.log(tour[(joueurIndex + direction) % tour.length].main);
          console.log("valeur de i " + i);
          image =
            tour[(joueurIndex + direction) % tour.length].main[i - 1].image;
        } else {
          image = "./images/card-back.png";
        }

        /*        
                    if (direction==(-1) && joueurIndex==0 && nombre!=0)
                        {
                            image=tour[3].main[i].image;
                        }
                    else

                        {
                            image=tour[(joueurIndex+direction)%tour.length].main[i].image;
                        }
                    
                */
        var s = image;
        im.src = s;

        im.style.width = "100%";
        im.style.height = "auto";
        im.className = "carte";
        newDiv.id = i - 1;
        if (nom == "player-1") {
          newDiv.classList.add("jouable");
          newDiv.addEventListener("click", function () {
            //Si c'est le tour du joueur
            if (joueurIndex == 0) {
              //On prend l'index de la carte dans la main
              var i = parseInt(newDiv.id, 10);
              //On check si la carte peut être jouer
              checkCJoueur(this.id);
            } else {
              console.log("Attendez votre tour.");
            }
          });
        }
        console.log("ajout dan la div ");
        console.log(ndiv);
        console.log(newDiv);
        ndiv.appendChild(newDiv);
        newDiv.appendChild(im);
      }
    }
    // si main plus petite
    else {
      if (tailleMain < childe.length) {
        //on enlève la dernière div
        ndiv.removeChild(ndiv.lastElementChild);

        //on met a jour les div restante
        for (var i = 0; i < tailleMain; i++) {
          if ((joueurIndex + direction) % tour.length == 0) {
            childe[i].lastChild.src =
              tour[(joueurIndex + direction) % tour.length].main[i].image;
          } else {
            childe[i].lastChild.src = "./images/card-back.png";
          }
        }
      }
    }
  }
}

function idCarte() {
  console.log("mis a jour des id des carte");
  var nom = "player-" + (joueurIndex + 1);
  const div = document.getElementById(nom);
  var childe = div.children;

  var carteIndex = 0; // Compteur pour les vraies cartes

  for (var i = 0; i < childe.length; i++) {
    // Si c'est une div de carte (contient une image avec classe "carte")
    if (childe[i].tagName.toLowerCase() === "div") {
      childe[i].id = carteIndex;
      carteIndex++;
    }
    // Sinon, on ignore cet élément (probablement un <p> ou autre)
  }
  console.log();
}

function idCarte2(i) {
  if (joueurIndex == 4) {
    joueur = 1;
  }
  if (joueurIndex == -1) {
    joueur = 2;
  }
  var joueur = joueurIndex - direction;
  console.log("direction   " + direction);

  console.log("mis a jour des id des carte du joueur " + joueur);

  var nom = "player-" + (joueur + 1);
  const div = document.getElementById(nom);
  var childe = div.children;

  var carteIndex = 0; // Compteur pour les vraies cartes

  for (var i = 0; i < childe.length; i++) {
    // Si c'est une div de carte (contient une image avec classe "carte")
    if (childe[i].tagName.toLowerCase() === "div") {
      childe[i].id = carteIndex;
      carteIndex++;
    }
    // Sinon, on ignore cet élément (probablement un <p> ou autre)
  }
  console.log();
}

function animJouer(i, destination) {
  const conteneur = document.getElementsByClassName("game-container");
  console.log(i);
  var nom;
  switch (destination) {
    case "piocher":
      //on cree la fausse div pioche
      const depart = creerIllusionPioche();
      // on l'ajoute au site
      conteneur[0].appendChild(depart);

      //evènement suprresion a la fin de l'animation
      addEventListener("transitionend", () => {
        depart.remove();
      });

      //information postion d'arrivée
      nom = "player-" + (joueurIndex + 1);
      const divP = document.getElementById(nom);
      const childP = divP.children;
      var n = tour[joueurIndex].main.length - 2;
      const destination = divP;
      console.log(destination);

      //
      const cJRect = depart.getBoundingClientRect();
      const JRect = destination.getBoundingClientRect();

      const deltaX = JRect.right - cJRect.right;
      const deltaY = JRect.top - cJRect.top;

      //transfo

      depart.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      depart.classList.add("animate");
      break;

    case "jouer":
      nom = "player-" + (joueurIndex + 1);

      console.log(nom);
      const divJ = document.getElementById(nom);
      console.log(divJ);
      const child = divJ.children;
      console.log(child);
      console.log(i);
      i++;
      console.log(child[i]);
      const carteJouer = child[i];
      console.log(carteJouer);
      const img = carteJouer.children;

      img[0].src = tour[joueurIndex].main[i - 1].image;

      addEventListener("transitionend", () => {
        carteJouer.remove();
      });

      const riv = document.getElementsByClassName("rivière");

      const cJ2Rect = carteJouer.getBoundingClientRect();
      const rivRect = riv[0].getBoundingClientRect();

      const deltaX2 = rivRect.left - cJ2Rect.left;
      const deltaY2 = rivRect.top - cJ2Rect.top;

      //transfo

      carteJouer.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
      carteJouer.classList.add("animate");
      break;
  }
}

function jeuAff(id, texte) {
  const divTour = document.getElementById(id);
  divTour.textContent = texte;
}

function waitAnim(elem) {
  return new Promise((resolve) => {
    elem.addEventListener("transitionend", resolve, { once: true });
  });
}

function creerIllusionPioche() {
  //création d'un div  pour l'animation pioche
  // const conteneur =document.getElementsByClassName("game-container");
  const div = document.createElement("div");

  div.id = "animeP";

  // Créer une balise <style>
  const style = document.createElement("style");

  // Définir le contenu CSS
  style.textContent = `
        
#animeP{
    position: absolute;
    width: 10%;
    height: 15%;
    border:  solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-350%, 250%);
 


}
        `;

  const im = document.createElement("img");
  im.src = "./images/card-back.png";
  im.style.width = "100%";
  im.style.height = "90%";

  div.appendChild(style);
  div.appendChild(im);
  //div.appendChild(im);
  //conteneur[0].appendChild(div);
  return div;
}

function victoire(i) {
  // Créer la div principale

  const victoryDiv = document.createElement("div");
  victoryDiv.id = "victoryMessage";
  if (i == 1) {
    victoryDiv.innerHTML =
      `
      <p>Bravo tu` +
      ` a gagné</p>
      <button id="newGameBtn">Nouvelle partie</button>
    `;
  } else {
    victoryDiv.innerHTML =
      `
    <p>Bravo le joueur ` +
      i +
      ` a gagné</p>
    <button id="newGameBtn">Nouvelle partie</button>
  `;
  }

  // Appliquer des styles à la div
  const style = document.createElement("style");
  style.textContent = `
  #victoryMessage {
    position: fixed;
    top: -100px; /* Position initiale hors de l'écran */
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    padding: 20px;
    background-color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: top 1.5s ease-out, opacity 1s ease-in;
  }

  #newGameBtn {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }

  #newGameBtn:hover {
    background-color: #218838;
  }
`;

  // Ajouter la div et les styles au document
  document.head.appendChild(style);
  document.body.appendChild(victoryDiv);

  // Lancer l'animation après un léger délai
  setTimeout(() => {
    victoryDiv.style.top = "50%"; // Descend jusqu'au milieu de la page
    victoryDiv.style.opacity = "1";
  }, 100);

  // Ajouter un gestionnaire d'événement pour le bouton
  document.getElementById("newGameBtn").addEventListener("click", () => {
    document.body.removeChild(victoryDiv); // Supprimer la div au clic
    window.location.reload();
  });
}

// Obtenez la fenêtre modale
var modal = document.getElementById("myModal");

// Obtenez le bouton qui ouvre la fenêtre modale par son ID
var btn = document.getElementById("changeTour");

// Obtenez l'élément <span> qui ferme la fenêtre modale
var span = document.getElementsByClassName("close")[0];

// Lorsque l'utilisateur clique sur le bouton, ouvrez la fenêtre modale
btn.onclick = function () {
  modal.classList.add("show"); // Ajoute la classe show pour afficher le modal
};

// Lorsque l'utilisateur clique sur <span> (x), fermez la fenêtre modale
span.onclick = function () {
  modal.classList.remove("show"); // Supprime la classe show pour masquer le modal
};

// Lorsque l'utilisateur clique n'importe où en dehors de la fenêtre modale, fermez-la
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("show"); // Supprime la classe show pour masquer le modal
  }
};

InitPlateau();

console.log("Main du joueur 0");
console.log(tour[0].main);
