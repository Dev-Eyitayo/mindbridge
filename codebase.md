# mindbridge

## README.md

```markdown
# MindBridge 🧠💙

MindBridge is an AI-powered mental wellness platform designed to provide users with a safe space for reflection, emotional support, and mood tracking. It combines conversational AI with mood analytics to help users better understand their emotional patterns over time and connect with appropriate support resources when needed.

## Features

* 🤖 AI companion powered by Groq
* 😊 Mood logging and tracking
* 📈 Mood trends and insights
* 💬 Persistent conversations
* 🔐 Secure authentication with NextAuth
* 📊 Analytics dashboard
* 🩺 Specialist recommendations based on emotional patterns
* 🧠 AI-generated wellness insights
* 🌙 Responsive and modern UI

> **Disclaimer:** MindBridge is intended to support mental wellness and self-awareness. It is not a substitute for professional medical advice, diagnosis, or treatment.

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Server Actions / API Routes
* Prisma ORM
* PostgreSQL
* NextAuth

### AI

* Groq API

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 18+
* npm, pnpm, yarn, or bun
* PostgreSQL

---

## Installation

Clone the repository:

```bash
git clone https://github.com/dev-eyitayo/mindbridge
cd mindbridge
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and configure the required variables:

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GROQ_API_KEY=
DATABASE_URL = 
```

---

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

---

## Running the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The application automatically reloads as changes are made.

---

## Project Structure

```text
app/
components/
lib/
prisma/
public/
types/
hooks/
services/
```

The structure may evolve as new features are added.

---

## Core Modules

### AI Chat

Users can engage in supportive conversations powered by Groq.

### Mood Tracking

Track moods, intensity levels, and emotional trends over time.

### Insights

Receive AI-generated summaries and wellness observations based on mood history.

### Journal

Maintain personal reflections and emotional notes.

### Support & Specialists

Discover therapists and mental health specialists based on emotional patterns and needs.

---

## Scripts

Start development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

Seed database:

```bash
npx prisma db seed
```

---


```

## next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```



## prisma.config.ts

```typescript
import "dotenv/config"; 
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## prisma/migrations/20260617215753_setup_chats/migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "matric" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## prisma/migrations/20260622173446_update_mood_entry_and_add_specialists/migration.sql

```sql
-- AlterTable
ALTER TABLE "MoodEntry" ADD COLUMN     "energyScore" INTEGER,
ADD COLUMN     "intensity" INTEGER,
ADD COLUMN     "moodType" TEXT,
ADD COLUMN     "sleepScore" INTEGER;

-- CreateTable
CREATE TABLE "MessageAnalysis" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "languages" TEXT[],
    "email" TEXT,
    "phone" TEXT,
    "imageUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "availability" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "tags" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Specialist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageAnalysis_messageId_key" ON "MessageAnalysis"("messageId");

-- CreateIndex
CREATE INDEX "MessageAnalysis_messageId_idx" ON "MessageAnalysis"("messageId");

-- CreateIndex
CREATE INDEX "WeeklyInsight_userId_idx" ON "WeeklyInsight"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyInsight_userId_weekStart_key" ON "WeeklyInsight"("userId", "weekStart");

-- CreateIndex
CREATE INDEX "Specialist_specialization_idx" ON "Specialist"("specialization");

-- CreateIndex
CREATE INDEX "Specialist_tags_idx" ON "Specialist"("tags");

-- CreateIndex
CREATE INDEX "MoodEntry_userId_createdAt_idx" ON "MoodEntry"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageAnalysis" ADD CONSTRAINT "MessageAnalysis_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyInsight" ADD CONSTRAINT "WeeklyInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

## prisma/seed.ts

