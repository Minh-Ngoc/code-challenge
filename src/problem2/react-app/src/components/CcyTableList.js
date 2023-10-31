import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar } from "@nextui-org/react";
import { IconList } from "./IconList";

// Document: https://nextui.org/docs/components/table
export default function CcyTableList() {
  const [currency, setCurrencies] = useState([]);

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

  const headerCols = ["Currency", "Price", "Date"]

  function formatDate(ngay) {
    const date = new Date(ngay);
    const getDate = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    const convertMMDDYYYY = `${getDate}-${date.getDate()}-${date.getFullYear()}`
    return convertMMDDYYYY
  }

  return (
    <div className="flex flex-col gap-3 mt-8">
      <Table
        color="secondary"
        selectionMode="single"
        defaultSelectedKeys={["1"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          { headerCols.map(item => (
            <TableColumn key={item} className="text-center text-2xl pt-3 pb-3 uppercase">{item}</TableColumn>
          )) }
        </TableHeader>
        <TableBody>
          { currency?.map(item => (
              <TableRow key={item.currency}>
                <TableCell className="text-xl flex items-center gap-6 justify-start pl-[20%] pr-[25%]">
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
                  {item.currency}
                </TableCell>
                <TableCell className="text-xl text-center">{item.price}</TableCell>
                <TableCell className="text-xl text-center">{formatDate(item.date)}</TableCell>
              </TableRow>
          )) }
        </TableBody>
      </Table>
    </div>
  );
}
