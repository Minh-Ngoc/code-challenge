import { Input } from "@nextui-org/react";
import SelectCountry from "./SelectCurrency";
import { useState } from "react";

// Document: https://nextui.org/docs/components/input
function InputCurrency({ label, ccy, onInputValueChange, onPriceCcyChange, onPriceConvertCcy, onSelectedChange }) {
    const [inputValue, setInputValue] = useState('');

    function onChangeInput (e) {
        if(onPriceConvertCcy) {
            setInputValue(onPriceConvertCcy);
        } else {
            setInputValue(e.target.value);
            onInputValueChange(e.target.value);
        }
    };

    return (
        <Input
            type="text"
            label={label}
            variant="bordered"
            labelPlacement="outside"
            placeholder="0"
            color="default"
            radius="sm"
            size="lg"
            value={onPriceConvertCcy ? onPriceConvertCcy : inputValue}
            endContent={
                <SelectCountry 
                    ccy={ccy} 
                    onPriceChange={onPriceCcyChange} 
                    onSelectedChange={onSelectedChange}
                />}
            classNames={{
                inputWrapper: "h-full pr-0",
                label: "text-2xl font-semibold text-slate-500 italic",
                input: "text-2xl"
            }}
            onChange={onChangeInput}
        />
    );
}

export default InputCurrency;