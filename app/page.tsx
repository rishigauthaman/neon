"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Text,
  Torus,
  useTexture
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronDown,
  Images,
  Mail,
  Mic2,
  Send,
  Sparkles,
  Star,
  Trophy,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Group, Mesh } from "three";

const Particles = dynamic(
  () => import("@tsparticles/react").then((mod) => mod.Particles),
  { ssr: false }
);

const portraits = [
  { src: "/images/isha-crown-blue.jpeg", alt: "Dr. Isha Farha Quraishy wearing a crown and Miss UAE sash" },
  { src: "/images/isha-stage-wave.jpeg", alt: "Dr. Isha Farha Quraishy waving on stage in a crown" },
  { src: "/images/isha-green-gown.jpeg", alt: "Dr. Isha Farha Quraishy at Dubai Model Showcase" },
  { src: "/images/isha-stage-profile.jpeg", alt: "Dr. Isha Farha Quraishy in profile on a dark stage" },
  { src: "/images/isha-forbes-cover.png", alt: "Forbes New York cover featuring Dr. Isha Farha Quraishy" }
];

const titles = [
  "Miss UAE",
  "Forbes Featured",
  "Global Tech Celebrity",
  "International Public Speaker",
  "Humanitarian",
  "Entrepreneur"
];

const logos = [
  ["Forbes", "Featured cover story energy with New York editorial prestige."],
  ["Khaleej Times", "Regional media presence across UAE business and culture."],
  ["Arab News", "A voice carried through international public conversation."],
  ["Gulf News", "Gulf visibility for leadership, style, and impact."],
  ["ZEE TV", "Broadcast recognition for a cross-cultural public figure."],
  ["UAE Times", "Home-region spotlight on ambition and service."],
  ["Mrs. United Nations", "Crowned representation on a global pageant stage."]
];

const milestones = [
  "Crowned Mrs. United Nations",
  "Miss UAE recognition",
  "Forbes New York feature",
  "Global public speaking tours",
  "Humanitarian initiatives",
  "Entrepreneurial ventures"
];

const achievements = [
  {
    title: "Global Tech Celebrity",
    detail:
      "A public persona shaped around technology, leadership visibility, and future-facing cultural influence across global audiences."
  },
  {
    title: "International Public Speaker",
    detail:
      "Stage presence designed for leadership forums, luxury brand audiences, entrepreneurship events, and women-in-impact conversations."
  },
  {
    title: "Humanitarian Ambassador",
    detail:
      "A service-centered chapter focused on visibility with purpose, advocacy, and community-first public engagement."
  },
  {
    title: "Forbes Featured Personality",
    detail:
      "A media milestone translated into a floating editorial world with cinematic page motion and gold-lit visual hierarchy."
  },
  {
    title: "Luxury Brand Collaborator",
    detail:
      "Premium positioning for partnerships that need elegance, credibility, and memorable on-stage or editorial storytelling."
  },
  {
    title: "Women Leadership Advocate",
    detail:
      "A polished narrative of ambition, representation, and the courage to occupy global rooms with grace."
  }
];

const askKnowledge = [
  {
    triggers: ["known", "who", "about", "intro", "profile"],
    answer:
      "Amb. Dr. Isha Farha Quraishy is presented as Miss UAE, Forbes featured, a global tech celebrity, entrepreneur, humanitarian, and international public speaker."
  },
  {
    triggers: ["forbes", "magazine", "media", "feature"],
    answer:
      "Her Forbes moment is treated as a signature editorial milestone, using the uploaded cover as a dimensional magazine artifact inside the experience."
  },
  {
    triggers: ["speaking", "book", "engagement", "event", "stage"],
    answer:
      "For speaking invitations, share the event theme, audience size, location, date range, and desired keynote or panel format through the contact section."
  },
  {
    triggers: ["humanitarian", "impact", "charity", "service"],
    answer:
      "The site frames her humanitarian work as a central part of the public story: recognition translated into service, advocacy, and meaningful visibility."
  },
  {
    triggers: ["crown", "queen", "miss uae", "pageant"],
    answer:
      "The crown sequence symbolizes her Miss UAE and Mrs. United Nations recognition, then dissolves into her name as the cinematic identity reveal."
  }
];

