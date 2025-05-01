
import { motion } from 'framer-motion';
import { Code2, Database, FileJson, FileCode, PenTool, Laptop } from 'lucide-react';

interface SkillCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  index: number;
}

const SkillCard = ({ title, items, icon, index }: SkillCardProps) => (
  <motion.div 
    className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
  >
    <div className="flex items-center mb-4">
      <div className="mr-4 bg-violet-400/20 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-400">{item}</li>
      ))}
    </ul>
  </motion.div>
);

const SkillsSection = () => {
  const skills = [
    {
      title: "Languages",
      items: ["Python", "JavaScript", "SQL"],
      icon: <Code2 className="skill-icon" />
    },
    {
      title: "Frontend",
      items: ["HTML", "CSS", "React.js"],
      icon: <FileCode className="skill-icon" />
    },
    {
      title: "Backend",
      items: ["Node.js", "Express.js", "Firebase"],
      icon: <Database className="skill-icon" />
    },
    {
      title: "Mobile",
      items: ["Flutter", "React Native"],
      icon: <Laptop className="skill-icon" />
    },
    {
      title: "Data Tools",
      items: ["Pandas", "NumPy"],
      icon: <FileJson className="skill-icon" />
    },
    {
      title: "Design",
      items: ["Figma", "UI/UX Principles"],
      icon: <PenTool className="skill-icon" />
    }
  ];

  return (
    <section id="skills" className="bg-gradient-to-b from-slate-900 to-indigo-950 section">
      <div className="section-container">
        <motion.h2 
          className="section-title gradient-text text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              items={skill.items}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
