
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cloud, ExternalLink, Award, BadgeCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePortfolio, CertificateType } from '@/contexts/PortfolioContext';

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

const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'security':
      return <Shield className="w-6 h-6" />;
    case 'cloud':
      return <Cloud className="w-6 h-6" />;
    default:
      return <BadgeCheck className="w-6 h-6" />;
  }
};

const CertificatesSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { certificates, loading } = usePortfolio();
  
  // Get unique categories from certificates for tabs
  const categoriesSet = new Set<string>(certificates.map(cert => cert.category));
  const categories = [
    { id: "all", label: "All" },
    ...Array.from(categoriesSet).map(category => ({
      id: category,
      label: category.charAt(0).toUpperCase() + category.slice(1) // Capitalize first letter
    }))
  ];

  const filteredCertificates = activeTab === "all" 
    ? certificates 
    : certificates.filter(cert => cert.category === activeTab);

  if (loading.certificates) {
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
          </motion.div>
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-400">Loading certificates...</p>
          </div>
        </div>
      </section>
    );
  }

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
        
        {certificates.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-400">No certificates available yet.</p>
          </div>
        ) : (
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
                    key={cert.id || index}
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    icon={getIconForCategory(cert.category)}
                    credentialId={cert.credentialId}
                    category={cert.category}
                    index={index}
                    imageUrl={cert.imageUrl}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
