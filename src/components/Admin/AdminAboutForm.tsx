
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AdminAboutForm = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAboutData(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast({
          title: "Error",
          description: "Failed to load about data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAboutData();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await setDoc(doc(db, "content", "about"), aboutData);
      toast({
        title: "Success",
        description: "About information updated successfully",
      });
    } catch (error) {
      console.error("Error updating about data:", error);
      toast({
        title: "Error",
        description: "Failed to update about information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div>Loading about data...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={aboutData.title}
              onChange={handleInputChange}
              placeholder="About Me"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={aboutData.subtitle}
              onChange={handleInputChange}
              placeholder="Your subtitle"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={aboutData.description}
              onChange={handleInputChange}
              placeholder="Write something about yourself..."
              rows={6}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={aboutData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/your-image.jpg"
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAboutForm;
