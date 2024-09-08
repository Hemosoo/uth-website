import Card from "./Card";
import { numbers, colors, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";
import { Fragment, useEffect, useState } from "react";


const CardsWrapper = ({ cardsNumber }) => {
  const cardNumbers = cardsNumber;
  const { randomValueFromArray } = useRandomValueFromArray();
  const alreadyDone = useState([]);
  function generateRandomCard() {
    return {
      randomSymbols: symbols[Math.floor(Math.random() * symbols.length)],
      randomValue: randomValueFromArray(numbers).number,
    };
  }


  return (
    <div className="card-wrapper">
      {[...Array(Number(cardNumbers))].map((_numb, index) => {
        index += 1;
        let card = generateRandomCard();
        while (alreadyDone.some(item => 
            item.randomValue === card.randomValue && item.randomSymbols === card.randomSymbols)) {
          card = generateRandomCard();
        }
        alreadyDone.push(card);
        return (
          <Card
            key={index}
            name={card.randomSymbols.name}
            number={
              card.randomValue
            }
            color={
              card.randomSymbols.name === "spade" || card.randomSymbols.name === "club"
                ? `${colors[1].color}`
                : `${colors[0].color}`
            }
            symbol={card.randomSymbols.symbol}
          />
        );
      })}
    </div>
  );
};

export default CardsWrapper;