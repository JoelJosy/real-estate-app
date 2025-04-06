import { Search, Home, Key } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Search Properties",
      description:
        "Browse thousands of properties that match your preferences and requirements.",
    },
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "Find Your Perfect Home",
      description:
        "Explore detailed listings, view photos, and schedule visits to find your ideal property.",
    },
    {
      icon: <Key className="h-10 w-10 text-primary" />,
      title: "Make It Yours",
      description:
        "Connect with sellers or agents directly and make an offer on your dream home.",
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-3 my-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">{step.icon}</div>
          <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
}