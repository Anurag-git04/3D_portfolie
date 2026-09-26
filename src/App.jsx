import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Briefcase, GraduationCap, User, MessageCircle, FileText, Menu, X, Download, Database, Brain, Cloud, Server } from 'lucide-react';
import ChatBot from './ChatBot';


// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) {
      const children = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      children.forEach((child) => observer.observe(child));
      // Also observe the container itself
      if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}


function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for scroll-reveal
  const aboutRef = useScrollReveal();
  const skillsRef = useScrollReveal();
  const experienceRef = useScrollReveal();
  const projectsRef = useScrollReveal();
  const contactRef = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  }, []);

  const navLinks = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Anurag
            </h1>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-cyan-400 ${activeSection === section ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                >
                  {section}
                </button>
              ))}
              <a
                href="https://drive.google.com/file/d/1aY9GBxv97CSD9WfAGL5dHzHIp633RWkG/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn inline-flex items-center gap-2"
              >
                <Download size={14} />
                Resume
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden relative z-50 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className="capitalize text-2xl font-semibold text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {section}
          </button>
        ))}
        <a
          href="https://drive.google.com/file/d/1xlyO11igSRP00fXNOI_Q6r2EeOy3U6En/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d mt-4"
        >
          <Download size={18} className="mr-2" />
          Download Resume
        </a>
      </div>

      {/* ─── Hero Section ─── */}
      <section id="home" className="min-h-screen flex pt-2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20"></div>
        <div className="relative z-10 text-center px-6">
          <div className="floating-card mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 mb-6">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User size={48} className="text-cyan-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent glow-text">
            Anurag Shaw
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto font-medium">
            Full Stack Developer + AI
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building scalable web applications and AI-driven automation with
            Next.js, React, FastAPI, LangChain &amp; cloud platforms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="btn-3d group"
            >
              Explore My Work
              <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="https://drive.google.com/file/d/1xlyO11igSRP00fXNOI_Q6r2EeOy3U6En/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-semibold border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 inline-flex items-center"
            >
              <FileText size={20} className="mr-2" />
              View Resume
            </a>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="py-20 px-6" ref={aboutRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent reveal">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="card-3d reveal-left">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">My Journey</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Full Stack Developer with hands-on experience building scalable web applications
                  and AI-driven automation using Next.js, React, Node.js, FastAPI, PostgreSQL,
                  and MongoDB.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Skilled in authentication, REST APIs, containerized and cloud deployments
                  (AWS, GCP), and applying LLM tooling such as LangChain to real product
                  workflows, including voice-bot and WhatsApp-bot automation.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/Anurag-git04" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/anuragshaw04/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:shawanurag155@gmail.com" className="social-icon" >
                    <Mail size={20} />
                  </a>
                  <a href="https://drive.google.com/file/d/1xlyO11igSRP00fXNOI_Q6r2EeOy3U6En/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FileText size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-3d reveal-right delay-100">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center mb-3">
                    <GraduationCap className="text-cyan-400 mr-3" size={24} />
                    <h4 className="text-xl font-semibold">Education</h4>
                  </div>
                  <p className="text-gray-300 mb-1 font-medium">Bachelor of Engineering in Computer Engineering</p>
                  <p className="text-gray-400 text-sm mb-1">Parul University</p>
                  <p className="text-gray-400 text-sm">12/2021 – 06/2025</p>
                </div>
              </div>

              <div className="card-3d reveal-right delay-200">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-3">
                    <Briefcase className="text-purple-400 mr-3" size={24} />
                    <h4 className="text-xl font-semibold">Current Role</h4>
                  </div>
                  <p className="text-gray-300 mb-1 font-medium">Full Stack Developer + AI</p>
                  <p className="text-gray-400 text-sm mb-2">Pelocal Fintech · Noida, India · 10/2025 – Present</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Building AI voice &amp; WhatsApp bots, call-report analytics dashboards,
                    and automated report services with Next.js, FastAPI, and GCP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience Section ─── */}
      <section id="experience" className="py-20 px-6 bg-gray-800/50" ref={experienceRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent reveal">
            Experience
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="reveal delay-100">
              <div className="relative pl-8 border-l-2 border-cyan-500/30">
                <div className="absolute -left-[7px] top-1">
                  <div className="timeline-dot"></div>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-cyan-400">Full Stack Developer + AI</h3>
                    <span className="text-sm text-gray-400 mt-1 sm:mt-0">10/2025 – Present</span>
                  </div>
                  <p className="text-gray-300 font-medium mb-4">Pelocal Fintech · Noida, India</p>
                  <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▹</span>
                      <span><strong>AI Voice &amp; WhatsApp Bots:</strong> Contributed to an AI-powered outbound voice agent and WhatsApp bot for automated customer/collections interactions, including prompt behavior design and transcript-driven debugging.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▹</span>
                      <span><strong>Call Report Analytics Dashboard:</strong> Built a full-stack Next.js application that ingests raw call-report data and produces visual analytics with multi-sheet Excel exports (MongoDB, ExcelJS, Recharts) and email-based sharing via Nodemailer.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▹</span>
                      <span><strong>Report Automation Service:</strong> Developed a FastAPI service using APScheduler to automatically fetch and email daily call reports on a fixed schedule.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▹</span>
                      <span><strong>Knowledge Base &amp; Storage:</strong> Built an internal Knowledge Base and implemented secure call-recording storage using GCP.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1 flex-shrink-0">▹</span>
                      <span><strong>Infrastructure:</strong> Used Docker for containerized services, Redis for caching, and deployed applications to AWS.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills Section ─── */}
      <section id="skills" className="py-20 px-6" ref={skillsRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent reveal">
            Skills &amp; Technologies
          </h2>

          {/* Row 1: 3 columns */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="skill-card reveal delay-100">
              <div className="skill-icon">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Frontend</h3>
              <div className="space-y-3">
                {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind', 'Bootstrap', 'Material UI', 'shadcn UI'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-card reveal delay-200">
              <div className="skill-icon-green">
                <Server size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Backend</h3>
              <div className="space-y-3">
                {['Node.js', 'Express.js', 'Next.js (API Routes)', 'FastAPI', 'Prisma', 'Zod', 'Postman', 'Cloudinary'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-card reveal delay-300">
              <div className="skill-icon-purple">
                <Database size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Database</h3>
              <div className="space-y-3">
                {['MongoDB', 'PostgreSQL', 'Redis'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: 2 columns centered */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="skill-card reveal delay-400">
              <div className="skill-icon-amber">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">AI / LLM Tooling</h3>
              <div className="space-y-3">
                {['LangChain', 'LangGraph (in progress)', 'LLM APIs', 'RAG Fundamentals'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-card reveal delay-500">
              <div className="skill-icon-rose">
                <Cloud size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-rose-400">Cloud &amp; DevOps</h3>
              <div className="space-y-3">
                {['AWS', 'Google Cloud Platform (GCP)', 'Docker', 'Git', 'GitHub'].map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects Section ─── */}
      <section id="projects" className="py-20 px-6 bg-gray-800/50" ref={projectsRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent reveal">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Memory Photo Album */}
            <div className="project-card reveal delay-100">
              <div className="project-image bg-gradient-to-br from-violet-500 to-fuchsia-600 h-48 rounded-t-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-violet-400">Memory Photo Album</h3>
                <p className="text-gray-300 mb-4">
                  Full-stack image-sharing web app "Picture" featuring secure Google authentication,
                  image upload, and responsive UI. Deployed on Vercel with optimized
                  frontend-backend integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'TypeScript', 'Material UI', 'Node.js', 'Express', 'MongoDB'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/Anurag-git04" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Daily Learning Notes */}
            <div className="project-card reveal delay-200">
              <div className="project-image bg-gradient-to-br from-emerald-500 to-teal-600 h-48 rounded-t-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-emerald-400">Daily Learning Notes</h3>
                <p className="text-gray-300 mb-4">
                  Next.js application enabling users to create, update, and manage personal
                  learning notes efficiently. Features secure Google Authentication with
                  user-specific data access and protected routes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'PostgreSQL', 'Google Auth', 'Prisma'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/Anurag-git04" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Workasana Backend */}
            <div className="project-card reveal delay-300">
              <div className="project-image bg-gradient-to-br from-cyan-500 to-blue-600 h-48 rounded-t-xl flex items-center justify-center">
                <MessageCircle size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">Workasana — Task &amp; Team Management</h3>
                <p className="text-gray-300 mb-4">
                  RESTful backend for a task/project management system with JWT authentication,
                  modular CRUD APIs for Projects, Teams, and Tasks, supporting multi-owner
                  assignments and status tracking with Chart.js visualizations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Node.js', 'Express', 'MongoDB', 'JWT', 'Chart.js'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://woekasana-frontend-ajkt.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="https://github.com/Anurag-git04/workasana_Frontend.git" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* E-Commerce Platform (kept from old) */}
            <div className="project-card reveal delay-400">
              <div className="project-image bg-gradient-to-br from-amber-500 to-orange-600 h-48 rounded-t-xl flex items-center justify-center">
                <Code size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">E-Commerce Platform</h3>
                <p className="text-gray-300 mb-4">
                  Full-stack e-commerce solution with user authentication, payment integration,
                  and admin dashboard. Built with React frontend and Node.js backend.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'MongoDB', 'Stripe'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://ecommerce-frontend-green-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="https://github.com/Anurag-git04/Ecommerce_Frontend.git" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Lead Management System (kept from old) */}
            <div className="project-card reveal delay-100">
              <div className="project-image bg-gradient-to-br from-rose-500 to-red-600 h-48 rounded-t-xl flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-rose-400">Lead Management System</h3>
                <p className="text-gray-300 mb-4">
                  Full-stack lead tracking system with detailed metadata, assigned team members,
                  and Chart.js visualizations displaying status-wise and time-based lead trends.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Tailwind CSS', 'Express', 'MongoDB', 'Chart.js'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://new-lead-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="https://github.com/Anurag-git04/New_Lead_Frontend" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Event Management (kept from old) */}
            <div className="project-card reveal delay-200">
              <div className="project-image bg-gradient-to-br from-green-500 to-teal-600 h-48 rounded-t-xl flex items-center justify-center">
                <Briefcase size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-green-400">Event Management App</h3>
                <p className="text-gray-300 mb-4">
                  Full-stack event management and meetup application for capturing, tracking,
                  and managing events efficiently with real-time data and charts.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Tailwind CSS', 'Express', 'MongoDB', 'Chart.js'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href="https://meetfrontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href="https://github.com/Anurag-git04/meetfrontend" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section id="contact" className="py-20 px-6" ref={contactRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent reveal">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto reveal delay-100">
            Ready to bring your ideas to life? I'm always excited to work on new projects
            and collaborate with creative minds.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="contact-card reveal delay-200">
              <Mail className="text-cyan-400 mb-4 mx-auto" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">shawanurag155@gmail.com</p>
            </div>

            <div className="contact-card reveal delay-300">
              <Phone className="text-green-400 mb-4 mx-auto" size={32} />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+91 9163525125</p>
            </div>

            <div className="contact-card reveal delay-400">
              <MapPin className="text-purple-400 mb-4 mx-auto" size={32} />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Noida, India</p>
            </div>
          </div>

          <a
            href="mailto:shawanurag155@gmail.com"
            className="btn-3d inline-flex items-center reveal delay-500"
          >
            <Mail size={20} className="mr-2" />
            Get In Touch
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Anurag Shaw. Crafted with passion and modern web technologies.
          </p>
        </div>
      </footer>

      {/* ─── AI Chatbot Widget ─── */}
      <ChatBot />
    </div>
  );
}

export default App;