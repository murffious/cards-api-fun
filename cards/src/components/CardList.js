import React, { useEffect, useState, Fragment } from 'react';

function generateShuffledDeck() {
      return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(data => data.json());
  }

function draw2Cards(deck_id) {
      return fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`).then(data => data.json()); 
  }

function CardList() {
    const [deckId, setDeckId] = useState("");
    const [cardList, setCardList] = useState([]);
    useEffect(()=> {
        generateShuffledDeck().then(results => {
            console.log(results)
            setDeckId(results.deck_id);
            
           
        }).then(results => draw2Cards(results.deck_id))
        .then(cardList => setCardList(cardList))
        .catch(err => setCardList([]));
    }, []);

    // const drawCards = page => {
    //     getPeopleNext(page)
    //       .then(async results => {
    //         setPrevious(results.previous);
    //         setNext(results.next);
    //         setCount(results.count);
    
    //         return loadData(results);
    //       })
    //       .then(peopleList => setPeopleList(peopleList))
    //       .catch(err => setPeopleList([]));
    //   };
    return (
        <Fragment>
        <table>
            <thead><tr><td>CardList{"- deck id: "+deckId}</td></tr></thead>
            <tbody>
                <tr><td>Card</td></tr>
            </tbody>
            <tfoot></tfoot>
        </table>
        </Fragment>
    )
}

export default CardList;