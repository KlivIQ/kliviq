import { useState } from "react";

const API = "https://api.anthropic.com/v1/messages";
type Tab = "appt" | "patients" | "comms";

const templates: Record<string, string> = {
  reminder: "Hi {patient_name}, reminder for your appointment with Dr. Priya Sharma tomorrow at {time}. Reply YES to confirm or call 080-XXXX-XXXX to reschedule. — ClinicPing",
  confirm: "Hi {patient_name}, please CONFIRM your slot on {date} at {time}. Reply YES or NO. — ClinicPing",
  followup: "Hi {patient_name}, Dr. Sharma recommends a follow-up visit. Book now: [link] — ClinicPing",
  custom: "",
};

export default function ClinicPing() {
  const [tab, setTab] = useState<Tab>("appt");
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [msgPatient, setMsgPatient] = useState("Mohan Reddy (High Risk)");
  const [msgChannel, setMsgChannel] = useState("WhatsApp");
  const [msgBody, setMsgBody] = useState(templates.reminder);
  const [drafting, setDrafting] = useState(false);

  async function runPredictor() {
    setPredicting(true); setPrediction("Analyzing patient risk factors...");
    try {
      const res = await fetch(API, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `You are a clinic AI. Give a concise 5-6 line no-show risk report for these appointments:\n1. Rekha Nair 9AM - BP monitoring, confirmed, 0 prior no-shows → LOW RISK\n2. Mohan Reddy 9:30AM - New patient, pending, no history → HIGH RISK\n3. Sunita Pillai 10AM - Diabetes review, confirmed, 1 no-show in 12 → MEDIUM RISK\n4. Arjun Mehta 11AM - Back pain, confirmed, 0 no-shows → LOW RISK\n5. Kavya Krishnan 2PM - Post-op follow-up, pending, 2 no-shows in 4 → HIGH RISK\nBe direct and actionable. Plain text only.` }] }),
      });
      const d = await res.json();
      setPrediction(d.content[0].text);
    } catch { setPrediction("Could not connect to AI."); }
    setPredicting(false);
  }

  async function aiDraft() {
    setDrafting(true);
    try {
      const res = await fetch(API, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `Write a short warm appointment reminder for ${msgPatient} via ${msgChannel} from Dr. Priya Sharma's Clinic Bangalore. Under 2 sentences, include a call to action. Sign off: ClinicPing. Plain text only.` }] }),
      });
      const d = await res.json();
      setMsgBody(d.content[0].text);
    } catch { alert("AI draft failed."); }
    setDrafting(false);
  }

  const s = { fontFamily: "'Nunito', sans-serif", background: "#F8FAFF", minHeight: "100vh", color: "#0D1B2A" };
  const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 22 };
  const mono = "'DM Mono', monospace";
  const green = "#166534"; const lime = "#4ADE80"; const mgr = "#1E8A47";

  const pill = (cls: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      confirmed: { bg: "#DCFCE7", color: "#166534" }, pending: { bg: "#FEF9C3", color: "#854D0E" },
      completed: { bg: "#E0F2FE", color: "#075985" },
    };
    return map[cls] || { bg: "#F3F4F6", color: "#374151" };
  };
  const risk = (r: string) => {
    if (r === "High") return { bg: "#FEE2E2", color: "#991B1B" };
    if (r === "Med") return { bg: "#FEF9C3", color: "#854D0E" };
    return { bg: "#DCFCE7", color: "#166534" };
  };

  const appts = [
    { time: "09:00 AM", name: "Rekha Nair", detail: "Follow-up · BP Monitoring · 20 min", r: "Low", status: "confirmed" },
    { time: "09:30 AM", name: "Mohan Reddy", detail: "New Patient · General Checkup · 30 min", r: "High", status: "pending" },
    { time: "10:00 AM", name: "Sunita Pillai", detail: "Diabetes Review · Lab Results · 30 min", r: "Med", status: "confirmed" },
    { time: "11:00 AM", name: "Arjun Mehta", detail: "Consultation · Back Pain · 20 min", r: "Low", status: "confirmed" },
    { time: "02:00 PM", name: "Kavya Krishnan", detail: "Post-op Follow-up · 15 min", r: "High", status: "pending" },
    { time: "03:30 PM", name: "Ramesh Iyer", detail: "Blood Test Review · 20 min", r: "Low", status: "completed" },
  ];
  const patients = [
    { initials: "RN", name: "Rekha Nair", id: "PT-0041 · F, 54", last: "28 Apr 2025", condition: "Hypertension", noshows: "0 / 8 visits", risk: "Low", avatarBg: "#DCFCE7", avatarColor: "#166534", riskLevel: "Low" },
    { initials: "MR", name: "Mohan Reddy", id: "PT-0078 · M, 38", last: "First visit", condition: "General checkup", noshows: "Unknown", risk: "High", avatarBg: "#FEE2E2", avatarColor: "#991B1B", riskLevel: "High" },
    { initials: "SP", name: "Sunita Pillai", id: "PT-0023 · F, 61", last: "15 Apr 2025", condition: "Type 2 Diabetes", noshows: "1 / 12 visits", risk: "Med", avatarBg: "#FEF9C3", avatarColor: "#854D0E", riskLevel: "Med" },
    { initials: "KK", name: "Kavya Krishnan", id: "PT-0055 · F, 29", last: "2 May 2025", condition: "Post-op Recovery", noshows: "2 / 4 visits", risk: "High", avatarBg: "#FEE2E2", avatarColor: "#991B1B", riskLevel: "High" },
  ];

  return (
    <div style={s}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=Nunito:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`.appt-row{border-bottom:1px solid #E2E8F0;padding:13px 0;display:grid;grid-template-columns:64px 1fr auto auto;gap:12px;align-items:center}.appt-row:last-child{border-bottom:none}`}</style>

      {/* NAV */}
      <nav style={{ background: green, padding: "12px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, background: "rgba(255,255,255,0.15)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="2.5" fill="white" opacity="0.5"/><circle cx="5" cy="5" r="2" fill="white" opacity="0.7"/>
              <circle cx="5" cy="19" r="2" fill="white" opacity="0.7"/><circle cx="12" cy="5" r="2" fill="white" opacity="0.7"/>
              <line x1="5" y1="5" x2="5" y2="19" stroke="white" strokeWidth="1.5" opacity="0.6"/>
              <line x1="5" y1="5" x2="12" y2="5" stroke="white" strokeWidth="1.5" opacity="0.6"/>
              <line x1="5" y1="12" x2="19" y2="19" stroke={lime} strokeWidth="2"/>
              <circle cx="19" cy="19" r="3" fill="none" stroke={lime} strokeWidth="1.5"/>
              <circle cx="19" cy="19" r="1.5" fill={lime}/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>Kliv<span style={{ color: lime }}>IQ</span></span>
        </a>
        <span style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: lime, fontFamily: mono, fontSize: 10, padding: "3px 10px", borderRadius: 20 }}>ClinicPing</span>
        <a href="/" style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>← Back to KlivIQ</a>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 80px" }}>
        {/* DASH HEADER */}
        <div style={{ background: green, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18 }}>ClinicPing</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: mono, marginTop: 2 }}>AI-Powered Clinic Management</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" as const }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>Dr. Priya Sharma's Clinic</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: mono, marginTop: 2 }}>Bangalore · General Practice</div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
          {[{ label: "Today's Appointments", val: "14", sub: "↑ 2 from yesterday", vc: "#0D1B2A" }, { label: "Confirmed", val: "11", sub: "78% rate", vc: green }, { label: "No-shows (7d)", val: "3", sub: "↓ from 5 last week", vc: "#DC2626" }, { label: "Revenue at Risk", val: "₹2.4K", sub: "today · unconfirmed", vc: "#D97706" }].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#64748B", fontFamily: mono, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: s.vc }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {(["appt", "patients", "comms"] as Tab[]).map((t, i) => (
            <button key={t} onClick={() => setTab(t)} style={{ fontFamily: mono, fontSize: 12, padding: "9px 18px", borderRadius: 8, border: `1px solid ${tab === t ? green : "#E2E8F0"}`, background: tab === t ? green : "#fff", color: tab === t ? "#fff" : "#64748B", cursor: "pointer" }}>
              {["📅 Appointments", "👥 Patients", "💬 Communication"][i]}
            </button>
          ))}
        </div>

        {/* APPOINTMENTS */}
        {tab === "appt" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
            <div style={card}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 3, height: 16, background: lime, borderRadius: 2, display: "inline-block" }} />Tuesday, 13 May 2025
              </div>
              {appts.map((a, i) => (
                <div key={i} className="appt-row">
                  <div style={{ fontFamily: mono, fontSize: 11, color: "#64748B", textAlign: "center" as const, background: "#F8FAFF", padding: "6px 8px", borderRadius: 7, lineHeight: 1.3 }}>{a.time}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{a.detail}</div>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: "3px 8px", borderRadius: 4, ...risk(a.r) }}>{a.r}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: "4px 10px", borderRadius: 20, ...pill(a.status) }}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" as const }}>
                <button onClick={runPredictor} disabled={predicting} style={{ padding: "9px 14px", borderRadius: 8, border: "none", background: green, color: "#fff", fontFamily: mono, fontSize: 11, cursor: predicting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  {predicting ? "Analyzing..." : "⚡ AI No-Show Predictor"}
                </button>
                <button onClick={() => alert("Reminders sent via WhatsApp + SMS! (Demo)")} style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", fontFamily: mono, fontSize: 11, cursor: "pointer" }}>📲 Send Reminders</button>
              </div>
              {prediction && (
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: 16, marginTop: 12 }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: green, marginBottom: 8, fontWeight: 500 }}>⚡ AI RISK ANALYSIS</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" as const }}>{prediction}</div>
                </div>
              )}
            </div>
            <div>
              <div style={{ ...card, marginBottom: 12 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 12 }}>Quick Stats</div>
                {[["Avg wait time", "12 min", "#0F766E"], ["Reminders sent", "8 today", "#0D1B2A"], ["WhatsApp", "8/8", green], ["SMS", "7/8", green], ["No-show rate MTD", "14%", "#D97706"]].map(([k, v, vc], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 4 ? "1px solid #E2E8F0" : "none", fontSize: 12 }}>
                    <span style={{ color: "#64748B" }}>{k}</span><span style={{ fontWeight: 500, color: vc }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PATIENTS */}
        {tab === "patients" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {patients.map((p, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: p.avatarBg, color: p.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, fontFamily: "'Syne',sans-serif", flexShrink: 0 }}>{p.initials}</div>
                  <div><div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div><div style={{ fontFamily: mono, fontSize: 10, color: "#64748B" }}>{p.id}</div></div>
                </div>
                {[["Last visit", p.last], ["Condition", p.condition], ["No-show history", p.noshows]].map(([k, v], j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #E2E8F0", fontSize: 12 }}>
                    <span style={{ color: "#64748B" }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12 }}>
                  <span style={{ color: "#64748B" }}>Risk</span>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: "3px 8px", borderRadius: 4, ...risk(p.riskLevel) }}>{p.riskLevel}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMMS */}
        {tab === "comms" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={card}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 3, height: 16, background: lime, borderRadius: 2, display: "inline-block" }} />Compose Message
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontFamily: mono, fontSize: 10, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6, display: "block" }}>Patient</label>
                  <select value={msgPatient} onChange={e => setMsgPatient(e.target.value)} style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 8, padding: "9px 12px", fontFamily: "'Nunito',sans-serif", fontSize: 13, background: "#F8FAFF", outline: "none" }}>
                    <option>Mohan Reddy (High Risk)</option><option>Kavya Krishnan (High Risk)</option><option>Sunita Pillai</option><option>All Pending</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: mono, fontSize: 10, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6, display: "block" }}>Channel</label>
                  <select value={msgChannel} onChange={e => setMsgChannel(e.target.value)} style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 8, padding: "9px 12px", fontFamily: "'Nunito',sans-serif", fontSize: 13, background: "#F8FAFF", outline: "none" }}>
                    <option>WhatsApp</option><option>SMS</option><option>Both</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: mono, fontSize: 10, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6, display: "block" }}>Template</label>
                <select onChange={e => setMsgBody(templates[e.target.value])} style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 8, padding: "9px 12px", fontFamily: "'Nunito',sans-serif", fontSize: 13, background: "#F8FAFF", outline: "none" }}>
                  <option value="reminder">Appointment Reminder</option><option value="confirm">Confirm Appointment</option><option value="followup">Follow-up Request</option><option value="custom">Custom</option>
                </select>
              </div>
              <label style={{ fontFamily: mono, fontSize: 10, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 6, display: "block" }}>Message</label>
              <textarea value={msgBody} onChange={e => setMsgBody(e.target.value)} style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, fontFamily: "'Nunito',sans-serif", fontSize: 13, background: "#F8FAFF", resize: "vertical" as const, minHeight: 90, outline: "none", marginBottom: 12 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={aiDraft} disabled={drafting} style={{ background: green, color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontFamily: mono, fontSize: 12, cursor: drafting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  {drafting ? "Drafting..." : "⚡ AI Draft"}
                </button>
                <button onClick={() => alert("Message sent! (Connects to Twilio/WhatsApp API in production)")} style={{ padding: "9px 14px", borderRadius: 8, border: `1px solid ${green}`, background: green, color: "#fff", fontFamily: mono, fontSize: 11, cursor: "pointer" }}>Send Now</button>
              </div>
            </div>
            <div style={card}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 3, height: 16, background: lime, borderRadius: 2, display: "inline-block" }} />Message Log
              </div>
              {[{ to: "Rekha Nair", time: "Today 8:00 AM", ch: "WhatsApp", body: "Hi Rekha, reminder for your BP checkup today at 9:00 AM with Dr. Sharma...", st: "✓ Delivered", stBg: "#DCFCE7", stC: "#166534" }, { to: "Mohan Reddy", time: "Today 8:01 AM", ch: "SMS + WhatsApp", body: "Hi Mohan, your first appointment is at 9:30 AM today. Please confirm...", st: "⏳ Awaiting reply", stBg: "#FEF9C3", stC: "#854D0E" }, { to: "Kavya Krishnan", time: "Yesterday 5:00 PM", ch: "WhatsApp", body: "Hi Kavya, your post-op follow-up is tomorrow 2:00 PM. Please don't miss...", st: "✗ No response", stBg: "#FEE2E2", stC: "#991B1B" }].map((m, i) => (
                <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{m.to}</span>
                    <span style={{ fontFamily: mono, fontSize: 10, color: "#64748B" }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#0F766E", fontFamily: mono, marginBottom: 6 }}>{m.ch}</div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{m.body}</div>
                  <span style={{ display: "inline-block", marginTop: 6, fontFamily: mono, fontSize: 10, padding: "2px 8px", borderRadius: 4, background: m.stBg, color: m.stC }}>{m.st}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center" as const, padding: "32px 20px", color: "#64748B", fontSize: 13, borderTop: "1px solid #E2E8F0", marginTop: 40 }}>
        Built by <a href="https://www.kliviq.com" style={{ color: green, textDecoration: "none" }}>KlivIQ Technologies</a> · AI-powered tools for modern businesses
      </footer>
    </div>
  );
}
