
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
        <Card className="bg-gradient-to-br from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Admin Dashboard</CardTitle>
            <Button onClick={handleSignOut} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Sign Out
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-300">Logged in as: {user?.email}</p>
            </div>
            <Separator className="my-4 bg-white/20" />
            
            <Tabs defaultValue="hero">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-6 bg-white/10 border border-white/10">
                <TabsTrigger value="hero" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Hero</TabsTrigger>
                <TabsTrigger value="about" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">About</TabsTrigger>
                <TabsTrigger value="experience" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Experience</TabsTrigger>
                <TabsTrigger value="projects" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Projects</TabsTrigger>
                <TabsTrigger value="skills" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Skills</TabsTrigger>
                <TabsTrigger value="certificates" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Certificates</TabsTrigger>
                <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:text-violet-400 data-[state=active]:bg-violet-400/10">Achievements</TabsTrigger>
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
