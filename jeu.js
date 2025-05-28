import { creeDeck } from "./deck.js";
import { melanger } from "./deck.js";
import Joueur from "./joueur.js";

var Deck=creeDeck();
melanger(Deck);
var piochecount=0;
var direction=1;
let joueurIndex=0;
var pile =[];
var couleursTab= ['B','Y','G','R'];
var couleur="";




function includeCss(chemin){
    const link=document.createElement('link');
    link.rel ='stylesheet' ;
    link.href = chemin ;
    document.head.appendChild(link);
}



function tirer()
{
   
    console.log("pioche");
    if (Deck.length>0)
    {
        var carte =Deck.splice(Deck.length-1,1);
      
        tour[joueurIndex].main.push(carte[0]);

    }
    else 
    {
        deck=pile.splice(0, originalArray.length - 1);
        var carte =Deck.splice(Deck.length-1,1);
      
        tour[joueurIndex].main.push(carte[0]);

    }
    majP(0);
    
}


function tourSuivant(){
    
   
   
    if (tour[joueurIndex].main.length ==0)
    {
        victoire(joueurIndex);
    }

    else
    {
        joueurIndex= (joueurIndex+direction)%tour.length;
    jeuAff("tour-jeu","tour du joueur "+joueurIndex);
    // correction si direction négative et jourIndex était égale a zero
    if (joueurIndex<0)
        {
            joueurIndex=3;
        }
        jeuAff("couleur",couleur);
 
    
    if (joueurIndex!=0)
        {
            
            console.log("tour ia");
            checkMain(tour[joueurIndex].main,0);
       
        }
    else
        {
            setTimeout(()=>{console.log("ton tour");},500);
                       
        }
    }
    

}


function addPile(carte)
{
    

    const im =document.getElementById("r");
    
    im.src=carte.image;
    pile.push(carte);
    
     

}

function jouerCarte(i,main)
{
    // on enlèe la carte de la main et on la rajoute a la pile
    //animJouer(i);
    
    const carte =main[i];
    //addPile(carte);
    tour[joueurIndex].main.splice(i,1);
    
    
    
    //remettre a jour carte div (indexjoueur)


//action de la carte joué
    switch(carte.type)
    {
        case "joker":
            var c=Math.floor(Math.random()*4);
            couleur=couleursTab[c];
            console.log(carte);

            break;

        case "special":

            switch(carte.valeur)
            {
                case "skip":
                    console.log("skip par joueur"+joueurIndex);

                    joueurIndex= (joueurIndex+direction)%tour.length;
                    break;
                case "D2":
                    console.log("+2 par joueur"+joueurIndex);
                    
                    
                    var carteTemp=Deck.shift();
                    // on check si
                    if (direction== (-1) && joueurIndex==0)
                        {
                            tour[3].main.push(carteTemp);
                        }
                    else
                        {
                            tour[(joueurIndex+direction)%tour.length].main.push(carteTemp);
                        }
                    
                    carteTemp=Deck.shift();
                    if (direction== (-1) && joueurIndex==0)
                        {
                            tour[3].main.push(carteTemp);
                        }
                    else
                        {
                            tour[(joueurIndex+direction)%tour.length].main.push(carteTemp);
                        }

                    majP(1);

                    break;
                case "I":
                    console.log("sens inverser par joueur"+joueurIndex);

                    direction =direction * (-1);
                    break;
        
            }
            break;

        case "normal":
            console.log(carte);
            break;

    

    }
    setTimeout(()=>{majP(0);},1500);
    //majP(0);
    setTimeout(()=>{tourSuivant();},3000);
    //tourSuivant();
    
     
}




function checkCJoueur(i)
{
    var carte=tour[0].main[i];

    if(carte.type=="joker")
    {   
        piochecount=0;
        animJouer(i,"jouer");
        
        addPile(carte);
        setTimeout(()=>{jouerCarte(i,tour[0].main);},1000);
        
    }

    else
    {
        if(carte.couleur==couleur)
            {
                piochecount=0;
                addPile(carte);
                animJouer(i,"jouer");
                setTimeout(()=>{jouerCarte(i,tour[0].main);},1000);
                
            }
        else
        {

            if (carte.valeur==pile[pile.length-1].valeur)
            {
                addPile(carte);
                piochecount=0;
                animJouer(i,"jouer");
                couleur=carte.couleur;
                setTimeout(()=>{jouerCarte(i,tour[0].main);},1000);
            }

            else
            {
                console.log("Mauvaise carte");
            }
           

        }
    }

}

