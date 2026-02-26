// ── Career Profiles (used in Match swipe) ──
export interface CareerProfile {
  id: string
  title: string
  fit: number
  salary: string
  growth: string
  industry: string
  description: string
  trending: boolean
}

export const careerProfiles: CareerProfile[] = [
  {
    id: 'doctor',
    title: 'Doctor (Physician)',
    fit: 94,
    salary: '$180K–$350K',
    growth: 'High',
    industry: 'Healthcare',
    description: 'Diagnose and treat patients, specialize in areas like surgery, pediatrics, or family medicine. Requires extensive education but offers high impact and earning potential.',
    trending: true,
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    fit: 91,
    salary: '$65K–$120K',
    growth: 'Very High',
    industry: 'Tech & SaaS',
    description: 'Design intuitive digital experiences by researching user needs, prototyping interfaces, and testing usability. High demand across all industries.',
    trending: true,
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    fit: 87,
    salary: '$55K–$95K',
    growth: 'High',
    industry: 'Finance & Tech',
    description: 'Transform raw data into actionable insights using SQL, Python, and visualization tools. Essential role in data-driven decision making.',
    trending: true,
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    fit: 85,
    salary: '$80K–$140K',
    growth: 'Very High',
    industry: 'All Industries',
    description: 'Lead product strategy, work with engineering and design teams to build products users love. Combines business, tech, and user empathy.',
    trending: true,
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    fit: 83,
    salary: '$75K–$150K',
    growth: 'Very High',
    industry: 'Technology',
    description: 'Build applications and systems using programming languages. One of the most in-demand and versatile career paths in the digital economy.',
    trending: true,
  },
  {
    id: 'marketing-strategist',
    title: 'Marketing Strategist',
    fit: 80,
    salary: '$50K–$90K',
    growth: 'Moderate',
    industry: 'Media & Retail',
    description: 'Develop marketing campaigns, analyze market trends, and drive brand growth across digital and traditional channels.',
    trending: false,
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    fit: 78,
    salary: '$60K–$100K',
    growth: 'High',
    industry: 'Consulting',
    description: 'Bridge the gap between business needs and technology solutions. Analyze processes, gather requirements, and recommend improvements.',
    trending: false,
  },
  {
    id: 'nurse-practitioner',
    title: 'Nurse Practitioner',
    fit: 76,
    salary: '$90K–$130K',
    growth: 'Very High',
    industry: 'Healthcare',
    description: 'Provide primary and specialty healthcare, prescribe medications, and manage patient care. Growing autonomy and demand across Canada.',
    trending: true,
  },
  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    fit: 73,
    salary: '$55K–$85K',
    growth: 'Moderate',
    industry: 'Government & NGO',
    description: 'Study environmental problems and develop solutions for issues like pollution, climate change, and resource management.',
    trending: false,
  },
  {
    id: 'financial-advisor',
    title: 'Financial Advisor',
    fit: 70,
    salary: '$55K–$120K',
    growth: 'Moderate',
    industry: 'Finance',
    description: 'Help individuals and businesses manage investments, plan for retirement, and achieve financial goals.',
    trending: false,
  },
]

// ── Career Pathway Details (used in Achieve) ──
export interface SubjectRequirement {
  subject: string
  grade: string
  met: boolean
}

export interface UniversityProgram {
  name: string
  university: string
  type: 'University' | 'College' | 'Bootcamp' | 'Certificate'
  admissionAvg: string
  match: number
}

export interface CourseRequirement {
  course: string
  status: 'completed' | 'in-progress' | 'needed'
  note: string
}

export interface CareerPathway {
  hsSubjects: SubjectRequirement[]
  uniCourses: CourseRequirement[]
  universityPrograms: UniversityProgram[]
  alternatePaths: string[]
  firstJobOutOfSchool: string
  certifications: string[]
  keySkills: string[]
  timelineYears: number
}

