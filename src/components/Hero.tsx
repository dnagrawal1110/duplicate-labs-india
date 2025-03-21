
import React, { useEffect, useState } from 'react';
import { Container } from './ui-custom/Container';
import { Button } from './ui-custom/Button';
import { useInView, getInViewAnimation } from '@/lib/animations';
import { Play, PauseCircle, Volume2 } from 'lucide-react';

const Hero = () => {
  const { ref, isInView } = useInView();
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simulated waveform data
  const [waveformBars] = useState(() => Array.from({ length: 40 }, () => Math.random() * 100));
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl transform translate-y-1/4"></div>
      </div>
      
      <Container>
        <div className="flex flex-col items-center text-center">
          {/* Title and subtitle with animation */}
          <div className={`max-w-2xl ${getInViewAnimation(isInView, 'fade-in-up')}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gradient">
              The Next Generation<br />Voice AI for India
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-lg mx-auto text-balance">
              Create natural, realistic voices that sound like your favorite people in Indian languages with our state-of-the-art AI technology.
            </p>
          </div>
          
          {/* Call to action buttons with animation */}
          <div className={`space-x-4 mb-12 ${getInViewAnimation(isInView, 'fade-in-up', 300)}`}>
            <Button size="lg">Get Started for Free</Button>
            <Button variant="outline" size="lg" icon={<Play className="h-4 w-4" />}>
              How It Works
            </Button>
          </div>
          
          {/* Voice Demo with animation */}
          <div className={`w-full max-w-lg ${getInViewAnimation(isInView, 'fade-in-up', 500)}`}>
            <div className="glass-panel p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Volume2 className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Deepika</p>
                    <p className="text-xs text-foreground/60">Hindi, Natural</p>
                  </div>
                </div>
                <button 
                  className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseCircle className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Waveform visualization */}
              <div className="h-16 flex items-center justify-between">
                {waveformBars.map((height, i) => (
                  <div 
                    key={i}
                    className={`w-1 mx-px rounded-full bg-primary/80 transition-all duration-200 ${isPlaying ? 'animate-waveform' : ''}`}
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${i * 30}ms`,
                      animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                  ></div>
                ))}
              </div>
              
              <p className="text-sm text-foreground/70 text-center mt-2">
                "नमस्ते, मैं दीपिका हूँ। मैं आपकी मदद कैसे कर सकती हूँ?"
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