```typescript
import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const specialists = [
  // ── Clinical Psychologists ──────────────────────────────────
  {
    name: "Dr. Amara Okonkwo",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Amara Okonkwo brings over 15 years of experience in evidence-based psychotherapy for anxiety, depression, and emotional dysregulation. She trained at the University of Lagos and completed her doctorate at UCL London. She is known for her culturally sensitive, person-centred approach.",
    yearsOfExperience: 15,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba", "Igbo"],
    email: "amara.okonkwo@mindbridge.app",
    imageUrl: "/specialists/amara-okonkwo.jpg",
    rating: 4.9,
    availability: "Mon-Thu, 9am-5pm",
    consultationType: "both",
    tags: ["anxiety", "depression", "CBT", "trauma", "emotional regulation"],
    verified: true,
  },
  {
    name: "Dr. Chukwuemeka Eze",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Eze specialises in cognitive-behavioural therapy and mindfulness-based interventions for adults dealing with chronic stress and burnout. With 12 years in private practice, he has helped hundreds of professionals reclaim their mental wellbeing.",
    yearsOfExperience: 12,
    location: "Abuja, Nigeria",
    languages: ["English", "Igbo", "Hausa"],
    imageUrl: "/specialists/chukwuemeka-eze.jpg",
    rating: 4.8,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "virtual",
    tags: ["stress", "burnout", "CBT", "mindfulness", "professionals"],
    verified: true,
  },
  {
    name: "Dr. Folake Adeyemi",
    title: "Clinical Psychologist",
    specialization: "Clinical Psychology",
    bio: "Dr. Folake Adeyemi is a compassionate psychologist specialising in childhood trauma and its adult manifestations. She holds a PhD from the University of Ibadan and has published research on intergenerational trauma in West African contexts.",
    yearsOfExperience: 10,
    location: "Ibadan, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/folake-adeyemi.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 8am-4pm",
    consultationType: "both",
    tags: ["trauma", "childhood trauma", "PTSD", "attachment", "depression"],
    verified: true,
  },

  // ── CBT Therapists ──────────────────────────────────────────
  {
    name: "Ngozi Chibuike",
    title: "CBT Therapist",
    specialization: "Cognitive Behavioural Therapy",
    bio: "Ngozi is a certified CBT therapist with a master's degree from the University of Benin. She works primarily with young adults navigating anxiety, perfectionism, and academic pressure, using structured yet warm therapeutic techniques.",
    yearsOfExperience: 7,
    location: "Benin City, Nigeria",
    languages: ["English", "Edo"],
    imageUrl: "/specialists/ngozi-chibuike.jpg",
    rating: 4.8,
    availability: "Mon-Sat, 9am-5pm",
    consultationType: "virtual",
    tags: ["anxiety", "CBT", "perfectionism", "academic stress", "young adults"],
    verified: true,
  },
  {
    name: "Emeka Nwosu",
    title: "CBT Therapist",
    specialization: "Cognitive Behavioural Therapy",
    bio: "Emeka Nwosu combines CBT with acceptance and commitment therapy (ACT) to help clients break unhelpful thought cycles. He has worked with athletes, students, and corporate professionals over his 9-year career.",
    yearsOfExperience: 9,
    location: "Port Harcourt, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/emeka-nwosu.jpg",
    rating: 4.6,
    availability: "Tue-Fri, 11am-7pm",
    consultationType: "both",
    tags: ["anxiety", "CBT", "ACT", "depression", "performance anxiety"],
    verified: true,
  },

  // ── Trauma Therapists ───────────────────────────────────────
  {
    name: "Dr. Hauwa Musa",
    title: "Trauma-Informed Therapist",
    specialization: "Trauma Therapy",
    bio: "Dr. Hauwa Musa is a licensed trauma specialist trained in EMDR (Eye Movement Desensitization and Reprocessing). She has worked extensively with survivors of domestic violence and conflict-related trauma across Northern Nigeria.",
    yearsOfExperience: 14,
    location: "Kano, Nigeria",
    languages: ["English", "Hausa", "Fulani"],
    imageUrl: "/specialists/hauwa-musa.jpg",
    rating: 4.9,
    availability: "Mon-Thu, 9am-4pm",
    consultationType: "both",
    tags: ["trauma", "EMDR", "PTSD", "domestic violence", "grief"],
    verified: true,
  },
  {
    name: "Adaeze Obi",
    title: "Trauma Specialist",
    specialization: "Trauma Therapy",
    bio: "Adaeze Obi works with individuals who have experienced relational trauma, helping them rebuild trust and emotional safety. Her somatic-informed approach integrates body-based techniques with narrative therapy.",
    yearsOfExperience: 6,
    location: "Enugu, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/adaeze-obi.jpg",
    rating: 4.7,
    availability: "Wed-Sun, 10am-6pm",
    consultationType: "virtual",
    tags: ["trauma", "somatic therapy", "relational trauma", "grief", "PTSD"],
    verified: false,
  },

  // ── Psychiatrists ───────────────────────────────────────────
  {
    name: "Dr. Babatunde Fashola",
    title: "Consultant Psychiatrist",
    specialization: "Psychiatry",
    bio: "Dr. Babatunde Fashola is a consultant psychiatrist with specialisations in mood disorders, psychosis, and dual diagnosis. He trained at Lagos University Teaching Hospital and has 18 years of clinical experience.",
    yearsOfExperience: 18,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    email: "b.fashola@mindbridge.app",
    imageUrl: "/specialists/babatunde-fashola.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-3pm",
    consultationType: "both",
    tags: ["psychiatry", "depression", "bipolar", "psychosis", "medication management"],
    verified: true,
  },
  {
    name: "Dr. Zainab Garba",
    title: "Psychiatrist",
    specialization: "Psychiatry",
    bio: "Dr. Zainab Garba focuses on women's mental health, including perinatal psychiatry and trauma in women. She is one of the few psychiatrists in the North specialising in postpartum depression and anxiety.",
    yearsOfExperience: 11,
    location: "Kaduna, Nigeria",
    languages: ["English", "Hausa", "Arabic"],
    imageUrl: "/specialists/zainab-garba.jpg",
    rating: 4.8,
    availability: "Mon, Wed, Fri, 10am-4pm",
    consultationType: "virtual",
    tags: ["psychiatry", "women's mental health", "postpartum", "anxiety", "depression"],
    verified: true,
  },

  // ── Counsellors / Therapists ────────────────────────────────
  {
    name: "Yewande Bello",
    title: "Licensed Counsellor",
    specialization: "Counselling",
    bio: "Yewande Bello is a warm and approachable counsellor who helps individuals navigate life transitions, relationship difficulties, and low mood. She has a particular interest in supporting students and young professionals.",
    yearsOfExperience: 5,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/yewande-bello.jpg",
    rating: 4.6,
    availability: "Mon-Sat, 8am-6pm",
    consultationType: "virtual",
    tags: ["depression", "life transitions", "grief", "relationships", "students"],
    verified: true,
  },
  {
    name: "Sunday Danladi",
    title: "Licensed Therapist",
    specialization: "Counselling",
    bio: "Sunday Danladi is a therapist grounded in person-centred and integrative approaches. He works with men who struggle to articulate their emotional experiences, helping them build self-awareness and healthy communication.",
    yearsOfExperience: 8,
    location: "Jos, Nigeria",
    languages: ["English", "Hausa", "Berom"],
    imageUrl: "/specialists/sunday-danladi.jpg",
    rating: 4.5,
    availability: "Tue-Sat, 9am-5pm",
    consultationType: "both",
    tags: ["stress", "men's mental health", "emotional intelligence", "relationships"],
    verified: false,
  },

  // ── Family / Marriage Therapists ────────────────────────────
  {
    name: "Mrs. Chidinma Okafor",
    title: "Family Therapist",
    specialization: "Family Therapy",
    bio: "Chidinma Okafor is a systemic family therapist helping families improve communication, resolve conflict, and heal relational wounds. She brings 11 years of experience working with blended families and multigenerational dynamics.",
    yearsOfExperience: 11,
    location: "Onitsha, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/chidinma-okafor.jpg",
    rating: 4.8,
    availability: "Mon-Thu, 10am-5pm",
    consultationType: "both",
    tags: ["family therapy", "parenting", "conflict resolution", "relationships"],
    verified: true,
  },
  {
    name: "Mr. Rasheed Adekunle",
    title: "Marriage & Couples Counsellor",
    specialization: "Marriage Counselling",
    bio: "Rasheed Adekunle uses Emotionally Focused Therapy (EFT) to help couples rebuild intimacy and trust. He has worked with over 300 couples in 13 years of practice and holds certifications from the International Centre for Excellence in EFT.",
    yearsOfExperience: 13,
    location: "Abuja, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/rasheed-adekunle.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 4pm-8pm, Sat 10am-2pm",
    consultationType: "both",
    tags: ["marriage", "couples therapy", "EFT", "intimacy", "infidelity recovery"],
    verified: true,
  },

  // ── Child Psychologists ─────────────────────────────────────
  {
    name: "Dr. Temi Adesanya",
    title: "Child & Adolescent Psychologist",
    specialization: "Child Psychology",
    bio: "Dr. Temi Adesanya specialises in emotional and behavioural challenges in children and teenagers. She uses play therapy, CBT for youth, and parent coaching to create lasting positive change.",
    yearsOfExperience: 9,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/temi-adesanya.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-4pm",
    consultationType: "both",
    tags: ["child psychology", "adolescent", "ADHD", "anxiety", "play therapy"],
    verified: true,
  },
  {
    name: "Mrs. Obiageli Nwofor",
    title: "Child Psychologist",
    specialization: "Child Psychology",
    bio: "Obiageli Nwofor works with children aged 3-16 experiencing anxiety, social difficulties, and learning challenges. She offers school consultations and works closely with parents to ensure consistency between home and therapy.",
    yearsOfExperience: 6,
    location: "Owerri, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/obiageli-nwofor.jpg",
    rating: 4.7,
    availability: "Mon-Sat, 9am-3pm",
    consultationType: "both",
    tags: ["child psychology", "learning difficulties", "anxiety", "social skills", "parenting"],
    verified: false,
  },

  // ── Behavioural Therapists ──────────────────────────────────
  {
    name: "Dr. Musa Ibrahim",
    title: "Behavioural Therapist",
    specialization: "Behavioural Therapy",
    bio: "Dr. Musa Ibrahim applies behavioural and DBT techniques to help clients with sleep disorders, compulsive behaviours, and emotional dysregulation. He has published in several African psychology journals.",
    yearsOfExperience: 12,
    location: "Maiduguri, Nigeria",
    languages: ["English", "Hausa", "Kanuri"],
    imageUrl: "/specialists/musa-ibrahim.jpg",
    rating: 4.6,
    availability: "Mon-Thu, 9am-5pm",
    consultationType: "virtual",
    tags: ["sleep issues", "DBT", "behavioural therapy", "OCD", "emotional regulation"],
    verified: true,
  },
  {
    name: "Grace Okonkwo",
    title: "Behavioural Therapist",
    specialization: "Behavioural Therapy",
    bio: "Grace Okonkwo helps clients build healthier habits and break destructive patterns using applied behaviour analysis and habit reversal training. She specialises in sleep hygiene and digital addiction.",
    yearsOfExperience: 4,
    location: "Uyo, Nigeria",
    languages: ["English", "Efik", "Ibibio"],
    imageUrl: "/specialists/grace-okonkwo.jpg",
    rating: 4.5,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "virtual",
    tags: ["sleep issues", "habits", "behavioural therapy", "digital wellness"],
    verified: false,
  },

  // ── Addiction Counsellors ───────────────────────────────────
  {
    name: "Mr. Ifeanyi Okeke",
    title: "Addiction Counsellor",
    specialization: "Addiction Counselling",
    bio: "Ifeanyi Okeke has 16 years of experience supporting individuals in recovery from substance dependence, behavioural addictions, and co-occurring mental health conditions. He integrates motivational interviewing with 12-step facilitation.",
    yearsOfExperience: 16,
    location: "Lagos, Nigeria",
    languages: ["English", "Igbo", "Pidgin"],
    imageUrl: "/specialists/ifeanyi-okeke.jpg",
    rating: 4.8,
    availability: "Mon-Fri, 8am-5pm",
    consultationType: "both",
    tags: ["addiction", "substance use", "recovery", "co-occurring disorders"],
    verified: true,
  },
  {
    name: "Mrs. Blessing Uche",
    title: "Addiction Therapist",
    specialization: "Addiction Counselling",
    bio: "Blessing Uche works with individuals and families affected by addiction, using community reinforcement and harm reduction approaches. She also facilitates group therapy sessions for those in recovery.",
    yearsOfExperience: 7,
    location: "Calabar, Nigeria",
    languages: ["English", "Efik"],
    imageUrl: "/specialists/blessing-uche.jpg",
    rating: 4.6,
    availability: "Mon, Wed, Fri-Sat, 10am-5pm",
    consultationType: "both",
    tags: ["addiction", "harm reduction", "group therapy", "family support"],
    verified: false,
  },

  // ── Anxiety Specialists ─────────────────────────────────────
  {
    name: "Dr. Adeola Savage",
    title: "Anxiety Specialist",
    specialization: "Anxiety Disorders",
    bio: "Dr. Adeola Savage is one of Lagos's leading anxiety specialists, trained in exposure and response prevention (ERP) and acceptance-based therapies. She helps clients regain control over panic disorder, social anxiety, and generalised anxiety.",
    yearsOfExperience: 13,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    email: "adeola.savage@mindbridge.app",
    imageUrl: "/specialists/adeola-savage.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 9am-5pm",
    consultationType: "both",
    tags: ["anxiety", "panic disorder", "social anxiety", "OCD", "ERP", "GAD"],
    verified: true,
  },
  {
    name: "Kemi Fadahunsi",
    title: "Anxiety & Stress Therapist",
    specialization: "Anxiety Disorders",
    bio: "Kemi Fadahunsi combines mindfulness-based stress reduction with CBT techniques to help clients manage anxiety and chronic worry. She offers flexible evening and weekend appointments for working professionals.",
    yearsOfExperience: 5,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/kemi-fadahunsi.jpg",
    rating: 4.7,
    availability: "Weekdays 5pm-9pm, Sat 9am-3pm",
    consultationType: "virtual",
    tags: ["anxiety", "stress", "MBSR", "mindfulness", "worry", "professionals"],
    verified: true,
  },

  // ── Depression Specialists ──────────────────────────────────
  {
    name: "Dr. Tunde Oyelaran",
    title: "Depression Specialist",
    specialization: "Mood Disorders",
    bio: "Dr. Tunde Oyelaran has spent two decades treating depression across its many presentations — from mild low mood to treatment-resistant depression. He uses an integrative model combining pharmacotherapy referrals with psychotherapy.",
    yearsOfExperience: 20,
    location: "Ibadan, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/tunde-oyelaran.jpg",
    rating: 4.9,
    availability: "Mon-Fri, 10am-4pm",
    consultationType: "both",
    tags: ["depression", "mood disorders", "bipolar", "grief", "integration"],
    verified: true,
  },
  {
    name: "Dr. Sandra Nkem",
    title: "Psychologist & Depression Therapist",
    specialization: "Mood Disorders",
    bio: "Dr. Sandra Nkem specialises in treating depression, particularly in women, students, and those navigating grief and loss. She uses behavioural activation, interpersonal therapy, and narrative approaches.",
    yearsOfExperience: 8,
    location: "Abuja, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/sandra-nkem.jpg",
    rating: 4.7,
    availability: "Mon-Sat, 9am-5pm",
    consultationType: "virtual",
    tags: ["depression", "grief", "women's health", "interpersonal therapy", "students"],
    verified: true,
  },

  // ── Stress Management Coaches ───────────────────────────────
  {
    name: "Lanre Akintola",
    title: "Stress Management Coach",
    specialization: "Stress Management",
    bio: "Lanre Akintola is a certified coach and wellness consultant who helps executives and teams build resilience and reduce burnout. His methodology blends neuroscience, productivity frameworks, and mindfulness.",
    yearsOfExperience: 8,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/lanre-akintola.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 7am-9am, 6pm-9pm",
    consultationType: "virtual",
    tags: ["stress", "burnout", "productivity", "resilience", "executive coaching"],
    verified: true,
  },
  {
    name: "Mrs. Fatima Aliyu",
    title: "Wellness & Stress Coach",
    specialization: "Stress Management",
    bio: "Fatima Aliyu draws on holistic wellness practices and cognitive coaching to help individuals manage work-life stress, improve sleep, and cultivate sustainable mental health routines.",
    yearsOfExperience: 6,
    location: "Abuja, Nigeria",
    languages: ["English", "Hausa", "French"],
    imageUrl: "/specialists/fatima-aliyu.jpg",
    rating: 4.6,
    availability: "Mon-Sat, 9am-6pm",
    consultationType: "both",
    tags: ["stress", "sleep issues", "wellness", "mindfulness", "work-life balance"],
    verified: false,
  },

  // ── Mindfulness & Wellbeing ─────────────────────────────────
  {
    name: "Sola Ajayi",
    title: "Mindfulness-Based Therapist",
    specialization: "Mindfulness & Wellbeing",
    bio: "Sola Ajayi is a trained mindfulness teacher and therapist who integrates MBCT and compassion-focused therapy into her work. She runs individual sessions and group mindfulness programmes online.",
    yearsOfExperience: 7,
    location: "Remote / Nationwide",
    languages: ["English", "Yoruba"],
    imageUrl: "/specialists/sola-ajayi.jpg",
    rating: 4.8,
    availability: "Flexible — book anytime",
    consultationType: "virtual",
    tags: ["mindfulness", "MBCT", "stress", "anxiety", "self-compassion", "wellbeing"],
    verified: true,
  },
  {
    name: "David Abah",
    title: "Positive Psychology Coach",
    specialization: "Mindfulness & Wellbeing",
    bio: "David Abah works with clients to build psychological strengths, cultivate meaning, and improve overall wellbeing. He draws on positive psychology, goal-setting, and strengths-based coaching.",
    yearsOfExperience: 4,
    location: "Port Harcourt, Nigeria",
    languages: ["English", "Ijaw"],
    imageUrl: "/specialists/david-abah.jpg",
    rating: 4.5,
    availability: "Mon-Fri, 8am-8pm",
    consultationType: "virtual",
    tags: ["wellbeing", "positive psychology", "coaching", "motivation", "resilience"],
    verified: false,
  },

  // ── Specialist for Sleep ────────────────────────────────────
  {
    name: "Dr. Aisha Mohammed",
    title: "Sleep & Behavioural Therapist",
    specialization: "Sleep Health",
    bio: "Dr. Aisha Mohammed specialises in cognitive behavioural therapy for insomnia (CBT-I) and other sleep disorders. She has worked with shift workers, new parents, and individuals with anxiety-driven sleep problems.",
    yearsOfExperience: 10,
    location: "Abuja, Nigeria",
    languages: ["English", "Hausa", "Arabic"],
    imageUrl: "/specialists/aisha-mohammed.jpg",
    rating: 4.8,
    availability: "Mon-Fri, 9am-5pm",
    consultationType: "both",
    tags: ["sleep issues", "CBT-I", "insomnia", "anxiety", "sleep hygiene"],
    verified: true,
  },

  // ── Additional Diverse Specialists ─────────────────────────
  {
    name: "Dr. Emeka Obi-Okafor",
    title: "Neuropsychologist",
    specialization: "Neuropsychology",
    bio: "Dr. Emeka Obi-Okafor brings neuropsychological expertise to the assessment and treatment of attention, memory, and executive function difficulties. He works with adults who suspect or have diagnosed ADHD.",
    yearsOfExperience: 9,
    location: "Lagos, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/emeka-obi-okafor.jpg",
    rating: 4.7,
    availability: "Mon-Fri, 10am-4pm",
    consultationType: "both",
    tags: ["ADHD", "neuropsychology", "cognitive assessment", "executive function"],
    verified: true,
  },
  {
    name: "Nneka Obaseki",
    title: "Psychotherapist",
    specialization: "Psychotherapy",
    bio: "Nneka Obaseki is an integrative psychotherapist working with individuals experiencing existential challenges, identity questions, and life-purpose issues. She draws on humanistic and existential frameworks.",
    yearsOfExperience: 11,
    location: "Lagos, Nigeria",
    languages: ["English", "Yoruba", "Bini"],
    imageUrl: "/specialists/nneka-obaseki.jpg",
    rating: 4.8,
    availability: "Tue-Sat, 10am-6pm",
    consultationType: "both",
    tags: ["existential therapy", "identity", "life transitions", "self-esteem", "purpose"],
    verified: true,
  },
  {
    name: "Mr. Ikechukwu Eze",
    title: "Grief & Loss Counsellor",
    specialization: "Grief Counselling",
    bio: "Ikechukwu Eze provides compassionate support to individuals navigating bereavement, pregnancy loss, and the grief of life changes. He uses narrative therapy and continuing bonds theory in his practice.",
    yearsOfExperience: 7,
    location: "Enugu, Nigeria",
    languages: ["English", "Igbo"],
    imageUrl: "/specialists/ikechukwu-eze.jpg",
    rating: 4.6,
    availability: "Mon-Fri, 9am-5pm, Sat 10am-1pm",
    consultationType: "both",
    tags: ["grief", "bereavement", "loss", "trauma", "pregnancy loss"],
    verified: false,
  },
];

async function main() {
  console.log("🌱 Seeding specialists...");

  for (const specialist of specialists) {
    await prisma.specialist.upsert({
      where: {
        // Use a stable composite: name + title
        // We create a unique constraint-free upsert via findFirst + create
        id: `seed-${specialist.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: {
        ...specialist,
      },
      create: {
        id: `seed-${specialist.name.toLowerCase().replace(/\s+/g, "-")}`,
        ...specialist,
      },
    });
    console.log(`  ✅ ${specialist.name} — ${specialist.title}`);
  }

  console.log(`\n✨ Seeded ${specialists.length} specialists successfully.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

```

## src/app/(protected)/chat/[[...sessionId]]/page.tsx

```typescript
"use client";

import { use, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Brain, Heart, Sparkles } from "lucide-react";
import { useChatLogic } from "@/hooks/use-chat-logic";

export default function ChatPage({ params }: { params: Promise<{ sessionId?: string[] }> }) {
  const { data: session } = useSession();
  const { sessionId: sessionIdArr } = use(params);
  const sessionId = sessionIdArr?.[0];

  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } =
    useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Sparkles, text: "I just need to vent about my day." },
    { icon: Brain,    text: "I've been feeling really anxious lately." },
    { icon: Heart,    text: "I want to reflect on something personal." },
  ];

  const handleSuggestion = (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any);
    }, 0);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) handleSubmit({ preventDefault: () => {} } as any);
    }
  };

  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome  = !showSkeleton && messages.length === 0;

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="flex-1 overflow-y-auto scroll-thin" ref={scrollRef}>
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">

          {showSkeleton && <ChatSkeleton />}

          {showWelcome && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center fade-up">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "var(--violet-light)" }}
              >
                <Sparkles size={22} style={{ color: "var(--violet)" }} />
              </div>
              <h1
                className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-[15px] mb-10 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                This is a safe space. What's on your mind today?
              </p>

              <div className="grid sm:grid-cols-3 gap-3 w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(s.text)}
                    className="flex flex-col items-start p-4 rounded-xl text-left transition-all fade-up"
                    style={{
                      background:   "var(--card)",
                      border:       "1px solid var(--border)",
                      animationDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--violet-subtle)";
                      e.currentTarget.style.background  = "var(--violet-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background  = "var(--card)";
                    }}
                  >
                    <s.icon size={16} style={{ color: "var(--violet)", marginBottom: 10 }} />
                    <span className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!showSkeleton && !showWelcome && (
            <div className="space-y-5 pb-2">
              {messages.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} fade-up`}
                  style={{ animationDelay: `${Math.min(i * 15, 150)}ms` }}
                >
                  {/* AI avatar */}
                  {m.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-2.5 mt-0.5"
                      style={{ background: "var(--violet-light)" }}
                    >
                      <Sparkles size={13} style={{ color: "var(--violet)" }} />
                    </div>
                  )}

                  <div
                    className="max-w-[82%] sm:max-w-[75%] px-4 py-3 text-sm rounded-2xl"
                    style={m.role === "user" ? {
                      background: "var(--violet-light)",
                      color:      "var(--text-primary)",
                      borderBottomRightRadius: 4,
                    } : {
                      background: "var(--card)",
                      border:     "1px solid var(--border)",
                      color:      "var(--text-primary)",
                      boxShadow:  "var(--shadow-xs)",
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose-chat" style={{ lineHeight: 1.65 }}>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p style={{ lineHeight: 1.65 }}>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-2.5 mt-0.5"
                    style={{ background: "var(--violet-light)" }}
                  >
                    <Sparkles size={13} style={{ color: "var(--violet)" }} />
                  </div>
                  <div
                    className="px-4 py-3.5 rounded-2xl"
                    style={{
                      background: "var(--card)",
                      border:     "1px solid var(--border)",
                      boxShadow:  "var(--shadow-xs)",
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0,1,2].map((i) => (
                        <span
                          key={i}
                          className="typing-dot block w-1.5 h-1.5 rounded-full"
                          style={{
                            background:      "var(--text-tertiary)",
                            animationDelay:  `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className="shrink-0 px-4 py-4"
        style={{
          background:  "var(--bg)",
          borderTop:   "1px solid var(--border)",
        }}
      >
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "var(--card)",
              border:     "1px solid var(--border)",
              boxShadow:  "var(--shadow-sm)",
            }}
          >
            <textarea
              value={input}
              onChange={handleTextarea}
              onKeyDown={handleKey}
              placeholder="Share what's on your mind…"
              rows={1}
              className="w-full resize-none bg-transparent text-sm outline-none leading-relaxed scroll-thin"
              style={{
                padding:   "14px 52px 14px 16px",
                color:     "var(--text-primary)",
                maxHeight: "180px",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className={`absolute right-2.5 bottom-2.5 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isLoading ? "btn-send-loading" : ""}`}
              style={{
                background: (isLoading || !input.trim()) ? "var(--bg-muted)" : "var(--violet)",
                color:      (isLoading || !input.trim()) ? "var(--text-tertiary)" : "white",
                cursor:     (isLoading || !input.trim()) ? "not-allowed" : "pointer",
              }}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </form>
          <p className="text-center text-[11px] mt-2.5" style={{ color: "var(--text-tertiary)" }}>
            MindBridge is not a substitute for professional mental health support.
          </p>
        </div>
      </div>
    </div>
  );
}


function ChatSkeleton() {
  return (
    <div className="space-y-6 pb-2">
      {/* AI message skeleton */}
      <div className="flex justify-start">
        <div className="skeleton w-7 h-7 rounded-lg shrink-0 mr-2.5 mt-0.5" style={{ borderRadius: 8 }} />
        <div
          className="w-full max-w-[82%] sm:max-w-[75%] rounded-2xl overflow-hidden"
          style={{
            background:            "var(--card)",
            border:                "1px solid var(--border)",
            borderBottomLeftRadius: 4,
            boxShadow:             "var(--shadow-xs)",
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[92%]" />
            <div className="skeleton h-3.5 w-[78%]" />
            <div className="skeleton h-3.5 w-[85%]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          className="w-full max-w-[70%] sm:max-w-[60%] rounded-2xl overflow-hidden"
          style={{
            background:             "var(--violet-light)",
            borderBottomRightRadius: 4,
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-[88%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-full"  style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-[65%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
          </div>
        </div>
      </div>


      <div className="flex justify-start">
        <div className="skeleton w-7 h-7 rounded-lg shrink-0 mr-2.5 mt-0.5" style={{ borderRadius: 8 }} />
        <div
          className="w-full max-w-[82%] sm:max-w-[75%] rounded-2xl overflow-hidden"
          style={{
            background:            "var(--card)",
            border:                "1px solid var(--border)",
            borderBottomLeftRadius: 4,
            boxShadow:             "var(--shadow-xs)",
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-[95%]" />
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[88%]" />
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[55%]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          className="w-full max-w-[55%] sm:max-w-[45%] rounded-2xl overflow-hidden"
          style={{ background: "var(--violet-light)", borderBottomRightRadius: 4 }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-full"  style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-[72%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## src/app/(protected)/dashboard/page.tsx

```typescript
"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import {
  Heart, TrendingUp, Flame, Brain, Zap,
  MessageSquare, ArrowRight, Sparkles, Moon, Activity,
  BadgeCheck, Star,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_EMOJI: Record<string, string> = {
  HAPPY: "😊", CALM: "😌", HOPEFUL: "🌟", NEUTRAL: "😐",
  SAD: "😔", ANXIOUS: "😰", ANGRY: "😤", OVERWHELMED: "😵",
  LONELY: "💙", FEARFUL: "😨",
};

const STRESS: Record<string, { text: string; bg: string }> = {
  Low:      { text: "#16a34a", bg: "#f0fdf4" },
  Moderate: { text: "#d97706", bg: "#fffbeb" },
  High:     { text: "#dc2626", bg: "#fef2f2" },
  Critical: { text: "#dc2626", bg: "#fef2f2" },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const { data, isLoading } = useSWR("/api/dashboard", fetcher, { refreshInterval: 30_000 });

  if (isLoading) return <DashboardSkeleton />;

  const {
    moodSummary, weeklyTrend, recentMoodEntries, stressScore,
    latestInsight, recentSessions, recommendedSpecialists, recommendationReason,
  } = data ?? {};

  const topMood  = recentMoodEntries?.[0]?.moodType ?? null;
  const topSp    = recommendedSpecialists?.[0] ?? null;
  const stressStyle = stressScore?.label ? STRESS[stressScore.label] : null;

  return (
    <div
      className="flex-1 overflow-y-auto scroll-thin px-5 py-7 sm:px-7 sm:py-8"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto space-y-7 fade-up">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Good to see you, {firstName}.
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Here's your wellness overview.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={<Heart size={16} />} iconColor="#ef4444" label="Current mood"
            value={topMood ? `${MOOD_EMOJI[topMood] ?? "💭"} ${topMood.toLowerCase()}` : "Not logged"}
            sub={recentMoodEntries?.[0]?.intensity ? `Intensity ${recentMoodEntries[0].intensity}/10` : "No logs yet"}
          />
          <StatCard icon={<Flame size={16} />} iconColor="#f97316" label="Mood streak"
            value={`${moodSummary?.currentStreak ?? 0} day${moodSummary?.currentStreak === 1 ? "" : "s"}`}
            sub="Keep it going"
          />
          <StatCard icon={<Activity size={16} />} iconColor="#8b5cf6" label="Avg. intensity"
            value={moodSummary?.averageIntensity ? `${moodSummary.averageIntensity}/10` : "—"}
            sub="Last 90 days"
          />
          <StatCard icon={<Zap size={16} />} iconColor={stressStyle?.text ?? "var(--text-tertiary)"}
            label="Stress score"
            value={`${stressScore?.score ?? 0}/100`}
            sub={stressScore?.label ?? "—"}
            subStyle={stressStyle ? { color: stressStyle.text, background: stressStyle.bg, padding: "1px 6px", borderRadius: 4, fontSize: 11 } : undefined}
          />
        </div>

        {/* Chart + Insight */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <TrendingUp size={15} style={{ color: "var(--violet)" }} />
                Weekly mood trend
              </div>
              <Link href="/mood" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                Full history →
              </Link>
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </Card>

          <Card className="p-5 flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              <Sparkles size={15} style={{ color: "#f59e0b" }} />
              Weekly insight
            </div>
            {latestInsight ? (
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
                "{latestInsight.content}"
              </p>
            ) : (
              <p className="text-sm flex-1 italic" style={{ color: "var(--text-tertiary)" }}>
                Log your mood daily to unlock AI-generated insights.
              </p>
            )}
            <Link href="/mood" className="mt-4 text-xs font-medium" style={{ color: "var(--violet)" }}>
              Log mood →
            </Link>
          </Card>
        </div>

        {/* Extra stats */}
        {(moodSummary?.averageSleepScore || moodSummary?.averageEnergyScore) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moodSummary.averageSleepScore != null && (
              <StatCard icon={<Moon size={16} />} iconColor="#6366f1" label="Avg. sleep"
                value={`${moodSummary.averageSleepScore}/10`} sub="Last 90 days" />
            )}
            {moodSummary.averageEnergyScore != null && (
              <StatCard icon={<Zap size={16} />} iconColor="#eab308" label="Avg. energy"
                value={`${moodSummary.averageEnergyScore}/10`} sub="Last 90 days" />
            )}
            <StatCard icon={<Brain size={16} />} iconColor="var(--cyan)" label="Entries logged"
              value={`${moodSummary?.totalEntries ?? 0}`} sub="Last 90 days" />
          </div>
        )}

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <MessageSquare size={15} style={{ color: "var(--violet)" }} />
                Recent conversations
              </div>
              <Link href="/chat" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                New chat →
              </Link>
            </div>
            {recentSessions?.length > 0 ? (
              <div className="space-y-px">
                {recentSessions.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className="group flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors"
                    style={{ color: "var(--text-primary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-muted)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <span className="text-sm truncate">{s.title ?? "Untitled chat"}</span>
                    <ArrowRight size={13} style={{ color: "var(--text-tertiary)", flexShrink: 0, marginLeft: 8 }} />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty msg="No conversations yet." href="/chat" action="Start chatting" />
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <Heart size={15} style={{ color: "var(--violet)" }} />
                Specialist match
              </div>
              <Link href="/support" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                All specialists →
              </Link>
            </div>
            {topSp ? (
              <div>
                {recommendationReason && (
                  <p className="text-xs italic mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {recommendationReason}
                  </p>
                )}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0"
                    style={{ background: "var(--violet-light)", color: "var(--violet)" }}
                  >
                    {topSp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {topSp.name}
                      </span>
                      {topSp.verified && <BadgeCheck size={14} style={{ color: "var(--cyan)", flexShrink: 0 }} />}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{topSp.title}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={11} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{topSp.rating}</span>
                      <span className="mx-1.5" style={{ color: "var(--border-strong)" }}>·</span>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {topSp.yearsOfExperience} yrs exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Empty msg="Chat more to get personalised specialist recommendations." href="/support" action="Browse specialists" />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--card)",
        border:     "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        boxShadow:  "var(--shadow-xs)",
      }}
    >
      {children}
    </div>
  );
}

function StatCard({
  icon, iconColor, label, value, sub, subStyle,
}: {
  icon: React.ReactNode; iconColor: string; label: string;
  value: string; sub?: string; subStyle?: React.CSSProperties;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-1.5 mb-3" style={{ color: iconColor }}>
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </span>
      </div>
      <p className="text-xl font-semibold tracking-tight capitalize" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        {value}
      </p>
      {sub && (
        <span className="mt-1.5 inline-block text-[11px]" style={subStyle ?? { color: "var(--text-tertiary)" }}>
          {sub}
        </span>
      )}
    </Card>
  );
}

function Empty({ msg, href, action }: { msg: string; href: string; action: string }) {
  return (
    <div className="py-2">
      <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>{msg}</p>
      <Link href={href} className="mt-2 inline-block text-xs font-medium" style={{ color: "var(--violet)" }}>
        {action} →
      </Link>
    </div>
  );
}


function DashboardSkeleton() {
  return (
    <div
      className="flex-1 overflow-y-auto px-5 py-7 sm:px-7 sm:py-8"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto space-y-7">

        {/* Header */}
        <div className="space-y-2">
          <div className="skeleton h-7 w-64 max-w-full" />
          <div className="skeleton h-4 w-44 max-w-full" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
            >
              <div className="skeleton h-3.5 w-24 max-w-full mb-3" />
              <div className="skeleton h-6 w-28 max-w-full mb-2" />
              <div className="skeleton h-3 w-20 max-w-full" />
            </div>
          ))}
        </div>

        {/* Chart + Insight */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div
            className="lg:col-span-2 p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="skeleton h-4 w-36" />
              <div className="skeleton h-3.5 w-20" />
            </div>
            {/* Chart area */}
            <div className="skeleton w-full h-48" style={{ borderRadius: "var(--r-md)" }} />
          </div>
          <div
            className="p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-4 w-28 mb-4" />
            <div className="space-y-2.5 flex-1">
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-[90%]" />
              <div className="skeleton h-3.5 w-[80%]" />
              <div className="skeleton h-3.5 w-[95%]" />
              <div className="skeleton h-3.5 w-[70%]" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-3.5 w-16" />
              </div>
              <div className="space-y-2.5">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center justify-between px-3 py-2.5" style={{ borderRadius: "var(--r-md)" }}>
                    <div className="skeleton h-3.5 w-[65%]" />
                    <div className="skeleton h-3.5 w-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## src/app/(protected)/layout.tsx

```typescript
"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard, MessageSquare, HeartPulse, Users,
  LogOut, Plus, Menu, X, Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useChatStore, selectSidebarRefresh } from "@/store/useChatStore";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const NAV = [
  { href: "/dashboard",       label: "Overview",  icon: LayoutDashboard },
  { href: "/chat",      label: "Chat",      icon: MessageSquare   },
  { href: "/mood",      label: "Mood",      icon: HeartPulse      },
  { href: "/support",   label: "Support",   icon: Users           },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useParams();
  const { data: session } = useSession();

  const currentSessionId = Array.isArray(params?.sessionId) ? params.sessionId[0] : undefined;
  const triggerRefresh   = useChatStore(selectSidebarRefresh);
  const resetRefresh     = useChatStore((s) => s.resetRefresh);
  const resetActiveChat  = useChatStore((s) => s.resetActiveChat);

  const { data, mutate } = useSWR("/api/chat/sessions", fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true,
  });
  const sessions = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (triggerRefresh) { mutate(); resetRefresh(); }
  }, [triggerRefresh, mutate, resetRefresh]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleNewChat = () => {
    resetActiveChat();
    router.push("/chat");
    setOpen(false);
  };

  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  const email     = session?.user?.email ?? "";
  const initials  = firstName?.[0]?.toUpperCase() ?? "?";

  const todaySessions   = sessions.filter((s: any) => isToday(s.createdAt));
  const recentSessions  = sessions.filter((s: any) => !isToday(s.createdAt));

  const SidebarInner = () => (
    <div className="flex flex-col h-full sidebar-scroll">

      {/* Logo */}
      <div
        className="flex items-center justify-between px-4 h-14 shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "var(--violet)" }}>
            <Sparkles size={13} color="white" />
          </span>
          <span className="font-semibold text-[14px]" style={{ color: "var(--sidebar-text-active)" }}>
            MindBridge
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden p-1 rounded"
          style={{ color: "var(--sidebar-text)" }}
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* New chat */}
      <div className="px-3 py-3 shrink-0">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
          style={{ background: "var(--sidebar-hover)", color: "var(--sidebar-text)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--sidebar-hover)"}
        >
          <Plus size={15} strokeWidth={2} />
          New chat
        </button>
      </div>

      {/* Nav */}
      <nav
        className="px-3 pb-3 shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/chat" ? pathname === "/chat" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors"
              style={{
                color:      active ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
                background: active ? "var(--sidebar-active)" : "transparent",
                borderLeft: active ? "2px solid var(--sidebar-active-border)" : "2px solid transparent",
              }}
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto px-3 py-3 sidebar-scroll">
        {todaySessions.length > 0 && (
          <div className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Today
            </p>
            {todaySessions.map((s: any) => (
              <SessionItem key={s.id} s={s} active={s.id === currentSessionId} />
            ))}
          </div>
        )}
        {recentSessions.length > 0 && (
          <div>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Previous
            </p>
            {recentSessions.map((s: any) => (
              <SessionItem key={s.id} s={s} active={s.id === currentSessionId} />
            ))}
          </div>
        )}
        {sessions.length === 0 && (
          <p className="px-3 text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>
            No conversations yet.
          </p>
        )}
      </div>

      {/* User */}
      <div className="px-3 py-3 shrink-0" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{ background: "var(--violet)", color: "white" }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "var(--sidebar-text-active)" }}>
              {firstName}
            </p>
            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.25)" }}>
              {email}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "var(--bg-subtle)" }}>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-60 shrink-0 h-screen flex-col"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <SidebarInner />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="w-60 h-full flex flex-col"
            style={{ background: "var(--sidebar-bg)" }}
          >
            <SidebarInner />
          </div>
          <div
            className="flex-1 backdrop-blur-sm"
            style={{ background: "var(--overlay)" }}
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center h-14 px-4 shrink-0"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
        >
          <button
            onClick={() => setOpen(true)}
            className="p-2 -ml-1 rounded-md transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "var(--violet)" }}>
              <Sparkles size={11} color="white" />
            </span>
            <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>
              MindBridge
            </span>
          </div>
        </div>

        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

function SessionItem({ s, active }: { s: any; active: boolean }) {
  return (
    <Link
      href={`/chat/${s.id}`}
      className="block px-3 py-2 text-xs rounded-lg mb-0.5 truncate transition-colors"
      style={{
        color:      active ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
        background: active ? "var(--sidebar-active)"      : "transparent",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--sidebar-hover)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      {s.title || "Untitled chat"}
    </Link>
  );
}

const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d = new Date(date), n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};
```

## src/app/(protected)/mood/page.tsx

```typescript
"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { PlusCircle, X, TrendingUp, Smile } from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { MoodDistributionChart } from "@/components/mood/MoodDistributionChart";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const MOODS = [
  { value: "HAPPY",       emoji: "😊", label: "Happy"       },
  { value: "CALM",        emoji: "😌", label: "Calm"        },
  { value: "HOPEFUL",     emoji: "🌟", label: "Hopeful"     },
  { value: "NEUTRAL",     emoji: "😐", label: "Neutral"     },
  { value: "LONELY",      emoji: "💙", label: "Lonely"      },
  { value: "ANXIOUS",     emoji: "😰", label: "Anxious"     },
  { value: "SAD",         emoji: "😔", label: "Sad"         },
  { value: "OVERWHELMED", emoji: "😵", label: "Overwhelmed" },
  { value: "ANGRY",       emoji: "😤", label: "Angry"       },
  { value: "FEARFUL",     emoji: "😨", label: "Fearful"     },
];

const FORM_INIT = { moodType: "", intensity: 5, note: "", sleepScore: "" as string|number, energyScore: "" as string|number };

export default function MoodPage() {
  const [showForm,   setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(FORM_INIT);

  const { data: entries,  mutate: mutateEntries  } = useSWR("/api/mood?limit=14", fetcher);
  const { data: summary,  mutate: mutateSummary  } = useSWR("/api/mood/summary",  fetcher);

  const handleSubmit = async () => {
    if (!form.moodType) { toast.error("Please select a mood type."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({
          value: form.intensity, moodType: form.moodType, intensity: form.intensity,
          note: form.note || undefined,
          sleepScore:  form.sleepScore  !== "" ? Number(form.sleepScore)  : undefined,
          energyScore: form.energyScore !== "" ? Number(form.energyScore) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Mood logged.");
      setForm(FORM_INIT);
      setShowForm(false);
      mutateEntries(); mutateSummary();
    } catch { toast.error("Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  };

  const { summary: stats, weeklyTrend } = summary ?? {};
  const isLoading = !entries || !summary;

  return (
    <div className="flex-1 overflow-y-auto scroll-thin px-5 py-7 sm:px-7 sm:py-8" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-4xl mx-auto space-y-7 fade-up">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Mood tracker
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Track how you feel over time.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            style={{ background: "var(--violet)", color: "white" }}
          >
            <PlusCircle size={15} />
            Log mood
          </button>
        </div>

        {isLoading ? <MoodSkeleton /> : (
          <>
            {/* Summary */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total logs",    value: stats.totalEntries        },
                  { label: "Avg intensity", value: `${stats.averageIntensity}/10` },
                  { label: "Avg sleep",     value: stats.averageSleepScore  ? `${stats.averageSleepScore}/10`  : "—" },
                  { label: "Avg energy",    value: stats.averageEnergyScore ? `${stats.averageEnergyScore}/10` : "—" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide mb-2" style={{ color: "var(--text-tertiary)" }}>
                      {s.label}
                    </p>
                    <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Weekly trend",      icon: <TrendingUp size={15} />, chart: <MoodTrendChart data={weeklyTrend ?? []} /> },
                { title: "Mood distribution", icon: <Smile size={15} />,      chart: <MoodDistributionChart distribution={stats?.moodDistribution ?? {}} /> },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-5"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
                >
                  <div className="flex items-center gap-2 text-sm font-medium mb-5" style={{ color: "var(--text-primary)" }}>
                    <span style={{ color: "var(--violet)" }}>{c.icon}</span>
                    {c.title}
                  </div>
                  {c.chart}
                </div>
              ))}
            </div>

            {/* Recent logs */}
            <div
              className="p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
            >
              <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent logs</h2>
              {Array.isArray(entries) && entries.length > 0 ? (
                <div className="space-y-px">
                  {entries.map((e: any) => {
                    const m = MOODS.find((x) => x.value === e.moodType);
                    return (
                      <div
                        key={e.id}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors"
                        onMouseEnter={(el) => el.currentTarget.style.background = "var(--bg-muted)"}
                        onMouseLeave={(el) => el.currentTarget.style.background = "transparent"}
                      >
                        <span className="text-xl shrink-0 leading-none">{m?.emoji ?? "💭"}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium capitalize" style={{ color: "var(--text-primary)" }}>
                              {m?.label ?? e.moodType?.toLowerCase()}
                            </span>
                            {e.intensity && (
                              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                                Intensity {e.intensity}/10
                              </span>
                            )}
                          </div>
                          {e.note && (
                            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-tertiary)" }}>
                              {e.note}
                            </p>
                          )}
                        </div>
                        <span className="text-xs shrink-0" style={{ color: "var(--text-tertiary)" }}>
                          {new Date(e.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm italic py-2" style={{ color: "var(--text-tertiary)" }}>
                  No logs yet. Tap "Log mood" to get started.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "var(--overlay)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="w-full max-w-md p-5 fade-up"
            style={{ background: "var(--card)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>How are you feeling?</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-tertiary)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Mood grid */}
            <div className="mb-5">
              <Label>Mood</Label>
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {MOODS.map((m) => {
                  const active = form.moodType === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, moodType: m.value }))}
                      className="flex flex-col items-center py-2.5 rounded-lg border transition-all"
                      style={{
                        borderColor: active ? "var(--violet)" : "var(--border)",
                        background:  active ? "var(--violet-light)" : "transparent",
                      }}
                    >
                      <span className="text-lg leading-none">{m.emoji}</span>
                      <span
                        className="text-[9px] mt-1 font-medium"
                        style={{ color: active ? "var(--violet)" : "var(--text-tertiary)" }}
                      >
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intensity */}
            <div className="mb-5">
              <Label>Intensity — {form.intensity}/10</Label>
              <input
                type="range" min={1} max={10} value={form.intensity}
                onChange={(e) => setForm((p) => ({ ...p, intensity: Number(e.target.value) }))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>Mild</span><span>Moderate</span><span>Intense</span>
              </div>
            </div>

            {/* Sleep + Energy */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <FormField label="Sleep score">
                <FormInput type="number" min={1} max={10} placeholder="1–10"
                  value={form.sleepScore}
                  onChange={(e) => setForm((p) => ({ ...p, sleepScore: e.target.value }))} />
              </FormField>
              <FormField label="Energy score">
                <FormInput type="number" min={1} max={10} placeholder="1–10"
                  value={form.energyScore}
                  onChange={(e) => setForm((p) => ({ ...p, energyScore: e.target.value }))} />
              </FormField>
            </div>

            {/* Note */}
            <div className="mb-5">
              <Label>Note (optional)</Label>
              <textarea
                rows={2}
                placeholder="Anything on your mind?"
                value={form.note}
                onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                className="w-full mt-2 px-3 py-2.5 text-sm resize-none rounded-lg outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.moodType}
              className="w-full py-2.5 text-sm font-medium rounded-lg transition-all"
              style={{ background: "var(--violet)", color: "white", opacity: (submitting || !form.moodType) ? 0.5 : 1 }}
            >
              {submitting ? "Saving…" : "Save mood"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{children}</p>;
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
      style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
      {...props}
    />
  );
}


function MoodSkeleton() {
  return (
    <div className="space-y-7">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-3 w-20 max-w-full mb-2.5" />
            <div className="skeleton h-6 w-16 max-w-full" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-4 w-32 mb-5" />
            <div className="skeleton w-full h-44" style={{ borderRadius: "var(--r-md)" }} />
          </div>
        ))}
      </div>

      {/* Log list */}
      <div
        className="p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
      >
        <div className="skeleton h-4 w-24 mb-4" />
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3">
              <div className="skeleton w-8 h-8 shrink-0" style={{ borderRadius: "var(--r-sm)" }} />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton h-3.5 w-[55%] max-w-full" />
                <div className="skeleton h-3 w-[35%] max-w-full" />
              </div>
              <div className="skeleton h-3 w-10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## src/app/(protected)/support/page.tsx

```typescript

"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Star, MapPin, Video, Users, Globe, Clock, BookOpen,
  Brain, Heart, Moon, Wind, Shield, ChevronDown, BadgeCheck, Mail, Phone,
} from "lucide-react";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const CONSULT: Record<string, { icon: React.ReactNode; label: string }> = {
  virtual:  { icon: <Video  size={11} />, label: "Virtual"            },
  physical: { icon: <Users  size={11} />, label: "In-Person"          },
  both:     { icon: <Globe  size={11} />, label: "Virtual & In-Person" },
};

export default function SupportPage() {
  const [tab,      setTab]      = useState<"recommended" | "all">("recommended");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: recData,  isLoading: recLoading  } = useSWR("/api/specialists?recommended=true", fetcher);
  const { data: allData,  isLoading: allLoading  } = useSWR(tab === "all" ? "/api/specialists" : null, fetcher);

  const specialists = tab === "recommended" ? (recData?.specialists ?? []) : (Array.isArray(allData) ? allData : []);
  const loading     = tab === "recommended" ? recLoading : allLoading;

  return (
    <div className="flex-1 overflow-y-auto scroll-thin px-5 py-7 sm:px-7 sm:py-8" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-4xl mx-auto space-y-8 fade-up">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Support & resources
          </h1>
          <p className="text-sm mt-1 max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Find professional support tailored to your emotional patterns.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 w-fit rounded-lg"
          style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
        >
          {[
            { key: "recommended", label: "For you"       },
            { key: "all",         label: "All specialists" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className="px-4 py-1.5 text-sm font-medium rounded-md transition-all"
              style={{
                background: tab === t.key ? "var(--card)" : "transparent",
                color:      tab === t.key ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow:  tab === t.key ? "var(--shadow-xs)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Specialist recommendation context */}
        {tab === "recommended" && recData?.reason && (
          <div
            className="px-4 py-3.5 rounded-xl text-sm leading-relaxed"
            style={{
              background: "var(--violet-light)",
              border:     "1px solid var(--violet-subtle)",
              color:      "var(--text-primary)",
            }}
          >
            {recData.reason}
          </div>
        )}

        {/* Specialist list */}
        <div className="space-y-4">
          {loading ? (
            <SpecialistSkeleton />
          ) : specialists.length > 0 ? (
            specialists.map((sp: any) => <SpecialistCard key={sp.id} sp={sp} />)
          ) : (
            <p className="text-sm italic py-4" style={{ color: "var(--text-tertiary)" }}>
              {tab === "recommended"
                ? "Chat more to receive personalised specialist recommendations."
                : "No specialists found."}
            </p>
          )}
        </div>

        {/* Educational resources */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Educational resources
          </h2>
          <div className="space-y-2">
            {RESOURCES.map((r) => (
              <div
                key={r.id}
                style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={r.iconStyle}>
                    {r.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{r.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{r.subtitle}</p>
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "var(--text-tertiary)",
                      flexShrink: 0,
                      transform: expanded === r.id ? "rotate(180deg)" : "none",
                      transition: "transform 180ms ease",
                    }}
                  />
                </button>
                {expanded === r.id && (
                  <div
                    className="px-5 pb-5 space-y-3 fade-up"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <div className="pt-4 space-y-3">
                      {r.items.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                            style={{ background: "var(--violet)" }}
                          />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                              {item.title}
                            </p>
                            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Crisis */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            background: "var(--red-light)",
            border:     "1px solid rgba(220,38,38,0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={15} style={{ color: "var(--red)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--red)" }}>Crisis support</h3>
          </div>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-primary)" }}>
            If you are experiencing a mental health emergency, please reach out immediately.
          </p>
          <div className="space-y-1">
            {CRISIS.map((c, i) => (
              <div key={i} className="text-sm" style={{ color: "var(--text-primary)" }}>
                <span className="font-semibold">{c.name}:</span>{" "}
                <span style={{ color: "var(--text-secondary)" }}>{c.contact}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}



function SpecialistCard({ sp }: { sp: any }) {
  const consult = CONSULT[sp.consultationType];
  return (
    <div
      className="p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "var(--violet-light)", color: "var(--violet)" }}
        >
          {sp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{sp.name}</span>
            {sp.verified && <BadgeCheck size={14} style={{ color: "var(--cyan)", flexShrink: 0 }} />}
            <span
              className="px-1.5 py-px text-[10px] font-medium rounded"
              style={{ background: "var(--violet-light)", color: "var(--violet)" }}
            >
              {sp.specialization}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{sp.title}</p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <span className="flex items-center gap-1"><Star size={11} style={{ color: "#f59e0b", fill: "#f59e0b" }} />{sp.rating}</span>
            <span className="flex items-center gap-1"><BookOpen size={11} />{sp.yearsOfExperience} yrs</span>
            <span className="flex items-center gap-1"><MapPin size={11} />{sp.location}</span>
            {consult && <span className="flex items-center gap-1">{consult.icon} {consult.label}</span>}
            <span className="flex items-center gap-1"><Clock size={11} />{sp.availability}</span>
          </div>

          <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {sp.bio}
          </p>

          {sp.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {sp.tags.slice(0, 5).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded"
                  style={{ border: "1px solid var(--border)", color: "var(--text-tertiary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {(sp.email || sp.phone) && (
        <div
          className="flex items-center gap-4 mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {sp.email && (
            <a href={`mailto:${sp.email}`} className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
              <Mail size={12} />{sp.email}
            </a>
          )}
          {sp.phone && (
            <a href={`tel:${sp.phone}`} className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
              <Phone size={12} />{sp.phone}
            </a>
          )}
        </div>
      )}
    </div>
  );
}


function SpecialistSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
        >
          <div className="flex items-start gap-4">
            <div className="skeleton w-11 h-11 shrink-0" style={{ borderRadius: "var(--r-lg)" }} />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="skeleton h-4 w-40 max-w-full" />
              <div className="skeleton h-3 w-28 max-w-full" />
              <div className="flex gap-3 mt-1">
                {[...Array(3)].map((_, j) => <div key={j} className="skeleton h-3 w-12" />)}
              </div>
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-[80%]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


const CRISIS = [
  { name: "Nigeria Suicide Prevention",    contact: "0800-100-0000" },
  { name: "Mentally Aware Nigeria (MANI)", contact: "0800-MANI-000" },
  { name: "International Association",     contact: "iasp.info/resources/Crisis_Centres" },
];

const RESOURCES = [
  {
    id: "anxiety", title: "Understanding anxiety", subtitle: "Recognise symptoms and coping strategies",
    iconStyle: { background: "var(--violet-light)", color: "var(--violet)" },
    icon: <Brain size={16} />,
    items: [
      { title: "What is anxiety?",         description: "Anxiety is a natural stress response. It becomes a concern when persistent and interfering with daily life." },
      { title: "Common symptoms",          description: "Racing thoughts, physical tension, avoidance, difficulty sleeping, and an exaggerated sense of dread." },
      { title: "Grounding techniques",     description: "The 5-4-3-2-1 method: name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste." },
      { title: "When to seek help",        description: "If anxiety interferes with daily life for more than a few weeks, speak with a licensed therapist." },
    ],
  },
  {
    id: "sleep", title: "Sleep & mental health", subtitle: "Why rest matters and how to improve it",
    iconStyle: { background: "#f5f3ff", color: "#6d28d9" },
    icon: <Moon size={16} />,
    items: [
      { title: "Sleep and mood",       description: "Poor sleep amplifies negative emotions and reduces your capacity to regulate stress." },
      { title: "Sleep hygiene basics", description: "Consistent sleep times, limiting screens before bed, cool and dark bedroom." },
      { title: "Wind-down routine",    description: "A 30-minute pre-bed wind-down signals to your brain that rest is coming." },
      { title: "When sleep is a sign", description: "Persistent insomnia or hypersomnia can be symptoms of depression or anxiety." },
    ],
  },
  {
    id: "mindfulness", title: "Mindfulness & breathing", subtitle: "Simple practices to ground yourself",
    iconStyle: { background: "#ecfdf5", color: "#059669" },
    icon: <Wind size={16} />,
    items: [
      { title: "Box breathing",      description: "Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat for 2–4 minutes." },
      { title: "Body scan",          description: "Slowly bring attention from feet to head, releasing tension wherever you find it." },
      { title: "Mindful observation",description: "Spend two minutes observing a single object in detail — texture, colour, shape." },
    ],
  },
  {
    id: "relationships", title: "Relationships & support", subtitle: "Connection and knowing when to ask for help",
    iconStyle: { background: "#fff1f2", color: "#e11d48" },
    icon: <Heart size={16} />,
    items: [
      { title: "Social connection",  description: "Strong social bonds are one of the biggest predictors of long-term mental health." },
      { title: "How to ask for help",description: "Be specific: 'I've been struggling. Could we talk this week?' is easier to respond to." },
      { title: "Setting boundaries", description: "Healthy boundaries protect your energy. You can say no to people and yes to yourself." },
    ],
  },
];
```

## src/app/api/auth/[...nextauth]/route.ts

```typescript
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## src/app/api/auth/register/route.ts

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Make sure all fields are filled out
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields." }, 
        { status: 400 }
      );
    }

    // 2. Check if the user already exists in SQLite
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." }, 
        { status: 400 }
      );
    }

    // 3. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user to the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
    });

    // 5. Send success back to the frontend so NextAuth can log them in
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
```

## src/app/api/chat/history/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

  // Verify ownership before fetching messages
  const chatSession = await prisma.chatSession.findFirst({
    where: { 
      id: sessionId,
      userId: session.user.id // This acts as your security guard
    }
  });

  if (!chatSession) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}
```

## src/app/api/chat/route.ts

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OpenAI from "openai";
import { analyseMessage } from "@/lib/services/ai-analysis.service";


const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
You are a compassionate mental wellness companion.

Your role is to provide emotional support, reflection, and practical coping guidance.

Guidelines:
- Be warm, empathetic, and non-judgmental.
- Listen carefully before offering advice.
- Help users explore their thoughts and emotions.
- Ask gentle follow-up questions when appropriate.
- Validate feelings without making assumptions.
- Avoid toxic positivity.
- Avoid lecturing.
- Avoid sounding like a therapist conducting an assessment.

When responding:
- First acknowledge the user's experience.
- Then offer perspective, reflection, or support.
- Finally suggest practical next steps only if appropriate.

Do not:
- Diagnose mental health conditions.
- Claim to be a therapist.
- Prescribe medication.
- Guarantee outcomes.
- Encourage dependency on the AI.

If a user expresses severe distress, self-harm thoughts, suicidal ideation, or intent to harm others:
- Prioritize safety.
- Encourage reaching out to trusted people and professional support.
- Remain calm and supportive.
- Do not be dismissive.

Communication style:
- Natural and conversational.
- Human sounding, not corporate.
- Short paragraphs.
- Avoid excessive bullet points unless helpful.
- Match the user's tone and emotional intensity.

Your goal is not to solve every problem.
Your goal is to help the user feel heard, understood, and supported while encouraging healthy reflection and action.
`;

const titlePrompt = `
You generate chat session titles.

Rules:
- Output ONLY the title.
- 3 to 6 words maximum.
- Must be a short noun phrase, not a sentence.
- No punctuation (no periods, commas, colons).
- No quotes.
- No "Chat about", "Discussion on", or similar prefixes.
- No repetition of words from the input unless essential.
- Make it sound like a clean app conversation title.

Style guidelines:
- Prefer natural human labeling like:
  "Work Stress Reflection", "Overthinking Late Night", "Relationship Confusion"
- Avoid generic titles like "New Chat", "Conversation", "User Message"
- Avoid full sentences like "I feel overwhelmed today"

Return only the title text.
`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { messages, sessionId }: { messages: Message[]; sessionId?: string } =
    await req.json();

  let isNewSession = !sessionId || sessionId === "new";

  // Create new session if needed
  if (isNewSession) {
    const newSession = await prisma.chatSession.create({
      data: {
        userId,
        title: "New Chat",
      },
    });
    sessionId = newSession.id;
  }

  if (!sessionId) {
    return new NextResponse("Session ID is required", { status: 400 });
  }

  const userMessage = messages[messages.length - 1];

  const savedUserMessage = await prisma.message.create({
    data: {
      sessionId,
      role: "user",
      content: userMessage.content,
      userId,
    },
  });


  analyseMessage(userMessage.content).then(async (analysis) => {
    if (!analysis) return;
    try {
      await prisma.messageAnalysis.create({
        data: {
          messageId: savedUserMessage.id,
          emotion: analysis.emotion,
          intensity: analysis.intensity,
          riskLevel: analysis.riskLevel,
        },
      });
    } catch (err) {
      console.error("[Chat] Failed to save message analysis:", err);
    }
  });

  const aiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: aiMessages,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          fullResponse += text;
          controller.enqueue(new TextEncoder().encode(text));
        }
      } catch (error) {
        console.error("Streaming error:", error);
      } finally {
        controller.close();
      }

      // Save assistant response
      await prisma.message.create({
        data: {
          sessionId,
          role: "assistant",
          content: fullResponse,
          userId,
        },
      });

      // Background Title Generation (only for new chats)
      if (isNewSession) {
        try {
          const titleCompletion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: titlePrompt },
              { role: "user", content: userMessage.content },
            ],
            temperature: 0.7,
            max_tokens: 20,
          });

          let newTitle =
            titleCompletion.choices[0]?.message?.content?.trim() || "New Chat";

          newTitle = newTitle.replace(/^["']|["']$/g, "").trim();

          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { title: newTitle },
          });
        } catch (error) {
          console.error("Failed to auto-generate title:", error);
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "X-Session-Id": sessionId,
      "Content-Type": "text/event-stream",
    },
  });
}

```

## src/app/api/chat/sessions/route.ts

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const chats = await prisma.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(chats);
}
```

## src/app/api/dashboard/route.ts

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMoodSummary, getWeeklyMoodTrend, getRecentMoodEntries } from "@/lib/services/mood.service";
import { getStressScore, getDominantEmotions } from "@/lib/services/analytics.service";
import { getLatestInsight } from "@/lib/services/insight.service";
import { getSpecialistRecommendations } from "@/lib/services/specialist-recommendation.service";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch everything in parallel
  const [
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
  ] = await Promise.all([
    getMoodSummary(userId),
    getWeeklyMoodTrend(userId),
    getRecentMoodEntries(userId, 5),
    getStressScore(userId),
    getDominantEmotions(userId),
    getLatestInsight(userId),
    prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, title: true, updatedAt: true },
    }),
  ]);

  // Get specialist recommendations based on patterns
  const { specialists, reason } = await getSpecialistRecommendations(
    dominantEmotions,
    stressScore.label === "Critical" ? "HIGH" : "LOW"
  );

  return NextResponse.json({
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
    recommendedSpecialists: specialists.slice(0, 2),
    recommendationReason: reason,
  });
}

```

## src/app/api/insights/route.ts

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateWeeklyInsights, getLatestInsight } from "@/lib/services/insight.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const insight = await getLatestInsight(session.user.id);
  return NextResponse.json(insight);
}

/** POST triggers insight generation (idempotent — cached per week) */
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const insight = await generateWeeklyInsights(session.user.id);
  return NextResponse.json(insight);
}

```

## src/app/api/mood/route.ts

```typescript
// src/app/api/mood/route.ts
// ============================================================
// Mood API — GET recent entries, POST new entry
// ============================================================

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createMoodEntry, getRecentMoodEntries } from "@/lib/services/mood.service";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "30", 10);

  const entries = await getRecentMoodEntries(session.user.id, limit);
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { value, moodType, intensity, note, sleepScore, energyScore } = body;

    if (typeof value !== "number" || value < 1 || value > 10) {
      return NextResponse.json(
        { error: "value must be a number between 1 and 10" },
        { status: 400 }
      );
    }

    const entry = await createMoodEntry({
      userId: session.user.id,
      value,
      moodType,
      intensity: intensity ?? value,
      note,
      sleepScore,
      energyScore,
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error("[Mood API] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

```

## src/app/api/mood/summary/route.ts

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMoodSummary, getWeeklyMoodTrend } from "@/lib/services/mood.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [summary, weeklyTrend] = await Promise.all([
    getMoodSummary(session.user.id),
    getWeeklyMoodTrend(session.user.id),
  ]);

  return NextResponse.json({ summary, weeklyTrend });
}

```

## src/app/api/specialists/route.ts

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllSpecialists, getSpecialistRecommendations } from "@/lib/services/specialist-recommendation.service";
import { getDominantEmotions, getStressScore } from "@/lib/services/analytics.service";

/** GET /api/specialists — returns all specialists with optional filters */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization") ?? undefined;
  const consultationType = searchParams.get("consultationType") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const recommended = searchParams.get("recommended") === "true";

  if (recommended) {
    const [dominantEmotions, stressScore] = await Promise.all([
      getDominantEmotions(session.user.id),
      getStressScore(session.user.id),
    ]);

    const result = await getSpecialistRecommendations(
      dominantEmotions,
      stressScore.label
    );
    return NextResponse.json(result);
  }

  const specialists = await getAllSpecialists({ specialization, consultationType, tag });
  return NextResponse.json(specialists);
}

```

## src/app/globals.css

```css
@import "tailwindcss";

/* ─────────────────────────────────────────────────────────────────────────
   MindBridge — Modern Design System
   Palette: pure white base · violet primary · cyan accent · zinc neutrals
   Philosophy: clean, alive, modern — like Vercel/Linear/Luma
───────────────────────────────────────────────────────────────────────── */

:root {
  /* ── Surfaces ── */
  --bg:           #ffffff;
  --bg-subtle:    #fafafa;
  --bg-muted:     #f4f4f5;        /* zinc-100 */
  --card:         #ffffff;
  --card-hover:   #fafafa;
  --overlay:      rgba(0,0,0,0.45);

  /* ── Text ── */
  --text-primary:   #09090b;      /* zinc-950 */
  --text-secondary: #52525b;      /* zinc-600 */
  --text-tertiary:  #a1a1aa;      /* zinc-400 */
  --text-inverse:   #ffffff;

  /* ── Primary — Violet ── */
  --violet:         #7c3aed;      /* violet-600 */
  --violet-hover:   #6d28d9;      /* violet-700 */
  --violet-light:   #f5f3ff;      /* violet-50 */
  --violet-subtle:  #ddd6fe;      /* violet-200 */
  --violet-fg:      #ffffff;

  /* ── Accent — Cyan ── */
  --cyan:           #06b6d4;      /* cyan-500 */
  --cyan-light:     #ecfeff;      /* cyan-50 */
  --cyan-subtle:    #a5f3fc;      /* cyan-200 */

  /* ── Status ── */
  --green:          #16a34a;
  --green-light:    #f0fdf4;
  --amber:          #d97706;
  --amber-light:    #fffbeb;
  --red:            #dc2626;
  --red-light:      #fef2f2;

  /* ── Borders ── */
  --border:         #e4e4e7;      /* zinc-200 */
  --border-strong:  #a1a1aa;      /* zinc-400 */
  --border-focus:   #7c3aed;

  /* ── Sidebar (always dark) ── */
  --sidebar-bg:     #09090b;      /* zinc-950 */
  --sidebar-border: rgba(255,255,255,0.07);
  --sidebar-text:   rgba(255,255,255,0.55);
  --sidebar-text-active: rgba(255,255,255,0.95);
  --sidebar-hover:  rgba(255,255,255,0.06);
  --sidebar-active: rgba(124,58,237,0.2);
  --sidebar-active-border: #7c3aed;

  /* ── Shadows ── */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04);
  --shadow-violet: 0 0 0 3px rgba(124,58,237,0.15);

  /* ── Radius ── */
  --r-sm:   6px;
  --r-md:   10px;
  --r-lg:   14px;
  --r-xl:   20px;
  --r-full: 9999px;

  /* ── Motion ── */
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --t-fast:  120ms;
  --t-base:  180ms;
  --t-slow:  300ms;

  /* ── Font ── */
  --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Fira Code', monospace;
}

/* ─────────────────────────────────────────────────────────────────────────
   Base
───────────────────────────────────────────────────────────────────────── */

*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
  border-radius: var(--r-sm);
}

::selection {
  background: var(--violet-subtle);
  color: var(--text-primary);
}

input[type="range"] { accent-color: var(--violet); }

/* ─────────────────────────────────────────────────────────────────────────
   Scrollbars
───────────────────────────────────────────────────────────────────────── */

.scroll-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.scroll-thin::-webkit-scrollbar { width: 4px; }
.scroll-thin::-webkit-scrollbar-track { background: transparent; }
.scroll-thin::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: var(--r-full);
}

.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.sidebar-scroll::-webkit-scrollbar { width: 3px; }
.sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.12);
  border-radius: var(--r-full);
}

/* ─────────────────────────────────────────────────────────────────────────
   Skeleton shimmer — the key: it matches real component shapes exactly
───────────────────────────────────────────────────────────────────────── */

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-muted) 25%,
    #e4e4e7 50%,
    var(--bg-muted) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: var(--r-sm);
}

/* Dark skeleton variant — inside the sidebar or dark surfaces */
.skeleton-dark {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: var(--r-sm);
}

/* ─────────────────────────────────────────────────────────────────────────
   Fade-in entrance
───────────────────────────────────────────────────────────────────────── */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up {
  animation: fadeUp var(--t-slow) var(--ease-out) both;
}

.fade-up-delay-1 { animation-delay: 60ms;  }
.fade-up-delay-2 { animation-delay: 120ms; }
.fade-up-delay-3 { animation-delay: 180ms; }
.fade-up-delay-4 { animation-delay: 240ms; }

/* ─────────────────────────────────────────────────────────────────────────
   Typing dots — calm, not bouncy
───────────────────────────────────────────────────────────────────────── */

@keyframes blink {
  0%, 80%, 100% { opacity: 0.25; transform: scale(0.75); }
  40%           { opacity: 1;    transform: scale(1);    }
}

.typing-dot {
  animation: blink 1.4s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

/* ─────────────────────────────────────────────────────────────────────────
   Signature element — the violet send button pulse when AI is loading
───────────────────────────────────────────────────────────────────────── */

@keyframes violet-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(124,58,237,0); }
}

.btn-send-loading {
  animation: violet-pulse 1.6s ease-in-out infinite;
}

/* ─────────────────────────────────────────────────────────────────────────
   Chat prose (ReactMarkdown output)
───────────────────────────────────────────────────────────────────────── */

.prose-chat p            { margin: 0 0 0.6em; line-height: 1.65; }
.prose-chat p:last-child { margin-bottom: 0; }
.prose-chat ul, .prose-chat ol { margin: 0.4em 0; padding-left: 1.4em; }
.prose-chat li           { margin-bottom: 0.25em; line-height: 1.55; }
.prose-chat strong       { font-weight: 600; }
.prose-chat code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--bg-muted);
  padding: 0.15em 0.35em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* ─────────────────────────────────────────────────────────────────────────
   Reduced motion
───────────────────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## src/app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "MindBridge", template: "%s · MindBridge" },
  description: "A private space to reflect, track your mood, and find support.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    url: "https://mindbridge.pxxl.run",
    title: "MindBridge",
    description: "AI-powered mental wellness. Private. Empathetic. Yours.",
    siteName: "MindBridge",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans, var(--font-sans))" }}
      >
        <AuthProvider>
          <Toaster
            richColors
            position="top-center"
            theme="light"
            toastOptions={{
              style: {
                fontFamily: "var(--font-geist-sans, system-ui)",
                fontSize: "13px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## src/app/login/page.tsx

```typescript
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed.");
        toast.success("Account created.");
      }
      const result = await signIn("credentials", { redirect: false, email: form.email, password: form.password });
      if (result?.error) throw new Error("Invalid email or password.");
      toast.success("Welcome back.");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>

      <div
        className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between p-12"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <Logo dark />

        <div>
          <p
            className="text-2xl font-semibold leading-snug mb-4 tracking-tight"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            "The journey of a thousand miles begins with one step."
          </p>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            — Lao Tzu
          </span>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 MindBridge
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px] fade-up">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-1.5" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {mode === "login"
                ? "Sign in to continue to MindBridge."
                : "Start your wellness journey today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Amara" required autoComplete="given-name" />
                </Field>
                <Field label="Last name">
                  <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Obi" required autoComplete="family-name" />
                </Field>
              </div>
            )}

            <Field label="Email">
              <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />
            </Field>

            <Field label="Password">
              <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required autoComplete={mode === "login" ? "current-password" : "new-password"} />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-medium rounded-lg transition-all mt-1 disabled:opacity-50"
              style={{ background: "var(--violet)", color: "white" }}
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            {mode === "login" ? (
              <>New here?{" "}
                <button type="button" onClick={() => setMode("signup")} className="font-medium underline underline-offset-2" style={{ color: "var(--violet)" }}>
                  Create account
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-medium underline underline-offset-2" style={{ color: "var(--violet)" }}>
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="text-center mt-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
            By continuing, you agree to our{" "}
            <a href="/" className="underline underline-offset-2">Terms</a> and{" "}
            <a href="/" className="underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--violet)" }}>
        <Sparkles size={14} color="white" />
      </span>
      <span className="font-semibold text-[15px]" style={{ color: dark ? "rgba(255,255,255,0.9)" : "var(--text-primary)" }}>
        MindBridge
      </span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all ${className}`}
      style={{
        background: "var(--bg-subtle)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--violet)";
        e.currentTarget.style.boxShadow = "var(--shadow-violet)";
        e.currentTarget.style.background = "var(--bg)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "var(--bg-subtle)";
      }}
      {...props}
    />
  );
}
```

## src/app/page.tsx

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, HeartPulse, ShieldCheck, X, Menu, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Hero / Nav ─────────────────────────────────────────────── */}
      <div className="relative bg-[#1a0b2e] rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 to-transparent" />

        <header className="relative z-40 w-full px-5 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md flex items-center justify-center bg-purple-400">
                <Sparkles size={16} color="#1a0b2e" />
              </span>
              <span className="font-semibold text-lg tracking-tight text-white">
                MindBridge
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <a href="#" onClick={scrollTo("hero")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">Welcome</a>
              <a href="#about" onClick={scrollTo("about")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">About</a>
              <a href="#features" onClick={scrollTo("features")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">Features</a>
            </nav>

            <div className="hidden md:flex">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-[#10061e] text-white hover:bg-[#08030f] transition-all flex items-center gap-2"
              >
                Sign in <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-white relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {/* Animated icon swap */}
              <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
                }}
              >
                <X size={24} />
              </span>
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
                }}
              >
                <Menu size={24} />
              </span>
            </button>
          </div>

          {/* ── Mobile drawer ──────────────────────────────────────── */}
          {/*
            We keep it in the DOM always and animate height + opacity
            so CSS transitions fire smoothly on both open and close.
          */}
          <div
            className="md:hidden absolute top-full left-0 w-full bg-[#1a0b2e]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
            style={{
              maxHeight: menuOpen ? "320px" : "0px",
              opacity: menuOpen ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
              pointerEvents: menuOpen ? "auto" : "none",
            }}
          >
            <div
              className="px-5 py-6 flex flex-col gap-5"
              style={{
                transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
                transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {["Welcome", "About", "Features"].map((item, i) => (
                <a
                  key={item}
                  href={item === "Welcome" ? "#" : `#${item.toLowerCase()}`}
                  className="text-sm text-white/90 hover:text-white transition-colors font-medium tracking-wide cursor-pointer"
                  onClick={scrollTo(item === "Welcome" ? "hero" : item.toLowerCase())}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.35s ease ${0.05 * i + 0.1}s, transform 0.35s ease ${0.05 * i + 0.1}s`,
                  }}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/login"
                className="py-2.5 px-4 text-sm font-medium rounded-full bg-purple-500 hover:bg-purple-400 text-white text-center mt-1 transition-colors"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                  transition: "opacity 0.35s ease 0.25s, transform 0.35s ease 0.25s",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </header>

        {/* Hero text */}
        <section className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-32 md:pt-32 md:pb-48 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
            <span className="italic text-purple-400 font-serif pr-2">Feel heard.</span>
            <br />
            Get clarity.
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed text-white/80">
            A private space to reflect, track your emotions, and understand yourself better — with an AI companion that listens.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium rounded-full bg-purple-400 text-[#1a0b2e] hover:bg-purple-300 transition-all shadow-md shadow-purple-500/20"
          >
            Start for free <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="max-w-7xl mx-auto px-5 py-16 -mt-12 md:-mt-20 relative z-20">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-md">
          <div
            className="relative p-10 md:p-16 flex flex-col justify-center min-h-[350px]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(26, 11, 46, 0.8), rgba(26, 11, 46, 0.8)), url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Our AI</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              MindBridge was created to provide a safe, judgement-free zone for personal reflection.
              Our empathetic AI model is designed to listen first, helping you spot patterns across
              days, weeks, and months without ever lecturing or diagnosing.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-200 p-10 md:p-16 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8 mb-10">
              {[
                { value: "24/7", label: "Availability" },
                { value: "100%", label: "Private & Secure" },
                { value: "0", label: "Judgement" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-4xl font-bold text-[#1a0b2e] mb-1">{value}</div>
                  <div className="text-sm text-[#1a0b2e]/70 font-medium">{label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 text-sm font-medium rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all shadow-md shadow-purple-500/20"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-5 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a0b2e]">AI Wellness Features</h2>
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#1a0b2e] hover:bg-purple-50 transition-colors bg-white">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500 hover:bg-purple-600 transition-colors shadow-sm shadow-purple-500/30">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 — Empathetic AI */}
          <FeatureCard
            icon={<Brain size={22} />}
            title="Empathetic AI"
            desc="Conversations that listen first. MindBridge reflects, never lectures or diagnoses."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<EmpathyIllustration />}
          />

          {/* Card 2 — Mood Tracking */}
          <FeatureCard
            icon={<HeartPulse size={22} />}
            title="Mood tracking"
            desc="Log how you feel daily. Spot patterns across days, weeks, and months."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<MoodIllustration />}
          />

          {/* Card 3 — Private by default */}
          <FeatureCard
            icon={<ShieldCheck size={22} />}
            title="Private by default"
            desc="Your reflections belong to you alone. Never shared, never sold."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<PrivacyIllustration />}
          />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-100 mt-10">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col items-center">
          <p className="text-xs text-slate-400 mb-6 text-center max-w-xl leading-relaxed">
            MindBridge is not a substitute for professional mental health care.
            If you are in crisis, please contact a licensed professional immediately.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-slate-100 pt-6">
            <span className="text-sm text-slate-400 mb-4 md:mb-0">© 2026 MindBridge</span>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm text-slate-500 hover:text-[#1a0b2e] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Feature card component ──────────────────────────────────────────── */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accentColor: string;
  accentBg: string;
  illustration: React.ReactNode;
}

function FeatureCard({ icon, title, desc, accentColor, accentBg, illustration }: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Illustration area */}
      <div
        className="relative h-52 w-full flex items-center justify-center overflow-hidden"
        style={{ background: accentBg }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-125"
          style={{ background: accentColor }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-110"
          style={{ background: accentColor }}
        />
        {/* Illustration */}
        <div className="relative z-10 w-40 h-40 transition-transform duration-500 group-hover:scale-105">
          {illustration}
        </div>
      </div>

      {/* Text */}
      <div className="p-6 flex flex-col flex-1">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
          style={{ background: accentBg, color: accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#1a0b2e] mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm flex-1">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Custom SVG illustrations ─────────────────────────────────────────── */

/** Empathetic AI — person + speech bubbles */
function EmpathyIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="80" cy="130" rx="32" ry="12" fill="#ddd6fe" opacity="0.5" />
      <rect x="60" y="88" width="40" height="40" rx="12" fill="#7c3aed" opacity="0.15" />
      {/* Head */}
      <circle cx="80" cy="72" r="22" fill="#7c3aed" opacity="0.2" />
      <circle cx="80" cy="72" r="16" fill="#7c3aed" opacity="0.35" />
      {/* Face */}
      <circle cx="74" cy="70" r="2.5" fill="#4c1d95" />
      <circle cx="86" cy="70" r="2.5" fill="#4c1d95" />
      <path d="M74 78 Q80 83 86 78" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Left bubble */}
      <rect x="16" y="42" width="46" height="26" rx="10" fill="white" stroke="#ddd6fe" strokeWidth="1.5" />
      <path d="M38 68 L30 78 L44 68" fill="white" stroke="#ddd6fe" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="23" y="49" width="32" height="4" rx="2" fill="#c4b5fd" />
      <rect x="23" y="57" width="22" height="4" rx="2" fill="#e9d5ff" />
      {/* Right bubble */}
      <rect x="98" y="28" width="46" height="26" rx="10" fill="#7c3aed" />
      <path d="M106 54 L120 64 L118 54" fill="#7c3aed" />
      <rect x="105" y="35" width="32" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="105" y="43" width="20" height="4" rx="2" fill="white" opacity="0.6" />
    </svg>
  );
}

/** Mood tracking — waveform + emoji row */
function MoodIllustration() {
  const moods = [
    { cx: 28, emoji: "😔", fill: "#a78bfa" },
    { cx: 56, emoji: "😐", fill: "#8b5cf6" },
    { cx: 84, emoji: "🙂", fill: "#7c3aed" },
    { cx: 112, emoji: "😊", fill: "#6d28d9" },
    { cx: 140, emoji: "😄", fill: "#4c1d95" },
  ];

  return (
    <svg viewBox="0 0 168 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Card bg */}
      <rect x="12" y="10" width="144" height="140" rx="16" fill="white" stroke="#ddd6fe" strokeWidth="1.5" />
      {/* Title line */}
      <rect x="28" y="24" width="60" height="7" rx="3.5" fill="#c4b5fd" />
      <rect x="28" y="35" width="40" height="5" rx="2.5" fill="#ede9fe" />
      {/* Chart bars */}
      {[
        { x: 28, h: 28, y: 78 },
        { x: 52, h: 42, y: 64 },
        { x: 76, h: 20, y: 86 },
        { x: 100, h: 50, y: 56 },
        { x: 124, h: 34, y: 72 },
      ].map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width="18"
          height={bar.h}
          rx="5"
          fill="#7c3aed"
          opacity={0.25 + i * 0.15}
        />
      ))}
      {/* Trend line */}
      <polyline
        points="37,78 61,64 85,86 109,56 133,72"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {[
        { cx: 37, cy: 78 },
        { cx: 61, cy: 64 },
        { cx: 85, cy: 86 },
        { cx: 109, cy: 56 },
        { cx: 133, cy: 72 },
      ].map((pt, i) => (
        <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />
      ))}
      {/* Emoji mood row */}
      {moods.map(({ cx, emoji }) => (
        <text key={cx} x={cx} y={138} textAnchor="middle" fontSize="16">
          {emoji}
        </text>
      ))}
    </svg>
  );
}

/** Privacy — shield with lock */
function PrivacyIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Glow ring */}
      <circle cx="80" cy="80" r="58" fill="#ede9fe" opacity="0.6" />
      <circle cx="80" cy="80" r="44" fill="#ddd6fe" opacity="0.5" />
      {/* Shield */}
      <path
        d="M80 28 L112 42 L112 76 C112 96 96 110 80 120 C64 110 48 96 48 76 L48 42 Z"
        fill="#7c3aed"
        opacity="0.18"
        stroke="#7c3aed"
        strokeWidth="2"
      />
      <path
        d="M80 36 L106 48 L106 76 C106 93 92 105 80 114 C68 105 54 93 54 76 L54 48 Z"
        fill="#7c3aed"
        opacity="0.3"
      />
      {/* Lock body */}
      <rect x="66" y="80" width="28" height="22" rx="5" fill="#4c1d95" />
      {/* Lock shackle */}
      <path
        d="M70 80 L70 73 A10 10 0 0 1 90 73 L90 80"
        stroke="#4c1d95"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="80" cy="89" r="4" fill="white" opacity="0.9" />
      <rect x="78" y="91" width="4" height="6" rx="1" fill="white" opacity="0.9" />
      {/* Sparkle dots */}
      <circle cx="44" cy="52" r="4" fill="#a78bfa" opacity="0.7" />
      <circle cx="116" cy="60" r="3" fill="#c4b5fd" opacity="0.8" />
      <circle cx="52" cy="112" r="3" fill="#a78bfa" opacity="0.5" />
      <circle cx="112" cy="108" r="4.5" fill="#c4b5fd" opacity="0.6" />
    </svg>
  );
}
```

## src/components/Providers.tsx

```typescript
"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

## src/components/TypingIndicator.tsx

```typescript

export function TypingIndicator() {
  return (
    <span className="flex items-center gap-1.5" aria-label="MindBridge is typing">
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
    </span>
  );
}
```

## src/components/mood/MoodDistributionChart.tsx

```typescript
"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const PALETTE = [
  "#7c3aed","#06b6d4","#6366f1","#14b8a6","#8b5cf6",
  "#a78bfa","#d97706","#f59e0b","#ef4444","#6b7280",
];

const MOOD_LABELS: Record<string, string> = {
  HAPPY:"Happy", CALM:"Calm", HOPEFUL:"Hopeful", NEUTRAL:"Neutral", LONELY:"Lonely",
  ANXIOUS:"Anxious", SAD:"Sad", OVERWHELMED:"Overwhelmed", ANGRY:"Angry", FEARFUL:"Fearful",
};

const MOOD_EMOJI: Record<string, string> = {
  HAPPY:"😊", CALM:"😌", HOPEFUL:"🌟", NEUTRAL:"😐", LONELY:"💙",
  ANXIOUS:"😰", SAD:"😔", OVERWHELMED:"😵", ANGRY:"😤", FEARFUL:"😨",
};

interface DistEntry {
  key: string;
  value: number;
  name: string;
  emoji: string;
}

function PieTipContent({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  total: number;
}) {
  if (!active || !payload?.length) return null;
  const it = payload[0];
  const value = Number(it.value ?? 0);
  const pct = total ? Math.round((value / total) * 100) : 0;

  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      padding: "8px 12px",
      boxShadow: "var(--shadow-md)",
      fontSize: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: it.color, flexShrink: 0 }} />
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{it.name}</span>
      </div>
      <p style={{ color: "var(--text-tertiary)", margin: 0 }}>
        {value} log{value !== 1 ? "s" : ""} · {pct}%
      </p>
    </div>
  );
}

