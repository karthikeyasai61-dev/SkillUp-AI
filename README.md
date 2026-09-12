SkillUp AI

College gives you one curriculum. SkillUp evolves it for YOU.

SkillUp AI is an AI-powered personalized learning platform for
engineering students. Instead of giving every student the same fixed
learning path, SkillUp analyzes the student's college curriculum, career
goal, interests, current skills, industry requirements, performance, and
available study time to continuously create and adapt a personalized
learning journey.

SkillUp is branch-agnostic and is designed to work for CSE, ECE,
EEE, Mechanical, Civil, Chemical, Aerospace, Automobile, Mechatronics,
Biotechnology, AI & Data Science, and other engineering branches.

🚀 The Problem

Engineering colleges generally provide a common curriculum even though
students differ in prior knowledge, career goals, interests, learning
speed, study time, performance, and industry needs.

A fixed curriculum cannot provide the same value to every student.

SkillUp AI turns a fixed college curriculum into an evolving,
personalized curriculum for each student.

💡 Core Idea

College Curriculum
        +
Industry Requirements
        +
Student Interests
        +
Current Skills
        +
Career Goal
        +
Available Study Time
        ↓
Personalized Evolving Curriculum

SkillUp continuously answers:

"What should THIS student learn next?"

🔄 Workflow

LOGIN
   ↓
STUDENT PROFILE
   ↓
UPLOAD COLLEGE CURRICULUM
   ↓
ANSWER PERSONALIZATION QUESTIONS
   ↓
GROQ ANALYZES CURRICULUM + STUDENT + CAREER
   ↓
PERSONALIZED / EVOLVING CURRICULUM
   ↓
SEMESTER PLAN
   ↓
WEEKLY PLAN
   ↓
DAILY TASKS
   ↓
LEARN + PRACTICE + ASSESS
   ↓
MISSED TASKS → BACKLOG
   ↓
WEEKLY AI PERFORMANCE ANALYSIS
   ↓
NEW ADAPTIVE WEEK
   ↓
MONTHLY MILESTONE
   ↓
PASS → NEXT STAGE
FAIL → TARGETED RECOVERY → RETEST
   ↓
CONTINUE ADAPTING

🧠 AI-Powered Curriculum Evolution

After analyzing the student's curriculum and profile, SkillUp
categorizes learning content into:

KEEP

Important academic or career-relevant topics that should remain a
priority.

COMPRESS

Topics that are less relevant to the student's current goal or topics
the student already understands well.

Mandatory academic requirements are never simply removed.

ADD

Industry and career-relevant skills that are missing from the college
curriculum.

The same AI engine dynamically adapts to the student's engineering
branch and career.

🤖 Groq --- The Intelligence Layer

Groq is the central AI intelligence layer of SkillUp.

It is used for:

Curriculum analysis

Subject and topic extraction

Student analysis

Career and industry analysis

Skill-gap identification

Personalized curriculum generation

Topic prioritization

Semester plan generation

Weekly schedule generation

Daily task generation

Assessment generation

Performance analysis

Mistake analysis

Backlog prioritization

Weekly plan adaptation

Monthly milestone generation

Recovery plan generation

The application provides the context and stores the student's evolving
state, while Groq performs the intelligent analysis and generation.

📅 Adaptive Learning

SkillUp does not create one static timetable and stop.

At the end of each week, the AI analyzes:

Completed tasks

Missed tasks

Backlog

Assessment results

Strong topics

Weak topics

Skill gaps

Learning progress

Available study time

Then it generates a new plan for the following week.

Learn
  ↓
Observe
  ↓
Analyze
  ↓
Adapt
  ↓
Learn Again

For example:

Struggling with a topic → add targeted practice.

Mastering a topic → reduce unnecessary revision.

Missing a task → move it into backlog and reschedule it.

Progressing quickly → introduce the next suitable concept.

🎯 Monthly Milestones

Every month, SkillUp generates a milestone based on the student's actual
learning progress.

The milestone can include theory, practical, problem-solving, coding,
design, calculation, or scenario-based tasks depending on the student's
branch and topics.

PASS

Milestone Passed
      ↓
Next Stage Unlocked

FAIL

Weak Areas Identified
      ↓
