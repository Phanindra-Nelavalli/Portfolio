
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AchievementProps {
  title: string;
  description: string;
  index: number;
}

const Achievement = ({ title, description, index }: AchievementProps) => (
  <motion.div 
    className="relative mb-16 last:mb-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    {/* Timeline dot */}
    <motion.div 
      className="absolute top-0 left-0 w-4 h-4 bg-violet-400 rounded-full transform -translate-x-1/2"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      viewport={{ once: true }}
    />
    
    {/* Achievement content */}
    <motion.div 
      className="ml-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="text-violet-400 bg-violet-400/10 p-2 rounded-full">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const AchievementsSection = () => {
  const achievements = [
    {
      title: "Finalist in Internal Hackathon of SIH at VITB",
      description: "Developed a solution to a practical problem, creating a working prototype that impressed judges and stakeholders."
    },
    {
      title: "Finalist in the Spark Tank Competition",
      description: "Designed an innovative solution and presented it to industry experts, receiving valuable feedback and recognition."
    },
    {
      title: "Top 50 Team in DEMUX 24-Hour Hackathon",
      description: "As part of a team, developed the AGRO-GENSIS app at BVRIT Narsapur, collaborating to meet tight deadlines and deliver a functional prototype."
    }
  ];

  return (
    <section id="achievements" className="bg-gradient-to-b from-slate-900 to-indigo-950 section">
      <div className="section-container">
        <motion.h2 
          className="section-title gradient-text text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>
        
        <div className="relative mt-12">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-0.5"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.7), rgba(139, 92, 246, 0.1))' }}
          />
          
          {/* Achievements */}
          <div className="ml-8">
            {achievements.map((achievement, index) => (
              <Achievement
                key={index}
                title={achievement.title}
                description={achievement.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
