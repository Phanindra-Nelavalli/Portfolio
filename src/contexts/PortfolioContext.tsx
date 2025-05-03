import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/firebase-utils";
import { useToast } from "@/components/ui/use-toast";

// Define the types for our data
export interface CertificateType {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId?: string;
  imageUrl?: string;
}

export interface SkillType {
  id?: string;
  title: string;
  items: string[];
  icon?: string;
}

export interface ExperienceType {
  id?: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  icon?: string;
}

export interface ProjectType {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface AchievementType {
  id?: string;
  title: string;
  date: string;
  description: string;
}

export interface HeroType {
  id?: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
  cgpa?: string;
  posX?: number;
  posY?: number;
  zoom?: number;
}

interface PortfolioContextType {
  certificates: CertificateType[];
  skills: SkillType[];
  experiences: ExperienceType[];
  projects: ProjectType[];
  achievements: AchievementType[];
  hero: HeroType | null;
  loading: {
    certificates: boolean;
    skills: boolean;
    experiences: boolean;
    projects: boolean;
    achievements: boolean;
    hero: boolean;
  };
  addCertificate: (certificate: CertificateType) => Promise<CertificateType>;
  updateCertificate: (
    id: string,
    certificate: CertificateType
  ) => Promise<CertificateType>;
  deleteCertificate: (id: string) => Promise<void>;
  addSkill: (skill: SkillType) => Promise<SkillType>;
  updateSkill: (id: string, skill: SkillType) => Promise<SkillType>;
  deleteSkill: (id: string) => Promise<void>;
  addExperience: (experience: ExperienceType) => Promise<ExperienceType>;
  updateExperience: (
    id: string,
    experience: ExperienceType
  ) => Promise<ExperienceType>;
  deleteExperience: (id: string) => Promise<void>;
  addProject: (project: ProjectType) => Promise<ProjectType>;
  updateProject: (id: string, project: ProjectType) => Promise<ProjectType>;
  deleteProject: (id: string) => Promise<void>;
  addAchievement: (achievement: AchievementType) => Promise<AchievementType>;
  updateAchievement: (
    id: string,
    achievement: AchievementType
  ) => Promise<AchievementType>;
  deleteAchievement: (id: string) => Promise<void>;
  updateHero: (hero: HeroType) => Promise<HeroType>;
  refreshData: (collection: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [hero, setHero] = useState<HeroType | null>(null);

  const [loading, setLoading] = useState({
    certificates: true,
    skills: true,
    experiences: true,
    projects: true,
    achievements: true,
    hero: true,
  });

  const { toast } = useToast();

  // Function to fetch data from Firebase
  const fetchData = async () => {
    try {
      // Fetch certificates
      setLoading((prev) => ({ ...prev, certificates: true }));
      const certificatesData = await fetchCollection("certificates");
      setCertificates(certificatesData as CertificateType[]);
      setLoading((prev) => ({ ...prev, certificates: false }));

      // Fetch skills
      setLoading((prev) => ({ ...prev, skills: true }));
      const skillsData = await fetchCollection("skills");
      setSkills(skillsData as SkillType[]);
      setLoading((prev) => ({ ...prev, skills: false }));

      // Fetch experiences
      setLoading((prev) => ({ ...prev, experiences: true }));
      const experiencesData = await fetchCollection("experiences");
      setExperiences(experiencesData as ExperienceType[]);
      setLoading((prev) => ({ ...prev, experiences: false }));

      // Fetch projects
      setLoading((prev) => ({ ...prev, projects: true }));
      const projectsData = await fetchCollection("projects");
      setProjects(projectsData as ProjectType[]);
      setLoading((prev) => ({ ...prev, projects: false }));

      // Fetch achievements
      setLoading((prev) => ({ ...prev, achievements: true }));
      const achievementsData = await fetchCollection("achievements");
      setAchievements(achievementsData as AchievementType[]);
      setLoading((prev) => ({ ...prev, achievements: false }));

      // Fetch hero data (assuming there's only one document)
      setLoading((prev) => ({ ...prev, hero: true }));
      const heroData = await fetchCollection("hero");
      if (heroData && heroData.length > 0) {
        setHero(heroData[0] as HeroType);
      }
      setLoading((prev) => ({ ...prev, hero: false }));
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });

      // Set loading to false for all data
      setLoading({
        certificates: false,
        skills: false,
        experiences: false,
        projects: false,
        achievements: false,
        hero: false,
      });
    }
  };

