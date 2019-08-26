let deck_id; //move to class
let suits = {
  SPADES : [],
  CLUBS : [],
  HEARTS : [],
  DIAMONDS : []
}
let HOLD = []; 
// Allow callback to run at most 1 time per 100ms
// window.addEventListener("resize", throttle(callback, 100));
// // Allow callback to run on each resize event
// window.addEventListener("resize", callback2);

async function draw2Cards(){
  await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      sortSuitPiles(myJson)
      console.log(JSON.stringify(myJson));
      console.log("SUIT STACKS:",suits)
    });
}

// Function to execute X function, Y number of times with Z of interval delay 
function recursiveDelay(functionToCall, executionsNumber, timeoutInSeconds) {
  if (executionsNumber) { //exit condition

      functionToCall();  // external function execution

      setTimeout(
          () => { recursiveDelay(functionToCall, executionsNumber - 1, timeoutInSeconds); //recursive call
          }, 1000 * timeoutInSeconds);
  }
}



// make a network request to "shuffle" or generate a deck of cards.
function generateShuffledDeck(){
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    console.log(JSON.stringify(myJson));
    deck_id = myJson.deck_id;

    //fix if time
    // dont like this originally had it checking until the HOLD.length is 4 instead of 52 times
     // Initial call
     recursiveDelay(draw2Cards, 52, 1);
   
  });
}


// sort 

function sortSuitPiles(myJson){
  myJson.cards.forEach(element => {
    const { suit, value } = element;
    // const { SPADES, HEARTS, DIAMONDS, CLUBS } = suits;
    console.log(suit, value)
    value === "QUEEN" ? HOLD.push(suit): false;
    if(isQueenDrawn(suit).length ===0){
      switch(suit){
        case "SPADES":
          // check for queen previously dranw to stop 
         suits.SPADES.push(value);
          break;
        case "CLUBS":
          suits.CLUBS.push(value);
          break;
        case "HEARTS":
          suits.HEARTS.push(value);
          break; 
        case "DIAMONDS":
          suits.DIAMONDS.push(value);
          break;  
        default:
          console.log("error")
      }
    }
   
   
  });
}
function isQueenDrawn(suit){
  return suits[suit].filter(card => {
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