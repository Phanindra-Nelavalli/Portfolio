
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast";
import { Github, Linkedin, Mail } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="bg-white text-nero-dark section">
      <div className="section-container">
        <h2 className="section-title text-nero-dark">Get In Touch</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-gray-700 mb-6">
              Whether you have a question, project idea, or just want to say hello, 
              feel free to reach out. I'm always open to discussing new projects, 
              creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-nero-accent" />
                <a href="mailto:nelavalliphanindra4@gmail.com" className="text-gray-700 hover:text-nero-accent transition-colors">
                  nelavalliphanindra4@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Github className="w-6 h-6 mr-4 text-nero-accent" />
                <a href="https://github.com/Phanindra-Nelavalli" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-nero-accent transition-colors">
                  github.com/Phanindra-Nelavalli
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-6 h-6 mr-4 text-nero-accent" />
                <a href="https://linkedin.com/in/Nelavalli-Phanindra" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-nero-accent transition-colors">
                  linkedin.com/in/Nelavalli-Phanindra
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} className="bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          {...field} 
                          className="min-h-32 bg-gray-100" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-nero-dark hover:bg-nero-accent text-white"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
