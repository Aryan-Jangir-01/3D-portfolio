import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Aryan Jangir",
  handle: "aryanjangir",
  title: "AI & Data Science Student | Full-Stack & Cybersecurity Enthusiast",
  roles: [
    "AI & Data Science Undergrad (Class of 2028)",
    "Full-Stack Web Developer",
    "AI/ML & Deep Learning Explorer",
    "Cybersecurity Fundamentals Enthusiast",
    "Smart India Hackathon (SIH 2025) Innovator"
  ],
  location: "Jaipur, India (Arya College of Engineering & IT)",
  timezone: "Asia/Kolkata",
  email: "aryanjangir0805@gmail.com",
  github: "https://github.com/aryanjangir",
  linkedin: "https://linkedin.com/in/aryan-jangir",
  twitter: "https://twitter.com",
  bio: "Third-year B.Tech student specializing in Artificial Intelligence and Data Science at Arya College of Engineering & IT, Jaipur (Graduation 2028). Passionate developer, hackathon enthusiast, and aspiring AI/ML & Cybersecurity professional building intelligent, secure, and user-friendly applications.",
  
  aboutHighlights: [
    {
      label: "College & Specialization",
      value: "Arya College",
      subtext: "B.Tech in AI & Data Science (Jaipur)",
      icon: "Code2"
    },
    {
      label: "Graduation Year",
      value: "2028",
      subtext: "Currently in 3rd Year (B.Tech)",
      icon: "Rocket"
    },
    {
      label: "National Hackathons",
      value: "SIH 2025",
      subtext: "Smart India Hackathon Competitor",
      icon: "Zap"
    },
    {
      label: "Core Specializations",
      value: "AI & Security",
      subtext: "AI/ML, Web & Cybersecurity",
      icon: "Brain"
    }
  ],

  philosophies: [
    "Build with intelligence: AI and automation should solve genuine real-world friction.",
    "Security is non-negotiable: Software must be robust, reliable, and secure by design.",
    "Learn, iterate, and compete: Hackathons and curiosity push engineering boundaries."
  ],

  skills: [
    {
      name: "Programming Languages",
      icon: "Code2",
      skills: [
        { name: "Python", level: 92, description: "AI/ML, FastAPI, Automation, Scripting & Data Handling" },
        { name: "C / C++", level: 86, description: "DSA, Embedded Systems, Hardware & Performance" },
        { name: "Java", level: 84, description: "OOP Architecture, Data Structures & Core Principles" },
        { name: "JavaScript", level: 88, description: "ES6+, Async Programming, DOM & Web APIs" }
      ]
    },
    {
      name: "Web & Full-Stack",
      icon: "Layout",
      skills: [
        { name: "React.js", level: 90, description: "Modern Component Architecture, Hooks, Interactive SPAs" },
        { name: "Tailwind CSS", level: 94, description: "Futuristic Glassmorphism, Responsive Design & Styling" },
        { name: "Node.js", level: 85, description: "Server-side Runtime, NPM Ecosystem, REST APIs" },
        { name: "HTML5 & CSS3", level: 92, description: "Semantic Markup, Modern Flexbox/Grid Layouts, Animations" }
      ]
    },
    {
      name: "Backend & Databases",
      icon: "Server",
      skills: [
        { name: "FastAPI", level: 88, description: "High-performance Async Python APIs & AI Model Serving" },
        { name: "Express.js", level: 86, description: "RESTful Web Services, Middleware & Routing" },
        { name: "MongoDB", level: 85, description: "NoSQL Document Storage, Collections & Aggregation" },
        { name: "Firebase", level: 84, description: "Authentication, Firestore Realtime Database & Hosting" },
        { name: "SQL", level: 86, description: "Relational Modeling, Query Optimization & Joins" }
      ]
    },
    {
      name: "AI, Security & Tools",
      icon: "Cpu",
      skills: [
        { name: "Artificial Intelligence", level: 88, description: "Search Algorithms, Intelligent Agents & Logic Systems" },
        { name: "Machine Learning", level: 85, description: "Supervised/Unsupervised Learning, Classification, CNNs" },
        { name: "Cybersecurity Fundamentals", level: 82, description: "Network Defense, Vulnerability Awareness & Secure Auth" },
        { name: "Git & GitHub", level: 90, description: "Version Control, Branching, Open Source & Team Workflows" },
        { name: "Linux", level: 84, description: "Bash Shell Scripting, System Navigation & Environments" }
      ]
    }
  ],

  projects: [
    {
      id: "sih-internship-ai",
      title: "AI-Based Internship Recommendation Engine (SIH 2025)",
      description: "Smart India Hackathon 2025 innovation matching students with ideal internship opportunities using algorithmic profile analysis.",
      longDescription: "Engineered specifically for Smart India Hackathon (SIH 2025). This intelligent platform analyzes student academic backgrounds, coding skills, and industry requirements to recommend hyper-relevant internship positions with precision matching and actionable skill-gap insights.",
      category: "AI / ML",
      tags: ["Python", "FastAPI", "React.js", "Machine Learning", "MongoDB", "Tailwind CSS"],
      features: [
        "Algorithmic profile-to-role semantic matching and skill ranking",
        "Interactive candidate skill gap identifier with tailored upskilling roadmaps",
        "FastAPI async backend delivering sub-second recommendation inference",
        "Developed, engineered, and pitched for Smart India Hackathon (SIH 2025)"
      ],
      metrics: "Built for Smart India Hackathon (SIH 2025)",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: true
    },
    {
      id: "cryptopay",
      title: "CryptoPay - Secure Digital Asset Payment Platform",
      description: "A secure, modern cryptocurrency transaction and payment platform featuring encrypted flows and real-time wallet tracking.",
      longDescription: "CryptoPay provides an encrypted environment for digital asset transfers and payment gateway operations. Designed with cybersecurity best practices, multi-layer verification, and live price telemetry feeds.",
      category: "Full-Stack",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Cybersecurity", "Tailwind CSS"],
      features: [
        "End-to-end encrypted transaction validation and secure session handling",
        "Real-time digital currency conversion and portfolio balance telemetry",
        "Protected authentication pipelines preventing common web vulnerabilities",
        "Futuristic dark cyber dashboard with instant transfer logs"
      ],
      metrics: "Built with security-first architecture",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: true
    },
    {
      id: "mindease",
      title: "MindEase - AI Mental Health & Wellness Companion",
      description: "An AI-powered mental wellness companion providing smart stress tracking, calming exercises, and conversational sentiment analysis.",
      longDescription: "MindEase offers a private and compassionate digital sanctuary. Utilizes NLP and machine learning to analyze user mood patterns, guide therapeutic breathing cycles, and provide personalized stress-relief exercises.",
      category: "AI / ML",
      tags: ["React.js", "Python", "FastAPI", "AI / ML", "Firebase", "Tailwind CSS"],
      features: [
        "NLP-driven sentiment analysis and mood trend journaling",
        "Guided breathing cycles with soothing ambient audiovisual feedback",
        "Interactive mental wellness metrics and weekly progress reports",
        "Strict client-side privacy and encrypted personal data storage"
      ],
      metrics: "AI-driven wellness and sentiment analysis",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: true
    },
    {
      id: "noteshare",
      title: "NoteShare - Collaborative Academic Resource Hub",
      description: "A collaborative academic repository enabling students to organize, upload, tag, and discover lecture notes and study material.",
      longDescription: "Created to eliminate fragmented study resources in college. Enables students from Arya College and beyond to upload lecture notes, previous year question papers (PYQs), and reference guides with peer verification.",
      category: "Full-Stack",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      features: [
        "Subject, department, and semester-wise categorized document repository",
        "Peer verification, rating, and upvote system for resource quality",
        "Instant in-browser document previews and high-speed downloads",
        "Role-based contributor badges recognizing top academic sharers"
      ],
      metrics: "Empowering collaborative student learning",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: true
    },
    {
      id: "face-age-analysis",
      title: "Face Age Analysis - Computer Vision & Deep Learning",
      description: "Real-time facial detection and age group prediction system using convolutional neural networks and computer vision.",
      longDescription: "A deep learning computer vision system that captures facial video streams, detects facial landmarks, and applies trained CNN classification layers to estimate age brackets and facial features in real time.",
      category: "AI / ML",
      tags: ["Python", "Computer Vision", "Deep Learning", "Machine Learning", "CNN"],
      features: [
        "Real-time facial landmark detection and bounding box alignment",
        "Multi-stage convolutional neural network (CNN) for age classification",
        "Live webcam inference stream with low latency processing",
        "Analytics dashboard visualizing detection probabilities and confidence"
      ],
      metrics: "Real-time facial feature inference",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: false
    },
    {
      id: "arduino-soil-moisture",
      title: "Arduino-Based Soil Moisture Detection & Smart Irrigation",
      description: "An automated embedded IoT hardware system that monitors soil hydration levels and triggers automated irrigation relays.",
      longDescription: "An IoT embedded system built with Arduino and C++. Continuously reads capacitive soil moisture sensors and activates water pump relays automatically when soil moisture falls below threshold levels, ideal for smart farming.",
      category: "Systems / Web3",
      tags: ["C++", "Arduino", "IoT Sensors", "Embedded Systems", "Hardware"],
      features: [
        "Continuous analog soil hydration measurement with capacitive sensing",
        "Automated relay switching for water pump actuation with hysteresis control",
        "Hardware status LEDs and display output for immediate field diagnostics",
        "Energy-efficient low-power sleep cycles for prolonged battery endurance"
      ],
      metrics: "Hardware-level automated environmental control",
      liveUrl: "https://github.com/aryanjangir",
      githubUrl: "https://github.com/aryanjangir",
      featured: false
    }
  ],

  experiences: [
    {
      id: "exp-1",
      role: "B.Tech in Artificial Intelligence & Data Science (3rd Year)",
      company: "Arya College of Engineering & IT, Jaipur",
      period: "2024 - 2028 (Expected)",
      location: "Jaipur, Rajasthan, India",
      type: "Education",
      description: [
        "Pursuing specialized engineering degree in Artificial Intelligence and Data Science.",
        "Deep coursework across Data Structures & Algorithms, Machine Learning, Database Systems, Computer Networks, and Cybersecurity fundamentals.",
        "Active leader and builder in college tech events, hackathons, and software projects."
      ],
      technologies: ["Python", "C/C++", "Java", "AI/ML", "SQL", "Linux", "Data Structures"],
      link: "https://www.aryacollege.in/"
    },
    {
      id: "exp-2",
      role: "Project Lead & AI Developer - SIH 2025",
      company: "Smart India Hackathon (SIH 2025)",
      period: "2025",
      location: "National Level, India",
      type: "Hackathon",
      description: [
        "Led architecture and development of the AI-Based Internship Recommendation Engine to address national student placement challenges.",
        "Engineered the FastAPI recommendation backend, machine learning matching algorithms, and responsive React.js UI.",
        "Collaborated under intense sprint timelines to deliver a production-ready, scalable prototype."
      ],
      technologies: ["Python", "FastAPI", "React.js", "Machine Learning", "MongoDB", "Tailwind CSS"],
      link: "https://www.sih.gov.in/"
    },
    {
      id: "exp-3",
      role: "Full-Stack & Intelligent Systems Builder",
      company: "Self-Driven Projects & Open Source",
      period: "2023 - Present",
      location: "Jaipur, India",
      type: "Projects",
      description: [
        "Engineered multiple deployed applications: CryptoPay (secure payments), MindEase (AI wellness companion), and NoteShare (academic sharing).",
        "Built embedded IoT systems utilizing Arduino, C++, and sensors for smart agricultural automation.",
        "Continuously exploring emerging AI models, network defense principles, and high-performance web architectures."
      ],
      technologies: ["React.js", "Python", "Node.js", "FastAPI", "MongoDB", "Firebase", "Cybersecurity", "Arduino"]
    }
  ]
};
