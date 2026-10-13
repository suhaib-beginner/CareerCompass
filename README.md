# CareerCompass 🧭
**Navigate Your Placement Trajectory**

CareerCompass is an intelligent placement preparation and trajectory guidance platform tailored for engineering campus recruitment and competitive CTC benchmarks (10 LPA, 15 LPA, 20+ LPA Dream Tier).

---

## 📁 Repository Structure

The project is cleanly split into two separate directories:

```
CareerCompass/
├── frontend/             # React 19 + TypeScript + Vite Single Page Application
│   ├── src/              # Components, Views, Context, Services, Types
│   ├── public/           # Static assets, SVG icons
│   ├── package.json      # NPM dependencies & scripts
│   ├── vite.config.ts    # Vite bundler configuration
│   └── tsconfig.json     # TypeScript configuration
│
├── backend/              # Java 17 + Spring Boot 3.4.3 REST API
│   ├── src/main/java/    # Controllers, Services, Entities, Repositories, DTOs
│   ├── src/main/resources/ # application.properties, schema.sql
│   └── pom.xml           # Maven build & dependencies (Spring Boot, MySQL, JPA)
│
├── .gitignore            # Root Git ignore rules
└── README.md             # Project documentation
```

---

## 🌟 Key Features

1. **Placement Trajectory Calibration**:
   - Calibrated target package CTC tiers (10 LPA Core, 15 LPA Scaleup, 20 LPA Dream Product).
   - Real-time placement readiness scoring benchmarked against industry criteria.

2. **Dynamic Skill Gap Radar**:
   - Comprehensive diagnostic matrix across Languages, DSA, Core CS, and Development frameworks.
   - Interactive 4-level competency steppers (*Unexplored* → *Beginner* → *Intermediate* → *Advanced*).
   - One-click sprint task generator for critical missing skill gaps.

3. **Recruiter Cutoff & Stage Radar**:
   - Live matching of CGPA and branch cutoffs across Tier-1 and product companies (PhonePe, Amazon, Atlassian, Oracle, Goldman Sachs, Cisco, TCS Digital).
   - Round-by-round interview pipeline breakdowns (Online Assessment, DSA Round, System Design, STAR Behavioral).
   - Application deadline countdown alerts.

4. **Intelligent Daily Sprint Engine**:
   - Algorithmic study hours distribution tailored to your target package.
   - Integrated Pomodoro Deep Work Focus Timer (25m / 45m / 60m blocks).
   - Priority task scheduling and consecutive day streak tracker.

5. **Technical Rounds & Behavioral STAR Simulator**:
   - High-frequency technical interview question banks with collapsible solution hints.
   - 4-step STAR Framework (Situation, Task, Action, Result) interview simulator with persistent student story notes.

---

## 🛠️ Tech Stack

### Frontend (`frontend/`)
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Aesthetic obsidian/slate themes, dark/light mode toggle)
- **Icons**: Lucide React
- **Build Tool**: Vite 8

### Backend (`backend/`)
- **Language**: Java 17 (OpenJDK)
- **Framework**: Spring Boot 3.4.3
- **Data Access**: Spring Data JPA / Hibernate
- **Database**: MySQL 8.x
- **Build Tool**: Apache Maven 3.9

---

## 🚀 Getting Started

### 1. Run the Backend (`backend/`)

Ensure MySQL is running on `localhost:3306` with credentials in [`backend/src/main/resources/application.properties`](file:///c:/Users/mrhas/OneDrive/Documents/TalentForge-main/backend/src/main/resources/application.properties):

```bash
cd backend
mvn spring-boot:run
```
*The Spring Boot API will start on `http://localhost:8080` and auto-seed initial placement data.*

### 2. Run the Frontend (`frontend/`)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```
*The Vite application will start on `http://localhost:5173/`.*
