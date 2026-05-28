export interface Project {
  id: string
  index: string
  title: string
  year: string
  description: string
  tags: string[]
  model?: string      // path to .glb in /public/models/
  modelZoom?: number  // camera distance — larger = more zoomed out (default 14)
  image?: string      // card thumbnail and article hero image
}

export interface Experience {
  company: string
  image?: string     // 16:10 image for the left panel, e.g. '/images/company.jpg'
  role: string
  period: string
  description: string
  location?: string
  current?: boolean  // marks the active / "now" position
}

export interface Profile {
  bio: string
  links?: {
    email?:    string

    linkedin?: string
    resume?:   string
  }
  education: {
    logo?: string    // path to logo image, e.g. '/logos/mit.png'
    name: string
    year: string     // e.g. '2025'
    detail: string   // degree program
  }
  work: {
    logo?: string
    name: string
    role: string
    focus: string
  }
  previous?: { name: string; role: string }[]
}

// ── Replace with your actual content ─────────────────────────

export const profile: Profile = {
  bio: 'Hi! I\'m a platform-level electrical hardware engineer currently interested in high-speed transmission and communications hardware.\n\nI\'m also a car enthusiast and fond of visual design. And a weightlifter ᕦ(ò_óˇ)ᕤ.\nI hope you enjoy my website :)',
  links: {
    email:    'c56pan@uwaterloo.ca',
    linkedin: 'https://linkedin.com/in/chenyu-pan',
    resume: '/resume.pdf',
  },
  education: {
    logo: '/logos/uw.png',
    name: 'University of Waterloo',
    year: '2030',
    detail: 'B.A.Sc. in Electrical Engineering',
  },
  work: {
    logo: '/logos/warg.jpg',
    name: 'Waterloo Aerial Robotics Group',
    role: 'Electrical Designer',
    focus: 'Electrical Engineering · Hardware Engineering',
  },
  previous: [
    { name: 'WSP Canada', role: 'Systems Engineering Intern' },
    { name: 'City of Vaughan',    role: 'Data and Technology Intern' },
  ],
}

export const projects: Project[] = [
  {
    id: 'qr-flyback',
    index: '01',
    title: 'Quasi-Resonant Flyback Power Converter',
    year: '2026',
    description:
      'Power conversion system with custom magnetics capable of delivering 60W DC from 120 VAC mains power, with up to 92% efficiency.',
    tags: ['Altium', 'LTspice', 'SIMPLIS'],
    model: '/models/qr_flyback.glb',
    modelZoom: 14,
  },
  {
    id: 'dual-diff-drive',
    index: '02',
    title: 'Dual-Motor Differential Drive Controller',
    year: '2025',
    description:
      'Highly integrated dual motor controller with support for Field-Oriented Control and extensive I/O, including MicroSD, CAN, UART, and hall sensing.',
    tags: ['Altium', 'LTspice'],
    model: '/models/dual_motor_diff.glb',
  },
  {
    id: 'hrvita',
    index: '03',
    title: 'HRVita - Wrist-Wearable Delirium IoT Screening System',
    year: '2025',
    description:
      'A clinical-backed IoT system that predicts hospital-induced delirium 2-4 hours in advance using HRV and SpO₂, featuring a real-time dashboard and ergonomics.',
    tags: ['ESP32', 'C++', 'IoT'],
    image: '/images/hrvita.png',
  },
  {
    id: 'hawkeye-fc',
    index: '04',
    title: 'HawkEye - Quadcopter Flight Controller',
    year: 'Work in Progress',
    description:
      'A densely integrated flight controller intended for 4-in-1 ESCs featuring extensive I/O expansion and ExpressLRS RF, with an STM32 and ESP32 processor core.',
    tags: ['KiCad'],

  },
]

export const experience: Experience[] = [
  {
    company: 'WSP Canada',
    image: '/images/wsp.jpg',
    role: 'Systems Engineering Intern',
    period: 'Jan 2026 - Apr 2026',
    description: 'Internal engineering tools, risk reports, and modelling for major Toronto metro projects, cutting turnaround time by up to 90%.',
    location: 'Toronto, ON',
  },
  {
    company: 'City of Vaughan',
    image: '/images/vaughan.png',
    role: 'Data and Technology Intern',
    period: 'Sep 2024 - Jan 2025',
    description: 'Data analysis, Power Automate workflows, and central GIS overhauls for infrastructure planning and asset management.',
    location: 'Vaughan, ON',
  },
  {
    company: 'Waterloo Aerial Robotics Group',
    image: '/images/warg.jpg',
    role: 'Electrical Designer',
    period: 'Sep 2025 - Present',
    description: 'Electrical platform design and validation for competition UAVs from concept to prototyping.',
    location: 'Waterloo, ON',
  },
]
