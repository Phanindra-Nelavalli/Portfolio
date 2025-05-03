import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Code2, FileCode, Database, Laptop, FileJson, PenTool } from "lucide-react";

interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number;
}

const categoryIcons: Record<string, JSX.Element> = {
  Languages: <Code2 />,
  Frontend: <FileCode />,
  Backend: <Database />,
  Mobile: <Laptop />,
  "Data Tools": <FileJson />,
  Design: <PenTool />,
};

const categoryOptions = Object.keys(categoryIcons);

const AdminSkillsForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    category: "",
    level: 80,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollection);
        const skillsList = skillsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Skill[];

        setSkills(skillsList);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast({
          title: "Error",
          description: "Failed to load skill data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchSkills();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({
      ...prev,
      [name]: name === "level" ? parseInt(value, 10) : value
    }));
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "skills"), newSkill);
      setSkills([...skills, { ...newSkill, id: docRef.id }]);
      setNewSkill({
        name: "",
        category: "",
        level: 80,
      });
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      console.error("Error adding skill:", error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "skills", id));
      setSkills(skills.filter(skill => skill.id !== id));
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  if (fetchLoading) {
    return <div>Loading skill data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newSkill.name}
                  onChange={handleInputChange}
                  placeholder="React"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={newSkill.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>Select a category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">
                Proficiency Level: {newSkill.level}%
              </Label>
              <Input
                id="level"
                name="level"
                type="range"
                min={0}
                max={100}
                value={newSkill.level}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Add Skill"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.length === 0 ? (
            <p className="text-muted-foreground">No skills added yet.</p>
          ) : (
            skills.map(skill => (
              <Card key={skill.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => handleDeleteSkill(skill.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{skill.name}</h4>
                    <span className="text-muted-foreground">
                      {categoryIcons[skill.category] ?? null}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{skill.category}</p>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right">{skill.level}%</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkillsForm;
