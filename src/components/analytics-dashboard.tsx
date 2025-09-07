import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Activity, Download, RefreshCw } from "lucide-react";

export default function AnalyticsDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 850, users: 120 },
    { month: "Feb", revenue: 1200, users: 180 },
    { month: "Mar", revenue: 1800, users: 250 },
    { month: "Apr", revenue: 2400, users: 340 },
    { month: "May", revenue: 3200, users: 480 },
    { month: "Jun", revenue: 4100, users: 620 }
  ];

  const userGrowthData = [
    { day: "Mon", active: 45, new: 8 },
    { day: "Tue", active: 52, new: 12 },
    { day: "Wed", active: 48, new: 6 },
    { day: "Thu", active: 61, new: 15 },
    { day: "Fri", active: 55, new: 10 },
    { day: "Sat", active: 43, new: 7 },
    { day: "Sun", active: 38, new: 5 }
  ];

  const conversionData = [
    { name: "Visitors", value: 1000, color: "#8884d8" },
    { name: "Sign-ups", value: 250, color: "#82ca9d" },
    { name: "Paid Users", value: 85, color: "#ffc658" },
    { name: "Churned", value: 15, color: "#ff7c7c" }
  ];

  const kpis = [
    { title: "Monthly Revenue", value: "$4,100", change: "+28%", icon: DollarSign, trend: "up" },
    { title: "Active Users", value: "620", change: "+45%", icon: Users, trend: "up" },
    { title: "Conversion Rate", value: "8.5%", change: "+2.1%", icon: TrendingUp, trend: "up" },
    { title: "Churn Rate", value: "2.4%", change: "-0.8%", icon: Activity, trend: "down" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics Dashboard
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Business Intelligence
              </h1>
              <p className="text-xl text-muted-foreground">
                Track performance and make data-driven decisions
              </p>
            </div>
            <div className="flex gap-3">
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

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => {
              const IconComponent = kpi.icon;
              return (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className={`text-sm ${kpi.trend === "up" ? "text-success" : "text-destructive"}`}>
                          {kpi.change} from last month
                        </p>
                      </div>
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly revenue and user acquisition trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users and new registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="active" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="new" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>User journey from visitor to paid customer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={conversionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {conversionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Conversion Metrics</CardTitle>
                    <CardDescription>Key conversion statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Visitor to Sign-up</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sign-up to Paid</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "34%" }}></div>
                        </div>
                        <span className="text-sm font-medium">34%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Conversion</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "8.5%" }}></div>
                        </div>
                        <span className="text-sm font-medium">8.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Automated Reports</CardTitle>
                  <CardDescription>Schedule and download business reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[
                      { name: "Monthly Revenue Report", schedule: "1st of each month", format: "PDF" },
                      { name: "User Growth Analysis", schedule: "Weekly", format: "Excel" },
                      { name: "Conversion Funnel Report", schedule: "Bi-weekly", format: "PDF" },
                      { name: "Customer Churn Analysis", schedule: "Monthly", format: "PDF" }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div>
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.schedule} • {report.format} format
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
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