export interface StudentProfile {
  name: string;
  id: string;
  program: string;
  year: string;
  avatarUrl: string;
  notificationsCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: "Urgent" | "Academic" | "Campus Life" | "Career";
  time: string;
  summary: string;
  author: string;
  read: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  clubId?: string;
  category: "Hackathon" | "Tech & AI" | "Career" | "Social" | "Academic" | "Sports" | "Competitive Programming" | "Cultural" | string;
  date: string;
  time: string;
  location: string;
  attendeesCount: number;
  maxCapacity: number;
  featured?: boolean;
  tags: string[];
  description: string;
  rsvpd?: boolean;
  badge?: string;
  ticketHash?: string;
}

export interface StudentClub {
  id: string;
  name: string;
  shortCode?: string;
  category: "Technology" | "Leadership" | "Arts & Culture" | "Engineering" | "Community" | "Sports" | string;
  membersCount: number;
  lead: string;
  description: string;
  verified: boolean;
  meetingTime: string;
  room: string;
  tags: string[];
  joined?: boolean;
}

export interface CampusResource {
  id: string;
  title: string;
  category: "Study Spaces" | "Academic Support" | "Health & Wellness" | "IT & Software" | "Career & Internships";
  location: string;
  hours: string;
  status: "Available" | "Busy" | "Closing Soon" | "Requires Booking";
  capacityOrAvailable?: string;
  contact: string;
  description: string;
  actionLabel: string;
  link?: string;
  badge?: string;
}

export interface TodayClass {
  code: string;
  title: string;
  time: string;
  room: string;
  instructor: string;
  status: "Next Up" | "Later" | "Completed";
}

export const CURRENT_STUDENT: StudentProfile = {
  name: "Jordan Patel",
  id: "CU-892401",
  program: "B.S. Computer Science & Data Systems",
  year: "Class of 2026 (Junior)",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  notificationsCount: 3,
};

export const TODAY_CLASSES: TodayClass[] = [
  {
    code: "CS 381",
    title: "Distributed Systems & Cloud Architecture",
    time: "10:00 AM - 11:30 AM",
    room: "Turing Hall 304",
    instructor: "Dr. Elena Vance",
    status: "Completed",
  },
  {
    code: "DS 420",
    title: "Deep Learning Foundations & Ethics",
    time: "02:00 PM - 03:30 PM",
    room: "Innovation Pavilion B12",
    instructor: "Prof. Marcus Thorne",
    status: "Next Up",
  },
  {
    code: "MTH 310",
    title: "Applied Probability & Stochastic Modeling",
    time: "04:00 PM - 05:15 PM",
    room: "Science Complex 108",
    instructor: "Dr. Rachel Kim",
    status: "Later",
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "CityUni 24h Hackathon Kickoff & API Credential Drop",
    category: "Urgent",
    time: "15 mins ago",
    summary: "Hackers! API keys and judging rubrics have been published in the Portal. Opening ceremonies stream live at 6 PM.",
    author: "HackCity Committee",
    read: false,
  },
  {
    id: "ann-2",
    title: "Main Library 4th Floor Silent Zone Reserved for Final Sprint",
    category: "Campus Life",
    time: "2 hours ago",
    summary: "Additional power strips and ergonomic seating have been dispatched to Level 4. Quiet hours strictly enforced.",
    author: "University Library Services",
    read: false,
  },
  {
    id: "ann-3",
    title: "Fall Tech Career Fair: 45+ Employers Attending",
    category: "Career",
    time: "Yesterday",
    summary: "Pre-registration is required for on-site resume drops. Tech giants and startups are hiring summer interns.",
    author: "Career Development Center",
    read: true,
  },
];

