import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Award, ArrowRight, View, Link, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface Certificate {
  id?: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
}

const CertificateSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesCollection = collection(db, "certificates");
        const certificatesSnapshot = await getDocs(certificatesCollection);
        const certificatesList = certificatesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Certificate[];

        setCertificates(certificatesList);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (fetchLoading) {
    return <div>Loading certificate data...</div>;
  }

  return (
    <section
      id="certificates"
      className="bg-gradient-to-b from-indigo-950 to-slate-900 py-12"
    >
      <div className="section-container">
        <motion.h2
          className="section-title gradient-text inline-block mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Certificates
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.length === 0 ? (
            <p className="text-muted-foreground text-center col-span-2">
              No certificates added yet.
            </p>
          ) : (
            certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="relative glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute right-6 top-6 p-2 bg-violet-400/20 rounded-full">
                  <Award className="h-6 w-6 text-violet-400" />
                </div>

                <h4 className="text-xl font-bold mb-2">{certificate.title}</h4>
                <div className="text-gray-300 text-sm mb-2">
                  {certificate.issuedBy} • {certificate.date}
                </div>

                {certificate.imageUrl && (
                  <div className="aspect-[3/2] bg-muted/20 overflow-hidden rounded-md mt-2">
                    <img
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: "center" }}
                    />
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <motion.a
                    href={certificate.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Eye size={16} className="mr-2" />
                    View Certificate
                  </motion.a>

                  <motion.a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Link size={16} className="mr-2" />
                    View Credential
                  </motion.a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
