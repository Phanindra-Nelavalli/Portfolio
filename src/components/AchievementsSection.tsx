import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface Achievement {
  id?: string;
  title: string;
  date: string;
  description: string;
}

const AchievementItem = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    className="relative mb-16 last:mb-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="absolute top-0 left-0 w-4 h-4 bg-violet-400 rounded-full transform -translate-x-1/2"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      viewport={{ once: true }}
    />

    <motion.div
      className="ml-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
      }}
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
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const snapshot = await getDocs(collection(db, "achievements"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Achievement[];
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              background:
                "linear-gradient(to bottom, rgba(139, 92, 246, 0.7), rgba(139, 92, 246, 0.1))",
            }}
          />

          <div className="ml-8">
            {loading ? (
              // Skeleton Loader for Achievements
              [...Array(3)].map((_, index) => (
                <div key={index} className="relative mb-16 last:mb-0 animate-pulse">
                  {/* Skeleton Ball */}
                  <div
                    className="absolute top-0 left-0 w-4 h-4 bg-gray-700 rounded-full transform -translate-x-1/2"
                  />
                  {/* Skeleton Card */}
                  <div className="ml-6 bg-gray-700/40 p-6 rounded-lg backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      {/* Skeleton for Icon */}
                      <div className="h-8 w-8 bg-gray-700 rounded-full" />
                      <div className="w-3/4">
                        {/* Skeleton for Title */}
                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
                        {/* Skeleton for Description */}
                        <div className="h-4 bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Render Actual Achievements
              achievements.map((achievement, index) => (
                <AchievementItem
                  key={achievement.id || index}
                  title={achievement.title}
                  description={achievement.description}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
