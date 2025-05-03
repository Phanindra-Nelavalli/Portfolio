
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { usePortfolio, HeroType } from "@/contexts/PortfolioContext";
import FileUpload from "./FileUpload";

interface HighlightableTextProps {
  text: string;
  onUpdate: (highlightedText: string) => void;
  highlightedClass?: string;
}

const HighlightableText = ({ text, onUpdate, highlightedClass = "text-violet-500" }: HighlightableTextProps) => {
  const [words, setWords] = useState<Array<{ text: string; highlighted: boolean }>>(
    text.split(' ').map(word => ({ text: word, highlighted: word.includes('<span') }))
  );

  // Parse initial highlighted text
  useEffect(() => {
    if (!text) return;

    // Simple HTML tag detection
    if (text.includes('<span')) {
      const processedText = text.replace(/<span[^>]*>(.*?)<\/span>/g, (match, content) => {
        return `${content}[HIGHLIGHTED]`;
      });
      
      setWords(
        processedText.split(' ').map(word => ({
          text: word.replace('[HIGHLIGHTED]', ''),
          highlighted: word.includes('[HIGHLIGHTED]')
        }))
      );
    } else {
      setWords(text.split(' ').map(word => ({ text: word, highlighted: false })));
    }
  }, [text]);

  const toggleHighlight = (index: number) => {
    const newWords = [...words];
    newWords[index].highlighted = !newWords[index].highlighted;
    setWords(newWords);
    
    // Generate the updated text with highlighting
    const updatedText = newWords.map(word => 
      word.highlighted 
        ? `<span class="gradient-text">${word.text}</span>` 
        : word.text
    ).join(' ');
    
    onUpdate(updatedText);
  };

  return (
    <div className="mt-2 p-3 border rounded-md bg-gray-50">
      <p className="mb-2 text-sm text-gray-500">Click on words to highlight/unhighlight them:</p>
      <div className="flex flex-wrap gap-1">
        {words.map((word, index) => (
          <span
            key={index}
            className={`cursor-pointer px-1 py-0.5 rounded ${
              word.highlighted ? `${highlightedClass} font-medium` : 'text-gray-800'
            }`}
            onClick={() => toggleHighlight(index)}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};

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

  const handleFileUpload = (url: string) => {
    setFormData({
      ...formData,
      imageUrl: url
    });
  };
  
  const handleResumeUpload = (url: string) => {
    setFormData({
      ...formData,
      resumeUrl: url
    });
  };

  const handleHighlightedName = (highlightedText: string) => {
    setFormData({
      ...formData,
      name: highlightedText
    });
  };
  
  const handleHighlightedSubtitle = (highlightedText: string) => {
    setFormData({
      ...formData,
      subtitle: highlightedText
    });
  };

  if (loading.hero) {
    return <div className="p-4 text-center">Loading hero data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name.replace(/<[^>]*>/g, '')}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <HighlightableText 
              text={formData.name} 
              onUpdate={handleHighlightedName}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle.replace(/<[^>]*>/g, '')}
              onChange={handleChange}
              placeholder="Enter a catchy subtitle"
            />
            <HighlightableText 
              text={formData.subtitle} 
              onUpdate={handleHighlightedSubtitle}
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
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <FileUpload 
              onFileUpload={handleFileUpload} 
              currentImageUrl={formData.imageUrl}
              folder="profile"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Resume</Label>
            <FileUpload 
              onFileUpload={handleResumeUpload} 
              currentImageUrl={formData.resumeUrl}
              folder="resume"
              accept=".pdf,.doc,.docx"
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
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Social Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socialLinks.github">GitHub</Label>
                <Input
                  id="socialLinks.github"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  placeholder="Enter GitHub profile URL"
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
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Updating..." : "Update Hero Section"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminHeroForm;
