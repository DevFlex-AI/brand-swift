import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, Users, DollarSign, Globe, Zap, Target,
  Calendar, Clock, Eye, MousePointer, Smartphone, Monitor, Tablet,
  ArrowUp, ArrowDown, Minus, RefreshCw, Download, Share2, Filter
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface AnalyticsData {
  revenue: any[];
  users: any[];
  traffic: any[];
  conversion: any[];
  retention: any[];
  geographic: any[];
  devices: any[];
  realTime: any;
}

export default function AdvancedAnalyticsSuite() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic analytics data
  const generateAnalyticsData = (): AnalyticsData => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    
    const revenue = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      subscriptions: Math.floor(Math.random() * 100) + 20,
      oneTime: Math.floor(Math.random() * 20000) + 5000
    }));

    const users = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      active: Math.floor(Math.random() * 5000) + 1000,
      new: Math.floor(Math.random() * 500) + 50,
      returning: Math.floor(Math.random() * 2000) + 500
    }));

    const traffic = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      visitors: Math.floor(Math.random() * 1000) + 100,
      pageViews: Math.floor(Math.random() * 5000) + 500,
      bounceRate: Math.random() * 50 + 20
    }));

    const conversion = [
      { stage: "Visitors", value: 100000, color: "#8884d8" },
      { stage: "Sign-ups", value: 15000, color: "#82ca9d" },
      { stage: "Trial Users", value: 8000, color: "#ffc658" },
      { stage: "Paid Users", value: 2400, color: "#ff7c7c" },
      { stage: "Enterprise", value: 480, color: "#8dd1e1" }
    ];

    const retention = Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      cohort1: Math.max(100 - i * 8 - Math.random() * 10, 10),
      cohort2: Math.max(100 - i * 6 - Math.random() * 8, 15),
      cohort3: Math.max(100 - i * 7 - Math.random() * 9, 12)
    }));

    const geographic = [
      { country: "United States", users: 45000, revenue: 2800000 },
      { country: "United Kingdom", users: 12000, revenue: 750000 },
      { country: "Canada", users: 8500, revenue: 520000 },
      { country: "Germany", users: 7200, revenue: 480000 },
      { country: "Australia", users: 5800, revenue: 380000 },
      { country: "France", users: 4900, revenue: 310000 },
      { country: "Netherlands", users: 3600, revenue: 240000 },
      { country: "Sweden", users: 2800, revenue: 190000 }
    ];

    const devices = [
      { device: "Desktop", users: 52000, percentage: 65 },
      { device: "Mobile", users: 24000, percentage: 30 },
      { device: "Tablet", users: 4000, percentage: 5 }
    ];

    const realTime = {
      activeUsers: 1247,
      pageViews: 3456,
      conversions: 23,
      revenue: 15670,
      topPages: [
        { page: "/dashboard", views: 890 },
        { page: "/pricing", views: 567 },
        { page: "/features", views: 432 },
        { page: "/auth", views: 321 }
      ]
    };

    return { revenue, users, traffic, conversion, retention, geographic, devices, realTime };
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setAnalyticsData(generateAnalyticsData());
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  const kpis = [
    { 
      label: "Total Revenue", 
      value: "$2.4M", 
      change: "+23.5%", 
      trend: "up", 
      icon: DollarSign,
      description: "Monthly recurring revenue"
    },
    { 
      label: "Active Users", 
      value: "89.2K", 
      change: "+12.3%", 
      trend: "up", 
      icon: Users,
      description: "Monthly active users"
    },
    { 
      label: "Conversion Rate", 
      value: "3.8%", 
      change: "+0.7%", 
      trend: "up", 
      icon: Target,
      description: "Visitor to customer"
    },
    { 
      label: "Churn Rate", 
      value: "2.1%", 
      change: "-0.4%", 
      trend: "down", 
      icon: TrendingUp,
      description: "Monthly customer churn"
    },
    { 
      label: "LTV/CAC Ratio", 
      value: "4.2x", 
      change: "+0.8x", 
      trend: "up", 
      icon: BarChart3,
      description: "Lifetime value to acquisition cost"
    },
    { 
      label: "Page Load Time", 
      value: "1.2s", 
      change: "-0.3s", 
      trend: "down", 
      icon: Zap,
      description: "Average page load speed"
    }
  ];

  if (isLoading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Loading Analytics...</h2>
              <p className="text-muted-foreground">Processing real-time data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Advanced Analytics Suite
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Real-Time Business Intelligence
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive analytics and insights for data-driven decisions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {kpis.map((kpi, index) => {
              const IconComponent = kpi.icon;
              const isPositive = kpi.trend === "up" ? !kpi.change.includes("-") : kpi.change.includes("-");
              
              return (
                <Card key={index} className="shadow-card hover:shadow-electric transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      {isPositive ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-lg font-bold">{kpi.value}</div>
                    <div className="text-xs text-muted-foreground mb-1">{kpi.label}</div>
                    <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="geographic">Geographic</TabsTrigger>
              <TabsTrigger value="realtime">Real-Time</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Monthly revenue growth and projections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analyticsData.revenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Active and new user acquisition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData.users}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="active" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="new" stroke="hsl(var(--secondary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Subscriptions", value: 1800000, color: "#8884d8" },
                            { name: "One-time", value: 400000, color: "#82ca9d" },
                            { name: "Enterprise", value: 200000, color: "#ffc658" }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {[
                            { name: "Subscriptions", value: 1800000, color: "#8884d8" },
                            { name: "One-time", value: 400000, color: "#82ca9d" },
                            { name: "Enterprise", value: 200000, color: "#ffc658" }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-card md:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Timeline</CardTitle>
                    <CardDescription>Daily revenue with subscription vs one-time breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={analyticsData.revenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="subscriptions" stackId="a" fill="hsl(var(--primary))" />
                        <Bar dataKey="oneTime" stackId="a" fill="hsl(var(--secondary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Active vs new user trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analyticsData.users}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="active" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="new" stackId="1" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>User Segments</CardTitle>
                    <CardDescription>User distribution by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { segment: "Free Users", count: 67000, percentage: 84, color: "bg-gray-400" },
                        { segment: "Pro Users", count: 11000, percentage: 14, color: "bg-primary" },
                        { segment: "Enterprise", count: 1600, percentage: 2, color: "bg-secondary" }
                      ].map((segment, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{segment.segment}</span>
                            <span className="text-sm">{segment.count.toLocaleString()} ({segment.percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${segment.color}`}
                              style={{ width: `${segment.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Traffic Patterns</CardTitle>
                  <CardDescription>Hourly traffic distribution and user behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analyticsData.traffic}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                      <Bar dataKey="pageViews" fill="hsl(var(--secondary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>User journey from visitor to customer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.conversion.map((stage, index) => {
                        const conversionRate = index > 0 ? 
                          ((stage.value / analyticsData.conversion[index - 1].value) * 100).toFixed(1) : 
                          "100.0";
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{stage.stage}</span>
                              <span className="text-sm">{stage.value.toLocaleString()} ({conversionRate}%)</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-3">
                              <div 
                                className="h-3 rounded-full"
                                style={{ 
                                  width: `${(stage.value / analyticsData.conversion[0].value) * 100}%`,
                                  backgroundColor: stage.color
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Conversion Optimization</CardTitle>
                    <CardDescription>AI-powered conversion insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">Opportunity Identified</h4>
                        <p className="text-sm text-green-700">
                          Optimizing the pricing page could increase conversions by 15-20%
                        </p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">A/B Test Suggestion</h4>
                        <p className="text-sm text-blue-700">
                          Test different CTA button colors on the landing page
                        </p>
                      </div>
                      
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-1">User Feedback</h4>
                        <p className="text-sm text-orange-700">
                          Users are dropping off at the payment step - simplify checkout
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="retention" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Cohort Retention Analysis</CardTitle>
                  <CardDescription>User retention by signup cohort</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analyticsData.retention}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cohort1" stroke="#8884d8" strokeWidth={2} name="Jan Cohort" />
                      <Line type="monotone" dataKey="cohort2" stroke="#82ca9d" strokeWidth={2} name="Feb Cohort" />
                      <Line type="monotone" dataKey="cohort3" stroke="#ffc658" strokeWidth={2} name="Mar Cohort" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Users and revenue by country</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.geographic.map((country, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                          <div>
                            <div className="font-medium">{country.country}</div>
                            <div className="text-sm text-muted-foreground">
                              {country.users.toLocaleString()} users
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              ${(country.revenue / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-muted-foreground">revenue</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Device Analytics</CardTitle>
                    <CardDescription>User distribution by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.devices.map((device, index) => {
                        const icons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet };
                        const IconComponent = icons[device.device as keyof typeof icons];
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-primary" />
                                <span className="font-medium">{device.device}</span>
                              </div>
                              <span className="text-sm">{device.users.toLocaleString()} ({device.percentage}%)</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${device.percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="realtime" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{analyticsData.realTime.activeUsers}</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{analyticsData.realTime.pageViews}</div>
                        <div className="text-sm text-muted-foreground">Page Views</div>
                      </div>
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{analyticsData.realTime.conversions}</div>
                        <div className="text-sm text-muted-foreground">Conversions</div>
                      </div>
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">${analyticsData.realTime.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Today's Revenue</div>
                      </div>
                      <DollarSign className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Top Pages (Live)</CardTitle>
                  <CardDescription>Most visited pages right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.realTime.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{page.page}</div>
                            <div className="text-sm text-muted-foreground">{page.views} views</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-muted-foreground">Live</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}