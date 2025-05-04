import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface Project {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  technologies: string; // stored as comma-separated string
  demoLink: string;
  githubLink: string;
}

const WorkSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Skeleton Loader while loading projects
  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 animate-pulse bg-gray-700/50 rounded-lg p-6">
          <div className="w-full h-48 bg-gray-500 rounded-lg"></div>
          <div className="flex flex-col w-full space-y-4">
            <div className="h-6 bg-gray-500 rounded w-3/4"></div>
            <div className="h-4 bg-gray-500 rounded w-1/2"></div>
            <div className="h-4 bg-gray-500 rounded w-2/3"></div>
            <div className="h-6 bg-gray-500 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <SkeletonLoader />;

  return (
    <section
      id="work"
      className="bg-gradient-to-b from-indigo-950 to-slate-900"
    >
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="section-title gradient-text text-center mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>
        </div>

        <motion.div
          className="divide-y divide-gray-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, staggerChildren: 0.3 }}
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={
                  project.technologies
                    ? project.technologies.split(",").map((tech) => tech.trim())
                    : []
                }
                githubUrl={project.githubLink}
                liveDemoUrl={project.demoLink}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
