
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WorkSection from '@/components/WorkSection';
import SkillsSection from '@/components/SkillsSection';
import CertificatesSection from '@/components/CertificatesSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-nero-dark text-white overflow-x-hidden">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <CertificatesSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
