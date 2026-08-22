// Prosafe IOSP Suite — simulated demo data. All fictional.

export type BarrierState = "Intact" | "Degraded" | "Absent" | "Unassessed";
export type Confidence = "High" | "Medium" | "Low";

export const PLANT_UNITS = [
  "Train 1",
  "Train 2",
  "Train 3",
  "Common Facilities",
] as const;

export const CURRENT_USER = {
  name: "A. Bello",
  role: "HPSO",
  initials: "AB",
};

export const ROTATION = { day: 9, of: 14, shiftTeams: ["A", "B", "C", "D"] };

export interface Citation {
  system: string;
  ref: string;
  age: string;
}

export interface Sce {
  id: string;
  tag: string;
  description: string;
  scaType:
    | "Proactive Maintenance"
    | "IPF Test"
    | "Inspection & Certification"
    | "RBI";
  state: BarrierState;
  threatLines: number[];
  equipment: string;
  owner: string;
  lastEvidence: string;
  source: string;
  confidence: Confidence;
  daysOverdue?: number;
  unit: string;
  note?: string;
}

export const BT19 = {
  id: "BT-19",
  name: "Fuel Gas System",
  threatLines: 109,
  sceCount: 124,
  humanBarrierCategories: 14,
};

export const SCES: Sce[] = [
  {
    id: "SCE-001",
    tag: "44TICA-016",
    description: "Fuel gas superheater temperature control loop (fail-open)",
    scaType: "IPF Test",
    state: "Absent",
    threatLines: [14],
    equipment: "E-4420",
    owner: "Instrument & Control Engineer",
    lastEvidence: "Handshake review — Dec 2019, rated Not Tolerable / Not ALARP",
    source: "Omnisafe · OMN-BT19-014",
    confidence: "High",
    daysOverdue: 487,
    unit: "Train 2",
    note: "Remedial action: install 44TZA-044 downstream of E-4420 (High criticality). Action OPEN.",
  },
  {
    id: "SCE-002",
    tag: "44TZA-044",
    description: "High temperature trip downstream of E-4420 (not installed)",
    scaType: "IPF Test",
    state: "Absent",
    threatLines: [14, 15],
    equipment: "E-4420",
    owner: "Projects / Instrument Engineer",
    lastEvidence: "No installation record in SAP PM",
    source: "SAP PM · no functional location",
    confidence: "High",
    daysOverdue: 487,
    unit: "Train 2",
    note: "No valid control barrier on threat line 14.",
  },
  {
    id: "SCE-003",
    tag: "44RV-771A",
    description: "Fuel gas KO drum relief valve A",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [3, 21],
    equipment: "V-4401",
    owner: "Inspection Engineer",
    lastEvidence: "Cert renewed 14 Mar 2026 — 5 yr interval",
    source: "SAP PM · WO 41220981",
    confidence: "High",
    unit: "Train 1",
  },
  {
    id: "SCE-004",
    tag: "44RV-771B",
    description: "Fuel gas KO drum relief valve B",
    scaType: "Inspection & Certification",
    state: "Degraded",
    threatLines: [3, 21],
    equipment: "V-4401",
    owner: "Inspection Engineer",
    lastEvidence: "Cert expired 02 Jun 2026 — WO raised, awaiting shutdown window",
    source: "SAP PM · WO 41244102",
    confidence: "High",
    daysOverdue: 81,
    unit: "Train 1",
  },
  {
    id: "SCE-005",
    tag: "44RV-002A",
    description: "Fuel gas header overpressure relief A",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [7],
    equipment: "V-4401",
    owner: "Inspection Engineer",
    lastEvidence: "Cert valid to 21 Nov 2028",
    source: "SAP PM · WO 41190334",
    confidence: "High",
    unit: "Train 2",
  },
  {
    id: "SCE-006",
    tag: "44RV-002B",
    description: "Fuel gas header overpressure relief B",
    scaType: "Inspection & Certification",
    state: "Unassessed",
    threatLines: [7],
    equipment: "V-4401",
    owner: "Inspection Engineer",
    lastEvidence: "SCE not confirmed in SAP PM with a Performance Standard",
    source: "SAP PM · no PS linkage",
    confidence: "Low",
    unit: "Train 2",
    note: "Insufficient evidence to classify — queued for human review. The system will not guess.",
  },
  {
    id: "SCE-007",
    tag: "44PICA-774",
    description: "Fuel gas KO drum pressure control / alarm",
    scaType: "Proactive Maintenance",
    state: "Intact",
    threatLines: [12, 14],
    equipment: "V-4401",
    owner: "Instrument & Control Engineer",
    lastEvidence: "PM 4-4400 completed 02 Aug 2026",
    source: "SAP PM · WO 41260117",
    confidence: "High",
    unit: "Train 2",
  },
  {
    id: "SCE-008",
    tag: "44PICA-002",
    description: "Fuel gas header pressure controller",
    scaType: "Proactive Maintenance",
    state: "Intact",
    threatLines: [7, 12],
    equipment: "V-4401",
    owner: "Instrument & Control Engineer",
    lastEvidence: "PM completed 28 Jul 2026",
    source: "SAP PM · WO 41259003",
    confidence: "High",
    unit: "Train 1",
  },
  {
    id: "SCE-009",
    tag: "44LIA-771",
    description: "Fuel gas KO drum level indication & alarm",
    scaType: "IPF Test",
    state: "Degraded",
    threatLines: [22],
    equipment: "V-4401",
    owner: "Instrument & Control Engineer",
    lastEvidence: "Proof test overdue — last full test 19 Jan 2025",
    source: "SAP PM · WO 41251884",
    confidence: "Medium",
    daysOverdue: 63,
    unit: "Train 3",
  },
  {
    id: "SCE-010",
    tag: "44TZA-018",
    description: "High temperature trip — fuel gas heater outlet",
    scaType: "IPF Test",
    state: "Intact",
    threatLines: [15],
    equipment: "E-4410",
    owner: "Instrument & Control Engineer",
    lastEvidence: "IPF proof test passed 11 Jun 2026",
    source: "SAP PM · WO 41254419",
    confidence: "High",
    unit: "Train 2",
  },
  {
    id: "SCE-011",
    tag: "44TZA-019",
    description: "High-high temperature trip — heater outlet",
    scaType: "IPF Test",
    state: "Intact",
    threatLines: [15],
    equipment: "E-4410",
    owner: "Instrument & Control Engineer",
    lastEvidence: "IPF proof test passed 11 Jun 2026",
    source: "SAP PM · WO 41254420",
    confidence: "High",
    unit: "Train 2",
  },
  {
    id: "SCE-012",
    tag: "44LZA-005",
    description: "Low level trip — fuel gas condensate pot",
    scaType: "IPF Test",
    state: "Intact",
    threatLines: [22, 31],
    equipment: "V-4401",
    owner: "Instrument & Control Engineer",
    lastEvidence: "IPF proof test passed 03 May 2026",
    source: "SAP PM · WO 41248210",
    confidence: "High",
    unit: "Train 1",
  },
  {
    id: "SCE-013",
    tag: "320TZA-826",
    description: "Hot oil circuit high temperature trip",
    scaType: "IPF Test",
    state: "Intact",
    threatLines: [44],
    equipment: "E-4430",
    owner: "Instrument & Control Engineer",
    lastEvidence: "IPF proof test passed 22 Apr 2026",
    source: "SAP PM · WO 41246002",
    confidence: "High",
    unit: "Common Facilities",
  },
  {
    id: "SCE-014",
    tag: "144RV-004A",
    description: "Train 1 fuel gas letdown relief A",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [7],
    equipment: "E-4410",
    owner: "Inspection Engineer",
    lastEvidence: "Cert valid to 09 Sep 2029",
    source: "SAP PM · WO 41201990",
    confidence: "High",
    unit: "Train 1",
  },
  {
    id: "SCE-015",
    tag: "244RV-004A",
    description: "Train 2 fuel gas letdown relief A",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [7],
    equipment: "E-4420",
    owner: "Inspection Engineer",
    lastEvidence: "Cert valid to 09 Sep 2029",
    source: "SAP PM · WO 41201991",
    confidence: "High",
    unit: "Train 2",
  },
  {
    id: "SCE-016",
    tag: "244RV-004B",
    description: "Train 2 fuel gas letdown relief B",
    scaType: "RBI",
    state: "Degraded",
    threatLines: [7, 15],
    equipment: "E-4420",
    owner: "Inspection Engineer",
    lastEvidence: "RBI inspection deferred once — corrosion loop CL-44-08",
    source: "Credo RBI · CL-44-08",
    confidence: "Medium",
    daysOverdue: 34,
    unit: "Train 2",
  },
  {
    id: "SCE-017",
    tag: "344RV-004A",
    description: "Train 3 fuel gas letdown relief A",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [7],
    equipment: "E-4430",
    owner: "Inspection Engineer",
    lastEvidence: "Cert valid to 30 Jan 2030",
    source: "SAP PM · WO 41209871",
    confidence: "High",
    unit: "Train 3",
  },
  {
    id: "SCE-018",
    tag: "344RV-004B",
    description: "Train 3 fuel gas letdown relief B",
    scaType: "Inspection & Certification",
    state: "Intact",
    threatLines: [7],
    equipment: "E-4430",
    owner: "Inspection Engineer",
    lastEvidence: "Cert valid to 30 Jan 2030",
    source: "SAP PM · WO 41209872",
    confidence: "High",
    unit: "Train 3",
  },
  {
    id: "SCE-019",
    tag: "44TICA-002",
    description: "Fuel gas preheat temperature control loop",
    scaType: "Proactive Maintenance",
    state: "Unassessed",
    threatLines: [15],
    equipment: "E-4410",
    owner: "Instrument & Control Engineer",
    lastEvidence: "Performance Standard not linked in SAP PM",
    source: "SAP PM · no PS linkage",
    confidence: "Low",
    unit: "Train 3",
    note: "Insufficient evidence — will not guess. Queued for barrier-owner confirmation.",
  },
  {
    id: "SCE-020",
    tag: "44XV-118",
    description: "Fuel gas emergency isolation valve",
    scaType: "IPF Test",
    state: "Intact",
    threatLines: [14, 15, 21],
    equipment: "V-4401",
    owner: "Instrument & Control Engineer",
    lastEvidence: "Partial-stroke test passed 30 Jul 2026",
    source: "SAP PM · WO 41259566",
    confidence: "High",
    unit: "Train 2",
  },
];

