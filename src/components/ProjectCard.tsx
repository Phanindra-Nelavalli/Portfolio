
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

const ProjectCard = ({ title, subtitle, description, technologies, imageUrl }: ProjectCardProps) => {
  return (
    <div className="project-card py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">{title}</h3>
            <p className="text-xl text-nero-accent mb-4">{subtitle}</p>
            <p className="text-gray-400 mb-6 text-lg">{description}</p>
            
            <div className="mb-6">
              <h4 className="text-sm uppercase text-gray-500 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm bg-white/10 rounded-full text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="flex items-center text-nero-accent hover:text-nero-accent-hover transition-colors">
              <span className="mr-2 font-medium">See more</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-md aspect-video bg-gray-900">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
