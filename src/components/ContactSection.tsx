
import { useState } from 'react';
import { User, Mail, Send, ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input"; 
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { toast } from "@/hooks/use-toast"; // Updated from @/components/ui/toast

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending data
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-nero-dark section">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-400 mb-8 text-lg">
              I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-nero-accent mr-4" />
                <span>Nelavalli Phanindra</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-nero-accent mr-4" />
                <a href="mailto:nelavalliphanindra4@gmail.com" className="hover:text-nero-accent transition-colors">
                  nelavalliphanindra4@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-white/5 backdrop-blur-sm border-gray-800 text-white">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">Name</label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-white/10 border-gray-700 focus:border-nero-accent placeholder:text-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="bg-white/10 border-gray-700 focus:border-nero-accent placeholder:text-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="bg-white/10 border-gray-700 focus:border-nero-accent placeholder:text-gray-500 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-nero-accent hover:bg-nero-accent-hover text-white w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">Sending <Send className="ml-2 h-4 w-4 animate-pulse" /></span>
                    ) : (
                      <span className="flex items-center">Send Message <ArrowRight className="ml-2 h-4 w-4" /></span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
