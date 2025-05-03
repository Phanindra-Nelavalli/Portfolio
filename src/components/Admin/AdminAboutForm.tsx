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
    academicDetails: {
      ssc: {
        year: "",
        percentage: "",
        school: "",
      },
      intermediate: {
        year: "",
        percentage: "",
        college: "",
      },
      btech: {
        degree: "",
        branch: "",
        fromYear: "",
        toYear: "",
        cgpa: "",
        college: "",
      },
    },
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
          const fetchedData = docSnap.data();
          setAboutData((prev) => ({
            ...prev,
            ...fetchedData,
            academicDetails: {
              ...prev.academicDetails,
              ...fetchedData.academicDetails,
              btech: {
                ...prev.academicDetails.btech,
                ...fetchedData.academicDetails?.btech,
              },
              intermediate: {
                ...prev.academicDetails.intermediate,
                ...fetchedData.academicDetails?.intermediate,
              },
              ssc: {
                ...prev.academicDetails.ssc,
                ...fetchedData.academicDetails?.ssc,
              },
            },
          }));
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcademicInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [section, field] = name.split("_");
    setAboutData((prev) => ({
      ...prev,
      academicDetails: {
        ...prev.academicDetails,
        [section]: {
          ...prev.academicDetails[section],
          [field]: value,
        },
      },
    }));
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
          {/* Title, Subtitle, Description */}
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

          {/* SSC Details */}
          <div className="space-y-2 mt-6">
            <h3 className="text-xl font-medium">SSC Details</h3>
            <Input
              id="ssc_year"
              name="ssc_year"
              value={aboutData.academicDetails.ssc.year}
              onChange={handleAcademicInputChange}
              placeholder="2020"
            />
            <Input
              id="ssc_percentage"
              name="ssc_percentage"
              value={aboutData.academicDetails.ssc.percentage}
              onChange={handleAcademicInputChange}
              placeholder="85%"
              type="number"
            />
            <Input
              id="ssc_school"
              name="ssc_school"
              value={aboutData.academicDetails.ssc.school}
              onChange={handleAcademicInputChange}
              placeholder="XYZ School"
            />
          </div>

          {/* Intermediate Details */}
          <div className="space-y-2 mt-6">
            <h3 className="text-xl font-medium">Intermediate Details</h3>
            <Input
              id="intermediate_year"
              name="intermediate_year"
              value={aboutData.academicDetails.intermediate.year}
              onChange={handleAcademicInputChange}
              placeholder="2022"
            />
            <Input
              id="intermediate_percentage"
              name="intermediate_percentage"
              value={aboutData.academicDetails.intermediate.percentage}
              onChange={handleAcademicInputChange}
              placeholder="90%"
              type="number"
            />
            <Input
              id="intermediate_college"
              name="intermediate_college"
              value={aboutData.academicDetails.intermediate.college}
              onChange={handleAcademicInputChange}
              placeholder="XYZ College"
            />
          </div>

          {/* B.Tech Details */}
          <div className="space-y-2 mt-6">
            <h3 className="text-xl font-medium">B.Tech Details</h3>
            <Input
              id="btech_degree"
              name="btech_degree"
              value={aboutData.academicDetails.btech.degree}
              onChange={handleAcademicInputChange}
              placeholder="B.Tech"
            />
            <Input
              id="btech_branch"
              name="btech_branch"
              value={aboutData.academicDetails.btech.branch}
              onChange={handleAcademicInputChange}
              placeholder="Computer Science"
            />

            <Input
              id="btech_fromYear"
              name="btech_fromYear"
              value={aboutData.academicDetails.btech.fromYear}
              onChange={handleAcademicInputChange}
              placeholder="2020"
              type="number"
            />

            <div className="space-y-2">
              <select
                id="btech_toYear"
                name="btech_toYear"
                value={aboutData.academicDetails.btech.toYear}
                onChange={handleAcademicInputChange}
                aria-placeholder="To year"
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select To Year</option>
                {Array.from({ length: 10 }).map((_, i) => {
                  const year = 2024 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
                <option value="Present">Present</option>
              </select>
            </div>

            <Input
              id="btech_cgpa"
              name="btech_cgpa"
              value={aboutData.academicDetails.btech.cgpa}
              onChange={handleAcademicInputChange}
              placeholder="8.5"
              type="number"
            />
            <Input
              id="btech_college"
              name="btech_college"
              value={aboutData.academicDetails.btech.college}
              onChange={handleAcademicInputChange}
              placeholder="XYZ College"
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