function CrownScene({ progress }: { progress: number }) {
  const crownRef = useRef<Group>(null);
  const nameRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock, camera }) => {
    const p = progress;
    camera.position.z = 8 - p * 4.2;
    camera.position.y = 0.4 + Math.sin(p * Math.PI) * 0.8;
    camera.rotation.z = (p - 0.5) * 0.08;
    if (crownRef.current) {
      crownRef.current.rotation.y = clock.elapsedTime * 0.2 + p * 1.6;
      crownRef.current.position.z = -p * 2.4;
      crownRef.current.scale.setScalar(Math.max(0.45, 1 - p * 0.52));
    }
    if (nameRef.current) {
      nameRef.current.position.z = -1.6 + p * 2;
      nameRef.current.scale.setScalar(0.45 + p * 0.62);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = clock.elapsedTime * 0.32;
      ringRef.current.rotation.y = clock.elapsedTime * 0.45;
    }
  });

  const crownPoints = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const x = (i - 4) * 0.55;
        const peak = i % 2 === 0 ? 1.4 : 0.52;
        return { x, peak };
      }),
    []
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 8]} fov={45} />
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 4, 4]} intensity={38} color="#ffd66b" />
      <pointLight position={[-4, -1, 2]} intensity={14} color="#5eead4" />
      <group ref={crownRef} position={[0, -0.1, 0]}>
        <Torus args={[1.9, 0.045, 16, 160]} position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#d9aa47" emissive="#6f4d16" metalness={1} roughness={0.18} />
        </Torus>
        {crownPoints.map((point, index) => (
          <Float key={point.x} speed={1.3 + index * 0.08} floatIntensity={0.22}>
            <mesh position={[point.x, point.peak - 0.55, 0]} rotation={[0, 0, point.x * -0.18]}>
              <coneGeometry args={[0.13, 2.55 + point.peak * 0.5, 5]} />
              <meshStandardMaterial color="#f7d97a" emissive="#a66f12" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[point.x, point.peak + 0.82, 0]}>
              <sphereGeometry args={[0.11, 24, 24]} />
              <meshStandardMaterial color="#fff0b4" emissive="#d9aa47" emissiveIntensity={1.5} />
            </mesh>
          </Float>
        ))}
        <mesh ref={ringRef} position={[0, 0.05, -0.25]}>
          <torusKnotGeometry args={[1.38, 0.012, 180, 12]} />
          <meshStandardMaterial color="#fff6c6" emissive="#d9aa47" emissiveIntensity={1.1} />
        </mesh>
      </group>
      <group ref={nameRef} position={[0, -0.15, -1.2]}>
        <Text
          fontSize={0.42}
          maxWidth={5.5}
          textAlign="center"
          color="#fff3c8"
          anchorX="center"
          anchorY="middle"
        >
          AMB. DR. ISHA FARHA QURAISHY
        </Text>
      </group>
      <EffectComposer>
        <Bloom intensity={1.35} luminanceThreshold={0.28} mipmapBlur />
        <DepthOfField focusDistance={0.02} focalLength={0.035} bokehScale={3} />
        <Vignette eskil={false} offset={0.22} darkness={0.75} />
      </EffectComposer>
      <Environment preset="night" />
    </>
  );
}

function PhotoPlane({ src, index, active }: { src: string; index: number; active: number }) {
  const tex = useTexture(src);
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const distance = index - active;
    ref.current.position.x = distance * 2.3;
    ref.current.position.z = -Math.abs(distance) * 1.1;
    ref.current.rotation.y = distance * -0.28 + Math.sin(clock.elapsedTime + index) * 0.025;
    ref.current.scale.setScalar(index === Math.round(active) ? 1.05 : 0.76);
  });

  return (
    <mesh ref={ref} position={[index * 2.3, 0, 0]}>
      <planeGeometry args={[1.65, 2.18]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

function GalleryScene({ progress }: { progress: number }) {
  const active = progress * (portraits.length - 1);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4.4]} fov={42} />
      <ambientLight intensity={1.2} />
      {portraits.map((portrait, index) => (
        <PhotoPlane key={portrait.src} src={portrait.src} index={index} active={active} />
      ))}
      <mesh position={[0, -1.5, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 2]} />
        <MeshTransmissionMaterial color="#d9aa47" thickness={0.22} roughness={0.16} transmission={0.62} />
      </mesh>
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.4} mipmapBlur />
      </EffectComposer>
    </>
  );
}

