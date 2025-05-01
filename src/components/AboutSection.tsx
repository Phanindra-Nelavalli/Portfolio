
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutSection = () => {
  return (
    <section id="about" className="bg-nero-dark section">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden bg-gradient-to-r from-nero-accent/20 to-nero-accent-hover/20 p-1">
                <Avatar className="w-full h-full">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/157562857?v=4" alt="Phanindra" className="object-cover" />
                  <AvatarFallback className="bg-gray-800 text-xl">NP</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-nero-dark px-4 py-2 rounded-full">
                <span className="text-white">CGPA: 9.42</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <p className="text-xl text-gray-300 mb-6">
              I'm an enthusiastic Computer Science Engineering student with a solid understanding of software development,
              web, and mobile application development. My passion lies in exploring new technologies, especially
              Machine Learning (ML) and Artificial Intelligence (AI).
            </p>
            
            <p className="text-xl text-gray-300 mb-8">
              I'm constantly looking for opportunities to apply my skills in projects that contribute to technological 
              progress and solve real-world problems. With a balance of technical expertise and a creative approach to 
              problem-solving, I aim to build solutions that make a meaningful impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-400">B.Tech in Computer Science</p>
                <p className="text-gray-400">Vishnu Institute of Technology</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-400">Guntur, India</p>
                <p className="text-gray-400">Open to remote opportunities</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Interests</h3>
                <p className="text-gray-400">AI, ML, Mobile Development</p>
                <p className="text-gray-400">Web Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
