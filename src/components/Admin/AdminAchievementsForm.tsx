
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

interface Achievement {
  id?: string;
  title: string;
  date: string;
  description: string;
}

const AdminAchievementsForm = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    title: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const achievementsCollection = collection(db, "achievements");
        const achievementsSnapshot = await getDocs(achievementsCollection);
        const achievementsList = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Achievement[];
        
        setAchievements(achievementsList);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        toast({
          title: "Error",
          description: "Failed to load achievement data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAchievements();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "achievements"), newAchievement);
      setAchievements([...achievements, { ...newAchievement, id: docRef.id }]);
      setNewAchievement({
        title: "",
        date: "",
        description: "",
      });
      toast({
        title: "Success",
        description: "Achievement added successfully",
      });
    } catch (error) {
      console.error("Error adding achievement:", error);
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAchievement = async (id: string | undefined) => {
    if (!id) return;
    
    try {
      await deleteDoc(doc(db, "achievements", id));
      setAchievements(achievements.filter(achievement => achievement.id !== id));
      toast({
        title: "Success",
        description: "Achievement deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    }
  };

  if (fetchLoading) {
    return <div>Loading achievement data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAchievement} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newAchievement.title}
                  onChange={handleInputChange}
                  placeholder="First Prize in Hackathon"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newAchievement.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newAchievement.description}
                onChange={handleInputChange}
                placeholder="Describe your achievement..."
                rows={3}
                required
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Add Achievement"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Achievements</h3>
        {achievements.length === 0 ? (
          <p className="text-muted-foreground">No achievements added yet.</p>
        ) : (
          achievements.map(achievement => (
            <Card key={achievement.id} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-destructive"
                onClick={() => handleDeleteAchievement(achievement.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                  <p className="text-sm">{achievement.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAchievementsForm;
