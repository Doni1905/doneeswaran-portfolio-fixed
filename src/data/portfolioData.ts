export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'DevOps & Cloud' | 'Edge AI & IoT' | 'Full Stack';
  problem: string;
  solution: string;
  outcome: string; // The quantified metric
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureHighlight: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  metrics: string[];
  technologies: string[];
}

export interface Publication {
  title: string;
  conference: string;
  year: string;
  summary: string;
  metric: string;
  tags: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  badgeType: 'Snowflake' | 'Google' | 'AWS';
}

export const PERSONAL_INFO = {
  name: "Doneeswaran J",
  title: "Cloud, DevOps & AI Systems Engineer",
  tagline: "Final-year B.Tech in AI & ML with hands-on production DevOps experience across Amazon EKS, Argo CD GitOps, and Crossplane.",
  location: "Chennai, Tamil Nadu, India",
  email: "Doneeswaran05@gmail.com",
  phone: "+91-9360083400",
  github: "https://github.com/Doneeswaran",
  todosRepo: "https://github.com/Doni1905/TODOS",
  status: "Seeking Cloud Engineering, DevOps & Backend Engineering roles (2027 Batch)",
  about: "I bridge the gap between production Cloud Infrastructure (Kubernetes, GitOps, IaC) and AI Systems. Having shipped enterprise dashboards to Amazon EKS during my internship at TPConnects Dubai and published deep learning research at IEEE ICIDCA 2025, I focus on deterministic deployments, container observability, and high-performance edge architectures.",
};

export const EXPERIENCES: Experience[] = [
  {
    company: "TPConnects Technologies LLC",
    role: "DevOps Intern",
    location: "Dubai, UAE",
    period: "July 2026 – September 2026",
    type: "Production Internship",
    achievements: [
      "Helped take CrossView, the company's enterprise dashboards application, to production on Amazon EKS, supporting the Aurora PostgreSQL migration, ALB + TLS ingress setup, and GitOps rollout with Argo CD ApplicationSets.",
      "Provisioned AWS infrastructure with Crossplane (infrastructure as code) and managed Kubernetes secrets with External Secrets Operator and EKS Pod Identity.",
      "Migrated Redis from Amazon ElastiCache to an in-cluster EKS deployment, and triaged an OOMKilled incident on the dashboard pods, proposing container memory-limit fixes.",
    ],
    metrics: [
      "Production EKS Rollout",
      "GitOps via Argo CD",
      "OOMKilled Incident Triage",
      "Crossplane IaC",
    ],
    technologies: ["Amazon EKS", "Argo CD", "Crossplane", "Aurora PostgreSQL", "AWS ALB", "Redis", "External Secrets Operator", "Kubernetes"],
  },
  {
    company: "IEEE CIS Student Branch",
    role: "IoT Junior Associate & Head",
    location: "Rajalakshmi Engineering College",
    period: "2024 – 2025",
    type: "Student Leadership",
    achievements: [
      "Ran 5+ hands-on IoT and embedded workshops for 50+ students covering ESP32, Arduino, and real-time sensor integration.",
      "Mentored 10+ junior engineers in building IoT telemetry prototypes.",
      "Spearheaded 3 hardware-software integrated projects demonstrated at the college technical symposium.",
    ],
    metrics: [
      "5+ Workshops Led",
      "50+ Students Trained",
      "3 Symposium Projects",
    ],
    technologies: ["ESP32", "Arduino", "MQTT", "Sensor Protocols", "C++", "Python"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "todos-kanban",
    title: "TODOS - Enterprise Kanban GitOps Engine",
    subtitle: "Production-grade microservices deployment on Amazon EKS",
    period: "2026",
    category: "DevOps & Cloud",
    problem: "Manual multi-stage releases and disjointed container builds slowed engineering turnaround and risked cluster configuration drift.",
    solution: "Architected a self-deployed Kanban web application (Flask + MySQL) on Amazon EKS using automated multi-architecture Docker builds, Helm chart packaging, and pull-based GitOps synchronization via Argo CD.",
    outcome: "Zero-touch pull-based GitOps deployment behind AWS ALB with multi-architecture container images and automated secret injection.",
    stack: ["Amazon EKS", "Kubernetes", "Helm", "Argo CD", "Flask", "MySQL", "Docker", "AWS ALB"],
    githubUrl: "https://github.com/Doni1905/TODOS",
    architectureHighlight: "Argo CD ApplicationSets + Helm Chart versioning + AWS ALB Ingress",
  },
  {
    id: "currency-hub",
    title: "Currency Recognition Hub",
    subtitle: "Assistive Edge-AI Vision for Visually Impaired",
    period: "2025",
    category: "Edge AI & IoT",
    problem: "Visually impaired individuals face tactile uncertainty in paper currency transactions, while cloud API vision models incur unaffordable latency and recurring API costs.",
    solution: "Built a standalone embedded edge device using ESP32-CAM and OpenCV running lightweight SIFT and HSV color feature matching with real-time text-to-speech audio feedback and a local Flask dashboard.",
    outcome: "Sub-200ms real-time edge inference with ~94% recognition accuracy across 5 currency denominations at zero cloud inference cost.",
    stack: ["ESP32-CAM", "OpenCV", "Flask", "SIFT", "HSV Color Space", "Edge AI", "TTS Engine"],
    architectureHighlight: "Low-power hardware accelerated feature extraction on micro-camera feed",
  },
  {
    id: "ai-transcription",
    title: "Cloud-Based AI Transcription Platform",
    subtitle: "High-throughput asynchronous Whisper speech-to-text pipeline",
    period: "2025",
    category: "DevOps & Cloud",
    problem: "Heavy Whisper ASR audio processing blocked HTTP request threads, resulting in connection timeouts and 20-minute manual SSH deployment cycles.",
    solution: "Deployed containerized Whisper workers on AWS EC2 backed by Amazon S3 storage and asynchronous job queues. Automated end-to-end continuous integration and deployment with GitHub Actions.",
    outcome: "Cut deployment pipeline from 20 minutes to under 3 minutes; asynchronous queueing cut user-facing wait times by ~35% under concurrent load.",
    stack: ["AWS EC2", "AWS S3", "Docker", "OpenAI Whisper", "GitHub Actions", "Python", "Async Queue"],
    architectureHighlight: "Asynchronous task worker model with automated GitHub Actions CI/CD to AWS",
  },
  {
    id: "eduease",
    title: "EDUEASE - Role-Based OD Approval System",
    subtitle: "Automated workflow management with granular RBAC",
    period: "2024",
    category: "Full Stack",
    problem: "Paper-based on-duty approval workflows caused 2 to 3 days of administrative latency across student, faculty, and head-of-department handoffs.",
    solution: "Engineered a full-stack role-based access control (RBAC) web application with cryptographic session management and hierarchical approval stages.",
    outcome: "Cut bureaucratic approval turnaround from 2–3 days down to under 4 hours with audit logs.",
    stack: ["Flask", "MySQL", "JavaScript", "RBAC Auth", "REST APIs"],
    architectureHighlight: "Multi-tiered role state machine with instant email trigger notifications",
  },
];

export const RESEARCH: Publication = {
  title: "A Hybrid LSTM-STGNN Framework for Reliable Earthquake Magnitude Prediction",
  conference: "Accepted & Published at IEEE ICIDCA 2025",
  year: "2025",
  summary: "Proposed and validated a novel deep learning architecture fusing Long Short-Term Memory (LSTM) temporal networks and Spatial-Temporal Graph Neural Networks (STGNN) to model complex tectonic topological interactions and seismic telemetry.",
  metric: "12% lower RMSE than baseline LSTM benchmarks across spatial faultline stations",
  tags: ["Spatial-Temporal GNN", "LSTM", "Seismic Telemetry", "Deep Learning", "IEEE ICIDCA"],
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "SnowPro Associate: Platform Certification",
    issuer: "Snowflake",
    date: "May 2026",
    badgeType: "Snowflake",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "Verified",
    badgeType: "Google",
  },
  {
    title: "Cloud Computing, Machine Learning & Generative AI",
    issuer: "AWS Educate — Amazon Web Services",
    date: "Verified",
    badgeType: "AWS",
  },
];