function checkMain(main, pioche)
{
    
    var choix=-1;
    var jouer =false;   
    console.log("check de la main ia .");


    for (var i=0;i<main.length;i++){
        if (main[i].type=='joker' && jouer==false )
            {
                choix=i;
                jouer=true
            }
    }
    
 
        //index de la carte choisi ou non        
        
        
        // on regarde si carte change couleur
     
    // carte pouvant etre jouer       
    if (jouer == true)
    {
        animJouer(choix,"jouer");
            const carte =main[choix];
            addPile(carte);
            //setTimeout(()=>{jouerCarte(choix,main);},2000);
            jouerCarte(choix,main);
    }


    //aucune carte joker
    else
    {
        console.log("check carte special .");
        //on regarde si, des carte spéciale
        for (var i=0;i<main.length;i++)
            {
                if (main[i].type=='special' && main[i].couleur==couleur )
                    {
                       choix=i;
                       jouer=true;
                       
                    }
        
            }

            // Si on peux jouer une carte spéciale
            if (jouer == true)
            {
                
                animJouer(choix,"jouer");
                const carte =main[choix];
                addPile(carte);
                //setTimeout(()=>{jouerCarte(choix,main);},2000);
                jouerCarte(choix,main);
            }

            else
            {
                // on checke si on a un carte de même couleur 
                for (var i=0;i<main.length;i++)
                 {
                     if (main[i].couleur==couleur )
                    {
                        choix=i;
                        jouer=true;
                    

                    }
                
                }
               
                // si on peux jouer une carte de la même couleur
                if (jouer == true)
                    {
                        animJouer(choix,"jouer");
                        const carte =main[choix];
                        addPile(carte);
                        //setTimeout(()=>{jouerCarte(choix,main);},2000);
                        jouerCarte(choix,main);
                    }
                    
                //on dois piocher
                else
                {

                    //on checke si on a des carte la même valeurs
                    for (var i=0;i<main.length;i++)
                        {
                            if (main[i].valeur==pile[pile.length-1].valeur )
                           {
                               choix=i;
                               jouer=true;
                               couleur=main[i].couleur;
       
                           }
                       
                       }

                    if (jouer == true)
                    {
                        animJouer(choix,"jouer");
                        const carte =main[choix];
                        addPile(carte);
                        //setTimeout(()=>{jouerCarte(choix,main);},2000);
                        jouerCarte(choix,main);
                    }

                    else 
                    {

                    // si on a pas deja piocher
                        if (pioche==0)
                            {
                                tirer();
                                animJouer(0,"piocher");
                                setTimeout(()=>{checkMain(main,pioche+1);},3000);
                                //checkMain(main,pioche+1);
                            }
        
                            //Si on a piocher et que l'on peux tjr pas jouer
                            else
                            {
                                setTimeout(()=>{ tourSuivant();},2000);
                                //tourSuivant();               
                            }
                    }
                
                }
            
        }

        
        
    }
}  



function creerJoueur(deckC)
    {
        var joueur=[];
        
        for(var i=0;i<4;i++)
            {
                var main=deckC.splice(0,7);
                if (i==0)
                    {
                        var joueur1= new Joueur("main",main)
                        joueur.push(joueur1)
                    }
                else
                    {
                        var joueurtemp= new Joueur("joueur",main)
                        joueur.push(joueurtemp)
                    }
                  
            }
            pile=deckC.splice(0,1);
            return joueur; 

    }

   






var tour= creerJoueur(Deck);


