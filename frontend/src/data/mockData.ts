import type {
  StudentProfile,
  SkillItem,
  Company,
  PlannerTask,
  TechnicalTopic,
  BehavioralQuestion
} from '../types';

export const initialStudentProfile: StudentProfile = {
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@forge.edu',
  branch: 'Computer Science & Engineering',
  currentYear: '3rd Year',
  cgpa: 8.35,
  dailyStudyHours: 4,
  targetPackage: '15 LPA',
  completedTasksCount: 18,
  currentStreakDays: 12,
};

export const initialSkills: SkillItem[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'Languages',
    level: 'Advanced',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Modern C++17, STL containers, pointers, memory allocation, and time complexity optimization.',
    practiceCount: 142,
    recommendedHours: 15,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'OOP concepts, Collections framework, JVM internals, multithreading, and streams.',
    practiceCount: 88,
    recommendedHours: 20,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Beginner',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Intermediate',
    },
    description: 'Data structures, list comprehensions, scripting, and algorithmic problem-solving.',
    practiceCount: 45,
    recommendedHours: 25,
  },
  {
    id: 'sql',
    name: 'SQL & Database Design',
    category: 'Core CS',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Complex joins, indexing strategies, normalization, transactions (ACID), and query tuning.',
    practiceCount: 64,
    recommendedHours: 18,
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms (DSA)',
    category: 'Problem Solving',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Advanced',
      '20 LPA': 'Advanced',
    },
    description: 'Trees, Dynamic Programming, Graphs, Disjoint Set Union, Segment Trees, and Greedy patterns.',
    practiceCount: 210,
    recommendedHours: 45,
  },
  {
    id: 'webdev',
    name: 'Web Dev & Fullstack',
    category: 'Development',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Beginner',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'React, Node.js REST APIs, state management, HTTP caching, and microservices architecture.',
    practiceCount: 12,
    recommendedHours: 35,
  },
  {
    id: 'system_design',
    name: 'System Design (HLD & LLD)',
    category: 'Development',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Unexplored',
      '15 LPA': 'Beginner',
      '20 LPA': 'Advanced',
    },
    description: 'Load balancers, CDN, caching layers (Redis), DB sharding, rate limiting, and CAP theorem.',
    practiceCount: 8,
    recommendedHours: 40,
  },
  {
    id: 'os',
    name: 'Operating Systems & Concurrency',
    category: 'Core CS',
    level: 'Intermediate',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'Process scheduling, virtual memory, paging, race conditions, semaphores, and deadlocks.',
    practiceCount: 52,
    recommendedHours: 16,
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    category: 'Core CS',
    level: 'Beginner',
    requiredFor: {
      '10 LPA': 'Intermediate',
      '15 LPA': 'Intermediate',
      '20 LPA': 'Advanced',
    },
    description: 'TCP/IP stack, TCP 3-way handshake, DNS resolution, TLS/HTTPS, and routing protocols.',
    practiceCount: 34,
    recommendedHours: 20,
  },
];