Targeted Recovery Plan
      ↓
Retest
      ↓
Mastery
      ↓
Next Stage

🌍 Works Across Engineering Branches

SkillUp is not a Computer Science-only platform.

Examples:

CSE / IT - Programming - DBMS - AI/ML - Cloud - Cybersecurity

ECE - Digital Electronics - Signals & Systems - Embedded Systems -
VLSI - IoT

EEE - Electrical Machines - Power Systems - Power Electronics -
Smart Grid - EV Technology

Mechanical - Thermodynamics - Manufacturing - Machine Design -
CAD/CAE - Automotive / EV technologies

Civil - Structural Engineering - Surveying - Construction
Management - BIM - Sustainable Construction

The platform does not hardcode these as fixed paths. The student's
uploaded curriculum and goals drive the AI-generated learning path.

🎨 UI / UX

SkillUp uses a dark, modern interface with the project's selected
green/teal/lime color palette.

Design goals:

Modern

Premium

Technical

Intelligent

Clean

Easy to understand

Avoid:

Generic AI chatbot interfaces

Excessive cards

Too many charts

Unnecessary animations

Cluttered dashboards

Overly playful LMS styling

Main Navigation

Home

My Curriculum

My Plan

Milestones

Progress

Home

The primary question is:

What should I learn today?

The home screen highlights today's priority, today's tasks, weekly
progress, backlog, and the next milestone.

My Curriculum

The core product screen shows:

COLLEGE CURRICULUM
        ↓
SKILLUP AI ANALYSIS
        ↓
YOUR EVOLVING CURRICULUM

KEEP | COMPRESS | ADD

🏗️ Architecture

                    ┌─────────────────┐
                    │     Student     │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │    Frontend     │
                    │  React + Vite   │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │     Backend     │
                    │ Node + Express  │
                    └──────┬─────┬────┘
                           │     │
                    ┌──────↓┐   ┌↓──────────┐
                    │ Groq  │   │ PostgreSQL│
                    │  AI   │   │  Database │
                    └───────┘   └───────────┘

🛠️ Tech Stack

Frontend

React

TypeScript

Vite

Tailwind CSS

Backend

Node.js

Express

Database

PostgreSQL

AI

Groq API

Authentication

JWT-based authentication

🔑 Environment Variables

Create a backend .env file:

GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Never commit real API keys or secrets to Git.

▶️ Running Locally

git clone <repository-url>
cd skillup-ai
npm install
npm run dev

If frontend and backend are separate projects, install dependencies and
run the development command in each directory according to their
respective package.json files.

🧩 Core AI Services

The backend should centralize Groq operations into reusable services
such as:

analyzeCurriculum()
analyzeStudent()
analyzeCareerNeeds()
generatePersonalizedCurriculum()
generateSemesterPlan()
generateWeeklyPlan()
generateDailyTasks()
generateAssessment()
analyzePerformance()
prioritizeBacklog()
generateNextWeekPlan()
generateMonthlyMilestone()
generateRecoveryPlan()

AI responses that control application behavior should use structured
JSON and be validated before being stored.

🔐 Security

Keep Groq API keys on the backend.

Never expose secrets in frontend code.

Authenticate users before accessing personalized data.

Ensure users can access only their own data.

Validate AI-generated structured responses.

Handle failed AI requests gracefully.

🏆 Hackathon Demo

A simple demo can show the complete intelligence loop:

Student logs in.

Student enters branch, career goal, interests, skills, and daily
time.

Student uploads a college syllabus.

Groq analyzes it.

SkillUp displays KEEP / COMPRESS / ADD.

SkillUp generates the personalized semester plan.

SkillUp generates the weekly and daily plan.

Student misses a task.

The task moves to backlog.

Groq analyzes the week's performance.

Groq generates a different plan for the next week.

Student completes the monthly milestone.

Passing unlocks the next stage.

The demo should make one thing obvious:

SkillUp doesn't just personalize how a student learns. It
personalizes what the student needs to learn.

🚀 Vision

Move engineering education from:

One Curriculum → Every Student

to:

One Student → One Evolving Curriculum

The curriculum should not remain fixed while the student's goals,
skills, interests, and industry continue to change.

SkillUp makes learning adaptive.
