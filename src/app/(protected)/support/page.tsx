"use client";


import useSWR from "swr";
import { useState } from "react";
import {
  Star,
  MapPin,
  Globe,
  Clock,
  Video,
  Users,
  BookOpen,
  Heart,
  Brain,
  Moon,
  Wind,
  Shield,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
} from "lucide-react";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const CONSULT_LABELS: Record<string, string> = {
  virtual: "Virtual",
  physical: "In-Person",
  both: "Virtual & In-Person",
};

const CONSULT_ICON: Record<string, React.ReactNode> = {
  virtual: <Video size={12} />,
  physical: <Users size={12} />,
  both: <Globe size={12} />,
};

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"recommended" | "all">("recommended");
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const { data: recData, isLoading: recLoading } = useSWR(
    "/api/specialists?recommended=true",
    fetcher
  );

  const { data: allSpecialists, isLoading: allLoading } = useSWR(
    activeTab === "all" ? "/api/specialists" : null,
    fetcher
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-slate-900">Support & Resources</h1>
          <p className="text-slate-500 mt-1">
            Find professional support tailored to your journey. All recommendations are
            category-based — never a diagnosis.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
          {[
            { key: "recommended", label: "Recommended For You" },
            { key: "all", label: "All Specialists" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Recommended Specialists ── */}
        {activeTab === "recommended" && (
          <section className="space-y-6">
            {recData?.reason && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
                <p className="text-sm text-teal-800 leading-relaxed">
                  <span className="font-semibold">Why these specialists?</span>{" "}
                  {recData.reason}
                </p>
              </div>
            )}

            {recLoading ? (
              <SpecialistSkeleton count={3} />
            ) : recData?.specialists?.length > 0 ? (
              <div className="space-y-4">
                {recData.specialists.map((sp: any) => (
                  <SpecialistCard key={sp.id} specialist={sp} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Chat more to receive personalised recommendations.
              </p>
            )}
          </section>
        )}

        {/* ── All Specialists ── */}
        {activeTab === "all" && (
          <section className="space-y-4">
            {allLoading ? (
              <SpecialistSkeleton count={5} />
            ) : Array.isArray(allSpecialists) && allSpecialists.length > 0 ? (
              allSpecialists.map((sp: any) => (
                <SpecialistCard key={sp.id} specialist={sp} />
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No specialists found.</p>
            )}
          </section>
        )}

        {/* ── Educational Resources ── */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-slate-900 mb-6">
            Educational Resources
          </h2>
          <div className="space-y-3">
            {RESOURCES.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedResource(
                      expandedResource === resource.id ? null : resource.id
                    )
                  }
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${resource.iconBg}`}
                  >
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{resource.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{resource.subtitle}</p>
                  </div>
                  {expandedResource === resource.id ? (
                    <ChevronUp size={18} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  )}
                </button>
                {expandedResource === resource.id && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
                    {resource.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Crisis Resources ── */}
        <section className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <h3 className="font-semibold text-rose-800 flex items-center gap-2 mb-3">
            <Shield size={18} /> Crisis Support
          </h3>
          <p className="text-sm text-rose-700 mb-4 leading-relaxed">
            If you are experiencing a mental health emergency, please reach out immediately.
          </p>
          <div className="space-y-2">
            {CRISIS_RESOURCES.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-rose-800">
                <span className="font-semibold">{r.name}:</span>
                <span>{r.contact}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// ── Specialist Card ───────────────────────────────────────────

function SpecialistCard({ specialist: sp }: { specialist: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-lg shrink-0">
          {sp.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900">{sp.name}</h3>
            {sp.verified && (
              <BadgeCheck size={16} className="text-teal-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{sp.title}</p>
          <p className="text-xs text-teal-700 font-medium mt-1">{sp.specialization}</p>

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              {sp.rating}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {sp.yearsOfExperience} yrs experience
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {sp.location}
            </span>
            <span className="flex items-center gap-1">
              {CONSULT_ICON[sp.consultationType]}
              {CONSULT_LABELS[sp.consultationType]}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Globe size={12} />
              {sp.languages?.join(", ")}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {sp.availability}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">{sp.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sp.tags?.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecialistSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 h-36" />
      ))}
    </div>
  );
}

// ── Static Data ───────────────────────────────────────────────

const CRISIS_RESOURCES = [
  { name: "Nigeria Suicide Prevention", contact: "0800-SUICIDE (0800-784-2433)" },
  { name: "LASUTH Psychiatric Emergency", contact: "+234-01-793-0284" },
  { name: "Crisis Text Line (International)", contact: "Text HOME to 741741" },
  { name: "WHO Mental Health Helpline", contact: "Visit who.int/mental_health" },
];

const RESOURCES = [
  {
    id: "anxiety",
    title: "Understanding Anxiety",
    subtitle: "What it is, what it feels like, and how to cope",
    icon: <Heart size={20} className="text-rose-500" />,
    iconBg: "bg-rose-50",
    items: [
      {
        title: "Recognising Anxiety",
        description:
          "Anxiety is your body's natural response to stress. It becomes a concern when it interferes with daily life. Common signs include racing thoughts, physical tension, and avoidance.",
      },
      {
        title: "Grounding Techniques",
        description:
          "The 5-4-3-2-1 method can help bring you back to the present moment: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      },
      {
        title: "Breathing Exercises",
        description:
          "Box breathing (inhale 4 counts, hold 4, exhale 4, hold 4) activates your parasympathetic nervous system and can reduce acute anxiety.",
      },
      {
        title: "When to Seek Help",
        description:
          "If anxiety is persistent, impairing your daily function, or causing panic attacks, speaking with a CBT therapist or anxiety specialist may be beneficial.",
      },
    ],
  },
  {
    id: "stress",
    title: "Stress Management",
    subtitle: "Tools and perspectives for managing daily stress",
    icon: <Brain size={20} className="text-violet-500" />,
    iconBg: "bg-violet-50",
    items: [
      {
        title: "Identifying Your Stressors",
        description:
          "Stress becomes manageable when you can name its sources. Journaling or mood tracking helps identify patterns — is your stress higher on certain days or in certain contexts?",
      },
      {
        title: "Time Boundaries",
        description:
          "Setting clear work-life boundaries reduces chronic stress. Consider regular 'switching off' rituals: a short walk, turning off notifications, or a fixed end-of-day routine.",
      },
      {
        title: "Physical Release",
        description:
          "Stress hormones are designed to fuel physical action. Even brief walks, stretching, or light exercise can help metabolise cortisol and adrenaline effectively.",
      },
      {
        title: "Social Support",
        description:
          "Talking to trusted people reduces the physiological impact of stress. You do not need to solve your problems to benefit — being heard is itself healing.",
      },
    ],
  },
  {
    id: "depression",
    title: "Navigating Low Mood & Depression",
    subtitle: "Understanding the difference and finding your way forward",
    icon: <Wind size={20} className="text-blue-500" />,
    iconBg: "bg-blue-50",
    items: [
      {
        title: "Low Mood vs. Depression",
        description:
          "Low mood is temporary and often tied to circumstances. Depression is more persistent, affects multiple areas of life, and may include physical symptoms like fatigue, appetite changes, and difficulty concentrating.",
      },
      {
        title: "Behavioural Activation",
        description:
          "Depression often reduces motivation, which reduces activity, which deepens depression. Gently reintroducing small, enjoyable or meaningful activities — even when motivation is low — can break this cycle.",
      },
      {
        title: "Self-Compassion",
        description:
          "Depression is not a character flaw or weakness. Treating yourself with the kindness you would extend to a friend can soften the self-critical voice that often accompanies low mood.",
      },
      {
        title: "Professional Support",
        description:
          "Depression is treatable. Psychotherapy (especially CBT and interpersonal therapy) and, where appropriate, medication can significantly reduce symptoms. Consider speaking with a counsellor or psychologist.",
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep Health",
    subtitle: "Building a foundation for restorative rest",
    icon: <Moon size={20} className="text-indigo-500" />,
    iconBg: "bg-indigo-50",
    items: [
      {
        title: "Sleep Hygiene Basics",
        description:
          "Consistent sleep and wake times, a cool and dark bedroom, and avoiding screens for 30-60 minutes before bed are among the most evidence-based steps for improving sleep quality.",
      },
      {
        title: "Managing Worry at Night",
        description:
          "If racing thoughts keep you awake, a 'worry journal' before bed — writing down thoughts and a brief plan — can help externalise the mental load and reduce nighttime rumination.",
      },
      {
        title: "The Anxiety-Sleep Cycle",
        description:
          "Poor sleep increases anxiety, and anxiety worsens sleep. CBT-I (Cognitive Behavioural Therapy for Insomnia) is the gold standard treatment and often more effective than medication long-term.",
      },
    ],
  },
  {
    id: "mindfulness",
    title: "Mindfulness & Wellbeing",
    subtitle: "Cultivating presence and emotional resilience",
    icon: <Heart size={20} className="text-teal-500" />,
    iconBg: "bg-teal-50",
    items: [
      {
        title: "What Is Mindfulness?",
        description:
          "Mindfulness is the practice of paying deliberate, non-judgmental attention to the present moment. It does not require clearing your mind — simply noticing thoughts without getting swept away by them.",
      },
      {
        title: "Starting a Practice",
        description:
          "Begin with just 5 minutes daily. Choose a consistent time, sit comfortably, and focus on your breath. When your mind wanders (it will), gently return your attention without self-criticism.",
      },
      {
        title: "Mindfulness in Daily Life",
        description:
          "You do not need a formal meditation session to be mindful. Eating slowly, walking without your phone, or fully focusing on a single task are all mindfulness practices.",
      },
      {
        title: "Evidence-Based Benefits",
        description:
          "Research supports mindfulness for reducing anxiety, improving emotional regulation, decreasing rumination, and increasing overall wellbeing — even with brief, consistent practice.",
      },
    ],
  },
];
