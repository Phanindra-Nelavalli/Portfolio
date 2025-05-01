
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AchievementProps {
  title: string;
  description: string;
  position: 'left' | 'right';
  index: number;
}

const Achievement = ({ title, description, position, index }: AchievementProps) => (
  <div className={cn(
    "relative flex items-center mb-12",
    position === 'left' ? 'justify-start' : 'justify-end'
  )}>
    <motion.div 
      className={cn(
        "w-full md:w-1/2 bg-white/5 p-6 rounded-lg backdrop-blur-sm",
        position === 'left' ? 'md:mr-auto' : 'md:ml-auto'
      )}
      initial={{ opacity: 0, x: position === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
    
    {/* Timeline dot */}
    <motion.div 
      className="hidden md:block absolute left-1/2 transform -translate-x-1/2"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      viewport={{ once: true }}
    >
      <div className="w-4 h-4 bg-violet-400 rounded-full"></div>
    </motion.div>
  </div>
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
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.1))' }}
          ></motion.div>
          
          {/* Achievements */}
          {achievements.map((achievement, index) => (
            <Achievement
              key={index}
              title={achievement.title}
              description={achievement.description}
              position={index % 2 === 0 ? 'left' : 'right'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
