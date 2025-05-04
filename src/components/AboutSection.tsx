import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { BookOpen } from "lucide-react";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to load About data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // 🌟 Skeleton Loader while loading
  if (!aboutData) {
    return (
      <section
        id="about"
        className="bg-gradient-to-b from-slate-900 to-indigo-950/80 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-10 w-1/2 bg-white/10 mx-auto rounded mb-8" />
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="h-6 bg-white/10 rounded mb-4" />
            <div className="h-5 bg-white/10 rounded mb-2" />
            <div className="h-5 bg-white/10 rounded mb-2 w-4/5 mx-auto" />
            <div className="h-5 bg-white/10 rounded w-3/4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-violet-400/10 p-2 rounded-full">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✨ Actual content after loading
  const { academicDetails } = aboutData;

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-slate-900 to-indigo-950/80 py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center gradient-text mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {aboutData.title || "About Me"}
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-300 mb-4">{aboutData.subtitle}</p>
          <p className="text-lg text-gray-300 leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>

        {/* Academic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SSC Card */}
          <motion.div
            className="ml-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-violet-400 bg-violet-400/10 p-2 rounded-full">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">SSC</h3>
                <p className="text-gray-400"><strong>Year:</strong> {academicDetails.ssc.year}</p>
                <p className="text-gray-400"><strong>Percentage:</strong> {academicDetails.ssc.percentage}%</p>
                <p className="text-gray-400"><strong>School:</strong> {academicDetails.ssc.school}</p>
              </div>
            </div>
          </motion.div>

          {/* Intermediate Card */}
          <motion.div
            className="ml-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-violet-400 bg-violet-400/10 p-2 rounded-full">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Intermediate</h3>
                <p className="text-gray-400"><strong>Year:</strong> {academicDetails.intermediate.year}</p>
                <p className="text-gray-400"><strong>Percentage:</strong> {academicDetails.intermediate.percentage}%</p>
                <p className="text-gray-400"><strong>College:</strong> {academicDetails.intermediate.college}</p>
              </div>
            </div>
          </motion.div>

          {/* B.Tech Card */}
          <motion.div
            className="ml-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-violet-400 bg-violet-400/10 p-2 rounded-full">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">B.Tech</h3>
                <p className="text-gray-400"><strong>Degree:</strong> {academicDetails.btech.degree}</p>
                <p className="text-gray-400"><strong>Branch:</strong> {academicDetails.btech.branch}</p>
                <p className="text-gray-400"><strong>Years:</strong> {academicDetails.btech.fromYear} - {academicDetails.btech.toYear}</p>
                <p className="text-gray-400"><strong>CGPA:</strong> {academicDetails.btech.cgpa}</p>
                <p className="text-gray-400"><strong>College:</strong> {academicDetails.btech.college}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