export const THREAT_LINE_14 = {
  id: 14,
  threat: "44TICA-016 fail-open",
  consequence: "E-4420 mechanical failure — loss of fuel gas containment",
  risk: "Not Tolerable / Not ALARP",
  handshake: "BT-19 handshake, Dec 2019",
  remedial: "Install 44TZA-044 downstream of E-4420",
  criticality: "High",
  action: "OMN-BT19-014",
  status: "OPEN",
  daysOverdue: 487,
  evidence: [
    {
      label: "Last SCA completion",
      value: "IPF proof test 44TICA-016 — passed 18 Feb 2026 (loop healthy, but control-only)",
      citation: { system: "SAP PM", ref: "WO 41240119", age: "6 mo ago" },
    },
    {
      label: "Active work orders",
      value: "None against functional location for 44TZA-044 (device not installed)",
      citation: { system: "SAP PM", ref: "FLOC search 44-E-4420", age: "12 min ago" },
    },
    {
      label: "Omnisafe action status",
      value: "OMN-BT19-014 — OPEN, High criticality, 487 days past target date",
      citation: { system: "Omnisafe", ref: "OMN-BT19-014", age: "4 h ago" },
    },
    {
      label: "Latest EoSR reference",
      value: "Train 2 night shift noted E-4420 outlet temp excursion to 214 °C (alarm cleared manually)",
      citation: { system: "EoSR", ref: "T2-2026-0821-N §4", age: "9 h ago" },
    },
    {
      label: "Acceptance form status",
      value: "No signed acceptance form for deviation on threat line 14",
      citation: { system: "Barrier Register", ref: "AF-BT19-014", age: "1 d ago" },
    },
  ],
  reasoning: [
    "Threat line 14 requires an independent trip function downstream of E-4420 as the control barrier.",
    "The specified device (44TZA-044) has no functional location, no PM plan and no test record in SAP PM.",
    "The compensating remedial action OMN-BT19-014 remains OPEN at High criticality, 487 days overdue.",
    "No signed acceptance form exists to formally carry the deviation.",
    "Therefore the barrier state is ABSENT — no valid control barrier exists on this threat line.",
  ],
  confidence: "High" as Confidence,
};

