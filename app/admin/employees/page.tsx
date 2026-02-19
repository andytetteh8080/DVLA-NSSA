"use client";

import { useMemo, useState } from "react";
import {
  Users, UserPlus, Upload, Search, Building2, Mail, Phone,
  QrCode, Pencil, Trash2, CalendarDays, ChevronDown,
  BadgeCheck, CircleDashed, X, Download, Shield,
  TrendingUp, ToggleLeft, ToggleRight,
} from "lucide-react";

const C = {
  primaryDark: "#0f172a",
  primary:     "#16a34a",
  outerGreen:  "#475569",
  surface:     "#f8fafc",
  surface2:    "#f1f5f9",
  border:      "#e2e8f0",
  red:         "#dc2626",
};

type EmployeeStatus = "Active" | "Inactive";
type Employee = {
  id: string; name: string; department: string;
  email: string; phone: string; status: EmployeeStatus;
  dateAdded: string; avatar: string;
};

const INITIAL_EMPLOYEES: Employee[] = [
  { id:"EMP-001", name:"John Doe",     department:"Operations", email:"john.doe@example.com",    phone:"+44 7700 900001", status:"Active",   dateAdded:"2025-01-10", avatar:"JD" },
  { id:"EMP-014", name:"Sarah Malik",  department:"HR",         email:"sarah.malik@example.com", phone:"+44 7700 900014", status:"Active",   dateAdded:"2025-02-03", avatar:"SM" },
  { id:"EMP-022", name:"Amina Yusuf", department:"Finance",    email:"amina.yusuf@example.com", phone:"+44 7700 900022", status:"Inactive", dateAdded:"2025-02-14", avatar:"AY" },
  { id:"EMP-033", name:"Michael Chen",department:"IT",         email:"m.chen@example.com",      phone:"+44 7700 900033", status:"Active",   dateAdded:"2025-01-22", avatar:"MC" },
  { id:"EMP-047", name:"Kofi Mensah", department:"Operations", email:"k.mensah@example.com",    phone:"+44 7700 900047", status:"Active",   dateAdded:"2025-02-11", avatar:"KM" },
  { id:"EMP-058", name:"Esi Boateng", department:"IT",         email:"e.boateng@example.com",   phone:"+44 7700 900058", status:"Inactive", dateAdded:"2025-02-18", avatar:"EB" },
];

const AVATAR_COLORS: Record<string, string> = {
  "EMP-001":"#16a34a","EMP-014":"#475569","EMP-022":"#145B2A",
  "EMP-033":"#0f172a","EMP-047":"#2A5C2A","EMP-058":"#475569",
};

// ─── QR Modal ─────────────────────────────────────────────────────────────────
function QRModal({ emp, onClose }: { emp: Employee; onClose: () => void }) {
  const [token] = useState(() =>
    `SEC-${emp.id}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
  );
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(15,23,42,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:20,padding:32,width:320,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",alignItems:"center",gap:20,animation:"fadeUp 0.2s ease" }}>
        <div style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span style={{ fontWeight:700,fontSize:14,color:C.primaryDark }}>Employee QR Code</span>
          <button onClick={onClose} style={{ border:"none",background:C.surface2,borderRadius:7,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <X size={13} color={C.outerGreen} />
          </button>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:42,height:42,borderRadius:11,background:AVATAR_COLORS[emp.id]??C.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13 }}>{emp.avatar}</div>
          <div>
            <div style={{ fontWeight:700,color:C.primaryDark,fontSize:13 }}>{emp.name}</div>
            <div style={{ fontSize:11,color:C.outerGreen }}>{emp.id}</div>
          </div>
        </div>
        <div style={{ width:180,height:180,background:C.surface2,borderRadius:12,border:`2px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {[[10,10],[10,110],[110,10]].map(([x,y],i)=>(
              <g key={i}>
                <rect x={x} y={y} width={40} height={40} rx={3} fill={C.primaryDark}/>
                <rect x={x+6} y={y+6} width={28} height={28} rx={2} fill="#fff"/>
                <rect x={x+12} y={y+12} width={16} height={16} rx={1} fill={C.primaryDark}/>
              </g>
            ))}
            {Array.from({length:80}).map((_,i)=>{
              const col=i%10,row=Math.floor(i/10);
              if((col<4&&row<4)||(col<4&&row>6)||(col>6&&row<4)) return null;
              if((i*37+13)%3===0) return null;
              return <rect key={i} x={10+col*14} y={10+row*14} width={11} height={11} rx={1.5} fill={C.primaryDark}/>;
            })}
          </svg>
        </div>
        <div style={{ background:C.surface2,borderRadius:9,padding:"8px 14px",fontSize:10,fontFamily:"monospace",color:C.outerGreen,letterSpacing:"0.06em",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:7 }}>
          <Shield size={10} color={C.primary}/>{token}
        </div>
        <button style={{ width:"100%",padding:"10px",borderRadius:10,border:"none",background:C.primary,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7 }}>
          <Download size={13}/> Download QR Code
        </button>
        <p style={{ margin:0,fontSize:10,color:C.outerGreen,textAlign:"center",lineHeight:1.5 }}>
          Secure token only — no raw personal data embedded in payload.
        </p>
      </div>
    </div>
  );
}

