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
      // console.log(JSON.stringify(myJson));
      // console.log("SUIT STACKS:", suits);
      
      sortSuitPiles(myJson);
      
    });
}

// Function to execute X function, Y number of times with Z of interval delay
function recursiveDelay(functionToCall, executionsNumber, timeoutInSeconds) {
  if (executionsNumber) {
    //exit condition
    if (HOLD.length < 4) {
      functionToCall(); // external function execution
      orderStacks();
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
      // console.log(JSON.stringify(myJson));
      deck_id = myJson.deck_id;
      
      // Initial call
      recursiveDelay(draw2Cards, 26, 1);

    });
   
}

// sort

function sortSuitPiles(myJson) {
  myJson.cards.forEach(async element => {
    const { suit, value } = element;
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
          stack.appendChild(text);
          break;
        default:
          console.log("error");
      }
     
    }
          

  });

}
async function orderStacks(){
 //order here//
console.log(suits)
let item1 = orderStacks1(suits.CLUBS).sort(function(a, b){return a-b});;
let item2 = orderStacks1(suits.DIAMONDS).sort(function(a, b){return a-b});;
let item3 = orderStacks1(suits.SPADES).sort(function(a, b){return a-b});;
let item4 = orderStacks1(suits.CLUBS).sort(function(a, b){return a-b});;


let ordered1 = orderStacks2(item1)
let ordered2 = orderStacks2(item2)
let ordered3 = orderStacks2(item3)
let ordered4 = orderStacks2(item4)

console.log(ordered1, ordered2, ordered3, ordered4)
document.getElementById("SPADES").innerHTML = "Paragraph changed!";
document.getElementById("CLUBS").innerHTML = "Paragraph changed!";
document.getElementById("HEARTS").innerHTML = "Paragraph changed!";
document.getElementById("DIAMONDS").innerHTML = "Paragraph changed!";

//  let stacker = await document.getElementsByClassName().innerHTML;
//  let unorderedCards = await JSON.stringify(stacker).split(" ");
 
//  let theCardsInStack = unorderedCards.slice(1);
//  let noSpaces = await theCardsInStack.filter(item=>{
//    if(item !== "" && item !== " "&& item !== `"""`){
//  return item;
//    }
  
// })
//  console.log("yoyoyoyoyo", theCardsInStack)
//  let convertToNums = await orderStacks1(theCardsInStack);
//  console.log(convertToNums)
//  sortArr(convertToNums)
}
function sortArr(arr){
  return arr.sort();
}

function orderStacks1(arr) {
  return arr.map(card => {
    switch (card) {
      case "ACE":
        return card = 1;

      case "KING":
          return  card = 13;

      case "QUEEN":
          return  card = 12;

      case "JACK":
          return   card = 11;

      default:
      return  card = Number(card);
    }
    
  }
  )
}
function orderStacks2(arr) {

  return arr.map(value => {
    switch (value) {
      case 1:
        return value = "ACE";
      case 13:
        return value = "KING"
      case 12:
        return value = "QUEEN";
      case 11:
        return value = "JACK"
      default:
        return value = value;
    }
    })
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

