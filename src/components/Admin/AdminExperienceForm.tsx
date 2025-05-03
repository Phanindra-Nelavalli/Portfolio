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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Pencil } from "lucide-react";

interface Experience {
  id?: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate?: string;
  duration?: string;
}

const AdminExperienceForm = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    role: "",
    company: "",
    description: "",
    skills: [],
    startDate: "",
    endDate: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesCollection = collection(db, "experiences");
        const experiencesSnapshot = await getDocs(experiencesCollection);
        const experiencesList = experiencesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Experience[];

        setExperiences(experiencesList);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        toast({
          title: "Error",
          description: "Failed to load experience data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchExperiences();
  }, [toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      skills: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const formatDateRange = (start: string, end?: string) => {
    const format = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    };
    const startFormatted = format(start);
    const endFormatted = end ? format(end) : "Present";
    return `${startFormatted} - ${endFormatted}`;
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedDuration = formatDateRange(
      newExperience.startDate,
      newExperience.endDate
    );

    const experienceToSubmit = {
      ...newExperience,
      duration: formattedDuration,
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "experiences", editId), experienceToSubmit);
        setExperiences((prev) =>
          prev.map((exp) => (exp.id === editId ? { ...experienceToSubmit, id: editId } : exp))
        );
        toast({
          title: "Success",
          description: "Experience updated successfully",
        });
      } else {
        const docRef = await addDoc(collection(db, "experiences"), experienceToSubmit);
        setExperiences([...experiences, { ...experienceToSubmit, id: docRef.id }]);
        toast({
          title: "Success",
          description: "Experience added successfully",
        });
      }
      setNewExperience({
        role: "",
        company: "",
        description: "",
        skills: [],
        startDate: "",
        endDate: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error submitting experience:", error);
      toast({
        title: "Error",
        description: "Failed to submit experience",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "experiences", id));
      setExperiences(experiences.filter((exp) => exp.id !== id));
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  const handleEditExperience = (experience: Experience) => {
    setEditId(experience.id || null);
    setNewExperience({ ...experience });
  };

  if (fetchLoading) {
    return <div>Loading experience data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {editId ? "Edit Experience" : "Add New Experience"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExperience} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={newExperience.role}
                  onChange={handleInputChange}
                  placeholder="Software Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="month"
                  value={newExperience.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="month"
                  value={newExperience.endDate}
                  onChange={handleInputChange}
                  placeholder="Leave empty for Present"
                />
                <p className="text-xs text-gray-500">Leave empty for Present</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newExperience.description}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Technologies / Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={newExperience.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="e.g., React, Node.js, TypeScript"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Experience" : "Add Experience"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Experiences</h3>
        {experiences.length === 0 ? (
          <p className="text-muted-foreground">No experiences added yet.</p>
        ) : (
          experiences.map((experience) => (
            <Card key={experience.id} className="relative">
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-500"
                  onClick={() => handleEditExperience(experience)}
                >
                  <Pencil className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDeleteExperience(experience.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h4 className="font-medium">{experience.role}</h4>
                  <p className="text-sm text-muted-foreground">
                    {experience.company} | {experience.duration}
                  </p>
                  <p>{experience.description}</p>
                  <p className="text-sm">{experience.skills.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminExperienceForm;
