"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeDarkBg = dynamic(
  () => import("./marketing/three-scene").then((m) => ({ default: m.ThreeDarkBg })),
  { ssr: false }
);

const ACCENT = "#C4936A";

const SERVICES = [
  {
    title: "Hair Colouring & Highlights",
    desc: "From full colour to balayage, highlights and toning — transformations that turn heads in Chatham and beyond.",
    photo: "/photo-blonde-transform.webp",
    alt: "Hair colour transformation at A Cut Above Chatham",
  },
  {
    title: "Bridal & Occasion Hair",
    desc: "Stunning updos, braids and bridal styling for your most important days. Trusted by brides across Medway.",
    photo: "/photo-updo.webp",
    alt: "Bridal updo hairstyling at A Cut Above Medway",
  },
  {
    title: "Cuts & Styling",
    desc: "Precision cuts for women, curly hair specialists, perms, keratin treatments and blowouts — all in Chatham.",
    photo: "/photo-silver-bob.webp",
    alt: "Women's haircut at A Cut Above hair salon Chatham",
  },
  {
    title: "Barber & Men's Grooming",
    desc: "Sharp fades, tapers, beard trims and men's cuts. Medway's go-to barber for clean, confident looks.",
    photo: "/photo-mens-fade.webp",
    alt: "Men's fade haircut barber Chatham Medway",
  },
];

const AESTHETICS = [
  {
    title: "Lip Fillers",
    desc: "Natural-looking lip enhancement by BA Aesthetics by Dentist — precision and safety you can trust.",
    photo: "/photo-lips.webp",
    alt: "Lip fillers before and after BA Aesthetics Chatham",
  },
  {
    title: "Non-Surgical Rhinoplasty",
    desc: "Refine your nose profile without surgery. Expert filler technique by a qualified dental professional.",
    photo: "/photo-nose.webp",
    alt: "Non-surgical rhinoplasty BA Aesthetics by Dentist Chatham",
  },
  {
    title: "Hair Loss Treatment",
    desc: "Advanced scalp and hair restoration treatments. Visible results backed by clinical expertise.",
    photo: "/photo-hair-loss.webp",
    alt: "Hair loss treatment before and after BA Aesthetics Chatham",
  },
];

const ALL_SERVICES = [
  "Body Waxing",
  "Bridal Hair",
  "Curly Hair",
  "Hair Colouring",
  "Hair Extensions",
  "Hair Highlighting",
  "Hairstyling",
  "Perms",
  "Child Hair Cut",
  "Eyebrow Threading & Tint",
  "Eyebrow Waxing",
  "Eyelash Extensions",
  "Hair Up",
  "Balayage & Highlights",
  "Keratin, Botox & Straightener",
  "Men's Hair Cut & Beard",
];

const MARQUEE_ITEMS = [
  "Hair Colouring",
  "Balayage",
  "Bridal Hair",
  "Barber",
  "Lip Fillers",
  "Botox",
  "Keratin",
  "Hair Extensions",
  "Eyelash Extensions",
  "Eyebrow Threading",
];

const FAQ_ITEMS = [
  {
    q: "Do you offer a free consultation?",
    a: "Yes — we always recommend a free consultation before colour services or aesthetic treatments so we can understand exactly what you're looking for.",
  },
  {
    q: "Where are you located?",
    a: "We're at 20 Shirley Ave, Chatham, ME5 9UR — easy to find with free street parking nearby.",
  },
  {
    q: "How do I book an appointment?",
    a: "Call or WhatsApp us on 07450 987978. We'll confirm your slot and send a reminder.",
  },
  {
    q: "Are BA Aesthetics treatments safe?",
    a: "All aesthetic treatments are performed by a qualified dental professional with advanced medical training, ensuring the highest safety standards.",
  },
  {
    q: "Do you do children's haircuts?",
    a: "Absolutely — we offer children's haircuts in a relaxed, friendly environment.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal-left, .reveal-right, .reveal-up");
    if (!els.length) return;
    els.forEach((el) => {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
    });
    const triggers = Array.from(els).map((el) => {
      return ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          el.classList.add("revealed");
        },
      });
    });
    return () => {
      triggers.forEach((t) => t.kill());
      els.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
      });
    };
  }, []);
}

function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const triggers = Array.from(counters).map((el) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const obj = { val: 0 };
      return ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate() {
              el.textContent = Math.floor(obj.val).toLocaleString();
            },
          });
        },
      });
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);
}

