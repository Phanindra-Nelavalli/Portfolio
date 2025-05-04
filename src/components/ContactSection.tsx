import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false); // To simulate loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true); // Simulate form submission delay

    const serviceID = "service_13gqkik"; // 🔁 Replace with your actual Service ID
    const templateID = "template_et2nvh6"; // 🔁 Replace with your actual Template ID
    const userID = "t9Pi7NiBJI1HoCrOq"; // 🔁 Replace with your actual Public Key

    try {
      await emailjs.send(serviceID, templateID, formData, userID);

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false); // Stop loading simulation
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-slate-900 to-indigo-950 section"
    >
      <div className="section-container">
        <motion.h2
          className="section-title gradient-text text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-8 text-lg">
              I'm currently open to new opportunities and collaborations.
              Whether you have a question or just want to say hi, I'll do my
              best to get back to you!
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-violet-400/20 p-2 rounded-full mr-4">
                  <User className="w-5 h-5 text-violet-400" />
                </div>
                <span>Nelavalli Phanindra</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-violet-400/20 p-2 rounded-full mr-4">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <a
                  href="mailto:nelavalliphanindra4@gmail.com"
                  className="hover:text-violet-400 transition-colors"
                >
                  nelavalliphanindra4@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-violet-400/20 text-white">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">
                      Name
                    </label>
                    <div
                      className={`${
                        loading ? "bg-gray-700 animate-pulse" : "bg-white/10"
                      } border-violet-400/20 focus:border-violet-400 placeholder:text-gray-500 p-3 rounded-md`}
                    >
                      {loading ? (
                        <div className="h-6 bg-gray-700 rounded w-3/4" />
                      ) : (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email
                    </label>
                    <div
                      className={`${
                        loading ? "bg-gray-700 animate-pulse" : "bg-white/10"
                      } border-violet-400/20 focus:border-violet-400 placeholder:text-gray-500 p-3 rounded-md`}
                    >
                      {loading ? (
                        <div className="h-6 bg-gray-700 rounded w-3/4" />
                      ) : (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">
                      Message
                    </label>
                    <div
                      className={`${
                        loading ? "bg-gray-700 animate-pulse" : "bg-white/10"
                      } border-violet-400/20 focus:border-violet-400 placeholder:text-gray-500 p-3 rounded-md`}
                    >
                      {loading ? (
                        <div className="h-24 bg-gray-700 rounded w-full" />
                      ) : (
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-violet-500 hover:bg-violet-600 text-white w-full"
                    >
                      <span className="flex items-center">
                        {!isSubmitting ? "Send Message" : "Sending ...."}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
