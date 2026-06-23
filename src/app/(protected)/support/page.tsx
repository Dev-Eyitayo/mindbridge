/**
 * src/app/(protected)/support/page.tsx
 *
 * Design decisions:
 * - Tab system: pill tabs on a muted background. Active tab: white bg + shadow.
 *   Same pattern as Linear/Notion. Feels premium vs raw border-bottom tabs.
 * - Specialist cards redesigned:
 *   - Avatar: initials in a `primary-muted` square (not teal-100). Consistent with
 *     the rest of the design system.
 *   - Tags: smaller pills with `border border-border` instead of filled bg-slate-100.
 *     Less heavy, more refined.
 *   - Layout: clean two-column header (avatar + info) then a bio in smaller text.
 *   - Contact/schedule CTA: a small ghost button in the card footer.
 * - Educational resources: accordion pattern preserved, but header uses our card
 *   styling and the expand icon uses a chevron that animates with a CSS transform.
 * - Crisis section: rose semantic tokens, kept visually distinct but not alarming.
 *   A prominent but calm call to action.
 * - All business logic, SWR fetching, tabs, accordion state preserved exactly.
 */
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
  BadgeCheck,
  Phone,
  Mail,
} from "lucide-react";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const CONSULT_LABELS: Record<string, string> = {
  virtual:  "Virtual",
  physical: "In-Person",
  both:     "Virtual & In-Person",
};

const CONSULT_ICON: Record<string, React.ReactNode> = {
  virtual:  <Video size={12} />,
  physical: <Users size={12} />,
  both:     <Globe size={12} />,
};

