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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import FileUpload from "./FileUpload";

interface Project {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  technologies: string;
  demoLink: string;
  githubLink: string;
}

const AdminProjectsForm = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    technologies: "",
    demoLink: "",
    githubLink: "",
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load project data",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProjectId) {
        const projectRef = doc(db, "projects", editingProjectId);
        await updateDoc(projectRef, { ...newProject });
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProjectId
              ? { ...newProject, id: editingProjectId }
              : project
          )
        );
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const docRef = await addDoc(collection(db, "projects"), newProject);
        setProjects([...projects, { ...newProject, id: docRef.id }]);
        toast({
          title: "Success",
          description: "Project added successfully",
        });
      }

      setNewProject({
        title: "",
        subtitle: "",
        description: "",
        imageUrl: "",
        technologies: "",
        demoLink: "",
        githubLink: "",
      });
      setEditingProjectId(null);
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (url: string) => {
    setNewProject((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  if (fetchLoading) {
    return <div>Loading project data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingProjectId ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                placeholder="My Project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Project Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={newProject.subtitle}
                onChange={handleInputChange}
                placeholder="Project Subtitle"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Project Image</Label>
              <FileUpload onFileUpload={handleImageUpload} folder="projects" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                placeholder="Project description..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input
                id="technologies"
                name="technologies"
                value={newProject.technologies}
                onChange={handleInputChange}
                placeholder="React, TypeScript, Firebase"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demoLink">Demo Link</Label>
                <Input
                  id="demoLink"
                  name="demoLink"
                  value={newProject.demoLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  value={newProject.githubLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading
                  ? editingProjectId
                    ? "Updating..."
                    : "Adding..."
                  : editingProjectId
                  ? "Update Project"
                  : "Add Project"}
              </Button>
              {editingProjectId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setNewProject({
                      title: "",
                      subtitle: "",
                      description: "",
                      imageUrl: "",
                      technologies: "",
                      demoLink: "",
                      githubLink: "",
                    });
                    setEditingProjectId(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No projects added yet.</p>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setNewProject({
                        title: project.title,
                        subtitle: project.subtitle,
                        description: project.description,
                        imageUrl: project.imageUrl,
                        technologies: project.technologies,
                        demoLink: project.demoLink,
                        githubLink: project.githubLink,
                      });
                      setEditingProjectId(project.id || null);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <CardContent className="pt-6 space-y-2">
                  <h4 className="font-medium">{project.title}</h4>
                  {project.imageUrl && (
                    <div className="aspect-video bg-muted/20 overflow-hidden rounded-md">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm">{project.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.technologies}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsForm;
