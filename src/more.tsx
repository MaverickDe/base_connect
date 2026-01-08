import { Building, Code, Zap } from "lucide-react";

  export const plansVar = [
    {
      name: "Developer",
      title: "Developer",
      free:true,
      description: "Perfect for individual developers and small projects",
      monthlyPrice: 0,
      yearlyPrice: 0,
      amount:0,
      popular: false,
      icon: <Code className="w-6 h-6" />,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "Up to 3 projects",
        "Basic environment sync",
        "Standard encryption",
        "Email support",
        "5GB storage",
        "Community access"
      ]
    },
    {
      name: "Professional",
      title: "Professional",
      description: "For growing teams and production applications",
      monthlyPrice: 29,
      yearlyPrice: 290, // 2 months free
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-purple-500 to-cyan-500",
      features: [
        "Unlimited projects",
        "Real-time sync",
        "Military-grade encryption",
        "Priority support",
        "100GB storage",
        "Advanced callbacks",
        "Team collaboration",
        "Version history",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      title: "Enterprise",
      description: "For large organizations with advanced security needs",
      monthlyPrice: 99,
      yearlyPrice: 990, // 2 months free
      popular: false,
      icon: <Building className="w-6 h-6" />,
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Everything in Professional",
        "SSO integration",
        "Advanced audit logs",
        "Custom integrations",
        "Unlimited storage",
        "24/7 phone support",
        "SLA guarantee",
        "On-premise deployment",
        "Custom contracts",
        "Dedicated account manager"
      ]
    }
  ];