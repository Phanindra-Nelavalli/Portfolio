
import { motion } from 'framer-motion';
import { Calendar, Building2, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-gradient-to-b from-nero-dark to-black/80 section">
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
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="pb-2 relative">
                  <div className="absolute right-6 top-6 p-2 bg-nero-accent/10 rounded-full">
                    <exp.icon className="h-6 w-6 text-nero-accent" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{exp.title}</CardTitle>
                  <CardDescription className="text-gray-300 flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> {exp.company} • <Calendar className="h-4 w-4" /> {exp.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-300">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} className="bg-nero-accent/20 hover:bg-nero-accent/30 text-white border-none">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
