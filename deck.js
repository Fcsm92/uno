class Carte{

    constructor(nom,type,couleur,valeur,image)
    {
        this.nom=nom;
        this.type=type;
        this.couleur=couleur;
        this.valeur=valeur;
        this.image=image
    }

}




export function creeDeck(){
    var couleurs= ['B','Y','G','R','I','skip','D2','W'];
var rang=[0,1,2,3,4,5,6,7,8,9];
var deck=[];


//initialisation des cartes couleurs
for(var couleurnb=0; couleurnb<4; couleurnb++)
    {
        for(var i=0; i<2; i++)
            {
                for(var rangnb=0; rangnb<10; rangnb++)
                    {
                        var image="images/cards-front/"+rang[rangnb] + couleurs[couleurnb]+".png";
                        let carte = new Carte(rang[rangnb] + couleurs[couleurnb],"normal",couleurs[couleurnb],rang[rangnb],image)
                        deck.push(carte)
                    }
                }
    }
    
// cartes spéciales    
for(var special=4; special<7; special++)
        {
            for(var i=0; i<2; i++)
                {
                    var couleur=0    
                    for(var couleurnb=0; couleurnb<4; couleurnb++)
                        {
                            var image="images/cards-front/"+couleurs[special]+couleurs[couleur]+".png";

                            let carte = new Carte(couleurs[special]+couleurs[couleur],"special",couleurs[couleur],couleurs[special],image)
                            deck.push(carte)
                            couleur++
                        }
                }
        }


// carte changement de couleurs  
 for(var i=0; i<4; i++)
        {
            var image="images/cards-front/W.png"
            let carte = new Carte(couleurs[7],"joker","all",couleurs[7],image)
            deck.push(carte)
        }
    
        

       
        return deck

}






export function melanger(deck)
{
    for(var i=0; i<deck.length;i++)
        {
            var tempCarte=deck[i];
            var randomIndex= Math.floor(Math.random()*deck.length);
            deck[i]=deck[randomIndex];
            deck[randomIndex]=tempCarte;
        }
}





