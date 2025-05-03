
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { usePortfolio, HeroType } from "@/contexts/PortfolioContext";

const AdminHeroForm = () => {
  const { hero, updateHero, loading } = usePortfolio();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<HeroType>({
    name: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    resumeUrl: "",
    socialLinks: {
      github: "",
      linkedin: "",
      instagram: "",
      email: ""
    },
    cgpa: ""
  });

  // Load existing data when component mounts
  useEffect(() => {
    if (hero) {
      setFormData(hero);
    }
  }, [hero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      // Handle nested properties (for socialLinks)
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData as any)[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateHero(formData);
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading.hero) {
    return <div className="p-4 text-center">Loading hero data...</div>;
  }

  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter a catchy subtitle"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief description about yourself"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Profile Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter profile image URL"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="Enter resume URL"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cgpa">CGPA</Label>
            <Input
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="Enter your CGPA"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Social Links</h3>
            
            <div className="space-y-2">
              <Label htmlFor="socialLinks.github">GitHub</Label>
              <Input
                id="socialLinks.github"
                name="socialLinks.github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="Enter GitHub profile URL"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
              <Input
                id="socialLinks.linkedin"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn profile URL"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialLinks.instagram">Instagram</Label>
              <Input
                id="socialLinks.instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="Enter Instagram profile URL"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialLinks.email">Email</Label>
              <Input
                id="socialLinks.email"
                name="socialLinks.email"
                value={formData.socialLinks.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-violet-500 hover:bg-violet-600 text-white"
          >
            {isSubmitting ? "Updating..." : "Update Hero Section"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminHeroForm;
