import type {
  AcademicItem,
  BootcampItem,
  CertificateItem,
  DicodingLearningStep,
  EngineeringHighlight,
  ExperienceItem,
  HobbySectionItem,
  ProjectItem,
  SkillItem,
  StatItem,
} from '@/types/portfolio'

export const STATS: StatItem[] = [
  { value: '4+', label: 'Years Exp.' },
  { value: '7+', label: 'Apps Built' },
  { value: '2M+', label: 'Lines Coded' },
  { value: '∞', label: 'Coffee Cups' },
]

export const CORE_STACK_ITEMS: SkillItem[] = [
  // Mobile Development
  { name: 'Flutter & Dart', category: 'Mobile' },
  { name: 'Kotlin & Android', category: 'Mobile' },
  { name: 'Bloc', category: 'Mobile' },
  { name: 'Provider', category: 'Mobile' },
  { name: 'GetX', category: 'Mobile' },
  // Web Development
  { name: 'Vue.js & TypeScript', category: 'Web' },
  { name: 'Nuxt.js', category: 'Web' },
  { name: 'Vite', category: 'Web' },
  { name: 'React.js', category: 'Web' },
  { name: 'Tailwind CSS', category: 'Web' },
  // Backend & Cloud
  { name: 'Node.js & Express.js', category: 'Backend & Cloud' },
  { name: 'Laravel & PHP', category: 'Backend & Cloud' },
  { name: 'REST API', category: 'Backend & Cloud' },
  { name: 'MySQL & PostgreSQL', category: 'Backend & Cloud' },
  { name: 'MongoDB', category: 'Backend & Cloud' },
  { name: 'Firebase', category: 'Backend & Cloud' },
  // Architecture & DevOps
  { name: 'Clean Architecture', category: 'Architecture & DevOps' },
  { name: 'Domain-Driven Design', category: 'Architecture & DevOps' },
  { name: 'Git & GitLab', category: 'Architecture & DevOps' },
  { name: 'CI/CD', category: 'Architecture & DevOps' },
  { name: 'Azure DevOps', category: 'Architecture & DevOps' },
  { name: 'Jira', category: 'Architecture & DevOps' },
  { name: 'Postman & Swagger', category: 'Architecture & DevOps' },
  { name: 'Unit Testing', category: 'Architecture & DevOps' },
  { name: 'Integration Testing', category: 'Architecture & DevOps' },
  // AI & Design
  { name: 'Python', category: 'AI & Design' },
  { name: 'Machine Learning', category: 'AI & Design' },
  { name: 'Google Colab', category: 'AI & Design' },
  { name: 'Figma', category: 'AI & Design' },
  { name: 'Google Maps', category: 'AI & Design' },
]

export const CORE_STACK: string[] = CORE_STACK_ITEMS.map((item) => item.name)

export const MAIN_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'home-credit-indonesia',
    role: 'Jr. IT Developer (Flutter)',
    company: 'Home Credit Indonesia',
    period: 'Mar 2024 — Present',
    type: 'Full-time',
    isPrimary: true,
    highlightCompany: true,
    summary:
      'Spearheading the development of fintech mobile applications tailored for internal product scaling. Leveraging Domain-Driven Design (DDD) and Clean Architecture to handle massive data flows securely and reliably.',
    highlights: [
      'Implemented advanced state management via <strong>Bloc</strong> for highly intricate and asynchronous user flows.',
      'Seamless native integration using <strong>Flutter Method Channels</strong> for Innovatrics SDK (biometric selfie &amp; ID capture).',
      'Maintained CI/CD pipelines via <strong>Azure DevOps</strong> &amp; GitLab CI, distributing automated builds via Firebase App Distribution.',
    ],
    tags: ['Flutter', 'Bloc', 'Clean Architecture', 'Azure DevOps', 'Innovatrics SDK'],
  },
  {
    id: 'infomedia-solusi-humanika',
    role: 'Mobile Platform Officer',
    company: 'PT. Infomedia Solusi Humanika',
    period: 'Sep 2023 — Mar 2024',
    type: 'Contract',
    isPrimary: false,
    highlightCompany: false,
    summary:
      'Tasked with ensuring the optimal performance and ongoing innovation of production-grade mobile applications. Spearheaded offline-first functionality implementations.',
    highlights: [
      'Engineered robust <strong>offline-first functionality</strong> utilizing Hive local storage algorithms.',
      'Orchestrated seamless Play Store deployments alongside real-time Crashlytics monitoring.',
      'Drafted elegant Figma prototypes (Lo-Fi and Hi-Fi) before committing to codebase improvements.',
    ],
  },
]