  // Refresh specific collection data
  const refreshData = async (collectionName: string) => {
    try {
      setLoading((prev) => ({ ...prev, [collectionName]: true }));
      const data = await fetchCollection(collectionName);

      switch (collectionName) {
        case "certificates":
          setCertificates(data as CertificateType[]);
          break;
        case "skills":
          setSkills(data as SkillType[]);
          break;
        case "experiences":
          setExperiences(data as ExperienceType[]);
          break;
        case "projects":
          setProjects(data as ProjectType[]);
          break;
        case "achievements":
          setAchievements(data as AchievementType[]);
          break;
        case "hero":
          if (data && data.length > 0) {
            setHero(data[0] as HeroType);
          }
          break;
        default:
          break;
      }

      setLoading((prev) => ({ ...prev, [collectionName]: false }));
    } catch (error: any) {
      toast({
        title: `Error refreshing ${collectionName}`,
        description: error.message,
        variant: "destructive",
      });
      setLoading((prev) => ({ ...prev, [collectionName]: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Certificate CRUD operations
  const addCertificate = async (certificate: CertificateType) => {
    try {
      const newCertificate = await addDocument("certificates", certificate);
      setCertificates((prev) => [...prev, newCertificate as CertificateType]);
      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
      return newCertificate as CertificateType;
    } catch (error: any) {
      toast({
        title: "Error adding certificate",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCertificate = async (
    id: string,
    certificate: CertificateType
  ) => {
    try {
      const updatedCertificate = await updateDocument(
        "certificates",
        id,
        certificate
      );
      setCertificates((prev) =>
        prev.map((cert) =>
          cert.id === id ? { ...cert, ...certificate } : cert
        )
      );
      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
      return updatedCertificate as CertificateType;
    } catch (error: any) {
      toast({
        title: "Error updating certificate",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await deleteDocument("certificates", id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting certificate",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Skill CRUD operations
  const addSkill = async (skill: SkillType) => {
    try {
      const newSkill = await addDocument("skills", skill);
      setSkills((prev) => [...prev, newSkill as SkillType]);
      toast({ title: "Success", description: "Skill added successfully" });
      return newSkill as SkillType;
    } catch (error: any) {
      toast({
        title: "Error adding skill",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSkill = async (id: string, skill: SkillType) => {
    try {
      const updatedSkill = await updateDocument("skills", id, skill);
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...skill } : s))
      );
      toast({ title: "Success", description: "Skill updated successfully" });
      return updatedSkill as SkillType;
    } catch (error: any) {
      toast({
        title: "Error updating skill",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await deleteDocument("skills", id);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      toast({ title: "Success", description: "Skill deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error deleting skill",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Experience CRUD operations
  const addExperience = async (experience: ExperienceType) => {
    try {
      const newExperience = await addDocument("experiences", experience);
      setExperiences((prev) => [...prev, newExperience as ExperienceType]);
      toast({ title: "Success", description: "Experience added successfully" });
      return newExperience as ExperienceType;
    } catch (error: any) {
      toast({
        title: "Error adding experience",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateExperience = async (id: string, experience: ExperienceType) => {
    try {
      const updatedExperience = await updateDocument(
        "experiences",
        id,
        experience
      );
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, ...experience } : exp))
      );
      toast({
        title: "Success",
        description: "Experience updated successfully",
      });
      return updatedExperience as ExperienceType;
    } catch (error: any) {
      toast({
        title: "Error updating experience",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await deleteDocument("experiences", id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting experience",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Project CRUD operations
  const addProject = async (project: ProjectType) => {
    try {
      const newProject = await addDocument("projects", project);
      setProjects((prev) => [...prev, newProject as ProjectType]);
      toast({ title: "Success", description: "Project added successfully" });
      return newProject as ProjectType;
    } catch (error: any) {
      toast({
        title: "Error adding project",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProject = async (id: string, project: ProjectType) => {
    try {
      const updatedProject = await updateDocument("projects", id, project);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...project } : p))
      );
      toast({ title: "Success", description: "Project updated successfully" });
      return updatedProject as ProjectType;
    } catch (error: any) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDocument("projects", id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Success", description: "Project deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Achievement CRUD operations
  const addAchievement = async (achievement: AchievementType) => {
    try {
      const newAchievement = await addDocument("achievements", achievement);
      setAchievements((prev) => [...prev, newAchievement as AchievementType]);
      toast({
        title: "Success",
        description: "Achievement added successfully",
      });
      return newAchievement as AchievementType;
    } catch (error: any) {
      toast({
        title: "Error adding achievement",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAchievement = async (
    id: string,
    achievement: AchievementType
  ) => {
    try {
      const updatedAchievement = await updateDocument(
        "achievements",
        id,
        achievement
      );
      setAchievements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...achievement } : a))
      );
      toast({
        title: "Success",
        description: "Achievement updated successfully",
      });
      return updatedAchievement as AchievementType;
    } catch (error: any) {
      toast({
        title: "Error updating achievement",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await deleteDocument("achievements", id);
      setAchievements((prev) => prev.filter((a) => a.id !== id));
      toast({
        title: "Success",
        description: "Achievement deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting achievement",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Hero update operation
  const updateHero = async (heroData: HeroType) => {
    try {
      let updatedHero;
      if (hero && hero.id) {
        // Update existing hero
        updatedHero = await updateDocument("hero", hero.id, heroData);
      } else {
        // Create new hero document
        updatedHero = await addDocument("hero", heroData);
      }
      setHero(updatedHero as HeroType);
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
      return updatedHero as HeroType;
    } catch (error: any) {
      toast({
        title: "Error updating hero section",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        certificates,
        skills,
        experiences,
        projects,
        achievements,
        hero,
        loading,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addProject,
        updateProject,
        deleteProject,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updateHero,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