// ─── Add Employee Modal ───────────────────────────────────────────────────────
function AddEmployeeModal({ onClose, onAdd }: { onClose:()=>void; onAdd:(e:Employee)=>void }) {
  const depts = ["Operations","HR","Finance","IT","Sales","Marketing"];
  const [form,setForm] = useState({ name:"",department:"Operations",email:"",phone:"" });
  const set = (k:string,v:string) => setForm(f=>({...f,[k]:v}));
  const lbl: React.CSSProperties = { fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase" as const,color:C.outerGreen,marginBottom:4,display:"block" };
  const inp: React.CSSProperties = { width:"100%",padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.border}`,background:"#fff",fontSize:12,color:C.primaryDark,fontFamily:"inherit",outline:"none",boxSizing:"border-box" as const };
  const handleAdd = () => {
    if (!form.name||!form.email) return;
    const id = `EMP-${String(Math.floor(Math.random()*900+100))}`;
    onAdd({...form,id,status:"Active",dateAdded:new Date().toISOString().split("T")[0],avatar:form.name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase()});
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(15,23,42,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:20,padding:28,width:380,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",gap:16 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span style={{ fontWeight:800,fontSize:15,color:C.primaryDark }}>Add New Employee</span>
          <button onClick={onClose} style={{ border:"none",background:C.surface2,borderRadius:7,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <X size={13} color={C.outerGreen}/>
          </button>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div><label style={lbl}>Full Name *</label><input style={inp} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Jane Smith"/></div>
          <div><label style={lbl}>Department</label><select style={{...inp,appearance:"none"}} value={form.department} onChange={e=>set("department",e.target.value)}>{depts.map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={lbl}>Email *</label><input style={inp} type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jane@example.com"/></div>
          <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+44 7700 900000"/></div>
        </div>
        <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ padding:"9px 18px",borderRadius:9,border:`1px solid ${C.border}`,background:"#fff",color:C.primaryDark,fontSize:12,fontWeight:600,cursor:"pointer" }}>Cancel</button>
          <button onClick={handleAdd} style={{ padding:"9px 18px",borderRadius:9,border:"none",background:C.primary,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer" }}>Add Employee</button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon:Icon, accent, trend }: { value:number; label:string; icon:React.ElementType; accent?:boolean; trend?:string }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 20px",borderRadius:14,background:accent?"linear-gradient(135deg,#ecfdf5,#d1fae5)":"#fff",border:`1px solid ${accent?"rgba(22,163,74,0.2)":C.border}` }}>
      <div style={{ width:40,height:40,borderRadius:11,background:accent?"rgba(22,163,74,0.15)":C.surface2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        <Icon size={17} color={C.primary} strokeWidth={2}/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:24,fontWeight:800,color:C.primaryDark,lineHeight:1,letterSpacing:"-0.03em" }}>{value}</div>
        <div style={{ fontSize:11,color:C.outerGreen,marginTop:3 }}>{label}</div>
      </div>
      {trend && <div style={{ display:"flex",alignItems:"center",gap:3,fontSize:10,color:C.primary,fontWeight:600 }}><TrendingUp size={11}/> {trend}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeesPage() {
  const [employees,setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [query,setQuery] = useState("");
  const [statusFilter,setStatusFilter] = useState<"all"|EmployeeStatus>("all");
  const [departmentFilter,setDepartmentFilter] = useState("all");
  const [qrEmp,setQrEmp] = useState<Employee|null>(null);
  const [showAdd,setShowAdd] = useState(false);
  const [deleteId,setDeleteId] = useState<string|null>(null);

  const departments = useMemo(()=>Array.from(new Set(employees.map(e=>e.department))),[employees]);

  const filtered = useMemo(()=>employees.filter(emp=>{
    const q=query.trim().toLowerCase();
    return (!q||emp.name.toLowerCase().includes(q)||emp.id.toLowerCase().includes(q)||emp.email.toLowerCase().includes(q))&&
      (statusFilter==="all"||emp.status===statusFilter)&&
      (departmentFilter==="all"||emp.department===departmentFilter);
  }),[employees,query,statusFilter,departmentFilter]);

  const activeCount   = employees.filter(e=>e.status==="Active").length;
  const inactiveCount = employees.filter(e=>e.status==="Inactive").length;

  const toggleStatus = (id:string) => setEmployees(prev=>prev.map(e=>e.id===id?{...e,status:e.status==="Active"?"Inactive":"Active"}:e));
  const handleDelete = (id:string) => { setEmployees(prev=>prev.filter(e=>e.id!==id)); setDeleteId(null); };

  const inputStyle: React.CSSProperties = { padding:"8px 12px",borderRadius:9,border:`1.5px solid ${C.border}`,background:"#fff",fontSize:12,color:C.primaryDark,fontFamily:"inherit",outline:"none" };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .emp-row:hover td { background:${C.surface} !important; }
      `}</style>

      {qrEmp && <QRModal emp={qrEmp} onClose={()=>setQrEmp(null)}/>}
      {showAdd && <AddEmployeeModal onClose={()=>setShowAdd(false)} onAdd={emp=>setEmployees(prev=>[...prev,emp])}/>}

      {deleteId && (
        <div onClick={()=>setDeleteId(null)} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(15,23,42,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:16,padding:28,width:320,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",textAlign:"center" }}>
            <div style={{ width:44,height:44,borderRadius:12,background:"#fef2f2",border:"1px solid rgba(220,38,38,0.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
              <Trash2 size={18} color={C.red}/>
            </div>
            <div style={{ fontWeight:700,fontSize:14,color:C.primaryDark,marginBottom:8 }}>Delete Employee?</div>
            <div style={{ fontSize:12,color:C.outerGreen,marginBottom:22 }}>This will permanently remove the employee record and their QR code. This action cannot be undone.</div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1,padding:"9px",borderRadius:9,border:`1px solid ${C.border}`,background:"#fff",color:C.primaryDark,fontSize:12,fontWeight:600,cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>handleDelete(deleteId)} style={{ flex:1,padding:"9px",borderRadius:9,border:"none",background:C.red,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex",flexDirection:"column",gap:22 }}>

        {/* Header */}
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:6 }}>
              <div style={{ width:34,height:34,borderRadius:9,background:C.surface2,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Users size={16} color={C.primary}/>
              </div>
              <h1 style={{ fontSize:22,fontWeight:800,color:C.primaryDark,margin:0,letterSpacing:"-0.03em" }}>Employee Management</h1>
            </div>
            <p style={{ fontSize:12,color:C.outerGreen,margin:0 }}>Manage employee records and their QR codes linked to attendance.</p>
          </div>
          <div style={{ display:"flex",gap:9 }}>
            <button style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 15px",borderRadius:9,cursor:"pointer",border:`1px solid ${C.border}`,background:"#fff",color:C.primaryDark,fontSize:12,fontWeight:600 }}>
              <Upload size={13}/> Bulk Import
            </button>
            <button onClick={()=>setShowAdd(true)} style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 15px",borderRadius:9,cursor:"pointer",border:"none",background:C.primary,color:"#fff",fontSize:12,fontWeight:700 }}>
              <UserPlus size={13}/> Add Employee
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12 }}>
          <StatCard value={employees.length} label="Total Employees" icon={Users} trend="+3 this month"/>
          <StatCard value={activeCount}       label="Active"          icon={BadgeCheck} accent/>
          <StatCard value={inactiveCount}     label="Inactive"        icon={CircleDashed}/>
          <StatCard value={departments.length} label="Departments"    icon={Building2}/>
        </div>

        {/* Table card */}
        <div style={{ background:"#fff",borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden" }}>

          {/* Filters */}
          <div style={{ padding:"16px 20px",borderBottom:`1px solid ${C.surface2}`,display:"flex",alignItems:"flex-end",flexWrap:"wrap",gap:14 }}>
            <div style={{ display:"flex",flexDirection:"column",gap:5,flex:"1 1 220px",minWidth:200 }}>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.outerGreen }}>Search</span>
              <div style={{ position:"relative" }}>
                <Search size={13} color={C.outerGreen} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <input type="text" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name, ID, or email…" style={{ ...inputStyle,paddingLeft:30,width:"100%",boxSizing:"border-box" }}/>
              </div>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.outerGreen }}>Department</span>
              <div style={{ position:"relative" }}>
                <Building2 size={13} color={C.outerGreen} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <ChevronDown size={12} color={C.outerGreen} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <select value={departmentFilter} onChange={e=>setDepartmentFilter(e.target.value)} style={{ ...inputStyle,paddingLeft:30,paddingRight:28,appearance:"none",width:160,cursor:"pointer" }}>
                  <option value="all">All Departments</option>
                  {departments.map(d=><option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.outerGreen }}>Status</span>
              <div style={{ display:"flex",gap:3,background:C.surface2,borderRadius:10,padding:4,border:`1px solid ${C.border}` }}>
                {(["all","Active","Inactive"] as const).map(o=>{
                  const on=statusFilter===o;
                  return <button key={o} onClick={()=>setStatusFilter(o)} style={{ padding:"5px 14px",borderRadius:7,border:"none",background:on?"#fff":"transparent",color:on?C.primaryDark:C.outerGreen,fontWeight:on?700:500,fontSize:11,cursor:"pointer" }}>{o==="all"?"All":o}</button>;
                })}
              </div>
            </div>

            <span style={{ marginLeft:"auto",fontSize:11,color:C.outerGreen,alignSelf:"flex-end",paddingBottom:2 }}>
              {filtered.length} of {employees.length} employees
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
              <thead>
                <tr style={{ background:C.surface,borderBottom:`1px solid ${C.border}` }}>
                  {["Employee","Department","Contact","Status","Added","QR Code","Actions"].map(h=>(
                    <th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:10,fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",color:C.outerGreen,whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length===0 ? (
                  <tr><td colSpan={7} style={{ textAlign:"center",padding:"48px 20px",color:C.outerGreen,fontSize:13 }}>No employees match the current filters.</td></tr>
                ) : filtered.map((emp,i)=>{
                  const isActive = emp.status==="Active";
                  return (
                    <tr key={emp.id} className="emp-row" style={{ borderBottom:i<filtered.length-1?`1px solid ${C.surface2}`:"none" }}>

                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:11 }}>
                          <div style={{ width:36,height:36,borderRadius:10,flexShrink:0,background:AVATAR_COLORS[emp.id]??C.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,opacity:isActive?1:0.45 }}>{emp.avatar}</div>
                          <div>
                            <div style={{ fontWeight:600,color:isActive?C.primaryDark:C.outerGreen }}>{emp.name}</div>
                            <div style={{ fontSize:10,color:C.outerGreen,opacity:0.7,marginTop:1 }}>{emp.id}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:6,background:C.surface2,color:C.primaryDark,fontSize:11,fontWeight:500 }}>
                          <Building2 size={10} color={C.outerGreen}/>{emp.department}
                        </span>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
                          <span style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.primaryDark }}><Mail size={10} color={C.outerGreen}/>{emp.email}</span>
                          <span style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,color:C.outerGreen }}><Phone size={10} color={C.outerGreen}/>{emp.phone}</span>
                        </div>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:isActive?"#ecfdf5":C.surface2,color:isActive?C.primary:C.outerGreen,border:`1px solid ${isActive?"rgba(22,163,74,0.2)":C.border}` }}>
                          <span style={{ width:6,height:6,borderRadius:"50%",background:isActive?C.primary:C.outerGreen,flexShrink:0 }}/>
                          {emp.status}
                        </span>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <span style={{ display:"inline-flex",alignItems:"center",gap:5,fontSize:11,color:C.outerGreen,whiteSpace:"nowrap" }}>
                          <CalendarDays size={11} color={C.outerGreen}/>
                          {new Date(emp.dateAdded).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}
                        </span>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <button onClick={()=>setQrEmp(emp)} style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"6px 13px",borderRadius:8,cursor:"pointer",border:`1.5px solid ${C.border}`,background:"#fff",color:C.primaryDark,fontSize:11,fontWeight:600,whiteSpace:"nowrap" }}>
                          <QrCode size={13} color={C.primary}/> View QR
                        </button>
                      </td>

                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ display:"flex",gap:6,alignItems:"center",flexWrap:"wrap" }}>
                          <button style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:8,cursor:"pointer",border:`1px solid ${C.border}`,background:"#fff",color:C.primaryDark,fontSize:11,fontWeight:600 }}>
                            <Pencil size={11}/> Edit
                          </button>
                          <button onClick={()=>toggleStatus(emp.id)} style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:8,cursor:"pointer",border:`1px solid ${C.border}`,background:C.surface2,color:C.primaryDark,fontSize:11,fontWeight:600 }}>
                            {isActive
                              ? <><ToggleLeft size={12} color={C.outerGreen}/> Deactivate</>
                              : <><ToggleRight size={12} color={C.primary}/> Activate</>}
                          </button>
                          <button onClick={()=>setDeleteId(emp.id)} style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:8,cursor:"pointer",border:"1px solid rgba(220,38,38,0.2)",background:"#fef2f2",color:C.red,fontSize:11,fontWeight:600 }}>
                            <Trash2 size={11}/> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ padding:"12px 20px",borderTop:`1px solid ${C.surface2}`,display:"flex",alignItems:"center",gap:8 }}>
            <Shield size={12} color={C.outerGreen}/>
            <span style={{ fontSize:11,color:C.outerGreen }}>Each employee QR encodes a <strong>secure token only</strong> — no raw personal data is embedded in the QR payload.</span>
          </div>
        </div>
      </div>
    </>
  );
}
