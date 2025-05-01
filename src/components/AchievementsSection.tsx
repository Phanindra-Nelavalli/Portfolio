
import { cn } from "@/lib/utils";

interface AchievementProps {
  title: string;
  description: string;
  position: 'left' | 'right';
}

const Achievement = ({ title, description, position }: AchievementProps) => (
  <div className={cn(
    "relative flex items-center mb-12",
    position === 'left' ? 'justify-start' : 'justify-end'
  )}>
    <div 
      className={cn(
        "w-full md:w-1/2 bg-white/5 p-6 rounded-lg backdrop-blur-sm",
        position === 'left' ? 'md:mr-auto' : 'md:ml-auto'
      )}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
    
    {/* Timeline dot */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-nero-accent rounded-full"></div>
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
    <section id="achievements" className="bg-nero-dark section">
      <div className="section-container">
        <h2 className="section-title">Achievements</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform -translate-x-1/2"></div>
          
          {/* Achievements */}
          {achievements.map((achievement, index) => (
            <Achievement
              key={index}
              title={achievement.title}
              description={achievement.description}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
