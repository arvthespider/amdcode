"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  CalendarRange,
  CircleDot,
  Download,
  GraduationCap,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MoonStar,
  MousePointer2,
  Phone,
  Sparkles,
  Star,
  SunMedium,
  SwatchBook,
  WandSparkles,
  X,
  ChevronUp
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

type ThemeMode = "light" | "dark";

const featuredSlides = [
  {
    src: "/projects/mockup-letsgo-id-card.png",
    title: "ID Card LETS GO 2018",
    description: "Desain ID Card panitia bernuansa clean dan modern."
  },
  {
    src: "/projects/letsgo-banner.svg",
    title: "Sponsor Banner",
    description: "Banner informatif untuk memperkuat value acara dan sponsor."
  },
  {
    src: "/projects/letsgo-video.svg",
    title: "Video Preview",
    description: "Cuplikan cinematic untuk meningkatkan excitement audiens."
  }
];

const instagramItems = [
  "/projects/ig-01.svg",
  "/projects/ig-02.svg",
  "/projects/ig-03.svg",
  "/projects/ig-04.svg",
  "/projects/ig-05.svg",
  "/projects/ig-06.svg"
];

const packagingItems = [
  "/projects/packaging-box.svg",
  "/projects/packaging-label.svg",
  "/projects/packaging-bag.svg"
];

const explorations = [
  "/projects/explore-01.svg",
  "/projects/explore-02.svg",
  "/projects/explore-03.svg",
  "/projects/explore-04.svg",
  "/projects/explore-05.svg",
  "/projects/explore-06.svg"
];

const tools = [
  { label: "Adobe Illustrator", icon: SwatchBook },
  { label: "Canva", icon: Sparkles },
  { label: "CorelDRAW", icon: Layers3 },
  { label: "Microsoft Office", icon: BriefcaseBusiness }
];

const softSkills = [
  { label: "Time Management", icon: CalendarRange },
  { label: "Detail Oriented", icon: CircleDot },
  { label: "Creativity", icon: WandSparkles },
  { label: "Problem Solving", icon: MousePointer2 }
];

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(255,255,255,0.92)] backdrop-blur-xl dark:bg-[rgba(9,11,17,0.94)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="h-16 w-16 rounded-full border border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="text-center">
              <p className="font-display text-lg font-semibold tracking-[0.18em]">TIARA</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Crafting a polished first impression
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ThemeToggle() {
  const mounted = useMounted();
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("tiara-theme") as ThemeMode | null;
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (preferredDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("tiara-theme", nextTheme);
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="glass-card rounded-full px-3 py-2">
        <div className="h-5 w-5" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-card rounded-full p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SpotlightCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const [style, setStyle] = useState<CSSProperties>({});

  return (
    <div
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setStyle({
          ["--spotlight-x" as string]: `${event.clientX - rect.left}px`,
          ["--spotlight-y" as string]: `${event.clientY - rect.top}px`
        });
      }}
    >
      {children}
    </div>
  );
}

