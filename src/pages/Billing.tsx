import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, Download, Calendar, DollarSign, Zap,
  Crown, Rocket, Star, CheckCircle, AlertTriangle,
  Brain, Users, Globe, Shield, BarChart3, Clock,
  RefreshCw, ExternalLink, Copy, Mail, Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  price: number;
  currency: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  downloadUrl: string;
}

interface UsageMetric {
  label: string;
  current: number;
  limit: number;
  unit: string;
  resetDate: string;
}

export default function Billing() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [usage, setUsage] = useState<UsageMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockSubscription: Subscription = {
      id: "sub_1234567890",
      plan: "Pro",
      status: "active",
      currentPeriodStart: "2024-01-01T00:00:00Z",
      currentPeriodEnd: "2024-02-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      price: 29,
      currency: "USD"
    };

    const mockInvoices: Invoice[] = [
      {
        id: "inv_001",
        number: "SMB-2024-001",
        amount: 29,
        currency: "USD",
        status: "paid",
        date: "2024-01-01T00:00:00Z",
        downloadUrl: "#"
      },
      {
        id: "inv_002",
        number: "SMB-2023-012",
        amount: 29,
        currency: "USD",
        status: "paid",
        date: "2023-12-01T00:00:00Z",
        downloadUrl: "#"
      }
    ];

    const mockUsage: UsageMetric[] = [
      {
        label: "AI App Generations",
        current: 23,
        limit: 50,
        unit: "apps",
        resetDate: "2024-02-01T00:00:00Z"
      },
      {
        label: "Deployments",
        current: 45,
        limit: 100,
        unit: "deployments",
        resetDate: "2024-02-01T00:00:00Z"
      },
      {
        label: "Team Members",
        current: 3,
        limit: 10,
        unit: "members",
        resetDate: "2024-02-01T00:00:00Z"
      },
      {
        label: "Storage Used",
        current: 2.4,
        limit: 10,
        unit: "GB",
        resetDate: "2024-02-01T00:00:00Z"
      }
    ];

    setTimeout(() => {
      setSubscription(mockSubscription);
      setInvoices(mockInvoices);
      setUsage(mockUsage);
      setLoading(false);
    }, 1000);
  }, []);

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for trying out Smack Builder",
      features: [
        "5 AI app generations per month",
        "Basic templates",
        "Community support",
        "1 GB storage"
      ],
      icon: Zap,
      current: false
    },
    {
      name: "Pro",
      price: 29,
      period: "month",
      description: "For serious developers and small teams",
      features: [
        "50 AI app generations per month",
        "Premium templates",
        "Priority support",
        "10 GB storage",
        "Custom domains",
        "Team collaboration (up to 10 members)",
        "Advanced analytics"
      ],
      icon: Rocket,
      current: true
    },
    {
      name: "Enterprise",
      price: 99,
      period: "month",
      description: "For large teams and organizations",
      features: [
        "Unlimited AI app generations",
        "All templates and features",
        "24/7 dedicated support",
        "100 GB storage",
        "White-label options",
        "Unlimited team members",
        "Advanced security features",
        "Custom integrations",
        "SLA guarantee"
      ],
      icon: Crown,
      current: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <CreditCard className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Loading Billing Information...</h2>
              <p className="text-muted-foreground">Fetching your subscription and usage data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing & Usage
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Manage Your Subscription
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Track usage, manage billing, and upgrade your plan
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Current Subscription */}
              {subscription && (
                <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Crown className="w-5 h-5" />
                        Current Plan: {subscription.plan}
                      </CardTitle>
                      <Badge variant="default" className="bg-green-500/10 text-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {subscription.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Your subscription is active and renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Billing Amount</h4>
                        <div className="text-2xl font-bold text-primary">
                          ${subscription.price}/{subscription.currency === 'USD' ? 'month' : subscription.currency}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Next Billing Date</h4>
                        <div className="text-lg font-medium">
                          {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Actions</h4>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Update Payment
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Cancel Subscription
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Usage Summary */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {usage.map((metric, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{metric.label}</h4>
                          <Badge variant="outline" className="text-xs">
                            {metric.current}/{metric.limit} {metric.unit}
                          </Badge>
                        </div>
                        <Progress value={(metric.current / metric.limit) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Resets {new Date(metric.resetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Detailed Usage Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your platform usage across all features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {usage.map((metric, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{metric.label}</h4>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {metric.current} / {metric.limit} {metric.unit}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {((metric.current / metric.limit) * 100).toFixed(1)}% used
                            </div>
                          </div>
                        </div>
                        <Progress value={(metric.current / metric.limit) * 100} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Current period started {new Date().toLocaleDateString()}</span>
                          <span>Resets {new Date(metric.resetDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Billing History
                  </CardTitle>
                  <CardDescription>
                    Download invoices and view payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{invoice.number}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()} • ${invoice.amount} {invoice.currency}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                            className={invoice.status === 'paid' ? 'bg-green-500/10 text-green-500' : ''}
                          >
                            {invoice.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan, index) => {
                  const IconComponent = plan.icon;
                  return (
                    <Card 
                      key={index} 
                      className={`shadow-card ${plan.current ? 'ring-2 ring-primary border-primary/50' : ''}`}
                    >
                      {plan.current && (
                        <div className="bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                          Current Plan
                        </div>
                      )}
                      
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold">
                          ${plan.price}
                          <span className="text-base font-normal text-muted-foreground">
                            /{plan.period}
                          </span>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className={`w-full ${
                            plan.current 
                              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                              : 'bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all'
                          }`}
                          disabled={plan.current}
                        >
                          {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Enterprise Contact */}
              <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                <CardContent className="p-8 text-center">
                  <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Need Something Custom?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact our sales team for enterprise solutions, custom pricing, and white-label options.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Sales
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
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