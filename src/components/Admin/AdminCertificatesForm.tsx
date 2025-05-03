
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface Certificate {
  id?: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
}

const AdminCertificatesForm = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    title: "",
    issuedBy: "",
    date: "",
    imageUrl: "",
    credentialUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesCollection = collection(db, "certificates");
        const certificatesSnapshot = await getDocs(certificatesCollection);
        const certificatesList = certificatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Certificate[];
        
        setCertificates(certificatesList);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast({
          title: "Error",
          description: "Failed to load certificate data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCertificates();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "certificates"), newCertificate);
      setCertificates([...certificates, { ...newCertificate, id: docRef.id }]);
      setNewCertificate({
        title: "",
        issuedBy: "",
        date: "",
        imageUrl: "",
        credentialUrl: "",
      });
      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
    } catch (error) {
      console.error("Error adding certificate:", error);
      toast({
        title: "Error",
        description: "Failed to add certificate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (id: string | undefined) => {
    if (!id) return;
    
    try {
      await deleteDoc(doc(db, "certificates", id));
      setCertificates(certificates.filter(cert => cert.id !== id));
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    }
  };

  if (fetchLoading) {
    return <div>Loading certificate data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCertificate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certificate Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newCertificate.title}
                  onChange={handleInputChange}
                  placeholder="React Developer Certification"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issuedBy">Issued By</Label>
                <Input
                  id="issuedBy"
                  name="issuedBy"
                  value={newCertificate.issuedBy}
                  onChange={handleInputChange}
                  placeholder="Coursera"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Issue Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newCertificate.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Certificate Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={newCertificate.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/certificate.jpg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential URL</Label>
              <Input
                id="credentialUrl"
                name="credentialUrl"
                value={newCertificate.credentialUrl}
                onChange={handleInputChange}
                placeholder="https://coursera.org/verify/123456"
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Add Certificate"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.length === 0 ? (
            <p className="text-muted-foreground">No certificates added yet.</p>
          ) : (
            certificates.map(certificate => (
              <Card key={certificate.id} className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => handleDeleteCertificate(certificate.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">{certificate.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {certificate.issuedBy} • {certificate.date}
                    </p>
                    {certificate.imageUrl && (
                      <div className="aspect-[3/2] bg-muted/20 overflow-hidden rounded-md mt-2">
                        <img 
                          src={certificate.imageUrl} 
                          alt={certificate.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCertificatesForm;