export const FREELANCE_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'kpc-freelance',
    role: 'Flutter Developer',
    company: 'PT. Kaltim Prima Coal',
    period: 'Jul 2023 – Mar 2024',
    type: 'Freelance',
    summary:
      'Architected and engineered enterprise field mining applications (HSES App & Kimper by KPC) leveraging Flutter, Dart, GetX, and HiveDB with full offline capabilities and automated background data synchronization.',
  },
  {
    id: 'genero-backend',
    role: 'Backend Developer',
    company: 'PT. Genero Pharmaceuticals',
    period: 'Jan 2023 – Mar 2023',
    type: 'Freelance',
    summary:
      'Architected RESTful APIs using Laravel PHP framework, optimized SQL queries, and implemented JWT security layers.',
  },
  {
    id: 'ini-kuliner',
    role: 'Mobile Developer',
    company: 'PT. Ini Kuliner Indonesia',
    period: 'Jan 2023 - Apr 2023',
    type: 'Freelance',
    summary:
      'Integrated Geolocation rendering and complex Bloc state flows for food-delivery routing and ordering apps.',
  },
  {
    id: 'genero-fullstack',
    role: 'Full-Stack Developer',
    company: 'PT. Genero Pharmaceuticals',
    period: 'Jul 2022 – Aug 2022',
    type: 'Freelance',
    summary:
      'Built dynamic UI interfaces driven by rapid RESTful APIs leveraging Redux Toolkit and modern data fetching techniques.',
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hses-kpc',
    title: 'HSES App',
    company: 'PT. Kaltim Prima Coal',
    role: 'Flutter Mobile Developer',
    platform: 'Android & iOS (Enterprise HSE Mining)',
    summary:
      'Essential HSE field tool for PT. Kaltim Prima Coal featuring full offline operations, On Spot Monitoring, hazard reporting, commissioning, and automated background data synchronization.',
    challenge:
      'Safety and health inspections in mining fields frequently occur in remote pits without internet connectivity. Incident reports, hazard photos, and commissioning records must remain 100% operable offline and synchronize automatically once connectivity is detected without data loss.',
    architecture:
      'Engineered with Flutter, Dart, GetX state management, and HiveDB local caching with a dedicated background sync worker queue.',
    keyContributions: [
      'Architected seamless offline and online dual-mode capability: full offline inspection execution with automated background synchronization upon network recovery.',
      'Developed On Spot Monitoring for live field safety audits, compliance tracking, and immediate hazard logging.',
      'Implemented Hazard Reporting modules complete with compressed photo attachments, precise geolocation tagging, and incident dispatch.',
      'Constructed Commissioning workflows ensuring structured multi-stage documentation to minimize operational and environmental risks.',
    ],
    tags: ['Flutter', 'Dart', 'GetX', 'HiveDB', 'Offline-First', 'Background Sync'],
    featured: true,
    gradientClass: 'from-emerald-500 to-teal-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
  },
  {
    id: 'kimper-kpc',
    title: 'Kimper By KPC',
    company: 'PT. Kaltim Prima Coal',
    role: 'Flutter Mobile Developer',
    platform: 'Android & iOS (Enterprise Mining)',
    summary:
      'Heavy equipment compliance and operation mobile app developed for PT. Kaltim Prima Coal leveraging local data synching.',
    challenge:
      'Mining field operations frequently occur in remote zones with intermittent or zero network connectivity, requiring reliable offline permit verification and equipment inspection workflows.',
    architecture:
      'Built on Clean Architecture with GetX state management and Hive NoSQL local storage for deterministic offline-first synchronization.',
    keyContributions: [
      'Engineered offline-first data caching and background synchronization queues with Hive.',
      'Integrated QR/barcode scanning and geolocation tracking via Google Maps SDK for field compliance inspections.',
      'Designed modular presentation and domain layers to keep field operator workflows responsive under heavy local datasets.',
    ],
    tags: ['Flutter', 'Dart', 'GetX', 'Hive', 'Clean Architecture'],
    featured: true,
    gradientClass: 'from-blue-500 to-blue-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>',
  },
  {
    id: 'oneapp-cimb',
    title: 'OneAppCIMB',
    company: 'PT. Bank CIMB Niaga',
    role: 'Mobile Engineer (Flutter)',
    platform: 'Android & iOS (Fintech / Banking)',
    summary:
      'Banking and financial service application built for PT. Bank CIMB Niaga, focusing on extreme security and massive concurrency.',
    challenge:
      'Financial workflows demand strict data integrity, multi-step asynchronous state transitions, and zero-defect UI responsiveness across diverse mobile devices.',
    architecture:
      'Implemented Clean Architecture paired with Bloc state management and hardened RESTful API integration layers.',
    keyContributions: [
      'Architected predictable, testable Bloc state flows for complex banking transactions and account management screens.',
      'Enforced strict separation between domain entities, data repositories, and UI widgets.',
      'Collaborated within Agile Scrum squads alongside QA and backend teams to meet banking-grade security and reliability standards.',
    ],
    tags: ['Flutter', 'Dart', 'Bloc', 'RESTful API', 'Clean Architecture'],
    featured: true,
    gradientClass: 'from-red-500 to-rose-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
  },
  {
    id: 'vmon-btn',
    title: 'VMon BTN',
    company: 'PT. Bank Tabungan Negara (BTN)',
    role: 'Mobile Engineer (Flutter)',
    platform: 'Android & iOS (Enterprise Dashboard)',
    summary:
      'Data visualization and monitoring dashboard application for PT. Bank Tabungan Negara (BTN) providing live branch metrics.',
    challenge:
      'Transforming high-volume real-time branch operational metrics into clear, actionable mobile charts and status indicators without frame drops.',
    architecture:
      'Clean Architecture with Bloc pattern for reactive stream updates and optimized chart rendering components.',
    keyContributions: [
      'Developed real-time monitoring dashboards displaying nationwide branch performance and operational health.',
      'Optimized API polling, pagination, and state diffing in Bloc to prevent unnecessary widget rebuilds.',
      'Delivered intuitive executive filtering and drill-down views tailored for mobile decision-makers.',
    ],
    tags: ['Flutter', 'Dart', 'RESTful API', 'Bloc', 'Clean Architecture'],
    featured: true,
    gradientClass: 'from-indigo-500 to-purple-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
  },
  {
    id: 'toko-cung',
    title: 'Toko Cung: Menyala!',
    company: 'CV Cipta Niaga Gemilang',
    role: 'Mobile Developer',
    platform: 'Android & iOS (Consumer Commerce)',
    summary: 'Consumer App (CV Cipta Niaga Gemilang)',
    challenge:
      'Delivering a fast, frictionless consumer ordering and catalog browsing experience with real-time cart and order status updates.',
    architecture: 'Modular Flutter architecture with reactive state management and REST API integration.',
    keyContributions: [
      'Built end-to-end product catalog, shopping cart, and checkout flows.',
      'Integrated push notifications and real-time order tracking for end consumers.',
      'Tuned image caching and list virtualization for smooth scrolling on entry-level devices.',
    ],
    tags: ['Flutter', 'Dart', 'REST API', 'State Management', 'E-Commerce'],
    featured: false,
    gradientClass: 'from-orange-500 to-amber-600',
    miniIconColorClass: 'bg-orange-500/20 text-orange-500',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
  },
  {
    id: 'sintesys-joyday',
    title: 'Sintesys Joyday Hawker',
    company: 'PT. Yili Indonesia Dairy',
    role: 'Mobile Developer',
    platform: 'Android (Enterprise Distribution)',
    summary: 'Enterprise Delivery App (PT. Yili Indonesia Dairy)',
    challenge:
      'Supporting field distribution and hawker sales operations with reliable daily stock tracking, route visits, and transaction recording.',
    architecture: 'Clean Architecture with offline-resilient local storage and geolocation verification.',
    keyContributions: [
      'Implemented daily stock reconciliation, sales recording, and delivery route tracking.',
      'Added offline persistence so field agents can record transactions in low-signal areas.',
      'Streamlined UI workflows to minimize input time for mobile sales representatives.',
    ],
    tags: ['Flutter', 'Dart', 'Offline-First', 'Geolocation', 'Enterprise'],
    featured: false,
    gradientClass: 'from-teal-500 to-emerald-600',
    miniIconColorClass: 'bg-teal-500/20 text-teal-400',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354l-9 6H3v10.5A1.5 1.5 0 004.5 22h15a1.5 1.5 0 001.5-1.5V10.354h0l-9-6z"></path></svg>',
  },
]

