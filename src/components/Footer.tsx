import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SkeletonBox = ({ width, height }: { width: string; height: string }) => (
  <div
    className="bg-gray-700/30 rounded-md animate-pulse"
    style={{ width, height }}
  />
);

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulated loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-nero-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            {loading ? (
              <>
                <SkeletonBox width="150px" height="28px" />
                <SkeletonBox width="240px" height="16px" />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  PHANINDRA<span className="text-nero-accent">.</span>
                </h2>
                <p className="text-gray-400 mt-2">
                  Building real-world tech for real-world impact.
                </p>
              </>
            )}
          </div>

          <div className="flex space-x-6">
            {loading ? (
              <>
                <SkeletonBox width="24px" height="24px" />
                <SkeletonBox width="24px" height="24px" />
                <SkeletonBox width="24px" height="24px" />
              </>
            ) : (
              <>
                <a
                  href="https://github.com/Phanindra-Nelavalli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="social-icon" />
                </a>
                <a
                  href="https://linkedin.com/in/Nelavalli-Phanindra"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="social-icon" />
                </a>
                <a
                  href="mailto:nelavalliphanindra4@gmail.com"
                  aria-label="Email Me"
                >
                  <Mail className="social-icon" />
                </a>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          {loading ? (
            <SkeletonBox width="280px" height="16px" />
          ) : (
            <>© {new Date().getFullYear()} Nelavalli Phanindra. All rights reserved.</>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