export function MoodDistributionChart({
  distribution,
}: {
  distribution: Record<string, number>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!distribution || Object.keys(distribution).length === 0) {
    return (
      <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Log some moods to see your distribution.
        </p>
      </div>
    );
  }

  const data: DistEntry[] = Object.entries(distribution)
    .filter(([, n]) => n > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key,
      value,
      name:  MOOD_LABELS[key] ?? key,
      emoji: MOOD_EMOJI[key] ?? "💭",
    }));

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!mounted) {
    return <div style={{ height: 160 }} />;
  }

  return (
    <div>
      {/* Explicit height wrapper — required for ResponsiveContainer */}
      <div style={{ position: "relative", width: "100%", height: 160, minWidth: 0, minHeight: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="38%"
              outerRadius="68%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <PieTipContent
                  active={props.active}
                  payload={props.payload as unknown as { name: string; value: number; color: string }[]}
                  total={total}
                />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
        {data.slice(0, 8).map((d, i) => (
          <div key={d.key} className="flex items-center gap-1.5">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: PALETTE[i % PALETTE.length],
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
              {d.emoji} {d.name}
            </span>
            <span
              className="text-[11px] ml-auto shrink-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## src/components/mood/MoodTrendChart.tsx

```typescript
"use client";

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

interface TrendPoint {
  day: string;
  avgIntensity: number;
  avgSleep?: number | null;
  avgEnergy?: number | null;
  count: number;
}

interface Colors {
  violet: string;
  cyan: string;
  amber: string;
  border: string;
  subtle: string;
  card: string;
}

function cssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-md)",
        padding: "8px 12px",
        boxShadow: "var(--shadow-md)",
        fontSize: 12,
      }}
    >
      {label && (
        <p style={{ color: "var(--text-tertiary)", marginBottom: 4, fontWeight: 500 }}>
          {label}
        </p>
      )}
      {payload.map((e) => (
        <div
          key={String(e.name)}
          style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: e.color,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          <span style={{ color: "var(--text-primary)" }}>
            {e.name}: <strong>{Number(e.value ?? 0).toFixed(1)}/10</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

export function MoodTrendChart({ data }: { data: TrendPoint[] }) {
  const [mounted, setMounted] = useState(false);
  const [c, setC] = useState<Colors>({
    violet: "#7c3aed",
    cyan:   "#06b6d4",
    amber:  "#d97706",
    border: "#e4e4e7",
    subtle: "#a1a1aa",
    card:   "#ffffff",
  });

  useEffect(() => {
    setMounted(true);
    setC({
      violet: cssVar("--violet")        || "#7c3aed",
      cyan:   cssVar("--cyan")          || "#06b6d4",
      amber:  cssVar("--amber")         || "#d97706",
      border: cssVar("--border")        || "#e4e4e7",
      subtle: cssVar("--text-tertiary") || "#a1a1aa",
      card:   cssVar("--card")          || "#ffffff",
    });
  }, []);

  if (!data || data.length === 0) {
    return (
      <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Not enough data yet.
        </p>
      </div>
    );
  }

  // Don't render the chart at all until the client has mounted and the
  // parent container has a real pixel size — prevents the width/height=-1 error.
  if (!mounted) {
    return <div style={{ height: 190 }} />;
  }

  const hasSleep  = data.some((d) => d.avgSleep  != null);
  const hasEnergy = data.some((d) => d.avgEnergy != null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 190,
        minWidth: 0,       // lets flex/grid children shrink below content size
        minHeight: 190,    // guarantees recharts gets a positive height
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: c.subtle, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tickCount={5}
            tick={{ fill: c.subtle, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={(props) => (
              <ChartTip
                active={props.active}
                payload={props.payload as unknown as { name: string; value: number; color: string }[]}
                label={typeof props.label === "string" ? props.label : String(props.label ?? "")}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="avgIntensity"
            stroke={c.violet}
            strokeWidth={2}
            dot={{ fill: c.card, stroke: c.violet, strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: c.violet, stroke: c.card, strokeWidth: 2 }}
            name="Mood"
            connectNulls
          />
          {hasSleep && (
            <Line
              type="monotone"
              dataKey="avgSleep"
              stroke={c.cyan}
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 3"
              name="Sleep"
              connectNulls
            />
          )}
          {hasEnergy && (
            <Line
              type="monotone"
              dataKey="avgEnergy"
              stroke={c.amber}
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="2 3"
              name="Energy"
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## src/hooks/use-chat-logic.ts

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useChatStore,
  selectActiveMessages,
  type ChatMessage,
} from '@/store/useChatStore';

export function useChatLogic(sessionId?: string) {
  const router = useRouter();

  const messages = useChatStore(selectActiveMessages);
  const setMessages = useChatStore((s) => s.setMessages);
  const startDraftSession = useChatStore((s) => s.startDraftSession);
  const promoteDraftToSession = useChatStore((s) => s.promoteDraftToSession);
  const loadHistoryForSession = useChatStore((s) => s.loadHistoryForSession);
  const isHydrated = useChatStore((s) => s.isHydrated);
  const triggerSidebarRefresh = useChatStore((s) => s.triggerRefresh);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const draftKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const isNewChat = !sessionId || sessionId === 'new';

    if (isNewChat) {
      if (!draftKeyRef.current) {
        setMessages([]);
      }
      setIsHistoryLoading(false);
      return;
    }
    if (isHydrated(sessionId)) {
      setIsHistoryLoading(false);
      draftKeyRef.current = null; // promotion complete, clear the draft marker
      return;
    }

    let cancelled = false;
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`, {
          credentials: 'include',
        });
        if (res.ok && !cancelled) {
          const data: ChatMessage[] = await res.json();
          loadHistoryForSession(sessionId, data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    };

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [sessionId, isHydrated, loadHistoryForSession, setMessages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) return;

      const isNewChat = !sessionId || sessionId === 'new';

      if (isNewChat && !draftKeyRef.current) {
        draftKeyRef.current = startDraftSession();
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: currentInput,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            sessionId: sessionId || 'new',
          }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Server error');

        const newSessionId = response.headers.get('X-Session-Id');

        if (isNewChat && newSessionId) {
          promoteDraftToSession(newSessionId);
          draftKeyRef.current = newSessionId;

          router.replace(`/chat/${newSessionId}`, { scroll: false });
          triggerSidebarRefresh();
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const assistantMessageId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: '' },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      } catch (err) {
        console.error('Chat Error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, sessionId, router, triggerSidebarRefresh, setMessages, startDraftSession, promoteDraftToSession]
  );

  return {
    messages,
    input,
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    handleSubmit,
    isLoading,
    isHistoryLoading,
  };
}
```

## src/lib/prisma.ts

```typescript
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
```

## src/lib/services/ai-analysis.service.ts

```typescript
import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRISIS";

export type MessageAnalysisResult = {
  emotion: string;   // e.g. ANXIOUS, SAD, HAPPY, ANGRY, NEUTRAL, FEARFUL, HOPEFUL
  intensity: number; // 1-10
  riskLevel: RiskLevel;
};

const ANALYSIS_PROMPT = `
You are an emotion analysis engine for a mental wellness app.

Analyse the user's message and return ONLY a JSON object with these fields:
- emotion: one of HAPPY, SAD, ANXIOUS, ANGRY, NEUTRAL, FEARFUL, HOPEFUL, OVERWHELMED, LONELY, CALM
- intensity: integer from 1 to 10 (1 = barely noticeable, 10 = extreme)
- riskLevel: one of LOW, MODERATE, HIGH, CRISIS

CRISIS = explicit self-harm, suicidal ideation, or intent to harm others.
HIGH = severe distress, hopelessness, or mentions of self-harm without explicit intent.
MODERATE = significant distress, persistent negative mood, mentions of struggle.
LOW = mild negative emotion or normal conversation.

Return ONLY valid JSON. No explanation, no markdown, no backticks.

Example:
{"emotion":"ANXIOUS","intensity":7,"riskLevel":"LOW"}
`.trim();

/**
 * Analyse a single user message for emotion, intensity, and risk level.
 * Returns null on failure so callers can proceed without blocking the chat.
 */
export async function analyseMessage(
  userMessage: string
): Promise<MessageAnalysisResult | null> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Faster, cheaper model for analysis
      messages: [
        { role: "system", content: ANALYSIS_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.1, // Low temp for consistent structured output
      max_tokens: 60,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = JSON.parse(raw) as MessageAnalysisResult;

    // Validate required fields
    if (!parsed.emotion || !parsed.riskLevel || typeof parsed.intensity !== "number") {
      return null;
    }

    // Clamp intensity to 1-10
    parsed.intensity = Math.max(1, Math.min(10, Math.round(parsed.intensity)));

    return parsed;
  } catch (err) {
    // Non-fatal: analysis failure should not break the chat
    console.error("[AI Analysis] Failed to analyse message:", err);
    return null;
  }
}

```

## src/lib/services/analytics.service.ts

```typescript
import prisma from "@/lib/prisma";

/** Retrieve recent message analyses for a user */
export async function getRecentAnalyses(userId: string, limit = 50) {
  return prisma.messageAnalysis.findMany({
    where: {
      message: { userId },
    },
    include: { message: { select: { createdAt: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

/** Compute emotion frequency distribution from recent analyses */
export async function getEmotionFrequencies(
  userId: string,
  days = 30
): Promise<EmotionFrequency[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const analyses = await prisma.messageAnalysis.findMany({
    where: {
      message: {
        userId,
        createdAt: { gte: since },
      },
    },
    select: { emotion: true },
  });

  if (analyses.length === 0) return [];

  const counts: Record<string, number> = {};
  for (const a of analyses) {
    counts[a.emotion] = (counts[a.emotion] ?? 0) + 1;
  }

  const total = analyses.length;
  return Object.entries(counts)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export type StressScore = {
  score: number;  // 0-100
  label: string;  // "Low" | "Moderate" | "High" | "Critical"
  trend: "up" | "down" | "stable";
};

/**
 * Compute a stress score (0-100) from recent analyses.
 * Uses HIGH/CRISIS risk levels and negative emotions as signals.
 */
export async function getStressScore(userId: string): Promise<StressScore> {
  const [recent, older] = await Promise.all([
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(14), lt: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
  ]);

  const scoreOf = (analyses: typeof recent) => {
    if (analyses.length === 0) return 0;
    const negativeEmotions = new Set(["ANXIOUS", "SAD", "ANGRY", "FEARFUL", "OVERWHELMED", "LONELY"]);
    const weights = { LOW: 0.2, MODERATE: 0.5, HIGH: 0.8, CRISIS: 1.0 };
    const base =
      analyses.reduce((sum, a) => {
        const riskWeight = weights[a.riskLevel as keyof typeof weights] ?? 0.2;
        const isNeg = negativeEmotions.has(a.emotion) ? 1 : 0;
        return sum + (a.intensity / 10) * riskWeight * (isNeg ? 1.2 : 0.5);
      }, 0) / analyses.length;
    return Math.min(100, Math.round(base * 100));
  };

  const currentScore = scoreOf(recent);
  const previousScore = scoreOf(older);

  const trend: StressScore["trend"] =
    currentScore > previousScore + 5
      ? "up"
      : currentScore < previousScore - 5
      ? "down"
      : "stable";

  const label =
    currentScore >= 70
      ? "Critical"
      : currentScore >= 50
      ? "High"
      : currentScore >= 25
      ? "Moderate"
      : "Low";

  return { score: currentScore, label, trend };
}

/** Get dominant emotions in the last N days */
export async function getDominantEmotions(
  userId: string,
  days = 14
): Promise<string[]> {
  const freqs = await getEmotionFrequencies(userId, days);
  return freqs.slice(0, 3).map((f) => f.emotion);
}

// ── Helpers ──────────────────────────────────────────────────

function nDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

```

## src/lib/services/insight.service.ts

```typescript
import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { getMoodEntriesInRange } from "./mood.service";
import { getEmotionFrequencies } from "./analytics.service";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const INSIGHT_PROMPT = `
You are a compassionate mental wellness analyst.

You will receive a summary of a user's mood and emotional data from the past week.
Generate 2 to 4 meaningful, supportive observations.

Rules:
- Never diagnose the user with any condition.
- Use gentle, supportive language: "you may have noticed", "it seems", "you might find".
- Focus on patterns, not problems.
- Be specific and grounded in the data provided.
- Each insight should be a single clear sentence.
- Return ONLY a JSON array of strings. No preamble, no markdown.

Example:
["Anxiety appears to peak on weekday mornings, which may reflect work-related pressure.","Sleep scores tend to be lower when stress intensity is higher — these two are often connected."]
`.trim();

/** Get the Monday of the current week */
function getWeekStart(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Generate (or retrieve cached) weekly insights for a user.
 * Safe to call multiple times — returns cached if already generated this week.
 */
export async function generateWeeklyInsights(userId: string) {
  const weekStart = getWeekStart();

  // Return cached insight for this week if it exists
  const existing = await prisma.weeklyInsight.findUnique({
    where: { userId_weekStart: { userId, weekStart } },
  });
  if (existing) return existing;

  // Gather data for the past 7 days
  const weekEnd = new Date();
  const [moodEntries, emotionFreqs] = await Promise.all([
    getMoodEntriesInRange(userId, weekStart, weekEnd),
    getEmotionFrequencies(userId, 7),
  ]);

  // Build a compact data summary for the AI
  const avgMood =
    moodEntries.length > 0
      ? (moodEntries.reduce((s, e) => s + (e.intensity ?? e.value), 0) /
          moodEntries.length).toFixed(1)
      : "N/A";

  const avgSleep =
    moodEntries.filter((e) => e.sleepScore).length > 0
      ? (
          moodEntries.reduce((s, e) => s + (e.sleepScore ?? 0), 0) /
          moodEntries.filter((e) => e.sleepScore).length
        ).toFixed(1)
      : "N/A";

  const topEmotions = emotionFreqs
    .slice(0, 3)
    .map((e) => `${e.emotion} (${e.percentage}%)`)
    .join(", ");

  const moodByDay = moodEntries
    .reduce((acc: Record<string, number[]>, e) => {
      const day = e.createdAt.toLocaleDateString("en-US", { weekday: "long" });
      if (!acc[day]) acc[day] = [];
      acc[day].push(e.intensity ?? e.value);
      return acc;
    }, {});

  const dailySummary = Object.entries(moodByDay)
    .map(([day, vals]) => `${day}: avg ${(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)}`)
    .join(", ");

  const dataSummary = `
Week: ${weekStart.toDateString()} to ${weekEnd.toDateString()}
Mood entries logged: ${moodEntries.length}
Average intensity/mood: ${avgMood}/10
Average sleep score: ${avgSleep}/10
Top emotions from chat: ${topEmotions || "N/A"}
Daily mood averages: ${dailySummary || "N/A"}
  `.trim();

  if (moodEntries.length === 0 && emotionFreqs.length === 0) {
    // Not enough data — store a placeholder
    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: {},
      create: {
        userId,
        weekStart,
        content:
          "Log your mood daily to start seeing personalised weekly insights.",
        tags: [],
      },
    });
  }

  // Ask Groq to generate insights
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: INSIGHT_PROMPT },
        { role: "user", content: dataSummary },
      ],
      temperature: 0.6,
      max_tokens: 300,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "[]";
    const insights: string[] = JSON.parse(raw);

    // Derive tags from top emotions
    const tags = emotionFreqs.slice(0, 3).map((e) => e.emotion.toLowerCase());

    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: { content: insights.join(" "), tags },
      create: {
        userId,
        weekStart,
        content: insights.join(" "),
        tags,
      },
    });
  } catch (err) {
    console.error("[Insight Service] Failed to generate insights:", err);
    return null;
  }
}

/** Fetch the most recent insight for a user */
export async function getLatestInsight(userId: string) {
  return prisma.weeklyInsight.findFirst({
    where: { userId },
    orderBy: { weekStart: "desc" },
  });
}

```

## src/lib/services/mood.service.ts

```typescript
import prisma from "@/lib/prisma";

export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type CreateMoodInput = {
  userId: string;
  value: number;      // 1-10 (kept for backward compat)
  moodType?: MoodType;
  intensity?: number; // 1-10
  note?: string;
  sleepScore?: number;
  energyScore?: number;
};

/** Create a new mood entry */
export async function createMoodEntry(input: CreateMoodInput) {
  return prisma.moodEntry.create({ data: input });
}

/** Fetch recent mood entries for a user (defaults to last 30) */
export async function getRecentMoodEntries(userId: string, limit = 30) {
  return prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** Fetch mood entries within a date range */
export async function getMoodEntriesInRange(
  userId: string,
  from: Date,
  to: Date
) {
  return prisma.moodEntry.findMany({
    where: {
      userId,
      createdAt: { gte: from, lte: to },
    },
    orderBy: { createdAt: "asc" },
  });
}

/** Get the last N days of entries (for charts) */
export async function getMoodEntriesLastNDays(userId: string, days = 7) {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return getMoodEntriesInRange(userId, from, new Date());
}

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

/** Calculate summary stats for a user's mood history */
export async function getMoodSummary(userId: string): Promise<MoodSummary> {
  const entries = await getRecentMoodEntries(userId, 90);

  if (entries.length === 0) {
    return {
      totalEntries: 0,
      averageIntensity: 0,
      averageValue: 0,
      averageSleepScore: null,
      averageEnergyScore: null,
      moodDistribution: {},
      currentStreak: 0,
    };
  }

  const withIntensity = entries.filter((e) => e.intensity !== null);
  const withSleep = entries.filter((e) => e.sleepScore !== null);
  const withEnergy = entries.filter((e) => e.energyScore !== null);

  const averageValue =
    entries.reduce((sum, e) => sum + e.value, 0) / entries.length;

  const averageIntensity =
    withIntensity.length > 0
      ? withIntensity.reduce((sum, e) => sum + (e.intensity ?? 0), 0) /
        withIntensity.length
      : 0;

  const averageSleepScore =
    withSleep.length > 0
      ? withSleep.reduce((sum, e) => sum + (e.sleepScore ?? 0), 0) /
        withSleep.length
      : null;

  const averageEnergyScore =
    withEnergy.length > 0
      ? withEnergy.reduce((sum, e) => sum + (e.energyScore ?? 0), 0) /
        withEnergy.length
      : null;

  // Build mood distribution
  const moodDistribution: Record<string, number> = {};
  for (const entry of entries) {
    if (entry.moodType) {
      moodDistribution[entry.moodType] =
        (moodDistribution[entry.moodType] ?? 0) + 1;
    }
  }

  // Calculate streak (consecutive days with at least one entry)
  const streak = calculateStreak(entries.map((e) => e.createdAt));

  return {
    totalEntries: entries.length,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    averageValue: Math.round(averageValue * 10) / 10,
    averageSleepScore: averageSleepScore
      ? Math.round(averageSleepScore * 10) / 10
      : null,
    averageEnergyScore: averageEnergyScore
      ? Math.round(averageEnergyScore * 10) / 10
      : null,
    moodDistribution,
    currentStreak: streak,
  };
}

/** Compute consecutive-day streak from a list of timestamps (desc order OK) */
function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  // Deduplicate to unique day strings
  const uniqueDays = [
    ...new Set(dates.map((d) => d.toISOString().split("T")[0])),
  ].sort((a, b) => b.localeCompare(a)); // desc

  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  let cursor = today;

  for (const day of uniqueDays) {
    if (day === cursor) {
      streak++;
      // Go back one day
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = d.toISOString().split("T")[0];
    } else if (day < cursor) {
      // Gap found
      break;
    }
  }

  return streak;
}

/** Weekly mood trend: average value per day for the last 7 days */
export async function getWeeklyMoodTrend(userId: string) {
  const entries = await getMoodEntriesLastNDays(userId, 7);

  // Group by day
  const byDay: Record<string, number[]> = {};
  for (const entry of entries) {
    const day = entry.createdAt.toISOString().split("T")[0];
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(entry.intensity ?? entry.value);
  }

  // Build a 7-day array
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const values = byDay[key] ?? [];
    result.push({
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      average: values.length
        ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        : null,
      count: values.length,
    });
  }

  return result;
}

```

## src/lib/services/specialist-recommendation.service.ts

```typescript
import prisma from "@/lib/prisma";

/** Maps a dominant emotion to relevant specialist tags and a reason */
const EMOTION_TO_TAGS: Record<
  string,
  { tags: string[]; reason: string }
> = {
  ANXIOUS: {
    tags: ["anxiety", "CBT", "GAD"],
    reason:
      "Frequent anxiety-related themes in your conversations suggest speaking with an anxiety specialist or CBT therapist may be beneficial.",
  },
  FEARFUL: {
    tags: ["anxiety", "trauma", "PTSD"],
    reason:
      "Patterns suggesting fear and worry may benefit from support from an anxiety specialist or trauma-informed therapist.",
  },
  SAD: {
    tags: ["depression", "counselling", "mood disorders"],
    reason:
      "Recurring low mood themes suggest you might find it helpful to speak with a counsellor or psychologist who specialises in mood.",
  },
  OVERWHELMED: {
    tags: ["stress", "burnout", "CBT"],
    reason:
      "Signs of sustained overwhelm may indicate that speaking with a stress management therapist or counsellor could be valuable.",
  },
  ANGRY: {
    tags: ["stress", "emotional regulation", "CBT"],
    reason:
      "Elevated frustration patterns may benefit from support with emotional regulation from a licensed therapist.",
  },
  LONELY: {
    tags: ["counselling", "interpersonal therapy", "relationships"],
    reason:
      "Themes around connection and loneliness suggest that speaking with a counsellor may provide meaningful support.",
  },
  HOPEFUL: {
    tags: ["mindfulness", "wellbeing", "positive psychology"],
    reason:
      "Maintaining your positive momentum with a mindfulness or wellbeing coach may help sustain your progress.",
  },
  CALM: {
    tags: ["mindfulness", "wellbeing"],
    reason:
      "Consider exploring sessions with a mindfulness practitioner to deepen your sense of balance.",
  },
  NEUTRAL: {
    tags: ["counselling", "wellbeing"],
    reason:
      "Speaking with a counsellor can provide space for reflection and personal growth.",
  },
};

/** High-risk level -> always surface crisis-appropriate specialists */
const CRISIS_TAGS = ["psychiatry", "trauma", "depression", "crisis support"];

export type RecommendedSpecialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: string;
  tags: string[];
  verified: boolean;
};

export type RecommendationResult = {
  specialists: RecommendedSpecialist[];
  reason: string;
};

/**
 * Return specialist recommendations based on the user's dominant emotions
 * and highest risk level observed.
 * Does NOT diagnose the user.
 */
export async function getSpecialistRecommendations(
  dominantEmotions: string[],
  highestRiskLevel: string
): Promise<RecommendationResult> {
  // If in crisis/high-risk, prioritise crisis-appropriate specialists
  const isCrisis =
    highestRiskLevel === "CRISIS" || highestRiskLevel === "HIGH";

  const tagsToSearch = isCrisis
    ? CRISIS_TAGS
    : dominantEmotions.flatMap(
        (e) => EMOTION_TO_TAGS[e]?.tags ?? ["counselling"]
      );

  const uniqueTags = [...new Set(tagsToSearch)];

  // Build reason string from top emotion
  const topEmotion = dominantEmotions[0] ?? "NEUTRAL";
  const reason = isCrisis
    ? "Recent conversations suggest elevated distress. Speaking with a mental health professional may provide important support."
    : (EMOTION_TO_TAGS[topEmotion]?.reason ??
      "Based on your recent conversations, speaking with a mental health professional may be beneficial.");

  // Query specialists whose tags overlap with the derived tag list
  const specialists = await prisma.specialist.findMany({
    where: {
      tags: {
        hasSome: uniqueTags,
      },
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
    take: 5,
  });

  // If nothing matches, fall back to top-rated verified specialists
  if (specialists.length === 0) {
    const fallback = await prisma.specialist.findMany({
      where: { verified: true },
      orderBy: { rating: "desc" },
      take: 3,
    });
    return { specialists: fallback, reason };
  }

  return { specialists, reason };
}

/** Fetch all specialists with optional filters */
export async function getAllSpecialists(filters?: {
  specialization?: string;
  consultationType?: string;
  tag?: string;
}) {
  return prisma.specialist.findMany({
    where: {
      ...(filters?.specialization && {
        specialization: { contains: filters.specialization, mode: "insensitive" },
      }),
      ...(filters?.consultationType && {
        consultationType: filters.consultationType,
      }),
      ...(filters?.tag && {
        tags: { has: filters.tag },
      }),
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
  });
}

```

## src/middleware.ts

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token;
    const isAuth   = !!token;
    const pathname = req.nextUrl.pathname;

    if (isAuth && pathname === "/login") {
      return NextResponse.redirect(new URL("/chat", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname === "/" || pathname === "/login") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/chat/:path*",
    "/dashboard/:path*",
    "/mood/:path*",
    "/support/:path*",
  ],
};
```

## src/store/useChatStore.ts

```typescript
import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ActiveChatSlice {
  activeKey: string | null;
  messages: ChatMessage[];

  hydratedSessionIds: Set<string>;

  isAwaitingSessionId: boolean;

  startDraftSession: () => string;
  setMessages: (updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  promoteDraftToSession: (realSessionId: string) => void;
  loadHistoryForSession: (sessionId: string, messages: ChatMessage[]) => void;
  markAwaitingSessionId: (waiting: boolean) => void;
  resetActiveChat: () => void;
  isHydrated: (sessionId: string) => boolean;
}

interface SidebarSlice {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
}

type ChatStore = ActiveChatSlice & SidebarSlice;

export const useChatStore = create<ChatStore>((set, get) => ({
  activeKey: null,
  messages: [],
  hydratedSessionIds: new Set(),
  isAwaitingSessionId: false,

  startDraftSession: () => {
    const draftKey = `draft-${Date.now()}`;
    set({ activeKey: draftKey, messages: [], isAwaitingSessionId: false });
    return draftKey;
  },

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === 'function' ? (updater as (prev: ChatMessage[]) => ChatMessage[])(state.messages) : updater,
    })),

  promoteDraftToSession: (realSessionId) =>
    set((state) => ({
      activeKey: realSessionId,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(realSessionId),
      isAwaitingSessionId: false,
    })),

  loadHistoryForSession: (sessionId, messages) =>
    set((state) => ({
      activeKey: sessionId,
      messages,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(sessionId),
    })),

  markAwaitingSessionId: (waiting) => set({ isAwaitingSessionId: waiting }),

  resetActiveChat: () => set({ activeKey: null, messages: [], isAwaitingSessionId: false }),

  isHydrated: (sessionId) => get().hydratedSessionIds.has(sessionId),

  shouldRefresh: false,
  triggerRefresh: () => set({ shouldRefresh: true }),
  resetRefresh: () => set({ shouldRefresh: false }),
}));

export const selectActiveMessages = (s: ChatStore) => s.messages;
export const selectActiveKey = (s: ChatStore) => s.activeKey;
export const selectSidebarRefresh = (s: ChatStore) => s.shouldRefresh;
```

## src/types/mindbridge.ts

```typescript
export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type MoodEntry = {
  id: string;
  userId: string;
  value: number;
  moodType: MoodType | null;
  intensity: number | null;
  note: string | null;
  sleepScore: number | null;
  energyScore: number | null;
  createdAt: string; // ISO string from JSON response
};

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

export type WeeklyTrendPoint = {
  date: string;
  label: string;         // "Mon", "Tue", etc.
  average: number | null;
  count: number;
};

// ── Analysis ─────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRISIS";

export type MessageAnalysis = {
  id: string;
  messageId: string;
  emotion: string;
  intensity: number;
  riskLevel: RiskLevel;
  createdAt: string;
};

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

export type StressScore = {
  score: number;
  label: "Low" | "Moderate" | "High" | "Critical";
  trend: "up" | "down" | "stable";
};

// ── Insights ─────────────────────────────────────────────────

export type WeeklyInsight = {
  id: string;
  userId: string;
  weekStart: string;
  content: string;
  tags: string[];
  generatedAt: string;
};

// ── Specialists ──────────────────────────────────────────────

export type ConsultationType = "virtual" | "physical" | "both";

export type Specialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: ConsultationType;
  tags: string[];
  verified: boolean;
  createdAt: string;
};

export type RecommendationResult = {
  specialists: Specialist[];
  reason: string;
};

// ── Dashboard ────────────────────────────────────────────────

export type DashboardData = {
  moodSummary: MoodSummary;
  weeklyTrend: WeeklyTrendPoint[];
  recentMoodEntries: MoodEntry[];
  stressScore: StressScore;
  dominantEmotions: string[];
  latestInsight: WeeklyInsight | null;
  recentSessions: { id: string; title: string | null; updatedAt: string }[];
  recommendedSpecialists: Specialist[];
  recommendationReason: string;
};

```

## src/types/next-auth.d.ts

```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
```

## tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        "surface-raised": "var(--surface-raised)",

        foreground: "var(--foreground)",
        muted: "var(--foreground-muted)",
        subtle: "var(--foreground-subtle)",
        inverse: "var(--foreground-inverse)",

        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          muted: "var(--primary-muted)",
          subtle: "var(--primary-subtle)",
          fg: "var(--primary-fg)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          muted: "var(--accent-muted)",
          subtle: "var(--accent-subtle)",
        },

        success: "var(--success)",
        "success-muted": "var(--success-muted)",
        warning: "var(--warning)",
        "warning-muted": "var(--warning-muted)",
        destructive: "var(--destructive)",
        "destructive-muted": "var(--destructive-muted)",
        "destructive-fg": "var(--destructive-fg)",

        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "border-focus": "var(--border-focus)",
      },

      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      transitionTimingFunction: {
        spring: "var(--ease-spring)",
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },

      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
      },
    },
  },
  plugins: [],
};

export default config;
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

