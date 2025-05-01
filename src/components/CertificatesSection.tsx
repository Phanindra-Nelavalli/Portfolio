
import { motion } from 'framer-motion';
import { Shield, Cloud } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  index: number;
}

const CertificateCard = ({ title, issuer, date, icon, index }: CertificateCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <Card className="bg-gradient-to-br from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="text-violet-400 bg-violet-400/10 p-2 rounded-full">{icon}</div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-300">{issuer}</p>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Badge variant="outline" className="bg-violet-400/10 text-gray-300 border-violet-400/20">{date}</Badge>
      </CardFooter>
    </Card>
  </motion.div>
);

const CertificatesSection = () => {
  const certificates = [
    {
      title: "Google Cybersecurity",
      issuer: "Coursera",
      date: "2023",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Palo Alto Cybersecurity",
      issuer: "Palo Alto Networks",
      date: "2023",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "AWS Cloud Foundations",
      issuer: "AWS Academy",
      date: "2022",
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  return (
    <section id="certificates" className="bg-gradient-to-b from-indigo-950 to-slate-900 section">
      <div className="section-container">
        <motion.h2 
          className="section-title gradient-text text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Certificates
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              issuer={cert.issuer}
              date={cert.date}
              icon={cert.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
