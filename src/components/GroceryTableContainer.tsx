
import React from "react";
import GroceryTable, { GroceryItem } from "./GroceryTable/GroceryTable";
import { Card, CardContent } from "@/components/ui/card";

const groceryData: GroceryItem[] = [
  { id: "1", name: "Organic Bananas", quantity: "2 kg", price: "$3.50" },
  { id: "2", name: "Red Apples", quantity: "1.5 kg", price: "$4.25" },
  { id: "3", name: "Whole Milk", quantity: "1 gallon", price: "$3.99" },
  { id: "4", name: "Sourdough Bread", quantity: "1 loaf", price: "$2.50" },
  { id: "5", name: "Free Range Eggs", quantity: "12 pcs", price: "$4.99" },
  { id: "6", name: "Organic Chicken", quantity: "2.5 lb", price: "$8.75" },
  { id: "7", name: "Basmati Rice", quantity: "5 lb", price: "$6.45" },
  { id: "8", name: "Whole Grain Pasta", quantity: "500 g", price: "$1.99" },
  { id: "9", name: "Vine Tomatoes", quantity: "4 pcs", price: "$2.99" },
  { id: "10", name: "Russet Potatoes", quantity: "3 kg", price: "$4.50" },
  { id: "11", name: "Red Onions", quantity: "1 kg", price: "$2.25" },
  { id: "12", name: "Cheddar Cheese", quantity: "300 g", price: "$5.75" },
];

const GroceryTableContainer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-purple-800 bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
          Grocery Inventory
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Manage your grocery inventory with ease and style
        </p>
      </div>
      
      <div className="mb-10">
        <Card className="bg-gradient-to-r from-purple-900 to-purple-700 text-white border-none shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <p className="text-purple-200 text-sm">Total Items</p>
                <p className="text-3xl font-bold">{groceryData.length}</p>
              </div>
              <div className="p-3 border-t md:border-t-0 md:border-l md:border-r border-purple-600">
                <p className="text-purple-200 text-sm">Categories</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="p-3 border-t md:border-t-0 border-purple-600">
                <p className="text-purple-200 text-sm">Total Value</p>
                <p className="text-3xl font-bold">$56.91</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <GroceryTable data={groceryData} />
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Last updated: May 13, 2025 at 10:30 AM</p>
      </div>
    </div>
  );
};

export default GroceryTableContainer;