export interface BowTie {
  id: string;
  name: string;
  unit: string;
  health: BarrierState;
  intact: number;
  degraded: number;
  absent: number;
  unassessed: number;
}

export const BOW_TIES: BowTie[] = [
  { id: "BT-19", name: "Fuel Gas System", unit: "Train 2", health: "Absent", intact: 108, degraded: 12, absent: 2, unassessed: 2 },
  { id: "BT-04", name: "LNG Storage & Loading", unit: "Common Facilities", health: "Degraded", intact: 86, degraded: 5, absent: 0, unassessed: 1 },
  { id: "BT-07", name: "Refrigerant Compression (MR)", unit: "Train 1", health: "Intact", intact: 94, degraded: 0, absent: 0, unassessed: 0 },
  { id: "BT-11", name: "Acid Gas Removal", unit: "Train 3", health: "Degraded", intact: 71, degraded: 3, absent: 0, unassessed: 2 },
  { id: "BT-02", name: "Inlet Reception & Slug Catcher", unit: "Common Facilities", health: "Intact", intact: 63, degraded: 0, absent: 0, unassessed: 0 },
  { id: "BT-23", name: "Flare & Relief Systems", unit: "Common Facilities", health: "Degraded", intact: 58, degraded: 4, absent: 0, unassessed: 0 },
  { id: "BT-31", name: "Power Generation", unit: "Common Facilities", health: "Intact", intact: 47, degraded: 1, absent: 0, unassessed: 0 },
  { id: "BT-15", name: "Fractionation & NGL", unit: "Train 1", health: "Unassessed", intact: 39, degraded: 2, absent: 0, unassessed: 6 },
];