function ServiceTicker() {
  const items = [
    "Social Media Design",
    "Visual Branding",
    "Campaign Assets",
    "Content Design",
    "Layout Systems",
    "Creative Collaboration"
  ];

  const looped = [...items, ...items];

  return (
    <div className="ticker-mask glass-card rounded-full px-2 py-2">
      <div className="ticker-track flex items-center gap-3">
        {looped.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-900/60 dark:text-slate-300"
          >
            <Star size={12} className="text-slate-400" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingBadge({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className={`glass-strong absolute hidden rounded-[1.5rem] p-4 shadow-soft lg:block ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
      <p className="mt-2 font-display text-lg font-semibold">{title}</p>
    </motion.div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("Send a quick brief and let the conversation start.");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:azizahmutiaradewi.amd@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message pre-filled.");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-[2rem] p-6 shadow-soft md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</span>
          <input
            required
            name="name"
            placeholder="Your full name"
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
          <input
            required
            type="email"
            name="email"
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </label>
      </div>
      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell me about the role or project you want to discuss."
          className="w-full rounded-[1.5rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{status}</p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Send Message
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

function SectionHeading({
  kicker,
  title,
  description
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{description}</p>
    </div>
  );
}

export function PortfolioPage() {
  const mounted = useMounted();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 120, damping: 18, mass: 0.2 });
  const headerPadding = useTransform(smoothY, [0, 180], [16, 8]);
  const headerScale = useTransform(smoothY, [0, 220], [1, 0.985]);
  const headerOpacity = useTransform(smoothY, [0, 220], [0.92, 1]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % featuredSlides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  const yearText = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="relative overflow-x-hidden">
      <PageLoader />

      <div className="fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--background)] via-[color:rgba(246,247,251,0.84)] to-transparent dark:from-[var(--background)] dark:via-[color:rgba(8,11,18,0.84)]" />
        <motion.div
          style={mounted ? { paddingTop: headerPadding, scale: headerScale, opacity: headerOpacity } : undefined}
          className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8"
        >
          <motion.div
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card inline-flex items-center gap-3 rounded-full px-3 py-2.5 md:px-4 md:py-3"
          >
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <div>
              <p className="font-display text-sm font-semibold">Azizah Mutiara Dewi</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Graphic Design Portfolio
              </p>
            </div>
          </motion.div>
          <div className="flex items-center gap-3">
            <nav className="glass-card hidden items-center gap-5 rounded-full px-5 py-3 text-sm md:flex">
              <a href="#about" className="transition hover:text-slate-950 dark:hover:text-white">
                About
              </a>
              <a href="#projects" className="transition hover:text-slate-950 dark:hover:text-white">
                Projects
              </a>
              <a
                href="#experience"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Experience
              </a>
              <a href="#contact" className="transition hover:text-slate-950 dark:hover:text-white">
                Contact
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </motion.div>
      </div>

      <section className="hero-noise hero-fade relative isolate overflow-hidden px-4 pb-20 pt-28 md:px-8 md:pb-32 md:pt-36">
        <div className="absolute inset-x-0 top-28 -z-10 mx-auto h-72 max-w-6xl rounded-full bg-sky-100/45 blur-3xl dark:bg-sky-500/10" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute left-[6%] top-24 -z-10 h-44 w-44 rounded-full bg-sky-200/45 blur-3xl dark:bg-sky-400/10"
        />
        <motion.div
          animate={{ scale: [1.04, 1, 1.04], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute right-[8%] top-52 -z-10 h-56 w-56 rounded-full bg-slate-200/45 blur-3xl dark:bg-slate-500/10"
        />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* Outline / watermark text */}
            <div className="space-y-1">
              <p className="hero-outline opacity-60 font-display font-semibold uppercase leading-none tracking-[-0.08em]" style={{ fontSize: "clamp(1.8rem, 6vw, 5rem)" }}>
                Tiara
              </p>
              <p className="hero-outline -mt-1 opacity-45 font-display font-semibold uppercase leading-none tracking-[-0.08em]" style={{ fontSize: "clamp(1.1rem, 3.5vw, 3.2rem)" }}>
                Visual Portfolio
              </p>
            </div>

            {/* Availability badge */}
            <div className="glass-card inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs text-slate-600 dark:text-slate-300 md:text-sm">
              <Sparkles size={15} />
              Available for Graphic Design, Social Media Design, and Visual Content roles
            </div>

            {/* Main heading block */}
            <div className="space-y-5">
              <p className="section-kicker">Portfolio 2026</p>
              <h1 className="font-display font-semibold leading-[0.96] tracking-[-0.055em]" style={{ fontSize: "clamp(2rem, 7vw, 5.35rem)" }}>
                Azizah Mutiara Dewi
              </h1>
              <p className="max-w-2xl text-[0.98rem] leading-7 text-slate-600 dark:text-slate-300 md:text-[1.1rem] md:leading-8">
                Graphic Designer specializing in impactful social media, visual branding, and
                polished campaign communication that feels clear, modern, and ready to deliver.
              </p>
            </div>

            {/* Creative value card */}
            <div className="glass-card rounded-[1.7rem] p-4 md:rounded-[1.9rem] md:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Creative Value
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold leading-tight md:text-2xl">
                    Competent, visually sharp, and ready to contribute from day one.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:max-w-[18rem]">
                  <div className="mt-1 shrink-0 rounded-full bg-slate-950 p-2 text-white dark:bg-white dark:text-slate-950">
                    <WandSparkles size={16} />
                  </div>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Strong on social media layout, campaign assets, and collaborative visual execution.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-soft sm:w-auto dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                View Portfolio
                <ArrowDownRight size={16} />
              </a>
              <a
                href="/Azizah-Mutiara-Dewi-CV.rtf"
                download
                className="glass-card inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:w-auto"
              >
                Download CV
                <Download size={16} />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { value: "6+ Years", label: "Design experience since high school" },
                { value: "100M+", label: "Funds generated by featured campaign" },
                { value: "Cross-Team", label: "Collaboration with non-design stakeholders" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22 + index * 0.08, ease: "easeOut" }}
                >
                  <SpotlightCard className="glass-card rounded-[1.6rem] p-4 shadow-soft transition duration-300 hover:-translate-y-1 md:rounded-[1.75rem] md:p-5">
                    <p className="font-display text-2xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
            {/* Service ticker */}
            <Reveal delay={0.22} y={16}>
              <ServiceTicker />
            </Reveal>
          </motion.div>
        </div>
      </section>


      <section id="about" className="section-lift relative px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-32 max-w-6xl rounded-full bg-white/55 blur-3xl dark:bg-slate-900/30" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <SectionHeading
              kicker="About"
              title="Professional, adaptive, and built for fast-moving teams."
              description="A concise profile that immediately tells HR what Tiara brings to the table."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="glass-strong rounded-[1.7rem] p-6 shadow-soft md:rounded-[2rem] md:p-8">
                <p className="text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
                  Azizah Mutiara Dewi, or Tiara, is a Universitas Diponegoro graduate in Aquaculture
                  with a GPA of 3.64 who has been actively building design experience for more than
                  six years. Her strength lies in translating ideas into clean, persuasive visuals for
                  social media, branding, and campaign communication.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-strong rounded-[1.7rem] p-6 shadow-soft md:rounded-[2rem] md:p-8">
                <p className="text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
                  She is comfortable working within tight deadlines, handling multiple revision cycles,
                  and collaborating with both design and non-design teams. The result is a designer
                  who learns quickly, takes ownership seriously, and stays dependable from concept to
                  final delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="projects" className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal>
            <SectionHeading
              kicker="Projects"
              title="Selected work with strong visual presence and clear communication goals."
              description="The portfolio centers on a featured campaign case study, then expands into social media and branding explorations to show consistency, flexibility, and aesthetic range."
            />
          </Reveal>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="glass-strong rounded-[2rem] p-5 shadow-float md:rounded-[2.5rem] md:p-8">
              <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:pb-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <p className="section-kicker">Featured Case Study</p>
                  <h3 className="font-display text-[1.8rem] font-semibold leading-tight md:text-3xl">
                    LETS GO 2018 - Japan Cultural Visit Campaign
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    Designed posters, video assets, and banners to promote a school cultural
                    program, increase public interest, and make the sponsor proposition feel
                    credible and attractive.
                  </p>
                </div>
                <div className="self-start rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Role: Designer
                </div>
              </div>

              <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/85 dark:bg-slate-900/80">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featuredSlides[activeSlide].src}
                        initial={{ opacity: 0, y: 18, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -18, scale: 1.015 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <Image
                          src={featuredSlides[activeSlide].src}
                          alt={featuredSlides[activeSlide].title}
                          width={1200}
                          height={860}
                          className="h-auto w-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                      key={`progress-${activeSlide}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.4, ease: "linear" }}
                      className="h-full rounded-full bg-slate-950 dark:bg-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {featuredSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`rounded-full px-3.5 py-2 text-xs transition md:px-4 md:text-sm ${
                          activeSlide === index
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-900"
                            : "glass-card hover:-translate-y-0.5"
                        }`}
                      >
                        {slide.title}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {featuredSlides[activeSlide].description}
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Objective",
                      body: "Promote the school program to the public and make sponsor participation more compelling."
                    },
                    {
                      title: "Audience",
                      body: "General public and potential sponsors who needed a clear, engaging overview of the event."
                    },
                    {
                      title: "Process",
                      body: "Built informative visuals with a more attractive look and stronger storytelling so the campaign felt trustworthy and high value."
                    },
                    {
                      title: "Result",
                      body: "Secured around 4-5 sponsors and helped generate more than IDR 100 million in funds."
                    }
                  ].map((item) => (
                    <SpotlightCard key={item.title} className="glass-card rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>
                      <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                        {item.body}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
              </div>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.08}>
                <SpotlightCard className="glass-strong rounded-[1.8rem] p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 md:rounded-[2.2rem] md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="section-kicker">Project 2</p>
                    <h3 className="font-display text-[1.45rem] font-semibold md:text-2xl">
                      Dummy Social Media Design
                    </h3>
                  </div>
                  <Instagram className="text-slate-400" size={20} />
                </div>
                <p className="mb-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Instagram feed mockup with a focus on visual branding, consistency, and a
                  structured content rhythm.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {instagramItems.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                      onClick={() => setSelectedImage(item)}
                      className="cursor-zoom-in overflow-hidden rounded-[1.3rem] border border-[var(--line)]"
                    >
                      <Image
                        src={item}
                        alt={`Instagram feed design mockup ${index + 1}`}
                        width={500}
                        height={500}
                        className="h-auto w-full transition duration-500 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
                </SpotlightCard>
              </Reveal>

              <Reveal delay={0.14}>
                <SpotlightCard className="glass-strong rounded-[1.8rem] p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 md:rounded-[2.2rem] md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="section-kicker">Project 3</p>
                    <h3 className="font-display text-[1.45rem] font-semibold md:text-2xl">
                      Dummy Branding / Packaging
                    </h3>
                  </div>
                  <SwatchBook className="text-slate-400" size={20} />
                </div>
                <p className="mb-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Packaging concepts built to highlight brand identity, clarity, and premium shelf
                  presence.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {packagingItems.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -6, scale: 1.01 }}
                      onClick={() => setSelectedImage(item)}
                      className="cursor-zoom-in overflow-hidden rounded-[1.5rem] border border-[var(--line)]"
                    >
                      <Image
                        src={item}
                        alt={`Brand packaging mockup ${index + 1}`}
                        width={640}
                        height={520}
                        className="h-auto w-full transition duration-500 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
                </SpotlightCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal>
            <SectionHeading
              kicker="Design Explorations"
              title="A broader gallery to show style range and visual sensitivity."
              description="Curated snapshots of additional layout, branding, and composition exercises with light hover interactions."
            />
          </Reveal>
          <div className="project-grid">
            {explorations.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                onClick={() => setSelectedImage(item)}
                className="group glass-strong cursor-zoom-in overflow-hidden rounded-[2rem] shadow-soft"
              >
                <div className="overflow-hidden">
                  <Image
                    src={item}
                    alt={`Design exploration preview ${index + 1}`}
                    width={720}
                    height={840}
                    className="h-auto w-full transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal>
            <SectionHeading
              kicker="Experience"
              title="Hands-on design contributions in school and university organizations."
              description="Presented as modern timeline cards to keep the information polished and easy to scan."
            />
          </Reveal>
          <div className="relative grid gap-6 lg:grid-cols-2">
            <div className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-px bg-[var(--line)] lg:block" />
            {[
              {
                title: "SMAIT Granada",
                role: "PDD Division Member",
                duration: "Approx. 3 years",
                points: [
                  "Created cinematic videos for LETS GO activities.",
                  "Managed video documentation including behind-the-scenes and after movie assets.",
                  "Designed banners and promotional materials.",
                  "Worked in a small, agile team of two people."
                ]
              },
              {
                title: "BEM UNDIP",
                role: "PDD Division Member",
                duration: "1 year",
                points: [
                  "Designed Instagram content on a regular schedule of two posts per week.",
                  "Created promotional content for competition-related activities.",
                  "Contributed to sports talent screening event communication for FPIK.",
                  "Maintained consistency while collaborating with broader organizational needs."
                ]
              }
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass-strong spotlight-card relative rounded-[1.8rem] p-6 shadow-soft md:rounded-[2rem] md:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.duration}
                  </div>
                </div>
                <div className="space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal>
            <SectionHeading
              kicker="Skills"
              title="A practical toolkit supported by professional work habits."
              description="Tools and strengths are displayed in a clean icon-based grid to keep the section modern and highly scannable."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="glass-strong rounded-[1.8rem] p-5 shadow-soft md:rounded-[2.2rem] md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <SwatchBook size={18} className="text-slate-400" />
                <h3 className="font-display text-2xl font-semibold">Tools</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {tools.map(({ label, icon: Icon }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="glass-card spotlight-card rounded-[1.6rem] p-5"
                  >
                    <Icon size={22} className="text-slate-500 dark:text-slate-300" />
                    <p className="mt-4 font-medium">{label}</p>
                  </motion.div>
                ))}
              </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-strong rounded-[1.8rem] p-5 shadow-soft md:rounded-[2.2rem] md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <WandSparkles size={18} className="text-slate-400" />
                <h3 className="font-display text-2xl font-semibold">Core Skills</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {softSkills.map(({ label, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="glass-card spotlight-card rounded-[1.6rem] p-5"
                  >
                    <Icon size={22} className="text-slate-500 dark:text-slate-300" />
                    <p className="mt-4 font-medium">{label}</p>
                  </motion.div>
                ))}
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal>
            <SectionHeading
              kicker="Education"
              title="Simple academic background presented with clarity."
              description="A minimal section that complements the portfolio without competing with the main work samples."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                school: "Universitas Diponegoro",
                major: "Aquaculture",
                year: "2019",
                extra: "GPA 3.64"
              },
              {
                school: "SMAIT Granada",
                major: "Science",
                year: "Senior High School",
                extra: "Academic track: IPA"
              }
            ].map((item, index) => (
              <Reveal key={item.school} delay={index * 0.08}>
                <SpotlightCard className="glass-strong rounded-[1.8rem] p-6 shadow-soft transition duration-300 hover:-translate-y-1 md:rounded-[2rem] md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-2xl font-semibold">{item.school}</p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.major}</p>
                    </div>
                    <GraduationCap size={20} className="text-slate-400" />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {item.year}
                    </span>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {item.extra}
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="glass-strong grid gap-6 rounded-[2rem] p-5 shadow-float md:gap-8 md:rounded-[2.5rem] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="section-kicker">Contact</p>
                  <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    Let&apos;s Work Together
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    Open to professional opportunities in graphic design, social media design, and
                    visual content. If you are hiring for a creative role, this portfolio is ready to
                    move into the next conversation.
                  </p>
                </div>

                <div className="grid gap-4">
                  <SpotlightCard className="glass-card rounded-[1.6rem] transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <a href="mailto:azizahmutiaradewi.amd@gmail.com" className="flex items-center gap-4 p-5">
                      <Mail size={18} className="text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                        <p className="font-medium">azizahmutiaradewi.amd@gmail.com</p>
                      </div>
                    </a>
                  </SpotlightCard>
                  <SpotlightCard className="glass-card rounded-[1.6rem] transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <a href="tel:08123789014" className="flex items-center gap-4 p-5">
                      <Phone size={18} className="text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                        <p className="font-medium">08123789014</p>
                      </div>
                    </a>
                  </SpotlightCard>
                  <SpotlightCard className="glass-card rounded-[1.6rem] transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <a
                      href="https://www.linkedin.com/in/azizah-mutiara-dewi-389b102ba/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 p-5"
                    >
                      <Linkedin size={18} className="text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</p>
                        <p className="font-medium">Azizah Mutiara Dewi</p>
                      </div>
                    </a>
                  </SpotlightCard>
                </div>

                <a
                  href="/Azizah-Mutiara-Dewi-CV.rtf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-soft dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Download CV
                  <Download size={16} />
                </a>
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-4 pb-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>{yearText} Azizah Mutiara Dewi. Designed for a strong first impression.</p>
          <div className="flex items-center gap-3">
            <a href="#about" className="transition hover:text-slate-950 dark:hover:text-white">
              About
            </a>
            <span>/</span>
            <a href="#projects" className="transition hover:text-slate-950 dark:hover:text-white">
              Projects
            </a>
            <span>/</span>
            <a href="#contact" className="transition hover:text-slate-950 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-full max-w-full"
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 transition hover:text-white"
              >
                <X size={28} />
              </button>
              <Image
                src={selectedImage}
                alt="Enlarged preview"
                width={1600}
                height={1200}
                className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </main>
  );
}

function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setVisible(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-slate-950 p-3.5 text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
