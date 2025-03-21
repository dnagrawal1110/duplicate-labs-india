
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui-custom/Container';
import { Button } from '@/components/ui-custom/Button';
import { Card } from '@/components/ui-custom/Card';
import { useInView, getInViewAnimation } from '@/lib/animations';
import { Check, HelpCircle } from 'lucide-react';

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText = 'Get Started',
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}) => {
  return (
    <Card 
      className={`flex flex-col h-full ${isPopular ? 'border-primary/40 shadow-lg' : ''}`}
      padding="lg"
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground text-sm mt-2">{description}</p>
      </div>
      
      <div className="mt-2 mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground ml-2">/month</span>}
        </div>
      </div>

      <div className="flex-grow">
        <h4 className="font-medium text-sm mb-3">What's included:</h4>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button className="w-full" variant={isPopular ? 'primary' : 'outline'}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

const EnterpriseCard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left bg-secondary/30 rounded-2xl p-6 md:p-8 mt-12">
      <div className="md:flex-1">
        <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
        <p className="text-muted-foreground">Need a custom solution? Our enterprise plan offers specialized features, more flexibility and dedicated support.</p>
      </div>
      <div>
        <Button variant="primary" size="lg">Contact Sales</Button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const { ref, isInView } = useInView();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pricingTiers = [
    {
      name: "Free Tier",
      price: "₹0",
      description: "Perfect for trying out our voice capabilities",
      features: [
        "10 voice conversions per month",
        "Standard quality voices",
        "Text-to-speech functionality",
        "Basic voice cloning",
        "Access to 5 Indian language voices"
      ]
    },
    {
      name: "Creator",
      price: "₹899",
      description: "For content creators and individual users",
      isPopular: true,
      features: [
        "100 voice conversions per month",
        "High quality voices",
        "Priority queue processing",
        "Advanced voice cloning",
        "Access to all Indian language voices",
        "Download in multiple formats"
      ]
    },
    {
      name: "Professional",
      price: "₹2,499",
      description: "For professional creators and small businesses",
      features: [
        "500 voice conversions per month",
        "Ultra high quality voices",
        "Priority support",
        "Enterprise-grade voice cloning",
        "All Indian language voices",
        "Commercial usage rights",
        "Custom voice design"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      buttonText: "Contact Sales",
      features: [
        "Unlimited voice conversions",
        "Highest quality voices",
        "Dedicated account manager",
        "Advanced API access",
        "Custom voice development",
        "On-premise deployment options",
        "SLA guarantees"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="py-16 md:py-24"
        >
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={getInViewAnimation(isInView, 'fade-in')}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-foreground/80 text-balance">
                  Choose the perfect plan for your voice needs. All plans come with our full suite of Indian language voices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, i) => (
                <div 
                  key={i} 
                  className={getInViewAnimation(isInView, 'fade-in-up', 100 + i * 100)}
                >
                  <PricingTier {...tier} />
                </div>
              ))}
            </div>

            <div className={getInViewAnimation(isInView, 'fade-in', 500)}>
              <EnterpriseCard />
            </div>
          </Container>
        </section>

        <section className="py-16 bg-secondary/10">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="grid gap-6 mt-10 md:grid-cols-2 text-left">
                <div className="p-6 bg-card rounded-xl shadow-sm">
                  <div className="flex gap-2 mb-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">How does the voice cloning work?</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Our technology uses deep learning to analyze voice samples and create a digital clone that matches the original voice's unique characteristics.</p>
                </div>
                
                <div className="p-6 bg-card rounded-xl shadow-sm">
                  <div className="flex gap-2 mb-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Which Indian languages are supported?</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">We support Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and many more regional languages.</p>
                </div>
                
                <div className="p-6 bg-card rounded-xl shadow-sm">
                  <div className="flex gap-2 mb-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Can I upgrade or downgrade my plan?</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.</p>
                </div>
                
                <div className="p-6 bg-card rounded-xl shadow-sm">
                  <div className="flex gap-2 mb-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Do you offer refunds?</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">We offer a 7-day money-back guarantee for all paid plans if you're not satisfied with our service.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
