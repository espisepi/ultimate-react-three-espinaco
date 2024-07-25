


export class GameManager {
    constructor(cards) {
        this.score = 0;
        this.cards = cards;
        console.log(cards.children);
        // cards.children.forEach(c => c.userData.startAnimationFlipCardToTexture());
        // Duplicar Cards y barajarlas aka cambiarlas de posicion
        const self = this;
        setInterval(()=>{
            self.update();
        },1000);
    }




    update() {
        console.log("OYEEE")
        // update contShowCard
        let contShowCard = 0;
        let cardsShowCard = [];
        let card = null;
        let showCard = false;
        for(let i = 0; i < this.cards.children.length; i++) {
            card = this.cards.children[i];
            showCard = card.userData.showCard;
            if(showCard){
                contShowCard++;
                cardsShowCard.push(card);
            }
        }
        // execute Action
        if(contShowCard < 2 ) {
            return;
        }
        if(contShowCard === 3) {
            /* compare if cards with showcard to true are the same ->
                - yes: disable visibility card, add one point to score
                - no: 
                - both: all cards with showcard to false and ejecute flip animation, cardsShowCard = [] (se vacia el array)
            */
           if(cardsShowCard[0].uuid === cardsShowCard[1].uuid ) {
                // yes:
                // disable visibility card
                cardsShowCard[0].visible = false;
                cardsShowCard[1].visible = false;
                // add one point to score
                this.score++;
           }
           // both:
           // all cards with showcard to false and ejecute flip animation
           for(let i = 0; i < this.cards.children.length; i++) {
                this.cards.children[i].userData.showCard = false;
                this.cards.children[i].userData.startAnimationFlipCardToDefaultTexture();
            }
            // cardsShowCard = [] (se vacia el array)
            // cardsShowCard = []; (en verdad no hace falta porque cuando se ejecuta update de nuevo se vacia el array al principio del metodo)
        }
        if(this.score >= this.cards.length) {
            // FINISH GAME, YOU WIN
            // Duplicar Cards y barajarlas aka cambiarlas de posicion
            // EMPEZAR NUEVA PARTIDA (this.score = 0) , cardsShowCard = [] (se vacia el array)
            alert("YOU WIN");
        }

        
    }
}