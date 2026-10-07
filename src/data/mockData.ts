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
  category: "Hackathon" | "Tech & AI" | "Career" | "Social" | "Academic" | "Sports";
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
}

export interface StudentClub {
  id: string;
  name: string;
  category: "Technology" | "Leadership" | "Arts & Culture" | "Engineering" | "Community";
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

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "CityHack 2026: 24-Hour Annual Innovation Sprint",
    organizer: "CityUni Developer Student Club & ACM",
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
  },
  {
    id: "evt-2",
    title: "Generative AI & Agentic Workflows Workshop",
    organizer: "City AI Research Society",
    category: "Tech & AI",
    date: "Tomorrow, Oct 8",
    time: "5:30 PM - 7:00 PM",
    location: "Engineering Atrium 101",
    attendeesCount: 142,
    maxCapacity: 160,
    tags: ["Workshop", "Python", "LLMs"],
    description: "Hands-on masterclass building autonomous agents with multimodal models and function calling with industry mentors.",
  },
  {
    id: "evt-3",
    title: "Founders Coffee & Startup Pitch Mixer",
    organizer: "City Venture Incubator",
    category: "Career",
    date: "Friday, Oct 10",
    time: "3:00 PM - 5:00 PM",
    location: "Founders Lounge, 3rd Floor",
    attendeesCount: 78,
    maxCapacity: 90,
    tags: ["Networking", "Venture Capital", "Pitching"],
    description: "Pitch your early ideas, meet potential co-founders, and talk to alumni angels funding student founders.",
  },
  {
    id: "evt-4",
    title: "Intramural 3v3 Basketball Tournament",
    organizer: "City Athletics & Recreation",
    category: "Sports",
    date: "Saturday, Oct 11",
    time: "1:00 PM - 6:00 PM",
    location: "Recreation Center Court 2",
    attendeesCount: 36,
    maxCapacity: 48,
    tags: ["Fitness", "Tournament", "Trophy"],
    description: "Annual single-elimination 3v3 tournament. Open to all students, staff, and faculty. Energy drinks provided.",
  },
  {
    id: "evt-5",
    title: "Design Systems & UI/UX Sprint with Figma",
    organizer: "Creative Tech Guild",
    category: "Tech & AI",
    date: "Monday, Oct 13",
    time: "6:00 PM - 7:30 PM",
    location: "Design Lab 220",
    attendeesCount: 65,
    maxCapacity: 75,
    tags: ["Design", "Figma", "Portfolios"],
    description: "Learn component tokens, interactive micro-animations, and modern web heuristics directly from senior product designers.",
  },
  {
    id: "evt-6",
    title: "City Symphony Autumn Moonlight Concert",
    organizer: "Department of Performing Arts",
    category: "Social",
    date: "Thursday, Oct 16",
    time: "7:30 PM - 9:30 PM",
    location: "Kaufmann Concert Auditorium",
    attendeesCount: 290,
    maxCapacity: 350,
    tags: ["Music", "Live Show", "Free Admission"],
    description: "An evening of classic and contemporary orchestral pieces performed by City University's award-winning orchestra.",
  },
];

export const MOCK_CLUBS: StudentClub[] = [
  {
    id: "club-1",
    name: "CityUni ACM Student Chapter",
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
  {
    id: "club-6",
    name: "City Solar Vehicle Racing Team",
    category: "Engineering",
    membersCount: 130,
    lead: "Kenji Sato (Chief Engineer)",
    description: "Designing, manufacturing, and racing street-legal solar electric vehicles across cross-country endurance competitions.",
    verified: true,
    meetingTime: "Saturdays @ 10:00 AM",
    room: "Automotive Bay C",
    tags: ["Solar", "Clean Tech", "Aerodynamics"],
    joined: false,
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
  resource_type: "Exam Paper" | "Lecture Notes" | "Lab Guide" | "Syllabus" | "Reference Book" | "Software Spec";
  file_url: string;
  uploaded_by?: string;
  uploaded_at: string;
  file_size?: string;
  downloads?: number;
}

export const MOCK_ACADEMIC_RESOURCES: AcademicCourseResource[] = [
  {
    id: "acad-1",
    title: "CS 381: Distributed Systems Midterm Review & Solutions (Fall 2025)",
    department: "Computer Science",
    course_code: "CS 381",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cs381-midterm-sol.pdf",
    uploaded_by: "Prof. Elena Vance",
    uploaded_at: "Yesterday",
    file_size: "2.4 MB",
    downloads: 342,
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
  },
  {
    id: "acad-3",
    title: "MTH 310: Applied Probability Stochastic Modeling Problem Sets 1-4",
    department: "Mathematics",
    course_code: "MTH 310",
    resource_type: "Lab Guide",
    file_url: "https://cityuni.edu/vault/mth310-psets.pdf",
    uploaded_by: "Dr. Rachel Kim",
    uploaded_at: "1 week ago",
    file_size: "1.2 MB",
    downloads: 189,
  },
  {
    id: "acad-4",
    title: "CS 210: Data Structures & Algorithms Comprehensive Final Cheatsheet",
    department: "Computer Science",
    course_code: "CS 210",
    resource_type: "Exam Paper",
    file_url: "https://cityuni.edu/vault/cs210-final-cheatsheet.pdf",
    uploaded_by: "CityUni ACM Academic Committee",
    uploaded_at: "2 weeks ago",
    file_size: "3.5 MB",
    downloads: 512,
  },
  {
    id: "acad-5",
    title: "ECE 302: Microprocessor Systems Lab Manual & Verilog Templates",
    department: "Electrical & Computer Eng",
    course_code: "ECE 302",
    resource_type: "Software Spec",
    file_url: "https://cityuni.edu/vault/ece302-verilog-manual.pdf",
    uploaded_by: "Prof. Zhang",
    uploaded_at: "2 weeks ago",
    file_size: "5.8 MB",
    downloads: 98,
  },
];
