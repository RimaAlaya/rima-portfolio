"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import {
  Menu, X, Github, Linkedin, Mail,
  Code, Brain, Cpu, ChevronDown, ExternalLink,
  Play, Sparkles, MessageSquare, Send, Link as LinkIcon,
  Terminal, Database, Globe, Server, Zap, Layers, Activity, FileText,
  ShieldCheck, MessageCircle, MousePointer2
} from 'lucide-react';

// --- CUSTOM COMPONENTS ---

// 1. UPDATED: Magical "Halo" Cursor (Smoother, fits the theme)
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      // Check if hovering over clickable elements
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      );
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] hidden md:block overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-[#FF7F50] bg-[#FF7F50]/10 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 10),
          y: mousePosition.y - (isHovering ? 24 : 10),
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }}
      />
      {/* Tiny dot in the center for precision */}
      <motion.div
         className="fixed top-0 left-0 bg-[#FF7F50] rounded-full w-2 h-2"
         animate={{ x: mousePosition.x - 1, y: mousePosition.y - 1 }}
         transition={{ duration: 0 }}
      />
    </div>
  );
};

// 2. Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF7F50] via-[#FFD700] to-[#EED9B6] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

// 3. UPDATED: Holographic 3D Tilt Card
const TiltCard = ({ children, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // Holographic glare effect
  const glareX = useTransform(x, [-100, 100], [0, 100]);
  const glareY = useTransform(y, [-100, 100], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="h-full relative group"
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-500"
        style={{
            background: `radial-gradient(circle at ${50 + glareX.get()}% ${50 + glareY.get()}%, rgba(255,255,255,0.4), transparent)`,
            mixBlendMode: 'overlay'
        }}
      />
      {children}
    </motion.div>
  );
};

// Helper for the Docker icon
const BoxIcon = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);