export const MOCK_CLUBS: StudentClub[] = [
  {
    id: "club-cpccu",
    name: "CPCCU (Competitive Programming Community, City University)",
    shortCode: "CPCCU",
    category: "Technology",
    membersCount: 540,
    lead: "Tanvir Ahmed (CP Lead & Codeforces Master)",
    description: "The official competitive programming and algorithmic problem-solving society of City University. Organizers of IUPC, weekly mock contests on Codeforces/VJudge, and ACM-ICPC regional bootcamps.",
    verified: true,
    meetingTime: "Tuesdays & Fridays @ 6:00 PM",
    room: "CS Lab 402, Academic Building 3",
    tags: ["CPCCU", "Algorithms", "ICPC", "Codeforces", "Problem Solving"],
    joined: true,
  },
  {
    id: "club-cultural",
    name: "City University Cultural Club (CUCC)",
    shortCode: "Cultural Club",
    category: "Arts & Culture",
    membersCount: 390,
    lead: "Ananya Chowdhury (General Secretary)",
    description: "Celebrating traditional and contemporary performing arts, music, dance, stage drama, and literary culture across City University campuses. Hosts the annual Spring Gala and Noboborsho Festival.",
    verified: true,
    meetingTime: "Thursdays @ 4:30 PM",
    room: "Central Auditorium & Activity Hall",
    tags: ["Cultural Club", "Music", "Drama", "Dance", "Festivals"],
    joined: false,
  },
  {
    id: "club-sports",
    name: "City University Sports Club (CUSC)",
    shortCode: "Sports Club",
    category: "Sports",
    membersCount: 470,
    lead: "Captain Rayhan Kabir",
    description: "The athletic hub of City University managing inter-department cricket leagues, varsity football championships, table tennis, badminton, and fitness tournaments.",
    verified: true,
    meetingTime: "Mondays & Wednesdays @ 4:00 PM",
    room: "University Gymnasium & Central Sports Ground",
    tags: ["Sports Club", "Cricket", "Football", "Badminton", "Athletics"],
    joined: false,
  },
  {
    id: "club-1",
    name: "CityUni ACM Student Chapter",
    shortCode: "ACM Chapter",
    category: "Technology",
    membersCount: 480,
    lead: "Alex Chen (President)",
    description: "The primary computer science association on campus hosting weekly algorithms nights, hackathons, and company tech talks.",
    verified: true,
    meetingTime: "Wednesdays @ 6:30 PM",
    room: "Turing Hall 201",
    tags: ["Coding", "Career Prep", "Open Source"],
    joined: true,
  },
  {
    id: "club-2",
    name: "Autonomous Robotics Society",
    shortCode: "Robotics Society",
    category: "Engineering",
    membersCount: 215,
    lead: "Siddharth Rao (Captain)",
    description: "Building autonomous combat robots and university rover challenge vehicles with custom PCB design and ROS2.",
    verified: true,
    meetingTime: "Tuesdays & Thursdays @ 5:00 PM",
    room: "MakerSpace Lab A",
    tags: ["Robotics", "Hardware", "ROS2"],
    joined: false,
  },
  {
    id: "club-3",
    name: "Women in Computer Science (WiCS)",
    shortCode: "WiCS",
    category: "Technology",
    membersCount: 310,
    lead: "Maya Lin (Director)",
    description: "Empowering women and non-binary technologists through mentorship circles, Grace Hopper conference sponsorships, and leadership.",
    verified: true,
    meetingTime: "Bi-weekly Mondays @ 6:00 PM",
    room: "Student Union 302",
    tags: ["Mentorship", "Community", "DEI"],
    joined: true,
  },
  {
    id: "club-4",
    name: "City Financial Trading & Quant Club",
    shortCode: "Quant Club",
    category: "Leadership",
    membersCount: 190,
    lead: "David Goldstein (Lead)",
    description: "Algorithmic trading competitions, market research analysis, and preparation for quantitative finance and hedge fund roles.",
    verified: true,
    meetingTime: "Thursdays @ 7:00 PM",
    room: "Business Hall 110",
    tags: ["Quant", "Finance", "Algo Trading"],
    joined: false,
  },
  {
    id: "club-5",
    name: "Urban Photography & Media Collective",
    shortCode: "Media Collective",
    category: "Arts & Culture",
    membersCount: 145,
    lead: "Camila Ruiz (Curator)",
    description: "Street photography walks, darkroom film development workshops, and campus gallery curation.",
    verified: false,
    meetingTime: "Saturdays @ 2:00 PM",
    room: "Visual Arts Building 104",
    tags: ["Photography", "Film", "Exhibitions"],
    joined: false,
  },
];

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: "evt-cpccu-1",
    title: "CPCCU Intra-University Programming Contest (IUPC 2026)",
    organizer: "CPCCU (Competitive Programming Community)",
    clubId: "club-cpccu",
    category: "Competitive Programming",
    date: "Oct 18, 2026",
    time: "10:00 AM - 3:00 PM (5 hrs)",
    location: "CS Lab 401 & 402, Academic Building 3",
    attendeesCount: 184,
    maxCapacity: 200,
    featured: true,
    badge: "Flagship CP Contest",
    tags: ["CPCCU", "IUPC", "Algorithms", "Prizes: 50K BDT", "Codeforces"],
    description: "The most prestigious 5-hour individual competitive programming contest at City University. Test your algorithmic skills across Dynamic Programming, Graphs, and Number Theory. Top 10 advance to the National ICPC Regional squad.",
    rsvpd: true,
    ticketHash: "CU-QR-CPCCU-892401-4821",
  },
  {
    id: "evt-cultural-1",
    title: "City Cultural Fest: Bangla Noboborsho & Global Harmony Gala",
    organizer: "City University Cultural Club (CUCC)",
    clubId: "club-cultural",
    category: "Cultural",
    date: "Oct 25, 2026",
    time: "5:00 PM - 9:30 PM",
    location: "Main University Amphitheater & Plaza",
    attendeesCount: 420,
    maxCapacity: 500,
    featured: true,
    badge: "Mega Cultural Gala",
    tags: ["Cultural Club", "Live Music", "Stage Drama", "Folk Dance", "Free Entry"],
    description: "Join the City University Cultural Club for a vibrant celebration featuring traditional folk chorus, an original satirical stage drama, classical dance performances, and an open-air concert by guest headliner bands.",
    rsvpd: false,
  },
  {
    id: "evt-sports-1",
    title: "City University Inter-Department Cricket Championship 2026",
    organizer: "City University Sports Club (CUSC)",
    clubId: "club-sports",
    category: "Sports",
    date: "Nov 05 - 12, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "City University Central Sports Ground",
    attendeesCount: 310,
    maxCapacity: 450,
    featured: true,
    badge: "Varsity Cup",
    tags: ["Sports Club", "Cricket", "T20 League", "Trophy Match"],
    description: "16 academic departments compete in the annual T20 tournament organized by CUSC. Live commentary, refreshments, and athletic scouting for the varsity university team.",
    rsvpd: false,
  },
  {
    id: "evt-cpccu-2",
    title: "CPCCU Dynamic Programming & Graph Theory Bootcamp",
    organizer: "CPCCU (Competitive Programming Community)",
    clubId: "club-cpccu",
    category: "Competitive Programming",
    date: "Friday, Oct 24, 2026",
    time: "4:00 PM - 6:30 PM",
    location: "Seminar Hall B, Level 5",
    attendeesCount: 96,
    maxCapacity: 120,
    tags: ["CPCCU", "Algorithms", "DP", "Graphs", "Problem Solving"],
    description: "Hands-on problem breakdown covering tree DP, Dijkstra variations, and segment tree techniques with live Codeforces problem submissions guided by university CP coaches.",
    rsvpd: false,
  },
  {
    id: "evt-cultural-2",
    title: "CUCC Acoustic Unplugged & Spoken Word Poetry Night",
    organizer: "City University Cultural Club (CUCC)",
    clubId: "club-cultural",
    category: "Cultural",
    date: "Thursday, Nov 02, 2026",
    time: "6:00 PM - 8:30 PM",
    location: "Student Commons Lounge, 2nd Floor",
    attendeesCount: 115,
    maxCapacity: 150,
    tags: ["Cultural Club", "Acoustic", "Poetry", "Open Mic", "Coffee Night"],
    description: "An intimate, cozy evening celebrating student singer-songwriters, acoustic instrumentals, and spoken word poetry. Complimentary coffee and cookies provided by the Cultural Club.",
    rsvpd: false,
  },
  {
    id: "evt-sports-2",
    title: "CUSC Intra-Varsity Futsal & Badminton Grand Slam",
    organizer: "City University Sports Club (CUSC)",
    clubId: "club-sports",
    category: "Sports",
    date: "Saturday, Nov 15, 2026",
    time: "1:00 PM - 7:00 PM",
    location: "Indoor Sports Gymnasium Court 1 & 2",
    attendeesCount: 162,
    maxCapacity: 180,
    tags: ["Sports Club", "Futsal", "Badminton", "Knockout Cup"],
    description: "High-octane indoor 5v5 futsal tournament and singles/doubles badminton showdown. Medals, certificates, and energy bars for all registered student participants.",
    rsvpd: false,
  },
  {
    id: "evt-1",
    title: "CityHack 2026: 24-Hour Annual Innovation Sprint",
    organizer: "CityUni Developer Student Club & ACM",
    clubId: "club-1",
    category: "Hackathon",
    date: "Oct 10 - 11, 2026",
    time: "10:00 AM EDT (24 hrs)",
    location: "Great Hall & Virtual Hub",
    attendeesCount: 420,
    maxCapacity: 500,
    featured: true,
    tags: ["Hackathon", "Prizes: $15K", "Free Food", "All Majors"],
    description: "Join 500+ builders, designers, and thinkers to create cutting-edge civic tech, AI agents, and campus productivity solutions.",
    badge: "Featured Flagship",
    rsvpd: true,
    ticketHash: "CU-QR-HACK-892401-9932",
  },
  {
    id: "evt-2",
    title: "Generative AI & Agentic Workflows Masterclass",
    organizer: "Autonomous Robotics Society",
    clubId: "club-2",
    category: "Tech & AI",
    date: "Tomorrow, Oct 8",
    time: "5:30 PM - 7:00 PM",
    location: "Engineering Atrium 101",
    attendeesCount: 142,
    maxCapacity: 160,
    tags: ["Workshop", "Python", "LLMs"],
    description: "Hands-on masterclass building autonomous agents with multimodal models and function calling with industry mentors.",
    rsvpd: false,
  },
  {
    id: "evt-3",
    title: "Founders Coffee & Startup Pitch Mixer",
    organizer: "City Financial Trading & Quant Club",
    clubId: "club-4",
    category: "Career",
    date: "Friday, Oct 10",
    time: "3:00 PM - 5:00 PM",
    location: "Founders Lounge, 3rd Floor",
    attendeesCount: 78,
    maxCapacity: 90,
    tags: ["Networking", "Venture Capital", "Pitching"],
    description: "Pitch your early ideas, meet potential co-founders, and talk to alumni angels funding student founders.",
    rsvpd: false,
  },
];

