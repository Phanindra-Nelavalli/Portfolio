import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Code2,
  FileCode,
  Database,
  Laptop,
  FileJson,
  PenTool,
} from "lucide-react";

interface Skill {
  name: string;
  category: string;
}

interface GroupedSkill {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 className="skill-icon" />,
  Frontend: <FileCode className="skill-icon" />,
  Backend: <Database className="skill-icon" />,
  Mobile: <Laptop className="skill-icon" />,
  "Data Tools": <FileJson className="skill-icon" />,
  Design: <PenTool className="skill-icon" />,
};

const SkillCard = ({
  title,
  items,
  icon,
  index,
}: GroupedSkill & { index: number }) => (
  <motion.div
    className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
    }}
  >
    <div className="flex items-center mb-4">
      <div className="mr-4 bg-violet-400/20 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-400">
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const SkillsSection = () => {
  const [groupedSkills, setGroupedSkills] = useState<GroupedSkill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const q = query(collection(db, "skills"), orderBy("category"));
        const snapshot = await getDocs(q);

        const allSkills: Skill[] = snapshot.docs.map((doc) => doc.data() as Skill);

        const grouped = allSkills.reduce<Record<string, string[]>>((acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill.name);
          return acc;
        }, {});

        const formatted: GroupedSkill[] = Object.entries(grouped).map(([category, items]) => ({
          title: category,
          items,
          icon: categoryIcons[category] || <Code2 className="skill-icon" />,
        }));

        setGroupedSkills(formatted);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

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
          {groupedSkills.map((skill, index) => (
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
