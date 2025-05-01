
import { motion } from 'framer-motion';
import { Building2, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  position: 'left' | 'right';
  icon: React.ElementType;
}

const Experience = ({ title, company, duration, description, skills, position, icon: Icon }: ExperienceProps) => (
  <div className={`relative flex items-center mb-12 ${
    position === 'left' ? 'justify-start' : 'justify-end'
  }`}>
    <motion.div 
      className={`w-full md:w-1/2 glass-card p-6 ${
        position === 'left' ? 'md:mr-auto' : 'md:ml-auto'
      }`}
      initial={{ opacity: 0, x: position === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute right-6 top-6 p-2 bg-violet-400/20 rounded-full">
        <Icon className="h-6 w-6 text-violet-400" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-gray-300 flex items-center gap-2 mb-4">
        <Building2 className="h-4 w-4" /> {company} • <Calendar className="h-4 w-4" /> {duration}
      </div>
      
      <p className="mb-4 text-gray-300">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Badge key={i} className="bg-violet-400/20 hover:bg-violet-400/30 text-white border-none">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
    
    {/* Timeline dot */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-violet-400 rounded-full"></div>
  </div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Google",
      duration: "Jun 2023 - Aug 2023",
      description: "Worked on developing and optimizing features for Google Cloud Platform. Collaborated with cross-functional teams to improve user experience and system performance.",
      skills: ["React", "Node.js", "GCP", "TypeScript"],
      icon: Building2
    },
    {
      title: "Research Assistant",
      company: "AI Research Lab",
      duration: "Jan 2023 - May 2023",
      description: "Conducted research on neural networks and deep learning models. Published a paper on efficient ML model optimization for edge devices.",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis"],
      icon: Award
    },
    {
      title: "Frontend Developer",
      company: "Tech Startup",
      duration: "May 2022 - Dec 2022",
      description: "Designed and implemented responsive user interfaces for a SaaS platform. Improved website performance by 40% through code optimization.",
      skills: ["React", "CSS", "JavaScript", "UI/UX"],
      icon: Calendar
    }
  ];

  return (
    <section id="experience" className="bg-gradient-to-b from-indigo-950 to-slate-900 section">
      <div className="section-container">
        <motion.h2 
          className="section-title gradient-text inline-block mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-violet-400/20 transform -translate-x-1/2"></div>
          
          {/* Experiences */}
          {experiences.map((exp, index) => (
            <Experience
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              description={exp.description}
              skills={exp.skills}
              position={index % 2 === 0 ? 'left' : 'right'}
              icon={exp.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
