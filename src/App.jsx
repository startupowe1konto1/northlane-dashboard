import { useState, useMemo } from "react";

const clients = [
  { id:1, name:"A2MAC1", url:"https://www.a2mac1.com", desc:"Automotive benchmarking & engineering insights", industry:"Verticals", phase:"Established", vcs:["Providence Equity Partners"], competitors:[{name:"Caresoft Global",url:"https://caresoftglobal.com"},{name:"Munro & Associates",url:"https://leandesign.com"},{name:"e-Cube",url:"https://e-cube.com"}] },
  { id:2, name:"DeepL", url:"https://www.deepl.com", desc:"AI-powered translation platform", industry:"AI & Data", phase:"Growth", vcs:["Index Ventures","ICONIQ Growth","IVP","Atomico","Sequoia","Bessemer"], competitors:[{name:"Google Translate",url:"https://translate.google.com"},{name:"Grammarly",url:"https://www.grammarly.com"},{name:"Phrase",url:"https://phrase.com"}] },
  { id:3, name:"Superhuman", url:"https://superhuman.com", desc:"AI productivity email suite", industry:"Business Apps", phase:"Growth", vcs:["General Catalyst","IVP","a16z","Tiger Global"], competitors:[{name:"Hey",url:"https://hey.com"},{name:"Spark",url:"https://sparkmailapp.com"},{name:"Front",url:"https://front.com"}] },
  { id:4, name:"n8n", url:"https://n8n.io", desc:"Workflow automation platform", industry:"Business Apps", phase:"Growth", vcs:["Accel","Redpoint","Visionaries Club","Sequoia","Felicis","Highland Europe","HV Capital"], competitors:[{name:"Make",url:"https://www.make.com"},{name:"Zapier",url:"https://zapier.com"},{name:"Workato",url:"https://www.workato.com"}] },
  { id:5, name:"Synthesia", url:"https://www.synthesia.io", desc:"AI video for enterprise", industry:"AI & Data", phase:"Growth", vcs:["GV","NEA","Kleiner Perkins","Accel","Firstmark"], competitors:[{name:"HeyGen",url:"https://www.heygen.com"},{name:"D-ID",url:"https://www.d-id.com"},{name:"Colossyan",url:"https://www.colossyan.com"}] },
  { id:6, name:"Squire", url:"https://getsquire.com", desc:"Barbershop operating system", industry:"Verticals", phase:"Growth", vcs:["Tiger Global","ICONIQ Growth","CRV","Y Combinator"], competitors:[{name:"Booksy",url:"https://booksy.com"},{name:"Fresha",url:"https://www.fresha.com"},{name:"Vagaro",url:"https://www.vagaro.com"}] },
  { id:7, name:"Nory", url:"https://nory.ai", desc:"AI ops for restaurants", industry:"Verticals", phase:"Venture", vcs:["Accel","Kinnevik"], competitors:[{name:"Tenzo",url:"https://tenzo.com"},{name:"MarketMan",url:"https://www.marketman.com"},{name:"Apicbase",url:"https://apicbase.com"}] },
  { id:8, name:"Finom", url:"https://finom.co", desc:"SME banking OS", industry:"Fintech", phase:"Growth", vcs:["General Catalyst","Northzone","Headline"], competitors:[{name:"Qonto",url:"https://qonto.com"},{name:"Tide",url:"https://www.tide.co"},{name:"Revolut Business",url:"https://www.revolut.com"}] },
  { id:9, name:"Camunda", url:"https://camunda.com", desc:"Process orchestration platform", industry:"Dev & Cloud", phase:"Growth", vcs:["Insight Partners","Highland Europe"], competitors:[{name:"Appian",url:"https://appian.com"},{name:"Pega",url:"https://www.pega.com"},{name:"Bizagi",url:"https://www.bizagi.com"}] },
  { id:10, name:"Katana", url:"https://katanamrp.com", desc:"Manufacturing ERP for SMBs", industry:"Business Apps", phase:"Growth", vcs:["Northzone","Atomico"], competitors:[{name:"MRPeasy",url:"https://www.mrpeasy.com"},{name:"Odoo",url:"https://www.odoo.com"},{name:"Unleashed",url:"https://www.unleashedsoftware.com"}] },
  { id:11, name:"Aiven", url:"https://aiven.io", desc:"Managed open-source data infrastructure", industry:"Dev & Cloud", phase:"Growth", vcs:["IVP","Eurazeo","Blackrock","Atomico"], competitors:[{name:"Confluent",url:"https://www.confluent.io"},{name:"Instaclustr",url:"https://www.instaclustr.com"},{name:"MongoDB Atlas",url:"https://www.mongodb.com"}] },
  { id:12, name:"Source.ag", url:"https://source.ag", desc:"AI-driven greenhouse management", industry:"Verticals", phase:"Venture", vcs:["Astanor Ventures","Acre Venture Partners"], competitors:[{name:"Blue Radix",url:"https://blueradix.com"},{name:"IUNU",url:"https://iunu.com"},{name:"WayBeyond",url:"https://www.waybeyond.io"}] },
  { id:13, name:"Koppla", url:"https://koppla.de", desc:"Construction schedule automation", industry:"Business Apps", phase:"Venture", vcs:["Newion","Earlybird"], competitors:[{name:"Sablono",url:"https://www.sablono.com"},{name:"Procore",url:"https://www.procore.com"},{name:"Touchplan",url:"https://touchplan.io"}] },
  { id:14, name:"Yoco", url:"https://www.yoco.com", desc:"Payments for African SMEs", industry:"Fintech", phase:"Growth", vcs:["Partech","Velocity Capital"], competitors:[{name:"Paystack",url:"https://paystack.com"},{name:"Flutterwave",url:"https://flutterwave.com"},{name:"iKhokha",url:"https://www.ikhokha.com"}] },
  { id:15, name:"Wagestream", url:"https://wagestream.com", desc:"Financial wellbeing for workers", industry:"Fintech", phase:"Growth", vcs:["Smash Capital","Balderton","Northzone","Blackrock"], competitors:[{name:"DailyPay",url:"https://www.dailypay.com"},{name:"Payactiv",url:"https://www.payactiv.com"},{name:"CloudPay",url:"https://www.cloudpay.com"}] },
  { id:16, name:"Leadinfo", url:"https://www.leadinfo.com", desc:"B2B website visitor identification", industry:"Business Apps", phase:"Established", vcs:["Team.blue"], competitors:[{name:"Leadfeeder",url:"https://www.leadfeeder.com"},{name:"Snitcher",url:"https://www.snitcher.com"},{name:"Albacross",url:"https://albacross.com"}] },
  { id:17, name:"Noda", url:"https://noda.ai", desc:"Smart building intelligence", industry:"Verticals", phase:"Growth", vcs:["Northzone"], competitors:[{name:"BrainBox AI",url:"https://brainboxai.com"},{name:"Gridium",url:"https://www.gridium.com"},{name:"Priva",url:"https://www.priva.com"}] },
  { id:18, name:"Next Matter", url:"https://www.nextmatter.com", desc:"Process orchestration for ops", industry:"Business Apps", phase:"Venture", vcs:["OMERS Ventures","BlueYard","Crane Venture Partners"], competitors:[{name:"Kissflow",url:"https://kissflow.com"},{name:"Pipefy",url:"https://www.pipefy.com"},{name:"Process Street",url:"https://www.process.st"}] },
  { id:19, name:"Cogna", url:"https://www.cogna.co", desc:"AI precision for industrial work", industry:"AI & Data", phase:"Venture", vcs:["Notion Capital","Hoxton Ventures"], competitors:[{name:"Palantir",url:"https://www.palantir.com"},{name:"C3.ai",url:"https://c3.ai"},{name:"SparkCognition",url:"https://www.sparkcognition.com"}] },
  { id:20, name:"Strise", url:"https://strise.ai", desc:"Anti-financial crime AI", industry:"Fintech", phase:"Venture", vcs:["Atomico","Curiosity VC","Maki.vc"], competitors:[{name:"ComplyAdvantage",url:"https://complyadvantage.com"},{name:"Quantexa",url:"https://www.quantexa.com"},{name:"Hawk AI",url:"https://hawk.ai"}] },
  { id:21, name:"ChannelEngine", url:"https://www.channelengine.com", desc:"Marketplace integration platform", industry:"Business Apps", phase:"Growth", vcs:["Atomico","General Catalyst","INKEF"], competitors:[{name:"Channable",url:"https://www.channable.com"},{name:"Linnworks",url:"https://www.linnworks.com"},{name:"ChannelAdvisor",url:"https://www.channeladvisor.com"}] },
  { id:22, name:"Timeseer", url:"https://timeseer.ai", desc:"Time-series data observability", industry:"AI & Data", phase:"Venture", vcs:["Crane Venture Partners","Fortino Capital","Smartfin Capital"], competitors:[{name:"Seeq",url:"https://www.seeq.com"},{name:"TrendMiner",url:"https://www.trendminer.com"},{name:"Cognite",url:"https://www.cognite.com"}] },
  { id:23, name:"Cerbos", url:"https://cerbos.dev", desc:"Authorization-as-code", industry:"Dev & Cloud", phase:"Venture", vcs:["OMERS Ventures","Crane Venture Partners"], competitors:[{name:"Oso",url:"https://www.osohq.com"},{name:"Permit.io",url:"https://www.permit.io"},{name:"Aserto",url:"https://www.aserto.com"}] },
  { id:24, name:"Job&Talent", url:"https://www.jobandtalent.com", desc:"Digital temporary staffing", industry:"Verticals", phase:"Growth", vcs:["Atomico","Kinnevik","Blackrock","InfraVia"], competitors:[{name:"Zenjob",url:"https://www.zenjob.com"},{name:"Coople",url:"https://www.coople.com"},{name:"Randstad",url:"https://www.randstad.com"}] },
  { id:25, name:"Workwize", url:"https://www.workwize.com", desc:"IT equipment for distributed teams", industry:"Business Apps", phase:"Venture", vcs:["Klass Capital","Peak","Graduate Entrepreneur Fund"], competitors:[{name:"Hofy",url:"https://www.hofy.com"},{name:"Firstbase",url:"https://www.firstbase.com"},{name:"GroWrk",url:"https://growrk.com"}] },
  { id:26, name:"Digitail", url:"https://digitail.io", desc:"Veterinary practice management", industry:"Verticals", phase:"Venture", vcs:["Atomico","byFounders","Gradient Ventures","Partech"], competitors:[{name:"ezyVet",url:"https://www.ezyvet.com"},{name:"Covetrus",url:"https://www.covetrus.com"},{name:"Hippo Manager",url:"https://hippomanager.com"}] },
  { id:27, name:"Deskbird", url:"https://www.deskbird.com", desc:"Workplace management (hybrid)", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Robin",url:"https://robinpowered.com"},{name:"Envoy",url:"https://envoy.com"},{name:"Condeco",url:"https://www.condecosoftware.com"}] },
  { id:28, name:"Sellsy", url:"https://www.sellsy.com", desc:"CRM & financial mgmt for SMBs", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Teamleader",url:"https://www.teamleader.eu"},{name:"Axonaut",url:"https://axonaut.com"},{name:"Pipedrive",url:"https://www.pipedrive.com"}] },
  { id:29, name:"Meisterwerk", url:"https://meisterwerk.app", desc:"Workforce mgmt for craftsmen", industry:"Verticals", phase:"Venture", vcs:[], competitors:[{name:"ToolTime",url:"https://www.tooltime.app"},{name:"Plancraft",url:"https://www.plancraft.com"},{name:"HERO Software",url:"https://www.hero-software.de"}] },
  { id:30, name:"Factorial", url:"https://factorialhr.com", desc:"All-in-one HR for SMBs", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Personio",url:"https://www.personio.com"},{name:"BambooHR",url:"https://www.bamboohr.com"},{name:"HiBob",url:"https://www.hibob.com"}] },
  { id:31, name:"Smartpricing", url:"https://smartpricing.it", desc:"Revenue mgmt for hospitality", industry:"Verticals", phase:"Growth", vcs:[], competitors:[{name:"RoomPriceGenie",url:"https://roompricegenie.com"},{name:"PriceLabs",url:"https://www.pricelabs.co"},{name:"Duetto",url:"https://www.duettocloud.com"}] },
  { id:32, name:"Portainer", url:"https://www.portainer.io", desc:"Container management platform", industry:"Dev & Cloud", phase:"Growth", vcs:[], competitors:[{name:"Rancher",url:"https://www.rancher.com"},{name:"OpenShift",url:"https://www.redhat.com/en/technologies/cloud-computing/openshift"},{name:"Docker Desktop",url:"https://www.docker.com"}] },
  { id:33, name:"GovDash", url:"https://www.govdash.com", desc:"Government contract intelligence", industry:"AI & Data", phase:"Venture", vcs:[], competitors:[{name:"GovSpend",url:"https://govspend.com"},{name:"Deltek",url:"https://www.deltek.com"},{name:"HigherGov",url:"https://www.highergov.com"}] },
  { id:34, name:"SurePay", url:"https://www.surepay.nl", desc:"Payment verification & fraud prevention", industry:"Fintech", phase:"Growth", vcs:[], competitors:[{name:"SEPAmail",url:"https://sepamail.eu"},{name:"Bottomline",url:"https://www.bottomline.com"},{name:"iProov",url:"https://www.iproov.com"}] },
  { id:35, name:"MobieTrain", url:"https://www.mobietrain.com", desc:"Microlearning for frontline", industry:"Business Apps", phase:"Venture", vcs:[], competitors:[{name:"EdApp",url:"https://www.edapp.com"},{name:"Axonify",url:"https://axonify.com"},{name:"YOOBIC",url:"https://yoobic.com"}] },
  { id:36, name:"Settly", url:"https://www.settly.com", desc:"Relocation management", industry:"Business Apps", phase:"Venture", vcs:[], competitors:[{name:"Localyze",url:"https://www.localyze.com"},{name:"Perchpeek",url:"https://perchpeek.com"},{name:"Jobbatical",url:"https://jobbatical.com"}] },
  { id:37, name:"Dexter Energy", url:"https://dexterenergy.ai", desc:"AI forecasting for renewables", industry:"AI & Data", phase:"Venture", vcs:[], competitors:[{name:"eSmart Systems",url:"https://www.esmartsystems.com"},{name:"GridBeyond",url:"https://gridbeyond.com"},{name:"Volue",url:"https://www.volue.com"}] },
  { id:38, name:"Foleon", url:"https://www.foleon.com", desc:"Interactive content creation", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Turtl",url:"https://turtl.co"},{name:"Ceros",url:"https://www.ceros.com"},{name:"Relayto",url:"https://relayto.com"}] },
  { id:39, name:"Wiley", url:"https://www.wiley.com", desc:"Global research & education publisher", industry:"Verticals", phase:"Established", vcs:[], competitors:[{name:"Elsevier",url:"https://www.elsevier.com"},{name:"Springer Nature",url:"https://www.springernature.com"},{name:"Taylor & Francis",url:"https://www.taylorandfrancis.com"}] },
  { id:40, name:"IQGeo", url:"https://www.iqgeo.com", desc:"Geospatial network management", industry:"Dev & Cloud", phase:"Established", vcs:[], competitors:[{name:"Esri",url:"https://www.esri.com"},{name:"GE Smallworld",url:"https://www.ge.com"},{name:"Bentley Systems",url:"https://www.bentley.com"}] },
  { id:41, name:"MAPAL Group", url:"https://mapal-os.com", desc:"Hospitality management software", industry:"Verticals", phase:"Growth", vcs:[], competitors:[{name:"Fourth",url:"https://www.fourth.com"},{name:"Harri",url:"https://harri.com"},{name:"Bizimply",url:"https://www.bizimply.com"}] },
  { id:42, name:"ComplianceWise", url:"https://compliance-wise.com", desc:"AML/KYC for accountants", industry:"Fintech", phase:"Venture", vcs:[], competitors:[{name:"First AML",url:"https://www.firstaml.com"},{name:"ComplyAdvantage",url:"https://complyadvantage.com"},{name:"Onfido",url:"https://onfido.com"}] },
  { id:43, name:"Nextlane", url:"https://www.nextlane.com", desc:"Connected automotive retail (DMS)", industry:"Verticals", phase:"Established", vcs:["PSG Equity"], competitors:[{name:"CDK Global",url:"https://www.cdkglobal.com"},{name:"Reynolds and Reynolds",url:"https://www.reyrey.com"},{name:"Keyloop",url:"https://www.keyloop.com"}] },
  { id:44, name:"CHILI publish", url:"https://www.chili-publish.com", desc:"Creative automation platform", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Celtra",url:"https://www.celtra.com"},{name:"Bynder",url:"https://www.bynder.com"},{name:"Marq",url:"https://www.marq.com"}] },
  { id:45, name:"TextMagic", url:"https://www.textmagic.com", desc:"SMS & business messaging", industry:"Business Apps", phase:"Growth", vcs:[], competitors:[{name:"Twilio",url:"https://www.twilio.com"},{name:"Sinch",url:"https://www.sinch.com"},{name:"Clickatell",url:"https://www.clickatell.com"}] },
  { id:46, name:"AIHR", url:"https://www.aihr.com", desc:"Online academy for HR", industry:"Verticals", phase:"Growth", vcs:[], competitors:[{name:"Josh Bersin Academy",url:"https://bersinacademy.com"},{name:"HRCI",url:"https://www.hrci.org"},{name:"SHRM",url:"https://www.shrm.org"}] },
  { id:47, name:"The Access Group", url:"https://www.theaccessgroup.com", desc:"Cloud ERP & business management", industry:"Business Apps", phase:"Established", vcs:["Hg","TA Associates"], competitors:[{name:"Sage",url:"https://www.sage.com"},{name:"Advanced",url:"https://www.oneadvanced.com"},{name:"Visma",url:"https://www.visma.com"}] },
];

const ACCENT = "#1a1a2e";
const MUTED = "#999";
const BORDER = "#e4e4e4";
const BG = "#fafaf8";
const WHITE = "#ffffff";

export default function NorthlaneDashboard() {
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterPhase, setFilterPhase] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const filtered = useMemo(() => {
    let result = clients.filter(c => {
      if (filterIndustry !== "All" && c.industry !== filterIndustry) return false;
      if (filterPhase !== "All" && c.phase !== filterPhase) return false;
      if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !c.desc.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "industry") result = [...result].sort((a, b) => a.industry.localeCompare(b.industry));
    if (sortBy === "vcs") result = [...result].sort((a, b) => b.vcs.length - a.vcs.length);
    return result;
  }, [filterIndustry, filterPhase, searchTerm, sortBy]);

  const industries = ["All", "AI & Data", "Business Apps", "Dev & Cloud", "Fintech", "Verticals"];
  const phases = ["All", "Venture", "Growth", "Established"];

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

  return (
    <div style={{ fontFamily: "'Libre Franklin', 'Helvetica Neue', sans-serif", background: BG, color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Libre+Franklin:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #1a1a2e; color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .pill { display: inline-block; padding: 4px 12px; font-size: 11px; font-weight: 500; border: 1px solid #e4e4e4; color: #555; cursor: pointer; transition: all 0.2s; background: transparent; font-family: inherit; letter-spacing: 0.2px; border-radius: 20px; }
        .pill:hover { border-color: #999; color: #1a1a1a; }
        .pill.active { background: #1a1a2e; color: white; border-color: #1a1a2e; }
        .row-hover { transition: background 0.15s; cursor: pointer; }
        .row-hover:hover { background: #f2f2ef; }
        .tag { display: inline-block; padding: 2px 8px; font-size: 10px; letter-spacing: 0.3px; font-weight: 500; border-radius: 3px; }
        .tag-venture { background: #f0f7ff; color: #3366aa; }
        .tag-growth { background: #f0f5f0; color: #3a7a3a; }
        .tag-established { background: #f5f0f5; color: #7a3a7a; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); animation: fadeIn 0.2s ease; }
        .modal-box { background: white; max-width: 640px; width: 92%; padding: 40px; position: relative; max-height: 85vh; overflow-y: auto; border: 1px solid #e4e4e4; animation: fadeUp 0.3s ease; }
        .search-input { border: 1px solid #e4e4e4; padding: 8px 14px; font-size: 13px; font-family: inherit; width: 240px; background: white; outline: none; transition: border-color 0.2s; border-radius: 4px; }
        .search-input:focus { border-color: #999; }
        .search-input::placeholder { color: #bbb; }
        .bar-track { height: 3px; background: #eee; width: 100%; border-radius: 1px; }
        .bar-fill { height: 3px; background: #1a1a2e; border-radius: 1px; transition: width 0.6s ease; }
        .comp-row { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-bottom: 1px solid #f0f0ee; transition: background 0.15s; }
        .comp-row:last-child { border-bottom: none; }
        .comp-row:hover { background: #fafaf8; }
        .comp-link { color: #1a1a2e; text-decoration: none; font-size: 14px; font-weight: 400; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .comp-link:hover { border-bottom-color: #1a1a2e; }
      `}</style>

      <header style={{ padding: "40px 48px 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>Competitive Intelligence</p>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontWeight: 400, color: ACCENT, lineHeight: 1.1, letterSpacing: -0.5 }}>Northlane Partners</h1>
            <p style={{ fontSize: 14, color: MUTED, marginTop: 6, fontWeight: 300 }}>Client portfolio, competitor targets & investor network</p>
          </div>
          <div style={{ display: "flex", gap: 32, paddingBottom: 4 }}>
            {[{ label: "Clients", value: clients.length },{ label: "Targets", value: clients.length * 3 },{ label: "Funds", value: vcMap.length }].map(s => (
              <div key={s.label} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: ACCENT, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: BORDER, marginTop: 28 }} />
      </header>

      <section style={{ padding: "28px 48px 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 3, height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
          {industryStats.map(([ind, count]) => (
            <div key={ind} style={{ flex: count, background: ACCENT, opacity: filterIndustry === "All" ? 0.15 + (count / clients.length) * 0.85 : (filterIndustry === ind ? 1 : 0.08), cursor: "pointer", transition: "all 0.3s" }}
              onClick={() => setFilterIndustry(filterIndustry === ind ? "All" : ind)} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {industryStats.map(([ind, count]) => (
            <span key={ind} style={{ fontSize: 11, color: filterIndustry === ind ? ACCENT : MUTED, cursor: "pointer", fontWeight: filterIndustry === ind ? 600 : 400, transition: "all 0.2s" }}
              onClick={() => setFilterIndustry(filterIndustry === ind ? "All" : ind)}>{ind} ({count})</span>
          ))}
        </div>
      </section>

      <section style={{ padding: "24px 48px", maxWidth: 1400, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {industries.map(ind => (<button key={ind} className={`pill ${filterIndustry === ind ? "active" : ""}`} onClick={() => setFilterIndustry(ind)}>{ind}</button>))}
        <span style={{ width: 1, height: 20, background: BORDER, margin: "0 4px" }} />
        {phases.map(p => (<button key={p} className={`pill ${filterPhase === p ? "active" : ""}`} onClick={() => setFilterPhase(p)}>{p}</button>))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <input className="search-input" placeholder="Search clients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: `1px solid ${BORDER}`, padding: "8px 10px", fontSize: 12, fontFamily: "inherit", background: "white", borderRadius: 4, color: "#555", cursor: "pointer" }}>
            <option value="id">Sort: Default</option>
            <option value="name">Sort: A-Z</option>
            <option value="industry">Sort: Industry</option>
            <option value="vcs">Sort: Most VCs</option>
          </select>
        </div>
      </section>

      <div style={{ padding: "0 48px 12px", maxWidth: 1400, margin: "0 auto" }}><span style={{ fontSize: 12, color: MUTED }}>{filtered.length} of {clients.length} clients</span></div>

      <section style={{ padding: "0 48px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ background: WHITE, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "44px 1.4fr 2fr 100px 1.2fr 1.4fr", padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, background: "#fafaf8", fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: MUTED }}>
            <span>#</span><span>Company</span><span>Description</span><span>Stage</span><span>Investors</span><span>Competitor Targets</span>
          </div>
          {filtered.map((c, i) => (
            <div key={c.id} className="row-hover fade-up" style={{ display: "grid", gridTemplateColumns: "44px 1.4fr 2fr 100px 1.2fr 1.4fr", padding: "14px 20px", borderBottom: "1px solid #f0f0ee", alignItems: "center", animationDelay: `${i * 0.02}s`, opacity: 0 }} onClick={() => setSelectedClient(c)}>
              <span style={{ fontSize: 11, color: "#bbb", fontWeight: 300 }}>{String(c.id).padStart(2, "0")}</span>
              <a href={c.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, color: ACCENT, textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = ACCENT} onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                {c.name} <span style={{ fontSize: 10, color: "#bbb", fontWeight: 300 }}>↗</span>
              </a>
              <span style={{ fontSize: 12, color: "#777", fontWeight: 300, lineHeight: 1.4 }}>{c.desc}</span>
              <span><span className={`tag tag-${c.phase.toLowerCase()}`}>{c.phase}</span></span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {c.vcs.length === 0 && <span style={{ fontSize: 11, color: "#ccc" }}>—</span>}
                {c.vcs.slice(0, 2).map((v, j) => (<span key={j} style={{ fontSize: 10, color: "#777", background: "#f5f5f3", padding: "2px 6px", borderRadius: 2 }}>{v}</span>))}
                {c.vcs.length > 2 && <span style={{ fontSize: 10, color: MUTED }}>+{c.vcs.length - 2}</span>}
              </span>
              <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {c.competitors.map((comp, j) => (<span key={j} style={{ fontSize: 10, color: "#999", letterSpacing: 0.2 }}>{comp.name}{j < c.competitors.length - 1 ? "," : ""}</span>))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 48px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 6 }}>Investor Network</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: ACCENT, fontWeight: 400, marginBottom: 24 }}>Funds by client count</h2>
            {vcMap.slice(0, 14).map(([vc, count]) => (
              <div key={vc} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: count >= 3 ? 500 : 300, color: count >= 3 ? ACCENT : "#666" }}>{vc}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: ACCENT }}>{count}</span>
                </div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(count / vcMap[0][1]) * 100}%` }} /></div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 6 }}>Portfolio Composition</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: ACCENT, fontWeight: 400, marginBottom: 24 }}>By growth stage</h2>
            {["Growth", "Venture", "Established"].map(phase => {
              const count = phaseStats[phase] || 0;
              const pct = Math.round((count / clients.length) * 100);
              return (<div key={phase} style={{ marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 13, fontWeight: 400, color: "#444" }}>{phase}</span><span style={{ fontSize: 13, color: MUTED }}>{count} ({pct}%)</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%`, opacity: 0.6 }} /></div></div>);
            })}
            <div style={{ marginTop: 40, padding: 28, background: "#f7f7f5", border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>Key Insight</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#444", fontWeight: 300 }}><strong style={{ fontWeight: 600, color: ACCENT }}>Atomico</strong> is the dominant pipeline source with {vcMap.find(v => v[0] === "Atomico")?.[1] || 0} portfolio clients. Johan van der Poel sits on Atomico's Expert Network — this is the primary referral channel.</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#444", fontWeight: 300, marginTop: 12 }}>Each row contains three competitor targets. That's <strong style={{ fontWeight: 600, color: ACCENT }}>141 companies</strong> you can approach with a FOMO-driven outbound message.</p>
            </div>
            <div style={{ marginTop: 32 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>By Industry</p>
              {industryStats.map(([ind, count]) => {
                const pct = Math.round((count / clients.length) * 100);
                return (<div key={ind} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><span style={{ fontSize: 12, color: "#555", width: 110, flexShrink: 0 }}>{ind}</span><div className="bar-track" style={{ flex: 1 }}><div className="bar-fill" style={{ width: `${pct}%`, opacity: 0.4 }} /></div><span style={{ fontSize: 11, color: MUTED, width: 40, textAlign: "right" }}>{count}</span></div>);
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedClient && (
        <div className="modal-overlay" style={{ animation: "fadeIn 0.2s ease" }} onClick={() => setSelectedClient(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedClient(null)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: 20, fontFamily: "inherit" }}>×</button>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>{selectedClient.industry}</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: ACCENT, fontWeight: 400, marginBottom: 4 }}>
              <a href={selectedClient.url} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = ACCENT} onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                {selectedClient.name} <span style={{ fontSize: 18, color: "#999" }}>↗</span>
              </a>
            </h2>
            <p style={{ fontSize: 12, color: "#bbb", marginBottom: 2, fontWeight: 300 }}>{selectedClient.url.replace("https://","").replace("www.","")}</p>
            <p style={{ fontSize: 14, color: "#777", fontWeight: 300, marginBottom: 24 }}>{selectedClient.desc}</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}><span className={`tag tag-${selectedClient.phase.toLowerCase()}`} style={{ fontSize: 12, padding: "4px 12px" }}>{selectedClient.phase}</span></div>

            {selectedClient.vcs.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 10 }}>Investors</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedClient.vcs.map((vc, j) => (<span key={j} style={{ padding: "5px 14px", border: `1px solid ${BORDER}`, fontSize: 12, color: "#444", borderRadius: 20 }}>{vc}</span>))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 10 }}>Competitor Targets</p>
              {selectedClient.competitors.map((comp, j) => (
                <div key={j} className="comp-row">
                  <span style={{ width: 20, fontSize: 11, color: "#ccc", flexShrink: 0 }}>{j + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a href={comp.url} target="_blank" rel="noopener noreferrer" className="comp-link">
                      {comp.name} <span style={{ fontSize: 10, color: "#bbb" }}>↗</span>
                    </a>
                    <span style={{ fontSize: 11, color: "#bbb", fontWeight: 300, marginLeft: 6 }}>
                      {comp.url.replace("https://","").replace("www.","")}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, padding: "3px 10px", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 20, flexShrink: 0 }}>outbound target</span>
                </div>
              ))}
            </div>

            <div style={{ padding: 24, background: "#fafaf8", border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>Outreach Template</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#555", fontWeight: 300, fontStyle: "italic" }}>
                "Your competitor <strong style={{ fontWeight: 500, color: ACCENT, fontStyle: "normal" }}>{selectedClient.name}</strong> recently optimized their pricing strategy with a specialized consultancy — companies in {selectedClient.industry} that do this typically see 20–40% revenue uplift. We help companies like yours capture full value. 15 min to explore?"
              </p>
            </div>
          </div>
        </div>
      )}

      <footer style={{ padding: "20px 48px", borderTop: `1px solid ${BORDER}`, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#ccc" }}>Valueships Competitive Intelligence</span>
          <span style={{ fontSize: 11, color: "#ccc" }}>Confidential — internal use only</span>
        </div>
      </footer>
    </div>
  );
}
