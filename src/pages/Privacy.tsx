import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Your Privacy Matters
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Personal Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Email address and account credentials</li>
                  <li>Name and profile information you provide</li>
                  <li>Company name and business details (optional)</li>
                  <li>Location information (optional)</li>
                </ul>

                <h4 className="font-semibold mt-6">Usage Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>How you interact with our platform</li>
                  <li>Features you use and time spent</li>
                  <li>Device and browser information</li>
                  <li>IP address and general location</li>
                </ul>

                <h4 className="font-semibold mt-6">Content You Create</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Startup ideas and business plans</li>
                  <li>Generated content and documents</li>
                  <li>Project data and collaborations</li>
                  <li>Comments and feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide and improve our startup building tools</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Send important updates about your account</li>
                  <li>Provide customer support and assistance</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Security Measures</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Industry-standard encryption for data transmission</li>
                  <li>Secure cloud infrastructure with regular backups</li>
                  <li>Multi-factor authentication options</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access to personal data by employees</li>
                </ul>

                <h4 className="font-semibold mt-6">Data Retention</h4>
                <p className="text-muted-foreground">
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. You can request deletion of your account and data 
                  at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">You Have the Right To:</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of marketing communications</li>
                  <li>Restrict processing of your information</li>
                  <li>Object to automated decision-making</li>
                </ul>

                <h4 className="font-semibold mt-6">Managing Your Privacy</h4>
                <p className="text-muted-foreground">
                  You can update your privacy preferences, manage data sharing settings, 
                  and control communication preferences through your account settings.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Service Providers</h4>
                <p className="text-muted-foreground">
                  We work with trusted third-party services to provide our platform:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Supabase for secure database and authentication</li>
                  <li>AI services for content generation features</li>
                  <li>Analytics tools for platform improvement</li>
                  <li>Payment processors for subscription management</li>
                  <li>Email services for communications</li>
                </ul>

                <h4 className="font-semibold mt-6">Data Sharing</h4>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We only share data when necessary 
                  to provide our services, comply with legal requirements, or protect our users.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or how we handle your data, 
                  please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@blinked.com</p>
                  <p>Address: 123 Vision Street, Startup City, SC 12345</p>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Policy Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of 
                    significant changes via email or through our platform. Continued use of our 
                    services after changes become effective constitutes acceptance of the new policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}