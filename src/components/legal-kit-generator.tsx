import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Download, FileText, Shield, Globe, Users } from "lucide-react";

export default function LegalKitGenerator() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [businessType, setBusinessType] = useState("");

  const legalDocuments = [
    { name: "Terms of Service", description: "User agreement and platform rules", icon: FileText, status: "Ready" },
    { name: "Privacy Policy", description: "GDPR & CCPA compliant privacy policy", icon: Shield, status: "Ready" },
    { name: "Founder Agreement", description: "Equity split and roles definition", icon: Users, status: "Ready" },
    { name: "Contractor Agreement", description: "Freelancer and consultant contracts", icon: FileText, status: "Ready" },
    { name: "Incorporation Guide", description: "Step-by-step company formation", icon: Globe, status: "Ready" },
    { name: "IP Protection Checklist", description: "Trademark and patent guidance", icon: Scale, status: "Ready" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Scale className="w-4 h-4 mr-2" />
              Legal Kit Generator
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Complete Legal Starter Kit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Essential legal documents and guidance for your startup
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Setup Requirements</CardTitle>
                <CardDescription>
                  Customize documents for your jurisdiction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jurisdiction</label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Business Type</label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS Platform</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="service">Service Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" disabled={!jurisdiction || !businessType}>
                  <Scale className="w-4 h-4 mr-2" />
                  Generate Legal Kit
                </Button>
              </CardContent>
            </Card>

            <div className="md:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Legal Documents</CardTitle>
                  <CardDescription>
                    Essential legal templates for your startup
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {legalDocuments.map((doc, index) => {
                      const IconComponent = doc.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-semibold">{doc.name}</h4>
                              <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">
                      ⚖️ Legal Compliance Features
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• GDPR & CCPA compliant templates</li>
                      <li>• Jurisdiction-specific customization</li>
                      <li>• Attorney-reviewed documents</li>
                      <li>• Regular updates for law changes</li>
                      <li>• Integration with legal services</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}