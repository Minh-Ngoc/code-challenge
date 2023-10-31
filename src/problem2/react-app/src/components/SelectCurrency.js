import React, { useEffect, useState } from "react";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { IconList } from "./IconList";

export default function SelectCountry({ ccy, onPriceChange, onSelectedChange }) {
    const [currency, setCurrencies] = useState([]);
    const [selected, setSelected] = useState(ccy);
    const [swapCcy, setSwapCcy] = useState(ccy);

    useEffect(() => {
        async function getData() {
            try {
                // Call API
                const response = await fetch("https://interview.switcheo.com/prices.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                const ccyData = fnUniqueCurrencyData(data);
    
                // Update Currencies and icons
                const updatedCurrencies = IconList.map((iconItem, i) => {
                    const matchingCurrency = ccyData.find(
                        (ccyItem) => ccyItem.currency === iconItem.name.toUpperCase()
                    );
    
                    if (matchingCurrency) {
                        return { ...matchingCurrency, icon: iconItem.icon };
                    }
    
                    return iconItem;
                });
    
                setCurrencies(updatedCurrencies);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        getData();
    }, []);
    
    // Update price when currency is updated
    useEffect(() => {
        const price = currency.find((item) => item.currency === selected)?.price || 0;
        onPriceChange(price);
    }, [currency, selected])

    // Follow state swap Currency selected
    useEffect(() => {
        if(swapCcy !== ccy) {
            setSelected(ccy);
            setSwapCcy(ccy);
        } 
    }, [ccy])

    // Remove duplicate currencies
    function fnUniqueCurrencyData(arr) {
        // Remove duplicate element
        const uniqueDataArray = arr?.reduce((accumulator, currValue) => {
            const existingItem = accumulator.find(item => item.currency === currValue.currency);

            if (!existingItem) {
                accumulator.push({ ...currValue, currency: currValue.currency.toUpperCase() });
            } else {
                if (currValue.date > existingItem.date) {
                    accumulator[accumulator.indexOf(existingItem)] = currValue;
                }
            }

            return accumulator;
        }, []);

        return uniqueDataArray;
    };

    function onChangeSelectedItem(el) {
        setSelected(el.target.value);
        onSelectedChange(el.target.value);
    };

    return (
        <Select
            items={currency}
            selectedKeys={[selected]}
            className="max-w-[230px]"
            classNames={{
                value: "text-2xl",
                listboxWrapper: "max-h-[400px]",
                innerWrapper: "pt-0",
                trigger: "bg-transparent icon-35"
            }}
            size="lg"
            radius="sm"
            onChange={onChangeSelectedItem}
            aria-label="currency"
            renderValue={(items) => (
                items.map(item => (
                    <div key={item.data.currency} className="flex items-center gap-2">
                        <Avatar
                            alt={item.data.currency}
                            className="flex-shrink-0"
                            size="md"
                            icon={item.data.icon}
                            classNames={{
                                base: "bg-transparent",
                                icon: "icon-35"
                            }}
                        />
                        <div className="flex flex-col text-2xl font-semibold">
                            <span>{item.data.currency}</span>
                        </div>
                    </div>
                ))
            )}
        >
        { (item) => (
            <SelectItem key={item.currency} textValue={item.currency}>
                <div className="flex gap-4 items-center">
                    <Avatar 
                        alt={item.currency} 
                        className="flex-shrink-0" 
                        size="md" 
                        icon={item.icon} 
                        classNames={{
                            base: "bg-transparent",
                            icon: "icon-35"
                        }}
                    />
                    <span className="text-2xl">{item.currency}</span>
                </div>
            </SelectItem>
        )}
        </Select>
    );                
}
