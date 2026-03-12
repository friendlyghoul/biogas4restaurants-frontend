import { useState, useEffect, useRef } from "react";
import { LANGUAGES, IMAGE_FILES } from "../data/languages.js";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:#0a1a0e;color:#e8f5e9;font-family:'DM Sans',sans-serif}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:#0a1a0e}
  ::-webkit-scrollbar-thumb{background:#2d6a4f;border-radius:2px}

  .fade-up{opacity:0;transform:translateY(36px);transition:opacity 0.75s ease,transform 0.75s ease}
  .fade-up.visible{opacity:1;transform:translateY(0)}

  .lang-btn{background:transparent;border:1px solid rgba(255,255,255,0.13);color:rgba(255,255,255,0.55);padding:6px 13px;border-radius:20px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;transition:all 0.2s;white-space:nowrap}
  .lang-btn:hover{border-color:#52b788;color:#52b788}
  .lang-btn.active{background:#2d6a4f;border-color:#2d6a4f;color:#fff}

  .stat-card{background:linear-gradient(135deg,rgba(45,106,79,0.13),rgba(82,183,136,0.04));border:1px solid rgba(82,183,136,0.18);border-radius:16px;padding:28px 20px;text-align:center;transition:transform 0.3s,border-color 0.3s}
  .stat-card:hover{transform:translateY(-4px);border-color:rgba(82,183,136,0.45)}

  .phase-card{border-left:3px solid #52b788;padding:20px 24px;background:rgba(82,183,136,0.04);border-radius:0 12px 12px 0;transition:background 0.3s}
  .phase-card:hover{background:rgba(82,183,136,0.09)}

  .iot-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(82,183,136,0.08);border:1px solid rgba(82,183,136,0.2);border-radius:8px;padding:10px 14px;font-size:12px;color:#b7e4c7}

  .btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2d6a4f;color:#fff;border:none;padding:13px 26px;border-radius:40px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;transition:background 0.2s,transform 0.2s}
  .btn-primary:hover{background:#40916c;transform:translateY(-2px)}
  .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#52b788;border:1px solid #52b788;padding:13px 26px;border-radius:40px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;transition:all 0.2s}
  .btn-outline:hover{background:rgba(82,183,136,0.09);transform:translateY(-2px)}

  @keyframes bounce-y{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
  @keyframes dot-scroll{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}
`;

function Section({ id, children, style = {}, innerStyle = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={style}>
      <div className={`fade-up ${visible ? "visible" : ""}`} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", ...innerStyle }}>
        {children}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const L = LANGUAGES[lang];
  const C = L.content;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#0a1a0e", color: "#e8f5e9", minHeight: "100vh" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,26,14,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(82,183,136,0.1)" : "none",
        transition: "all 0.4s", padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#52b788", whiteSpace: "nowrap" }}>
          🌿 Biogas4Restaurants
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {Object.entries(LANGUAGES).map(([code, data]) => (
            <button key={code} className={`lang-btn ${lang === code ? "active" : ""}`} onClick={() => setLang(code)}>
              {data.flag} {data.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%, rgba(45,106,79,0.28) 0%, transparent 70%)",
      }}>
        <div style={{ position: "absolute", top: "18%", left: "8%", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(82,183,136,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "14%", right: "7%", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(82,183,136,0.05)", pointerEvents: "none" }} />

        <div style={{ display: "inline-block", background: "rgba(82,183,136,0.09)", border: "1px solid rgba(82,183,136,0.28)", borderRadius: 40, padding: "5px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#52b788", marginBottom: 28, letterSpacing: 1 }}>
          {C.badge}
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,6vw,72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 6, color: "#e8f5e9" }}>
          {C.tagline}
        </h1>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,6vw,72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 28, color: "#52b788", fontStyle: "italic" }}>
          {C.tagline2}
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(232,245,233,0.65)", maxWidth: 580, lineHeight: 1.75, marginBottom: 44 }}>
          {C.heroSub}
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#video" className="btn-primary">▶ {C.watchBtn}</a>
          <a href="#pilot" className="btn-outline">🔬 {C.pilotBtn}</a>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", animation: "bounce-y 2s infinite" }}>
          <div style={{ width: 22, height: 38, border: "2px solid rgba(82,183,136,0.28)", borderRadius: 11, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4 }}>
            <div style={{ width: 3, height: 7, background: "#52b788", borderRadius: 2, animation: "dot-scroll 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* ── CRISIS STATS ──────────────────────────────────────────────────── */}
      <Section id="crisis" style={{ background: "rgba(200,30,30,0.04)", borderTop: "1px solid rgba(200,30,30,0.09)", borderBottom: "1px solid rgba(200,30,30,0.09)", padding: "80px 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, marginBottom: 14, color: "#ffb3b3" }}>
          ⚠️ {C.crisisTitle}
        </h2>
        <p style={{ color: "rgba(232,245,233,0.65)", fontSize: 16, lineHeight: 1.75, maxWidth: 660, marginBottom: 48 }}>
          {C.crisisText}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[[C.stat1, C.stat1l, "#ffb3b3"], [C.stat2, C.stat2l, "#ffd6a5"], [C.stat3, C.stat3l, "#a8dadc"]].map(([v, l, c], i) => (
            <div key={i} className="stat-card">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: c, marginBottom: 8 }}>{v}</div>
              <div style={{ fontSize: 13, color: "rgba(232,245,233,0.55)", letterSpacing: 0.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SOLUTION + INFOGRAPHIC ────────────────────────────────────────── */}
      <Section id="solution" style={{ padding: "100px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: "#52b788", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>{C.solutionLabel}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
              {C.solutionTitle}
            </h2>
            <p style={{ color: "rgba(232,245,233,0.65)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>{C.solutionText}</p>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 18, color: "#b7e4c7" }}>{C.dualTitle}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(82,183,136,0.07)", border: "1px solid rgba(82,183,136,0.18)", borderRadius: 16, padding: "20px 22px" }}>
                <div style={{ fontWeight: 600, color: "#52b788", marginBottom: 6, fontSize: 14 }}>{C.goodTitle}</div>
                <div style={{ color: "rgba(232,245,233,0.65)", fontSize: 13, lineHeight: 1.6 }}>{C.goodText}</div>
              </div>
              <div style={{ background: "rgba(200,30,30,0.07)", border: "1px solid rgba(200,30,30,0.18)", borderRadius: 16, padding: "20px 22px" }}>
                <div style={{ fontWeight: 600, color: "#ffb3b3", marginBottom: 6, fontSize: 14 }}>{C.crisisTitle2}</div>
                <div style={{ color: "rgba(232,245,233,0.65)", fontSize: 13, lineHeight: 1.6 }}>{C.crisisText2}</div>
              </div>
            </div>
          </div>

          {/* Language-switching infographic */}
          <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(82,183,136,0.13)", background: "rgba(82,183,136,0.02)" }}>
            <div style={{ padding: "10px 16px", background: "rgba(82,183,136,0.07)", borderBottom: "1px solid rgba(82,183,136,0.1)", fontSize: 11, color: "rgba(232,245,233,0.4)" }}>
              🌿 {L.flag} {L.label} — Open Source Framework · NotebookLM
            </div>
            <img
              key={IMAGE_FILES[L.imageIndex]}
              src={`/images/${IMAGE_FILES[L.imageIndex]}`}
              alt={`Biogas infographic in ${L.label}`}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </Section>

      {/* ── COW DUNG + IOT ────────────────────────────────────────────────── */}
      <Section id="tech" style={{ background: "rgba(82,183,136,0.02)", borderTop: "1px solid rgba(82,183,136,0.07)", borderBottom: "1px solid rgba(82,183,136,0.07)", padding: "100px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56 }}>
          <div>
            <div style={{ fontSize: 40, marginBottom: 18 }}>🐄</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 14 }}>{C.cowTitle}</h3>
            <p style={{ color: "rgba(232,245,233,0.65)", lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{C.cowText}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {C.cowPoints.map(([icon, text, tag], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                  <span style={{ fontSize: 17 }}>{icon}</span>
                  <span style={{ color: "rgba(232,245,233,0.72)", flex: 1 }}>{text}</span>
                  <span style={{ color: "#52b788", fontSize: 11, background: "rgba(82,183,136,0.09)", padding: "2px 9px", borderRadius: 10, whiteSpace: "nowrap" }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 40, marginBottom: 18 }}>🔬</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 14 }}>{C.iotTitle}</h3>
            <p style={{ color: "rgba(232,245,233,0.65)", lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{C.iotText}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["🌡️","DS18B20","Temperature"],["📊","MPX5010","Gas Pressure"],["⚗️","pH Sensor","Acidity"],["📡","Flow Meter","Daily Output"],["🔌","Relay Module","Auto Heating"],["📱","Pi Dashboard","Alerts"]].map(([icon,chip,label],i) => (
                <div key={i} className="iot-chip">
                  <span>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 11 }}>{chip}</div>
                    <div style={{ fontSize: 10, opacity: 0.55 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── COST & ROI ────────────────────────────────────────────────────── */}
      <Section id="cost" style={{ padding: "100px 0" }} innerStyle={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, marginBottom: 48 }}>{C.costTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 36 }}>
          {[[C.cost,C.costL,"🏗️"],[C.payback,C.paybackL,"📅"],[C.saved,C.savedL,"🛡️"]].map(([v,l,icon],i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#52b788", marginBottom: 6 }}>{v}</div>
              <div style={{ fontSize: 12, color: "rgba(232,245,233,0.5)" }}>{l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "rgba(232,245,233,0.35)", maxWidth: 480, margin: "0 auto" }}>
          Based on 5–7 LPG cylinders/month. Crisis value based on 3-day disruption revenue preservation.
        </p>
      </Section>

      {/* ── VIDEO ─────────────────────────────────────────────────────────── */}
      <Section id="video" style={{ background: "rgba(82,183,136,0.02)", borderTop: "1px solid rgba(82,183,136,0.07)", padding: "100px 0" }} innerStyle={{ maxWidth: 860 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: "#52b788", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{L.flag} {L.label}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700 }}>{C.videoTitle}</h2>
        </div>
        <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(82,183,136,0.13)", aspectRatio: "16/9", background: "#060e08" }}>
          <iframe
            key={L.videoId}
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${L.videoId}?rel=0`}
            title={`Biogas4Restaurants – ${L.label}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "rgba(232,245,233,0.3)", textAlign: "center", marginTop: 14 }}>
          Available in 6 languages — switch language above to watch in your language
        </p>
      </Section>

      {/* ── PILOT ─────────────────────────────────────────────────────────── */}
      <Section id="pilot" style={{ padding: "100px 0" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: "#52b788", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Open Source</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700 }}>{C.pilotTitle}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 56 }}>
          {[[C.p1title, C.p1text, "#52b788", "01"], [C.p2title, C.p2text, "#b7e4c7", "02"], [C.p3title, C.p3text, "#40916c", "03"]].map(([title, text, color, num], i) => (
            <div key={i} className="phase-card" style={{ borderLeftColor: color }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color, opacity: 0.25, lineHeight: 1, minWidth: 52 }}>{num}</div>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color, marginBottom: 6 }}>{title}</h4>
                  <p style={{ color: "rgba(232,245,233,0.65)", fontSize: 14, lineHeight: 1.7 }}>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ padding: 40, background: "rgba(82,183,136,0.04)", border: "1px solid rgba(82,183,136,0.13)", borderRadius: 20, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>📡</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>{C.followTitle}</h3>
          <p style={{ color: "rgba(232,245,233,0.55)", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7, fontSize: 14 }}>{C.followText}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.youtube.com/@biogas4restaurants" target="_blank" rel="noopener noreferrer" className="btn-primary">
              ▶ {C.subscribeBtn}
            </a>
            <a href="/concept-doc.docx" download className="btn-outline">
              ⬇ {C.downloadBtn}
            </a>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(82,183,136,0.09)", padding: "44px 24px", textAlign: "center", background: "rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#52b788", marginBottom: 10 }}>🌿 Biogas4Restaurants</div>
        <p style={{ fontSize: 13, color: "rgba(232,245,233,0.38)", maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.7 }}>{C.footerText}</p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", fontSize: 12, color: "rgba(232,245,233,0.28)" }}>
          <span>CC0 Licence</span><span>·</span><span>No Patents</span><span>·</span><span>No Company</span><span>·</span>
          <a href="https://www.youtube.com/@biogas4restaurants" target="_blank" rel="noopener noreferrer" style={{ color: "#52b788", textDecoration: "none" }}>YouTube ↗</a>
        </div>
        <div style={{ marginTop: 20, fontSize: 11, color: "rgba(232,245,233,0.14)" }}>{C.footerSub}</div>
      </footer>
    </div>
  );
}