export const SKILL_CATEGORIES = [
  {
    category: "Cloud & DevOps",
    skills: ["Amazon EKS", "AWS (EC2, S3, Aurora, ElastiCache, SES, SNS, CloudWatch)", "Kubernetes", "Docker", "Helm", "Argo CD (GitOps)", "Crossplane (IaC)", "External Secrets Operator", "NGINX", "GitHub Actions CI/CD", "Linux Admin"],
  },
  {
    category: "Programming & Systems",
    skills: ["Python", "C++", "JavaScript", "Bash/Shell Scripting", "HTML/CSS", "SQL (MySQL, Aurora PostgreSQL)"],
  },
  {
    category: "AI, ML & Edge Systems",
    skills: ["TensorFlow", "Keras", "Scikit-learn", "OpenCV", "Whisper ASR", "LSTM", "STGNN", "Edge AI", "MLOps"],
  },
  {
    category: "IoT & Hardware Embedded",
    skills: ["ESP32-CAM", "Arduino", "MQTT", "I2C / SPI / UART", "GPIO", "Real-Time Sensor Telemetry"],
  },
  {
    category: "Web & Tools",
    skills: ["Node.js", "Flask", "REST APIs", "Pandas", "NumPy", "Git", "GitHub", "Jupyter", "n8n"],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech - Artificial Intelligence and Machine Learning (Lateral Entry)",
    institution: "Rajalakshmi Engineering College, Chennai (Anna University)",
    period: "2024 – 2027 (Expected)",
    badge: "Final Year Student",
  },
  {
    degree: "Diploma - Electronics and Robotics Engineering",
    institution: "Swamy Abedhanandha Polytechnic College, Tiruvannamalai (DOTE)",
    period: "2021 – 2024",
    badge: "First Class with Distinction",
  },
];
