import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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

  if (!aboutData) return null;

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-slate-900 to-indigo-950/80 section"
    >
      <div className="section-container">
        <motion.h2
          className="section-title gradient-text text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {aboutData.title || "About Me"}
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-300 mb-4">{aboutData.subtitle}</p>
          <p className="text-xl text-gray-300 leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
