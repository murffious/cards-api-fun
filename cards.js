let deck_id; //move to class
let suits = {
  SPADES: [],
  CLUBS: [],
  HEARTS: [],
  DIAMONDS: []
};
let HOLD = [];

async function draw2Cards() {
  await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      sortSuitPiles(myJson);
      console.log(JSON.stringify(myJson));
      console.log("SUIT STACKS:", suits);
    });
}

// Function to execute X function, Y number of times with Z of interval delay
function recursiveDelay(functionToCall, executionsNumber, timeoutInSeconds) {
  if (executionsNumber) {
    //exit condition
    if (HOLD.length < 4) {
      functionToCall(); // external function execution
    }

    setTimeout(() => {
      recursiveDelay(functionToCall, executionsNumber - 1, timeoutInSeconds); //recursive call
    }, 1000 * timeoutInSeconds);
  }
}

// make a network request to "shuffle" or generate a deck of cards.
function generateShuffledDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      console.log(JSON.stringify(myJson));
      deck_id = myJson.deck_id;

      // Initial call
      recursiveDelay(draw2Cards, 26, 1);
    });
}

// sort

function sortSuitPiles(myJson) {
  myJson.cards.forEach(element => {
    const { suit, value } = element;
    console.log(suit, value);
    value === "QUEEN" ? HOLD.push(suit) : false;
    var stack = document.getElementById(`${suit}`);
    var text = document.createTextNode(value);
    stack.appendChild(document.createTextNode(" "));

    if (isQueenDrawn(suit).length === 0) {
      switch (suit) {
        case "SPADES":
          // check for queen previously dranw to stop
          suits.SPADES.push(value);
          stack.appendChild(text);
          break;
        case "CLUBS":
          suits.CLUBS.push(value);
          stack.appendChild(text);
          break;
        case "HEARTS":
          suits.HEARTS.push(value);
          stack.appendChild(text);
          break;
        case "DIAMONDS":
          suits.DIAMONDS.push(value);
          // add check for if queen to order and then add [] if desired or what not and comma
          stack.appendChild(text);
          break;
        default:
          console.log("error");
      }
    }
  });
}

function orderStacks1(suit, value) {
  let orderValue;

  switch (value) {
    case "ACE":
      orderValue = 1;
      break;
    case "KING":
      orderValue = 13;
      break;
    case "QUEEN":
      orderValue = 12;
      break;
    case "JACK":
      orderValue = 11;
      break;
    default:
      orderValue = Number(value);
  }
}
function isQueenDrawn(suit) {
  return suits[suit].filter(card => {
    if (card === "QUEEN") {
      return card;
    }
  });
}

// run this to start 
generateShuffledDeck();

