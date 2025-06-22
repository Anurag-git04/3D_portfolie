import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Briefcase, GraduationCap, User, MessageCircle } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === section ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20"></div>
        <div className="relative z-10 text-center px-6">
          <div className="floating-card mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 mb-6">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User size={48} className="text-cyan-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Anurag Shaw
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Passionate about creating innovative web applications with modern technologies. 
            Specialized in React, Node.js, and creating exceptional user experiences.
          </p>
          <button
            onClick={() => scrollToSection('about')}
            className="btn-3d group"
          >
            Explore My Work
            <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="card-3d">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">My Journey</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with experience building 
                  scalable web applications. I love turning complex problems into simple, 
                  beautiful, and intuitive solutions.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  My expertise spans across modern JavaScript frameworks, backend technologies, 
                  and cloud platforms. I'm constantly learning and adapting to new technologies 
                  to stay at the forefront of web development.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="social-icon">
                    <Github size={20} />
                  </a>
                  <a href="#" className="social-icon">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="social-icon">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card-3d">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center mb-3">
                    <GraduationCap className="text-cyan-400 mr-3" size={24} />
                    <h4 className="text-xl font-semibold">Education</h4>
                  </div>
                  <p className="text-gray-300 mb-2">NeogCamp - Full Stack Development</p>
                  <p className="text-gray-400 text-sm">2025</p>
                  <p className="text-gray-300 mt-2 text-sm">
                    Comprehensive program covering React, Node.js, databases, and deployment strategies.
                  </p>
                </div>
              </div>
              
              <div className="card-3d">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-3">
                    <Briefcase className="text-purple-400 mr-3" size={24} />
                    <h4 className="text-xl font-semibold">Experience</h4>
                  </div>
                  <p className="text-gray-300 mb-2">Frontend Developer</p>
                  <p className="text-gray-400 text-sm mb-2">2024 - Present</p>
                  <p className="text-gray-300 text-sm">
                    Building responsive web applications with React, and modern CSS frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="skill-card">
              <div className="skill-icon">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Frontend</h3>
              <div className="space-y-3">
                {['React', 'JavaScript', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Backend</h3>
              <div className="space-y-3">
                {['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Tools</h3>
              <div className="space-y-3">
                {['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="project-card">
              <div className="project-image bg-gradient-to-br from-cyan-500 to-blue-600 h-48 rounded-t-xl flex items-center justify-center">
                <Code size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">E-Commerce Platform</h3>
                <p className="text-gray-300 mb-4">
                  Full-stack e-commerce solution built with React, Node.js, and MongoDB. 
                  Features include user authentication, payment integration, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'MongoDB', 'Stripe'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://ecommerce-frontend-green-nine.vercel.app/" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="#" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image bg-gradient-to-br from-purple-500 to-pink-600 h-48 rounded-t-xl flex items-center justify-center">
                <MessageCircle size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Task Management App</h3>
                <p className="text-gray-300 mb-4">
                  Collaborative task management application with real-time updates, 
                  drag-and-drop functionality, and team collaboration features.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Socket.io', 'Express', 'PostgreSQL'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://woekasana-frontend-ajkt.vercel.app/" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="#" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image bg-gradient-to-br from-green-500 to-teal-600 h-48 rounded-t-xl flex items-center justify-center">
                <Briefcase size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-green-400">Event Management or Meet up Application</h3>
                <p className="text-gray-300 mb-4">
                  Beautiful weather application with location-based forecasts, 
                  interactive maps, and detailed weather analytics.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'JavaScript', 'OpenWeather API', 'Charts.js'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://meetfrontend.vercel.app/" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="#" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image bg-gradient-to-br from-orange-500 to-red-600 h-48 rounded-t-xl flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-orange-400">Portfolio Website</h3>
                <p className="text-gray-300 mb-4">
                  This very portfolio you're viewing! Built with React, JavaScript, 
                  and Tailwind CSS featuring 3D animations and responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'JavaScript', 'Tailwind CSS', 'CSS3'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="#" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm always excited to work on new projects 
            and collaborate with creative minds.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="contact-card">
              <Mail className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">shawanurag155@email.com</p>
            </div>
            
            <div className="contact-card">
              <Phone className="text-green-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            
            <div className="contact-card">
              <MapPin className="text-purple-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Vadodara, India</p>
            </div>
          </div>
          
          <a
            href="mailto:john.developer@email.com"
            className="btn-3d inline-flex items-center"
          >
            <Mail size={20} className="mr-2" />
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 John Developer. Crafted with passion and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;