export const careerPathways: Record<string, CareerPathway> = {
  'Doctor (Physician)': {
    hsSubjects: [
      { subject: 'Biology', grade: '90%+', met: true },
      { subject: 'Chemistry', grade: '85%+', met: false },
      { subject: 'Physics', grade: '80%+', met: true },
      { subject: 'Math (Calculus)', grade: '85%+', met: false },
      { subject: 'English', grade: '80%+', met: true },
    ],
    uniCourses: [
      { course: 'Organic Chemistry II', status: 'needed', note: 'Required for MCAT & med school' },
      { course: 'Biochemistry', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Human Anatomy', status: 'completed', note: 'Completed with A-' },
      { course: 'Statistics for Life Sciences', status: 'needed', note: 'Prerequisite for research methods' },
    ],
    universityPrograms: [
      { name: 'Bachelor of Science (Pre-Med)', university: 'University of Toronto', type: 'University', admissionAvg: '90%+', match: 95 },
      { name: 'Bachelor of Health Sciences', university: 'McMaster University', type: 'University', admissionAvg: '92%+', match: 93 },
      { name: 'Kinesiology', university: 'University of Waterloo', type: 'University', admissionAvg: '85%+', match: 82 },
      { name: 'Biomedical Science', university: 'University of Ottawa', type: 'University', admissionAvg: '87%+', match: 88 },
    ],
    alternatePaths: ['Nursing → Nurse Practitioner → MD Bridge', 'Paramedic → Pre-Med Mature Student', 'Biomedical Research → MD/PhD Program'],
    firstJobOutOfSchool: 'Medical Resident (PGY-1) — $60K–$75K at a teaching hospital',
    certifications: ['MCAT', 'CaRMS Match', 'LMCC (Licentiate of the Medical Council of Canada)'],
    keySkills: ['Critical Thinking', 'Communication', 'Empathy', 'Problem Solving', 'Attention to Detail'],
    timelineYears: 10,
  },
  'UX Designer': {
    hsSubjects: [
      { subject: 'Visual Arts', grade: '80%+', met: true },
      { subject: 'Computer Science', grade: '75%+', met: false },
      { subject: 'English', grade: '75%+', met: true },
      { subject: 'Psychology (if available)', grade: '80%+', met: false },
    ],
    uniCourses: [
      { course: 'Intro to HCI', status: 'completed', note: 'Completed with A' },
      { course: 'User Research Methods', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Visual Design Fundamentals', status: 'completed', note: 'Completed with B+' },
      { course: 'Cognitive Psychology', status: 'needed', note: 'Recommended elective' },
    ],
    universityPrograms: [
      { name: 'Human-Computer Interaction', university: 'University of Waterloo', type: 'University', admissionAvg: '85%+', match: 95 },
      { name: 'Digital Media', university: 'Sheridan College', type: 'College', admissionAvg: '75%+', match: 88 },
      { name: 'Interaction Design', university: 'Emily Carr University', type: 'University', admissionAvg: '80%+', match: 90 },
      { name: 'Google UX Design Certificate', university: 'Coursera / Google', type: 'Certificate', admissionAvg: 'N/A', match: 72 },
    ],
    alternatePaths: ['Bootcamp: UX/UI Design (12 weeks)', 'Self-taught + portfolio', 'Graphic Design → UX transition'],
    firstJobOutOfSchool: 'Junior UX Designer — $50K–$65K at a tech company or agency',
    certifications: ['Google UX Design Certificate', 'Nielsen Norman UX Certification'],
    keySkills: ['Figma/Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    timelineYears: 4,
  },
  'Data Analyst': {
    hsSubjects: [
      { subject: 'Math (Advanced Functions)', grade: '85%+', met: true },
      { subject: 'Computer Science', grade: '80%+', met: false },
      { subject: 'Statistics (if available)', grade: '80%+', met: false },
      { subject: 'English', grade: '75%+', met: true },
    ],
    uniCourses: [
      { course: 'Intro to Statistics', status: 'completed', note: 'Completed with A' },
      { course: 'Database Management (SQL)', status: 'needed', note: 'Core requirement' },
      { course: 'Python for Data Science', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Data Visualization', status: 'needed', note: 'Recommended for portfolio' },
    ],
    universityPrograms: [
      { name: 'Statistics', university: 'University of Toronto', type: 'University', admissionAvg: '87%+', match: 92 },
      { name: 'Data Science', university: 'University of British Columbia', type: 'University', admissionAvg: '85%+', match: 95 },
      { name: 'Business Analytics', university: 'Western University', type: 'University', admissionAvg: '83%+', match: 85 },
      { name: 'Data Analytics Certificate', university: 'Google / Coursera', type: 'Certificate', admissionAvg: 'N/A', match: 70 },
    ],
    alternatePaths: ['Business degree + SQL self-study', 'Bootcamp: Data Analytics (8 weeks)', 'Economics → Data transition'],
    firstJobOutOfSchool: 'Junior Data Analyst — $48K–$60K at a financial services or tech firm',
    certifications: ['Google Data Analytics Certificate', 'SQL Certification', 'Tableau Certification'],
    keySkills: ['SQL', 'Python/R', 'Excel', 'Data Visualization', 'Statistical Analysis'],
    timelineYears: 4,
  },
  'Product Manager': {
    hsSubjects: [
      { subject: 'English', grade: '80%+', met: true },
      { subject: 'Math', grade: '80%+', met: true },
      { subject: 'Business Studies', grade: '75%+', met: false },
      { subject: 'Computer Science', grade: '75%+', met: false },
    ],
    uniCourses: [
      { course: 'Product Design & Development', status: 'needed', note: 'Key elective for PM role' },
      { course: 'Business Strategy', status: 'completed', note: 'Completed with A-' },
      { course: 'Intro to UX/UI', status: 'in-progress', note: 'Builds product intuition' },
      { course: 'Technical Project Management', status: 'needed', note: 'Agile/Scrum foundations' },
    ],
    universityPrograms: [
      { name: 'Systems Design Engineering', university: 'University of Waterloo', type: 'University', admissionAvg: '90%+', match: 90 },
      { name: 'Commerce (Technology Management)', university: "Queen's University", type: 'University', admissionAvg: '87%+', match: 88 },
      { name: 'Computer Science + Business Minor', university: 'University of Toronto', type: 'University', admissionAvg: '88%+', match: 92 },
    ],
    alternatePaths: ['Engineering → PM transition', 'MBA with product focus', 'Design → PM pathway'],
    firstJobOutOfSchool: 'Associate Product Manager — $65K–$80K at a tech company',
    certifications: ['Pragmatic Institute PM Certification', 'Scrum Product Owner'],
    keySkills: ['Product Strategy', 'Stakeholder Management', 'Data Analysis', 'User Empathy', 'Roadmapping'],
    timelineYears: 4,
  },
  'Software Engineer': {
    hsSubjects: [
      { subject: 'Computer Science', grade: '85%+', met: false },
      { subject: 'Math (Calculus)', grade: '85%+', met: true },
      { subject: 'Physics', grade: '80%+', met: true },
      { subject: 'English', grade: '75%+', met: true },
    ],
    uniCourses: [
      { course: 'Data Structures & Algorithms', status: 'completed', note: 'Completed with A' },
      { course: 'Operating Systems', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Software Architecture', status: 'needed', note: 'Required for senior-level prep' },
      { course: 'Databases', status: 'completed', note: 'Completed with B+' },
    ],
    universityPrograms: [
      { name: 'Computer Science', university: 'University of Waterloo', type: 'University', admissionAvg: '93%+', match: 98 },
      { name: 'Software Engineering', university: 'University of Toronto', type: 'University', admissionAvg: '90%+', match: 95 },
      { name: 'Computer Programming', university: 'Seneca College', type: 'College', admissionAvg: '75%+', match: 78 },
      { name: 'Full-Stack Bootcamp', university: 'Lighthouse Labs', type: 'Bootcamp', admissionAvg: 'N/A', match: 65 },
    ],
    alternatePaths: ['Self-taught + open source portfolio', 'Coding bootcamp (12-16 weeks)', 'IT diploma → dev transition'],
    firstJobOutOfSchool: 'Junior Software Developer — $55K–$75K at a tech company',
    certifications: ['AWS Certified Developer', 'Meta Front-End Developer Certificate'],
    keySkills: ['JavaScript/TypeScript', 'Data Structures', 'System Design', 'Git', 'Problem Solving'],
    timelineYears: 4,
  },
  'Marketing Strategist': {
    hsSubjects: [
      { subject: 'English', grade: '80%+', met: true },
      { subject: 'Business Studies', grade: '75%+', met: true },
      { subject: 'Math', grade: '70%+', met: true },
      { subject: 'Media Studies (if available)', grade: '75%+', met: false },
    ],
    uniCourses: [
      { course: 'Consumer Behaviour', status: 'completed', note: 'Completed with A-' },
      { course: 'Digital Marketing Analytics', status: 'needed', note: 'Key for data-driven marketing' },
      { course: 'Brand Management', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Marketing Research Methods', status: 'needed', note: 'Required for strategy roles' },
    ],
    universityPrograms: [
      { name: 'Marketing', university: 'Schulich School of Business (York)', type: 'University', admissionAvg: '85%+', match: 92 },
      { name: 'Communications', university: 'Carleton University', type: 'University', admissionAvg: '80%+', match: 85 },
      { name: 'Digital Marketing', university: 'Humber College', type: 'College', admissionAvg: '75%+', match: 80 },
    ],
    alternatePaths: ['Google Digital Marketing Certificate', 'Freelance → agency path', 'PR → Marketing transition'],
    firstJobOutOfSchool: 'Marketing Coordinator — $42K–$55K at a media or retail company',
    certifications: ['Google Ads Certification', 'HubSpot Inbound Marketing', 'Meta Blueprint'],
    keySkills: ['Content Strategy', 'Analytics', 'Social Media', 'SEO/SEM', 'Brand Development'],
    timelineYears: 4,
  },
  'Business Analyst': {
    hsSubjects: [
      { subject: 'Math', grade: '80%+', met: true },
      { subject: 'English', grade: '80%+', met: true },
      { subject: 'Business Studies', grade: '75%+', met: false },
      { subject: 'Computer Science', grade: '70%+', met: false },
    ],
    uniCourses: [
      { course: 'Systems Analysis & Design', status: 'completed', note: 'Completed with A' },
      { course: 'Business Process Modelling', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'SQL & Database Fundamentals', status: 'needed', note: 'Core technical skill' },
      { course: 'Requirements Engineering', status: 'needed', note: 'Essential for BA role' },
    ],
    universityPrograms: [
      { name: 'Commerce (Information Systems)', university: "Queen's University", type: 'University', admissionAvg: '87%+', match: 90 },
      { name: 'Management Information Systems', university: 'University of Toronto', type: 'University', admissionAvg: '85%+', match: 88 },
      { name: 'Business Technology Management', university: 'Toronto Metropolitan University', type: 'University', admissionAvg: '82%+', match: 85 },
    ],
    alternatePaths: ['Any business degree + CBAP certification', 'IT background → BA transition', 'Consulting analyst → BA role'],
    firstJobOutOfSchool: 'Junior Business Analyst — $50K–$62K at a consulting firm',
    certifications: ['CBAP (Certified Business Analysis Professional)', 'IIBA Entry Certificate', 'Agile/Scrum Certification'],
    keySkills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Stakeholder Communication', 'Documentation'],
    timelineYears: 4,
  },
  'Nurse Practitioner': {
    hsSubjects: [
      { subject: 'Biology', grade: '85%+', met: true },
      { subject: 'Chemistry', grade: '80%+', met: false },
      { subject: 'Math', grade: '75%+', met: true },
      { subject: 'English', grade: '80%+', met: true },
    ],
    uniCourses: [
      { course: 'Pathophysiology', status: 'completed', note: 'Completed with A' },
      { course: 'Pharmacology', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Advanced Health Assessment', status: 'needed', note: 'Required for NP stream' },
      { course: 'Clinical Practicum Hours', status: 'needed', note: '500+ hours required' },
    ],
    universityPrograms: [
      { name: 'Bachelor of Nursing (BScN)', university: 'University of Toronto', type: 'University', admissionAvg: '85%+', match: 95 },
      { name: 'Nursing', university: 'McMaster University', type: 'University', admissionAvg: '87%+', match: 92 },
      { name: 'Practical Nursing', university: 'George Brown College', type: 'College', admissionAvg: '78%+', match: 75 },
    ],
    alternatePaths: ['PSW → RPN → RN → NP pathway', 'International nursing credential recognition', 'Paramedic → Nursing bridge'],
    firstJobOutOfSchool: 'Registered Nurse (RN) — $65K–$85K at a hospital or clinic',
    certifications: ['NCLEX-RN', 'NP Certification (CNA)', 'BLS/ACLS'],
    keySkills: ['Patient Assessment', 'Critical Thinking', 'Communication', 'Clinical Skills', 'Empathy'],
    timelineYears: 6,
  },
  'Environmental Scientist': {
    hsSubjects: [
      { subject: 'Biology', grade: '80%+', met: true },
      { subject: 'Chemistry', grade: '80%+', met: false },
      { subject: 'Geography', grade: '75%+', met: true },
      { subject: 'Math', grade: '75%+', met: true },
    ],
    uniCourses: [
      { course: 'Environmental Chemistry', status: 'completed', note: 'Completed with B+' },
      { course: 'GIS & Remote Sensing', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Environmental Impact Assessment', status: 'needed', note: 'Required for EP designation' },
      { course: 'Ecology & Conservation', status: 'completed', note: 'Completed with A-' },
    ],
    universityPrograms: [
      { name: 'Environmental Science', university: 'University of Guelph', type: 'University', admissionAvg: '82%+', match: 95 },
      { name: 'Earth & Environmental Sciences', university: 'University of Waterloo', type: 'University', admissionAvg: '83%+', match: 90 },
      { name: 'Environmental Technology', university: 'Fleming College', type: 'College', admissionAvg: '75%+', match: 78 },
    ],
    alternatePaths: ['Biology degree → Environmental consulting', 'Geography → GIS specialization', 'Engineering → Environmental engineering'],
    firstJobOutOfSchool: 'Environmental Technician — $45K–$55K at a consulting firm or government agency',
    certifications: ['EP (Environmental Professional)', 'GIS Certification', 'P.Geo (Professional Geoscientist)'],
    keySkills: ['Field Sampling', 'Data Analysis', 'GIS', 'Report Writing', 'Environmental Regulations'],
    timelineYears: 4,
  },
  'Financial Advisor': {
    hsSubjects: [
      { subject: 'Math', grade: '85%+', met: true },
      { subject: 'English', grade: '80%+', met: true },
      { subject: 'Business Studies', grade: '75%+', met: false },
      { subject: 'Economics (if available)', grade: '80%+', met: false },
    ],
    uniCourses: [
      { course: 'Corporate Finance', status: 'completed', note: 'Completed with A' },
      { course: 'Investment Analysis', status: 'in-progress', note: 'Currently enrolled' },
      { course: 'Financial Planning Principles', status: 'needed', note: 'Required for CFP prep' },
      { course: 'Tax & Estate Planning', status: 'needed', note: 'Key for advisory practice' },
    ],
    universityPrograms: [
      { name: 'Finance', university: 'University of Toronto (Rotman)', type: 'University', admissionAvg: '88%+', match: 95 },
      { name: 'Economics', university: 'University of British Columbia', type: 'University', admissionAvg: '85%+', match: 85 },
      { name: 'Financial Planning', university: 'Seneca College', type: 'College', admissionAvg: '75%+', match: 78 },
    ],
    alternatePaths: ['Any degree + CFP certification', 'Accounting → Financial advisory', 'Insurance → Wealth management transition'],
    firstJobOutOfSchool: 'Financial Services Representative — $45K–$55K + commissions at a bank or advisory firm',
    certifications: ['CFP (Certified Financial Planner)', 'CFA (Chartered Financial Analyst)', 'CSC (Canadian Securities Course)'],
    keySkills: ['Financial Analysis', 'Client Relationship', 'Risk Assessment', 'Portfolio Management', 'Communication'],
    timelineYears: 4,
  },
}

// ── Mock Mentors ──
export interface Mentor {
  name: string
  role: string
  company: string
  experience: string
  availability: string
  avatar: string
}

export const mockMentors: Record<string, Mentor[]> = {
  'Doctor (Physician)': [
    { name: 'Dr. Sarah Chen', role: 'Family Physician', company: 'Toronto General Hospital', experience: '12 years', availability: 'Bi-weekly', avatar: 'SC' },
    { name: 'Dr. Michael Osei', role: 'Orthopedic Surgeon', company: 'Sunnybrook Hospital', experience: '18 years', availability: 'Monthly', avatar: 'MO' },
  ],
  'UX Designer': [
    { name: 'Priya Sharma', role: 'Senior UX Designer', company: 'Shopify', experience: '8 years', availability: 'Weekly', avatar: 'PS' },
    { name: 'James Liu', role: 'Design Lead', company: 'Google', experience: '10 years', availability: 'Bi-weekly', avatar: 'JL' },
  ],
  'Data Analyst': [
    { name: 'Emily Zhang', role: 'Senior Data Analyst', company: 'RBC', experience: '6 years', availability: 'Weekly', avatar: 'EZ' },
    { name: 'David Park', role: 'Analytics Manager', company: 'Deloitte', experience: '9 years', availability: 'Monthly', avatar: 'DP' },
  ],
  'Software Engineer': [
    { name: 'Alex Rivera', role: 'Staff Engineer', company: 'Shopify', experience: '11 years', availability: 'Bi-weekly', avatar: 'AR' },
    { name: 'Nina Patel', role: 'Engineering Manager', company: 'Amazon', experience: '14 years', availability: 'Monthly', avatar: 'NP' },
  ],
}

// ── Mock Jobs / Exposure Opportunities ──
export interface JobPosting {
  title: string
  company: string
  type: 'Part-time' | 'Full-time' | 'Volunteer' | 'Co-op' | 'Internship'
  salary: string
  relevance: string
}

export const mockJobs: Record<string, { highschool: JobPosting[], university: JobPosting[], professional: JobPosting[] }> = {
  'Doctor (Physician)': {
    highschool: [
      { title: 'Hospital Volunteer', company: 'Toronto General Hospital', type: 'Volunteer', salary: 'Unpaid', relevance: 'Gain exposure to hospital settings' },
      { title: 'Lab Assistant (Part-time)', company: 'LifeLabs', type: 'Part-time', salary: '$16/hr', relevance: 'Build lab skills and patient interaction' },
    ],
    university: [
      { title: 'Research Assistant (Biology)', company: 'UofT Research Lab', type: 'Co-op', salary: '$22/hr', relevance: 'Research experience for med school applications' },
      { title: 'Clinical Observer', company: 'Mount Sinai Hospital', type: 'Internship', salary: 'Unpaid', relevance: 'Shadowing physicians in clinical settings' },
    ],
    professional: [
      { title: 'Medical Resident', company: 'Sunnybrook Hospital', type: 'Full-time', salary: '$65K', relevance: 'Residency training program' },
    ],
  },
  'UX Designer': {
    highschool: [
      { title: 'Graphic Design Intern', company: 'Local Design Studio', type: 'Part-time', salary: '$17/hr', relevance: 'Build design fundamentals' },
    ],
    university: [
      { title: 'UX Design Intern', company: 'Shopify', type: 'Co-op', salary: '$28/hr', relevance: 'Real product design experience' },
      { title: 'UI/UX Co-op', company: 'RBC Digital', type: 'Co-op', salary: '$25/hr', relevance: 'Financial product design' },
    ],
    professional: [
      { title: 'Senior UX Designer', company: 'Shopify', type: 'Full-time', salary: '$95K–$130K', relevance: 'Lead design for product teams' },
    ],
  },
  'Data Analyst': {
    highschool: [
      { title: 'Data Entry Clerk (Part-time)', company: 'Local Business', type: 'Part-time', salary: '$16/hr', relevance: 'Develop attention to detail with data' },
    ],
    university: [
      { title: 'Data Analyst Intern', company: 'Deloitte', type: 'Co-op', salary: '$26/hr', relevance: 'Real analytics project work' },
      { title: 'Business Intelligence Co-op', company: 'TD Bank', type: 'Co-op', salary: '$24/hr', relevance: 'Financial data analysis' },
    ],
    professional: [
      { title: 'Senior Data Analyst', company: 'Shopify', type: 'Full-time', salary: '$85K–$110K', relevance: 'Lead analytics for business decisions' },
    ],
  },
}

// Default jobs for careers without specific listings
export const defaultJobs: { highschool: JobPosting[], university: JobPosting[], professional: JobPosting[] } = {
  highschool: [
    { title: 'General Part-time Role', company: 'Various', type: 'Part-time', salary: '$16/hr', relevance: 'Build foundational work experience' },
  ],
  university: [
    { title: 'Industry Internship', company: 'Various', type: 'Co-op', salary: '$22/hr', relevance: 'Gain industry-specific experience' },
  ],
  professional: [
    { title: 'Senior Role', company: 'Various', type: 'Full-time', salary: 'Competitive', relevance: 'Advance your career' },
  ],
}
