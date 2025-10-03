import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Mail,
  Shield,
  TrendingUp,
  PieChart,
  BarChart3,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import heroImage from "@/assets/hero-dashboard.jpg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getSelfCall } from "@/store/slices/authSlice";
import { googleOAuth } from "@/utils";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && !loading && !initialCheckDone) {
        await dispatch(getSelfCall());
      }
      setInitialCheckDone(true);
    };
    checkAuth();
  }, []);

  if (user || isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-pattern-primary opacity-20" />
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-accent rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-success rounded-full blur-2xl opacity-25 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 mobile-container overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Smart
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    {" "}
                    Expense{" "}
                  </span>
                  Tracking
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Automatically extract transactions from your emails. Get
                  insights that help you save money and make better financial
                  decisions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/onboarding">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group w-full sm:w-auto"
                  >
                    Get Started
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={googleOAuth}
                >
                  Sign In
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-up order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20 animate-pulse" />
              <img
                src={heroImage}
                alt="Financial Dashboard"
                className="relative rounded-2xl shadow-colorful w-full max-w-lg mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 mobile-container bg-secondary/30 relative">
        <div className="absolute inset-0 bg-pattern-dots opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless and
              insightful
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Mail,
                title: "Email Integration",
                description:
                  "Automatically extract transaction data from your email confirmations and receipts",
              },
              {
                icon: PieChart,
                title: "Visual Insights",
                description:
                  "Beautiful charts and graphs that help you understand your spending patterns",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Bank-level security with end-to-end encryption for your financial data",
              },
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                description:
                  "AI-powered insights to help you identify savings opportunities",
              },
              {
                icon: BarChart3,
                title: "Detailed Reports",
                description:
                  "Comprehensive spending reports with customizable date ranges and filters",
              },
              {
                icon: ArrowRight,
                title: "Goal Tracking",
                description:
                  "Set budgets and track progress towards your financial goals",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 bg-gradient-card border-0 shadow-colorful hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 mobile-container relative">
        <div className="absolute inset-0 bg-gradient-accent opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who are already saving money with smart
              expense tracking
            </p>
            <Link to="/onboarding">
              <Button
                variant="financial"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3"
              >
                Start Your Financial Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
