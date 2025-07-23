import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Pencil } from "lucide-react";
import FileUpload from "./FileUpload";
// Adjust the import path if needed

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesCollection = collection(db, "certificates");
        const snapshot = await getDocs(certificatesCollection);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Certificate[];
        setCertificates(list);
      } catch (error) {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCertificate((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (certificate: Certificate) => {
    setNewCertificate(certificate);
    setEditingId(certificate.id ?? null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCertificate({
      title: "",
      issuedBy: "",
      date: "",
      imageUrl: "",
      credentialUrl: "",
    });
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = newCertificate.imageUrl;

      if (!imageUrl) {
        toast({
          title: "Missing Image",
          description: "Please upload a certificate image.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (editingId) {
        const certRef = doc(db, "certificates", editingId);
        await updateDoc(certRef, { ...newCertificate, imageUrl });
        setCertificates((prev) =>
          prev.map((cert) =>
            cert.id === editingId
              ? { ...newCertificate, id: editingId, imageUrl }
              : cert
          )
        );
        toast({
          title: "Updated",
          description: "Certificate updated successfully.",
        });
      } else {
        const docRef = await addDoc(collection(db, "certificates"), {
          ...newCertificate,
          imageUrl,
        });
        setCertificates([
          ...certificates,
          { ...newCertificate, id: docRef.id, imageUrl },
        ]);
        toast({
          title: "Success",
          description: "Certificate added successfully.",
        });
      }

      setNewCertificate({
        title: "",
        issuedBy: "",
        date: "",
        imageUrl: "",
        credentialUrl: "",
      });
      setEditingId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: editingId
          ? "Failed to update certificate"
          : "Failed to add certificate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (id?: string) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "certificates", id));
      setCertificates(certificates.filter((cert) => cert.id !== id));
      toast({ title: "Deleted", description: "Certificate deleted." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    }
  };

  if (fetchLoading) return <div>Loading certificate data...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {editingId ? "Edit Certificate" : "Add New Certificate"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certificate Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newCertificate.title}
                  onChange={handleInputChange}
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
                <Label>Certificate Image</Label>
                <FileUpload
                  onFileUpload={(url) => {
                    console.log("Uploaded image URL:", url); // ← check if this fires
                    setNewCertificate((prev) => ({ ...prev, imageUrl: url }));
                  }}
                  currentImageUrl={newCertificate.imageUrl}
                  folder="certificates"
                  accept="image/*"
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
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                  ? "Update Certificate"
                  : "Add Certificate"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="w-full"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.length === 0 ? (
            <p className="text-muted-foreground">No certificates added yet.</p>
          ) : (
            certificates.map((cert) => (
              <Card key={cert.id} className="relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600"
                    onClick={() => handleEdit(cert)}
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteCertificate(cert.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuedBy} • {cert.date}
                    </p>
                    {cert.imageUrl && (
                      <div className="aspect-[3/2] bg-muted/20 overflow-hidden rounded-md mt-2">
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
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
