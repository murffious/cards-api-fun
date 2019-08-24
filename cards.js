let SPADES = [];
let CLUBS = [];
let HEARTS = [];
let DIAMONDS = [];
let deck_id; //move to class
// make a network request to "shuffle" or generate a deck of cards.
fetch('https://deckofcardsapi.com/api/deck/new/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    deck_id = myJson.deck_id;
    // make a network request to "shuffle" or generate a deck of cards.
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
     await  myJson.cards.forEach(element => {
        const { suit, value } = element;
        console.log(suit, value)
        switch(suit){
          case "SPADES":
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
        }
      });
      console.log(JSON.stringify(myJson));
      console.log(SPADES, CLUBS, HEARTS, DIAMONDS)
    });
  });

// sort 
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