export const MOCK_RESOURCES: CampusResource[] = [
  {
    id: "res-1",
    title: "Collaborative Study Pods (4-6 Persons)",
    category: "Study Spaces",
    location: "Main Library, 2nd & 3rd Floors",
    hours: "Open 24/7 (Campus ID Required after 10 PM)",
    status: "Available",
    capacityOrAvailable: "12 of 18 Pods Open",
    contact: "library-desk@cityuni.edu",
    description: "Sound-isolated breakout spaces equipped with 55\" 4K presentation monitors, USB-C docks, and whiteboard walls.",
    actionLabel: "Reserve Pod Now",
    badge: "High Demand",
  },
  {
    id: "res-2",
    title: "High-Performance GPU Compute Cluster",
    category: "IT & Software",
    location: "CS Department & Cloud Portal",
    hours: "Always Available (Slurm Queue)",
    status: "Available",
    capacityOrAvailable: "48x NVIDIA RTX 4090 / A100 Nodes",
    contact: "hpc-admin@cityuni.edu",
    description: "Free compute resources for City University students working on machine learning, simulation, and senior capstone projects.",
    actionLabel: "Request API Token",
    badge: "Instant Access",
  },
  {
    id: "res-3",
    title: "Student Wellness & Counseling Sanctuary",
    category: "Health & Wellness",
    location: "Health Center, Wing B",
    hours: "Mon - Fri: 8:00 AM - 7:00 PM (Emergency 24/7)",
    status: "Available",
    capacityOrAvailable: "Drop-ins Welcomed",
    contact: "wellness@cityuni.edu | (555) 019-4920",
    description: "Confidential mental health consultations, stress management therapy animals, mindfulness pods, and crisis hotline dispatch.",
    actionLabel: "Book 1-on-1 Session",
  },
  {
    id: "res-4",
    title: "Rapid Prototyping MakerSpace & 3D Lab",
    category: "Study Spaces",
    location: "Engineering Innovation Hub 140",
    hours: "Mon - Sat: 9:00 AM - 11:00 PM",
    status: "Busy",
    capacityOrAvailable: "6 of 8 Printers in use",
    contact: "makerspace@cityuni.edu",
    description: "Equipped with Bambu Lab 3D printers, Epilog laser cutters, CNC milling, soldering stations, and free PLA filament spools.",
    actionLabel: "Join Queue / Safety Test",
    badge: "Safety Certified Only",
  },
  {
    id: "res-5",
    title: "Peer-to-Peer STEM Tutoring & Math Clinic",
    category: "Academic Support",
    location: "Academic Hall 205 & Zoom",
    hours: "Mon - Thu: 11:00 AM - 8:00 PM",
    status: "Available",
    capacityOrAvailable: "8 Tutors on Duty",
    contact: "tutoring@cityuni.edu",
    description: "Walk-in tutoring for Calculus, Linear Algebra, Data Structures, General Physics, and Chemistry. Zero appointment necessary.",
    actionLabel: "View Today's Roster",
  },
  {
    id: "res-6",
    title: "Campus SafeWalk Escort & Emergency Dispatch",
    category: "Health & Wellness",
    location: "Campus Police Station & CityUni App",
    hours: "24/7 Service (Average response < 4 mins)",
    status: "Available",
    capacityOrAvailable: "Uniformed Officers on Patrol",
    contact: "Campus Dispatch: (555) 019-9111",
    description: "Never walk alone at night. Request a uniformed security officer or trained student safety ranger to escort you anywhere on or near campus.",
    actionLabel: "Call Instant Escort",
    badge: "24/7 Emergency",
  },
];

