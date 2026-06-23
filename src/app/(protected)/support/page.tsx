
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