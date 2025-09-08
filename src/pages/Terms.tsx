import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Scale, AlertTriangle, Shield, Coins, Users } from 'lucide-react';

export default function Terms() {
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
                <FileText className="w-4 h-4 mr-2" />
                Terms of Service
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Terms of Service
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
                  <Scale className="w-5 h-5 text-primary" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using FlashBrand ("the Service"), you agree to be bound by these 
                  Terms of Service ("Terms"). If you disagree with any part of these terms, you may 
                  not access the Service.
                </p>
                
                <p className="text-muted-foreground">
                  FlashBrand is a startup building platform that provides tools, resources, and AI-powered 
                  assistance to help entrepreneurs build and launch their businesses. These Terms apply to 
                  all users of the Service, including free and paid subscribers.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  User Accounts & Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Account Creation</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account credentials</li>
                  <li>You must be at least 18 years old to use the Service</li>
                  <li>One person may not maintain multiple accounts</li>
                </ul>

                <h4 className="font-semibold mt-6">Acceptable Use</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use the Service only for lawful purposes and legitimate business activities</li>
                  <li>Do not violate any local, state, national, or international laws</li>
                  <li>Do not transmit viruses, malware, or other harmful code</li>
                  <li>Do not attempt to gain unauthorized access to the Service</li>
                  <li>Do not use the Service to spam, harass, or harm others</li>
                  <li>Do not reverse engineer or attempt to extract source code</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Intellectual Property & Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Your Content</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You retain ownership of content you create using the Service</li>
                  <li>You grant us a license to store, process, and display your content as necessary to provide the Service</li>
                  <li>You are responsible for ensuring your content doesn't infringe on others' rights</li>
                  <li>You may delete your content at any time through your account settings</li>
                </ul>

                <h4 className="font-semibold mt-6">Our Intellectual Property</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>FlashBrand platform, features, and technology are our proprietary property</li>
                  <li>Our trademarks, logos, and brand elements may not be used without permission</li>
                  <li>AI-generated content is provided as-is for your business use</li>
                  <li>You may not redistribute or resell our proprietary tools and features</li>
                </ul>

                <h4 className="font-semibold mt-6">AI-Generated Content</h4>
                <p className="text-muted-foreground">
                  Content generated by our AI tools is provided to assist your business development. 
                  While you may use this content for your projects, we recommend reviewing and 
                  customizing it to ensure accuracy and appropriateness for your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  Payments & Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Billing</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable except as required by law</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>

                <h4 className="font-semibold mt-6">Cancellation</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You may cancel your subscription at any time through account settings</li>
                  <li>Cancellation takes effect at the end of your current billing period</li>
                  <li>You retain access to paid features until the end of your billing period</li>
                  <li>We may terminate accounts for violations of these Terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Privacy & Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your privacy is important to us. Our collection, use, and protection of your 
                  personal information is governed by our{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  , which is incorporated into these Terms by reference.
                </p>
                
                <h4 className="font-semibold">Data Security</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>We implement industry-standard security measures</li>
                  <li>Your business data is encrypted and securely stored</li>
                  <li>We do not sell your personal information to third parties</li>
                  <li>You may request data deletion in accordance with applicable laws</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Disclaimers & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Service Availability</h4>
                <p className="text-muted-foreground">
                  While we strive for 100% uptime, the Service is provided "as is" without 
                  guarantees of availability. We may experience downtime for maintenance, 
                  updates, or technical issues.
                </p>

                <h4 className="font-semibold mt-6">Business Advice Disclaimer</h4>
                <p className="text-muted-foreground">
                  FlashBrand provides tools and AI-powered suggestions to assist with business 
                  development. This should not be considered professional business, legal, or 
                  financial advice. Always consult with qualified professionals for important 
                  business decisions.
                </p>

                <h4 className="font-semibold mt-6">Limitation of Liability</h4>
                <p className="text-muted-foreground">
                  In no event shall FlashBrand be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising from your use of the Service.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Governing Law & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Governing Law</h4>
                <p className="text-muted-foreground">
                  These Terms are governed by the laws of [Your Jurisdiction] without regard to 
                  conflict of law principles. Any disputes will be resolved in the courts of 
                  [Your Jurisdiction].
                </p>

                <h4 className="font-semibold mt-6">Changes to Terms</h4>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Material changes will 
                  be communicated via email or platform notification. Continued use constitutes 
                  acceptance of updated Terms.
                </p>

                <h4 className="font-semibold mt-6">Contact Information</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>For questions about these Terms:</p>
                  <p>Email: legal@flashbrand.com</p>
                  <p>Address: 123 Innovation Street, Tech City, TC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}