
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui-custom/Container';
import { Button } from '@/components/ui-custom/Button';
import { Card } from '@/components/ui-custom/Card';
import { useInView, getInViewAnimation } from '@/lib/animations';
import { Play, PauseCircle, Volume2, Mic, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { voicesData } from '@/data/voices';

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

const VoicesPage = () => {
  const { ref, isInView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  
  // Extract unique languages for filter
  const languages = ['all', ...Array.from(new Set(voicesData.map(voice => voice.language)))];
  
  // Filtered voices based on search and filters
  const filteredVoices = voicesData.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         voice.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || voice.language === languageFilter;
    const matchesGender = genderFilter === 'all' || voice.gender === genderFilter;
    
    return matchesSearch && matchesLanguage && matchesGender;
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="py-16 md:py-24"
        >
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className={getInViewAnimation(isInView, 'fade-in')}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient">
                  Indian Language Voices
                </h1>
                <p className="text-xl text-foreground/80 text-balance mb-8">
                  Explore our catalog of premium AI voices in Indian languages. Each voice is carefully designed to sound natural and authentic.
                </p>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className={`mb-12 ${getInViewAnimation(isInView, 'fade-in', 100)}`}>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="Search voices by name or language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="w-full md:w-40">
                    <Select value={languageFilter} onValueChange={setLanguageFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language === 'all' ? 'All Languages' : language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full md:w-40">
                    <Select value={genderFilter} onValueChange={setGenderFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Genders</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className={`mb-6 text-sm text-foreground/70 ${getInViewAnimation(isInView, 'fade-in', 150)}`}>
              Showing {filteredVoices.length} {filteredVoices.length === 1 ? 'voice' : 'voices'}
            </div>
            
            {/* Voice grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredVoices.length > 0 ? (
                filteredVoices.map((voice, i) => (
                  <div key={voice.id} className={getInViewAnimation(isInView, 'fade-in-up', 200 + i * 100)}>
                    <VoiceCard voice={voice} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-foreground/60">No voices match your search criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm('');
                    setLanguageFilter('all');
                    setGenderFilter('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Try your own voice CTA */}
            <div className={`mt-20 bg-secondary/20 rounded-2xl p-8 text-center ${getInViewAnimation(isInView, 'fade-in', 400)}`}>
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Want to create your own voice?</h2>
                <p className="text-foreground/80 mb-6">
                  Our voice cloning technology allows you to create a digital version of your own voice that sounds just like you.
                </p>
                <Button className="mx-auto" icon={<Mic />}>
                  Try Voice Cloning
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VoicesPage;
