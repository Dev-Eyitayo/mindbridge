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
