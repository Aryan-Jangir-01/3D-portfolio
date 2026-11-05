import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "Aryan Jangir",
  handle: "aryanjangir",
  title: "Full-Stack Engineer & Creative Developer",
  roles: [
    "Full-Stack Architect",
    "Creative Web Engineer",
    "AI Systems Enthusiast",
    "Performance Optimization Geek"
  ],
  location: "India (IST)",
  timezone: "Asia/Kolkata",
  email: "aryanjangir0805@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  bio: "I design and build ultra-responsive, resilient digital experiences and scalable backends. Blending high-performance architecture with cutting-edge visual craft.",
  
  aboutHighlights: [
    {
      label: "Code Crafting",
      value: "3+ Years",
      subtext: "Delivering modern web & systems",
      icon: "Code2"
    },
    {
      label: "Projects Shipped",
      value: "20+",
      subtext: "From concept to production",
      icon: "Rocket"
    },
    {
      label: "Performance Benchmark",
      value: "99+",
      subtext: "Lighthouse core web vitals",
      icon: "Zap"
    },
    {
      label: "Problem Solving",
      value: "500+",
      subtext: "DSA & Algorithmic challenges",
      icon: "Brain"
    }
  ],

  philosophies: [
    "Performance is not an afterthought; it's a fundamental feature.",
    "User interfaces should feel responsive, alive, and effortless.",
    "Clean, maintainable code scales teams just as much as systems."
  ],

  skills: [
    {
      name: "Frontend Mastery",
      icon: "Layout",
      skills: [
        { name: "React / Next.js", level: 95, description: "SSR, Server Components, Hooks, State Management" },
        { name: "TypeScript", level: 90, description: "Type-safety, Generics, Complex type architectures" },
        { name: "Tailwind CSS", level: 96, description: "Design systems, Responsive layouts, Animations" },
        { name: "Three.js / Canvas", level: 80, description: "Interactive 3D particle systems & physics" },
        { name: "Framer Motion", level: 88, description: "Gestures, Orchestrated micro-interactions" }
      ]
    },
    {
      name: "Backend & Systems",
      icon: "Server",
      skills: [
        { name: "Node.js / Express", level: 92, description: "REST APIs, Event-driven architecture" },
        { name: "Python / FastAPI", level: 85, description: "Async microservices & data processing" },
        { name: "PostgreSQL & Prisma", level: 88, description: "Relational modeling, Indexing, Query optimization" },
        { name: "MongoDB & Redis", level: 86, description: "Caching, Pub/Sub, Document storage" },
        { name: "GraphQL & gRPC", level: 82, description: "Efficient API communication protocols" }
      ]
    },
    {
      name: "DevOps & Cloud",
      icon: "Cloud",
      skills: [
        { name: "Docker & Containers", level: 84, description: "Multi-stage builds, Containerization" },
        { name: "CI/CD Pipelines", level: 86, description: "GitHub Actions, Automated testing & linting" },
        { name: "AWS / Cloudflare", level: 80, description: "S3, Lambda, Cloudflare Workers, Edge caching" },
        { name: "Linux & Shell Scripting", level: 88, description: "Bash, Server orchestration, System monitoring" }
      ]
    },
    {
      name: "AI & Emerging Tech",
      icon: "Cpu",
      skills: [
        { name: "LLM Orchestration", level: 88, description: "LangChain, RAG pipelines, Prompt Engineering" },
        { name: "Vector Databases", level: 82, description: "Pinecone, Chroma, Semantic search" },
        { name: "WebSockets & WebRTC", level: 85, description: "Real-time communication & live sync" },
        { name: "Git & Agile Workflow", level: 94, description: "Trunk-based development, Code reviews" }
      ]
    }
  ],

  projects: [
    {
      id: "nexus-ai",
      title: "NexusAI - Autonomous Multi-Agent Workspace",
      description: "An intelligent collaborative workspace orchestrating multiple specialized autonomous AI agents to research, write code, and synthesize complex insights.",
      longDescription: "NexusAI delivers an interactive environment where users can delegate multi-stage tasks to teams of autonomous AI agents. Features streaming SSE responses, dynamic canvas flowcharts, persistent vector search, and edge function execution.",
      category: "AI / ML",
      tags: ["React", "TypeScript", "Python FastAPI", "LangChain", "Vector DB", "Tailwind CSS"],
      features: [
        "Real-time multi-agent orchestration with visual state machine",
        "Semantic search powered by high-dimensional vector embeddings",
        "Interactive markdown sandbox with instant code execution previews",
        "60fps responsive glassmorphism UI with dark theme support"
      ],
      metrics: "Sub-100ms response time with edge streaming",
      liveUrl: "https://example.com/nexus-ai",
      githubUrl: "https://github.com/aryanjangir/nexus-ai",
      featured: true
    },
    {
      id: "hyper-forge",
      title: "HyperForge - Cloud Infrastructure Visualizer",
      description: "A drag-and-drop cloud architecture diagramming tool that compiles visual topologies into production-ready Terraform and Pulumi scripts.",
      longDescription: "HyperForge transforms cloud architecture design. Engineers map nodes, load balancers, VPCs, and databases visually while HyperForge calculates estimated monthly AWS/GCP costs and generates automated IaC deployment templates.",
      category: "Full-Stack",
      tags: ["Next.js", "TypeScript", "Canvas API", "Terraform", "PostgreSQL", "Tailwind"],
      features: [
        "Interactive infinite canvas with magnetic grid snapping",
        "Real-time cost calculator integrated with AWS Pricing API",
        "Instant one-click Terraform HCL & Docker Compose export",
        "Multiplayer cursor collaboration with WebSockets"
      ],
      metrics: "Reduces IaC drafting time by 65%",
      liveUrl: "https://example.com/hyper-forge",
      githubUrl: "https://github.com/aryanjangir/hyper-forge",
      featured: true
    },
    {
      id: "chronos-terminal",
      title: "Chronos OS - Web-Based UNIX Environment",
      description: "A lightweight, in-browser operating system featuring an interactive terminal, window manager, file system in IndexedDB, and retro sound synthesizer.",
      longDescription: "Chronos OS provides a complete desktop and shell environment in the browser. It includes custom piping, vim-like editor, package manager simulations, and audio synthesizers built with Web Audio API.",
      category: "Systems / Web3",
      tags: ["TypeScript", "Web Audio API", "IndexedDB", "React", "CSS Modules"],
      features: [
        "POSIX-compliant command interpreter with command chaining",
        "Persistent client-side virtual file system with quota controls",
        "Retro 8-bit sound chip synthesizer simulation",
        "Custom window manager with snapping, minimizing, and z-index ordering"
      ],
      metrics: "Zero dependencies, 45KB gzipped payload",
      liveUrl: "https://example.com/chronos",
      githubUrl: "https://github.com/aryanjangir/chronos-os",
      featured: true
    },
    {
      id: "pulse-metrics",
      title: "Pulse - Real-Time Distributed Telemetry Dashboard",
      description: "High-throughput telemetry and anomaly detection platform processing live server metrics with sub-second alerting and interactive heatmaps.",
      longDescription: "Engineered to monitor distributed microservices with minimal overhead. Consumes Kafka streams, aggregates time-series data with Redis Timeseries, and visualizes CPU/Memory spikes with WebGL heatmaps.",
      category: "Full-Stack",
      tags: ["Go", "React", "TypeScript", "Redis", "TimescaleDB", "Docker"],
      features: [
        "Handles 100k+ events/sec throughput with automated backpressure",
        "Interactive WebGL time-series charts with zero frame drops",
        "Rule-based smart alert routing via Discord & Slack webhooks",
        "Role-based access control with audited security tokens"
      ],
      metrics: "99.99% uptime benchmark across 12 nodes",
      liveUrl: "https://example.com/pulse",
      githubUrl: "https://github.com/aryanjangir/pulse-telemetry",
      featured: false
    },
    {
      id: "zenith-exchange",
      title: "Zenith - Low-Latency Crypto Order Book Simulator",
      description: "A simulated high-frequency trading interface featuring WebSocket order feeds, depth chart visualizations, and algorithmic limit order matching.",
      longDescription: "Designed to experiment with trading engine mechanics. Implements an in-memory price-time priority matching engine in TypeScript with sub-millisecond fill times and realistic slippage simulation.",
      category: "Systems / Web3",
      tags: ["TypeScript", "WebSockets", "React", "Canvas", "Tailwind CSS"],
      features: [
        "In-memory order book with price-time priority matching engine",
        "Real-time dynamic Depth Chart rendered using Canvas 2D API",
        "Simulated algorithmic trader bots generating realistic liquidity",
        "Sound feedback for order placements, fills, and market shocks"
      ],
      metrics: "< 5ms order book update latency",
      liveUrl: "https://example.com/zenith",
      githubUrl: "https://github.com/aryanjangir/zenith-exchange",
      featured: false
    }
  ],

  experiences: [
    {
      id: "exp-1",
      role: "Lead Full-Stack Developer",
      company: "InnovateTech Labs",
      period: "2024 - Present",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: [
        "Architected scalable cloud microservices reducing server response times by 35%.",
        "Spearheaded design and migration to a unified React + TypeScript design system adopted across 4 major products.",
        "Mentored junior engineers and led bi-weekly technical design reviews for code quality."
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
      link: "https://example.com"
    },
    {
      id: "exp-2",
      role: "Software Engineering Intern / Freelancer",
      company: "Apex Digital Solutions",
      period: "2023 - 2024",
      location: "India",
      type: "Contract",
      description: [
        "Built dynamic client dashboards and automated CI/CD deployments on Cloudflare and Vercel.",
        "Integrated AI search tools reducing user inquiry resolution time by 50%.",
        "Achieved 100/100 Lighthouse performance and SEO scores on client portfolio portals."
      ],
      technologies: ["Next.js", "Tailwind CSS", "FastAPI", "Redis", "Framer Motion"],
      link: "https://example.com"
    },
    {
      id: "exp-3",
      role: "Open Source Contributor & Builder",
      company: "Developer Community",
      period: "2022 - Present",
      location: "Global",
      type: "Open Source",
      description: [
        "Contributed bug fixes and developer documentation to widely-used React and UI component repositories.",
        "Built developer utility CLI tools with 1,000+ downloads on npm registry.",
        "Authored comprehensive architectural articles on modern web performance."
      ],
      technologies: ["TypeScript", "Node.js", "Web APIs", "Git", "GitHub Actions"]
    }
  ]
};