export const ENGINEERING_HIGHLIGHTS: EngineeringHighlight[] = [
  {
    id: 'flutter-architecture',
    title: 'Flutter Architecture',
    cardIcon:
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
    icon:
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
    problem: 'Application complexity increased as features and business logic grew.',
    approach: 'Applied Clean Architecture with Bloc to separate presentation, domain, and data responsibilities.',
    solution: 'Applied Clean Architecture with Bloc to separate presentation, domain, and data responsibilities.',
    result: 'Improved maintainability, separation of concerns, and easier feature development.',
    tags: ['Flutter', 'Bloc', 'Clean Architecture'],
  },
  {
    id: 'native-integration',
    title: 'Native Integration',
    cardIcon:
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    icon:
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    problem: 'Some application capabilities required platform-specific Android and iOS functionality.',
    approach: 'Integrated Flutter with native platform code using MethodChannel.',
    solution: 'Integrated Flutter with native platform code using MethodChannel.',
    result: 'Enabled Flutter applications to communicate with native Android and iOS capabilities.',
    tags: ['Flutter', 'Kotlin', 'Swift', 'MethodChannel'],
  },
  {
    id: 'mobile-testing',
    title: 'Mobile Testing',
    cardIcon:
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
    icon:
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
    problem: 'Repeated manual regression testing became time-consuming for critical application flows.',
    approach: 'Introduced automated testing for important application scenarios and regression flows.',
    solution: 'Introduced automated testing for important application scenarios and regression flows.',
    result: 'More consistent regression checks and reduced repetitive manual testing.',
    tags: ['Flutter', 'Testing', 'Automation'],
  },
  {
    id: 'ml-research',
    title: 'ML Research',
    cardIcon:
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    icon:
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    problem: 'Identify unusual patterns in mobile application event logs.',
    approach: 'Experimented with Autoencoder and traditional anomaly detection approaches.',
    solution: 'Experimented with Autoencoder and traditional anomaly detection approaches.',
    result: 'Built an experimental pipeline for detecting anomalous user behavior from event logs.',
    tags: ['Python', 'Machine Learning', 'Autoencoder'],
  },
]

