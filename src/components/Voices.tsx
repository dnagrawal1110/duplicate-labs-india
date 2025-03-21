
import React, { useState } from 'react';
import { Container } from './ui-custom/Container';
import { Button } from './ui-custom/Button';
import { Card } from './ui-custom/Card';
import { useInView, getInViewAnimation } from '@/lib/animations';
import { Play, PauseCircle, Volume2 } from 'lucide-react';

const voicesData = [
  {
    id: "1",
    name: "Deepika",
    language: "Hindi",
    category: "Natural",
    sample: "नमस्ते, मैं दीपिका हूँ। मैं आपकी मदद कैसे कर सकती हूँ?",
    gender: "female",
  },
  {
    id: "2",
    name: "Arjun",
    language: "Hindi",
    category: "Natural",
    sample: "नमस्ते, मैं अर्जुन हूँ। मैं आपकी मदद कैसे कर सकता हूँ?",
    gender: "male",
  },
  {
    id: "3",
    name: "Priya",
    language: "Tamil",
    category: "Natural",
    sample: "வணக்கம், நான் பிரியா. நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    gender: "female",
  },
  {
    id: "4",
    name: "Rajiv",
    language: "Bengali",
    category: "Natural",
    sample: "নমস্কার, আমি রাজীব। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    gender: "male",
  },
  {
    id: "5",
    name: "Shreya",
    language: "Marathi",
    category: "Natural",
    sample: "नमस्कार, मी श्रेया आहे. मी तुम्हाला कशी मदत करू शकते?",
    gender: "female",
  },
  {
    id: "6",
    name: "Vikram",
    language: "Telugu",
    category: "Natural",
    sample: "నమస్కారం, నేను విక్రమ్. నేను మీకు ఎలా సహాయం చేయగలను?",
    gender: "male",
  },
];

const VoiceCard = ({ voice }: { voice: typeof voicesData[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars] = useState(() => Array.from({ length: 20 }, () => Math.random() * 100));
  
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-4px]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full ${voice.gender === 'female' ? 'bg-pink-500/90' : 'bg-blue-500/90'} flex items-center justify-center text-white`}>
              <Volume2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{voice.name}</p>
              <p className="text-xs text-foreground/60">{voice.language}, {voice.category}</p>
            </div>
          </div>
          <button 
            className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseCircle className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Waveform visualization */}
        <div className="h-12 flex items-center justify-between mt-4 mb-2">
          {waveformBars.map((height, i) => (
            <div 
              key={i}
              className={`w-1 mx-px rounded-full ${voice.gender === 'female' ? 'bg-pink-500/60' : 'bg-blue-500/60'} transition-all duration-200 ${isPlaying ? 'animate-waveform' : ''}`}
              style={{ 
                height: `${height}%`,
                animationDelay: `${i * 30}ms`,
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            ></div>
          ))}
        </div>
        
        <p className="text-xs text-foreground/70 text-center mt-2">
          {voice.sample}
        </p>
      </div>
    </Card>
  );
};

const Voices = () => {
  const { ref, isInView } = useInView();
  
  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className={getInViewAnimation(isInView, 'fade-in')}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gradient">
              Listen to Our Voices
            </h2>
            <p className="text-foreground/80 text-balance mb-8">
              Explore our catalog of premium AI voices in Indian languages. Each voice is carefully designed to sound natural and authentic.
            </p>
            <Button>Browse All Voices</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {voicesData.map((voice, i) => (
            <div key={voice.id} className={getInViewAnimation(isInView, 'fade-in-up', 100 + i * 100)}>
              <VoiceCard voice={voice} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Voices;
