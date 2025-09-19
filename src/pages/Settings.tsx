import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, User, Bell, Shield, Brain,
  Palette, Globe, Database, Code, Zap, Key, Lock,
  Mail, Smartphone, Monitor, Moon, Sun, Volume2,
  Download, Upload, Trash2, RefreshCw, Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    
    // AI Settings
    aiAssistance: true,
    proactiveHints: true,
    autoOptimization: true,
    contextAwareness: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    deploymentAlerts: true,
    aiSuggestions: true,
    
    // Privacy & Security
    profileVisibility: 'public',
    dataSharing: false,
    analyticsTracking: true,
    twoFactorAuth: false,
    
    // Development
    autoSave: true,
    codeFormatting: true,
    linting: true,
    typeChecking: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    try {
      // Save settings to database
      console.log('Saving settings:', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Customize Your Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Configure Smack Builder and Smacked AI to work exactly how you want
            </p>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    General Preferences
                  </CardTitle>
                  <CardDescription>
                    Basic application settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <select 
                        value={settings.theme}
                        onChange={(e) => updateSetting('theme', e.target.value)}
                        className="w-full p-2 border border-border/50 rounded-md bg-background"
                      >
                        <option value="dark">Dark (Recommended)</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select 
                        value={settings.language}
                        onChange={(e) => updateSetting('language', e.target.value)}
                        className="w-full p-2 border border-border/50 rounded-md bg-background"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      className="w-full p-2 border border-border/50 rounded-md bg-background"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Brain className="w-5 h-5 animate-pulse" />
                    Smacked AI Configuration
                  </CardTitle>
                  <CardDescription>
                    Customize how Smacked AI assists with your development
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AI Assistance</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable AI-powered development assistance
                        </p>
                      </div>
                      <Switch 
                        checked={settings.aiAssistance}
                        onCheckedChange={(checked) => updateSetting('aiAssistance', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Proactive Hints</h4>
                        <p className="text-sm text-muted-foreground">
                          Get suggestions before you ask
                        </p>
                      </div>
                      <Switch 
                        checked={settings.proactiveHints}
                        onCheckedChange={(checked) => updateSetting('proactiveHints', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically optimize code and performance
                        </p>
                      </div>
                      <Switch 
                        checked={settings.autoOptimization}
                        onCheckedChange={(checked) => updateSetting('autoOptimization', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Context Awareness</h4>
                        <p className="text-sm text-muted-foreground">
                          AI learns from your project context
                        </p>
                      </div>
                      <Switch 
                        checked={settings.contextAwareness}
                        onCheckedChange={(checked) => updateSetting('contextAwareness', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Control when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive updates via email
                          </p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Browser and mobile push notifications
                          </p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Deployment Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications for deployment status
                          </p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.deploymentAlerts}
                        onCheckedChange={(checked) => updateSetting('deploymentAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Brain className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">AI Suggestions</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications for AI recommendations
                          </p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.aiSuggestions}
                        onCheckedChange={(checked) => updateSetting('aiSuggestions', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security & Privacy
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {settings.twoFactorAuth ? 'Disable' : 'Enable'}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Profile Visibility</h4>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile
                        </p>
                      </div>
                      <select 
                        value={settings.profileVisibility}
                        onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                        className="p-2 border border-border/50 rounded-md bg-background text-sm"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="team">Team Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Sharing</h4>
                        <p className="text-sm text-muted-foreground">
                          Share anonymized usage data to improve AI
                        </p>
                      </div>
                      <Switch 
                        checked={settings.dataSharing}
                        onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Analytics Tracking</h4>
                        <p className="text-sm text-muted-foreground">
                          Help us improve the platform with usage analytics
                        </p>
                      </div>
                      <Switch 
                        checked={settings.analyticsTracking}
                        onCheckedChange={(checked) => updateSetting('analyticsTracking', checked)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-semibold mb-3">Account Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export Account Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Preferences
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="development" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Development Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure code generation and development tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto Save</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically save changes as you work
                        </p>
                      </div>
                      <Switch 
                        checked={settings.autoSave}
                        onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Code Formatting</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically format code with Prettier
                        </p>
                      </div>
                      <Switch 
                        checked={settings.codeFormatting}
                        onCheckedChange={(checked) => updateSetting('codeFormatting', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">ESLint</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable linting for code quality
                        </p>
                      </div>
                      <Switch 
                        checked={settings.linting}
                        onCheckedChange={(checked) => updateSetting('linting', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">TypeScript Strict Mode</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable strict type checking
                        </p>
                      </div>
                      <Switch 
                        checked={settings.typeChecking}
                        onCheckedChange={(checked) => updateSetting('typeChecking', checked)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-semibold mb-3">Code Generation Preferences</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Default Framework</label>
                        <select className="w-full p-2 border border-border/50 rounded-md bg-background">
                          <option value="react">React + TypeScript</option>
                          <option value="vue">Vue.js + TypeScript</option>
                          <option value="svelte">Svelte + TypeScript</option>
                          <option value="angular">Angular</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">CSS Framework</label>
                        <select className="w-full p-2 border border-border/50 rounded-md bg-background">
                          <option value="tailwind">Tailwind CSS</option>
                          <option value="styled-components">Styled Components</option>
                          <option value="emotion">Emotion</option>
                          <option value="css-modules">CSS Modules</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}