export const ACADEMIC_EDUCATION: AcademicItem[] = [
  {
    id: 's2-ipb',
    degree: 'S2 Computer Science',
    institution: 'IPB University',
    badgeText: '2025 — Present',
    badgePulse: true,
    badgeVariant: 'brand',
    levelLabel: 'Postgraduate',
    description: 'Focus: Artificial Intelligence, Machine Learning, Data Analytics & Algorithms.',
    tags: ['AI & ML', 'Data Analytics', 'Algorithms'],
  },
  {
    id: 's1-ubsi',
    degree: 'S1 Software Engineering',
    institution: 'Universitas Bina Sarana Informatika',
    badgeText: 'GPA: 3.50 / 4.00',
    badgePulse: false,
    badgeVariant: 'emerald',
    levelLabel: 'Undergraduate',
    description: 'Thesis: Implementation of Musical Instrument Audio Recognition in an Android-Based App.',
    footerLabel: 'Android Audio AI',
    sourceUrl: 'https://github.com/yashagozwan/audeam-mobile/tree/development',
    analyticsId: 'Education View Source Code',
  },
]

export const BOOTCAMPS: BootcampItem[] = [
  {
    id: 'idcamp-2025',
    programBadge: 'IDCamp 2025',
    programColorClass: 'text-brand-600',
    organizerOrAward: 'Indosat Ooredoo Hutchison',
    isAwardBadge: false,
    title: 'Multi-Platform App Developer',
    description: 'Built Crypto Mini App News leveraging modern cross-platform development architecture.',
  },
  {
    id: 'dbs-coding-camp-2025',
    programBadge: 'DBS Foundation',
    programColorClass: 'text-indigo-600',
    organizerOrAward: 'Coding Camp 2025',
    isAwardBadge: false,
    title: 'AI Engineer',
    description: 'Specialized in machine learning predictive pipelines and tabular data classification models.',
  },
  {
    id: 'bangkit-2022',
    programBadge: 'Bangkit Academy 2022',
    programColorClass: 'text-rose-600',
    organizerOrAward: 'Top 15 Capstone',
    isAwardBadge: true,
    title: 'Google, GoTo, Traveloka',
    description: 'Selected in the Top 15 Capstone Projects out of nationwide cohorts with product Inacure.',
  },
]

