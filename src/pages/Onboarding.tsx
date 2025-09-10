import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mail, Shield, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const steps = [
    {
      title: "Welcome to Smart Expense Tracking",
      description: "Let's get you set up in just a few simple steps",
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-primary-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            We'll help you connect your email and start tracking expenses automatically
          </p>
        </div>
      )
    },
    {
      title: "Connect Your Email",
      description: "We'll scan for transaction confirmations and receipts",
      content: (
        <div className="space-y-6">
          <div className="bg-accent/20 p-6 rounded-lg border border-accent/30">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Your Privacy is Protected</h3>
                <p className="text-sm text-muted-foreground">
                  We only read transaction-related emails. Your personal emails remain completely private.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              variant="hero" 
              className="w-full" 
              onClick={() => setIsConnecting(true)}
              disabled={isConnecting}
            >
              <Mail className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Gmail Account"}
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Connect Outlook Account
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "Email Sync in Progress",
      description: "We're analyzing your past 3 months of transactions",
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Mail className="w-12 h-12 text-success-foreground" />
          </div>
          <div className="space-y-3">
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Found 127 transactions • Categorizing expenses...
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm">
              This usually takes 1-2 minutes. We're being thorough to ensure accuracy.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Setup Complete!",
      description: "Your expense tracker is ready to use",
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-success-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-success">All Set!</h3>
            <p className="text-muted-foreground">
              We've found and categorized your transactions. Let's explore your dashboard.
            </p>
          </div>
          <div className="bg-accent/20 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">127</div>
                <div className="text-xs text-muted-foreground">Transactions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">₹45,340</div>
                <div className="text-xs text-muted-foreground">Total Spent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">8</div>
                <div className="text-xs text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="p-8 bg-gradient-card border-0 shadow-medium animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{currentStepData.title}</h1>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </div>

          <div className="mb-8">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Link to="/dashboard">
                <Button variant="financial">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button 
                variant="default"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === 1 && !isConnecting}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;