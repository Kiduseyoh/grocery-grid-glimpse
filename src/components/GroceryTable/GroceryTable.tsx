
import React, { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowUp, ArrowDown, Filter, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  price: string;
};

interface GroceryTableProps {
  data: GroceryItem[];
}

type SortField = "name" | "quantity" | "price";
type SortDirection = "asc" | "desc";

const GroceryTable: React.FC<GroceryTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    // Filter data
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort data
    return [...filtered].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === "price") {
        // Remove currency symbol for price comparison
        aValue = a.price.replace(/[^0-9.]/g, "");
        bValue = b.price.replace(/[^0-9.]/g, "");
        
        return sortDirection === "asc" 
          ? parseFloat(aValue) - parseFloat(bValue)
          : parseFloat(bValue) - parseFloat(aValue);
      }
      
      if (sortField === "quantity") {
        // Extract numeric part for quantity comparison
        const aMatch = a.quantity.match(/[\d.]+/);
        const bMatch = b.quantity.match(/[\d.]+/);
        const aNum = aMatch ? parseFloat(aMatch[0]) : 0;
        const bNum = bMatch ? parseFloat(bMatch[0]) : 0;
        
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }
      
      // Default string comparison
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [data, searchTerm, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ArrowUp className="inline ml-1 w-4 h-4 text-purple-600" /> : 
      <ArrowDown className="inline ml-1 w-4 h-4 text-purple-600" />;
  };

  return (
    <Card className="w-full overflow-hidden border-purple-200 shadow-lg">
      <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-5 flex items-center justify-between border-b border-purple-200">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-purple-700 h-6 w-6" />
          <h2 className="text-xl font-bold text-purple-800">Your Grocery List</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-purple-500 w-5 h-5" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
      </div>
      
      <div className="overflow-hidden">
        <AspectRatio ratio={16/9} className="max-h-[600px] min-h-[300px]">
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader className="bg-purple-50 sticky top-0 z-10">
                <TableRow className="border-b-2 border-purple-200">
                  <TableHead 
                    onClick={() => handleSort("name")}
                    className="cursor-pointer hover:bg-purple-100 transition-colors w-[40%] bg-opacity-90 backdrop-blur-sm"
                  >
                    <div className="flex items-center">
                      <span className="font-semibold text-purple-800">Item Name</span>
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead 
                    onClick={() => handleSort("quantity")}
                    className="cursor-pointer hover:bg-purple-100 transition-colors w-[30%] bg-opacity-90 backdrop-blur-sm"
                  >
                    <div className="flex items-center">
                      <span className="font-semibold text-purple-800">Quantity</span> 
                      {getSortIcon("quantity")}
                    </div>
                  </TableHead>
                  <TableHead 
                    onClick={() => handleSort("price")}
                    className="cursor-pointer hover:bg-purple-100 transition-colors w-[30%] bg-opacity-90 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-end">
                      <span className="font-semibold text-purple-800">Price</span>
                      {getSortIcon("price")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.length > 0 ? (
                  filteredAndSortedData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={cn(
                        "transition-all duration-200 hover:bg-purple-50",
                        index % 2 === 0 ? "bg-white" : "bg-purple-25"
                      )}
                    >
                      <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 shadow-sm">
                          {item.quantity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-right pr-6 text-purple-900">{item.price}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <ShoppingCart className="h-8 w-8 mb-2 text-purple-300" />
                        <p className="text-lg">No items found</p>
                        <p className="text-sm">Try adjusting your search</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AspectRatio>
      </div>
      <div className="p-4 bg-purple-50 border-t border-purple-200">
        <p className="text-sm text-purple-600 text-right">
          Showing {filteredAndSortedData.length} of {data.length} items
        </p>
      </div>
    </Card>
  );
};

export default GroceryTable;
