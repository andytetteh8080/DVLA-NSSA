"use client";

import type { ElementType } from "react";
import {
  QrCode, ShieldCheck, Clock, Users, Zap,
  Github, Globe, Mail, ChevronRight, Star,
  CheckCircle2, CalendarDays, Bell, Settings,
  FileText, Building2, TrendingUp, Lock, BadgeCheck,
} from "lucide-react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  primaryDark: "#0f172a",
  primary:     "#16a34a",
  outerGreen:  "#475569",
  surface:     "#f8fafc",
  surface2:    "#f1f5f9",
  border:      "#e2e8f0",
  amber:       "#d97706",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
};

const VERSION = "1.0.0";
const BUILD   = "2026.02.19";

const STACK = ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Lucide Icons", "Node.js"];

const FEATURES = [
  { icon: QrCode,       label:"QR-based Attendance",  desc:"Employees scan unique secure QR codes to check in and out instantly.", color:"#16a34a", bg:"#ecfdf5" },
  { icon: Users,        label:"Employee Management",  desc:"Add, edit, deactivate, and manage all staff records in one place.",    color:"#475569", bg:"#f1f5f9" },
  { icon: CalendarDays, label:"Attendance Logs",      desc:"Full check-in/out history with computed hours worked and statuses.",   color:"#16a34a", bg:"#ecfdf5" },
  { icon: ShieldCheck,  label:"Audit Trail",          desc:"Immutable log of all admin actions, auth events, and data changes.",   color:"#7c3aed", bg:"#f5f3ff" },
  { icon: Bell,         label:"Smart Notifications",  desc:"Configurable alerts via email, SMS, or push for key system events.",   color:"#d97706", bg:"#fffbeb" },
  { icon: Settings,     label:"Flexible Settings",    desc:"Customise attendance rules, security policies, and QR behaviour.",    color:"#475569", bg:"#f1f5f9" },
];

const TEAM = [
  { avatar:"AA", name:"Ama Asante",  role:"Product Lead",     bg:"#16a34a" },
  { avatar:"KO", name:"Kweku Osei",  role:"Lead Developer",   bg:"#0f172a" },
  { avatar:"ET", name:"Efua Tetteh", role:"UI/UX Designer",   bg:"#475569" },
  { avatar:"JB", name:"James Boadu", role:"Backend Engineer", bg:"#145B2A" },
];

const CHANGELOG = [
  { version:"1.0.0", date:"Feb 2026", current:true,  notes:["Initial release to production","QR generation: UUID, Encrypted Token, and JWT modes","Attendance check-in/out with auto hours tracking","Immutable audit log with detail drawer","Notification system with quiet hours and channel toggles"] },
  { version:"0.9.0", date:"Jan 2026", current:false, notes:["Beta release for internal testing","Employee CRUD with bulk import","QR modal with download support","Basic audit log"] },
];