export interface AcademicCourseResource {
  id: string;
  title: string;
  department: string;
  course_code: string;
  resource_type: "Exam Paper" | "Lecture Notes" | "Lab Guide" | "Syllabus" | "Official Notice" | "Reference Book" | "Software Spec";
  file_url: string;
  uploaded_by?: string;
  uploaded_at: string;
  file_size?: string;
  downloads?: number;
  semester?: string;
  year?: string;
  tags?: string[];
  verified?: boolean;
}

export const MOCK_ACADEMIC_RESOURCES: AcademicCourseResource[] = [
  // ── CSE PAST QUESTION PAPERS ──────────────────────────────────────────────
  {
    id: "cse-q1",
    title: "CSE 101: Introduction to Programming (C Language) — Final Exam 2024",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 101",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse101-final-2024.pdf",
    uploaded_by: "Dept. Academic Committee",
    uploaded_at: "2 days ago",
    file_size: "1.1 MB",
    downloads: 648,
    semester: "Spring",
    year: "2024",
    tags: ["C Programming", "Final Exam", "1st Year"],
    verified: true,
  },
  {
    id: "cse-q2",
    title: "CSE 201: Data Structures & Algorithms — Midterm Exam Q-Paper (2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 201",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse201-midterm-2024.pdf",
    uploaded_by: "CPCCU Academic Wing",
    uploaded_at: "3 days ago",
    file_size: "2.3 MB",
    downloads: 892,
    semester: "Fall",
    year: "2024",
    tags: ["DSA", "Midterm", "2nd Year"],
    verified: true,
  },
  {
    id: "cse-q3",
    title: "CSE 301: Algorithms & Complexity — Final Exam with Solutions (2023)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 301",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse301-final-sol-2023.pdf",
    uploaded_by: "Prof. Aminul Islam",
    uploaded_at: "1 week ago",
    file_size: "3.8 MB",
    downloads: 734,
    semester: "Spring",
    year: "2023",
    tags: ["Algorithms", "NP-Hard", "Final", "3rd Year"],
    verified: true,
  },
  {
    id: "cse-q4",
    title: "CSE 315: Database Management Systems — Midterm & Final Paper Bundle (2023-24)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 315",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse315-db-bundle-2024.pdf",
    uploaded_by: "Tanvir Ahmed (CPCCU)",
    uploaded_at: "5 days ago",
    file_size: "4.2 MB",
    downloads: 611,
    semester: "Fall",
    year: "2023",
    tags: ["DBMS", "SQL", "ER Diagram", "3rd Year"],
    verified: true,
  },
  {
    id: "cse-q5",
    title: "CSE 411: Operating Systems — 3-Year Previous Question Bank (2021-2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 411",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse411-os-qbank-3yr.pdf",
    uploaded_by: "CityUni ACM Academic Committee",
    uploaded_at: "1 week ago",
    file_size: "6.1 MB",
    downloads: 1024,
    semester: "Annual",
    year: "2021-2024",
    tags: ["Operating Systems", "Process Scheduling", "Memory Management", "4th Year"],
    verified: true,
  },
  {
    id: "cse-q6",
    title: "CSE 423: Computer Networks — Subnetting & TCP/IP Final Paper (2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 423",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse423-networks-final-2024.pdf",
    uploaded_by: "Dr. Sabbir Rahman",
    uploaded_at: "4 days ago",
    file_size: "2.9 MB",
    downloads: 543,
    semester: "Spring",
    year: "2024",
    tags: ["Computer Networks", "TCP/IP", "4th Year"],
    verified: true,
  },
  {
    id: "cse-q7",
    title: "CSE 365: Machine Learning Fundamentals — Midterm with Marking Scheme (2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 365",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse365-ml-midterm-2024.pdf",
    uploaded_by: "Prof. Nafis Hossain",
    uploaded_at: "6 days ago",
    file_size: "3.1 MB",
    downloads: 780,
    semester: "Fall",
    year: "2024",
    tags: ["Machine Learning", "Regression", "Neural Networks"],
    verified: true,
  },
  {
    id: "cse-q8",
    title: "CSE 499: Software Engineering — Capstone Final Questions (2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 499",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cse499-se-capstone-2024.pdf",
    uploaded_by: "Final Year Batch Rep",
    uploaded_at: "2 weeks ago",
    file_size: "1.8 MB",
    downloads: 289,
    semester: "Spring",
    year: "2024",
    tags: ["Software Engineering", "Agile", "Capstone"],
    verified: false,
  },
  // ── EEE PAST QUESTION PAPERS ──────────────────────────────────────────────
  {
    id: "eee-q1",
    title: "EEE 111: Basic Electrical Engineering — Final Exam Paper (2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 111",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee111-basic-final-2024.pdf",
    uploaded_by: "Dept. of EEE Academic Office",
    uploaded_at: "3 days ago",
    file_size: "1.6 MB",
    downloads: 521,
    semester: "Spring",
    year: "2024",
    tags: ["Basic EE", "Circuits", "1st Year"],
    verified: true,
  },
  {
    id: "eee-q2",
    title: "EEE 213: Electronic Circuits I — Transistor Amplifiers Midterm (2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 213",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee213-circuits1-midterm-2024.pdf",
    uploaded_by: "Asst. Prof. Md. Shahriar",
    uploaded_at: "5 days ago",
    file_size: "2.2 MB",
    downloads: 437,
    semester: "Fall",
    year: "2024",
    tags: ["Electronic Circuits", "BJT", "FET", "Amplifiers", "2nd Year"],
    verified: true,
  },
  {
    id: "eee-q3",
    title: "EEE 321: Signals & Systems — Fourier Transform Final Exam (2023)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 321",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee321-signals-final-2023.pdf",
    uploaded_by: "Dr. Zakirul Islam",
    uploaded_at: "2 weeks ago",
    file_size: "3.4 MB",
    downloads: 688,
    semester: "Spring",
    year: "2023",
    tags: ["Signals & Systems", "Fourier", "Laplace", "3rd Year"],
    verified: true,
  },
  {
    id: "eee-q4",
    title: "EEE 333: Electromagnetic Fields & Waves — 3-Year Q-Bank (2021-2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 333",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee333-emf-qbank-3yr.pdf",
    uploaded_by: "EEE Batch 2021 Class Reps",
    uploaded_at: "1 week ago",
    file_size: "7.2 MB",
    downloads: 562,
    semester: "Annual",
    year: "2021-2024",
    tags: ["Electromagnetics", "Maxwell Equations"],
    verified: true,
  },
  {
    id: "eee-q5",
    title: "EEE 401: Power Systems I — Load Flow Analysis Final Exam (2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 401",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee401-power-systems-final-2024.pdf",
    uploaded_by: "Prof. Khairul Anam",
    uploaded_at: "4 days ago",
    file_size: "2.7 MB",
    downloads: 394,
    semester: "Fall",
    year: "2024",
    tags: ["Power Systems", "Load Flow", "4th Year"],
    verified: true,
  },
  {
    id: "eee-q6",
    title: "EEE 415: Digital Signal Processing — DFT & Filter Design Midterm (2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 415",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/eee415-dsp-midterm-2024.pdf",
    uploaded_by: "CPCCU Academic Wing",
    uploaded_at: "1 week ago",
    file_size: "3.0 MB",
    downloads: 301,
    semester: "Spring",
    year: "2024",
    tags: ["DSP", "DFT", "FIR Filter"],
    verified: true,
  },
  // ── LECTURE NOTES ─────────────────────────────────────────────────────────
  {
    id: "cse-n1",
    title: "CSE 201: Complete DSA Lecture Slides — Linked Lists to AVL Trees (Fall 2024)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 201",
    resource_type: "Lecture Notes",
    file_url: "https://cityuni.edu/vault/cse201-dsa-slides-2024.pdf",
    uploaded_by: "Prof. Moniruzzaman",
    uploaded_at: "5 days ago",
    file_size: "12.4 MB",
    downloads: 1140,
    semester: "Fall",
    year: "2024",
    tags: ["DSA", "Lecture Slides", "Complete Notes"],
    verified: true,
  },
  {
    id: "cse-n2",
    title: "CSE 423: Computer Networks Notes — OSI Model to Routing Protocols",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE 423",
    resource_type: "Lecture Notes",
    file_url: "https://cityuni.edu/vault/cse423-networks-notes.pdf",
    uploaded_by: "Rania Hasan (Class Rep)",
    uploaded_at: "1 week ago",
    file_size: "9.8 MB",
    downloads: 618,
    semester: "Fall",
    year: "2024",
    tags: ["Networks", "OSI Model", "Routing"],
    verified: false,
  },
  {
    id: "eee-n1",
    title: "EEE 321: Signals & Systems Handwritten Notes — Complete Semester Pack",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 321",
    resource_type: "Lecture Notes",
    file_url: "https://cityuni.edu/vault/eee321-signals-handwritten.pdf",
    uploaded_by: "Khandaker Ashraf (EEE 3rd Year)",
    uploaded_at: "4 days ago",
    file_size: "18.2 MB",
    downloads: 832,
    semester: "Fall",
    year: "2024",
    tags: ["Signals", "Handwritten Notes", "Complete"],
    verified: false,
  },
  // ── LAB GUIDES ────────────────────────────────────────────────────────────
  {
    id: "eee-lab1",
    title: "EEE 351: Microcontroller & Embedded Lab Manual — Arduino & STM32 (2024)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE 351",
    resource_type: "Lab Guide",
    file_url: "https://cityuni.edu/vault/eee351-embedded-lab-2024.pdf",
    uploaded_by: "Lab Supervisor Raihan",
    uploaded_at: "3 days ago",
    file_size: "5.4 MB",
    downloads: 473,
    semester: "Spring",
    year: "2024",
    tags: ["Embedded Systems", "Arduino", "STM32", "Lab"],
    verified: true,
  },
  {
    id: "acad-3",
    title: "MTH 310: Applied Probability & Stochastic Modeling Problem Sets 1-4",
    department: "Mathematics",
    course_code: "MTH 310",
    resource_type: "Lab Guide",
    file_url: "https://cityuni.edu/vault/mth310-psets.pdf",
    uploaded_by: "Dr. Rachel Kim",
    uploaded_at: "1 week ago",
    file_size: "1.2 MB",
    downloads: 189,
    tags: ["Probability", "Stochastic"],
    verified: true,
  },
  {
    id: "acad-5",
    title: "ECE 302: Microprocessor Systems Lab Manual & Verilog Templates",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "ECE 302",
    resource_type: "Lab Guide",
    file_url: "https://cityuni.edu/vault/ece302-verilog-manual.pdf",
    uploaded_by: "Prof. Zhang",
    uploaded_at: "2 weeks ago",
    file_size: "5.8 MB",
    downloads: 98,
    tags: ["Verilog", "Microprocessors", "Lab"],
    verified: true,
  },
  // ── OFFICIAL NOTICES ──────────────────────────────────────────────────────
  {
    id: "notice-1",
    title: "City University Final Exam Schedule — Spring 2025 (All Departments)",
    department: "All Departments",
    course_code: "UNIV-NOTICE",
    resource_type: "Official Notice",
    file_url: "https://cityuni.edu/notices/spring2025-exam-schedule.pdf",
    uploaded_by: "Office of the Registrar",
    uploaded_at: "1 day ago",
    file_size: "0.8 MB",
    downloads: 3240,
    semester: "Spring",
    year: "2025",
    tags: ["Exam Schedule", "All Departments", "Official"],
    verified: true,
  },
  {
    id: "notice-2",
    title: "CSE Dept.: Semester Registration Guidelines & Prerequisite Policy Update 2025",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CSE-NOTICE",
    resource_type: "Official Notice",
    file_url: "https://cityuni.edu/notices/cse-registration-policy-2025.pdf",
    uploaded_by: "CSE Department Office",
    uploaded_at: "3 days ago",
    file_size: "0.5 MB",
    downloads: 1820,
    semester: "Spring",
    year: "2025",
    tags: ["Registration", "Policy", "CSE"],
    verified: true,
  },
  {
    id: "notice-3",
    title: "EEE Dept.: Lab Safety Protocols & Equipment Usage Policy (Updated 2025)",
    department: "Electrical & Electronic Eng (EEE)",
    course_code: "EEE-NOTICE",
    resource_type: "Official Notice",
    file_url: "https://cityuni.edu/notices/eee-lab-safety-2025.pdf",
    uploaded_by: "EEE Lab Committee",
    uploaded_at: "2 days ago",
    file_size: "0.9 MB",
    downloads: 742,
    semester: "Spring",
    year: "2025",
    tags: ["Lab Safety", "Policy", "EEE"],
    verified: true,
  },
  {
    id: "notice-4",
    title: "City University Scholarship & Financial Aid Application — Spring 2025 Open",
    department: "All Departments",
    course_code: "UNIV-NOTICE",
    resource_type: "Official Notice",
    file_url: "https://cityuni.edu/notices/scholarship-spring2025.pdf",
    uploaded_by: "Student Financial Services Office",
    uploaded_at: "5 days ago",
    file_size: "0.6 MB",
    downloads: 2100,
    semester: "Spring",
    year: "2025",
    tags: ["Scholarship", "Financial Aid", "All Students"],
    verified: true,
  },
  // ── LEGACY RECORDS (DS/CS General) ────────────────────────────────────────
  {
    id: "acad-1",
    title: "CS 381: Distributed Systems Midterm Review & Solutions (Fall 2025)",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CS 381",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cs381-midterm-sol.pdf",
    uploaded_by: "Prof. Elena Vance",
    uploaded_at: "Yesterday",
    file_size: "2.4 MB",
    downloads: 342,
    tags: ["Distributed Systems", "Midterm"],
    verified: true,
  },
  {
    id: "acad-2",
    title: "DS 420: Deep Learning & Ethics Lecture Notes & PyTorch Notebooks",
    department: "Data Science & AI",
    course_code: "DS 420",
    resource_type: "Lecture Notes",
    file_url: "https://cityuni.edu/vault/ds420-notes.pdf",
    uploaded_by: "Jordan Patel (Class Rep)",
    uploaded_at: "3 days ago",
    file_size: "8.1 MB",
    downloads: 215,
    tags: ["Deep Learning", "PyTorch"],
    verified: false,
  },
  {
    id: "acad-4",
    title: "CS 210: Data Structures & Algorithms Comprehensive Final Cheatsheet",
    department: "Computer Science & Engineering (CSE)",
    course_code: "CS 210",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cs210-final-cheatsheet.pdf",
    uploaded_by: "CityUni ACM Academic Committee",
    uploaded_at: "2 weeks ago",
    file_size: "3.5 MB",
    downloads: 512,
    tags: ["DSA", "Cheatsheet", "Final Exam"],
    verified: true,
  },
];

