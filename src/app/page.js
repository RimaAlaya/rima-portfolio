"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// UPDATED: Removed unused icons, kept the ones for skills/nav
import { Menu, X, Github, Linkedin, Mail, Code, Brain, Cpu, ChevronDown, ExternalLink, Play, Sparkles, MessageSquare, Send } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [typedText, setTypedText] = useState('');
  // UPDATED: Changed this to track the index for the new tabbed timeline
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(4);
  const heroRef = useRef(null);

  const fullText = "I turn complex AI challenges into elegant, reliable solutions.";

  useEffect(() => {
    let i = 0;
    const words = fullText.split(' ');
    let currentText = '';
    const timer = setInterval(() => {
      if (i < words.length) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        setTypedText(currentText);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const projects = [
    {
      id: 'pitstop',
      title: 'PitStop - Multilingual AI Assistant',
      short: 'Translates vehicle diagnostic codes into clear reports (FR/EN/AR). Reduced diagnostic time by 60%.',
      tech: ['Python', 'GPT API', 'FastAPI', 'Docker'],
      metrics: [
        { label: 'Faster diagnostics', value: '60%' },
        { label: 'F1 score', value: '95.9%' }
      ],
      problem: 'Technicians struggled to interpret DTC codes; slow diagnostics.',
      solution: 'Built a multilingual assistant using GPT API with rule-based augmentation.',
      icon: '🚗',
      // REMOVED: demo: true
    },
    {
      id: 'cinerag',
      title: 'CineRAG - Intelligent Film Recommendation',
      short: 'RAG-based recommendation system for personalized movie suggestions.',
      tech: ['Python', 'LangChain', 'RAG', 'FastAPI'],
      metrics: [
        { label: 'Accuracy', value: '92%' },
        { label: 'User satisfaction', value: '4.7/5' }
      ],
      problem: 'Generic recommendations lack personalization and context.',
      solution: 'Implemented RAG pipeline with vector DB for contextual recommendations.',
      icon: '🎬',
      // REMOVED: demo: true
    },
    {
      id: 'brain-tumor',
      title: 'Brain Tumor Detection Pipeline',
      short: 'End-to-end MLOps pipeline for CNN-based tumor detection with CI/CD.',
      tech: ['PyTorch', 'Docker', 'MLflow', 'CI/CD'],
      metrics: [
        { label: 'Detection accuracy', value: '96.2%' },
        { label: 'Inference time', value: '<100ms' }
      ],
      problem: 'Manual tumor detection is time-consuming and error-prone.',
      solution: 'Built automated pipeline with CNN and complete MLOps workflow.',
      icon: '🧠',
      demo: false
    },
    // UPDATED: FastAPI project details
    {
      id: 'fastapi-project',
      title: 'End-to-End ML Deployment Pipeline',
      short: 'Full-stack ML project deploying a model that surpassed existing results. Includes CI/CD and monitoring.',
      tech: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'CI/CD'],
      metrics: [
        { label: 'Performance', value: 'Exceeded Baseline' },
        { label: 'Test Coverage', value: '95%' }
      ],
      problem: 'Deploying and managing a high-performance ML model in a scalable, production-ready environment.',
      solution: 'Built a complete end-to-end pipeline with FastAPI, Docker, and CI/CD for automated training, deployment, and monitoring.',
      icon: '🚀',
      demo: false
    }
  ];

  const certifications = [
    { name: 'Oracle Cloud Infrastructure 2025 Generative AI Professional', year: 2025, icon: '☁️' },
    { name: 'AWS Educate Machine Learning Foundations', year: 2025, icon: '🎓' }
  ];

  const associations = [
    {
      name: 'IEEE Student Branch',
      role: 'Active Member',
      description: 'Participated in AI/ML workshops and technical seminars',
      icon: '🤝'
    },
    {
      name: 'Tech Community Mentor',
      role: 'Volunteer Mentor',
      description: 'Mentoring students in AI and embedded systems projects',
      icon: '👥'
    }
  ];

  // UPDATED: Restored the full, detailed timeline data
  const timeline = [
    {
      year: '2020 - 2022',
      title: 'Preparatory Cycle (Physics & Chemistry)',
      detail: 'Laid the intensive theoretical foundation in mathematics, physics, and chemistry, building the analytical problem-solving skills essential for engineering.',
      icon: "🎓"
    },
    {
      year: 'JUNE 2023 - AUG 2023',
      title: 'Microservices Dev Intern, UPTECH',
      detail: 'Developed and tested Java/Spring Boot microservices, getting my first hands-on experience with REST architecture in a professional environment.',
      icon: "💼"
    },
    {
      year: '2022 - 2025',
      title: 'Engineering Diploma (ENICarthage)',
      detail: 'Specialized in Infotronic Systems, diving deep into embedded systems and AI. Graduated with *Excellent* distinction.',
      icon: "🎓"
    },
    {
      year: 'JUNE 2024 - AUG 2024',
      title: 'DevOps CI/CD Intern, UPTECH',
      detail: 'Implemented automated CI/CD pipelines (GitLab), orchestrated multi-service apps using Docker, K3s, and Helm.',
      icon: "💼",
      lesson: "Automation isn't just a time-saver; it's the key to reliable and scalable systems. This is where my love for MLOps truly clicked."
    },
    {
      year: 'FEB 2025 - JUNE 2025',
      title: 'Final Year Project (XELERO): PitStop',
      detail: 'My graduation capstone, evolving from a concept to a full-fledged AI solution.',
      icon: "⭐",
      problem: 'Technicians struggled to interpret DTC codes; slow diagnostics.',
      approach: 'Built a multilingual assistant (FR/EN/AR) using GPT API with rule-based augmentation; deployed via FastAPI microservice.',
      result: 'Reduced diagnostic time by 60%; improved client communication.',
      lesson: 'Combine LLMs with deterministic rules for reliable outputs in production. A "witty" bot is fun, but a "reliable" one is essential.'
    }
  ];

  // NEW: Data structure for the new skills section
  const skillsData = [
    {
      category: "Programming",
      description: "The backbone of my solutions.",
      icon: <Code className="w-8 h-8 text-[#FF9F9F]" />,
      skills: ['Python (Advanced)', 'Java', 'C/C++', 'VHDL']
    },
    {
      category: "AI / ML",
      description: "Where models come to life.",
      icon: <Brain className="w-8 h-8 text-[#FF9F9F]" />,
      skills: ['PyTorch', 'TensorFlow / Keras', 'Scikit-learn / XGBoost', 'CNN / TCN / LSTM']
    },
    {
      category: "MLOps & Deployment",
      description: "From research to production.",
      icon: <Cpu className="w-8 h-8 text-[#FF9F9F]" />,
      skills: ['Docker', 'CI/CD (GitLab, GitHub)', 'FastAPI', 'MLflow']
    },
    {
      category: "LLM / NLP",
      description: "Making language models useful.",
      icon: <Sparkles className="w-8 h-8 text-[#FF9F9F]" />,
      skills: ['RAG', 'LangChain', 'GPT APIs', 'Vector DBs']
    }
  ];


  // Set default journey item on initial load
  useEffect(() => {
    // This effect is no longer needed for the new journey timeline
  }, []);

  const handleChat = () => {
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let response = "I'd love to tell you more! ";

      if (chatInput.toLowerCase().includes('pitstop')) {
        response += "PitStop is my multilingual AI assistant that translates vehicle diagnostic codes. Want to see a demo? Click on the PitStop project card!";
      } else if (chatInput.toLowerCase().includes('project')) {
        response += "I've built some cool stuff! Check out PitStop for automotive AI, CineRAG for movie recommendations, and my Brain Tumor Detection pipeline. Which interests you?";
      } else if (chatInput.toLowerCase().includes('contact') || chatInput.toLowerCase().includes('hire')) {
        response += "I'm always open to interesting opportunities! Scroll to the contact section or email me at rimaalaya76@gmail.com. Let's build something amazing together!";
      } else if (chatInput.toLowerCase().includes('skills') || chatInput.toLowerCase().includes('tech')) {
        response += "I specialize in Python, PyTorch, LLMs, and MLOps. I also love working with embedded systems (STM32, Raspberry Pi). Check the Skills section to see everything!";
      } else {
        response += "I'm Rima's AI assistant! Ask me about her projects, skills, or how to get in touch. I'm here to help you navigate!";
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 800);

    setChatInput('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF5E4] to-[#F6D6C8] text-[#3C3C3C] font-sans">
      {/* Floating Header */}
      <header className="fixed top-0 w-full z-50 bg-[#FFFDF9]/80 backdrop-blur-md border-b border-[#E7AFAE]/20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] bg-clip-text text-transparent cursor-pointer hover:scale-105 transition"
               onClick={() => scrollToSection('hero')}>
            RA
          </div>

          {/* UPDATED: Correct Nav Order */}
          <nav className="hidden md:flex gap-8 items-center">
            {['About', 'Journey', 'Work', 'Skills', 'Certifications', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#3C3C3C] hover:text-[#FF9F9F] transition font-medium"
              >
                {item}
              </button>
            ))}
            <a href="https://github.com/RimaAlaya" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#FF9F9F] transition">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/rima-alaya" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#FF9F9F] transition">
              <Linkedin size={20} />
            </a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFDF9] border-t border-[#E7AFAE]/20 p-6">
            {/* UPDATED: Correct Nav Order */}
            {['About', 'Journey', 'Work', 'Skills', 'Certifications', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 hover:text-[#FF9F9F] transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      {/* UPDATED: Changed padding to fix "empty space" */}
      <section id="hero" ref={heroRef} className="flex items-center pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Hi, I'm Rima.
              <br />
              <span className="bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] bg-clip-text text-transparent">
                {typedText}
              </span>
            </h1>

            <p className="text-xl text-[#3C3C3C]/80">
              {/* UPDATED: Subtitle */}
              AI Engineer | MLOps Enthusiast | Problem Solver
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection('work')}
                className="px-8 py-3 bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all font-medium"
              >
                See My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-white border-2 border-[#FF9F9F] text-[#FF9F9F] rounded-xl hover:bg-[#FF9F9F] hover:text-white transition-all font-medium"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-[#FFBCBC] to-[#F6D6C8] rounded-full animate-pulse opacity-50 absolute blur-3xl"></div>
              {/* UPDATED: Reverted to original illustration with "symmetric" circle frame */}
              <div className="relative z-10 cursor-pointer transition-transform hover:scale-105"
                   onClick={() => setChatOpen(true)}>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden">
                  <img
                    src="/Gemini_Generated_Image_zem41fzem41fzem4-removebg-preview (1).png"
                    alt="Illustration of Rima Alaya"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* UPDATED: Brought back the original bot chat bubble */}
                <div className="absolute -bottom-4 right-0 bg-white rounded-full p-3 shadow-lg">
                  <div className="text-center px-2">
                    <div className="text-sm font-medium text-[#FF9F9F]">RimaBot</div>
                    <div className="text-xs text-[#3C3C3C]/60">Click to chat!</div>
                  </div>
                </div>
              </div>
              {/* Moved sparkle icon to be relative to the new avatar */}
              <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <Sparkles className="text-[#FF9F9F]" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "About" is now first, matching the nav */}
      <section id="about" className="py-24 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 font-serif">About Me</h2>
          <p className="text-xl text-[#3C3C3C]/80 leading-relaxed">
            I’m Rima, an AI engineer obsessed with turning data into actionable intelligence.
            I thrive on challenges that push me to innovate. I combine creativity with meticulous execution,
            experimenting fearlessly while delivering scalable solutions.
            Sometimes I even make AI a little witty.
          </p>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "Journey" is now second, matching the nav */}
      {/* COMPLETELY REBUILT "My Journey" section - NEW INTERACTIVE TABS */}
      <section id="journey" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center font-serif">My Journey</h2>

          {/* Horizontal Tab Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {timeline.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedJourneyIndex(idx)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
                  ${selectedJourneyIndex === idx 
                    ? 'bg-[#FF9F9F] text-white shadow-lg' 
                    : 'bg-white text-[#3C3C3C]/80 hover:bg-[#FFF5E4]'
                  }
                `}
              >
                {item.title.split('(')[0].split(',')[0]} {/* Gets clean title like "Preparatory Cycle" */}
              </button>
            ))}
          </div>

          {/* Selected Journey Item Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedJourneyIndex} // This makes AnimatePresence work
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-[#FF9F9F]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium text-[#FF9F9F] mb-2 block">{timeline[selectedJourneyIndex].year}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#3C3C3C]">{timeline[selectedJourneyIndex].title}</h3>
              <p className="text-lg text-[#3C3C3C]/80 mb-6">{timeline[selectedJourneyIndex].detail}</p>

              {/* Render the rich details */}
              <div className="space-y-4">
                {timeline[selectedJourneyIndex].problem && (
                  <div>
                    <h4 className="font-semibold text-lg text-[#3C3C3C]">Problem</h4>
                    <p className="text-[#3C3C3C]/70">{timeline[selectedJourneyIndex].problem}</p>
                  </div>
                )}
                {timeline[selectedJourneyIndex].approach && (
                  <div>
                    <h4 className="font-semibold text-lg text-[#3C3C3C]">Approach</h4>
                    <p className="text-[#3C3C3C]/70">{timeline[selectedJourneyIndex].approach}</p>
                  </div>
                )}
                {timeline[selectedJourneyIndex].result && (
                  <div>
                    <h4 className="font-semibold text-lg text-[#3C3C3C]">Result</h4>
                    <p className="text-[#3C3C3C]/70">{timeline[selectedJourneyIndex].result}</p>
                  </div>
                )}
                {timeline[selectedJourneyIndex].lesson && (
                  <div className="bg-gradient-to-br from-[#FFBCBC]/10 to-[#F6D6C8]/10 p-4 rounded-lg border-l-4 border-[#FF9F9F]">
                    <h4 className="font-semibold text-lg text-[#FF9F9F]">Key Lesson</h4>
                    <p className="text-[#3C3C3C]/80 italic">"{timeline[selectedJourneyIndex].lesson}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "Work" (Projects) is now third, matching the nav */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center font-serif">Featured Projects</h2>
          <p className="text-center text-[#3C3C3C]/70 mb-16 text-lg">
            Building solutions that matter, one project at a time
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border-2 border-transparent hover:border-[#FF9F9F]/30"
                onClick={() => setSelectedProject(project)}
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-[#3C3C3C]/70 mb-4 text-sm">{project.short}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-[#FFF5E4] text-[#FF9F9F] rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gradient-to-br from-[#FFBCBC]/20 to-[#F6D6C8]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#FF9F9F]">{metric.value}</div>
                      <div className="text-xs text-[#3C3C3C]/70">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] text-white rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                  See Details
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "Skills" is now fourth, matching the nav */}
      <section id="skills" className="py-24 px-6 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center font-serif">Skills & Tools</h2>

          {/* New 4-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsData.map((category) => (
              <motion.div
                key={category.category}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
                whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-[#FFF5E4] rounded-full flex items-center justify-center mb-4">
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{category.category}</h3>

                {/* Description */}
                <p className="text-[#3C3C3C]/70 mb-6 text-sm flex-grow">{category.description}</p>

                {/* Skill List */}
                <ul className="space-y-3 text-lg text-[#3C3C3C]">
                  {category.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={{ color: '#FF9F9F' }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "Certifications" is now fifth, matching the nav */}
      <section id="certifications" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center font-serif">Certifications & Achievements</h2>
          <p className="text-center text-[#3C3C3C]/70 mb-16">Continuously learning and growing</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-[#FF9F9F]/20">
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                <div className="text-[#FF9F9F] font-medium">{cert.year}</div>
              </div>
            ))}
          </div>

          <h3 className="text-3xl font-bold mb-8 text-center font-serif">Community & Leadership</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {associations.map((assoc, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-[#FFF5E4] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-5xl mb-4">{assoc.icon}</div>
                <h3 className="font-bold text-xl mb-2">{assoc.name}</h3>
                <div className="text-[#FF9F9F] font-medium mb-3">{assoc.role}</div>
                <p className="text-[#3C3C3C]/70">{assoc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION RE-ORDERED: "Contact" is now last, matching the nav */}
      <section id="contact" className="py-24 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif">Let's Build Something Amazing</h2>
          <p className="text-xl text-[#3C3C3C]/70 mb-12">
            I reply fast—sometimes faster than my models 😊
          </p>

          <div className="bg-white rounded-xl shadow-2xl p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your name here"
                className="w-full p-4 border-2 border-[#E7AFAE]/30 rounded-lg focus:border-[#FF9F9F] focus:outline-none transition"
              />
              <input
                type="email"
                placeholder="Where can I reach you?"
                className="w-full p-4 border-2 border-[#E7AFAE]/30 rounded-lg focus:border-[#FF9F9F] focus:outline-none transition"
              />
              <input
                type="text"
                placeholder="Subject (optional)"
                className="w-full p-4 border-2 border-[#E7AFAE]/30 rounded-lg focus:border-[#FF9F9F] focus:outline-none transition"
              />
              <textarea
                rows="5"
                placeholder="Tell me about your project, idea, or challenge..."
                className="w-full p-4 border-2 border-[#E7AFAE]/30 rounded-lg focus:border-[#FF9F9F] focus:outline-none transition resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] text-white rounded-lg hover:shadow-xl transition-all font-medium text-lg hover:scale-105"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#E7AFAE]/30">
              <div className="flex justify-center gap-8 flex-wrap">
                <a href="mailto:rimaalaya76@gmail.com" className="flex items-center gap-2 text-[#FF9F9F] hover:scale-110 transition">
                  <Mail size={20} />
                  <span>rimaalaya76@gmail.com</span>
                </a>
                <a href="https://github.com/RimaAlaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF9F9F] hover:scale-110 transition">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/rima-alaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF9F9F] hover:scale-110 transition">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* UPDATED: Changed footer color to the dark text color from the guide */}
      <footer className="py-8 px-6 bg-[#3C3C3C] text-white/80 text-center">
        <p className="mb-2">© 2025 Rima Alaya | Tunis, Tunisia</p>
        <p className="text-sm italic">Smart solutions, a dash of creativity.</p>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} />
            </button>

            <div className="text-6xl mb-4">{selectedProject.icon}</div>
            <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map(tech => (
                <span key={tech} className="px-4 py-2 bg-[#FFF5E4] text-[#FF9F9F] rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {selectedProject.metrics.map((metric, idx) => (
                <div key={idx} className="text-center p-6 bg-gradient-to-br from-[#FFBCBC]/20 to-[#F6D6C8]/20 rounded-xl">
                  <div className="text-4xl font-bold text-[#FF9F9F] mb-2">{metric.value}</div>
                  <div className="text-sm text-[#3C3C3C]/70">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#FF9F9F]">Problem</h3>
                <p className="text-[#3C3C3C]/80">{selectedProject.problem}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-[#FF9F9F]">Solution</h3>
                <p className="text-[#3C3C3C]/80">{selectedProject.solution}</p>
              </div>

              {/* REMOVED: Interactive Demo Section */}

              <div className="flex gap-4">
                <a
                  href={`https://github.com/RimaAlaya/${selectedProject.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#2B1C1C] text-white rounded-lg hover:bg-[#3C3C3C] transition text-center flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RimaBot Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100%-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-[#FF9F9F]">
          {/* UPDATED: Reverted chat header to gradient and emoji */}
          <div className="bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🤖</div>
              <div>
                <div className="font-bold text-white">RimaBot</div>
                <div className="text-xs text-white/80">AI Assistant</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1 transition">
              <X size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3">
            <div className="bg-gradient-to-br from-[#FFBCBC]/20 to-[#F6D6C8]/20 p-3 rounded-lg mr-8">
              <p className="text-sm">
                Hi! I'm RimaBot 👋 Want to know about Rima's projects, skills, or get in touch? Just ask!
              </p>
            </div>

            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-[#FF9F9F] text-white ml-8'
                    : 'bg-gradient-to-br from-[#FFBCBC]/20 to-[#F6D6C8]/20 mr-8'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#E7AFAE]/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border-2 border-[#E7AFAE]/30 rounded-lg focus:border-[#FF9F9F] focus:outline-none text-sm"
              />
              <button
                onClick={handleChat}
                // UPDATED: Reverted send button to gradient
                className="p-2 bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] text-white rounded-lg hover:shadow-lg transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating RimaBot Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          // UPDATED: Reverted floating button to gradient and MessageSquare icon
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#FF9F9F] to-[#F8D49D] text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
        >
          <MessageSquare size={28} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
}