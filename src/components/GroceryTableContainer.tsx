
import React from "react";
import GroceryTable, { GroceryItem } from "./GroceryTable/GroceryTable";

const groceryData: GroceryItem[] = [
  { id: "1", name: "Bananas", quantity: "2 kg", price: "$3.50" },
  { id: "2", name: "Apples", quantity: "1.5 kg", price: "$4.25" },
  { id: "3", name: "Milk", quantity: "1 gallon", price: "$3.99" },
  { id: "4", name: "Bread", quantity: "1 loaf", price: "$2.50" },
  { id: "5", name: "Eggs", quantity: "12 pcs", price: "$4.99" },
  { id: "6", name: "Chicken", quantity: "2.5 lb", price: "$8.75" },
  { id: "7", name: "Rice", quantity: "5 lb", price: "$6.45" },
  { id: "8", name: "Pasta", quantity: "500 g", price: "$1.99" },
  { id: "9", name: "Tomatoes", quantity: "4 pcs", price: "$2.99" },
  { id: "10", name: "Potatoes", quantity: "3 kg", price: "$4.50" },
  { id: "11", name: "Onions", quantity: "1 kg", price: "$2.25" },
  { id: "12", name: "Cheese", quantity: "300 g", price: "$5.75" },
];

const GroceryTableContainer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">Grocery Items</h1>
      <p className="text-gray-500 mb-6">Manage your grocery inventory with ease</p>
      <GroceryTable data={groceryData} />
    </div>
  );
};

export default GroceryTableContainer;
