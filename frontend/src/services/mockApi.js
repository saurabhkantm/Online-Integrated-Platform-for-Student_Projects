export const colleges = ['Sigma Institute of Engineering', 'Nirma University', 'PDPU School of Technology', 'L.D. College of Engineering', 'Government Engineering College']
export const departments = ['Computer Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering', 'Artificial Intelligence & Data Science']
export const technologies = ['React', 'Node.js', 'Python', 'Django', 'Flutter', 'TensorFlow', 'MongoDB', 'Firebase', 'Java', 'Spring Boot', 'IoT', 'Solidity']
export const academicYears = [2026, 2025, 2024, 2023]

export const students = [
  { id: 'STU-1001', name: 'Aarav Mehta', college: colleges[0], department: departments[0] },
  { id: 'STU-1002', name: 'Riya Patel', college: colleges[0], department: departments[1] },
  { id: 'STU-1003', name: 'Kabir Joshi', college: colleges[1], department: departments[2] },
]

export const projects = [
  {
    id: 'PRJ-1060',
    title: 'AgroSense — Smart Crop Monitoring',
    description: 'IoT platform for crop monitoring, irrigation recommendations, and mobile analytics dashboards.',
    department: departments[0],
    college: colleges[0],
    year: 2026,
    techStack: ['IoT', 'React', 'Node.js', 'MongoDB'],
    status: 'Approved',
    submittedDate: '2026-05-12',
    facultyRemarks: 'Strong methodology and documentation. Approved.',
    similarity: 8,
    flagged: false,
    github: 'https://github.com/aaravm/agrosense',
    demo: 'https://agrosense-demo.vercel.app',
    documentation: 'AgroSense_Report.pdf',
    presentation: 'AgroSense_Presentation.pdf',
    screenshots: ['agrosense-1.png'],
  },
  {
    id: 'PRJ-1061',
    title: 'MediQueue — Hospital Token System',
    description: 'Queue management system for hospital OPDs with live updates and SMS notifications.',
    department: departments[0],
    college: colleges[0],
    year: 2026,
    techStack: ['Python', 'Django', 'Firebase'],
    status: 'Pending',
    submittedDate: '2026-06-10',
    facultyRemarks: 'Under review for deployment and scalability.',
    similarity: 18,
    flagged: false,
    github: 'https://github.com/aaravm/mediqueue',
    demo: 'https://mediqueue.netlify.app',
    documentation: 'MediQueue_Report.pdf',
    presentation: 'MediQueue_Presentation.pdf',
    screenshots: ['mediqueue-1.png'],
  },
  {
    id: 'PRJ-1062',
    title: 'CampusEats — Canteen Pre-Order App',
    description: 'Pre-order food for campus canteens with order tracking and vendor menus.',
    department: departments[0],
    college: colleges[0],
    year: 2025,
    techStack: ['Flutter', 'Java', 'Spring Boot'],
    status: 'Rejected',
    submittedDate: '2026-04-02',
    facultyRemarks: 'High similarity detected; needs original backend flow.',
    similarity: 41,
    flagged: true,
    github: 'https://github.com/aaravm/campuseats',
    demo: '',
    documentation: 'CampusEats_Proposal.pdf',
    presentation: 'CampusEats_Presentation.pdf',
    screenshots: ['campuseats-1.png'],
  },
]

export const notifications = [
  { id: 'NTF-201', type: 'success', title: 'Project Approved', message: 'AgroSense has been approved and published to the repository.', date: '2026-05-18' },
  { id: 'NTF-202', type: 'warning', title: 'Changes Requested', message: 'EcoTrack needs tests and deployment details before final approval.', date: '2026-06-05' },
  { id: 'NTF-203', type: 'danger', title: 'Similarity Alert', message: 'CampusEats has been flagged for high similarity with archive content.', date: '2026-04-09' },
  { id: 'NTF-204', type: 'info', title: 'New Announcement', message: 'University hackathon registrations are open now.', date: '2026-06-17' },
]

export const facultyFeedback = [
  { id: 'FB-301', projectId: 'PRJ-1060', reviewer: 'Dr. Priya Nair', comment: 'Excellent innovation and strong documentation.', category: 'Innovation', rating: 4.7 },
  { id: 'FB-302', projectId: 'PRJ-1061', reviewer: 'Dr. Priya Nair', comment: 'Consider adding deployment instructions.', category: 'Technical Implementation', rating: 4.1 },
]

export const analyticsData = {
  departmentDistribution: [
    { name: 'Computer Engineering', value: 42 },
    { name: 'Information Technology', value: 26 },
    { name: 'AI & Data Science', value: 18 },
    { name: 'Electronics & Communication', value: 14 },
  ],
  approvalTrends: [
    { month: 'Jan', approved: 12, pending: 5, rejected: 2 },
    { month: 'Feb', approved: 16, pending: 3, rejected: 4 },
    { month: 'Mar', approved: 18, pending: 6, rejected: 3 },
    { month: 'Apr', approved: 14, pending: 7, rejected: 5 },
    { month: 'May', approved: 22, pending: 4, rejected: 2 },
    { month: 'Jun', approved: 20, pending: 6, rejected: 3 },
  ],
  technologyUsage: [
    { name: 'React', value: 38 },
    { name: 'Python', value: 32 },
    { name: 'Flutter', value: 24 },
    { name: 'Node.js', value: 18 },
    { name: 'MongoDB', value: 14 },
  ],
}