export const mockCompanies: Company[] = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    industry: 'Fintech',
    role: 'Software Development Engineer - I',
    ctcBracket: '₹22 - 28 LPA',
    minCgpa: 7.5,
    location: 'Bengaluru / Pune',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-18',
    daysRemaining: 4,
    logoInitial: 'PP',
    accentColor: 'emerald',
    interviewStages: [
      { stage: 1, title: 'Online Assessment', description: '3 algorithmic problems on DP, Graph + 10 CS core MCQs (90 mins)' },
      { stage: 2, title: 'Technical Round 1', description: 'Deep dive into DSA, complexity analysis, and live coding' },
      { stage: 3, title: 'Technical Round 2', description: 'Low Level Design (LLD), OOP Principles, and concurrency' },
      { stage: 4, title: 'Managerial & Values', description: 'Cultural fit, past production systems, and leadership principles' }
    ],
    keySkills: ['DSA', 'Java', 'SQL', 'System Design'],
    resources: [
      { title: 'PhonePe OA Previous Year Problems', url: '#', type: 'Questions' },
      { title: 'Concurrency & Locking Cheatsheet', url: '#', type: 'Guide' },
      { title: 'Full OA Simulation Test', url: '#', type: 'Mock Test' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon India',
    industry: 'Big Tech / E-Commerce',
    role: 'Software Development Engineer - 1',
    ctcBracket: '₹28 - 36 LPA',
    minCgpa: 7.0,
    location: 'Hyderabad / Bengaluru',
    hiringType: 'Pool Drive',
    deadlineDate: '2026-10-24',
    daysRemaining: 10,
    logoInitial: 'AM',
    accentColor: 'amber',
    interviewStages: [
      { stage: 1, title: 'Online Assessment (AMCAT)', description: '2 LeetCode Medium/Hard questions + Work Style Assessment' },
      { stage: 2, title: 'Technical Round 1', description: 'Binary Search, Graphs, Dynamic Programming & Edge Case testing' },
      { stage: 3, title: 'Technical Round 2', description: 'Trees, System scalability & Object-Oriented Design' },
      { stage: 4, title: 'Bar Raiser Round', description: 'Deep probe into Amazon 16 Leadership Principles using STAR method' }
    ],
    keySkills: ['DSA', 'C++', 'Java', 'System Design'],
    resources: [
      { title: 'Amazon Top 50 Interview Questions', url: '#', type: 'Questions' },
      { title: 'Amazon LP Behavioral Guide (STAR)', url: '#', type: 'Guide' },
      { title: 'Timed Mock Coding Round', url: '#', type: 'Mock Test' }
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    industry: 'Enterprise SaaS',
    role: 'Associate Software Engineer',
    ctcBracket: '₹26 - 32 LPA',
    minCgpa: 8.0,
    location: 'Bengaluru (Remote-First)',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-21',
    daysRemaining: 7,
    logoInitial: 'AT',
    accentColor: 'emerald',
    interviewStages: [
      { stage: 1, title: 'Karat Technical Screen', description: 'Live coding with Karat engineer on pure problem solving' },
      { stage: 2, title: 'DSA & Code Crafting', description: 'Clean code, modularity, unit tests, and readability under time limits' },
      { stage: 3, title: 'System Architecture', description: 'Designing distributed services, rate limiters, caching layers' },
      { stage: 4, title: 'Values Interview', description: 'Open Company No Bullshit, Build with Heart and Balance' }
    ],
    keySkills: ['DSA', 'Web Dev', 'System Design', 'Java'],
    resources: [
      { title: 'Atlassian Karat Round Walkthrough', url: '#', type: 'Guide' },
      { title: 'Clean Coding & Test-Driven Problems', url: '#', type: 'Questions' },
      { title: 'Distributed Systems Patterns', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'oracle',
    name: 'Oracle Cloud (OCI)',
    industry: 'Enterprise Cloud',
    role: 'Member Technical Staff',
    ctcBracket: '₹18 - 24 LPA',
    minCgpa: 8.0,
    location: 'Bengaluru / Hyderabad',
    hiringType: 'On-Campus',
    deadlineDate: '2026-10-28',
    daysRemaining: 14,
    logoInitial: 'OR',
    accentColor: 'emerald',
    interviewStages: [
      { stage: 1, title: 'Online Assessment', description: 'Aptitude, OS & Networking MCQs, plus 2 coding questions' },
      { stage: 2, title: 'Technical Round 1', description: 'Core CS (OS Virtual Memory, Semaphore, TCP vs UDP) + DSA' },
      { stage: 3, title: 'Technical Round 2', description: 'High Performance Database queries, B-Trees, and C++ memory management' },
      { stage: 4, title: 'Director Round', description: 'Engineering ethics, project walkthrough, and career aspirations' }
    ],
    keySkills: ['C++', 'SQL', 'OS', 'DSA'],
    resources: [
      { title: 'Oracle Core CS Cheat Sheet', url: '#', type: 'Guide' },
      { title: 'Top 30 SQL Query Optimization Questions', url: '#', type: 'Questions' }
    ]
  },
  {
    id: 'goldman',
    name: 'Goldman Sachs',
    industry: 'Fintech / Investment Banking',
    role: 'Analyst - Engineering',
    ctcBracket: '₹24 - 30 LPA',
    minCgpa: 8.2,
    location: 'Bengaluru',
    hiringType: 'Pool Drive',
    deadlineDate: '2026-11-02',
    daysRemaining: 19,
    logoInitial: 'GS',
    accentColor: 'amber',
    interviewStages: [
      { stage: 1, title: 'Aptitude & Math Screen', description: 'Quantitative analysis, probability, permutations, and logic' },
      { stage: 2, title: 'Technical Coding Round', description: 'String algorithms, Dynamic Programming, and Math problems' },
      { stage: 3, title: 'Systems & Math Round', description: 'Data structure trade-offs, cache locality, and matrix calculations' },
      { stage: 4, title: 'Behavioral & Leadership', description: 'High-pressure problem solving, teamwork, and ethics' }
    ],
    keySkills: ['C++', 'Java', 'DSA', 'SQL'],
    resources: [
      { title: 'Goldman Sachs Quant & Probability Pack', url: '#', type: 'Questions' },
      { title: 'Fast IO & Math Algorithms for OA', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    industry: 'Networking & Cloud',
    role: 'Technical Consulting / Software Engineer',
    ctcBracket: '₹14 - 18 LPA',
    minCgpa: 7.5,
    location: 'Bengaluru / Chennai',
    hiringType: 'On-Campus',
    deadlineDate: '2026-11-06',
    daysRemaining: 23,
    logoInitial: 'CS',
    accentColor: 'emerald',
    interviewStages: [
      { stage: 1, title: 'Written Assessment', description: '20 Networking MCQs, 20 OS MCQs, 2 coding challenges' },
      { stage: 2, title: 'Technical Round 1', description: 'Socket programming, OSI layers, subnets, and linked lists/trees' },
      { stage: 3, title: 'Managerial Round', description: 'Scenario testing, project architectural decisions, and agility' }
    ],
    keySkills: ['Computer Networks', 'Python', 'C++', 'OS'],
    resources: [
      { title: 'Cisco Subnetting & OSI Guide', url: '#', type: 'Guide' },
      { title: 'Sample Network Socket Programming Questions', url: '#', type: 'Questions' }
    ]
  },
  {
    id: 'tcs_digital',
    name: 'Tata Consultancy Services (Digital)',
    industry: 'Consulting & IT Services',
    role: 'Digital Software Engineer',
    ctcBracket: '₹7.5 - 10 LPA',
    minCgpa: 6.5,
    location: 'Pan India',
    hiringType: 'Off-Campus',
    deadlineDate: '2026-11-15',
    daysRemaining: 32,
    logoInitial: 'TC',
    accentColor: 'emerald',
    interviewStages: [
      { stage: 1, title: 'NQT Advanced Test', description: 'Cognitive skills, Advanced Quantitative, and 2 DSA coding problems' },
      { stage: 2, title: 'Technical Interview', description: 'Core Java/Python, database queries, and final year project' },
      { stage: 3, title: 'HR & Document Verification', description: 'Background verification and relocation willingness' }
    ],
    keySkills: ['Java', 'SQL', 'Web Dev'],
    resources: [
      { title: 'TCS NQT Advanced Coding Repository', url: '#', type: 'Questions' },
      { title: 'NQT Aptitude Formulas Handbook', url: '#', type: 'Guide' }
    ]
  }
];

export const initialDailyTasks: PlannerTask[] = [
  {
    id: 'task-1',
    domain: 'DSA',
    title: 'Solve 2 LeetCode Mediums on Binary Tree Traversals & LCA',
    durationMinutes: 75,
    completed: true,
    priority: 'High',
    dueTime: '10:30 AM',
  },
  {
    id: 'task-2',
    domain: 'DSA',
    title: 'Review Dynamic Programming Memoization vs Tabulation on Knapsack',
    durationMinutes: 45,
    completed: true,
    priority: 'High',
    dueTime: '12:00 PM',
  },
  {
    id: 'task-3',
    domain: 'Aptitude',
    title: 'Practice 15 Speed Math & Probability problems for OA tests',
    durationMinutes: 40,
    completed: false,
    priority: 'Medium',
    dueTime: '03:15 PM',
  },
  {
    id: 'task-4',
    domain: 'Projects',
    title: 'Refactor REST API endpoints in portfolio project to use JWT & caching',
    durationMinutes: 60,
    completed: false,
    priority: 'High',
    dueTime: '05:30 PM',
  },
  {
    id: 'task-5',
    domain: 'Communication',
    title: 'Draft STAR response for "Tell me about a time you handled conflict"',
    durationMinutes: 20,
    completed: false,
    priority: 'Medium',
    dueTime: '08:00 PM',
  },
];

export const mockTechnicalTopics: TechnicalTopic[] = [
  {
    id: 'tech-dsa-trees',
    category: 'DSA',
    title: 'Trees & Binary Search Trees (BST)',
    difficulty: 'Medium',
    description: 'Fundamental hierarchical structures essential for 85%+ of Tier-1 and Tier-2 technical rounds.',
    coreConcepts: [
      'Inorder, Preorder, Postorder & Level Order traversal',
      'Lowest Common Ancestor (LCA) in BT and BST',
      'Diameter of Binary Tree & Maximum Path Sum',
      'Serialization & Deserialization of Binary Trees'
    ],
    sampleQuestions: [
      { question: 'Construct Binary Tree from Preorder and Inorder Traversal', hint: 'Use HashMap to store Inorder indices for O(1) lookup.', frequency: 'Very High' },
      { question: 'Lowest Common Ancestor of a Binary Tree', hint: 'Recursively search left and right subtrees for target nodes.', frequency: 'Very High' },
      { question: 'Serialize and Deserialize Binary Tree', hint: 'Use preorder traversal with null markers or BFS with queue.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-dsa-dp',
    category: 'DSA',
    title: 'Dynamic Programming (Grid & Knapsack Patterns)',
    difficulty: 'Hard',
    description: 'Crucial for clearing high package roles (15 - 25+ LPA) at Amazon, PhonePe, and Goldman Sachs.',
    coreConcepts: [
      'Overlapping subproblems & Optimal substructure',
      '0/1 Knapsack, Unbounded Knapsack, Subset Sum',
      'Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)',
      'Matrix Chain Multiplication & DP on Trees'
    ],
    sampleQuestions: [
      { question: 'Coin Change I (Minimum Coins to make amount)', hint: 'Bottom-up DP table where dp[i] = min(dp[i], dp[i - coin] + 1).', frequency: 'Very High' },
      { question: 'Longest Increasing Subsequence in O(N log N)', hint: 'Patience sorting with binary search using std::lower_bound.', frequency: 'Very High' },
      { question: 'Target Sum / Partition Equal Subset Sum', hint: 'Transform into a 0/1 knapsack subset sum problem.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-sys-cache',
    category: 'System Design',
    title: 'Caching Strategies & Redis Architecture',
    difficulty: 'Medium',
    description: 'Essential for LLD and HLD interviews to demonstrate deep understanding of latency minimization.',
    coreConcepts: [
      'Cache aside, Write-through, Write-behind patterns',
      'Eviction policies: LRU, LFU, FIFO, TTL',
      'Cache Stampede & Cache Penetration mitigation with Bloom Filters',
      'Redis persistence: RDB snapshots vs AOF logs'
    ],
    sampleQuestions: [
      { question: 'Design an LRU Cache with O(1) get and put', hint: 'Use a Doubly Linked List paired with a Hash Map.', frequency: 'Very High' },
      { question: 'How would you mitigate Cache Penetration and Stampede?', hint: 'Use Bloom filters for non-existent keys and distributed mutex locks.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-sys-rate',
    category: 'System Design',
    title: 'API Rate Limiting & Scalability',
    difficulty: 'Hard',
    description: 'Standard question for Tier-1 engineering rounds to protect microservices from surges.',
    coreConcepts: [
      'Token Bucket algorithm vs Leaky Bucket',
      'Fixed Window Counter vs Sliding Window Log',
      'Distributed rate limiting using Redis Sorted Sets and Lua scripts',
      'Graceful degradation & HTTP 429 Too Many Requests response headers'
    ],
    sampleQuestions: [
      { question: 'Implement a Sliding Window Log rate limiter', hint: 'Keep timestamps in Redis sorted set and trim entries older than window.', frequency: 'Very High' },
      { question: 'Compare Token Bucket and Leaky Bucket in burst handling', hint: 'Token bucket permits controlled bursts up to bucket capacity.', frequency: 'Medium' }
    ]
  },
  {
    id: 'tech-cs-dbms',
    category: 'Core CS',
    title: 'Database Transactions & ACID Properties',
    difficulty: 'Medium',
    description: 'Frequent focal point in Oracle, Cisco, and Fintech interview rounds.',
    coreConcepts: [
      'ACID guarantees: Atomicity, Consistency, Isolation, Durability',
      'Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
      'Dirty Read, Non-repeatable Read, Phantom Read anomalies',
      'B-Tree vs B+ Tree indexing internal mechanisms'
    ],
    sampleQuestions: [
      { question: 'Explain how B+ Trees optimize range query lookups', hint: 'Leaves are linked sequentially in a doubly-linked list.', frequency: 'Very High' },
      { question: 'What is a Phantom Read and how is it resolved?', hint: 'Serializable isolation or Range Locks / Next-Key locks in InnoDB.', frequency: 'High' }
    ]
  },
  {
    id: 'tech-cs-os',
    category: 'Core CS',
    title: 'Process Synchronization & Concurrency',
    difficulty: 'Medium',
    description: 'Tests your foundational computer science understanding and low-level discipline.',
    coreConcepts: [
      'Mutex locks vs Counting Semaphores',
      'Deadlock conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait',
      'Paging, Segmentation, and Translation Lookaside Buffer (TLB)',
      'Context switching overhead and thread thread-local storage'
    ],
    sampleQuestions: [
      { question: 'What causes priority inversion and how is it solved?', hint: 'Priority inheritance protocol elevates lower-priority task temporarily.', frequency: 'High' },
      { question: 'Explain the 4 necessary conditions for Deadlock', hint: 'Coffman conditions; breaking circular wait prevents deadlock completely.', frequency: 'Very High' }
    ]
  }
];

export const mockBehavioralQuestions: BehavioralQuestion[] = [
  {
    id: 'beh-conflict',
    question: 'Tell me about a time you experienced conflict with a teammate and how you resolved it.',
    competency: 'Team Collaboration & Empathy',
    starFramework: {
      situation: 'During our 3rd-year capstone project, our backend team wanted to use MongoDB while the data analytics partner insisted on PostgreSQL for structured reporting.',
      task: 'As the technical coordinator, I had to prevent delivery delays and maintain healthy team morale while making the best architectural decision.',
      action: 'I organized a 1-hour structured benchmarking meeting. Instead of subjective arguing, we listed specific schema requirements, query frequencies, and foreign key constraints. We realized 80% of our queries were relational, but one module needed flexible telemetry. I proposed a hybrid solution using PostgreSQL with JSONB columns.',
      result: 'Both teammates felt heard and bought in. We completed the sprint 3 days ahead of schedule, and the project scored top marks during departmental evaluation.'
    },
    sampleAnswer: 'In my capstone project, when our team clashed over database choices, I shifted the discussion from opinions to data-driven benchmarks. By identifying the actual query patterns, we chose PostgreSQL with JSONB, satisfying both relational needs and document flexibility, and delivered ahead of schedule.',
    userNotes: 'Emphasize listening first, separating facts from emotions, and focusing on the shared project goal.'
  },
  {
    id: 'beh-bug',
    question: 'Describe a complex technical bug you encountered close to a deadline. How did you triage and fix it?',
    competency: 'Problem Solving & Resilience Under Pressure',
    starFramework: {
      situation: 'During a 24-hour national hackathon, 2 hours before the final submission, our authentication service started throwing intermittent 504 Gateway Timeouts.',
      task: 'I had to quickly identify the bottleneck without corrupting our live demo deployment.',
      action: 'I immediately checked server logs and discovered database connection pool exhaustion. Each auth verification was initiating a new unclosed DB pool connection instead of reusing the singleton instance. I patched the connection manager to use connection pooling and added a graceful error handler.',
      result: 'The error rate dropped to 0%, the app handled 500 concurrent demo requests smoothly, and our team secured 2nd place in the track.'
    },
    sampleAnswer: 'When our service hit 504 timeouts hours before a hackathon demo, I isolated connection logs, identified an unclosed database connection leak, implemented a singleton pool manager, and verified zero dropouts under concurrent load test.',
    userNotes: 'Show systematic debugging approach: logs -> root cause -> surgical patch -> load verification.'
  },
  {
    id: 'beh-failure',
    question: 'Tell me about a time you made a mistake or experienced failure. What did you learn?',
    competency: 'Self-Awareness & Continuous Learning',
    starFramework: {
      situation: 'In my first semester internship assignment, I pushed a script that accidentally overwrote a staging dataset because I had hardcoded the environment URL.',
      task: 'I needed to take full accountability, restore the environment, and implement safeguards so it could never happen again.',
      action: 'I immediately notified the lead engineer without concealing the incident, pulled the latest backup to restore the staging data within 30 minutes, and then wrote a pre-commit validation hook and centralized environment variable configuration.',
      result: 'The lead praised the prompt communication and remediation. The pre-commit hook was later adopted across all intern repositories as standard practice.'
    },
    sampleAnswer: 'I once accidentally wiped staging data due to a hardcoded URL. I owned the mistake instantly, restored it from backup within 30 minutes, and engineered a pre-commit environment validation hook that became team standard.',
    userNotes: 'Never blame others or tooling. Own it immediately, resolve it rapidly, and put preventive guardrails in place.'
  },
  {
    id: 'beh-why-us',
    question: 'Why do you want to join our engineering team over other companies?',
    competency: 'Company Alignment & Intrinsic Motivation',
    starFramework: {
      situation: 'Preparing for interviews with high-scale product companies whose architecture handles millions of daily transactions.',
      task: 'Communicate genuine curiosity about their engineering culture rather than generic praise.',
      action: 'I read their public engineering blogs regarding how they handled peak event traffic (e.g., flash sales, real-time UPI settlements) and studied their open-source contributions.',
      result: 'I was able to link my personal interest in distributed caching and idempotency directly to the problems their team is solving right now.'
    },
    sampleAnswer: 'I am drawn to your team because of your high-concurrency infrastructure. Reading your engineering blog on how you handle idempotent transaction retries aligned directly with the distributed systems problems I enjoy solving.',
    userNotes: 'Reference specific tech blogs, tech talks, or architectures the company is famous for.'
  }
];
