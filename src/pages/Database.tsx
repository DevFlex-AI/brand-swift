import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Table, Plus, Edit3, Trash2, Eye, Code,
  Brain, Zap, Shield, Key, Users, BarChart3, Settings,
  Search, Filter, Download, Upload, RefreshCw, CheckCircle
} from 'lucide-react';

interface DatabaseTable {
  id: string;
  name: string;
  description: string;
  columns: number;
  rows: number;
  size: string;
  lastModified: string;
  hasRLS: boolean;
}

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'supabase' | 'postgresql' | 'mysql' | 'mongodb';
  status: 'connected' | 'disconnected' | 'error';
  url: string;
  lastSync: string;
}

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null);

  const tables: DatabaseTable[] = [
    {
      id: "users",
      name: "users",
      description: "User accounts and authentication data",
      columns: 8,
      rows: 1247,
      size: "2.4 MB",
      lastModified: "2024-01-20T10:30:00Z",
      hasRLS: true
    },
    {
      id: "projects",
      name: "projects",
      description: "AI-generated application projects",
      columns: 12,
      rows: 892,
      size: "5.7 MB",
      lastModified: "2024-01-20T09:15:00Z",
      hasRLS: true
    },
    {
      id: "deployments",
      name: "deployments",
      description: "Deployment history and configurations",
      columns: 10,
      rows: 2341,
      size: "1.8 MB",
      lastModified: "2024-01-20T08:45:00Z",
      hasRLS: true
    },
    {
      id: "ai_generations",
      name: "ai_generations",
      description: "AI generation requests and responses",
      columns: 15,
      rows: 15420,
      size: "45.2 MB",
      lastModified: "2024-01-20T11:20:00Z",
      hasRLS: true
    }
  ];

  const connections: DatabaseConnection[] = [
    {
      id: "main",
      name: "Smack Builder Main DB",
      type: "supabase",
      status: "connected",
      url: "postgresql://***@db.supabase.co:5432/postgres",
      lastSync: "2024-01-20T11:30:00Z"
    }
  ];

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Database className="w-4 h-4 mr-2" />
              Database Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              AI-Powered Database
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Manage your application data with intelligent automation
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Connection Status */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Database Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {connections.map((connection) => (
                    <div key={connection.id} className="p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{connection.name}</h4>
                        <Badge 
                          variant={connection.status === 'connected' ? 'default' : 'secondary'}
                          className={connection.status === 'connected' ? 'bg-green-500/10 text-green-500' : ''}
                        >
                          {connection.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {connection.type.toUpperCase()} • Last sync: {new Date(connection.lastSync).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Database Assistant */}
              <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Brain className="w-5 h-5 animate-pulse" />
                    Smacked AI
                  </CardTitle>
                  <CardDescription>
                    Database optimization assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-sm mb-2">AI Recommendations:</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Add index on users.email for faster queries</li>
                      <li>• Consider partitioning ai_generations table</li>
                      <li>• Enable connection pooling for better performance</li>
                    </ul>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Zap className="w-3 h-3 mr-1" />
                    Apply AI Optimizations
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Table
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Backup
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    SQL Editor
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="tables" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="queries">Queries</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="tables" className="space-y-6">
                  {/* Search and Filters */}
                  <Card className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            placeholder="Search tables..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline">
                          <Filter className="w-4 h-4 mr-2" />
                          Filters
                        </Button>
                        <Button variant="outline">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tables Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredTables.map((table) => (
                      <Card 
                        key={table.id} 
                        className="shadow-card hover:shadow-electric transition-all cursor-pointer"
                        onClick={() => setSelectedTable(table)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Table className="w-5 h-5 text-primary" />
                              {table.name}
                            </CardTitle>
                            {table.hasRLS && (
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                <Shield className="w-3 h-3 mr-1" />
                                RLS
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{table.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Columns</div>
                                <div className="font-medium">{table.columns}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Rows</div>
                                <div className="font-medium">{table.rows.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Size</div>
                                <div className="font-medium">{table.size}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="w-3 h-3 mr-1" />
                                View Data
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Code className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="queries" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        SQL Query Editor
                      </CardTitle>
                      <CardDescription>
                        Execute SQL queries with AI assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">SQL Query Editor</h3>
                        <p className="text-muted-foreground mb-4">
                          Write and execute SQL queries with AI-powered suggestions
                        </p>
                        <Button variant="outline">
                          <Brain className="w-4 h-4 mr-2" />
                          Open SQL Editor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Database Security
                      </CardTitle>
                      <CardDescription>
                        Manage Row Level Security and access policies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tables.map((table) => (
                          <div key={table.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                            <div>
                              <h4 className="font-semibold">{table.name}</h4>
                              <p className="text-sm text-muted-foreground">{table.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {table.hasRLS ? (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  RLS Enabled
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-yellow-500">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  No RLS
                                </Badge>
                              )}
                              <Button size="sm" variant="outline">
                                <Settings className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {tables.reduce((sum, t) => sum + t.rows, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Rows</div>
                          </div>
                          <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">{tables.length}</div>
                            <div className="text-sm text-muted-foreground">Active Tables</div>
                          </div>
                          <Table className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {(parseFloat(tables.reduce((sum, t) => sum + parseFloat(t.size), 0).toFixed(1)))} MB
                            </div>
                            <div className="text-sm text-muted-foreground">Database Size</div>
                          </div>
                          <Database className="w-8 h-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Query Performance</CardTitle>
                      <CardDescription>
                        Monitor database performance and optimization opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                        <p className="text-muted-foreground mb-4">
                          Track query performance and get AI-powered optimization suggestions
                        </p>
                        <Button variant="outline">
                          <Brain className="w-4 h-4 mr-2" />
                          Analyze Performance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}