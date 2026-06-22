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

