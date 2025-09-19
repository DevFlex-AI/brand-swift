import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Brain,
  Code,
  Rocket,
  Globe,
  Shield,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "AI App Builder", href: "/builder" },
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Enterprise", href: "/enterprise" },
        { name: "API", href: "/api" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" }
      ]
    }
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/smack-builder", icon: Github },
    { name: "Twitter", href: "https://twitter.com/smack_builder", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/company/smack-builder", icon: Linkedin },
    { name: "Email", href: "mailto:hello@smackbuilder.com", icon: Mail }
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Smack Builder
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                The world's most advanced autonomous AI app builder. Transform your ideas into 
                production-ready applications with the power of Smacked AI.
              </p>

              {/* Key Features */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: Brain, text: "Autonomous AI Development" },
                  { icon: Code, text: "Production-Ready Code" },
                  { icon: Rocket, text: "Instant Deployment" },
                  { icon: Shield, text: "Enterprise Security" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted/50 hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Stay Updated with Smack Builder
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the latest updates on AI development tools and new features.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {currentYear} Smack Builder. All rights reserved.</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-primary" />
                <span>by the Smack Builder team</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/status" className="text-muted-foreground hover:text-primary transition-colors">
                System Status
              </Link>
              <Link to="/changelog" className="text-muted-foreground hover:text-primary transition-colors">
                Changelog
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;