export interface AiActivity {
  id: string;
  time: string;
  module: "T1" | "T2" | "T3" | "T4";
  action: string;
  confidence: Confidence;
  source: string;
}

export const AI_ACTIVITY: AiActivity[] = [
  { id: "a1", time: "07:42", module: "T1", action: "Classified 44RV-771B as Degraded — certificate expired, WO raised", confidence: "High", source: "SAP PM" },
  { id: "a2", time: "07:38", module: "T3", action: "Routed field note 'P-201A bearing temp elevated' to EoSR §3, §7, §11", confidence: "High", source: "EoSR" },
  { id: "a3", time: "07:31", module: "T2", action: "Drafted isolation certificate ICC-2026-0412 from work order text", confidence: "Medium", source: "Isolation Register" },
  { id: "a4", time: "07:12", module: "T1", action: "Could not classify 44RV-002B — no Performance Standard linkage (queued for review)", confidence: "Low", source: "SAP PM" },
  { id: "a5", time: "06:55", module: "T4", action: "Generated within-cycle alert — Team B PTW gas-test compliance 32%", confidence: "High", source: "STP Register" },
  { id: "a6", time: "06:40", module: "T1", action: "Synthesised Daily Barrier Health Briefing for BT-19", confidence: "High", source: "Omnisafe · SAP PM" },
];

export const ALERTS = [
  { id: "al1", severity: "Absent" as BarrierState, text: "BT-19 threat line 14 — barrier ABSENT (44TZA-044 not installed)", meta: "Train 2 · 487 days overdue" },
  { id: "al2", severity: "Degraded" as BarrierState, text: "ICC PSF#1 check blocked a sign-off — single barrier on hydrocarbon drain", meta: "ICC-2026-0418 · Train 1" },
  { id: "al3", severity: "Degraded" as BarrierState, text: "Team B PTW effectiveness dropped — weekly permit gas-test score 32%", meta: "Cycle day 9 of 14" },
];

export const KPI = {
  t1: { label: "Barrier Visibility", value: 96.8, unit: "% SCEs assessed", sub: "2 Absent · 12 Degraded · 8 Unassessed", trend: "+1.4" },
  t2: { label: "LOTO Assurance", value: 8, unit: "active ICCs", sub: "1 PSF#1 block · 1 conflict detected", trend: "-2" },
  t3: { label: "Operational Compliance", value: 92, unit: "% EoSR sections complete", sub: "15 field entries this shift", trend: "+6" },
  t4: { label: "Shift Performance", value: 1, unit: "Team C rank", sub: "Cycle day 9 of 14 · 4 teams scored", trend: "+2" },
};

export interface AskAnswer {
  q: string;
  answer: string;
  confidence: Confidence;
  citations: Citation[];
  evidence: { label: string; value: string }[];
}