export default function ClientPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useReveal();
  useCounters();

  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;
    const w = track.scrollWidth / 2;
    const anim = gsap.to(track, {
      x: -w,
      duration: w / 40,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % w) },
    });
    return () => { anim.kill(); };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(255,250,247,0.92)",
          borderBottom: "1px solid rgba(196,147,106,0.15)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                A Cut Above
              </span>
              <span style={{ fontSize: "0.65rem", color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                Unisex Salon · BA Aesthetics
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {["Services", "Gallery", "Aesthetics", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  textDecoration: "none",
                  color: "#1a1a1a",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = ACCENT)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#1a1a1a")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop phone + CTA */}
          <div className="nav-desktop-phone" style={{ gap: 16 }}>
            <a
              href="tel:07450987978"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: ACCENT,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                minHeight: 44,
              }}
            >
              <span>📞</span> 07450 987978
            </a>
            <a href="#contact" className="btn-accent" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>
              Book Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="hamburger-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              minHeight: 44,
              minWidth: 44,
            }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700 }}>A Cut Above</span>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", minHeight: 44, minWidth: 44 }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>
        {["Services", "Gallery", "Aesthetics", "About", "Contact"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              padding: "16px 0",
              fontSize: "1.4rem",
              fontFamily: "var(--font-playfair)",
              color: "#1a1a1a",
              textDecoration: "none",
              borderBottom: "1px solid #f0e8e0",
            }}
          >
            {link}
          </a>
        ))}
        <div style={{ marginTop: 32 }}>
          <a href="tel:07450987978" className="btn-accent" style={{ width: "100%", marginBottom: 12 }}>
            📞 07450 987978
          </a>
          <a href="#contact" className="btn-outline" style={{ width: "100%" }} onClick={() => setMobileOpen(false)}>
            Book an Appointment
          </a>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        id="home"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "95vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 68,
        }}
      >
        {/* Full-bleed background photo */}
        <Image
          src="/photo-hero-bg.jpg"
          alt="Beautiful hair styling at A Cut Above salon Chatham Medway"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          sizes="100vw"
          priority
        />

        {/* Gradient overlays for readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.55) 55%, rgba(10,8,6,0.25) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.6) 0%, transparent 55%)",
        }} />

        {/* Scissors accent — safe on dark photo */}
        <ThreeDarkBg accent={ACCENT} count={300} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>

            <div className="hero-eyebrow">
              <span
                className="float-3d"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(196,147,106,0.18)",
                  border: "1px solid rgba(196,147,106,0.45)",
                  borderRadius: 50,
                  padding: "6px 16px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: ACCENT,
                }}
              >
                ✦ Chatham · Medway · Walk-ins Welcome
              </span>
            </div>

            <h1
              className="hero-h1"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginTop: 20,
                color: "#fff",
              }}
            >
              Hair Salon &amp; <br />
              <span className="shimmer-text">Aesthetics Clinic</span>
              <br />
              <span style={{ color: "#fff" }}>in Chatham</span>
            </h1>

            <p
              className="hero-sub"
              style={{
                marginTop: 20,
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Expert hair colouring, balayage, bridal styling &amp; barber services — plus BA Aesthetics by Dentist for lip fillers, botox &amp; more. All under one roof in Medway.
            </p>

            <div
              className="hero-cta"
              style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}
            >
              <a href="#contact" className="btn-accent">Book an Appointment</a>
              <a
                href="#services"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.95rem",
                  padding: "13px 28px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.5)",
                  cursor: "pointer", minHeight: 44, textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                Our Services
              </a>
            </div>

            <div className="hero-stats stats-grid" style={{ marginTop: 48, maxWidth: 400 }}>
              {[
                { val: 3000, suffix: "+", label: "Happy Customers" },
                { val: 10, suffix: "+", label: "Years Experience" },
                { val: 16, suffix: "", label: "Services Offered" },
              ].map(({ val, suffix, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      fontWeight: 700,
                      color: ACCENT,
                      lineHeight: 1,
                    }}
                  >
                    <span data-count={val}>0</span>
                    {suffix}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: 4, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div
        style={{
          background: ACCENT,
          padding: "14px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div ref={marqueeRef} style={{ display: "inline-flex", gap: 0 }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0 32px",
              }}
            >
              ✦ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section id="services" style={{ padding: "clamp(64px,8vw,96px) 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal-up">
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-h2">Hair Salon Services in Chatham</h2>
            <p style={{ color: "#6b7280", marginTop: 12, maxWidth: 520, margin: "12px auto 0", fontSize: "1rem" }}>
              From everyday cuts to complete colour transformations — expert services for the whole family.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`tilt-card ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#fffaf7",
                  border: "1px solid rgba(196,147,106,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <Image
                    src={s.photo}
                    alt={s.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                    }}
                  />
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.65 }}>{s.desc}</p>
                  <a
                    href="#contact"
                    style={{
                      display: "inline-block",
                      marginTop: 16,
                      color: ACCENT,
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Book now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Full service list */}
          <div
            className="reveal-up"
            style={{
              marginTop: 56,
              background: "var(--bg)",
              borderRadius: 20,
              padding: "40px 40px",
              border: "1px solid rgba(196,147,106,0.15)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: 24,
                color: "#1a1a1a",
              }}
            >
              Full Service Menu
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px 24px",
              }}
            >
              {ALL_SERVICES.map((svc) => (
                <div
                  key={svc}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.9rem",
                    color: "#374151",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(196,147,106,0.1)",
                  }}
                >
                  <span style={{ color: ACCENT, fontWeight: 700, fontSize: "0.7rem" }}>✦</span>
                  {svc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────── */}
      <section
        id="gallery"
        style={{ padding: "clamp(64px,8vw,96px) 24px", background: "#111", position: "relative", overflow: "hidden" }}
      >
        <ThreeDarkBg accent={ACCENT} count={1000} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal-up">
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>
              Our Work
            </span>
            <h2 className="section-h2-light">Before &amp; After Transformations</h2>
          </div>
          <div
            className="gallery-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "280px 280px",
              gap: 12,
            }}
          >
            {/* Large left spanning 2 rows */}
            <div
              className="reveal-left"
              style={{ gridRow: "1 / 3", position: "relative", borderRadius: 16, overflow: "hidden" }}
            >
              <Image
                src="/photo-balayage.webp"
                alt="Balayage before and after A Cut Above hair salon Chatham"
                fill
                style={{ objectFit: "cover" }}
                sizes="33vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 16, left: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Balayage Transformation</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>Chatham, Medway</div>
              </div>
            </div>
            {/* 4 smaller */}
            {[
              { src: "/photo-platinum-highlights.jpg", label: "Platinum Highlights", alt: "Platinum highlights hair salon Chatham Medway" },
              { src: "/photo-blonde-waves.jpg", label: "Blonde Waves", alt: "Blonde wavy styling A Cut Above Chatham" },
              { src: "/photo-perm-curl.jpg", label: "Perm & Curl", alt: "Curly perm barber Chatham Medway" },
              { src: "/photo-extensions.jpg", label: "Hair Extensions", alt: "Hair extensions before and after Chatham" },
            ].map((item) => (
              <div
                key={item.label}
                className="reveal-up"
                style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width:768px) 100vw, 22vw"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Second row of gallery */}
          <div className="four-col-grid" style={{ marginTop: 12 }}>
            {[
              { src: "/photo-ice-blonde-bob.jpg", label: "Ice Blonde Bob", alt: "Ice blonde bob haircut Medway" },
              { src: "/photo-silver-bob2.jpg", label: "Silver Bob", alt: "Silver bob hair salon Chatham" },
              { src: "/photo-updo.webp", label: "Bridal Updo", alt: "Bridal updo Chatham Medway" },
              { src: "/photo-perm-boy.jpg", label: "Boys Perm", alt: "Boys perm haircut barber Chatham" },
            ].map((item) => (
              <div key={item.label} className="reveal-up" style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 200 }}>
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 25vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BA AESTHETICS ────────────────────────────────────── */}
      <section
        id="aesthetics"
        style={{ padding: "clamp(64px,8vw,96px) 24px", background: "var(--bg)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal-up">
            <span className="section-eyebrow">BA Aesthetics by Dentist</span>
            <h2 className="section-h2">Aesthetic Treatments in Chatham</h2>
            <p style={{ color: "#6b7280", marginTop: 12, maxWidth: 540, margin: "12px auto 0" }}>
              Led by a qualified dental professional — combining clinical precision with natural, beautiful results.
            </p>
          </div>
          <div className="three-col-grid">
            {AESTHETICS.map((a, i) => (
              <div
                key={a.title}
                className={`tilt-card ${i === 1 ? "reveal-up" : i === 0 ? "reveal-left" : "reveal-right"}`}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid rgba(196,147,106,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <Image
                    src={a.photo}
                    alt={a.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
                    {a.title}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.65 }}>{a.desc}</p>
                  <a href="#contact" style={{ display: "inline-block", marginTop: 14, color: ACCENT, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
                    Enquire →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div
            className="reveal-up"
            style={{
              marginTop: 48,
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Qualified Dental Professional", "Natural-Looking Results", "Medically Trained", "Safe & Hygienic"].map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(196,147,106,0.08)",
                  border: "1px solid rgba(196,147,106,0.25)",
                  borderRadius: 50,
                  padding: "8px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                <span style={{ color: ACCENT }}>✓</span> {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BA AESTHETICS PRICING ────────────────────────────── */}
      <section style={{ padding: "clamp(48px,6vw,80px) 24px", background: "#111", position: "relative", overflow: "hidden" }}>
        <ThreeDarkBg accent={ACCENT} count={600} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }} className="reveal-up">
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>Pricing</span>
            <h2 className="section-h2-light">BA Aesthetics Treatment Prices</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 10, fontSize: "0.9rem" }}>Prices subject to consultation. Contact us for the latest offers.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              {
                category: "Anti-Wrinkle (Botox)",
                icon: "💉",
                items: [
                  { label: "One Area", price: "£120" },
                  { label: "Two Areas", price: "£200" },
                  { label: "Three Areas", price: "£300" },
                  { label: "Brow Lift", price: "£150" },
                  { label: "Lip Flip", price: "£200" },
                  { label: "Jaw Slimming", price: "£300" },
                ],
              },
              {
                category: "Facial Filler",
                icon: "✨",
                items: [
                  { label: "1ml Cheek", price: "£180" },
                  { label: "1ml Chin", price: "£180" },
                  { label: "2ml Cheek", price: "£350" },
                  { label: "Smile Lines", price: "£450" },
                  { label: "Jaw Line Defining", price: "£450" },
                  { label: "Liquid Rhinoplasty", price: "£400" },
                ],
              },
              {
                category: "Lip Filler",
                icon: "💋",
                items: [
                  { label: "Up to 0.5ml", price: "£140" },
                  { label: "Up to 1ml", price: "£180" },
                  { label: "Up to 1.5ml", price: "£260" },
                  { label: "Up to 2ml", price: "£350" },
                ],
              },
              {
                category: "Skin Boosters & PRP",
                icon: "🌿",
                items: [
                  { label: "Lumi Eyes Booster", price: "£200" },
                  { label: "Profhilo", price: "£350" },
                  { label: "PRP Hair (1 session)", price: "£150" },
                  { label: "PRP Hair (4 sessions)", price: "£560" },
                  { label: "Face PRP (1 session)", price: "£150" },
                  { label: "Face PRP (3 sessions)", price: "£420" },
                ],
              },
            ].map((cat) => (
              <div
                key={cat.category}
                className="reveal-up"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(196,147,106,0.2)",
                  borderRadius: 16,
                  padding: "24px 24px 20px",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{cat.icon}</div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>{cat.category}</h3>
                {cat.items.map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "0.875rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                    <span style={{ color: ACCENT, fontWeight: 700 }}>{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }} className="reveal-up">
            <a href="#contact" className="btn-accent">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ padding: "clamp(64px,8vw,96px) 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal-up">
            <span className="section-eyebrow">Simple Process</span>
            <h2 className="section-h2">Your Visit to A Cut Above</h2>
          </div>
          <div className="three-col-grid" style={{ gap: 32 }}>
            {[
              { step: "01", title: "Book Your Appointment", desc: "Call or WhatsApp us on 07450 987978. We'll confirm your slot and prepare for your visit." },
              { step: "02", title: "Arrive & Consult", desc: "We take time to understand your goals — whether it's a trim, full colour transformation or aesthetic treatment." },
              { step: "03", title: "Leave Feeling Amazing", desc: "Walk out with a fresh look and the confidence that comes from expert care in Chatham, Medway." },
            ].map((item, i) => (
              <div
                key={item.step}
                className={i === 0 ? "reveal-left" : i === 2 ? "reveal-right" : "reveal-up"}
                style={{ textAlign: "center", padding: "32px 24px" }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(196,147,106,0.1)",
                    border: "2px solid rgba(196,147,106,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: ACCENT,
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: 700, marginBottom: 12, color: "#1a1a1a" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / LOCATION ─────────────────────────────────── */}
      <section id="about" style={{ padding: "clamp(64px,8vw,96px) 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="area-grid">
            <div className="reveal-left">
              <span className="section-eyebrow">Find Us</span>
              <h2 className="section-h2" style={{ marginBottom: 20 }}>
                Your Local Salon in Chatham, Medway
              </h2>
              <p style={{ color: "#6b7280", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem" }}>
                Located at 20 Shirley Ave, Chatham ME5 9UR — conveniently placed for residents across Medway including Rochester, Gillingham, Strood and beyond.
              </p>
              <div style={{ marginBottom: 24 }}>
                {[
                  { label: "Address", val: "20 Shirley Ave, Chatham ME5 9UR" },
                  { label: "Phone", val: "07450 987978" },
                  { label: "Services", val: "Hair Salon · Barber · Aesthetics" },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 72, paddingTop: 2 }}>
                      {label}
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "#374151" }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Chatham", "Rochester", "Gillingham", "Strood", "Medway", "Rainham"].map((area) => (
                  <span
                    key={area}
                    style={{
                      background: "rgba(196,147,106,0.1)",
                      border: "1px solid rgba(196,147,106,0.2)",
                      borderRadius: 50,
                      padding: "4px 14px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
              <a href="#contact" className="btn-accent">Get in Touch</a>
            </div>
            <div className="reveal-right map-wrap" style={{ height: 420, borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.7!2d0.5361!3d51.3656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8db3eee8b5a1b%3A0x1!2s20+Shirley+Ave%2C+Chatham+ME5+9UR!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="A Cut Above Salon location Chatham Medway"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(64px,8vw,96px) 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal-up">
            <span className="section-eyebrow">5-Star Reviews</span>
            <h2 className="section-h2">What Clients Say</h2>
          </div>
          <div className="three-col-grid" style={{ gap: 24 }}>
            {[
              { name: "Sarah M.", text: "Absolutely love my balayage! The team at A Cut Above are so talented — I've been coming here for years and never disappointed.", stars: 5 },
              { name: "James K.", text: "Best barber in Medway. Clean fade every time, great atmosphere. Wouldn't go anywhere else for my cut.", stars: 5 },
              { name: "Priya L.", text: "Had my bridal hair done here. It was perfect on the day. The consultation beforehand gave me so much confidence.", stars: 5 },
            ].map((r, i) => (
              <div
                key={r.name}
                className={i === 0 ? "reveal-left" : i === 2 ? "reveal-right" : "reveal-up"}
                style={{
                  background: "var(--bg)",
                  borderRadius: 16,
                  padding: "28px 28px 24px",
                  border: "1px solid rgba(196,147,106,0.15)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {Array.from({ length: r.stars }).map((_, si) => (
                    <span key={si} style={{ color: "#f59e0b", fontSize: "1.1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#374151", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: ACCENT }}>{r.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: 2 }}>Google Review</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }} className="reveal-up">
            <a
              href="https://www.google.com/search?q=a+cut+above+chatham"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              See All Google Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(64px,8vw,96px) 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal-up">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-h2">Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="reveal-up"
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid rgba(196,147,106,0.15)",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "18px 24px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#1a1a1a",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.q}
                  <span style={{ color: ACCENT, fontSize: "1.2rem", fontWeight: 400, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 18px", color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "clamp(64px,8vw,96px) 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-grid">
            <div className="reveal-left">
              <span className="section-eyebrow">Get In Touch</span>
              <h2 className="section-h2" style={{ marginBottom: 20 }}>Book Your Appointment</h2>
              <p style={{ color: "#6b7280", lineHeight: 1.7, marginBottom: 32, fontSize: "0.95rem" }}>
                Ready for a fresh look? Call us, send a WhatsApp or fill in the form and we&apos;ll be in touch to confirm your booking.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "📍", label: "Address", val: "20 Shirley Ave, Chatham, ME5 9UR" },
                  { icon: "📞", label: "Phone / WhatsApp", val: "07450 987978" },
                  { icon: "✂️", label: "Services", val: "Hair Salon · Barber · Aesthetics" },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(196,147,106,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "0.95rem", color: "#374151" }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <a href="tel:07450987978" className="btn-accent" style={{ marginRight: 12 }}>
                  Call Now
                </a>
                <a
                  href="https://wa.me/447450987978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="reveal-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px,8vw,96px) 24px",
          background: ACCENT,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="reveal-up"
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Ready for Your Best Hair Day?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", marginBottom: 36, lineHeight: 1.6 }}>
            Visit A Cut Above — your trusted hair salon and aesthetics clinic in Chatham, Medway.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                background: "#fff",
                color: ACCENT,
                fontWeight: 700,
                padding: "14px 32px",
                borderRadius: 50,
                textDecoration: "none",
                fontSize: "0.95rem",
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                transition: "transform 0.2s",
              }}
            >
              Book Now
            </a>
            <a
              href="tel:07450987978"
              style={{
                background: "transparent",
                color: "#fff",
                fontWeight: 600,
                padding: "13px 32px",
                borderRadius: 50,
                border: "2px solid rgba(255,255,255,0.6)",
                textDecoration: "none",
                fontSize: "0.95rem",
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              📞 07450 987978
            </a>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            {["Walk-ins Welcome", "Family Friendly", "Expert Team", "Chatham ME5"].map((chip) => (
              <div key={chip} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: 600 }}>
                ✓ {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a1a", color: "rgba(255,255,255,0.6)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                A Cut Above
              </div>
              <div style={{ fontSize: "0.8rem", color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                Unisex Salon · BA Aesthetics
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                Hair salon and aesthetics clinic serving Chatham, Medway and surrounding areas.
              </p>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 16, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Services
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Hair Colouring", "Balayage", "Bridal Hair", "Barber", "Lip Fillers", "Botox", "Keratin"].map((s) => (
                  <span key={s} style={{ fontSize: "0.875rem" }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 16, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Areas Served
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Chatham", "Rochester", "Gillingham", "Strood", "Medway", "Rainham"].map((a) => (
                  <span key={a} style={{ fontSize: "0.875rem" }}>{a}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 16, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Contact
              </div>
              <div style={{ fontSize: "0.875rem", lineHeight: 2 }}>
                <div>20 Shirley Ave</div>
                <div>Chatham, ME5 9UR</div>
                <a href="tel:07450987978" style={{ color: ACCENT, textDecoration: "none", display: "block", marginTop: 8, fontWeight: 600 }}>
                  07450 987978
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              fontSize: "0.8rem",
            }}
          >
            <span>© {new Date().getFullYear()} A Cut Above Unisex Salon &amp; BA Aesthetics · Hair salon Chatham · 07450 987978</span>
            <span>
              Built by{" "}
              <a href="https://www.viv-z.com" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none" }}>
                viv-z
              </a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span:last-child { transform: rotate(45deg); }
        details summary span:last-child { display: inline-block; transition: transform 0.2s; }
      `}</style>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", service: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div
        style={{
          background: "rgba(196,147,106,0.08)",
          border: "1px solid rgba(196,147,106,0.3)",
          borderRadius: 16,
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>✓</div>
        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", marginBottom: 8 }}>Message Sent!</h3>
        <p style={{ color: "#6b7280" }}>We&apos;ll be in touch shortly to confirm your appointment.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(196,147,106,0.25)",
    borderRadius: 10,
    fontSize: "1rem",
    background: "#fffaf7",
    color: "#1a1a1a",
    outline: "none",
    fontFamily: "var(--font-inter), sans-serif",
    minHeight: 44,
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "var(--bg)",
        borderRadius: 20,
        padding: "36px 32px",
        border: "1px solid rgba(196,147,106,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      <div className="services-grid" style={{ gap: 16 }}>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Name *</label>
          <input style={inputStyle} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </div>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Phone *</label>
          <input style={inputStyle} required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07..." type="tel" />
        </div>
      </div>
      <div>
        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email</label>
        <input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" type="email" />
      </div>
      <div>
        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Service Interested In</label>
        <select style={inputStyle} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
          <option value="">Select a service...</option>
          {ALL_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="Aesthetics - Lip Fillers">Aesthetics – Lip Fillers</option>
          <option value="Aesthetics - Botox">Aesthetics – Botox</option>
          <option value="Aesthetics - Other">Aesthetics – Other</option>
        </select>
      </div>
      <div>
        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Message</label>
        <textarea
          style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Any additional details or questions..."
        />
      </div>
      <button type="submit" className="btn-accent" style={{ width: "100%", fontSize: "0.95rem" }}>
        Send Enquiry
      </button>
    </form>
  );
}
