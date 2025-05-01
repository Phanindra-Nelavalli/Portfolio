
import { Shield, Cloud } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
}

const CertificateCard = ({ title, issuer, date, icon }: CertificateCardProps) => (
  <Card className="bg-white text-nero-dark hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="text-nero-accent">{icon}</div>
      </div>
    </CardHeader>
    
    <CardContent>
      <p className="text-gray-700">{issuer}</p>
    </CardContent>
    
    <CardFooter className="pt-2 flex justify-between">
      <Badge variant="outline" className="text-gray-500">{date}</Badge>
    </CardFooter>
  </Card>
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
    <section id="certificates" className="bg-white section">
      <div className="section-container">
        <h2 className="section-title text-nero-dark">Certificates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              issuer={cert.issuer}
              date={cert.date}
              icon={cert.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
