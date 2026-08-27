/**
 * CampusCareer - Demo Data Storage
 * Contains realistic data for opportunities, hackathons, skills, resources, and dashboard student profile.
 */

const CAMPUS_DATA = {
  // Statistics for Animated Counters
  stats: {
    opportunities: 520,
    internships: 145,
    companies: 88,
    hackathons: 32
  },

  // Opportunity Categories
  categories: [
    {
      id: 'internships',
      title: 'Internships',
      icon: '⚡',
      badge: '145+ Open',
      color: '#6C5CE7',
      bgLight: 'rgba(108, 92, 231, 0.1)',
      desc: 'Paid summer & winter internships with top tech startups and MNCs.'
    },
    {
      id: 'jobs',
      title: 'Full-Time Jobs',
      icon: '💼',
      badge: '90+ Active',
      color: '#0984E3',
      bgLight: 'rgba(9, 132, 227, 0.1)',
      desc: 'Graduate engineer roles and entry-level positions for freshers.'
    },
    {
      id: 'placements',
      title: 'Placement Drives',
      icon: '🎓',
      badge: 'Campus Special',
      color: '#00B894',
      bgLight: 'rgba(0, 184, 148, 0.1)',
      desc: 'On-campus and off-campus recruitment drives curated for college grads.'
    },
    {
      id: 'hackathons',
      title: 'Hackathons',
      icon: '🚀',
      badge: '₹15L+ Prizes',
      color: '#FD79A8',
      bgLight: 'rgba(253, 121, 168, 0.1)',
      desc: 'National & global coding hackathons, design sprints, and prize contests.'
    },
    {
      id: 'freelancing',
      title: 'Freelance Gig',
      icon: '💻',
      badge: 'Flexible Hours',
      color: '#E17055',
      bgLight: 'rgba(225, 112, 85, 0.1)',
      desc: 'Short-term project contracts for developers, designers, and tech writers.'
    },
    {
      id: 'part-time',
      title: 'Part-Time Roles',
      icon: '⏰',
      badge: 'Student Friendly',
      color: '#FDCB6E',
      bgLight: 'rgba(253, 203, 110, 0.15)',
      desc: 'Roles with 10-15 hrs/week workload designed around college classes.'
    },
    {
      id: 'campus',
      title: 'Campus Ambassador',
      icon: '🌟',
      badge: 'Leadership',
      color: '#A29BFE',
      bgLight: 'rgba(162, 155, 254, 0.15)',
      desc: 'Represent top tech brands on your campus and gain event management skills.'
    },
    {
      id: 'events',
      title: 'Career Events',
      icon: '📅',
      badge: 'Free Entry',
      color: '#00CEC9',
      bgLight: 'rgba(0, 206, 201, 0.1)',
      desc: 'Tech expos, AMA sessions with founders, and networking workshops.'
    }
  ],

  // Detailed Opportunities
  opportunities: [
    {
      id: 'opp-1',
      title: 'Frontend Engineering Intern',
      company: 'NovaLabs AI',
      companyLogo: 'N',
      logoBg: '#6C5CE7',
      location: 'Bengaluru, India',
      workMode: 'Remote',
      type: 'Internship',
      stipend: '₹35,000 / month',
      stipendNumeric: 35000,
      duration: '6 Months',
      deadline: '2026-09-15',
      postedDate: '2026-08-20',
      skills: ['JavaScript', 'HTML5', 'CSS3', 'UI/UX', 'Git'],
      featured: true,
      description: 'NovaLabs AI is looking for a creative Frontend Engineering Intern to help build responsive, high-performance web interfaces for our generative AI dashboard platform.',
      responsibilities: [
        'Develop clean, responsive HTML/CSS/JS frontend components.',
        'Collaborate with UI designers to transform mockups into pixel-perfect web pages.',
        'Optimize application performance and ensure cross-browser compatibility.',
        'Participate in daily agile standups and code review sessions.'
      ],
      eligibility: [
        'Currently pursuing B.Tech / B.E / BCA in Computer Science or related fields.',
        'Proficiency in JavaScript (ES6+), HTML5, and CSS grid/flexbox.',
        'Familiarity with Git and version control concepts.',
        'Graduating in 2026 or 2027.'
      ]
    },
    {
      id: 'opp-2',
      title: 'Cloud & DevOps Intern',
      company: 'StackCloud Systems',
      companyLogo: 'S',
      logoBg: '#0984E3',
      location: 'Hyderabad, India',
      workMode: 'Hybrid',
      type: 'Internship',
      stipend: '₹40,000 / month',
      stipendNumeric: 40000,
      duration: '6 Months',
      deadline: '2026-09-20',
      postedDate: '2026-08-22',
      skills: ['Docker', 'AWS', 'Linux', 'Bash', 'Git', 'CI/CD'],
      featured: true,
      description: 'Join StackCloud as a DevOps Intern and gain hands-on experience building automated CI/CD pipelines, Docker containerization, and AWS infrastructure management.',
      responsibilities: [
        'Assist in writing Ansible playbooks and Docker containers for deployment.',
        'Configure Nginx web servers and microservices reverse proxies.',
        'Monitor server metrics and container health in staging environments.',
        'Document infrastructure workflows and automation scripts.'
      ],
      eligibility: [
        'B.Tech / M.Tech students with strong fundamentals in Linux commands.',
        'Basic understanding of Docker, networking, and cloud services (AWS/GCP).',
        'Strong problem-solving ability and curiosity for site reliability engineering.'
      ]
    },
    {
      id: 'opp-3',
      title: 'Python Backend Developer',
      company: 'ByteScale Technologies',
      companyLogo: 'B',
      logoBg: '#00B894',
      location: 'Pune, India',
      workMode: 'Onsite',
      type: 'Job',
      stipend: '₹9,50,000 / year',
      stipendNumeric: 79166,
      duration: 'Full-Time',
      deadline: '2026-09-30',
      postedDate: '2026-08-18',
      skills: ['Python', 'SQL', 'REST APIs', 'Git', 'Linux'],
      featured: true,
      description: 'Entry-level full-time role for final-year students passionate about scalable backend architecture, REST API design, and database optimization.',
      responsibilities: [
        'Design and maintain scalable RESTful APIs with Python.',
        'Write clean SQL queries and optimize database indexing.',
        'Integrate third-party authentication and cloud microservices.',
        'Write unit tests and maintain high test coverage.'
      ],
      eligibility: [
        '2026 Batch Graduates (B.Tech / M.Tech / MCA).',
        'Strong knowledge of Python data structures and OOP concepts.',
        'Familiarity with SQL relational databases.'
      ]
    },
    {
      id: 'opp-4',
      title: 'UI/UX Design Intern',
      company: 'PixelCraft Studio',
      companyLogo: 'P',
      logoBg: '#FD79A8',
      location: 'Mumbai, India',
      workMode: 'Remote',
      type: 'Internship',
      stipend: '₹25,000 / month',
      stipendNumeric: 25000,
      duration: '3 Months',
      deadline: '2026-09-10',
      postedDate: '2026-08-25',
      skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'User Research'],
      featured: false,
      description: 'PixelCraft is seeking a talented UI/UX intern to design user-centric interfaces, design systems, and interactive prototypes for consumer web & mobile apps.',
      responsibilities: [
        'Create low and high-fidelity wireframes and user flow diagrams.',
        'Design sleek, colorful web UI components and design systems.',
        'Conduct usability testing with target student user personas.',
        'Collaborate closely with frontend developers during handoff.'
      ],
      eligibility: [
        'Any degree discipline with a portfolio demonstrating UI design projects.',
        'Expertise in Figma or Adobe XD.',
        'Strong visual sense for color theory, typography, and micro-interactions.'
      ]
    },
    {
      id: 'opp-5',
      title: 'Data Analyst Intern',
      company: 'Apex Data Analytics',
      companyLogo: 'A',
      logoBg: '#E17055',
      location: 'Gurugram, India',
      workMode: 'Hybrid',
      type: 'Internship',
      stipend: '₹30,000 / month',
      stipendNumeric: 30000,
      duration: '6 Months',
      deadline: '2026-09-18',
      postedDate: '2026-08-21',
      skills: ['Python', 'SQL', 'Data Analytics', 'Excel', 'PowerBI'],
      featured: false,
      description: 'Transform complex dataset insights into actionable business decisions. Learn real-world data pipeline management, statistical analysis, and interactive dashboards.',
      responsibilities: [
        'Query large datasets using SQL and clean raw data with Python Pandas.',
        'Build interactive dashboards showing weekly product KPI trends.',
        'Identify data anomalies and report growth recommendations to leaders.'
      ],
      eligibility: [
        'Students pursuing Engineering, Mathematics, Statistics, or Economics.',
        'Solid SQL query writing skills and Python data analysis experience.'
      ]
    },
    {
      id: 'opp-6',
      title: 'Cyber Security Analyst Intern',
      company: 'ShieldNet Security',
      companyLogo: 'S',
      logoBg: '#A29BFE',
      location: 'Noida, India',
      workMode: 'Onsite',
      type: 'Internship',
      stipend: '₹28,000 / month',
      stipendNumeric: 28000,
      duration: '4 Months',
      deadline: '2026-09-28',
      postedDate: '2026-08-24',
      skills: ['Linux', 'Networking', 'Python', 'Web Security', 'Git'],
      featured: false,
      description: 'Hands-on role assisting our security operations center in web vulnerability assessment, network penetration testing, and log analysis.',
      responsibilities: [
        'Perform web application vulnerability scans and security code audits.',
        'Monitor threat feeds and analyze system logs for intrusion patterns.',
        'Assist in preparing security compliance documentation.'
      ],
      eligibility: [
        'Students in Computer Science, Information Security, or IT.',
        'Good understanding of TCP/IP, OWASP Top 10, and Linux security tools.'
      ]
    },
    {
      id: 'opp-7',
      title: 'Fullstack Web Developer',
      company: 'Krypton Interactive',
      companyLogo: 'K',
      logoBg: '#00CEC9',
      location: 'Bengaluru, India',
      workMode: 'Remote',
      type: 'Job',
      stipend: '₹12,00,000 / year',
      stipendNumeric: 100000,
      duration: 'Full-Time',
      deadline: '2026-10-05',
      postedDate: '2026-08-26',
      skills: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'SQL', 'Git'],
      featured: true,
      description: 'Fast-growing startup hiring fresh fullstack developers to build scalable student web applications and real-time community tools.',
      responsibilities: [
        'Build end-to-end web features from database tables to client UI.',
        'Maintain high performance, security, and responsive layouts.',
        'Integrate third-party web APIs and payment gateways.'
      ],
      eligibility: [
        '2025/2026 Batch Graduates with strong project portfolio.',
        'Deep understanding of JavaScript, HTML/CSS, and backend API integration.'
      ]
    },
    {
      id: 'opp-8',
      title: 'AI & Machine Learning Intern',
      company: 'NeuralGrid Systems',
      companyLogo: 'N',
      logoBg: '#6C5CE7',
      location: 'Hyderabad, India',
      workMode: 'Remote',
      type: 'Internship',
      stipend: '₹45,000 / month',
      stipendNumeric: 45000,
      duration: '6 Months',
      deadline: '2026-09-22',
      postedDate: '2026-08-23',
      skills: ['Python', 'Machine Learning', 'Data Analytics', 'Git', 'SQL'],
      featured: true,
      description: 'Work alongside senior AI researchers building custom natural language processing algorithms and predictive analytics engines.',
      responsibilities: [
        'Preprocess training datasets and fine-tune open-source ML models.',
        'Evaluate model precision, recall, and benchmark latency metrics.',
        'Deploy trained models as lightweight microservice REST endpoints.'
      ],
      eligibility: [
        'Pursuing B.Tech / M.Tech / MS in CS or Data Science.',
        'Experience with Python scientific libraries (NumPy, Scikit-Learn, PyTorch).'
      ]
    },
    {
      id: 'opp-9',
      title: 'Mobile App Developer Intern',
      company: 'AppPulse Mobility',
      companyLogo: 'A',
      logoBg: '#FDCB6E',
      location: 'Chennai, India',
      workMode: 'Hybrid',
      type: 'Internship',
      stipend: '₹22,000 / month',
      stipendNumeric: 22000,
      duration: '3 Months',
      deadline: '2026-09-12',
      postedDate: '2026-08-19',
      skills: ['JavaScript', 'UI/UX', 'REST APIs', 'Git'],
      featured: false,
      description: 'Build sleek mobile user interfaces, connect device APIs, and deliver smooth 60fps animations for our student navigation app.',
      responsibilities: [
        'Implement UI screens following human interface design guidelines.',
        'Connect mobile screens to backend JSON REST services.',
        'Test app builds across various iOS and Android screen resolutions.'
      ],
      eligibility: [
        'College student with personal app projects on GitHub or Play Store.',
        'Strong JavaScript knowledge and clean code practices.'
      ]
    },
    {
      id: 'opp-10',
      title: 'Technical Content Writer',
      company: 'DevDocs Media',
      companyLogo: 'D',
      logoBg: '#FD79A8',
      location: 'Remote',
      workMode: 'Remote',
      type: 'Part-time',
      stipend: '₹18,000 / month',
      stipendNumeric: 18000,
      duration: '6 Months',
      deadline: '2026-09-25',
      postedDate: '2026-08-24',
      skills: ['Git & GitHub', 'Docker', 'Linux', 'Technical Writing'],
      featured: false,
      description: 'Write engaging developer guides, Docker tutorials, and Linux tips for a developer community with 100k+ readers.',
      responsibilities: [
        'Author step-by-step technical guides with code samples.',
        'Review and test CLI commands for accuracy before publishing.',
        'Create simple diagrams illustrating architecture concepts.'
      ],
      eligibility: [
        'Engineering students with a flair for clear technical explanation.',
        'Basic familiarity with DevOps tools like Git, Linux, and Docker.'
      ]
    },
    {
      id: 'opp-11',
      title: 'Campus Growth Lead',
      company: 'Unstop & Learn',
      companyLogo: 'U',
      logoBg: '#0984E3',
      location: 'Multiple Campuses',
      workMode: 'Remote',
      type: 'Campus Ambassador',
      stipend: '₹12,000 + Perks',
      stipendNumeric: 12000,
      duration: '4 Months',
      deadline: '2026-10-01',
      postedDate: '2026-08-25',
      skills: ['Leadership', 'Event Management', 'Public Speaking', 'Social Media'],
      featured: false,
      description: 'Lead campus career initiatives, host virtual coding hackathons, and build a thriving tech community at your college.',
      responsibilities: [
        'Organize workshops and spread awareness about national contests.',
        'Act as the primary liaison between your college and our team.',
        'Mentor junior students on accessing career preparation resources.'
      ],
      eligibility: [
        'Active college student in 1st, 2nd, or 3rd year.',
        'Strong communication and campus networking skills.'
      ]
    },
    {
      id: 'opp-12',
      title: 'QA Automation Intern',
      company: 'TestRig Technologies',
      companyLogo: 'T',
      logoBg: '#00B894',
      location: 'Ahmedabad, India',
      workMode: 'Onsite',
      type: 'Internship',
      stipend: '₹20,000 / month',
      stipendNumeric: 20000,
      duration: '3 Months',
      deadline: '2026-09-16',
      postedDate: '2026-08-21',
      skills: ['Python', 'JavaScript', 'Git', 'Testing'],
      featured: false,
      description: 'Learn automated software testing workflows, regression test scripting, and bug tracking in high-load web applications.',
      responsibilities: [
        'Write test cases based on user story specifications.',
        'Execute automated UI and API test suites.',
        'Log bugs in issue trackers with clear steps to reproduce.'
      ],
      eligibility: [
        'Pursuing B.Tech / BCA / BSc CS.',
        'Basic programming knowledge in Python or JavaScript.'
      ]
    }
  ],

  // Hackathons & Tech Contests
  hackathons: [
    {
      id: 'hack-1',
      name: 'HackCloud 2026',
      organizer: 'AWS Student Club & CampusCareer',
      prizePool: '₹5,00,000',
      date: 'Sep 24-26, 2026',
      mode: 'Online',
      deadline: '2026-09-20',
      tags: ['Cloud', 'DevOps', 'Docker', 'Serverless'],
      description: '48-hour national hackathon focused on building cloud-native applications, microservices, and containerized dev pipelines.'
    },
    {
      id: 'hack-2',
      name: 'GenAI Innovate Sprint',
      organizer: 'OpenAI Campus Network',
      prizePool: '₹3,50,000',
      date: 'Oct 02-04, 2026',
      mode: 'Hybrid',
      deadline: '2026-09-28',
      tags: ['AI/ML', 'Python', 'LLMs', 'Web Development'],
      description: 'Build practical AI agents, student productivity tools, and automated workflow assistants using open models.'
    },
    {
      id: 'hack-3',
      name: 'DevOps Buildathon 3.0',
      organizer: 'Linux Foundation Student Chapter',
      prizePool: '₹2,00,000',
      date: 'Oct 15-16, 2026',
      mode: 'Online',
      deadline: '2026-10-10',
      tags: ['DevOps', 'Terraform', 'Ansible', 'Linux', 'Docker'],
      description: 'Demonstrate zero-downtime automated deployment pipelines using infrastructure as code and Nginx web servers.'
    },
    {
      id: 'hack-4',
      name: 'UI/UX Redesign Clash',
      organizer: 'Design Tribe Global',
      prizePool: '₹1,50,000',
      date: 'Oct 20-22, 2026',
      mode: 'Online',
      deadline: '2026-10-16',
      tags: ['UI/UX', 'Figma', 'Prototyping', 'Design System'],
      description: 'Redesign popular student portals into modern, colorful, accessible web & mobile interfaces.'
    }
  ],

  // Skill Recommendation Paths
  skillPaths: {
    frontend: {
      title: 'Frontend Developer Path',
      icon: '🎨',
      targetRoles: ['Frontend Engineer', 'UI Developer', 'Web Developer'],
      skills: [
        { name: 'HTML5 & Semantic Markup', level: 'Essential', color: '#E17055', desc: 'Structure web content cleanly with accessible elements.' },
        { name: 'CSS3, Flexbox & Grid', level: 'Essential', color: '#0984E3', desc: 'Master layouts, glassmorphism UI, and keyframe animations.' },
        { name: 'Vanilla JavaScript (ES6+)', level: 'Core', color: '#FDCB6E', desc: 'DOM manipulation, Async/Await, Fetch API, LocalStorage.' },
        { name: 'Git & Version Control', level: 'Core', color: '#FD79A8', desc: 'Branching, PRs, merge conflict resolution, GitHub pages.' },
        { name: 'Performance & Responsive Design', level: 'Advanced', color: '#6C5CE7', desc: 'Mobile-first design, fast render cycles, lighthouse audit.' }
      ]
    },
    devops: {
      title: 'DevOps & Cloud Engineer Path',
      icon: '⚙️',
      targetRoles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)'],
      skills: [
        { name: 'Linux Commands & Shell Scripting', level: 'Essential', color: '#00CEC9', desc: 'Bash scripting, file permissions, process management.' },
        { name: 'Git & Automated Workflows', level: 'Essential', color: '#FD79A8', desc: 'GitHub Actions, CI/CD pipeline automation.' },
        { name: 'Docker Containerization', level: 'Core', color: '#0984E3', desc: 'Writing Dockerfiles, multi-stage builds, Docker Compose.' },
        { name: 'Nginx & Web Servers', level: 'Core', color: '#00B894', desc: 'Reverse proxies, SSL certificates, static content hosting.' },
        { name: 'Terraform & Infrastructure as Code', level: 'Advanced', color: '#6C5CE7', desc: 'Automating AWS EC2, Security Groups, and Cloud Provisioning.' },
        { name: 'Ansible Configuration Management', level: 'Advanced', color: '#E17055', desc: 'Server provisioning, container orchestration scripts.' }
      ]
    },
    data: {
      title: 'Data Analyst & Python Path',
      icon: '📊',
      targetRoles: ['Data Analyst', 'Business Intelligence Developer', 'Python Programmer'],
      skills: [
        { name: 'Python Core Fundamentals', level: 'Essential', color: '#3776AB', desc: 'Functions, data structures, file handling, modules.' },
        { name: 'SQL & Relational Databases', level: 'Essential', color: '#00B894', desc: 'Joins, aggregations, CTEs, indexing, query optimization.' },
        { name: 'Pandas & NumPy', level: 'Core', color: '#6C5CE7', desc: 'Data cleaning, transformation, statistical operations.' },
        { name: 'Data Visualization (Matplotlib/PowerBI)', level: 'Core', color: '#FDCB6E', desc: 'Interactive charts, dashboard storytelling.' },
        { name: 'Git & Reproducible Analysis', level: 'Advanced', color: '#FD79A8', desc: 'Jupyter notebook versioning and automated reporting.' }
      ]
    },
    fullstack: {
      title: 'Fullstack Web Engineer Path',
      icon: '🚀',
      targetRoles: ['Fullstack Developer', 'Software Development Engineer (SDE)'],
      skills: [
        { name: 'Frontend Tech Stack (HTML/CSS/JS)', level: 'Essential', color: '#0984E3', desc: 'Pixel-perfect web interfaces and client state handling.' },
        { name: 'Backend REST API Design', level: 'Core', color: '#00B894', desc: 'HTTP methods, JSON payloads, authentication flow.' },
        { name: 'Database Management (SQL)', level: 'Core', color: '#6C5CE7', desc: 'Database schema design and relational queries.' },
        { name: 'Docker & Basic Deployment', level: 'Advanced', color: '#E17055', desc: 'Containerizing apps for zero-downtime server hosting.' }
      ]
    }
  },

  // Career Resources Guides
  resources: [
    {
      id: 'res-1',
      title: 'Technical Interview Preparation Guide',
      category: 'Interview Prep',
      icon: '🧠',
      color: '#6C5CE7',
      summary: 'Master Data Structures, Algorithms, System Design fundamentals, and core CS subjects.',
      bulletPoints: [
        'Top 50 Data Structures & Algorithm patterns explained visually.',
        'How to articulate your thought process during live coding tests.',
        'System design basics: Load balancers, caching, databases, and APIs.'
      ]
    },
    {
      id: 'res-2',
      title: 'ATS-Friendly Student Resume Blueprint',
      category: 'Resume Tips',
      icon: '📄',
      color: '#0984E3',
      summary: 'Craft a high-scoring resume that passes Applicant Tracking Systems with ease.',
      bulletPoints: [
        'Single-page clean layout format loved by tech recruiters.',
        'Action verbs and quantifiable achievement formulas (Action + Metric + Result).',
        'How to list college projects and GitHub repositories effectively.'
      ]
    },
    {
      id: 'res-3',
      title: 'Quantitative Aptitude & Logic Mastery',
      category: 'Aptitude',
      icon: '📐',
      color: '#00B894',
      summary: 'Ace campus placement round-1 screening tests with speed techniques.',
      bulletPoints: [
        'Shortcut formulas for time & distance, probability, and percentages.',
        'Logical reasoning matrix puzzles and data interpretation strategy.',
        'Timed practice test strategies for campus recruitment drives.'
      ]
    },
    {
      id: 'res-4',
      title: 'Coding Practice Roadmap & Platforms',
      category: 'Coding Practice',
      icon: '💻',
      color: '#FD79A8',
      summary: 'Structured weekly coding plan to build problem-solving muscle.',
      bulletPoints: [
        '75 must-do coding questions grouped by topic.',
        'Time & space complexity analysis (Big-O notation guide).',
        'How to transition from easy to medium-hard algorithmic problems.'
      ]
    },
    {
      id: 'res-5',
      title: 'Group Discussion & Communication Skills',
      category: 'Group Discussion',
      icon: '🗣️',
      color: '#E17055',
      summary: 'Stand out in college placement GD rounds with confident articulation.',
      bulletPoints: [
        'How to initiate a topic and summarize effectively.',
        'Structuring points using the P.E.E.L method (Point, Evidence, Explanation, Link).',
        'Handling conflicting viewpoints gracefully without arguing.'
      ]
    },
    {
      id: 'res-6',
      title: 'HR & Behavioral Interview Toolkit',
      category: 'HR Interview',
      icon: '🤝',
      color: '#FDCB6E',
      summary: 'Answer "Tell me about yourself" and STAR methodology questions with impact.',
      bulletPoints: [
        'The S.T.A.R technique (Situation, Task, Action, Result) template.',
        'Handling questions about weaknesses, career goals, and team conflict.',
        'Smart questions to ask your interviewer at the end of the meeting.'
      ]
    },
    {
      id: 'res-7',
      title: 'LinkedIn Optimization for Students',
      category: 'LinkedIn Tips',
      icon: '🌐',
      color: '#00CEC9',
      summary: 'Turn your profile into a magnet for recruiters and tech founders.',
      bulletPoints: [
        'Writing a headline that captures your target engineering role.',
        'How to send personalized connection requests that get accepted.',
        'Showcasing certificates, hackathon wins, and open-source contributions.'
      ]
    },
    {
      id: 'res-8',
      title: 'GitHub Portfolio & Open Source Guide',
      category: 'GitHub Tips',
      icon: '⭐',
      color: '#A29BFE',
      summary: 'Make your GitHub profile look professional with clean READMEs and commit history.',
      bulletPoints: [
        'Designing a modern GitHub profile README with tech stack badges.',
        'Writing clear commit messages and project documentation.',
        'Finding beginner-friendly "good first issues" in open source.'
      ]
    }
  ],

  // Student Profile Demo Data (For Dashboard)
  studentProfile: {
    name: 'Aarav Sharma',
    college: 'National Institute of Technology',
    degree: 'B.Tech in Computer Science',
    year: '3rd Year (Class of 2027)',
    avatarInitials: 'AS',
    gpa: '8.8 / 10',
    profileCompletion: 85,
    email: 'aarav.sharma@campus.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    github: 'github.com/aarav-dev',
    linkedin: 'linkedin.com/in/aaravsharma-dev',
    skills: ['Python', 'JavaScript', 'HTML5/CSS3', 'Docker', 'Git & GitHub', 'Linux', 'SQL'],
    stats: {
      applied: 6,
      shortlisted: 3,
      interviews: 2,
      saved: 4
    },
    applications: [
      {
        id: 'app-101',
        company: 'NovaLabs AI',
        role: 'Frontend Engineering Intern',
        appliedDate: '2026-08-21',
        status: 'Interview',
        statusIndex: 2, // 0: Applied, 1: Shortlisted, 2: Interview, 3: Selected
        nextStep: 'Technical Interview round scheduled for Sep 2, 2026 at 2:00 PM.'
      },
      {
        id: 'app-102',
        company: 'StackCloud Systems',
        role: 'Cloud & DevOps Intern',
        appliedDate: '2026-08-23',
        status: 'Shortlisted',
        statusIndex: 1,
        nextStep: 'Resume shortlisted. Online assessment link sent to email.'
      },
      {
        id: 'app-103',
        company: 'ByteScale Technologies',
        role: 'Python Backend Developer',
        appliedDate: '2026-08-25',
        status: 'Applied',
        statusIndex: 0,
        nextStep: 'Application under review by talent acquisition team.'
      },
      {
        id: 'app-104',
        company: 'NeuralGrid Systems',
        role: 'AI & Machine Learning Intern',
        appliedDate: '2026-08-19',
        status: 'Selected',
        statusIndex: 3,
        nextStep: 'Offer letter generated! Offer acceptance deadline: Sep 5, 2026.'
      }
    ]
  }
};
