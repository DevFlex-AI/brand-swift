import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Zap, Rocket, Target, Users, MessageCircle, X } from "lucide-react";

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Zap, label: "Instant Business", action: () => window.location.href = "/submit" },
    { icon: Rocket, label: "Launch Now", action: () => window.location.href = "/dashboard" },
    { icon: Target, label: "Ad Generator", action: () => window.location.href = "/ads" },
    { icon: Users, label: "Team Builder", action: () => window.location.href = "/team" },
    { icon: MessageCircle, label: "AI Coach", action: () => window.location.href = "/coaching" }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-4">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="p-3 shadow-glow animate-float-3d cursor-pointer hover:shadow-electric transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={item.action}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary animate-pulse-3d" />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        className="w-14 h-14 rounded-full shadow-glow animate-pulse-glow hover:animate-rotate-3d transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}