export const DICODING_FLUTTER_PATH: DicodingLearningStep[] = [
  {
    step: 1,
    id: 'dicoding-step-1',
    milestoneTitle: 'Mobile Ecosystem Foundation',
    courseTitle: 'Belajar Dasar Pengembangan Aplikasi Mobile',
    courseSubtitleEn: 'Mobile Application Development Fundamentals',
    level: 'Fundamental',
    levelId: 'Dasar',
    hours: 18,
    modules: 38,
    rating: '4.87',
    status: 'completed',
    description:
      'Mastering the core foundation, OS lifecycle, platform guidelines, and end-to-end mobile engineering ecosystem.',
    skills: ['Mobile OS Architecture', 'UI/UX Guidelines', 'App Lifecycle'],
    certificateUrl: 'https://www.dicoding.com/certificates/NVP7W5YQ4ZR0',
  },
  {
    step: 2,
    id: 'dicoding-step-2',
    milestoneTitle: 'Mastering Dart Language',
    courseTitle: 'Memulai Pemrograman dengan Dart',
    courseSubtitleEn: 'Getting Started with Dart Programming',
    level: 'Fundamental',
    levelId: 'Dasar',
    hours: 30,
    modules: 86,
    rating: '4.84',
    status: 'completed',
    description:
      'Building strong fluency in Dart type systems, null safety, OOP, functional paradigms, and asynchronous Futures/Streams.',
    skills: ['Dart Language', 'Null Safety', 'Async & Streams', 'Functional & OOP'],
    certificateUrl: 'https://www.dicoding.com/certificates/KEXL2LOE0ZG2',
  },
  {
    step: 3,
    id: 'dicoding-step-3',
    milestoneTitle: 'First Flutter Applications',
    courseTitle: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
    courseSubtitleEn: 'Building Flutter Applications for Beginners',
    level: 'Beginner',
    levelId: 'Pemula',
    hours: 40,
    modules: 51,
    rating: '4.87',
    status: 'completed',
    description:
      'Constructing responsive multi-platform UI using Stateless/Stateful widgets, navigation routing, and adaptive layouts.',
    skills: ['Widget Tree', 'Responsive UI', 'Navigation & Routing', 'State Lifecycle'],
    certificateUrl: 'https://www.dicoding.com/certificates/L4PQ21GK2ZO1',
  },
  {
    step: 4,
    id: 'dicoding-step-4',
    milestoneTitle: 'Core Flutter Architecture',
    courseTitle: 'Belajar Fundamental Aplikasi Flutter',
    courseSubtitleEn: 'Flutter Application Fundamentals',
    level: 'Intermediate',
    levelId: 'Menengah',
    hours: 90,
    modules: 101,
    rating: '4.85',
    status: 'completed',
    description:
      'Developing production apps with RESTful API consumption, state management, local persistence (SQLite/SharedPrefs), and background scheduling.',
    skills: ['State Management', 'REST API & JSON', 'Local Storage', 'Background Tasks'],
    certificateUrl: 'https://www.dicoding.com/certificates/GRX504VORZ0M',
  },
  {
    step: 5,
    id: 'dicoding-step-5',
    milestoneTitle: 'Advanced UI & Platform Features',
    courseTitle: 'Belajar Pengembangan Aplikasi Flutter Intermediate',
    courseSubtitleEn: 'Intermediate Flutter Application Development',
    level: 'Advanced',
    levelId: 'Mahir',
    hours: 80,
    modules: 93,
    rating: '4.86',
    status: 'completed',
    description:
      'Enriching Flutter applications with advanced custom widgets, Router API (Navigator 2.0), localization, media integration, and Google Maps/Location services.',
    skills: ['Custom Painter & Animations', 'Declarative Router', 'Maps & Geolocation', 'Localization'],
    certificateUrl: 'https://www.dicoding.com/certificates/NVP7W4MLRZR0',
  },
  {
    step: 6,
    id: 'dicoding-step-6',
    milestoneTitle: 'Object-Oriented & SOLID Design',
    courseTitle: 'Belajar Prinsip Pemrograman SOLID',
    courseSubtitleEn: 'SOLID Programming Principles',
    level: 'Intermediate',
    levelId: 'Menengah',
    hours: 15,
    modules: 41,
    rating: '4.87',
    status: 'completed',
    description:
      'Deepening software design discipline with Object-Oriented Programming (OOP) and the 5 SOLID principles for scalable, maintainable codebases.',
    skills: ['Single Responsibility', 'Open-Closed', 'Liskov & Interface Segregation', 'Dependency Inversion'],
    certificateUrl: 'https://www.dicoding.com/certificates/6RPN8MKJ9Z2M',
  },
  {
    step: 7,
    id: 'dicoding-step-7',
    milestoneTitle: 'Flutter Developer Expert',
    courseTitle: 'Menjadi Flutter Developer Expert',
    courseSubtitleEn: 'Becoming a Flutter Developer Expert',
    level: 'Professional',
    levelId: 'Profesional',
    hours: 85,
    modules: 93,
    rating: '4.84',
    status: 'completed',
    description:
      'Industry-grade mastery of Clean Architecture, Test-Driven Development (TDD), multi-module modularization, CI/CD pipelines, performance profiling, and app security.',
    skills: ['Clean Architecture & Bloc', 'TDD & Automated Testing', 'Modularization', 'CI/CD & Security'],
    certificateUrl: 'https://www.dicoding.com/certificates/N9ZO093E8XG5',
  },
]

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'solid-principles',
    title: 'Flutter & Dart: SOLID Principles and Top Design Patterns',
    provider: 'Udemy',
    providerColor: 'purple',
    durationAndDate: '4 hrs • Dec 2024',
    subtitleLabel: 'Instructor',
    subtitleValue: 'Piotr Paweska',
    badgeText: 'Architecture',
    url: 'https://www.udemy.com/certificate/UC-314d1c64-844f-498c-a656-7d250e82e854/',
    analyticsId: 'Cert: Flutter & Dart SOLID Principles',
  },
  {
    id: 'dart-clean-code',
    title: 'Dart Clean Code: Writing High-Efficiency, Maintainable Programs',
    provider: 'LinkedIn Learning',
    providerColor: 'blue',
    durationAndDate: '1.1 hrs • May 2026',
    subtitleLabel: 'Platform',
    subtitleValue: 'LinkedIn Learning',
    badgeText: 'Clean Code',
    url: 'https://drive.google.com/file/d/1RnUcZZ8ZiTkimlk_YUSsONLVl5-j1bJn/view',
    analyticsId: 'Cert: Dart Clean Code LinkedIn',
  },
  {
    id: 'complete-flutter-bootcamp',
    title: 'The Complete Flutter Development Bootcamp with Dart',
    provider: 'Udemy',
    providerColor: 'purple',
    durationAndDate: '29 hrs • Sept 2025',
    subtitleLabel: 'Instructor',
    subtitleValue: 'Dr. Angela Yu',
    badgeText: 'Full Stack Mobile',
    url: 'https://ude.my/UC-f9e723c2-8b9c-4d51-bf09-018cb15d0219',
    analyticsId: 'Cert: Complete Flutter Bootcamp Angela Yu',
  },
  {
    id: 'stephen-grider-flutter',
    title: "Dart and Flutter: The Complete Developer's Guide",
    provider: 'Udemy',
    providerColor: 'purple',
    durationAndDate: '31.5 hrs • Dec 2024',
    subtitleLabel: 'Instructor',
    subtitleValue: 'Stephen Grider',
    badgeText: 'Reactive & State',
    url: 'https://ude.my/UC-70b9003a-b45a-4b0f-a30f-ce956aa7adf4',
    analyticsId: 'Cert: Dart and Flutter Stephen Grider',
  },
  {
    id: 'pzn-dart',
    title: 'Pemrograman Dart : Pemula sampai Mahir',
    provider: 'Udemy',
    providerColor: 'purple',
    durationAndDate: '17.5 hrs • Aug 2025',
    subtitleLabel: 'Instructor',
    subtitleValue: 'Programmer Zaman Now',
    badgeText: 'Dart Fundamentals',
    url: 'https://ude.my/UC-d08680d8-480d-4cae-a008-9dc4ff42530e',
    analyticsId: 'Cert: Pemrograman Dart PZN',
  },
  {
    id: 'alterra-msib',
    title: 'Mastering Flutter From Zero to Hero Engineer',
    provider: 'Alterra Academy',
    providerColor: 'amber',
    durationAndDate: 'Aug — Dec 2022',
    subtitleLabel: 'Program',
    subtitleValue: 'MSIB Batch 3 (Kampus Merdeka)',
    extraLabel: 'Capstone',
    extraValue: 'Discussin',
    badgeText: 'MSIB Graduate',
    url: 'https://drive.google.com/file/d/10EB0Rt6iVMIlPdRVYkaSucR44i-5tfvi/view?usp=sharing',
    analyticsId: 'Cert: Alterra Academy Mastering Flutter MSIB',
  },
]

