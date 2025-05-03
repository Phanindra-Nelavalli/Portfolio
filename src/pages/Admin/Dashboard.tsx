
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import AdminAboutForm from "@/components/Admin/AdminAboutForm";
import AdminExperienceForm from "@/components/Admin/AdminExperienceForm";
import AdminProjectsForm from "@/components/Admin/AdminProjectsForm";
import AdminSkillsForm from "@/components/Admin/AdminSkillsForm";
import AdminCertificatesForm from "@/components/Admin/AdminCertificatesForm";
import AdminAchievementsForm from "@/components/Admin/AdminAchievementsForm";
import AdminHeroForm from "@/components/Admin/AdminHeroForm";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import "@/styles/admin.css"; // Updated import path to use the @ alias

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-900 p-4 md:p-8">
        <Card className="shadow-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-gray-800">Portfolio Admin Dashboard</CardTitle>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <p className="text-gray-600">Logged in as: {user?.email}</p>
            </div>
            <Separator className="my-4" />
            
            <Tabs defaultValue="hero">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-6 bg-gray-50">
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hero">
                <AdminHeroForm />
              </TabsContent>
              
              <TabsContent value="about">
                <AdminAboutForm />
              </TabsContent>
              
              <TabsContent value="experience">
                <AdminExperienceForm />
              </TabsContent>
              
              <TabsContent value="projects">
                <AdminProjectsForm />
              </TabsContent>
              
              <TabsContent value="skills">
                <AdminSkillsForm />
              </TabsContent>
              
              <TabsContent value="certificates">
                <AdminCertificatesForm />
              </TabsContent>
              
              <TabsContent value="achievements">
                <AdminAchievementsForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PortfolioProvider>
  );
};

export default AdminDashboard;
