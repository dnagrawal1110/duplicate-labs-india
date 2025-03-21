
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui-custom/Container';
import { Button } from './ui-custom/Button';
import { MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-display font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="hidden sm:inline-block">Duplicate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/voices" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Voices
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel animate-fade-in-down">
          <Container>
            <nav className="py-6 space-y-6 flex flex-col">
              <Link 
                to="/" 
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/voices" 
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Voices
              </Link>
              <Link 
                to="/pricing" 
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/blog" 
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                <Button variant="outline" size="md" className="w-full">Sign In</Button>
                <Button size="md" className="w-full">Get Started</Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
