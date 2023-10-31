import React, { useState } from "react";
import './App.css';
import InputCurrency from "./components/InputCurrency";
import { Button, Image } from "@nextui-org/react";
import arrowLeft from "./assets/imgs/arrow-left.png";
import arrowRight from "./assets/imgs/arrow-right.png";
import CcyTableList from "./components/CcyTableList";

function App() {
  const [price, setPrice] = useState({
    frCcy: 1,
    toCcy: 1,
  });

  const [selectedCurrencies, setSelectedCurrencies] = useState({
    frCcy: "LSI",
    toCcy: "USD",
  });
  
  const [inputValue, setInputValue] = useState('');

  // Handles currency exchange when onClick event is fired
  const handleSwapCurrencies = () => {
    setSelectedCurrencies({
      frCcy: selectedCurrencies.toCcy,
      toCcy: selectedCurrencies.frCcy,
    });
  };
  
  // Handles input changes to convert the currency of the price 
  const handleInputValueChange = (value) => setInputValue(value);

  // Handle price changes when updating currency
  const handlePriceConvertCcy = () => {
    return Number(inputValue) * Number(price.toCcy) / Number(price.frCcy)
  };

  // Arrow icon list 
  const arrowIcons = [arrowLeft, arrowRight];
  
  return (
    <div className="App">
      <div className="w-full pl-[10%] pr-[10%] pt-[2%] pb-[2%] bg-image">
        <div className="w-full p-10 bg-white">
          <h1 className="text-5xl font-semibold uppercase text-cyan-700 text-center ml-10 mr-10 mb-10">Currency Swap</h1>
          <div className="flex gap-10 items-center">
            <InputCurrency
              key="FromCCY"
              label="From Currency:"
              ccy={selectedCurrencies.frCcy}
              onPriceCcyChange={(value) => setPrice({ ...price, frCcy: value })}
              onInputValueChange={handleInputValueChange}
              onSelectedChange={(value) => setSelectedCurrencies({ ...selectedCurrencies, frCcy: value })}
            />
            <Button
              color="secondary"
              variant="light"
              radius="sm"
              size="lg"
              className="mt-[32px]"
              onClick={handleSwapCurrencies}
            >
              <div className="flex flex-col items-center justify-center">
                { arrowIcons.map(item => (
                  <Image
                    alt="arrow"
                    src={item}
                    removeWrapper
                    className="object-none w-10 h-5"
                  />
                )) }
              </div>
            </Button>
            <InputCurrency
              key="ToCCY"
              label="To Currency:"
              ccy={selectedCurrencies.toCcy}
              onPriceCcyChange={(value) => setPrice({ ...price, toCcy: value })}
              onPriceConvertCcy={handlePriceConvertCcy()}
              onSelectedChange={(value) => setSelectedCurrencies({ ...selectedCurrencies, toCcy: value })}
            />
          </div>
          <CcyTableList />
        </div>
      </div>
    </div>
  );
}

export default App;