function CinematicCanvas({ crownProgress, galleryProgress }: { crownProgress: number; galleryProgress: number }) {
  return (
    <Canvas className="luxury-canvas h-full w-full" dpr={[1, 1.65]} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <Suspense fallback={null}>
        {crownProgress < 0.46 ? (
          <CrownScene progress={Math.min(crownProgress / 0.46, 1)} />
        ) : (
          <GalleryScene progress={galleryProgress} />
        )}
      </Suspense>
    </Canvas>
  );
}

function AskIshha() {
  const [answer, setAnswer] = useState("Ask about Dr. Isha's crown, media, speaking, humanitarian work, or entrepreneurship.");
  const [questionText, setQuestionText] = useState("");
  const questions = [
    "What is Dr. Isha known for?",
    "Tell me about the Forbes moment.",
    "Can I book a speaking engagement?"
  ];
  const answerQuestion = (question: string) => {
    const normalized = question.toLowerCase();
    const match = askKnowledge.find((entry) => entry.triggers.some((trigger) => normalized.includes(trigger)));
    setAnswer(
      match?.answer ??
        "I can only answer questions about Amb. Dr. Isha Farha Quraishy, her media presence, speaking work, humanitarian impact, entrepreneurship, and crown journey."
    );
  };

  const submitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    answerQuestion(questionText);
  };

  return (
    <div className="glass mx-auto grid max-w-5xl gap-6 rounded-[2rem] p-5 sm:p-8 md:grid-cols-[0.8fr_1.2fr]">
      <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-3xl bg-white/5">
        <div className="absolute h-44 w-44 rounded-full border border-gold/40 bg-gold/10 blur-2xl" />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
          className="relative grid h-36 w-36 place-items-center rounded-full border border-gold/60 bg-[radial-gradient(circle,#fff7d1_0%,#d9aa47_38%,rgba(217,170,71,.08)_72%)] shadow-aureate"
        >
          <Bot className="h-14 w-14 text-navy" aria-hidden="true" />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="mb-2 text-sm uppercase tracking-[0.32em] text-gold">Ask Ishha</p>
        <h2 className="font-display text-4xl text-white sm:text-5xl">A holographic guide to her story</h2>
        <p className="mt-4 min-h-20 text-base leading-7 text-white/76">{answer}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {questions.map((question) => (
            <button
              key={question}
              onClick={() => answerQuestion(question)}
              className="min-h-11 cursor-pointer rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/86 transition hover:border-gold hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              {question}
            </button>
          ))}
        </div>
        <form onSubmit={submitQuestion} className="mt-5 flex min-h-12 gap-2 rounded-full border border-white/15 bg-navy/55 p-1.5">
          <label htmlFor="ask-ishha" className="sr-only">
            Ask Ishha a question about Dr. Isha
          </label>
          <input
            id="ask-ishha"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/45"
            placeholder="Ask about her journey..."
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-gold text-navy transition hover:bg-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Send question"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });
  const [progress, setProgress] = useState(0);
  const heroOpacity = useTransform(smooth, [0.11, 0.18, 0.32], [0, 1, 0]);
  const timelineOpacity = useTransform(smooth, [0.31, 0.4, 0.53], [0, 1, 0]);
  const galaxyOpacity = useTransform(smooth, [0.49, 0.58, 0.7], [0, 1, 0]);
  const forbesOpacity = useTransform(smooth, [0.64, 0.72, 0.83], [0, 1, 0]);
  const contactOpacity = useTransform(smooth, [0.83, 0.92], [0, 1]);
  const [selectedAchievement, setSelectedAchievement] = useState<(typeof achievements)[number] | null>(null);
  const [selectedPortrait, setSelectedPortrait] = useState<(typeof portraits)[number] | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => smooth.on("change", setProgress), [smooth]);

  const galleryProgress = Math.min(Math.max((progress - 0.46) / 0.34, 0), 1);
  const scrollToProgress = (target: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * target, behavior: "smooth" });
  };

  return (
    <main ref={containerRef} className="film-grain relative scroll-length text-white">
      <div className="cinematic-layer">
        <CinematicCanvas crownProgress={progress} galleryProgress={galleryProgress} />
      </div>
      <Particles
        id="gold-particles"
        className="particle-layer"
        options={{
          fpsLimit: 60,
          background: { color: "transparent" },
          particles: {
            number: { value: 90, density: { enable: true, width: 1200, height: 900 } },
            color: { value: ["#d9aa47", "#fff3c8", "#5eead4"] },
            opacity: { value: { min: 0.2, max: 0.8 } },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.45, direction: "none", outModes: "out" },
            links: { enable: true, color: "#d9aa47", opacity: 0.12, distance: 130 }
          },
          detectRetina: true
        }}
      />
      <div className="vignette-layer bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,8,23,.22)_58%,rgba(2,8,23,.82)_100%)]" />

      <section className="intro-layer">
        <motion.div style={{ opacity: useTransform(smooth, [0, 0.08, 0.14], [1, 1, 0]) }}>
          <p className="text-sm uppercase tracking-[0.42em] text-gold">Every Queen Begins With A Crown.</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-none text-white sm:text-7xl lg:text-8xl">
            AMB. DR. ISHA FARHA QURAISHY
          </h1>
          <ChevronDown className="mx-auto mt-10 h-8 w-8 animate-bounce text-gold" aria-hidden="true" />
        </motion.div>
      </section>

      <motion.section
        style={{ opacity: heroOpacity }}
        className="story-layer hero-layer px-5 pb-10 pt-24 sm:px-8 lg:px-14"
      >
        <div className="grid w-full items-end gap-7 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.36em] text-gold">Cinematic Legacy</p>
            <h2 className="max-w-4xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Crowned presence. Global influence. Human impact.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {titles.map((title) => (
                <span key={title} className="glass rounded-full px-4 py-2 text-sm text-white/86">
                  {title}
                </span>
              ))}
            </div>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollToProgress(0.4)}><Sparkles className="h-4 w-4" /> Explore Journey</Button>
              <Button variant="glass" onClick={() => scrollToProgress(0.86)}><Bot className="h-4 w-4" /> Ask Ishha</Button>
              <Button variant="glass" onClick={() => scrollToProgress(0.94)}><CalendarDays className="h-4 w-4" /> Book Speaking Engagement</Button>
            </div>
          </div>
          <div className="glass pointer-events-auto overflow-hidden rounded-[2rem] p-3">
            <div className="logo-river flex w-max gap-3 py-2">
              {[...logos, ...logos].map(([name, info], index) => (
                <div
                  key={`${name}-${index}`}
                  tabIndex={0}
                  className="group relative w-52 shrink-0 rounded-2xl border border-white/10 bg-navy/65 p-4 transition duration-300 hover:-translate-y-2 hover:rotate-2 hover:border-gold hover:shadow-aureate focus:outline-none focus-visible:border-gold"
                >
                  <p className="font-display text-3xl text-white group-hover:text-champagne">{name}</p>
                  <p className="mt-3 text-xs leading-5 text-white/58 opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">{info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section style={{ opacity: timelineOpacity }} className="story-layer center-layer px-5">
        <div className="w-full max-w-6xl">
          <p className="text-center text-sm uppercase tracking-[0.36em] text-gold">Journey Timeline</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-5xl sm:text-6xl">Milestones connected by light</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone}
                initial={false}
                animate={{ y: Math.sin(progress * 14 + index) * 10 }}
                className="glass rounded-3xl p-5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy">
                  <Star className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl">{milestone}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  A cinematic waypoint in a story of visibility, ambition, and service.
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section style={{ opacity: galaxyOpacity }} className="story-layer center-layer px-5">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="lg:w-1/3">
              <p className="text-sm uppercase tracking-[0.36em] text-gold">Achievement Galaxy</p>
              <h2 className="mt-3 font-display text-5xl sm:text-6xl">Hover a star, open a chapter.</h2>
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {achievements.map((achievement, index) => (
                <button
                  key={achievement.title}
                  onClick={() => setSelectedAchievement(achievement)}
                  className="glass group min-h-36 cursor-pointer rounded-3xl p-5 text-left transition hover:-translate-y-2 hover:border-gold hover:shadow-aureate focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <Trophy className="mb-5 h-7 w-7 text-gold" aria-hidden="true" />
                  <span className="font-display text-3xl text-white">{achievement.title}</span>
                  <span className="mt-3 block text-sm leading-6 text-white/0 transition group-hover:text-white/72">
                    {achievement.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section style={{ opacity: forbesOpacity }} className="story-layer center-layer px-5">
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.8fr_1.1fr]">
          <motion.div
            animate={{ rotateY: [-9, 8, -9], y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass mx-auto w-full max-w-sm rounded-[2rem] p-3"
          >
            <Image
              src="/images/isha-forbes-cover.png"
              alt="Forbes New York style cover featuring Dr. Isha Farha Quraishy"
              width={900}
              height={1125}
              className="aspect-[4/5] rounded-[1.35rem] object-cover"
              priority
            />
          </motion.div>
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-gold">Forbes Experience</p>
            <h2 className="mt-3 font-display text-5xl sm:text-7xl">A floating magazine moment with gold page turns.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              The editorial cover becomes a dimensional artifact: suspended, luminous, and surrounded by liquid-gold ribbons that signal the next media chapter.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section style={{ opacity: contactOpacity }} className="story-layer contact-layer px-5 py-20">
        <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-10">
          <AskIshha />
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="stage-lights glass rounded-3xl p-6">
              <Mic2 className="mb-5 h-7 w-7 text-gold" aria-hidden="true" />
              <h3 className="font-display text-3xl">Public Speaking</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">Stage-inspired spotlights, executive presence, and international audience energy for keynotes, panels, awards nights, and leadership summits.</p>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.16em] text-white/62">
                <span className="rounded-full border border-white/10 py-2">Keynotes</span>
                <span className="rounded-full border border-white/10 py-2">Panels</span>
                <span className="rounded-full border border-white/10 py-2">Media</span>
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-gold">Contact</p>
              <h2 className="mt-2 font-display text-5xl">Invite Amb. Dr. Isha Farha Quraishy</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">
                For speaking, media, partnerships, and humanitarian collaborations, prepare a concise brief with location, date, audience, format, and desired outcome.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button><Mail className="h-4 w-4" /> Start a Conversation</Button>
                <Button variant="glass"><ArrowRight className="h-4 w-4" /> Media & Partnerships</Button>
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-5">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold">Media Gallery</p>
                <h2 className="font-display text-4xl text-white">Floating frames, full-screen reveals</h2>
              </div>
              <Images className="h-7 w-7 text-gold" aria-hidden="true" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {portraits.map((portrait, index) => (
                <button
                  key={portrait.src}
                  onClick={() => setSelectedPortrait(portrait)}
                  className="gallery-card group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  aria-label={`Open ${portrait.alt}`}
                >
                  <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition duration-500 group-hover:scale-110" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/50 to-transparent p-4 text-xs uppercase tracking-[0.16em] text-champagne">
                    Frame {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {selectedAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-navy/86 px-5 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-title"
        >
          <div className="liquid-gold glass relative max-w-3xl overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Close achievement detail"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-sm uppercase tracking-[0.36em] text-gold">Achievement Galaxy</p>
            <h2 id="achievement-title" className="mt-4 max-w-2xl font-display text-5xl leading-none text-white sm:text-7xl">
              {selectedAchievement.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">{selectedAchievement.detail}</p>
          </div>
        </motion.div>
      )}

      {selectedPortrait && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-5 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded media gallery image"
        >
          <button
            onClick={() => setSelectedPortrait(null)}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-label="Close media image"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="relative h-[82vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-gold/30 shadow-aureate">
            <Image src={selectedPortrait.src} alt={selectedPortrait.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </motion.div>
      )}
    </main>
  );
}
