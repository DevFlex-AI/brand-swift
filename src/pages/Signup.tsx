import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Zap, Mail, Lock, Github, Chrome, ArrowRight, Brain, 
  User, Building, MapPin, CheckCircle, Shield, Rocket
} from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    companyName: '',
    location: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signUp, signInWithOAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');

    const { error } = await signInWithOAuth(provider);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, {
      display_name: formData.displayName,
      company_name: formData.companyName,
      location: formData.location
    });
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.');
    }
    
    setLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Smack Builder
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Create Your Account</h2>
          <p className="text-muted-foreground mt-2">
            Join thousands of developers building with AI
          </p>
        </div>

        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Get Started with Smack Builder
            </CardTitle>
            <CardDescription>
              Start building autonomous AI applications today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
                onClick={() => handleOAuthSignIn('google')}
                disabled={loading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
                onClick={() => handleOAuthSignIn('github')}
                disabled={loading}
              >
                <Github className="w-4 h-4 mr-2" />
                Continue with GitHub
              </Button>
            </div>

            <div className="flex items-center my-6">
              <Separator className="flex-1" />
              <span className="px-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Error/Success Alerts */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.displayName}
                    onChange={(e) => updateFormData('displayName', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all font-semibold" 
                disabled={loading || !acceptTerms}
              >
                {loading ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="shadow-card border-primary/20 bg-gradient-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              What you get with Smack Builder:
            </h3>
            <div className="space-y-2">
              {[
                "Autonomous AI app generation",
                "Production-ready code output",
                "Instant deployment to cloud",
                "Enterprise-grade security",
                "24/7 AI development assistant"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}