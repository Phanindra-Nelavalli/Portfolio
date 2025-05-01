
import { Code2, Database, FileJson, FileCode, PenTool, Laptop } from 'lucide-react';

interface SkillCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

const SkillCard = ({ title, items, icon }: SkillCardProps) => (
  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
    <div className="flex items-center mb-4">
      <div className="mr-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-400">{item}</li>
      ))}
    </ul>
  </div>
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
    <section id="skills" className="bg-nero-dark section">
      <div className="section-container">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              items={skill.items}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