export const ASK_ANSWERS: AskAnswer[] = [
  {
    q: "Which BT-19 barriers are currently Absent?",
    answer:
      "Two BT-19 barriers are currently ABSENT, both on threat line 14 (Train 2). 44TZA-044 — the high-temperature trip specified downstream of E-4420 — has never been installed, so 44TICA-016 fail-open has no independent control barrier. All other 122 SCEs are Intact (108), Degraded (12) or Unassessed (2).",
    confidence: "High",
    citations: [
      { system: "Omnisafe", ref: "OMN-BT19-014", age: "updated 4h ago" },
      { system: "SAP PM", ref: "FLOC 44-E-4420", age: "updated 12m ago" },
    ],
    evidence: [
      { label: "44TZA-044", value: "No functional location, no PM plan, no test record — ABSENT" },
      { label: "44TICA-016", value: "Control loop healthy but control-only; not credited as a barrier" },
      { label: "Threat line 14", value: "Rated Not Tolerable / Not ALARP at Dec 2019 handshake" },
    ],
  },
  {
    q: "Are the High-criticality remedial actions from the BT-19 handshake — threats 14 and 15 — closed?",
    answer:
      "No. Threat 14's remedial action OMN-BT19-014 (install 44TZA-044 downstream of E-4420, High criticality) is still OPEN and 487 days past target. Threat 15's action OMN-BT19-015 was closed on 11 Jun 2026 with IPF proof tests on 44TZA-018 and 44TZA-019 both passing.",
    confidence: "High",
    citations: [
      { system: "Omnisafe", ref: "OMN-BT19-014 / -015", age: "updated 4h ago" },
      { system: "SAP PM", ref: "WO 41254419", age: "updated 2d ago" },
    ],
    evidence: [
      { label: "OMN-BT19-014", value: "OPEN · High · 487 days overdue · owner: Projects" },
      { label: "OMN-BT19-015", value: "CLOSED 11 Jun 2026 · evidence: proof test records" },
    ],
  },
  {
    q: "Show all jobs where PSF#1 compliance has not been confirmed.",
    answer:
      "One active job has an unconfirmed PSF#1 status: ICC-2026-0418 (hydrocarbon drain, Train 1) has a single isolation barrier where two are required — sign-off is blocked by the PSF#1 gate. Seven other active ICCs have PSF#1 confirmed, including ICC-2026-0412 (K-2401 seal overhaul, Train 2).",
    confidence: "High",
    citations: [
      { system: "Isolation Register", ref: "ICC-2026-0418", age: "updated 25m ago" },
      { system: "PSF Standard", ref: "PSF#1 rev 6", age: "static" },
    ],
    evidence: [
      { label: "ICC-2026-0418", value: "Single valve isolation on hydrocarbon drain — second barrier required" },
      { label: "Gate behaviour", value: "Sign-off blocked; AI drafts, humans approve, gate cannot be bypassed in-app" },
    ],
  },
  {
    q: "What happened with the Train 2 compressor last rotation?",
    answer:
      "K-2401 was taken off-line on day 3 of the last rotation for a dry-gas seal overhaul under ICC-2026-0412. Two seal-gas filter differential alarms preceded the decision; vibration on the NDE bearing trended up 18% over four shifts. The unit returned to service on day 11 after a 6-hour proving run with no exceptions logged.",
    confidence: "Medium",
    citations: [
      { system: "EoSR", ref: "T2-2026-0808-D §6", age: "updated 14d ago" },
      { system: "Isolation Register", ref: "ICC-2026-0412", age: "updated 1d ago" },
    ],
    evidence: [
      { label: "Trigger", value: "Seal-gas filter dP high alarms x2, NDE vibration +18%" },
      { label: "Outcome", value: "Overhaul complete, proving run clean, no repeat alarms" },
    ],
  },
  {
    q: "Which shift team leads the STP leaderboard this cycle, and why?",
    answer:
      "Team C leads with 878 of 1,000 points. The margin comes from Alarm Management (98/100) and Procedure Compliance (95/100), plus zero off-spec events this cycle. Team B sits fourth largely because of PTW Effectiveness — a 32% weekly permit gas-test score is the single largest deduction driver in the cycle.",
    confidence: "High",
    citations: [
      { system: "STP Register", ref: "Cycle 2026-16", age: "updated 1h ago" },
      { system: "PTW System", ref: "Weekly gas-test audit", age: "updated 3h ago" },
    ],
    evidence: [
      { label: "Team C", value: "878 / 1000 · rank 1 · ▲2 cycle-on-cycle" },
      { label: "Team B", value: "742 / 1000 · rank 4 · PTW Effectiveness 41/100" },
    ],
  },
];

export const BRIEFING_ITEMS = SCES.filter(
  (s) => s.state === "Degraded" || s.state === "Absent",
);

export const OWNER_PORTAL = {
  role: "Inspection Engineer",
  qualification: { status: "Current", expires: "14 Feb 2027" },
  scasDue: [
    { tag: "44RV-771B", type: "Inspection & Certification", due: "Overdue 81 d", state: "Degraded" as BarrierState },
    { tag: "244RV-004B", type: "RBI", due: "Overdue 34 d", state: "Degraded" as BarrierState },
    { tag: "44RV-002A", type: "Inspection & Certification", due: "In 62 d", state: "Intact" as BarrierState },
    { tag: "344RV-004A", type: "Inspection & Certification", due: "In 141 d", state: "Intact" as BarrierState },
  ],
  acceptanceForms: [
    { ref: "AF-BT19-014", subject: "Threat line 14 deviation", status: "Not raised" },
    { ref: "AF-BT19-771B", subject: "44RV-771B cert expiry", status: "Awaiting sign-off" },
    { ref: "AF-BT19-004B", subject: "244RV-004B RBI deferral", status: "Signed 02 Jul 2026" },
  ],
};
