"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePortfolio } from "@/contexts/PortfolioContext";

const HeroSection = () => {
  const { hero, loading } = usePortfolio();

  // Fallbacks
  const name =
    hero?.name || '<span class="gradient-text">Nelavalli</span> Phanindra';
  const subtitle =
    hero?.subtitle ||
    'Building <span class="gradient-text">real-world tech</span> for real-world impact.';
  const description =
    hero?.description ||
    "Computer Science Engineering student passionate about AI, ML, and mobile development. Turning innovative ideas into impactful solutions.";
  const imageUrl =
    hero?.imageUrl || "https://avatars.githubusercontent.com/u/157562857?v=4";
  const resumeUrl = hero?.resumeUrl || "/resume.pdf";
  const socialLinks = hero?.socialLinks || {
    github: "https://github.com/Phanindra-Nelavalli",
    linkedin: "https://linkedin.com/in/Nelavalli-Phanindra",
    instagram: "https://instagram.com/phanindra_nelavalli",
    email: "mailto:nelavalliphanindra4@gmail.com",
  };
  const posX = hero?.posX || 50;
  const posY = hero?.posY || 50;
  const zoom = hero?.zoom || 1;
  const role = hero?.role || "Developer";

  const cgpa = hero?.cgpa || "9.42";

  if (loading.hero) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center hero-gradient pt-20 px-4"
      >
        <div className="section-container w-full animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Column (Text) */}
            <div className="md:w-1/2 w-full space-y-6">
              <div className="h-12 w-3/4 bg-white/10 rounded" />
              <div className="h-8 w-2/3 bg-white/10 rounded" />
              <div className="h-20 w-full bg-white/10 rounded" />
  
              <div className="flex gap-4 mt-4">
                <div className="h-10 w-36 bg-violet-500/20 rounded" />
                <div className="h-10 w-36 border border-white/10 rounded" />
              </div>
  
              <div className="flex space-x-4 mt-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-white/10 rounded-full" />
                ))}
              </div>
            </div>
  
            {/* Right Column (Avatar) */}
            <div className="md:w-2/5 w-full flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/10 rounded-full" />
  
                {/* CGPA Badge */}
                <div className="absolute -bottom-4 right-0 w-32 h-10 bg-white/10 rounded-full border border-white/20" />
  
                {/* Role Badge */}
                <div className="absolute -top-8 -left-12 w-28 h-10 bg-white/10 rounded-full border border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  

  return (
    <section
      id="home"
      className="min-h-screen flex items-center hero-gradient pt-20"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: name }}
            />

            <motion.h2
              className="text-2xl md:text-3xl font-light mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />

            <motion.p
              className="text-xl text-gray-400 mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                asChild
                className="bg-violet-500 text-white hover:bg-violet-600 transition-colors duration-300"
              >
                <a href="#contact">Get in Touch</a>
              </Button>

              <Button
                variant="outline"
                className="border-white text-black hover:bg-white/10 transition-colors hover:text-white duration-300"
                asChild
              >
                <a href={resumeUrl} rel="noopener noreferrer">
                  View Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Github className="social-icon" />
                </a>
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="social-icon" />
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="social-icon" />
                </a>
              )}

              {socialLinks.email && (
                <a
                  href={socialLinks.email}
                  aria-label="Email Me"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Mail className="social-icon" />
                </a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-2/5 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 float rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-1 rounded-full">
                  <Avatar className="w-full h-full rounded-full">
                    <AvatarImage
                      src={imageUrl}
                      alt="Profile"
                      className="object-cover"
                      style={{
                        objectPosition: `${posX}% ${posY}%`,
                        transform: `scale(${zoom})`,
                      }}
                    />
                    <AvatarFallback className="bg-slate-800 text-3xl">
                      {name
                        .replace(/<[^>]*>?/gm, "")
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>

              {cgpa && (
                <div className="absolute -bottom-4 right-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl">
                  <motion.span
                    className="text-white font-bold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    CGPA: <span className="text-violet-400">{cgpa}</span>
                  </motion.span>
                </div>
              )}

              <motion.div
                className="absolute -top-8 -left-12 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
              >
                <span className="text-white font-medium">{role}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
