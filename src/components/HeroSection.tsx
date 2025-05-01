
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center bg-nero-dark pt-20">
      <div className="section-container">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Nelavalli Phanindra
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Building <span className="gradient-text">real-world tech</span> for real-world impact.
          </h2>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "400ms" }}>
            Computer Science Engineering student passionate about AI, ML, 
            and mobile development. Turning innovative ideas into impactful solutions.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <Button 
              asChild 
              className="bg-white text-nero-dark hover:bg-nero-accent hover:text-white transition-colors duration-300"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 transition-colors duration-300"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
            </Button>
          </div>
          
          <div className="flex space-x-6 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <a 
              href="https://github.com/Phanindra-Nelavalli" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="social-icon" />
            </a>
            <a 
              href="https://linkedin.com/in/Nelavalli-Phanindra" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="social-icon" />
            </a>
            <a 
              href="mailto:nelavalliphanindra4@gmail.com" 
              aria-label="Email Me"
            >
              <Mail className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
