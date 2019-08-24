let SPADES = [];
let CLUBS = [];
let HEARTS = [];
let DIAMONDS = [];
let deck_id; //move to class
let HOLD = []; 
// make a network request to "shuffle" or generate a deck of cards.
function generateShuffledDeck(){
  fetch('https://deckofcardsapi.com/api/deck/new/')
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    console.log(JSON.stringify(myJson));
    deck_id = myJson.deck_id;
    // make a network request to "shuffle" or generate a deck of cards.
    while(HOLD.length < 4){
     await draw2Cards(deck_id)
    }
  });
}
// sort 
async function draw2Cards(deck_id){
  await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      sortSuitPiles(myJson)
      console.log(JSON.stringify(myJson));
      console.log("SUIT STACKS:",SPADES, CLUBS, HEARTS, DIAMONDS,HOLD)
    });
}
function sortSuitPiles(myJson){
  myJson.cards.forEach(element => {
    const { suit, value } = element;
    console.log(suit, value)
    value === "QUEEN" ? HOLD.push(suit): false;
    switch(suit){
      case "SPADES":
        // check for queen previously dranw to stop 
        SPADES.push(value);
        break;
      case "CLUBS":
        
        CLUBS.push(value);
        break;
      case "HEARTS":
        HEARTS.push(value);
        break; 
      case "DIAMONDS":
        DIAMONDS.push(value);
        break;  
      default:
        console.log("error")
    }
  });
}
function isQueenDrawn(suit){
  return suit.filter(card => {
     if(card === "QUEEN"){
       return card;
     }
  })
}

generateShuffledDeck();
// wrap call with isQueenDrawn function
// With the returned deck id, make subsequent network 
//requests drawing 2 cards at a time.

// Keep drawing until each suit's Queen card is drawn. Then stop. 


// Provide separate lists of all cards drawn for each suit.
// At most make one network request each second.


// Your final solution should print to the screen the 
// array of drawn cards for each suit. 


// Each array should be sorted. For example, your code should print something like:
// SPADES: [2, 3, 5, 10, JACK, QUEEN]
// CLUBS: [ACE, 2, 4, 5, 6, 10, JACK, QUEEN, KING]
// HEARTS: [2, 3, 5, JACK, QUEEN, KING]
// DIAMONDS: [ACE, 2, 3, 5, 6, 7, 8, 10, QUEEN]