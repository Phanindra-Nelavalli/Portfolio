import { motion } from 'framer-motion';
import { Rocket, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
}

const ProjectCard = ({
  title,
  subtitle,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveDemoUrl
}: ProjectCardProps) => {
  return (
    <div className="project-card py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start">
          {/* Left Side */}
          <motion.div 
            className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-2">{title}</h3>
            <p className="text-xl text-violet-400 mb-4">{subtitle}</p>
            <p className="text-gray-400 mb-6 text-lg">{description}</p>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-sm uppercase text-gray-500 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1 text-sm bg-violet-400/20 rounded-full text-white hover:bg-violet-400/30 transition-colors duration-300 cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {/* GitHub Button */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-violet-500 text-white px-6 py-2 rounded-md font-medium hover:bg-violet-600 transition-colors"
              >
                <Code size={16} />
                GitHub
              </a>

              {/* Live Demo Button */}
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <Rocket size={16} />
                Live Demo
              </a>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative overflow-hidden rounded-md aspect-video bg-gray-900 shadow-lg shadow-violet-500/10"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
