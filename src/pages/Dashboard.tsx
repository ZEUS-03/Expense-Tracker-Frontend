import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Mail, Plus, Menu, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data - in real app this would come from your backend
  const categoryData = [
    { name: 'Food & Dining', value: 12340, color: '#10b981' },
    { name: 'Shopping', value: 8760, color: '#3b82f6' },
    { name: 'Transportation', value: 5430, color: '#f59e0b' },
    { name: 'Entertainment', value: 3210, color: '#8b5cf6' },
    { name: 'Bills & Utilities', value: 7890, color: '#ef4444' },
    { name: 'Healthcare', value: 2150, color: '#06b6d4' },
  ];

  const monthlyData = [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 28000 },
    { month: 'Mar', amount: 35000 },
    { month: 'Apr', amount: 31000 },
    { month: 'May', amount: 29000 },
    { month: 'Jun', amount: 39780 },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 2340 },
    { day: 'Tue', amount: 1890 },
    { day: 'Wed', amount: 3210 },
    { day: 'Thu', amount: 890 },
    { day: 'Fri', amount: 4560 },
    { day: 'Sat', amount: 2890 },
    { day: 'Sun', amount: 1560 },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Swiggy', amount: 340, category: 'Food & Dining', date: '2024-09-09' },
    { id: 2, merchant: 'Amazon', amount: 2890, category: 'Shopping', date: '2024-09-09' },
    { id: 3, merchant: 'Uber', amount: 180, category: 'Transportation', date: '2024-09-08' },
    { id: 4, merchant: 'Netflix', amount: 649, category: 'Entertainment', date: '2024-09-08' },
    { id: 5, merchant: 'BookMyShow', amount: 450, category: 'Entertainment', date: '2024-09-07' },
  ];

  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);
  const thisMonthSpent = 39780;
  const lastMonthSpent = 31000;
  const percentageChange = ((thisMonthSpent - lastMonthSpent) / lastMonthSpent) * 100;

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30 animate-pulse" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-accent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
        <div className="mobile-container py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Expense Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Welcome back! Here's your financial overview.</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Bell className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Alerts</span>
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Sync Email</span>
              </Button>
              <Link to="/transactions/add">
                <Button variant="financial" size="sm">
                  <Plus className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Add Expense</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-container py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 relative z-10">{/* ... keep existing code */}
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-card border-0 shadow-colorful hover:shadow-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Spent</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-card border-0 shadow-colorful hover:shadow-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">₹{thisMonthSpent.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {percentageChange > 0 ? (
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                  ) : (
                    <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                  )}
                  <span className={`text-xs sm:text-sm ${percentageChange > 0 ? 'text-destructive' : 'text-success'}`}>
                    {Math.abs(percentageChange).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-card border-0 shadow-colorful hover:shadow-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Daily</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">₹{Math.round(thisMonthSpent / 30).toLocaleString()}</p>
              </div>
              <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-card border-0 shadow-colorful hover:shadow-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Categories</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{categoryData.length}</p>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-xs sm:text-sm font-bold">{categoryData.length}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Spending by Category */}
          <Card className="p-4 sm:p-6 bg-gradient-card border-0 shadow-colorful backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Spending by Category</h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 640 ? 40 : 60}
                    outerRadius={window.innerWidth < 640 ? 80 : 120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Spending Timeline */}
          <Card className="p-4 sm:p-6 bg-gradient-card border-0 shadow-colorful backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Spending Timeline</h3>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="weekly" className="text-xs sm:text-sm">This Week</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs sm:text-sm">6 Months</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="h-64 sm:h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="monthly" className="h-64 sm:h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-4 sm:p-6 bg-gradient-card border-0 shadow-colorful backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold">Recent Transactions</h3>
            <Link to="/transactions">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 bg-background/50 rounded-lg border hover:shadow-soft transition-all duration-200 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{transaction.merchant}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-sm sm:text-base">₹{transaction.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;