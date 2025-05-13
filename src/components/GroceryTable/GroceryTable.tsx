
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
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
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
      <ArrowUp className="inline ml-1 w-4 h-4" /> : 
      <ArrowDown className="inline ml-1 w-4 h-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-purple-50">
            <TableRow>
              <TableHead 
                onClick={() => handleSort("name")}
                className="cursor-pointer hover:bg-purple-100 transition-colors w-[40%]"
              >
                Item Name {getSortIcon("name")}
              </TableHead>
              <TableHead 
                onClick={() => handleSort("quantity")}
                className="cursor-pointer hover:bg-purple-100 transition-colors w-[30%]"
              >
                Quantity {getSortIcon("quantity")}
              </TableHead>
              <TableHead 
                onClick={() => handleSort("price")}
                className="cursor-pointer hover:bg-purple-100 transition-colors w-[30%]"
              >
                Price {getSortIcon("price")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="hover:bg-purple-50 transition-colors"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {item.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-right pr-6">{item.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground text-right">
        Showing {filteredAndSortedData.length} of {data.length} items
      </p>
    </div>
  );
};

export default GroceryTable;
