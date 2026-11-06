import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Aryan Jangir",
  handle: "Aryan-Jangir-01",
  title: "AI & Data Science Student | Full-Stack & Cybersecurity Enthusiast",
  roles: [
    "AI & Data Science Undergrad (Class of 2028)",
    "Game Developer & 2D Engine Builder",
    "Full-Stack Web Developer",
    "AI/ML & Deep Learning Explorer",
    "Cybersecurity Fundamentals Enthusiast",
    "Smart India Hackathon (SIH 2025) Innovator"
  ],
  location: "Jaipur, Rajasthan, India (Arya College)",
  timezone: "Asia/Kolkata",
  email: "aryanjangir0805@gmail.com",
  github: "https://github.com/Aryan-Jangir-01",
  linkedin: "https://www.linkedin.com/in/aryan-jangir2005",
  twitter: "https://twitter.com",
  bio: "Third-year B.Tech student specializing in Artificial Intelligence and Data Science at Arya College of Engineering & IT, Jaipur (Graduation 2028). Passionate developer, hackathon innovator (SIH 2025), and aspiring AI/ML & Cybersecurity professional building games, intelligent algorithms, and secure web applications.",
  
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
      label: "Academics (Board)",
      value: "85% / 80%",
      subtext: "Class XII (85%) • Class X (80%)",
      icon: "Zap"
    },
    {
      label: "Core Specializations",
      value: "AI & Security",
      subtext: "AI/ML, Game Dev & Web Security",
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
      id: "kingdom-of-shadows",
      title: "Kingdom of Shadows: Break the Curse - 2D Action Platformer",
      description: "Epic 2D dark fantasy action platformer featuring custom physics, boss battles against King Malakor, active skill casting, and an RPG upgrade shrine.",
      longDescription: "A browser-based 2D dark fantasy action platformer built from scratch with HTML5 Canvas, modern JavaScript (ES6+), and custom 60FPS physics. Players embody a warrior braving cursed realms, rescuing petrified villagers, executing high-speed combat moves (Light Dash, Solar Blast, Divine Shield), trading harvested Soul Gems at the RPG Upgrade Shrine, and defeating the ancient boss Malakor. Includes customizable on-screen touch controls with mobile landscape orientation lock.",
      category: "Game Dev",
      tags: ["JavaScript", "HTML5 Canvas", "Game Dev", "CSS3", "Physics", "PWA"],
      features: [
        "Custom 60FPS 2D physics engine with platforming, collision detection & lag-buffered health bars",
        "Active spellcasting system: Light Dash (Shift), Solar Blast (Q), and Divine Protection Sphere (C/X)",
        "In-game RPG Upgrade Shrine with Soul Gem economy to boost vitality and attack powers",
        "Multi-stage level progression culminating in an epic multi-phase boss fight against Malakor",
        "Customizable mobile touch d-pad & draggable controls with landscape orientation lock"
      ],
      metrics: "Playable 2D Action RPG in browser",
      liveUrl: "https://aryan-jangir-01.github.io/Kingdom-of-Shadows/",
      githubUrl: "https://github.com/Aryan-Jangir-01/Kingdom-of-Shadows",
      featured: true
    },
    {
      id: "doc-verify",
      title: "DOC Verify - Certificate Verification Portal",
      description: "Web-based authentication portal focused on academic and professional certificate verification, credential validation, and tampering prevention.",
      longDescription: "A dedicated digital credential verification web portal built to authenticate academic and institutional certificates. Provides instant lookup, verified issuer credentials, and tamper-proof verification records for institutions, students, and prospective employers.",
      category: "Full-Stack",
      tags: ["React.js", "Web Security", "Verification", "Tailwind CSS", "JavaScript"],
      features: [
        "Instant certificate serial verification and issuer validation",
        "Secure digital credential lookup with verifiable institutional metadata",
        "Tamper-detection and status verification for institutional certificates",
        "Streamlined, responsive UI for quick administrative reviews"
      ],
      metrics: "Deployed certificate validation system",
      liveUrl: "https://xking8544-droid.github.io/DOC_verify/#home",
      githubUrl: "https://github.com/Aryan-Jangir-01",
      featured: true
    },
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
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
      featured: true
    },
    {
      id: "cryptopay",
      title: "CryptoPay - Freelance Cryptocurrency Payment Platform",
      description: "A web platform enabling freelancers to receive international payments using cryptocurrency with Firebase backend integration.",
      longDescription: "Built specifically to help freelancers receive seamless, low-fee international payments via cryptocurrency. Integrates Firebase backend services, encrypted transaction records, and real-time wallet tracking with cyber-defense practices.",
      category: "Full-Stack",
      tags: ["React.js", "Firebase", "Web3", "JavaScript", "Cybersecurity", "Tailwind CSS"],
      features: [
        "Web project focused on helping freelancers receive international payments using cryptocurrency",
        "Integrated Firebase backend services for realtime authentication and database sync",
        "Protected payment workflows preventing common digital transaction vulnerabilities",
        "Futuristic dark cyber dashboard with instant transfer telemetry"
      ],
      metrics: "Built with Firebase & crypto transaction workflows",
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
      featured: true
    },
    {
      id: "noteshare",
      title: "NoteShare - Collaborative Academic Resource Hub",
      description: "A C-based student project and academic web platform focused on organizing, uploading, and sharing educational notes.",
      longDescription: "Created to eliminate fragmented study resources in college. Enables students from Arya College and beyond to upload lecture notes, previous year question papers (PYQs), and reference guides with peer verification.",
      category: "Full-Stack",
      tags: ["C / C++", "React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      features: [
        "C-based student project architecture focused on organizing educational notes",
        "Subject, department, and semester-wise categorized document repository",
        "Peer verification, rating, and upvote system for resource quality",
        "Fast search and categorization for quick exam preparation"
      ],
      metrics: "Empowering collaborative student learning",
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
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
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
      featured: false
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
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
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
      liveUrl: "https://github.com/Aryan-Jangir-01",
      githubUrl: "https://github.com/Aryan-Jangir-01",
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
        "Specializing in Artificial Intelligence and Data Science with hands-on focus on AI/ML models, system design, and algorithms.",
        "Academic Track Record: Senior Secondary (Class XII) — 85% | Secondary (Class X) — 80%.",
        "Core Coursework: Data Structures & Algorithms, Machine Learning, Database Systems, Computer Networks, and Cybersecurity fundamentals.",
        "Active builder and participant in national hackathons and developer initiatives."
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