const STATS = [
  { icon:Users,     value:"∞",         label:"Employees supported",   accent:false },
  { icon:ShieldCheck, value:"100%",    label:"Token-based security",  accent:true  },
  { icon:Clock,     value:"Real-time", label:"Attendance tracking",   accent:false },
  { icon:Zap,       value:"3",         label:"QR payload strategies", accent:false },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon:Icon, accent }: { value:string; label:string; icon:ElementType; accent?:boolean }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 20px",borderRadius:14,background: accent ? "linear-gradient(135deg,#ecfdf5,#d1fae5)" : "#fff",border:`1px solid ${accent?"rgba(22,163,74,0.2)":C.border}`,flex:1 }}>
      <div style={{ width:40,height:40,borderRadius:11,background:accent?"rgba(22,163,74,0.15)":C.surface2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        <Icon size={17} color={C.primary} strokeWidth={2}/>
      </div>
      <div>
        <div style={{ fontSize:22,fontWeight:800,color:C.primaryDark,lineHeight:1,letterSpacing:"-0.03em" }}>{value}</div>
        <div style={{ fontSize:11,color:C.outerGreen,marginTop:3 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon:Icon, label, desc, color, bg }: { icon:ElementType; label:string; desc:string; color:string; bg:string }) {
  return (
    <div style={{ display:"flex",gap:13,padding:"14px 16px",borderRadius:12,background:"#fff",border:`1px solid ${C.border}` }}>
      <div style={{ width:36,height:36,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        <Icon size={16} color={color}/>
      </div>
      <div>
        <div style={{ fontWeight:700,fontSize:12,color:C.primaryDark,marginBottom:3 }}>{label}</div>
        <div style={{ fontSize:11,color:C.outerGreen,lineHeight:1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function SectionCard({ title, subtitle, children }: { title:string; subtitle?:string; children:React.ReactNode }) {
  return (
    <div style={{ background:"#fff",borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden" }}>
      <div style={{ padding:"16px 20px",borderBottom:`1px solid ${C.surface2}` }}>
        <div style={{ fontWeight:700,fontSize:14,color:C.primaryDark }}>{title}</div>
        {subtitle && <div style={{ fontSize:11,color:C.outerGreen,marginTop:2 }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:22 }}>

      {/* ── Header ── */}
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:6 }}>
            <div style={{ width:34,height:34,borderRadius:9,background:C.surface2,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <QrCode size={16} color={C.primary}/>
            </div>
            <h1 style={{ fontSize:22,fontWeight:800,color:C.primaryDark,margin:0,letterSpacing:"-0.03em" }}>About AttendQR</h1>
          </div>
          <p style={{ fontSize:12,color:C.outerGreen,margin:0 }}>System information, feature overview, team, and release history.</p>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <span style={{ display:"flex",alignItems:"center",gap:5,background:"#ecfdf5",border:"1px solid rgba(22,163,74,0.2)",borderRadius:100,padding:"5px 13px",fontSize:11,fontWeight:700,color:C.primary }}>
            <Star size={11}/> v{VERSION}
          </span>
          <span style={{ display:"flex",alignItems:"center",gap:5,background:C.surface2,border:`1px solid ${C.border}`,borderRadius:100,padding:"5px 13px",fontSize:11,fontWeight:600,color:C.outerGreen }}>
            Build {BUILD}
          </span>
        </div>
      </div>

      {/* ── App identity card ── */}
      <div style={{ background:"#fff",borderRadius:16,border:`1px solid ${C.border}`,padding:"24px 28px",display:"flex",alignItems:"center",gap:20,flexWrap:"wrap" }}>
        <div style={{ width:64,height:64,borderRadius:18,background:"#ecfdf5",border:"2px solid rgba(22,163,74,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <QrCode size={32} color={C.primary}/>
        </div>
        <div style={{ flex:1,minWidth:200 }}>
          <div style={{ fontSize:20,fontWeight:800,color:C.primaryDark,letterSpacing:"-0.03em",marginBottom:4 }}>AttendQR</div>
          <div style={{ fontSize:12,color:C.outerGreen,lineHeight:1.7,maxWidth:520 }}>
            A secure, QR-powered attendance system built for modern organisations. Employees check in with a scan — admins get real-time visibility, full audit trails, and configurable smart alerts.
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
          <span style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.primary,fontWeight:600 }}>
            <ShieldCheck size={12}/> No raw data embedded in QR codes
          </span>
          <span style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.primary,fontWeight:600 }}>
            <Lock size={12}/> Tamper-proof audit logs
          </span>
          <span style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.primary,fontWeight:600 }}>
            <TrendingUp size={12}/> Real-time attendance tracking
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
        {STATS.map(s=><StatCard key={s.label} {...s}/>)}
      </div>

      {/* ── Two-col grid ── */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>

        {/* Features */}
        <SectionCard title="Core Features" subtitle="Everything included out of the box">
          <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:10 }}>
            {FEATURES.map(f=><FeatureCard key={f.label} {...f}/>)}
          </div>
        </SectionCard>

        {/* Right col */}
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>

          {/* Tech stack */}
          <SectionCard title="Tech Stack" subtitle="Technologies powering AttendQR">
            <div style={{ padding:"16px 20px",display:"flex",flexWrap:"wrap",gap:8 }}>
              {STACK.map(s=>(
                <span key={s} style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,background:C.surface2,border:`1px solid ${C.border}`,fontSize:12,fontWeight:600,color:C.primaryDark }}>
                  <CheckCircle2 size={11} color={C.primary}/>{s}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Team */}
          <SectionCard title="Built by" subtitle="The team behind AttendQR">
            <div style={{ padding:"16px 20px",display:"flex",flexDirection:"column",gap:12 }}>
              {TEAM.map(t=>(
                <div key={t.name} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:11,background:C.surface,border:`1px solid ${C.border}` }}>
                  <div style={{ width:36,height:36,borderRadius:10,background:t.bg,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0 }}>{t.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12,fontWeight:700,color:C.primaryDark }}>{t.name}</div>
                    <div style={{ fontSize:11,color:C.outerGreen }}>{t.role}</div>
                  </div>
                  <BadgeCheck size={15} color={C.primary}/>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Links */}
          <SectionCard title="Links & Support">
            <div style={{ padding:"6px 0" }}>
              {[
                { icon:Globe,    label:"Visit website",   sub:"attendqr.app"           },
                { icon:Github,   label:"Source code",     sub:"github.com/attendqr"    },
                { icon:Mail,     label:"Contact support", sub:"support@attendqr.app"   },
                { icon:FileText, label:"Documentation",   sub:"docs.attendqr.app"      },
              ].map((lk,i,arr)=>(
                <button
                  key={lk.label}
                  style={{ width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left",borderBottom: i<arr.length-1 ? `1px solid ${C.surface2}` : "none" }}
                  onMouseEnter={e=>(e.currentTarget.style.background=C.surface)}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                >
                  <div style={{ width:32,height:32,borderRadius:9,background:C.surface2,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <lk.icon size={14} color={C.outerGreen}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12,fontWeight:600,color:C.primaryDark }}>{lk.label}</div>
                    <div style={{ fontSize:10,color:C.outerGreen }}>{lk.sub}</div>
                  </div>
                  <ChevronRight size={14} color={C.border}/>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Changelog ── */}
      <SectionCard title="Changelog" subtitle="What's new in each release">
        <div style={{ padding:"20px",display:"flex",flexDirection:"column",gap:0 }}>
          {CHANGELOG.map((rel,ri)=>(
            <div key={rel.version} style={{ display:"flex",gap:20,paddingBottom: ri<CHANGELOG.length-1 ? 24 : 0, borderBottom: ri<CHANGELOG.length-1 ? `1px solid ${C.surface2}` : "none", marginBottom: ri<CHANGELOG.length-1 ? 24 : 0 }}>
              {/* Left: version label */}
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6,minWidth:90,flexShrink:0 }}>
                <span style={{ padding:"5px 12px",borderRadius:100,fontSize:11,fontWeight:700,whiteSpace:"nowrap",background: rel.current ? "#ecfdf5" : C.surface2, color: rel.current ? C.primary : C.outerGreen, border:`1px solid ${rel.current ? "rgba(22,163,74,0.2)" : C.border}` }}>
                  v{rel.version}
                </span>
                <span style={{ fontSize:10,color:C.outerGreen }}>{rel.date}</span>
                {rel.current && (
                  <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.primary,background:"#ecfdf5",border:"1px solid rgba(22,163,74,0.2)",borderRadius:6,padding:"2px 7px" }}>Latest</span>
                )}
              </div>
              {/* Right: notes */}
              <div style={{ flex:1,display:"flex",flexDirection:"column",gap:8,paddingTop:4 }}>
                {rel.notes.map(n=>(
                  <div key={n} style={{ display:"flex",alignItems:"flex-start",gap:9 }}>
                    <CheckCircle2 size={13} color={rel.current ? C.primary : C.outerGreen} style={{ flexShrink:0,marginTop:2 }}/>
                    <span style={{ fontSize:12,color:C.primaryDark,lineHeight:1.6 }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Security note ── */}
      <div style={{ background:"#ecfdf5",borderRadius:14,border:"1px solid rgba(22,163,74,0.2)",padding:"14px 20px",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <ShieldCheck size={16} color={C.primary}/>
          <span style={{ fontSize:12,fontWeight:600,color:C.primaryDark }}>Privacy & Security Commitment</span>
        </div>
        <span style={{ fontSize:11,color:C.outerGreen }}>No raw employee data is embedded in QR codes · All logs are immutable · Tokens expire automatically</span>
      </div>

      {/* ── Footer ── */}
      <div style={{ padding:"14px 20px",borderRadius:14,background:C.surface,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
        <span style={{ fontSize:11,color:C.outerGreen }}>© 2026 AttendQR · v{VERSION} · Build {BUILD}</span>
        <span style={{ fontSize:11,color:C.outerGreen }}>Made with care for modern teams</span>
      </div>

    </div>
  );
}