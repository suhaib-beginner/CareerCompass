package com.careercompass.backend.util;

import com.careercompass.backend.entity.*;
import com.careercompass.backend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final StudentProfileRepository profileRepo;
    private final SkillRepository skillRepo;
    private final CompanyRepository companyRepo;
    private final PlannerTaskRepository taskRepo;
    private final TechnicalTopicRepository topicRepo;
    private final BehavioralQuestionRepository behavioralRepo;

    public DatabaseSeeder(StudentProfileRepository profileRepo,
                          SkillRepository skillRepo,
                          CompanyRepository companyRepo,
                          PlannerTaskRepository taskRepo,
                          TechnicalTopicRepository topicRepo,
                          BehavioralQuestionRepository behavioralRepo) {
        this.profileRepo = profileRepo;
        this.skillRepo = skillRepo;
        this.companyRepo = companyRepo;
        this.taskRepo = taskRepo;
        this.topicRepo = topicRepo;
        this.behavioralRepo = behavioralRepo;
    }

    @Override
    public void run(String... args) {
        seedProfile();
        seedSkills();
        seedCompanies();
        seedTasks();
        seedTechnicalTopics();
        seedBehavioralQuestions();
    }

    private void seedProfile() {
        if (profileRepo.count() == 0) {
            StudentProfile profile = new StudentProfile(
                    "Arjun Sharma",
                    "arjun.sharma@forge.edu",
                    "Computer Science & Engineering",
                    "3rd Year",
                    BigDecimal.valueOf(8.35),
                    4,
                    "15 LPA",
                    18,
                    12
            );
            profileRepo.save(profile);
            log.info("Default student profile seeded.");
        }
    }

    private void seedSkills() {
        if (skillRepo.count() == 0) {
            List<SkillItem> skills = List.of(
                    new SkillItem("cpp", "C++", "Languages", "Advanced", "Intermediate", "Intermediate", "Advanced",
                            "Modern C++17, STL containers, pointers, memory allocation, and time complexity optimization.", 142, 15),
                    new SkillItem("java", "Java", "Languages", "Intermediate", "Intermediate", "Intermediate", "Advanced",
                            "OOP concepts, Collections framework, JVM internals, multithreading, and streams.", 88, 20),
                    new SkillItem("python", "Python", "Languages", "Beginner", "Beginner", "Intermediate", "Intermediate",
                            "Data structures, list comprehensions, scripting, and algorithmic problem-solving.", 45, 25),
                    new SkillItem("sql", "SQL & Database Design", "Core CS", "Intermediate", "Intermediate", "Intermediate", "Advanced",
                            "Complex joins, indexing strategies, normalization, transactions (ACID), and query tuning.", 64, 18),
                    new SkillItem("dsa", "Data Structures & Algorithms (DSA)", "Problem Solving", "Intermediate", "Intermediate", "Advanced", "Advanced",
                            "Trees, Dynamic Programming, Graphs, Disjoint Set Union, Segment Trees, and Greedy patterns.", 210, 45),
                    new SkillItem("webdev", "Web Dev & Fullstack", "Development", "Intermediate", "Beginner", "Intermediate", "Advanced",
                            "React, Node.js REST APIs, state management, HTTP caching, and microservices architecture.", 12, 35),
                    new SkillItem("system_design", "System Design (HLD & LLD)", "Development", "Beginner", "Unexplored", "Beginner", "Advanced",
                            "Load balancers, CDN, caching layers (Redis), DB sharding, rate limiting, and CAP theorem.", 8, 40),
                    new SkillItem("os", "Operating Systems & Concurrency", "Core CS", "Intermediate", "Intermediate", "Intermediate", "Advanced",
                            "Process scheduling, virtual memory, paging, race conditions, semaphores, and deadlocks.", 52, 16),
                    new SkillItem("networks", "Computer Networks", "Core CS", "Beginner", "Intermediate", "Intermediate", "Advanced",
                            "TCP/IP stack, TCP 3-way handshake, DNS resolution, TLS/HTTPS, and routing protocols.", 34, 20)
            );
            skillRepo.saveAll(skills);
            log.info("Default skills seeded (9 items).");
        }
    }

    private void seedCompanies() {
        if (companyRepo.count() == 0) {
            // PhonePe
            Company phonepe = new Company("phonepe", "PhonePe", "Fintech", "Software Development Engineer - I",
                    "₹22 - 28 LPA", BigDecimal.valueOf(7.50), "Bengaluru / Pune", "On-Campus", "2026-10-18", 4, "PP", "emerald");
            phonepe.setKeySkills(List.of("DSA", "Java", "SQL", "System Design"));
            phonepe.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Online Assessment", "3 algorithmic problems on DP, Graph + 10 CS core MCQs (90 mins)", phonepe),
                    new CompanyStage(2, "Technical Round 1", "Deep dive into DSA, complexity analysis, and live coding", phonepe),
                    new CompanyStage(3, "Technical Round 2", "Low Level Design (LLD), OOP Principles, and concurrency", phonepe),
                    new CompanyStage(4, "Managerial & Values", "Cultural fit, past production systems, and leadership principles", phonepe)
            ));
            phonepe.getResources().addAll(List.of(
                    new CompanyResource("PhonePe OA Previous Year Problems", "#", "Questions", phonepe),
                    new CompanyResource("Concurrency & Locking Cheatsheet", "#", "Guide", phonepe),
                    new CompanyResource("Full OA Simulation Test", "#", "Mock Test", phonepe)
            ));

            // Amazon
            Company amazon = new Company("amazon", "Amazon India", "Big Tech / E-Commerce", "Software Development Engineer - 1",
                    "₹28 - 36 LPA", BigDecimal.valueOf(7.00), "Hyderabad / Bengaluru", "Pool Drive", "2026-10-24", 10, "AM", "amber");
            amazon.setKeySkills(List.of("DSA", "C++", "Java", "System Design"));
            amazon.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Online Assessment (AMCAT)", "2 LeetCode Medium/Hard questions + Work Style Assessment", amazon),
                    new CompanyStage(2, "Technical Round 1", "Binary Search, Graphs, Dynamic Programming & Edge Case testing", amazon),
                    new CompanyStage(3, "Technical Round 2", "Trees, System scalability & Object-Oriented Design", amazon),
                    new CompanyStage(4, "Bar Raiser Round", "Deep probe into Amazon 16 Leadership Principles using STAR method", amazon)
            ));
            amazon.getResources().addAll(List.of(
                    new CompanyResource("Amazon Top 50 Interview Questions", "#", "Questions", amazon),
                    new CompanyResource("Amazon LP Behavioral Guide (STAR)", "#", "Guide", amazon),
                    new CompanyResource("Timed Mock Coding Round", "#", "Mock Test", amazon)
            ));

            // Atlassian
            Company atlassian = new Company("atlassian", "Atlassian", "Enterprise SaaS", "Associate Software Engineer",
                    "₹26 - 32 LPA", BigDecimal.valueOf(8.00), "Bengaluru (Remote-First)", "On-Campus", "2026-10-21", 7, "AT", "emerald");
            atlassian.setKeySkills(List.of("DSA", "Web Dev", "System Design", "Java"));
            atlassian.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Karat Technical Screen", "Live coding with Karat engineer on pure problem solving", atlassian),
                    new CompanyStage(2, "DSA & Code Crafting", "Clean code, modularity, unit tests, and readability under time limits", atlassian),
                    new CompanyStage(3, "System Architecture", "Designing distributed services, rate limiters, caching layers", atlassian),
                    new CompanyStage(4, "Values Interview", "Open Company No Bullshit, Build with Heart and Balance", atlassian)
            ));
            atlassian.getResources().addAll(List.of(
                    new CompanyResource("Atlassian Karat Round Walkthrough", "#", "Guide", atlassian),
                    new CompanyResource("Clean Coding & Test-Driven Problems", "#", "Questions", atlassian),
                    new CompanyResource("Distributed Systems Patterns", "#", "Guide", atlassian)
            ));

            // Oracle
            Company oracle = new Company("oracle", "Oracle Cloud (OCI)", "Enterprise Cloud", "Member Technical Staff",
                    "₹18 - 24 LPA", BigDecimal.valueOf(8.00), "Bengaluru / Hyderabad", "On-Campus", "2026-10-28", 14, "OR", "emerald");
            oracle.setKeySkills(List.of("C++", "SQL", "OS", "DSA"));
            oracle.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Online Assessment", "Aptitude, OS & Networking MCQs, plus 2 coding questions", oracle),
                    new CompanyStage(2, "Technical Round 1", "Core CS (OS Virtual Memory, Semaphore, TCP vs UDP) + DSA", oracle),
                    new CompanyStage(3, "Technical Round 2", "High Performance Database queries, B-Trees, and C++ memory management", oracle),
                    new CompanyStage(4, "Director Round", "Engineering ethics, project walkthrough, and career aspirations", oracle)
            ));
            oracle.getResources().addAll(List.of(
                    new CompanyResource("Oracle Core CS Cheat Sheet", "#", "Guide", oracle),
                    new CompanyResource("Top 30 SQL Query Optimization Questions", "#", "Questions", oracle)
            ));

            // Goldman Sachs
            Company goldman = new Company("goldman", "Goldman Sachs", "Fintech / Investment Banking", "Analyst - Engineering",
                    "₹24 - 30 LPA", BigDecimal.valueOf(8.20), "Bengaluru", "Pool Drive", "2026-11-02", 19, "GS", "amber");
            goldman.setKeySkills(List.of("C++", "Java", "DSA", "SQL"));
            goldman.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Aptitude & Math Screen", "Quantitative analysis, probability, permutations, and logic", goldman),
                    new CompanyStage(2, "Technical Coding Round", "String algorithms, Dynamic Programming, and Math problems", goldman),
                    new CompanyStage(3, "Systems & Math Round", "Data structure trade-offs, cache locality, and matrix calculations", goldman),
                    new CompanyStage(4, "Behavioral & Leadership", "High-pressure problem solving, teamwork, and ethics", goldman)
            ));
            goldman.getResources().addAll(List.of(
                    new CompanyResource("Goldman Sachs Quant & Probability Pack", "#", "Questions", goldman),
                    new CompanyResource("Fast IO & Math Algorithms for OA", "#", "Guide", goldman)
            ));

            // Cisco
            Company cisco = new Company("cisco", "Cisco Systems", "Networking & Cloud", "Technical Consulting / Software Engineer",
                    "₹14 - 18 LPA", BigDecimal.valueOf(7.50), "Bengaluru / Chennai", "On-Campus", "2026-11-06", 23, "CS", "emerald");
            cisco.setKeySkills(List.of("Computer Networks", "Python", "C++", "OS"));
            cisco.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "Written Assessment", "20 Networking MCQs, 20 OS MCQs, 2 coding challenges", cisco),
                    new CompanyStage(2, "Technical Round 1", "Socket programming, OSI layers, subnets, and linked lists/trees", cisco),
                    new CompanyStage(3, "Managerial Round", "Scenario testing, project architectural decisions, and agility", cisco)
            ));
            cisco.getResources().addAll(List.of(
                    new CompanyResource("Cisco Subnetting & OSI Guide", "#", "Guide", cisco),
                    new CompanyResource("Sample Network Socket Programming Questions", "#", "Questions", cisco)
            ));

            // TCS Digital
            Company tcs = new Company("tcs_digital", "Tata Consultancy Services (Digital)", "Consulting & IT Services", "Digital Software Engineer",
                    "₹7.5 - 10 LPA", BigDecimal.valueOf(6.50), "Pan India", "Off-Campus", "2026-11-15", 32, "TC", "emerald");
            tcs.setKeySkills(List.of("Java", "SQL", "Web Dev"));
            tcs.getInterviewStages().addAll(List.of(
                    new CompanyStage(1, "NQT Advanced Test", "Cognitive skills, Advanced Quantitative, and 2 DSA coding problems", tcs),
                    new CompanyStage(2, "Technical Interview", "Core Java/Python, database queries, and final year project", tcs),
                    new CompanyStage(3, "HR & Document Verification", "Background verification and relocation willingness", tcs)
            ));
            tcs.getResources().addAll(List.of(
                    new CompanyResource("TCS NQT Advanced Coding Repository", "#", "Questions", tcs),
                    new CompanyResource("NQT Aptitude Formulas Handbook", "#", "Guide", tcs)
            ));

            companyRepo.saveAll(List.of(phonepe, amazon, atlassian, oracle, goldman, cisco, tcs));
            log.info("Default companies seeded (7 items).");
        }
    }

    private void seedTasks() {
        if (taskRepo.count() == 0) {
            List<PlannerTask> tasks = List.of(
                    new PlannerTask("task-1", "DSA", "Solve 2 LeetCode Mediums on Binary Tree Traversals & LCA", 75, true, "High", "10:30 AM"),
                    new PlannerTask("task-2", "DSA", "Review Dynamic Programming Memoization vs Tabulation on Knapsack", 45, true, "High", "12:00 PM"),
                    new PlannerTask("task-3", "Aptitude", "Practice 15 Speed Math & Probability problems for OA tests", 40, false, "Medium", "03:15 PM"),
                    new PlannerTask("task-4", "Projects", "Refactor REST API endpoints in portfolio project to use JWT & caching", 60, false, "High", "05:30 PM"),
                    new PlannerTask("task-5", "Communication", "Draft STAR response for \"Tell me about a time you handled conflict\"", 20, false, "Medium", "08:00 PM")
            );
            taskRepo.saveAll(tasks);
            log.info("Default planner tasks seeded (5 items).");
        }
    }

    private void seedTechnicalTopics() {
        if (topicRepo.count() == 0) {
            TechnicalTopic trees = new TechnicalTopic("tech-dsa-trees", "DSA", "Trees & Binary Search Trees (BST)", "Medium",
                    "Fundamental hierarchical structures essential for 85%+ of Tier-1 and Tier-2 technical rounds.");
            trees.setCoreConcepts(List.of(
                    "Inorder, Preorder, Postorder & Level Order traversal",
                    "Lowest Common Ancestor (LCA) in BT and BST",
                    "Diameter of Binary Tree & Maximum Path Sum",
                    "Serialization & Deserialization of Binary Trees"
            ));
            trees.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("Construct Binary Tree from Preorder and Inorder Traversal", "Use HashMap to store Inorder indices for O(1) lookup.", "Very High", trees),
                    new SampleQuestion("Lowest Common Ancestor of a Binary Tree", "Recursively search left and right subtrees for target nodes.", "Very High", trees),
                    new SampleQuestion("Serialize and Deserialize Binary Tree", "Use preorder traversal with null markers or BFS with queue.", "High", trees)
            ));

            TechnicalTopic dp = new TechnicalTopic("tech-dsa-dp", "DSA", "Dynamic Programming (Grid & Knapsack Patterns)", "Hard",
                    "Crucial for clearing high package roles (15 - 25+ LPA) at Amazon, PhonePe, and Goldman Sachs.");
            dp.setCoreConcepts(List.of(
                    "Overlapping subproblems & Optimal substructure",
                    "0/1 Knapsack, Unbounded Knapsack, Subset Sum",
                    "Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)",
                    "Matrix Chain Multiplication & DP on Trees"
            ));
            dp.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("Coin Change I (Minimum Coins to make amount)", "Bottom-up DP table where dp[i] = min(dp[i], dp[i - coin] + 1).", "Very High", dp),
                    new SampleQuestion("Longest Increasing Subsequence in O(N log N)", "Patience sorting with binary search using std::lower_bound.", "Very High", dp),
                    new SampleQuestion("Target Sum / Partition Equal Subset Sum", "Transform into a 0/1 knapsack subset sum problem.", "High", dp)
            ));

            TechnicalTopic cache = new TechnicalTopic("tech-sys-cache", "System Design", "Caching Strategies & Redis Architecture", "Medium",
                    "Essential for LLD and HLD interviews to demonstrate deep understanding of latency minimization.");
            cache.setCoreConcepts(List.of(
                    "Cache aside, Write-through, Write-behind patterns",
                    "Eviction policies: LRU, LFU, FIFO, TTL",
                    "Cache Stampede & Cache Penetration mitigation with Bloom Filters",
                    "Redis persistence: RDB snapshots vs AOF logs"
            ));
            cache.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("Design an LRU Cache with O(1) get and put", "Use a Doubly Linked List paired with a Hash Map.", "Very High", cache),
                    new SampleQuestion("How would you mitigate Cache Penetration and Stampede?", "Use Bloom filters for non-existent keys and distributed mutex locks.", "High", cache)
            ));

            TechnicalTopic rate = new TechnicalTopic("tech-sys-rate", "System Design", "API Rate Limiting & Scalability", "Hard",
                    "Standard question for Tier-1 engineering rounds to protect microservices from surges.");
            rate.setCoreConcepts(List.of(
                    "Token Bucket algorithm vs Leaky Bucket",
                    "Fixed Window Counter vs Sliding Window Log",
                    "Distributed rate limiting using Redis Sorted Sets and Lua scripts",
                    "Graceful degradation & HTTP 429 Too Many Requests response headers"
            ));
            rate.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("Implement a Sliding Window Log rate limiter", "Keep timestamps in Redis sorted set and trim entries older than window.", "Very High", rate),
                    new SampleQuestion("Compare Token Bucket and Leaky Bucket in burst handling", "Token bucket permits controlled bursts up to bucket capacity.", "Medium", rate)
            ));

            TechnicalTopic dbms = new TechnicalTopic("tech-cs-dbms", "Core CS", "Database Transactions & ACID Properties", "Medium",
                    "Frequent focal point in Oracle, Cisco, and Fintech interview rounds.");
            dbms.setCoreConcepts(List.of(
                    "ACID guarantees: Atomicity, Consistency, Isolation, Durability",
                    "Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable",
                    "Dirty Read, Non-repeatable Read, Phantom Read anomalies",
                    "B-Tree vs B+ Tree indexing internal mechanisms"
            ));
            dbms.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("Explain how B+ Trees optimize range query lookups", "Leaves are linked sequentially in a doubly-linked list.", "Very High", dbms),
                    new SampleQuestion("What is a Phantom Read and how is it resolved?", "Serializable isolation or Range Locks / Next-Key locks in InnoDB.", "High", dbms)
            ));

            TechnicalTopic os = new TechnicalTopic("tech-cs-os", "Core CS", "Process Synchronization & Concurrency", "Medium",
                    "Tests your foundational computer science understanding and low-level discipline.");
            os.setCoreConcepts(List.of(
                    "Mutex locks vs Counting Semaphores",
                    "Deadlock conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait",
                    "Paging, Segmentation, and Translation Lookaside Buffer (TLB)",
                    "Context switching overhead and thread thread-local storage"
            ));
            os.getSampleQuestions().addAll(List.of(
                    new SampleQuestion("What causes priority inversion and how is it solved?", "Priority inheritance protocol elevates lower-priority task temporarily.", "High", os),
                    new SampleQuestion("Explain the 4 necessary conditions for Deadlock", "Coffman conditions; breaking circular wait prevents deadlock completely.", "Very High", os)
            ));

            topicRepo.saveAll(List.of(trees, dp, cache, rate, dbms, os));
            log.info("Default technical topics seeded (6 items).");
        }
    }

    private void seedBehavioralQuestions() {
        if (behavioralRepo.count() == 0) {
            List<BehavioralQuestion> questions = List.of(
                    new BehavioralQuestion(
                            "beh-conflict",
                            "Tell me about a time you experienced conflict with a teammate and how you resolved it.",
                            "Team Collaboration & Empathy",
                            "During our 3rd-year capstone project, our backend team wanted to use MongoDB while the data analytics partner insisted on PostgreSQL for structured reporting.",
                            "As the technical coordinator, I had to prevent delivery delays and maintain healthy team morale while making the best architectural decision.",
                            "I organized a 1-hour structured benchmarking meeting. Instead of subjective arguing, we listed specific schema requirements, query frequencies, and foreign key constraints. We realized 80% of our queries were relational, but one module needed flexible telemetry. I proposed a hybrid solution using PostgreSQL with JSONB columns.",
                            "Both teammates felt heard and bought in. We completed the sprint 3 days ahead of schedule, and the project scored top marks during departmental evaluation.",
                            "In my capstone project, when our team clashed over database choices, I shifted the discussion from opinions to data-driven benchmarks. By identifying the actual query patterns, we chose PostgreSQL with JSONB, satisfying both relational needs and document flexibility, and delivered ahead of schedule.",
                            "Emphasize listening first, separating facts from emotions, and focusing on the shared project goal."
                    ),
                    new BehavioralQuestion(
                            "beh-bug",
                            "Describe a complex technical bug you encountered close to a deadline. How did you triage and fix it?",
                            "Problem Solving & Resilience Under Pressure",
                            "During a 24-hour national hackathon, 2 hours before the final submission, our authentication service started throwing intermittent 504 Gateway Timeouts.",
                            "I had to quickly identify the bottleneck without corrupting our live demo deployment.",
                            "I immediately checked server logs and discovered database connection pool exhaustion. Each auth verification was initiating a new unclosed DB pool connection instead of reusing the singleton instance. I patched the connection manager to use connection pooling and added a graceful error handler.",
                            "The error rate dropped to 0%, the app handled 500 concurrent demo requests smoothly, and our team secured 2nd place in the track.",
                            "When our service hit 504 timeouts hours before a hackathon demo, I isolated connection logs, identified an unclosed database connection leak, implemented a singleton pool manager, and verified zero dropouts under concurrent load test.",
                            "Show systematic debugging approach: logs -> root cause -> surgical patch -> load verification."
                    ),
                    new BehavioralQuestion(
                            "beh-failure",
                            "Tell me about a time you made a mistake or experienced failure. What did you learn?",
                            "Self-Awareness & Continuous Learning",
                            "In my first semester internship assignment, I pushed a script that accidentally overwrote a staging dataset because I had hardcoded the environment URL.",
                            "I needed to take full accountability, restore the environment, and implement safeguards so it could never happen again.",
                            "I immediately notified the lead engineer without concealing the incident, pulled the latest backup to restore the staging data within 30 minutes, and then wrote a pre-commit validation hook and centralized environment variable configuration.",
                            "The lead praised the prompt communication and remediation. The pre-commit hook was later adopted across all intern repositories as standard practice.",
                            "I once accidentally wiped staging data due to a hardcoded URL. I owned the mistake instantly, restored it from backup within 30 minutes, and engineered a pre-commit environment validation hook that became team standard.",
                            "Never blame others or tooling. Own it immediately, resolve it rapidly, and put preventive guardrails in place."
                    ),
                    new BehavioralQuestion(
                            "beh-why-us",
                            "Why do you want to join our engineering team over other companies?",
                            "Company Alignment & Intrinsic Motivation",
                            "Preparing for interviews with high-scale product companies whose architecture handles millions of daily transactions.",
                            "Communicate genuine curiosity about their engineering culture rather than generic praise.",
                            "I read their public engineering blogs regarding how they handled peak event traffic (e.g., flash sales, real-time UPI settlements) and studied their open-source contributions.",
                            "I was able to link my personal interest in distributed caching and idempotency directly to the problems their team is solving right now.",
                            "I am drawn to your team because of your high-concurrency infrastructure. Reading your engineering blog on how you handle idempotent transaction retries aligned directly with the distributed systems problems I enjoy solving.",
                            "Reference specific tech blogs, tech talks, or architectures the company is famous for."
                    )
            );
            behavioralRepo.saveAll(questions);
            log.info("Default behavioral questions seeded (4 items).");
        }
    }
}
