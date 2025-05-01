
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const AboutSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section id="about" className="bg-gradient-to-b from-slate-900 to-indigo-950/80 section">
      <div className="section-container">
        <motion.h2 
          className="section-title gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">          
          <motion.div 
            className="md:w-2/3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={item} className="text-xl text-gray-300 mb-6 leading-relaxed">
              I'm an enthusiastic Computer Science Engineering student with a solid understanding of software development,
              web, and mobile application development. My passion lies in exploring new technologies, especially
              Machine Learning (ML) and Artificial Intelligence (AI).
            </motion.p>
            
            <motion.p variants={item} className="text-xl text-gray-300 mb-8 leading-relaxed">
              I'm constantly looking for opportunities to apply my skills in projects that contribute to technological 
              progress and solve real-world problems. With a balance of technical expertise and a creative approach to 
              problem-solving, I aim to build solutions that make a meaningful impact.
            </motion.p>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div 
                variants={item}
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="bg-violet-400/20 rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  Education
                </h3>
                <p className="text-gray-400">B.Tech in Computer Science</p>
                <p className="text-gray-400">Vishnu Institute of Technology</p>
              </motion.div>
              
              <motion.div 
                variants={item}
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="bg-violet-400/20 rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Location
                </h3>
                <p className="text-gray-400">Guntur, India</p>
                <Badge variant="outline" className="mt-2 bg-violet-400/10 text-white border-violet-400/30">
                  Open to remote opportunities
                </Badge>
              </motion.div>
              
              <motion.div 
                variants={item}
                whileHover={{ y: -5 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="bg-violet-400/20 rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-violet-400/20 text-white border-none hover:bg-violet-400/30">AI</Badge>
                  <Badge className="bg-violet-400/20 text-white border-none hover:bg-violet-400/30">ML</Badge>
                  <Badge className="bg-violet-400/20 text-white border-none hover:bg-violet-400/30">Mobile Dev</Badge>
                  <Badge className="bg-violet-400/20 text-white border-none hover:bg-violet-400/30">Web Tech</Badge>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
