
import React from 'react';
import { Container } from './ui-custom/Container';
import { Card } from './ui-custom/Card';
import { useInView, getInViewAnimation } from '@/lib/animations';
import { Settings, Mic2, Languages, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "90+ Indian Voices",
    description: "Choose from over 90 high-quality Indian voices across all major languages and dialects.",
    icon: <Mic2 className="h-5 w-5" />,
  },
  {
    title: "12 Indian Languages",
    description: "Support for Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and more.",
    icon: <Languages className="h-5 w-5" />,
  },
  {
    title: "Emotion Control",
    description: "Adjust tone, pitch, and emotion to create the perfect voice for your specific needs.",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Natural Speech",
    description: "Our advanced AI generates incredibly natural-sounding speech that's indistinguishable from humans.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Super Fast",
    description: "Generate hours of speech in minutes with our optimized high-performance AI infrastructure.",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Privacy Focus",
    description: "Enterprise-grade security and privacy. Your data is encrypted and never used for training.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const Features = () => {
  const { ref, isInView } = useInView();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 pointer-events-none"></div>
      
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className={getInViewAnimation(isInView, 'fade-in')}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gradient">
              Purpose-built for Indian Voices
            </h2>
            <p className="text-foreground/80 text-balance">
              Create lifelike Indian voices in seconds with our state-of-the-art AI technology.
              Our platform is designed specifically for Indian languages and accents.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <Card 
              key={i}
              hover
              className={`transition-all border border-border/80 ${getInViewAnimation(isInView, 'fade-in-up', 100 + i * 100)}`}
            >
              <div className="flex flex-col space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