export default function SupportPage() {
  const [activeTab,        setActiveTab]        = useState<"recommended" | "all">("recommended");
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const { data: recData,       isLoading: recLoading  } = useSWR("/api/specialists?recommended=true", fetcher);
  const { data: allSpecialists, isLoading: allLoading } = useSWR(
    activeTab === "all" ? "/api/specialists" : null,
    fetcher
  );

  return (
    <div className="flex-1 overflow-y-auto bg-background px-6 py-8 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div>
          <h1 className="font-display text-3xl font-normal text-foreground tracking-tight">
            Support & resources
          </h1>
          <p className="text-muted text-sm mt-1.5 max-w-xl">
            Find professional support tailored to your journey.
            Recommendations are based on your emotional patterns — never a diagnosis.
          </p>
        </div>

        {/* ── Tabs ───────────────────────────────────────────────── */}
        <div
          className="flex gap-1 p-1 rounded-lg w-fit"
          style={{ background: "var(--background-alt)", border: "1px solid var(--border)" }}
        >
          {[
            { key: "recommended", label: "Recommended for you" },
            { key: "all",         label: "All specialists" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`
                px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-fast
                ${activeTab === tab.key
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted hover:text-foreground"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Recommended ────────────────────────────────────────── */}
        {activeTab === "recommended" && (
          <section className="space-y-5">
            {recData?.reason && (
              <div className="bg-primary-muted border border-primary-subtle/50 rounded-lg px-5 py-4">
                <p className="text-sm text-foreground leading-relaxed">{recData.reason}</p>
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
              <p className="text-sm text-subtle italic py-4">
                Chat more to receive personalised recommendations.
              </p>
            )}
          </section>
        )}

        {/* ── All specialists ────────────────────────────────────── */}
        {activeTab === "all" && (
          <section className="space-y-4">
            {allLoading ? (
              <SpecialistSkeleton count={5} />
            ) : Array.isArray(allSpecialists) && allSpecialists.length > 0 ? (
              allSpecialists.map((sp: any) => (
                <SpecialistCard key={sp.id} specialist={sp} />
              ))
            ) : (
              <p className="text-sm text-subtle italic py-4">No specialists found.</p>
            )}
          </section>
        )}

        {/* ── Educational resources ──────────────────────────────── */}
        <section>
          <h2 className="font-display text-2xl font-normal text-foreground mb-5 tracking-tight">
            Educational resources
          </h2>
          <div className="space-y-2">
            {RESOURCES.map((resource) => (
              <div
                key={resource.id}
                className="bg-surface border border-border rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedResource(expandedResource === resource.id ? null : resource.id)
                  }
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-hover transition-colors"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${resource.iconBg}`}>
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{resource.title}</p>
                    <p className="text-xs text-subtle mt-0.5">{resource.subtitle}</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-subtle shrink-0 transition-transform duration-fast ${expandedResource === resource.id ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedResource === resource.id && (
                  <div className="px-5 pb-5 pt-0 border-t border-border animate-fade-in">
                    <div className="pt-4 space-y-3">
                      {resource.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                            <p className="text-xs text-muted mt-0.5 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Crisis resources ───────────────────────────────────── */}
        <section
          className="rounded-lg px-6 py-5"
          style={{
            background: "var(--destructive-muted)",
            border:     "1px solid rgba(220, 38, 38, 0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-destructive" />
            <h3 className="text-sm font-semibold text-destructive">Crisis support</h3>
          </div>
          <p className="text-sm text-foreground mb-4 leading-relaxed">
            If you are experiencing a mental health emergency, please reach out immediately.
          </p>
          <div className="space-y-1.5">
            {CRISIS_RESOURCES.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className="font-semibold">{r.name}:</span>
                <span className="text-muted">{r.contact}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Specialist Card ─────────────────────────────────────────────────────── */

function SpecialistCard({ specialist: sp }: { specialist: any }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-md bg-primary-muted flex items-center justify-center text-primary font-medium text-sm shrink-0">
          {sp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">{sp.name}</h3>
            {sp.verified && <BadgeCheck size={14} className="text-accent shrink-0" />}
            <span className="text-[10px] font-medium text-primary bg-primary-muted px-1.5 py-0.5 rounded-sm">
              {sp.specialization}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">{sp.title}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-xs text-subtle">
            <span className="flex items-center gap-1">
              <Star size={11} className="text-warning fill-warning" />
              {sp.rating}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={11} />
              {sp.yearsOfExperience} yrs
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {sp.location}
            </span>
            <span className="flex items-center gap-1">
              {CONSULT_ICON[sp.consultationType]}
              {CONSULT_LABELS[sp.consultationType]}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {sp.availability}
            </span>
          </div>

          <p className="text-xs text-muted mt-2.5 leading-relaxed line-clamp-2">{sp.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sp.tags?.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-border text-subtle rounded-sm text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      {(sp.email || sp.phone) && (
        <div
          className="flex items-center gap-3 mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {sp.email && (
            <a
              href={`mailto:${sp.email}`}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <Mail size={12} />
              {sp.email}
            </a>
          )}
          {sp.phone && (
            <a
              href={`tel:${sp.phone}`}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <Phone size={12} />
              {sp.phone}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function SpecialistSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-surface border border-border rounded-lg p-5 h-32" />
      ))}
    </div>
  );
}

/* ── Static data ─────────────────────────────────────────────────────────── */

const CRISIS_RESOURCES = [
  { name: "Nigeria Suicide Prevention",     contact: "0800-100-0000" },
  { name: "Mentally Aware Nigeria (MANI)",  contact: "0800-MANI-000 / info@mani.org.ng" },
  { name: "International Association",      contact: "https://www.iasp.info/resources/Crisis_Centres/" },
];

const RESOURCES = [
  {
    id:       "anxiety",
    title:    "Understanding anxiety",
    subtitle: "Recognising symptoms and healthy coping strategies",
    iconBg:   "bg-primary-muted",
    icon:     <Brain size={16} className="text-primary" />,
    items: [
      { title: "What is anxiety?",              description: "Anxiety is a natural stress response. It becomes a concern when persistent and interfering with daily life." },
      { title: "Common symptoms",               description: "Racing thoughts, physical tension, avoidance behaviours, difficulty sleeping, and an exaggerated sense of dread." },
      { title: "Grounding techniques",          description: "The 5-4-3-2-1 method: name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste." },
      { title: "When to seek professional help",description: "If anxiety interferes with work, relationships, or daily routines for more than a few weeks, speak with a therapist." },
    ],
  },
  {
    id:       "sleep",
    title:    "Sleep & mental health",
    subtitle: "Why rest matters and how to improve it",
    iconBg:   "bg-[#ede9fe]",
    icon:     <Moon size={16} className="text-violet-600" />,
    items: [
      { title: "Sleep and mood",        description: "Poor sleep amplifies negative emotions and reduces your capacity to regulate stress." },
      { title: "Sleep hygiene basics",  description: "Consistent sleep/wake times, limiting screens before bed, and keeping your bedroom cool and dark." },
      { title: "Wind-down routine",     description: "A 30-minute pre-bed wind-down — reading, gentle stretching, journalling — helps signal to your brain that rest is coming." },
      { title: "When sleep is a sign",  description: "Persistent insomnia or hypersomnia can be symptoms of depression or anxiety. A healthcare provider can help." },
    ],
  },
  {
    id:       "mindfulness",
    title:    "Mindfulness & breathing",
    subtitle: "Simple practices to ground yourself in the present",
    iconBg:   "bg-[#f0fdf4]",
    icon:     <Wind size={16} className="text-emerald-600" />,
    items: [
      { title: "Box breathing",        description: "Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat for 2-4 minutes to activate the parasympathetic nervous system." },
      { title: "Body scan",            description: "Lie still and slowly bring attention to each part of your body from feet to head, releasing tension where you find it." },
      { title: "Mindful observation",  description: "Pick an object in your environment and spend two minutes observing it in detail — texture, colour, shape, weight." },
    ],
  },
  {
    id:       "relationships",
    title:    "Relationships & support",
    subtitle: "Building connection and knowing when to ask for help",
    iconBg:   "bg-[#fff1f2]",
    icon:     <Heart size={16} className="text-rose-500" />,
    items: [
      { title: "Social connection",    description: "Strong social bonds are one of the biggest predictors of long-term mental health and resilience." },
      { title: "How to ask for help",  description: "Be specific: 'I've been struggling lately. Could we talk this week?' is easier for others to respond to than a vague 'I'm not okay.'" },
      { title: "Setting boundaries",   description: "Healthy boundaries protect your energy. You can say no to people and yes to yourself." },
    ],
  },
];