export interface LostAndFoundItem {
  id: string;
  type: "Lost" | "Found";
  itemName: string;
  category: "Electronics" | "Accessories" | "Documents" | "Clothing" | "Other";
  description: string;
  location: string;
  date: string;
  contactInfo: string;
  status: "Active" | "Resolved";
  imageUrl?: string;
  reporterName: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: "Infrastructure" | "Academic" | "Hostel" | "Cafeteria" | "Security" | "Other";
  description: string;
  location?: string;
  date: string;
  status: "Pending" | "In Progress" | "Resolved";
  reporterName: string;
  priority: "Low" | "Medium" | "High";
}

export const MOCK_LOST_AND_FOUND: LostAndFoundItem[] = [
  {
    id: "lf-1",
    type: "Lost",
    itemName: "Apple AirPods Pro",
    category: "Electronics",
    description: "Lost my AirPods Pro (white case with a small scratch on the back) somewhere near the Main Library.",
    location: "Main Library, 2nd Floor",
    date: "2024-10-07",
    contactInfo: "jordan.p@cityuni.edu",
    status: "Active",
    reporterName: "Jordan Patel",
  },
  {
    id: "lf-2",
    type: "Found",
    itemName: "Blue Hydro Flask",
    category: "Accessories",
    description: "Found a blue 32oz Hydro Flask with a 'GitHub' sticker on it.",
    location: "CS Lab 401",
    date: "2024-10-08",
    contactInfo: "tanvir.a@cityuni.edu",
    status: "Active",
    reporterName: "Tanvir Ahmed",
  },
  {
    id: "lf-3",
    type: "Lost",
    itemName: "Student ID Card",
    category: "Documents",
    description: "Lost my student ID card. Name: Sarah Jenkins. ID: CU-12345.",
    location: "Cafeteria",
    date: "2024-10-06",
    contactInfo: "sarah.j@cityuni.edu",
    status: "Resolved",
    reporterName: "Sarah Jenkins",
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "comp-1",
    title: "Broken AC in Turing Hall 304",
    category: "Infrastructure",
    description: "The air conditioning unit in Turing Hall 304 is making a loud noise and not cooling.",
    location: "Turing Hall 304",
    date: "2024-10-08",
    status: "Pending",
    reporterName: "Jordan Patel",
    priority: "Medium",
  },
  {
    id: "comp-2",
    title: "Wi-Fi disconnecting in Library",
    category: "Infrastructure",
    description: "The 'CityUni-Secure' Wi-Fi network keeps dropping connection every 10 minutes on the 4th floor.",
    location: "Main Library, 4th Floor",
    date: "2024-10-07",
    status: "In Progress",
    reporterName: "Alex Chen",
    priority: "High",
  },
  {
    id: "comp-3",
    title: "Unhealthy food options",
    category: "Cafeteria",
    description: "Need more vegan and healthy food options in the main cafeteria. The current menu is too limited.",
    location: "Main Cafeteria",
    date: "2024-10-05",
    status: "Resolved",
    reporterName: "Maya Lin",
    priority: "Low",
  }
];