export const HOBBIES_SECTIONS: HobbySectionItem[] = [
  {
    id: 'philosophy',
    title: 'Philosophy',
    subtitle: 'Friedrich Nietzsche',
    description:
      'I am deeply fascinated by philosophy, particularly the works of Friedrich Nietzsche—having read all of his major writings. Diving into existentialism, individual willpower, and critical logic trains my mind to maintain intellectual independence and structural clarity when solving complex, high-pressure architectural decisions in software engineering.',
    timelineTitle: 'Reading Timeline (Major Works)',
    cardBgClass: 'bg-brand-50/20 border-brand-100/40',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    milestones: [
      {
        period: '1872',
        title: 'The Birth of Tragedy',
        subtitleItalic: '(Die Geburt der Tragödie)',
        emphasized: true,
      },
      {
        period: '1878',
        title: 'Human, All Too Human',
        subtitleItalic: '(Menschliches, Allzumenschliches)',
        emphasized: false,
      },
      {
        period: '1881',
        title: 'Daybreak',
        subtitleItalic: '(Morgenröte)',
        emphasized: false,
      },
      {
        period: '1882',
        title: 'The Gay Science',
        subtitleItalic: '(Die fröhliche Wissenschaft)',
        emphasized: false,
      },
      {
        period: '1883 — 1885',
        title: 'Thus Spoke Zarathustra',
        subtitleItalic: '(Also sprach Zarathustra)',
        emphasized: true,
      },
      {
        period: '1886',
        title: 'Beyond Good and Evil',
        subtitleItalic: '(Jenseits von Gut und Böse)',
        emphasized: true,
      },
      {
        period: '1887',
        title: 'On the Genealogy of Morality',
        subtitleItalic: '(Zur Genealogie der Moral)',
        emphasized: false,
      },
      {
        period: '1888',
        title: 'The Twilight of the Idols, The Antichrist & Ecce Homo',
        subtitleItalic: '(Götzen-Dämmerung / Der Antichrist / Ecce Homo)',
        emphasized: true,
      },
    ],
  },
  {
    id: 'gym-fitness',
    title: 'Gym & Fitness',
    subtitle: 'Physical Discipline',
    description:
      'Consistent strength training split routines and progressive overload reinforce focus. Currently active training as a FITHUB member, utilizing structured gym regimens to build physical strength that translates directly into the discipline required to maintain clean, robust codebases.',
    timelineTitle: 'Training Split & Milestones',
    cardBgClass: 'bg-brand-50/15 border-brand-100/30',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    milestones: [
      {
        period: 'Foundation',
        title: 'Compound Movements & Form Adaptation',
        description:
          'Mastering core lifts (Squat, Deadlift, Bench Press) to establish solid physical adaptations and proper lifting biomechanics.',
        emphasized: true,
      },
      {
        period: 'Hypertrophy Split',
        title: 'Push, Pull, Legs (PPL) Routine',
        description:
          'Transitioning to a structured split focusing on progressive overload and high hypertrophy response for skeletal muscle growth.',
        emphasized: true,
      },
      {
        period: 'Conditioning',
        title: 'Endurance & Cardiovascular Stamina',
        description:
          'Integrating high-intensity interval training (HIIT) and low-intensity steady-state (LISS) cardio to optimize fat loss and overall stamina.',
        emphasized: true,
      },
      {
        period: 'Current Focus',
        title: 'Powerbuilding Program @ FITHUB',
        description:
          'Combining high strength target lifts with isolation hypertrophy volume work at FITHUB to maximize both performance and shape.',
        emphasized: false,
      },
    ],
  },
  {
    id: 'tech-exploration',
    title: 'Tech Exploration',
    subtitle: 'Flutter & Core Mobile',
    description:
      'Exploring deeply into the Flutter ecosystem and engine capabilities. Beyond building standard applications, I dive into custom canvas rendering, advanced state management architectures, Dart native bindings, and bridging native platform APIs to push Flutter to its absolute performance limits.',
    timelineTitle: 'Flutter Exploration Milestones',
    cardBgClass: 'bg-brand-50/20 border-brand-100/40',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
    milestones: [
      {
        period: 'Foundation & Rendering',
        title: 'Core Widget System & Lifecycle',
        description:
          'Deep diving into widget tree lifecycles, CustomPaint rendering, custom layouts, and optimization of render trees.',
        emphasized: true,
      },
      {
        period: 'State Management',
        title: 'Reactive Architecture & Bloc',
        description:
          'Mastering flutter_bloc and Streams. Designing robust event-driven states, reactive architectures, and performance-efficient build triggers.',
        emphasized: true,
      },
      {
        period: 'Native Bridge',
        title: 'Platform Channels & Native APIs',
        description:
          'Writing secure MethodChannels and EventChannels to bridge native iOS (Swift/ObjC) and Android (Kotlin/Java) APIs directly into Flutter.',
        emphasized: true,
      },
      {
        period: 'Advanced Engine',
        title: 'Dart Native & Engine Tuning',
        description:
          'Tinkering with Dart FFI (Foreign Function Interface), native C/C++ bindings, and benchmarking custom frame schedules.',
        emphasized: false,
      },
    ],
  },
]
