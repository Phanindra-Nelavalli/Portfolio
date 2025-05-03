// src/components/AdminHeroForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { usePortfolio, HeroType } from "@/contexts/PortfolioContext";
import FileUpload from "./FileUpload";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// —————————— HighlightableText ——————————
interface HighlightableTextProps {
  text: string;
  onUpdate: (highlightedText: string) => void;
}

const HighlightableText = ({ text, onUpdate }: HighlightableTextProps) => {
  const [words, setWords] = useState<
    Array<{ text: string; highlighted: boolean }>
  >([]);

  useEffect(() => {
    if (!text) return;
    if (text.includes("<span")) {
      const processed = text.replace(
        /<span[^>]*>(.*?)<\/span>/g,
        (_, content) => `${content}[HIGHLIGHTED]`
      );
      setWords(
        processed.split(" ").map((w) => ({
          text: w.replace(/\[HIGHLIGHTED\]/, ""),
          highlighted: w.includes("[HIGHLIGHTED]"),
        }))
      );
    } else {
      setWords(text.split(" ").map((w) => ({ text: w, highlighted: false })));
    }
  }, [text]);

  const toggleHighlight = (i: number) => {
    const next = [...words];
    next[i].highlighted = !next[i].highlighted;
    setWords(next);

    const updated = next
      .map((w) =>
        w.highlighted ? `<span class="gradient-text">${w.text}</span>` : w.text
      )
      .join(" ");
    onUpdate(updated);
  };

  return (
    <div className="mt-2 p-3 border rounded-md bg-gray-50">
      <p className="mb-2 text-sm text-gray-500">
        Click words to highlight/unhighlight:
      </p>
      <div className="flex flex-wrap gap-1">
        {words.map((w, i) => (
          <span
            key={i}
            className={`cursor-pointer px-1 py-0.5 rounded ${
              w.highlighted ? "gradient-text font-medium" : "text-gray-800"
            }`}
            onClick={() => toggleHighlight(i)}
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
};

// —————————— AdminHeroForm ——————————
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
    socialLinks: { github: "", linkedin: "", instagram: "", email: "" },
    cgpa: "",
    posX: 50,
    posY: 50,
    zoom: 1,
  });

  // Load existing hero
  useEffect(() => {
    if (hero) {
      setFormData({
        ...hero,
        posX: hero.posX ?? 50,
        posY: hero.posY ?? 50,
        zoom: hero.zoom ?? 1,
      });
    }
  }, [hero]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...(formData as any)[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSliderChange = (
    field: "posX" | "posY" | "zoom",
    value: number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateHero(formData);
      toast({ title: "Success", description: "Hero updated." });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (url: string) => {
    setFormData((fd) => ({ ...fd, imageUrl: url }));
  };

  const uploadProfileImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const fileRef = ref(storage, `profile-images/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  if (loading.hero) return <div className="p-4 text-center">Loading…</div>;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Edit Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name.replace(/<[^>]*>/g, "")}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <HighlightableText
                text={formData.name}
                onUpdate={(txt) => setFormData((fd) => ({ ...fd, name: txt }))}
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle.replace(/<[^>]*>/g, "")}
                onChange={handleChange}
                placeholder="Catchy subtitle"
              />
              <HighlightableText
                text={formData.subtitle}
                onUpdate={(txt) =>
                  setFormData((fd) => ({ ...fd, subtitle: txt }))
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Profile Image and Sliders */}
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex flex-col md:flex-row items-center justify-center text-center space-y-6 md:space-y-0 md:space-x-6 w-full">
                <div className="relative">
                  <label
                    htmlFor="profile-upload"
                    className="block w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                  >
                    {formData.imageUrl ? (
                      <img
                        src={formData!.imageUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          objectPosition: `${formData.posX}% ${formData.posY}%`,
                          transform: `scale(${formData.zoom})`,
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {formData.name
                            .replace(/<[^>]*>?/g, "")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await uploadProfileImage(file);
                      handleFileUpload(url);
                    }}
                  />
                </div>

                {/* Sliders */}
                <div className="space-y-4 flex-1 w-full max-w-md">
                  <div>
                    <Label htmlFor="posX">Horizontal Position</Label>
                    <Input
                      id="posX"
                      type="range"
                      min={0}
                      max={100}
                      value={formData.posX}
                      onChange={(e) =>
                        handleSliderChange("posX", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="posY">Vertical Position</Label>
                    <Input
                      id="posY"
                      type="range"
                      min={0}
                      max={100}
                      value={formData.posY}
                      onChange={(e) =>
                        handleSliderChange("posY", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="zoom">Zoom</Label>
                    <Input
                      id="zoom"
                      type="range"
                      min={1}
                      max={2}
                      step={0.01}
                      value={formData.zoom}
                      onChange={(e) =>
                        handleSliderChange("zoom", Number(e.target.value))
                      }
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Use sliders to adjust position and zoom of the avatar.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <Label>Resume</Label>
              <FileUpload
                onFileUpload={(url) =>
                  setFormData((fd) => ({ ...fd, resumeUrl: url }))
                }
                currentImageUrl={formData.resumeUrl}
                folder="resume"
                accept=".pdf,.doc,.docx"
              />
              {formData.resumeUrl && (
                <p className="mt-2 text-sm text-blue-600">
                  <a
                    href={formData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View uploaded resume
                  </a>
                </p>
              )}
            </div>

            {/* CGPA */}
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

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["github", "linkedin", "instagram", "email"] as const).map(
                  (key) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={`socialLinks.${key}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        id={`socialLinks.${key}`}
                        name={`socialLinks.${key}`}
                        value={(formData.socialLinks as any)[key]}
                        onChange={handleChange}
                        placeholder={`Enter ${key} URL`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Updating..." : "Update Hero Section"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <style>{`
        .gradient-text {
          background: linear-gradient(to right, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};

export default AdminHeroForm;