function InitPlateau()
{
    for(var j=0;j<4;j++)
        {
            for (var i=0;i<7;i++)
                {
                    var n=j+1
                    var nom="player-"+n;
                   
                    const conteneur =document.getElementById(nom);
                    const nDiv= document.createElement('div');
                    
                    const im=document.createElement('img');
                    if (j==0)
                    {
                        var image=tour[j].main[i].image;
                        var s= image;
                        im.src=s;
                    }
                   
                   
                    else
                    {
                        im.src="./images/card-back.png";
                    }
                   
                    nDiv.style.border= "dashed";
                    nDiv.style.height= "auto%";
                    im.style.width="100%";
                    im.style.height="auto";
                    im.className="carte";
                    if (j==0)
                        {
                            nDiv.className="jouable";
                            nDiv.id=i;
                            nDiv.addEventListener
                            ('click', function()
                                {
                                    //Si c'est le tour du joueur
                                    if (joueurIndex==0)
                                        {
                                            //On prend l'index de la carte dans la main
                                            var i= parseInt(nDiv.id,10);
                                            //On check si la carte peut être jouer 
                                            checkCJoueur(i);
                                        }
                                    else
                                        {
                                            console.log("Attendez votre tour.");
                                        }
                                    
                                    
                                }
                            );
                        } 
                    nDiv.id=i;               
                    conteneur.appendChild(nDiv);

                    nDiv.appendChild(im);
                    
                    
                }
        }


    // image pour la carte de la rivière
    const conteneur =document.getElementsByClassName("rivière");
    const im=document.createElement('img');
    im.src=pile[0].image;
    im.id="r";
    im.style.width="100%";
    im.style.height="90%";
    im.className="carte"; 
    conteneur[0].appendChild(im);  
    couleur=pile[pile.length-1].couleur;


    //image pour la pioche
    const conteneur2 =document.getElementsByClassName("pioche");
    const im2=document.createElement('img');
    im2.src="./images/card-back.png";
    
    

    im2.style.width="100%";
    im2.style.height="90%";
    im2.className="carte"; 
    conteneur2[0].appendChild(im2);


 

    // event pioche du joueur
    conteneur2[0].addEventListener
        ('click', function() {
                //Si c'est le tour du joueur
                if (joueurIndex == 0 && piochecount == 0) {
                    ++piochecount;

                    animJouer(0,"piocher");
                    setTimeout(()=>{tirer();},2000);
                    console.log(piochecount);
                   // tirer(); //On prend l'index de la carte dans la main
                }

                else {
                    console.log("Attendez votre tour. OU vous avez deja piochez");
                }


            }
        );

        const conteneur3 =document.getElementsByClassName("turn");
        const im3=document.createElement('img');
        im3.src="./images/turn.png";
        
        im3.style.width="100%";
        im3.style.height="90%";
        im3.className="carte"; 
        conteneur3[0].appendChild(im3);   
        conteneur3[0].addEventListener
        ('click', function() {
                //Si c'est le tour du joueur
                if (joueurIndex == 0 ) {
                    piochecount=0;
                    tourSuivant();
                }

                else {
                    console.log("Attendez votre tour pour pouvoir passer.");
                }


            }
        );


    const conteneur4 =document.getElementById("changeTour");
    const im4=document.createElement('img');
    im4.src="./images/flecheD.jpg";
    im4.style.width="90%";
    im4.style.height="90%";
    im4.className="carte"; 
    conteneur4.appendChild(im4);
      
    jeuAff("tour-jeu","tour du joueur "+joueurIndex);
    jeuAff("couleur",couleur);
    


    
    
}









function bloquer(ms)
{
    const fin =Date.now()+ms;
    
    while (Date.now() <fin)
    {
    

    }
}