// --- NEW COMPONENT: Neural Network Particle Background ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 80; // Adjust for density

    // Mouse interaction
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      // Draw individual particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#FF7F50'; // Your Orange Color
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }

      // Update particle position
      update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Collision detection with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2; // Move away to the right
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2; // Move away to the left
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    // Create particle array
    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2; // Speed
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#FF7F50';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    // Draw lines between close particles
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/10000); // Fade out as they get further
                    ctx.strokeStyle = `rgba(255, 127, 80, ${opacityValue * 0.2})`; // Light Orange lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40" />;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // --- CHATBOT STATE ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Context to remember what we just talked about
  const [chatContext, setChatContext] = useState(null); // 'skills', 'projects', 'intro'

  // Typing effect state
  const [typedText, setTypedText] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(4);
  const heroRef = useRef(null);
  const chatBottomRef = useRef(null);

  // UPDATED: Dynamic Hero Text
  const textOptions = [
    "I turn complex AI challenges into elegant solutions.",
    "I bridge the gap between AI and Production.",
    "Creative. Ambitious. A bomb of energy.",
    "Making code smarter, one neuron at a time."
  ];

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentFullText = textOptions[textIndex];

      if (isDeleting) {
        setTypedText(currentFullText.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentFullText.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentFullText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textOptions.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen, isTyping]);

  const projects = [
    {
      id: 'FastAPIProject',
      title: 'Multi-Model AI Inference Engine',
      short: 'High-performance API hosting 3 advanced models (XGBoost, TCN, Autoencoders). Secured, Dockerized, and deployed on Linux.',
      tech: ['XGBoost', 'TCN', 'Autoencoders', 'FastAPI', 'Docker', 'Linux', 'Security'],
      metrics: [
        { label: 'Driving Style Acc.', value: '98.7%', color: 'text-emerald-600' },
        { label: 'F1 Score', value: '95.9%', color: 'text-blue-600' }
      ],
      problem: 'Deploying multiple complex deep learning models simultaneously with low latency and high security standards.',
      solution: 'Architected a robust FastAPI backend serving XGBoost, TCN, and Autoencoders. Implemented strict security protocols, Docker containerization, and production deployment on Linux.',
      icon: '⚡',
      demo: false
    },
    {
      id: 'PitStopp',
      title: 'PitStop: Intelligent Automotive Bot',
      short: 'Real-time AI assistant using GPT API & Prompt Engineering. Features Server-Sent Events (SSE) for streaming responses.',
      tech: ['GPT API', 'Prompt Eng.', 'FastAPI', 'SSE', 'JS/HTML/CSS', 'Docker', 'Linux'],
      metrics: [
        { label: 'Response Type', value: 'Real-time Stream', color: 'text-emerald-600' },
        { label: 'Deployment', value: 'Linux/Docker', color: 'text-blue-600' }
      ],
      problem: 'Drivers need instant, conversational explanations for complex vehicle issues, not just static error codes.',
      solution: 'Built a secure, containerized AI bot with GPT-4. Utilized advanced Prompt Engineering for accuracy and SSE (Server-Sent Events) for a seamless real-time chat experience.',
      icon: '🤖',
      demo: false
    },
    {
      id: 'brain-tumor',
      title: 'Brain Tumor Detection Pipeline',
      short: 'End-to-end MLOps pipeline for CNN-based tumor detection with CI/CD.',
      tech: ['PyTorch', 'Docker', 'MLflow', 'CI/CD'],
      metrics: [
        { label: 'Detection accuracy', value: '96.2%', color: 'text-emerald-600' },
        { label: 'Inference time', value: '<100ms', color: 'text-blue-600' }
      ],
      problem: 'Manual tumor detection is time-consuming and error-prone.',
      solution: 'Built automated pipeline with CNN and complete MLOps workflow.',
      icon: '🧠',
      demo: false
    },
    {
      id: 'cinerag',
      title: 'CineRAG - Intelligent Film Recommendation',
      short: 'RAG-based recommendation system for personalized movie suggestions.',
      tech: ['Python', 'LangChain', 'RAG', 'FastAPI'],
      metrics: [
        { label: 'Accuracy', value: '92%', color: 'text-emerald-600' },
        { label: 'User satisfaction', value: '4.7/5', color: 'text-blue-600' }
      ],
      problem: 'Generic recommendations lack personalization and context.',
      solution: 'Implemented RAG pipeline with vector DB for contextual recommendations.',
      icon: '🎬',
    }
  ];

  const certifications = [
    {
      name: 'Oracle Cloud Infrastructure 2025 Generative AI Professional',
      issuer: 'Oracle',
      image: '/oracle.png',
      url: 'https://www.credly.com/badges/bb6132af-4c15-4053-92e7-ab0465835192'
    },

    {
      name: 'AWS Educate Machine Learning Foundations',
      issuer: 'AWS',
      image: '/aws1.png',
      url: 'https://www.credly.com/users/rima-alaya/badges#other'
    },
    {
      name: 'AWS Educate Introduction to Cloud 101',
      issuer: 'AWS',
      image: '/aws.png',
      url: 'https://www.credly.com/badges/35f7d9ea-9540-4c4e-8442-d5e2d6d0b1ae'
    },
  ];

  const associations = [
    {
      name: 'ENICarthage ROBOTS 7.0',
      role: 'Organizing Committee Member',
      description: 'Contributed to the planning and execution of the 7th edition of this international robotics competition, ensuring a seamless experience for participants.',
      image: '/robot.jpg'
    },
    {
      name: 'Forum Entreprises Enicarthage',
      role: 'Logistics Committee Member',
      description: 'Managed on-site operations and logistical coordination for the 2023 forum, facilitating engagement between students and industry partners.',
      image: '/forum.jpg'
    }
  ];

  const timeline = [
    {
      year: '2020 - 2022',
      title: 'Preparatory Cycle (Physics & Chemistry)',
      detail: 'Laid the intensive theoretical foundation in mathematics, physics, and chemistry.',
      icon: "🎓",
      problem: "Building a mental framework for solving complex, abstract engineering problems under pressure.",
      approach: "Mastered advanced calculus and physics through rigorous daily practice and analytical reasoning.",
      result: "Ranked in top percentile, qualifying for top engineering schools.",
      lesson: "Engineering isn't just about math; it's about resilience and structured thinking.",
      lessonColor: "border-blue-400 text-blue-600"
    },
    {
      year: '2022 - 2025',
      title: 'Engineering Diploma (ENICarthage)',
      detail: 'Specialized in Infotronic Systems, diving deep into embedded systems and AI. Graduated with *Excellent* distinction.',
      icon: "🎓",
      problem: "Bridging the gap between hardware constraints and software intelligence.",
      approach: "Combined embedded systems design (VHDL, C++) with modern AI techniques.",
      result: "Developed a deep understanding of edge computing and efficient model deployment.",
      lesson: "Knowing the hardware limits makes you a better software architect.",
      lessonColor: "border-purple-400 text-purple-600"
    },
    {
      year: 'JUNE 2023 - AUG 2023',
      title: 'Microservices Dev Intern, UPTECH',
      detail: 'Developed and tested Java/Spring Boot microservices.',
      icon: "💼",
      problem: "Monolithic architectures were hard to scale and maintain.",
      approach: "Designed and implemented modular microservices using Java Spring Boot.",
      result: "Improved system modularity and testing efficiency.",
      lesson: "Clean architecture is the difference between a prototype and a product.",
      lessonColor: "border-teal-400 text-teal-600"
    },
    {
      year: 'JUNE 2024 - AUG 2024',
      title: 'DevOps CI/CD Intern, UPTECH',
      detail: 'Implemented automated CI/CD pipelines (GitLab), orchestrated apps using Docker, K3s, and Helm.',
      icon: "💼",
      problem: "Manual deployments were slow, error-prone, and inconsistent.",
      approach: "Built a new CI/CD pipeline from scratch using GitLab CI, Docker, and Helm.",
      result: "Reduced deployment latency by 40% and eliminated 90% of staging errors.",
      lesson: "Automation isn't just a time-saver; it's the key to reliable and scalable systems.",
      lessonColor: "border-orange-400 text-orange-600"
    },
    {
      year: 'FEB 2025 - JUNE 2025',
      title: 'Graduation Capstone: PitStop System',
      detail: 'Industrialized AI Engine for Automotive Diagnostics. A comprehensive system combining a High-Performance Multi-Model Inference Engine (TCN/XGBoost/Autoencoders) with an Intelligent GPT-based Bot.',
      icon: "⭐",
      problem: 'Drivers and technicians struggle to interpret complex OBD-II codes without context.',
      approach: 'Hybrid Architecture: TCN + XGBoost for anomaly detection; GPT-4 driven Bot for explanation. Fully Secured & Dockerized.',
      result: '98.7% Accuracy in driving style classification; System fully containerized and deployed on Linux.',
      lesson: 'The key to industrial AI is not just model performance, but the seamless integration of predictive power with human-interpretable interfaces.',
      lessonColor: "border-[#FF7F50] text-[#FF7F50]"
    }
  ];

  const skillsData = [
    { name: "Python", category: "Language", icon: <Terminal size={18} /> },
    { name: "C++", category: "Language", icon: <Code size={18} /> },
    { name: "Java", category: "Language", icon: <Code size={18} /> },
    { name: "PyTorch", category: "AI Framework", icon: <Brain size={18} /> },
    { name: "TensorFlow", category: "AI Framework", icon: <Brain size={18} /> },
    { name: "XGBoost", category: "ML Model", icon: <Zap size={18} /> },
    { name: "CNN / TCN", category: "Deep Learning", icon: <Layers size={18} /> },
    { name: "Autoencoders", category: "Deep Learning", icon: <Layers size={18} /> },
    { name: "Docker", category: "DevOps", icon: <BoxIcon size={18} /> },
    { name: "FastAPI", category: "Backend", icon: <Globe size={18} /> },
    { name: "CI/CD", category: "DevOps", icon: <Cpu size={18} /> },
    { name: "GPT API", category: "LLM", icon: <Sparkles size={18} /> },
    { name: "Pandas/NumPy", category: "Data Science", icon: <Database size={18} /> },
    { name: "Vector DBs", category: "Data", icon: <Database size={18} /> },
    { name: "Microservices", category: "Architecture", icon: <Server size={18} /> },
    { name: "Linux Security", category: "DevOps", icon: <ShieldCheck size={18} /> },
  ];

  // --- UPDATED SMART CHATBOT LOGIC (THE BRAIN TRANSPLANT) ---
  const handleChat = (manualMsg = null) => {
    const text = manualMsg || chatInput;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate thinking delay with "Personality"
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "";
      let nextContext = null;

      // --- LOGIC TREE ---

      // 1. GREETINGS
      if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi' || lower.includes('hey')) {
        response = "Hi! I'm RimaBot 2.0. I run on coffee and complex algorithms. I can tell you about my projects, my obsession with clean code, or why I think 'Friends' is the best show ever.";
        nextContext = 'intro';
      }

      // 2. CONTEXT: SKILLS (Following up on skills)
      else if (chatContext === 'skills' && (lower.includes('more') || lower.includes('detail') || lower.includes('else'))) {
         response = "Oh, you want the deep dive? 😉 Beyond Python and C++, I'm a Docker fanatic. I don't just 'use' containers; I orchestrate them. I also speak fluent PyTorch and have a love-hate relationship with C pointers. What tech stack does your team use?";
         nextContext = 'skills';
      }

      // 3. SKILLS (General)
      else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        response = "Could I BE any more prepared? ⚡ My toolbox is heavy: Python & C++ for logic, PyTorch & TensorFlow for the brains, and Docker/CI-CD to make sure it actually works in production. I bridge the gap between 'it works on my machine' and 'it works for the user'.";
        nextContext = 'skills';
      }

      // 4. CONTEXT: PROJECTS (Following up)
      else if (chatContext === 'projects' && (lower.includes('more') || lower.includes('which') || lower.includes('best'))) {
        response = "It's like choosing a favorite child! 😅 But... 'PitStop' is my pride and joy. It's a Hybrid AI (TCN + GPT-4) that diagnoses cars. It’s not just a chatbot; it reads raw sensor data. Want to know about the architecture?";
        nextContext = 'pitstop_deep';
      }

      // 5. PROJECTS (General)
      else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('experience')) {
        response = "I've built some cool things! From 'PitStop' (Automotive AI) to Brain Tumor Detection pipelines. I don't just build models; I build *systems* that solve problems. Click on the 'Work' cards to see the magic, or ask me about PitStop specifically!";
        nextContext = 'projects';
      }

      // 6. PITSTOP SPECIFIC
      else if (lower.includes('pitstop') || lower.includes('car') || lower.includes('auto')) {
        response = "Vroom Vroom! 🚗 PitStop is my masterpiece. It uses Temporal Convolutional Networks (TCN) to catch anomalies in sensor data, then feeds that context to GPT-4 to explain it to the driver. High tech meets user friendly.";
        nextContext = 'pitstop_deep';
      }

      // 7. CONTACT / HIRE
      else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('job')) {
        response = "I was hoping you'd ask that! 🤩 You can email me at rimaalaya76@gmail.com. I am ready to bring my energy (and my code) to your team.";
        nextContext = 'contact';
      }

      // 8. PERSONALITY / FUN
      else if (lower.includes('funny') || lower.includes('joke') || lower.includes('friend') || lower.includes('chandler')) {
        response = "I'm not great at the advice... can I interest you in a sarcastic comment? 😏 Just kidding. I'm creative, ambitious, and I work hard so my cats (if I had them) could have a better life.";
        nextContext = 'fun';
      }

      // 9. FALLBACK
      else {
        response = "My neural network is a bit confused on that one! 🧠 Try asking about 'Skills', 'PitStop', or just say 'Hi' again. I'm learning every day!";
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
      setChatContext(nextContext); // Update context properly
      setIsTyping(false);
    }, 1000);
  };

  const handleFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    if (name && email && message) {
      const subject = `Message from ${name} via your portfolio`;
      const body = `Name: ${name}\n\nMessage: ${message}`;
      const mailtoLink = `mailto:rimaalaya76@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    } else {
      alert("Please fill in all fields.");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    // UPDATED: Removed 'cursor-none' to let native cursor show, custom cursor acts as follower
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF5E4] to-[#F6D6C8] text-[#3C3C3C] font-sans">
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />
      {/* Floating Header */}
      <header className="fixed top-0 w-full z-50 bg-[#FFFDF9]/80 backdrop-blur-md border-b border-[#FF7F50]/20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#FF7F50] to-[#F8D49D] bg-clip-text text-transparent cursor-pointer hover:scale-105 transition"
               onClick={() => scrollToSection('hero')}>
            RA
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            {['About', 'Journey', 'Work', 'Skills', 'Certifications', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#3C3C3C] hover:text-[#FF7F50] transition font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7F50] transition-all group-hover:w-full"></span>
              </button>
            ))}
            <a href="https://github.com/RimaAlaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7F50] transition hover:scale-110 transform duration-200"><Github size={20} /></a>
            <a href="https://linkedin.com/in/rima-alaya" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7F50] transition hover:scale-110 transform duration-200"><Linkedin size={20} /></a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFDF9] border-t border-[#FF7F50]/20 p-6">
            {['About', 'Journey', 'Work', 'Skills', 'Certifications', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 hover:text-[#FF7F50] transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="pt-20 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF7F50] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#EED9B6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 w-full items-center relative z-10">

          {/* Text Side */}
          <div className="space-y-8 order-2 md:order-1">
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-[#3C3C3C]">
              Hi, I'm <span className="text-[#FF7F50] relative inline-block">
                Rima
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF7F50] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
              </span>.
              <br />
              <span className="bg-gradient-to-r from-[#FF7F50] via-[#FF9F7A] to-[#FF7F50] bg-clip-text text-transparent min-h-[80px] block">
                {typedText}<span className="animate-pulse">|</span>
              </span>
            </h1>

            <div className="relative inline-block p-1">
               <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] opacity-30 blur-xl rounded-full"></div>
                <p className="relative text-xl text-[#3C3C3C] font-bold tracking-wide bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-[#FF7F50]/30 shadow-lg">
                  <span className="text-[#FF7F50]">ML Engineer</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-[#FF7F50]">Full Stack ML</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-[#FF7F50]">Dreamer</span>
                </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection('work')}
                className="px-8 py-4 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all font-bold text-lg tracking-wide flex items-center gap-2 group"
              >
                See My Work <span className="group-hover:rotate-90 transition-transform duration-300">➜</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white border-2 border-[#FF7F50] text-[#FF7F50] rounded-full hover:bg-[#FF7F50] hover:text-white transition-all font-bold text-lg tracking-wide"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Image Side - Floating Animation */}
          <div className="relative flex justify-center items-center order-1 md:order-2">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 127, 80, 0.8) 0%, rgba(255, 159, 122, 0.4) 50%, rgba(246, 214, 200, 0) 100%)'
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              <div className="relative z-10 w-full h-full cursor-pointer transition-transform hover:scale-105 duration-500"
                   onClick={() => setChatOpen(true)}>
                 <img
                    src="/Gemini_Generated_Image_zem41fzem41fzem4-removebg-preview (1).png"
                    alt="Illustration of Rima Alaya"
                    className="w-full h-full object-cover drop-shadow-2xl rounded-full border-[8px] border-white shadow-xl"
                  />

                <div className="absolute bottom-6 -right-0 bg-white rounded-2xl p-4 shadow-xl border border-[#FF7F50]/20 animate-pulse-slow">
                  <div className="text-center px-2">
                    <div className="text-sm font-bold text-[#FF7F50]">RimaBot</div>
                    <div className="text-xs text-[#3C3C3C]/70 font-medium">Chat with me!</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 left-4 bg-white rounded-full p-3 shadow-lg animate-spin-slow">
                 <Sparkles className="text-[#FF7F50]" size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-24 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center font-serif text-[#3C3C3C]">About Me</h2>

          <motion.div
            className="relative bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(255,127,80,0.15)] text-left border border-[#FF7F50]/30 overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6]"></div>
            <div className="absolute top-6 right-8 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 text-xl md:text-2xl text-[#3C3C3C] font-medium leading-relaxed space-y-8 font-sans">
              <div className="flex items-start gap-4">
                 <Terminal className="text-[#FF7F50] mt-1 shrink-0" size={32} />
                 <div>
                    <p>
                      I'm Rima—I build ML systems that work in <span className="font-bold text-[#FF7F50] border-b-2 border-[#FF7F50]/20">production</span>, not just in conference papers.
                    </p>
                 </div>
              </div>

              <p className="pl-12">
                Delivered <span className="font-bold bg-[#FFF5E4] text-[#FF7F50] px-3 py-1 rounded-lg border border-[#FF7F50]/20 shadow-sm">60% faster vehicle diagnostics</span> by automating code analysis with AI, trained CNNs for medical imaging, and built MLOps pipelines that actually scale (shocking, I know).
              </p>

              <p className="pl-12">
                From data wrangling to deployment, I handle the messy parts everyone avoids. I love solving puzzles, and deployment errors are just puzzles with high stakes.
              </p>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] rounded-xl text-white shadow-lg transform group-hover:scale-[1.01] transition-transform duration-300">
                <p className="font-bold italic flex items-center gap-3">
                  <Sparkles size={24} />
                  Fresh graduate seeking AI Engineering roles—preferably with interesting problems and realistic deadlines.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Journey Section */}
      <section id="journey" className="py-24 px-6 bg-[#FFFDF9]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center font-serif text-[#3C3C3C]">My Journey</h2>

          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {timeline.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setSelectedJourneyIndex(idx)}
                className={`px-6 py-3 rounded-full text-base md:text-lg font-bold transition-all duration-300 shadow-sm
                  ${selectedJourneyIndex === idx 
                    ? 'bg-[#FF7F50] text-white shadow-md transform scale-105' 
                    : 'bg-white text-[#3C3C3C]/70 hover:bg-[#FFF5E4] border border-[#FF7F50]/20'
                  }
                `}
              >
                {item.title.split('(')[0].split(',')[0].replace("Graduation Capstone", "Graduation")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedJourneyIndex}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#FF7F50]/10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-0 right-0 opacity-5 text-[10rem] transform translate-x-10 -translate-y-10 pointer-events-none">
                {timeline[selectedJourneyIndex].icon}
              </div>

              <div className="relative z-10">
                <span className="inline-block px-4 py-1 bg-[#FFF5E4] text-[#FF7F50] rounded-full text-sm font-bold mb-4 tracking-wide">
                    {timeline[selectedJourneyIndex].year}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#3C3C3C] font-serif">{timeline[selectedJourneyIndex].title}</h3>
                <p className="text-xl text-[#3C3C3C]/80 mb-10 leading-relaxed border-l-4 border-[#FF7F50] pl-6">
                   {timeline[selectedJourneyIndex].detail}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {timeline[selectedJourneyIndex].problem && (
                      <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg text-[#3C3C3C] mb-2 flex items-center gap-2">🚧 Problem</h4>
                        <p className="text-[#3C3C3C]/70 text-sm">{timeline[selectedJourneyIndex].problem}</p>
                    </div>
                    )}
                    {timeline[selectedJourneyIndex].approach && (
                    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg text-[#3C3C3C] mb-2 flex items-center gap-2">🛠️ Approach</h4>
                        <p className="text-[#3C3C3C]/70 text-sm">{timeline[selectedJourneyIndex].approach}</p>
                     </div>
                    )}
                    {timeline[selectedJourneyIndex].result && (
                    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg text-[#3C3C3C] mb-2 flex items-center gap-2">🚀 Result</h4>
                        <p className="text-[#3C3C3C]/70 text-sm">{timeline[selectedJourneyIndex].result}</p>
                    </div>
                    )}
                </div>

                {timeline[selectedJourneyIndex].lesson && (
                  <div className={`mt-10 p-6 rounded-xl border-2 ${timeline[selectedJourneyIndex].lessonColor || "border-[#FF7F50] text-[#FF7F50]"} bg-white shadow-sm`}>
                    <h4 className="font-bold text-lg mb-1 flex items-center gap-2">💡 Key Lesson</h4>
                    <p className="text-[#3C3C3C]/90 italic font-medium text-lg">"{timeline[selectedJourneyIndex].lesson}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Work Section with 3D Tilt Cards */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center font-serif text-[#3C3C3C]">Featured Projects</h2>
          <p className="text-center text-[#3C3C3C]/70 mb-16 text-lg">
            Building solutions that matter, one project at a time
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <TiltCard key={project.id} onClick={() => setSelectedProject(project)}>
                <div
                   className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-[#FF7F50]/10 group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">{project.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-[#3C3C3C] group-hover:text-[#FF7F50] transition-colors relative z-10">{project.title}</h3>
                  <p className="text-[#3C3C3C]/70 mb-6 text-sm leading-relaxed flex-grow relative z-10">{project.short}</p>

                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-[#FFF5E4] text-[#FF7F50] rounded-full text-xs font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className={`text-xl font-bold ${metric.color || 'text-[#FF7F50]'}`}>{metric.value}</div>
                        <div className="text-xs text-[#3C3C3C]/60 font-semibold uppercase">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-white border-2 border-[#FF7F50] text-[#FF7F50] rounded-xl font-bold hover:bg-[#FF7F50] hover:text-white transition-all shadow-sm mt-auto relative z-10">
                    See Details
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF5E4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center font-serif text-[#3C3C3C]">Skills & Tech Stack</h2>
          <p className="text-center text-[#3C3C3C]/70 mb-16 text-lg">
            From low-level C++ to production-ready MLOps pipelines.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skillsData.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 127, 80, 0.3)" }}
                className="bg-white p-6 rounded-2xl shadow-md border border-[#FF7F50]/20 flex flex-col items-center justify-center text-center group cursor-default transition-all duration-300 hover:border-[#FF7F50]"
              >
                <div className="p-4 bg-[#FFF5E4] rounded-full mb-4 text-[#FF7F50] group-hover:bg-gradient-to-br group-hover:from-[#FF7F50] group-hover:to-[#EED9B6] group-hover:text-white transition-all duration-500 shadow-sm">
                   {skill.icon}
                </div>
                <h3 className="font-bold text-lg text-[#3C3C3C]">{skill.name}</h3>
                <p className="text-xs text-[#3C3C3C]/50 uppercase tracking-widest mt-1 font-bold">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center font-serif text-[#3C3C3C]">Certifications</h2>
          <p className="text-center text-[#3C3C3C]/70 mb-16">Continuously learning and growing</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-[#FF7F50]/10 group"
              >
                <div className="aspect-video bg-gray-50 rounded-lg mb-6 overflow-hidden flex items-center justify-center p-4 border border-gray-100">
                   <img src={cert.image} alt={`${cert.name} badge`} className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-xs font-bold text-[#FF7F50] uppercase tracking-wider mb-2">{cert.issuer}</p>
                <h3 className="font-bold text-lg mb-4 text-[#3C3C3C] leading-tight group-hover:text-[#FF7F50] transition-colors">{cert.name}</h3>
                <div className="flex items-center text-sm text-[#3C3C3C]/60 font-medium group-hover:text-[#FF7F50] transition-colors">
                  Verify Credential <LinkIcon size={14} className="ml-2" />
                </div>
              </a>
            ))}
          </div>

          <h3 className="text-3xl font-bold mb-10 text-center font-serif text-[#3C3C3C]">Community & Leadership</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {associations.map((assoc) => (
              <div key={assoc.name} className="bg-gradient-to-br from-white to-[#FFF5E4] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-[#FF7F50]/20 flex flex-col md:flex-row items-center gap-6">
                 <div className="w-full md:w-1/3 aspect-square bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                  <img src={assoc.image} alt={`${assoc.name} certificate`} className="w-full h-full object-contain" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl mb-2 text-[#3C3C3C]">{assoc.name}</h3>
                    <div className="text-[#FF7F50] font-bold mb-2">{assoc.role}</div>
                    <p className="text-[#3C3C3C]/70 text-sm">{assoc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#FFFDF9]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif text-[#3C3C3C]">Let's Build Something Amazing</h2>
          <p className="text-xl text-[#3C3C3C]/70 mb-12">
            I reply fast—sometimes faster than my models.
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-[#FF7F50]">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleFormChange}
                placeholder="Your name"
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-[#FF7F50] focus:outline-none transition text-[#3C3C3C] bg-gray-50 focus:bg-white"
                required
              />
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleFormChange}
                placeholder="Your email"
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-[#FF7F50] focus:outline-none transition text-[#3C3C3C] bg-gray-50 focus:bg-white"
                required
              />
              <textarea
                rows="4"
                name="message"
                value={contactForm.message}
                onChange={handleFormChange}
                placeholder="Tell me about your project..."
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-[#FF7F50] focus:outline-none transition resize-none text-[#3C3C3C] bg-gray-50 focus:bg-white"
                required
              ></textarea>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg hover:scale-105 transform duration-200">
                Send Message
              </button>
            </form>
            <div className="mt-10 pt-10 border-t border-gray-100">
              <div className="flex justify-center gap-8 flex-wrap">
                <a href="mailto:rimaalaya76@gmail.com" className="flex items-center gap-2 text-[#FF7F50] hover:scale-110 transition font-medium"><Mail size={20} /><span>rimaalaya76@gmail.com</span></a>
                <a href="https://github.com/RimaAlaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF7F50] hover:scale-110 transition font-medium"><Github size={20} /><span>GitHub</span></a>
                <a href="https://linkedin.com/in/rima-alaya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF7F50] hover:scale-110 transition font-medium"><Linkedin size={20} /><span>LinkedIn</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#FFFDF9] text-[#3C3C3C]/70 text-center border-t border-gray-100">
        <p className="mb-2 font-medium">© 2025 Rima Alaya | Tunis, Tunisia</p>
        <p className="text-sm italic">Smart solutions, a dash of creativity.</p>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"><X size={24} /></button>
            <div className="text-6xl mb-6">{selectedProject.icon}</div>
            <h2 className="text-3xl font-bold mb-4 text-[#3C3C3C] font-serif">{selectedProject.title}</h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tech.map(tech => (
                <span key={tech} className="px-4 py-2 bg-[#FFF5E4] text-[#FF7F50] rounded-full font-bold text-sm">{tech}</span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {selectedProject.metrics.map((metric, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className={`text-3xl font-bold mb-1 ${metric.color || 'text-[#FF7F50]'}`}>{metric.value}</div>
                  <div className="text-sm text-[#3C3C3C]/60 font-bold uppercase">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div><h3 className="text-xl font-bold mb-3 text-[#FF7F50]">The Problem</h3><p className="text-[#3C3C3C]/80 leading-relaxed">{selectedProject.problem}</p></div>
              <div><h3 className="text-xl font-bold mb-3 text-[#FF7F50]">The Solution</h3><p className="text-[#3C3C3C]/80 leading-relaxed">{selectedProject.solution}</p></div>
              <div className="flex gap-4 pt-4">
                <a href={`https://github.com/RimaAlaya/${selectedProject.id}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] text-white rounded-xl hover:shadow-xl transition text-center flex items-center justify-center gap-2 font-bold">
                  <Github size={20} /> View Code on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATED Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100%-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-[#FF7F50] flex flex-col max-h-[600px]">
          <div className="bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
                <div className="text-3xl bg-white/20 rounded-full p-1">🤖</div>
                <div>
                    <div className="font-bold text-white">RimaBot 2.0</div>
                    <div className="text-xs text-white/80">Witty, Smart & Helpful</div>
                </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1 transition"><X size={20} /></button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
             <div className="bg-white p-3 rounded-lg mr-8 shadow-sm border border-gray-100 text-[#3C3C3C]">
                <p className="text-sm">Hi! I'm RimaBot 👋 I run on coffee and complex algorithms. Ask me about Rima's <span className="font-bold text-[#FF7F50]">Skills</span> or her <span className="font-bold text-[#FF7F50]">Projects</span>!</p>
            </div>

            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-[#FF7F50] text-white ml-8' : 'bg-white mr-8 border border-gray-100 text-[#3C3C3C]'}`}>
                  <p className="text-sm">{msg.text}</p>
              </div>
            ))}

            {isTyping && (
                <div className="bg-white p-3 rounded-lg mr-8 shadow-sm border border-gray-100 text-[#3C3C3C] w-16">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <div className="px-4 pt-2 bg-gray-50 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             <button onClick={() => handleChat("What is Rima's best skill?")} className="whitespace-nowrap px-3 py-1 bg-white border border-[#FF7F50]/30 text-[#FF7F50] text-xs rounded-full hover:bg-[#FF7F50] hover:text-white transition">⚡ Top Skill</button>
             <button onClick={() => handleChat("Tell me about PitStop")} className="whitespace-nowrap px-3 py-1 bg-white border border-[#FF7F50]/30 text-[#FF7F50] text-xs rounded-full hover:bg-[#FF7F50] hover:text-white transition">🚗 PitStop</button>
             <button onClick={() => handleChat("Is Rima funny?")} className="whitespace-nowrap px-3 py-1 bg-white border border-[#FF7F50]/30 text-[#FF7F50] text-xs rounded-full hover:bg-[#FF7F50] hover:text-white transition">🤪 Fun Fact</button>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border-2 border-gray-100 rounded-lg focus:border-[#FF7F50] focus:outline-none text-sm"
              />
              <button onClick={() => handleChat()} className="p-2 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] text-white rounded-lg hover:shadow-lg transition"><Send size={20} /></button>
            </div>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#FF7F50] to-[#EED9B6] text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center hover:-translate-y-1">
          <MessageSquare size={28} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
}