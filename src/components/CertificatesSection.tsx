
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cloud, ExternalLink, Award, BadgeCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  credentialId?: string;
  index: number;
  category: string;
  imageUrl?: string;
}

const CertificateCard = ({ title, issuer, date, icon, credentialId, index, category, imageUrl }: CertificateCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="h-full"
  >
    <Card className="bg-gradient-to-br from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        <div className="absolute right-2 top-2 text-violet-400 bg-violet-400/10 p-2 rounded-full">
          {icon}
        </div>
        
        <div className="h-48 overflow-hidden rounded-t-md mb-2">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-900/30">
              <Award className="w-16 h-16 text-violet-400/50" />
            </div>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-300">Issued by {issuer}</p>
        {credentialId && (
          <p className="text-xs text-gray-400 mt-1">Credential ID: {credentialId}</p>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col items-start gap-2">
        <Badge variant="outline" className="bg-violet-400/10 text-gray-300 border-violet-400/20">
          {date}
        </Badge>
        <Button variant="link" className="text-violet-400 p-0 h-auto flex items-center gap-1">
          View Certificate <ExternalLink className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const CertificatesSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const certificates = [
    {
      title: "Google Cybersecurity",
      issuer: "Coursera",
      date: "2023",
      icon: <Shield className="w-6 h-6" />,
      category: "security",
      credentialId: "via coursera",
      imageUrl: "https://picsum.photos/id/180/500/300"
    },
    {
      title: "Google UX Design",
      issuer: "Google",
      date: "2024",
      icon: <BadgeCheck className="w-6 h-6" />,
      category: "design",
      credentialId: "via coursera",
      imageUrl: "https://picsum.photos/id/26/500/300"
    },
    {
      title: "Python Automation",
      issuer: "Google",
      date: "2024",
      icon: <BadgeCheck className="w-6 h-6" />,
      category: "python",
      credentialId: "via coursera",
      imageUrl: "https://picsum.photos/id/160/500/300"
    },
    {
      title: "Software Engineering Basics",
      issuer: "edX",
      date: "2024",
      icon: <Badge className="w-6 h-6" />,
      category: "engineering",
      credentialId: "Authorized by IBM",
      imageUrl: "https://picsum.photos/id/48/500/300"
    },
    {
      title: "AWS Cloud Foundations",
      issuer: "AWS Academy",
      date: "2022",
      icon: <Cloud className="w-6 h-6" />,
      category: "cloud",
      credentialId: "via AWS",
      imageUrl: "https://picsum.photos/id/60/500/300"
    },
    {
      title: "Project Management",
      issuer: "Google",
      date: "2024",
      icon: <BadgeCheck className="w-6 h-6" />,
      category: "management",
      credentialId: "via coursera",
      imageUrl: "https://picsum.photos/id/20/500/300"
    }
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "design", label: "UX Design" },
    { id: "python", label: "Python" },
    { id: "engineering", label: "Software Engineering" },
    { id: "cloud", label: "Data Analytics" },
    { id: "management", label: "Mobile Application Development" },
    { id: "security", label: "AI-ML, Deep Learning, Prompting" }
  ];

  const filteredCertificates = activeTab === "all" 
    ? certificates 
    : certificates.filter(cert => cert.category === activeTab);

  return (
    <section id="certificates" className="bg-gradient-to-b from-indigo-950 to-slate-900 section">
      <div className="section-container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title gradient-text text-center mx-auto">
            Professional Certificates
          </h2>
          <p className="text-gray-400 mb-8">
            A collection of my professional certifications and achievements
          </p>
        </motion.div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div 
            className="flex justify-center mb-8 overflow-x-auto pb-4 scrollbar-none" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TabsList className="bg-white/5 backdrop-blur-sm border border-white/10">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className={cn(
                    "text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10",
                    "px-4 py-1.5 rounded transition-all duration-300"
                  )}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredCertificates.map((cert, index) => (
                <CertificateCard
                  key={index}
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  icon={cert.icon}
                  credentialId={cert.credentialId}
                  category={cert.category}
                  index={index}
                  imageUrl={cert.imageUrl}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CertificatesSection;