function majP(nombre)
{
    
    if (nombre == 0)
    {
       
        // on récupère les div du joueur
        var nom ="player-"+(joueurIndex+1);
        const ndiv=document.getElementById(nom);
        var childe= ndiv.children;
        var tailleMain=tour[joueurIndex].main.length;

        
        //Si main plus grande 
        if (tailleMain>childe.length)
            {
                // on ajoute une div
                for(var i = childe.length;i<tailleMain;i++ ) 
                {    
                const newDiv= document.createElement('div');       
                const im=document.createElement('img');
                var image;
                if (joueurIndex==0)
                {
                    image=tour[joueurIndex].main[i].image;
                }
                else
                {
                    image="./images/card-back.png";
                }
                
                
                
            
                var s= image;
                im.src=s
                newDiv.style.border= "dashed";
                im.style.width="100%";
                im.style.height="auto";
                im.className="carte";
                if (joueurIndex==0)
                    {
                        newDiv.classList.add("jouable");
                        newDiv.addEventListener
                        ('click', function()
                        {
                            //Si c'est le tour du joueur
                            if (joueurIndex==0)
                                {
                                    //On prend l'index de la carte dans la main
                                    var i= parseInt(newDiv.id,10);
                                    //On check si la carte peut être jouer 
                                    checkCJoueur(i);
                                }
                            else
                                {
                                    console.log("Attendez votre tour.");
                                }
                            
                            
                        }
                        );
                    }
                
                
                ndiv.appendChild(newDiv);
                newDiv.appendChild(im);
                }

            }
        // si main plus petite
        else 
            {
                if (tailleMain<childe.length)
                    {
                        //on enlève la dernière div
                        
                        if (joueurIndex==0)
                        {
                            //on met a jour les div restante
                            for(var i=0;i<tailleMain;i++)
                            {
                                childe[i].lastChild.src=tour[joueurIndex].main[i].image;
                            }
                        }

                        else 
                        {
                            //on met a jour les div restante
                            for(var i=0;i<tailleMain;i++)
                            {
                                childe[i].lastChild.src="./images/card-back.png";
                            }
                        }
                        
                           // setTimeout(()=>{ndiv.removeChild(ndiv.lastElementChild);},1000);

                            
                    }
            }
    
    }
    else 
    {
        if (nombre==1)
            {
                console.log("affiche joueur"+(joueurIndex+nombre));
                // on récupère les div du joueur
                var nom;
                if (direction==(-1) && joueurIndex==0 && nombre!=0)
                    {
                        nom="player-4";
                    }
                else
                    {
                        if (joueurIndex==3)
                        {
                            nom ="player-1";
                            
                        }
                        else
                        {
                            
                            nom ="player-"+((((joueurIndex+direction)%(tour.length)))+1);
                            console.log(nom);
                        }
                        
                    }
                
                const ndiv=document.getElementById(nom);
                var childe= ndiv.children;
                var tailleMain;
                if (direction==(-1) && joueurIndex==0 && nombre!=0)
                {
                    tailleMain=tour[3].main.length;
                }
                else 
                {
                    tailleMain=tour[(joueurIndex+direction)%tour.length].main.length;

                }
                //Si main plus grande 
                if (tailleMain>childe.length)
                {
                    // on ajoute une div
                    for(var i = childe.length;i<tailleMain;i++ ) 
                    {    
                    const newDiv= document.createElement('div');       
                    const im=document.createElement('img');
                    var image;



                    if (((joueurIndex+direction)%tour.length)==0)
                        {
                            image=tour[joueurIndex].main[i].image;
                        }
                        else
                        {
                            image="./images/card-back.png";
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
                    var s= image;
                    im.src=s
                    newDiv.style.border= "dashed";
                    im.style.width="100%";
                    im.style.height="auto";
                    im.className="carte";
                    newDiv.id=i;
                    if (joueurIndex==0)
                        {
                            newDiv.classList.add("jouable");
                            newDiv.addEventListener
                            ('click', function()
                            {
                                //Si c'est le tour du joueur
                                if (joueurIndex==0)
                                    {
                                        //On prend l'index de la carte dans la main
                                        var i= parseInt(newDiv.id,10);
                                        //On check si la carte peut être jouer 
                                        checkCJoueur(i);
                                    }
                                else
                                    {
                                        console.log("Attendez votre tour.");
                                    }
                                
                                
                            }
                            );
                        }
                    ndiv.appendChild(newDiv);
                    newDiv.appendChild(im);
                    }

                }
                // si main plus petite
                else 
                {
                    if (tailleMain<childe.length)
                        {
                            //on enlève la dernière div
                            ndiv.removeChild(ndiv.lastElementChild);
                            
                            //on met a jour les div restante
                            for(var i=0;i<tailleMain;i++)
                                {
                                    if (((joueurIndex+direction)%tour.length) ==0 )
                                        {
                                            childe[i].lastChild.src=tour[(joueurIndex+direction)%tour.length].main[i].image;
                                        }
                                    else
                                        {
                                            childe[i].lastChild.src="./images/card-back.png";
                                        }
                                }
                        }
                }
               
            }
         
    }
   idCarte(); 
} 

function idCarte(){
    var nom ="player-"+(joueurIndex+1);
    const div=document.getElementById(nom);
    var childe= div.children;

    
    for(var i=0;i<childe.length;i++)
    {
     childe[i].id=i;
    }

}


function animJouer(i,destination){
    
    const conteneur =document.getElementsByClassName("game-container");

    var nom;
    switch (destination)
    {
        case "piocher":
            //on cree la fausse div pioche
            const depart= creerIllusionPioche();
            // on l'ajoute au site
            conteneur[0].appendChild(depart);

            //evènement suprresion a la fin de l'animation
            addEventListener('transitionend',()=>{
                depart.remove();
            });

            //information postion d'arrivée
            nom ="player-"+(joueurIndex+1);
            const divP= document.getElementById(nom);
            const childP=divP.children;
            var n=(tour[joueurIndex].main.length)-2;
            const destination= divP;
            console.log(destination);

            //
            const cJRect= depart.getBoundingClientRect();
            const JRect= destination.getBoundingClientRect();

            const deltaX= JRect.right - cJRect.right;
            const deltaY= JRect.top - cJRect.top;
            
            //transfo
            
           depart.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            depart.classList.add('animate');
        break;

        case "jouer":
            nom="player-"+(joueurIndex+1);
    const divJ= document.getElementById(nom);
    const child=divJ.children;
    const carteJouer= child[i];
    const img=carteJouer.children;
    img[0].src=tour[joueurIndex].main[i].image;
   
    
    addEventListener('transitionend',()=>{
        carteJouer.remove();
    });



    const riv= document.getElementsByClassName("rivière");

    const cJ2Rect= carteJouer.getBoundingClientRect();
    const rivRect= riv[0].getBoundingClientRect();

    const deltaX2= rivRect.left - cJ2Rect.left;
    const deltaY2= rivRect.top - cJ2Rect.top;
    
    //transfo
    
    carteJouer.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
    carteJouer.classList.add('animate');
        break;
    }





}





function jeuAff(id,texte){
    
    const divTour=document.getElementById(id);
    divTour.textContent=texte;   

}

    
function waitAnim(elem){

return new Promise ((resolve)=>{
    elem.addEventListener('transitionend', resolve, {once:true});
    
});

}





function creerIllusionPioche(){
    //création d'un div  pour l'animation pioche
   // const conteneur =document.getElementsByClassName("game-container");
    const div = document.createElement('div');
    
    div.id = "animeP";

    // Créer une balise <style>
    const style = document.createElement('style');

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




    const im = document.createElement('img');
    im.src="./images/card-back.png";
    im.style.width="100%";
    im.style.height="90%";

    div.appendChild(style);
    div.appendChild(im);
    //div.appendChild(im);
    //conteneur[0].appendChild(div);
    return div;

}










function victoire(i){

    // Créer la div principale
const victoryDiv = document.createElement('div');
victoryDiv.id = 'victoryMessage';
victoryDiv.innerHTML = `
  <p>Bravo le joueur `+i+` a gagné</p>
  <button id="newGameBtn">Nouvelle partie</button>
`;

// Appliquer des styles à la div
const style = document.createElement('style');
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
  victoryDiv.style.top = '50%'; // Descend jusqu'au milieu de la page
  victoryDiv.style.opacity = '1';
}, 100);

// Ajouter un gestionnaire d'événement pour le bouton
document.getElementById('newGameBtn').addEventListener('click', () => {
  document.body.removeChild(victoryDiv); // Supprimer la div au clic
  window.location.reload();
});
}




InitPlateau();
