import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");

  // Mock transaction data
  const transactions = [
    { id: 1, merchant: 'Swiggy', amount: 340, category: 'Food & Dining', date: '2024-09-09', time: '14:30', status: 'completed', source: 'email' },
    { id: 2, merchant: 'Amazon', amount: 2890, category: 'Shopping', date: '2024-09-09', time: '11:15', status: 'completed', source: 'email' },
    { id: 3, merchant: 'Uber', amount: 180, category: 'Transportation', date: '2024-09-08', time: '09:45', status: 'completed', source: 'email' },
    { id: 4, merchant: 'Netflix', amount: 649, category: 'Entertainment', date: '2024-09-08', time: '20:00', status: 'completed', source: 'manual' },
    { id: 5, merchant: 'BookMyShow', amount: 450, category: 'Entertainment', date: '2024-09-07', time: '18:30', status: 'completed', source: 'email' },
    { id: 6, merchant: 'Zomato', amount: 680, category: 'Food & Dining', date: '2024-09-07', time: '13:20', status: 'completed', source: 'email' },
    { id: 7, merchant: 'Flipkart', amount: 1250, category: 'Shopping', date: '2024-09-06', time: '16:45', status: 'completed', source: 'email' },
    { id: 8, merchant: 'Ola', amount: 220, category: 'Transportation', date: '2024-09-06', time: '08:30', status: 'completed', source: 'email' },
    { id: 9, merchant: 'Dominos', amount: 890, category: 'Food & Dining', date: '2024-09-05', time: '19:15', status: 'completed', source: 'email' },
    { id: 10, merchant: 'Electricity Bill', amount: 2340, category: 'Bills & Utilities', date: '2024-09-05', time: '10:00', status: 'completed', source: 'manual' },
  ];

  const categories = ['Food & Dining', 'Shopping', 'Transportation', 'Entertainment', 'Bills & Utilities', 'Healthcare'];
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food & Dining': 'bg-green-100 text-green-800 border-green-200',
      'Shopping': 'bg-blue-100 text-blue-800 border-blue-200',
      'Transportation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Entertainment': 'bg-purple-100 text-purple-800 border-purple-200',
      'Bills & Utilities': 'bg-red-100 text-red-800 border-red-200',
      'Healthcare': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSourceBadge = (source: string) => {
    return source === 'email' ? (
      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
        Auto
      </Badge>
    ) : (
      <Badge variant="outline" className="text-xs bg-gold/10 text-gold border-gold/20">
        Manual
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">All Transactions</h1>
                <p className="text-muted-foreground">{filteredTransactions.length} transactions found</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Link to="/transactions/add">
                <Button variant="financial" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8 bg-gradient-card border-0 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {transaction.merchant.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{transaction.merchant}</h3>
                      {getSourceBadge(transaction.source)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{transaction.date} at {transaction.time}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(transaction.category)}`}
                      >
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-success capitalize">{transaction.status}</p>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredTransactions.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More Transactions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;