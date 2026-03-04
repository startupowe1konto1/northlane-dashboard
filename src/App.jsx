import { useState, useMemo } from "react";

const clients = [
  { id:1, name:"A2MAC1", desc:"Automotive benchmarking & engineering insights", industry:"Verticals", phase:"Established", vcs:["Providence Equity Partners"], competitors:["Caresoft Global","Munro & Associates","e-Cube"] },
  { id:2, name:"DeepL", desc:"AI-powered translation platform", industry:"Data & AI", phase:"Growth", vcs:["Index Ventures","ICONIQ Growth","IVP","Atomico","Sequoia","Bessemer"], competitors:["Google Translate","Grammarly","Phrase"] },
  { id:3, name:"Superhuman", desc:"AI productivity email suite", industry:"Business Apps", phase:"Growth", vcs:["General Catalyst","IVP","a16z","Tiger Global"], competitors:["Hey","Spark","Front"] },
  { id:4, name:"n8n", desc:"Workflow automation platform", industry:"Business Apps", phase:"Growth", vcs:["Accel","Redpoint","Visionaries Club","Sequoia","Felicis","Highland Europe","HV Capital"], competitors:["Make","Zapier","Workato"] },
  { id:5, name:"Synthesia", desc:"AI video for enterprise", industry:"Data & AI", phase:"Growth", vcs:["GV","NEA","Kleiner Perkins","Accel","Firstmark"], competitors:["HeyGen","D-ID","Colossyan"] },
  { id:6, name:"Squire", desc:"Barbershop operating system", industry:"Verticals", phase:"Growth", vcs:["Tiger Global","ICONIQ Growth","CRV","Y Combinator"], competitors:["Booksy","Fresha","Vagaro"] },
  { id:7, name:"Nory", desc:"AI ops for restaurants", industry:"Verticals", phase:"Venture", vcs:["Accel","Kinnevik"], competitors:["Tenzo","MarketMan","Apicbase"] },
  { id:8, name:"Finom", desc:"SME banking OS", industry:"Fintech", phase:"Growth", vcs:["General Catalyst","Northzone","Headline"], competitors:["Qonto","Tide","Revolut Business"] },
  { id:9, name:"Camunda", desc:"Process orchestration platform", industry:"Dev & Cloud", phase:"Growth", vcs:["Insight Partners","Highland Europe"], competitors:["Appian","Pega","Bizagi"] },
  { id:10, name:"Katana", desc:"Manufacturing ERP for SMBs", industry:"Business Apps", phase:"Growth", vcs:["Northzone","Atomico"], competitors:["MRPeasy","Odoo","Unleashed"] },
  { id:11, name:"Aiven", desc:"Managed open-source data infrastructure", industry:"Dev & Cloud", phase:"Growth", vcs:["IVP","Eurazeo","Blackrock","Atomico"], competitors:["Confluent","Instaclustr","MongoDB Atlas"] },
  { id:12, name:"Source.ag", desc:"AI-driven greenhouse management", industry:"Verticals", phase:"Venture", vcs:["Astanor Ventures","Acre Venture Partners"], competitors:["Blue Radix","IUNU","WayBeyond"] },
  { id:13, name:"Koppla", desc:"Procurement workflow automation", industry:"Business Apps", phase:"Venture", vcs:["Newion","Earlybird"], competitors:["Sablono","Procore","Touchplan"] },
  { id:14, name:"Yoco", desc:"Payments for African SMEs", industry:"Fintech", phase:"Growth", vcs:["Partech","Velocity Capital"], competitors:["Paystack","Flutterwave","iKhokha"] },
  { id:15, name:"Wagestream", desc:"Financial wellbeing for workers", industry:"Fintech", phase:"Growth", vcs:["Smash Capital","Balderton","Northzone","Blackrock"], competitors:["DailyPay","Payactiv","CloudPay"] },
  { id:16, name:"Leadinfo", desc:"B2B website visitor identification", industry:"Business Apps", phase:"Established", vcs:["Team.blue"], competitors:["Leadfeeder","Snitcher","Albacross"] },
  { id:17, name:"Noda", desc:"Smart building intelligence", industry:"Verticals", phase:"Growth", vcs:["Northzone"], competitors:["BrainBox AI","Gridium","Priva"] },
  { id:18, name:"Next Matter", desc:"Process orchestration for ops", industry:"Business Apps", phase:"Venture", vcs:["OMERS Ventures","BlueYard","Crane Venture Partners"], competitors:["Kissflow","Pipefy","Process Street"] },
  { id:19, name:"Cogna", desc:"AI precision for industrial work", industry:"Data & AI", phase:"Venture", vcs:["Notion Capital","Hoxton Ventures"], competitors:["Palantir","C3.ai","SparkCognition"] },
  { id:20, name:"Strise", desc:"Anti-financial crime AI", industry:"Fintech", phase:"Venture", vcs:["Atomico","Curiosity VC","Maki.vc"], competitors:["ComplyAdvantage","Quantexa","Hawk AI"] },
  { id:21, name:"ChannelEngine", desc:"Marketplace integration platform", industry:"Business Apps", phase:"Growth", vcs:["Atomico","General Catalyst","INKEF"], competitors:["Channable","Linnworks","ChannelAdvisor"] },
  { id:22, name:"Timeseer", desc:"Time-series data observability", industry:"Data & AI", phase:"Venture", vcs:["Crane Venture Partners","Fortino Capital","Smartfin Capital"], competitors:["Seeq","TrendMiner","Cognite"] },
  { id:23, name:"Cerbos", desc:"Authorization-as-code", industry:"Dev & Cloud", phase:"Venture", vcs:["OMERS Ventures","Crane Venture Partners"], competitors:["Oso","Permit.io","Aserto"] },
  { id:24, name:"Job&Talent", desc:"Digital temporary staffing", industry:"Verticals", phase:"Growth", vcs:["Atomico","Kinnevik","Blackrock","InfraVia"], competitors:["Zenjob","Coople","Randstad"] },
  { id:25, name:"Workwize", desc:"IT equipment for distributed teams", industry:"Business Apps", phase:"Venture", vcs:["Klass Capital","Peak","Graduate Entrepreneur Fund"], competitors:["Hofy","Firstbase","GroWrk"] },
  { id:26, name:"Digitail", desc:"Veterinary practice management", industry:"Verticals", phase:"Venture", vcs:["Atomico","byFounders","Gradient Ventures","Partech"], competitors:["ezyVet","Covetrus","Hippo Manager"] },
  { id:27, name:"Deskbird", desc:"Workplace management (hybrid)", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Robin","Envoy","Condeco"] },
  { id:28, name:"Sellsy", desc:"CRM & financial mgmt for SMBs", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Teamleader","Axonaut","Pipedrive"] },
  { id:29, name:"Meisterwerk", desc:"Workforce mgmt for retail", industry:"Verticals", phase:"Venture", vcs:[], competitors:["ToolTime","Plancraft","HERO Software"] },
  { id:30, name:"Factorial", desc:"All-in-one HR for SMBs", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Personio","BambooHR","HiBob"] },
  { id:31, name:"Smartpricing", desc:"Revenue mgmt for hospitality", industry:"Verticals", phase:"Growth", vcs:[], competitors:["RoomPriceGenie","PriceLabs","Duetto"] },
  { id:32, name:"Portainer", desc:"Container management platform", industry:"Dev & Cloud", phase:"Growth", vcs:[], competitors:["Rancher","OpenShift","Docker Desktop"] },
  { id:33, name:"GovDash", desc:"Government contract intelligence", industry:"Data & AI", phase:"Venture", vcs:[], competitors:["GovSpend","Deltek","HigherGov"] },
  { id:34, name:"SurePay", desc:"Payment verification & fraud prevention", industry:"Fintech", phase:"Growth", vcs:[], competitors:["SEPAmail","Bottomline","iProov"] },
  { id:35, name:"MobieTrain", desc:"Microlearning for frontline", industry:"Business Apps", phase:"Venture", vcs:[], competitors:["EdApp","Axonify","YOOBIC"] },
  { id:36, name:"Settly", desc:"Relocation management", industry:"Business Apps", phase:"Venture", vcs:[], competitors:["Localyze","Perchpeek","Jobbatical"] },
  { id:37, name:"Dexter Energy", desc:"AI forecasting for renewables", industry:"Data & AI", phase:"Venture", vcs:[], competitors:["eSmart Systems","GridBeyond","Volue"] },
  { id:38, name:"Foleon", desc:"Interactive content creation", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Turtl","Ceros","Relayto"] },
  { id:39, name:"Wiley", desc:"Global research & education publisher", industry:"Verticals", phase:"Established", vcs:[], competitors:["Elsevier","Springer Nature","Taylor & Francis"] },
  { id:40, name:"IQGeo", desc:"Geospatial network management", industry:"Dev & Cloud", phase:"Established", vcs:[], competitors:["Esri","GE Smallworld","Bentley Systems"] },
  { id:41, name:"MAPAL Group", desc:"Hospitality management software", industry:"Verticals", phase:"Growth", vcs:[], competitors:["Fourth","Harri","Bizimply"] },
  { id:42, name:"ComplianceWise", desc:"AML/KYC for accountants", industry:"Fintech", phase:"Venture", vcs:[], competitors:["First AML","ComplyAdvantage","Onfido"] },
  { id:43, name:"Nextlane", desc:"Connected automotive retail (DMS)", industry:"Verticals", phase:"Established", vcs:["PSG Equity"], competitors:["CDK Global","Reynolds and Reynolds","Keyloop"] },
  { id:44, name:"CHILI publish", desc:"Creative automation platform", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Celtra","Bynder","Marq"] },
  { id:45, name:"TextMagic", desc:"SMS & business messaging", industry:"Business Apps", phase:"Growth", vcs:[], competitors:["Twilio","Sinch","Clickatell"] },
  { id:46, name:"AIHR", desc:"Online academy for HR", industry:"Verticals", phase:"Growth", vcs:[], competitors:["Josh Bersin Academy","HRCI","SHRM"] },
  { id:47, name:"The Access Group", desc:"Cloud ERP & business management", industry:"Business Apps", phase:"Established", vcs:["Hg","TA Associates"], competitors:["Sage","Advanced","Visma"] },
];

const industryColors = {
  "Data & AI": { bg: "#0D1B2A", text: "#4FC3F7", border: "#4FC3F7" },
  "Fintech": { bg: "#0D1B2A", text: "#66BB6A", border: "#66BB6A" },
  "Dev & Cloud": { bg: "#0D1B2A", text: "#AB47BC", border: "#AB47BC" },
  "Business Apps": { bg: "#0D1B2A", text: "#FFA726", border: "#FFA726" },
  "Verticals": { bg: "#0D1B2A", text: "#EF5350", border: "#EF5350" },
};

const phaseStyles = {
  "Venture": { bg: "#1a237e", text: "#90CAF9", label: "🌱" },
  "Growth": { bg: "#004D40", text: "#80CBC4", label: "🚀" },
  "Established": { bg: "#4A148C", text: "#CE93D8", label: "🏛️" },
};

export default function NorthlaneDashboard() {
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterPhase, setFilterPhase] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return clients.filter(c => {
      if (filterIndustry !== "All" && c.industry !== filterIndustry) return false;
      if (filterPhase !== "All" && c.phase !== filterPhase) return false;
      return true;
    });
  }, [filterIndustry, filterPhase]);

  const industries = ["All", ...Object.keys(industryColors)];
  const phases = ["All", "Venture", "Growth", "Established"];

  // Stats
  const vcMap = useMemo(() => {
    const m = {};
    clients.forEach(c => c.vcs.forEach(v => { m[v] = (m[v] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, []);

  const industryStats = useMemo(() => {
    const m = {};
    clients.forEach(c => { m[c.industry] = (m[c.industry] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, []);

  const phaseStats = useMemo(() => {
    const m = {};
    clients.forEach(c => { m[c.phase] = (m[c.phase] || 0) + 1; });
    return m;
  }, []);

  const totalCompetitors = clients.length * 3;

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      background: "#080C14",
      color: "#E0E0E0",
      minHeight: "100vh",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f1a; }
        ::-webkit-scrollbar-thumb { background: #1a2744; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .card-enter { animation: fadeIn 0.4s ease-out forwards; }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
        .glow { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
        .btn-filter { 
          border: 1px solid #1a2744; background: transparent; color: #8892a4; 
          padding: 6px 14px; cursor: pointer; font-size: 11px; font-family: inherit;
          transition: all 0.2s; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;
        }
        .btn-filter:hover { border-color: #4FC3F7; color: #4FC3F7; }
        .btn-filter.active { border-color: #4FC3F7; color: #4FC3F7; background: rgba(79,195,247,0.08); }
        .client-card {
          border: 1px solid #1a2744; background: #0a0f1a; padding: 16px; cursor: pointer;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .client-card:hover { border-color: #4FC3F7; transform: translateY(-2px); box-shadow: 0 4px 20px rgba(79,195,247,0.1); }
        .client-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
        }
        .comp-chip {
          display: inline-block; padding: 3px 10px; border: 1px solid #2a1a1a;
          font-size: 10px; color: #ef9a9a; background: rgba(239,83,80,0.06);
          margin: 2px; border-radius: 1px; letter-spacing: 0.5px;
        }
        .vc-chip {
          display: inline-block; padding: 3px 10px; border: 1px solid #1a2a1a;
          font-size: 10px; color: #a5d6a7; background: rgba(102,187,106,0.06);
          margin: 2px; border-radius: 1px;
        }
        .stat-box {
          border: 1px solid #1a2744; padding: 20px; background: #0a0f1a;
          position: relative; overflow: hidden;
        }
        .stat-box::after {
          content: ''; position: absolute; top: 0; right: 0; width: 60px; height: 60px;
          background: radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 70%);
        }
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(8,12,20,0.9); z-index: 100; display: flex;
          align-items: center; justify-content: center; backdrop-filter: blur(4px);
        }
        .modal-content {
          background: #0d1320; border: 1px solid #1a2744; max-width: 680px; width: 90%;
          padding: 32px; position: relative; max-height: 85vh; overflow-y: auto;
        }
        .bar { height: 6px; background: #1a2744; position: relative; border-radius: 1px; }
        .bar-fill { height: 100%; border-radius: 1px; transition: width 0.8s ease-out; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #1a2744", padding: "24px 32px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #4FC3F7, transparent)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: "#4FC3F7", letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>
              Competitive Intelligence // Northlane Partners
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: -0.5 }}>
              CLIENT & COMPETITOR MAP
            </h1>
            <div style={{ fontSize: 11, color: "#5a6577", marginTop: 4 }}>
              {clients.length} clients → {totalCompetitors} competitor targets → {vcMap.length} VC/PE funds tracked
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4FC3F7", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#4FC3F7", letterSpacing: 1 }}>LIVE INTEL</span>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, padding: "1px 32px", margin: "24px 0" }}>
        {[
          { label: "TOTAL CLIENTS", value: clients.length, accent: "#4FC3F7" },
          { label: "COMPETITOR TARGETS", value: totalCompetitors, accent: "#EF5350" },
          { label: "VC/PE FUNDS", value: vcMap.length, accent: "#66BB6A" },
          { label: "VENTURE STAGE", value: phaseStats["Venture"] || 0, accent: "#90CAF9" },
          { label: "GROWTH STAGE", value: phaseStats["Growth"] || 0, accent: "#80CBC4" },
          { label: "ESTABLISHED", value: phaseStats["Established"] || 0, accent: "#CE93D8" },
        ].map((s, i) => (
          <div key={i} className="stat-box">
            <div style={{ fontSize: 9, color: "#5a6577", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: s.accent, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* INDUSTRY BREAKDOWN BAR */}
      <div style={{ padding: "0 32px", marginBottom: 24 }}>
        <div style={{ fontSize: 9, color: "#5a6577", letterSpacing: 2, marginBottom: 8 }}>INDUSTRY DISTRIBUTION</div>
        <div style={{ display: "flex", height: 8, borderRadius: 1, overflow: "hidden", gap: 2 }}>
          {industryStats.map(([ind, count]) => (
            <div key={ind} style={{
              flex: count, background: industryColors[ind]?.border || "#444",
              opacity: filterIndustry === "All" || filterIndustry === ind ? 1 : 0.2,
              transition: "all 0.3s", cursor: "pointer", position: "relative",
            }}
              onClick={() => setFilterIndustry(filterIndustry === ind ? "All" : ind)}
              title={`${ind}: ${count}`}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
          {industryStats.map(([ind, count]) => (
            <div key={ind} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#8892a4" }}>
              <div style={{ width: 8, height: 8, background: industryColors[ind]?.border, borderRadius: 1 }} />
              {ind} ({count})
            </div>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ padding: "0 32px", marginBottom: 24, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "#5a6577", letterSpacing: 2, marginRight: 8 }}>FILTER</span>
        {industries.map(ind => (
          <button key={ind} className={`btn-filter ${filterIndustry === ind ? "active" : ""}`}
            onClick={() => setFilterIndustry(ind)}
            style={ind !== "All" ? { borderColor: filterIndustry === ind ? industryColors[ind]?.border : undefined, color: filterIndustry === ind ? industryColors[ind]?.text : undefined } : {}}>
            {ind}
          </button>
        ))}
        <span style={{ width: 1, height: 20, background: "#1a2744", margin: "0 8px" }} />
        {phases.map(p => (
          <button key={p} className={`btn-filter ${filterPhase === p ? "active" : ""}`}
            onClick={() => setFilterPhase(p)}>
            {p !== "All" ? phaseStyles[p].label + " " : ""}{p}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#5a6577" }}>
          Showing {filtered.length} of {clients.length}
        </span>
      </div>

      {/* CLIENT GRID */}
      <div style={{ padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12, paddingBottom: 32 }}>
        {filtered.map((c, i) => {
          const ic = industryColors[c.industry];
          const ps = phaseStyles[c.phase];
          return (
            <div key={c.id} className="client-card card-enter"
              style={{ animationDelay: `${i * 0.03}s`, borderLeftColor: ic.border }}
              onClick={() => setSelectedClient(c)}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: ic.border }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: "#5a6577", marginTop: 2, lineHeight: 1.4 }}>{c.desc}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${ic.border}`, color: ic.text, borderRadius: 1, letterSpacing: 0.5 }}>
                    {c.industry}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 12 }}>{ps.label}</span>
                <span style={{ fontSize: 9, color: ps.text, letterSpacing: 1 }}>{c.phase.toUpperCase()}</span>
                {c.vcs.length > 0 && (
                  <span style={{ fontSize: 9, color: "#66BB6A", marginLeft: "auto" }}>
                    {c.vcs.length} VC{c.vcs.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 9, color: "#EF5350", letterSpacing: 1.5, marginBottom: 6 }}>
                ⚔ COMPETITOR TARGETS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {c.competitors.map((comp, j) => (
                  <span key={j} className="comp-chip">{comp}</span>
                ))}
              </div>
              {c.vcs.length > 0 && (
                <>
                  <div style={{ fontSize: 9, color: "#66BB6A", letterSpacing: 1.5, marginTop: 10, marginBottom: 4 }}>
                    $ INVESTORS
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                    {c.vcs.slice(0, 4).map((vc, j) => (
                      <span key={j} className="vc-chip">{vc}</span>
                    ))}
                    {c.vcs.length > 4 && <span className="vc-chip">+{c.vcs.length - 4}</span>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* TOP VC FUNDS SECTION */}
      <div style={{ padding: "32px", borderTop: "1px solid #1a2744" }}>
        <div style={{ fontSize: 9, color: "#66BB6A", letterSpacing: 3, marginBottom: 4 }}>NETWORK ANALYSIS</div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", margin: "0 0 20px 0" }}>
          Top VC/PE Funds by Northlane Client Count
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 12 }}>
          {vcMap.slice(0, 16).map(([vc, count], i) => (
            <div key={vc} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
              <div style={{ width: 28, textAlign: "right", fontSize: 10, color: "#5a6577", fontFamily: "'JetBrains Mono', monospace" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{vc}</span>
                  <span style={{ fontSize: 12, color: "#66BB6A", fontWeight: 700 }}>{count}</span>
                </div>
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${(count / vcMap[0][1]) * 100}%`, background: `linear-gradient(90deg, #66BB6A, #4FC3F7)` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: 16, border: "1px solid #2a1a00", background: "rgba(255,167,38,0.04)" }}>
          <div style={{ fontSize: 9, color: "#FFA726", letterSpacing: 2, marginBottom: 6 }}>💡 ACTIONABLE INSIGHT</div>
          <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>
            <strong style={{ color: "#FFA726" }}>Atomico</strong> ({vcMap.find(v => v[0] === "Atomico")?.[1] || 0} clients) is Northlane's #1 VC pipeline source.
            Johan van der Poel is an Atomico Expert Network advisor.
            Target: contact Atomico portfolio companies that are NOT yet Northlane clients.
            <br /><br />
            <strong style={{ color: "#FFA726" }}>FOMO Strategy:</strong> Each competitor card above = a potential outbound lead.
            Message: "Your competitor [X] optimized pricing with a top-tier consultancy. Let's make sure you're not leaving money on the table."
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedClient(null)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#5a6577", cursor: "pointer", fontSize: 18, fontFamily: "inherit" }}>
              ✕
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 40, background: industryColors[selectedClient.industry]?.border }} />
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>
                  {selectedClient.name}
                </h2>
                <div style={{ fontSize: 11, color: "#5a6577" }}>{selectedClient.desc}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div className="stat-box">
                <div style={{ fontSize: 9, color: "#5a6577", letterSpacing: 1.5, marginBottom: 4 }}>INDUSTRY</div>
                <div style={{ fontSize: 14, color: industryColors[selectedClient.industry]?.text, fontWeight: 600 }}>{selectedClient.industry}</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize: 9, color: "#5a6577", letterSpacing: 1.5, marginBottom: 4 }}>GROWTH PHASE</div>
                <div style={{ fontSize: 14, color: phaseStyles[selectedClient.phase]?.text, fontWeight: 600 }}>
                  {phaseStyles[selectedClient.phase]?.label} {selectedClient.phase}
                </div>
              </div>
            </div>

            {selectedClient.vcs.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 9, color: "#66BB6A", letterSpacing: 2, marginBottom: 8 }}>$ INVESTORS / FUNDS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selectedClient.vcs.map((vc, j) => (
                    <span key={j} style={{ padding: "5px 14px", border: "1px solid #1a3a1a", color: "#a5d6a7", fontSize: 11, background: "rgba(102,187,106,0.06)" }}>
                      {vc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: "#EF5350", letterSpacing: 2, marginBottom: 8 }}>⚔ COMPETITOR TARGETS FOR VALUESHIPS OUTBOUND</div>
              {selectedClient.competitors.map((comp, j) => (
                <div key={j} style={{
                  padding: "12px 16px", border: "1px solid #2a1a1a", marginBottom: 6,
                  background: "rgba(239,83,80,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{comp}</div>
                    <div style={{ fontSize: 10, color: "#5a6577", marginTop: 2 }}>
                      Competes directly with {selectedClient.name} in {selectedClient.industry}
                    </div>
                  </div>
                  <div style={{ fontSize: 9, padding: "4px 10px", border: "1px solid #EF5350", color: "#EF5350", letterSpacing: 1, flexShrink: 0 }}>
                    TARGET
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 14, border: "1px solid #2a2a00", background: "rgba(255,167,38,0.04)" }}>
              <div style={{ fontSize: 9, color: "#FFA726", letterSpacing: 1.5, marginBottom: 6 }}>📧 FOMO OUTREACH TEMPLATE</div>
              <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.6, fontStyle: "italic" }}>
                "Your competitor <strong style={{ color: "#fff" }}>{selectedClient.name}</strong> recently optimized their pricing strategy with a specialized consultancy — and companies in {selectedClient.industry} that do this typically see 20-40% revenue uplift. We help companies like yours ensure they're capturing full value. 15 min to explore?"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
