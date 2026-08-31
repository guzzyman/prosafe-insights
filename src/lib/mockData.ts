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
  {
    q: "Why are SCEs showing Degraded right now?",
    answer:
      "12 SCEs across BT-19 are Degraded. The most common driver is certification or inspection lapse rather than a failed test — e.g. 44RV-771B is Degraded because its inspection certificate expired and a work order has been raised, not because a proof test failed. Degraded means reduced confidence in the barrier's independence or timeliness, not that it's non-functional.",
    confidence: "High",
    citations: [
      { system: "SAP PM", ref: "WO auto-raised on cert expiry", age: "updated 12m ago" },
      { system: "Omnisafe", ref: "BT-19 SCE register", age: "updated 4h ago" },
    ],
    evidence: [
      { label: "44RV-771B", value: "Inspection & Certification — certificate expired, WO raised" },
      { label: "Degraded ≠ failed", value: "Barrier still physically present; assurance evidence is stale or pending" },
    ],
  },
  {
    q: "What's overdue on my barrier owner portal?",
    answer:
      "Two SCAs are overdue: 44RV-771B (Inspection & Certification, 81 days overdue) and 244RV-004B (RBI, 34 days overdue). One acceptance form, AF-BT19-014 (threat line 14 deviation), has not yet been raised — that's the same gap behind the BT-19 Absent barrier alert.",
    confidence: "High",
    citations: [
      { system: "Barrier Owner Portal", ref: "SCA due list", age: "live" },
      { system: "Acceptance Forms", ref: "AF-BT19-014 / -771B", age: "live" },
    ],
    evidence: [
      { label: "44RV-771B", value: "Inspection & Certification — overdue 81 d" },
      { label: "244RV-004B", value: "RBI — overdue 34 d" },
      { label: "AF-BT19-014", value: "Threat line 14 deviation — not raised" },
    ],
  },
  {
    q: "What is BT-19 and how many SCEs does it cover?",
    answer:
      "BT-19 is the Fuel Gas System bow-tie on Train 2 — 109 threat lines and 124 Safety Critical Elements across 14 human-barrier categories. Right now 108 SCEs are Intact, 12 Degraded, 2 Absent and 2 Unassessed, giving 96.8% barrier visibility (SCEs assessed) for this bow-tie this cycle.",
    confidence: "High",
    citations: [
      { system: "Omnisafe", ref: "BT-19 bow-tie register", age: "updated 4h ago" },
      { system: "Barrier Register", ref: "BT-19 SCE count", age: "static" },
    ],
    evidence: [
      { label: "Threat lines", value: "109" },
      { label: "SCE count", value: "124 across 14 human-barrier categories" },
      { label: "Status split", value: "108 Intact · 12 Degraded · 2 Absent · 2 Unassessed" },
    ],
  },
];

export const BRIEFING_ITEMS = SCES.filter(
  (s) => s.state === "Degraded" || s.state === "Absent",
);

// ─── ProSafe Intelligence chat ───────────────────────────────────────────────
// Suggestion chips shown by default in the chat — T1 Barrier Visibility is the
// demo's headline scope, but the underlying matcher runs over all of
// ASK_ANSWERS, so questions from other modules resolve too (one assistant,
// one knowledge base — see aiSimulator.askProSafe).

export const T1_CHAT_SUGGESTIONS = [
  "Which BT-19 barriers are currently Absent?",
  "Are threats 14 and 15's remedial actions closed?",
  "Why are SCEs showing Degraded right now?",
  "What's overdue on my barrier owner portal?",
  "What is BT-19 and how many SCEs does it cover?",
];

// ─── T2: LOTO Assurance ──────────────────────────────────────────────────────

export type ComponentStatus = "Confirmed" | "Pending" | "Blocked" | "N/A";
export type Psf1Status = "Pass" | "Blocked" | "Pending";
export type SpadeStatus = "White" | "Red" | "Grey";

export interface IsolationPoint {
  id: string;
  tag: string;
  type: "Valve" | "Spade" | "CableLock" | "EIC" | "Blind";
  description: string;
  status: "Open" | "Closed" | "Locked" | "Inserted" | "Pending";
}

export interface IccRecord {
  id: string;
  title: string;
  equipment: string;
  unit: string;
  jobDescription: string;
  preparedBy: string;
  date: string;
  status: "Active" | "Suspended" | "Closed";
  mechanical: ComponentStatus;
  spade: ComponentStatus;
  cableLock: ComponentStatus;
  electrical: ComponentStatus;
  decon: ComponentStatus;
  proving: ComponentStatus;
  psf1: Psf1Status;
  psf1Note?: string;
  isolationPoints: IsolationPoint[];
  conflictWith?: string;
  aiDraftNote?: string;
}

export const ICCS: IccRecord[] = [
  {
    id: "ICC-2026-0412",
    title: "Centrifugal compressor K-2401 seal overhaul",
    equipment: "K-2401",
    unit: "Train 2",
    jobDescription: "K-2401 dry-gas seal overhaul — process isolation required. NDE bearing vibration +18%, seal-gas filter dP alarms x2.",
    preparedBy: "O. Adeyemi (Isolation Engineer)",
    date: "2026-08-12",
    status: "Active",
    mechanical: "Confirmed",
    spade: "Confirmed",
    cableLock: "Confirmed",
    electrical: "Confirmed",
    decon: "Confirmed",
    proving: "Confirmed",
    psf1: "Pass",
    isolationPoints: [
      { id: "IP-001", tag: "44-XV-200", type: "Valve", description: "Compressor suction isolation valve", status: "Closed" },
      { id: "IP-002", tag: "44-XV-201", type: "Valve", description: "Compressor discharge isolation valve", status: "Closed" },
      { id: "IP-003", tag: "SP-K2401-01", type: "Spade", description: "Suction line spade — 8\" 600# ANSI", status: "Inserted" },
      { id: "IP-004", tag: "SP-K2401-02", type: "Spade", description: "Discharge line spade — 6\" 600# ANSI", status: "Inserted" },
      { id: "IP-005", tag: "CL-K2401-01", type: "CableLock", description: "Smithlock on 44-XV-200 actuator", status: "Locked" },
      { id: "IP-006", tag: "EIC-K2401-01", type: "EIC", description: "Motor control centre CB isolation", status: "Locked" },
    ],
    aiDraftNote: "AI drafted from work order text. Two independent barriers confirmed on all process lines. PSF#1 compliant.",
  },
  {
    id: "ICC-2026-0418",
    title: "Hydrocarbon drain line maintenance — P-101A area",
    equipment: "P-101A",
    unit: "Train 1",
    jobDescription: "Replace gasket on hydrocarbon drain valve DN-080-T1-HC. Process isolation for drain line required.",
    preparedBy: "K. Okafor (Isolation Engineer)",
    date: "2026-08-14",
    status: "Active",
    mechanical: "Confirmed",
    spade: "Pending",
    cableLock: "N/A",
    electrical: "N/A",
    decon: "Confirmed",
    proving: "Pending",
    psf1: "Blocked",
    psf1Note: "Single valve isolation on hydrocarbon drain — PSF#1 requires minimum two independent barriers. Sign-off blocked until second barrier (spade or blind flange) is confirmed.",
    isolationPoints: [
      { id: "IP-010", tag: "44-XV-118", type: "Valve", description: "Hydrocarbon drain isolation valve", status: "Closed" },
      { id: "IP-011", tag: "SP-P101A-01", type: "Spade", description: "Drain line spade — 2\" 300# ANSI (NOT YET INSERTED)", status: "Pending" },
    ],
    aiDraftNote: "AI draft flagged PSF#1 violation. Spade SP-P101A-01 must be inserted before sign-off can proceed.",
  },
  {
    id: "ICC-2026-0423",
    title: "Heat exchanger E-4410 tube bundle pull",
    equipment: "E-4410",
    unit: "Train 2",
    jobDescription: "Fuel gas superheater E-4410 tube bundle removal and inspection. Train 2 shutdown window.",
    preparedBy: "F. Ibrahim (Isolation Engineer)",
    date: "2026-08-16",
    status: "Active",
    mechanical: "Confirmed",
    spade: "Confirmed",
    cableLock: "Confirmed",
    electrical: "N/A",
    decon: "Pending",
    proving: "Pending",
    psf1: "Pending",
    conflictWith: "ICC-2026-0431",
    isolationPoints: [
      { id: "IP-020", tag: "44-XV-118", type: "Valve", description: "Fuel gas header isolation valve — SHARED with ICC-2026-0431", status: "Closed" },
      { id: "IP-021", tag: "SP-E4410-01", type: "Spade", description: "Inlet spade — 10\" 600# ANSI", status: "Inserted" },
      { id: "IP-022", tag: "SP-E4410-02", type: "Spade", description: "Outlet spade — 10\" 600# ANSI", status: "Inserted" },
    ],
    aiDraftNote: "CONFLICT DETECTED: valve 44-XV-118 is an isolation point for ICC-2026-0431. Both jobs must not proceed concurrently.",
  },
  {
    id: "ICC-2026-0431",
    title: "Feed gas filter F-4401 element replacement",
    equipment: "F-4401",
    unit: "Train 2",
    jobDescription: "Replace filter element in fuel gas KO drum coalescer. Requires upstream isolation.",
    preparedBy: "F. Ibrahim (Isolation Engineer)",
    date: "2026-08-16",
    status: "Suspended",
    mechanical: "Pending",
    spade: "Pending",
    cableLock: "N/A",
    electrical: "N/A",
    decon: "Pending",
    proving: "Pending",
    psf1: "Pending",
    conflictWith: "ICC-2026-0423",
    isolationPoints: [
      { id: "IP-030", tag: "44-XV-118", type: "Valve", description: "Fuel gas header isolation valve — SHARED with ICC-2026-0423", status: "Pending" },
      { id: "IP-031", tag: "44-XV-119", type: "Valve", description: "Filter outlet isolation valve", status: "Pending" },
    ],
    aiDraftNote: "Job suspended pending resolution of valve 44-XV-118 conflict with ICC-2026-0423.",
  },
  {
    id: "ICC-2026-0398",
    title: "Pump P-201A bearing replacement",
    equipment: "P-201A",
    unit: "Train 1",
    jobDescription: "Replace NDE bearing on P-201A — bearing temp rising trend confirmed over 3 shifts.",
    preparedBy: "O. Adeyemi (Isolation Engineer)",
    date: "2026-08-10",
    status: "Active",
    mechanical: "Confirmed",
    spade: "N/A",
    cableLock: "Confirmed",
    electrical: "Confirmed",
    decon: "Confirmed",
    proving: "Confirmed",
    psf1: "Pass",
    isolationPoints: [
      { id: "IP-040", tag: "P201A-SUCT-ISO", type: "Valve", description: "Suction isolation valve", status: "Closed" },
      { id: "IP-041", tag: "P201A-DISC-ISO", type: "Valve", description: "Discharge isolation valve", status: "Closed" },
      { id: "IP-042", tag: "CL-P201A-01", type: "CableLock", description: "MCC breaker lockout", status: "Locked" },
    ],
  },
  {
    id: "ICC-2026-0405",
    title: "Separator V-3001 internal inspection",
    equipment: "V-3001",
    unit: "Train 3",
    jobDescription: "Three-yearly internal inspection of high-pressure separator V-3001.",
    preparedBy: "M. Uche (Isolation Engineer)",
    date: "2026-08-11",
    status: "Active",
    mechanical: "Confirmed",
    spade: "Confirmed",
    cableLock: "Confirmed",
    electrical: "Confirmed",
    decon: "Confirmed",
    proving: "Pending",
    psf1: "Pending",
    isolationPoints: [
      { id: "IP-050", tag: "V3001-IN-ISO", type: "Valve", description: "Inlet isolation valve", status: "Closed" },
      { id: "IP-051", tag: "V3001-GAS-ISO", type: "Valve", description: "Gas outlet isolation valve", status: "Closed" },
      { id: "IP-052", tag: "SP-V3001-01", type: "Spade", description: "Inlet spade — 12\" 600#", status: "Inserted" },
      { id: "IP-053", tag: "SP-V3001-02", type: "Spade", description: "Liquid outlet spade", status: "Inserted" },
    ],
  },
  {
    id: "ICC-2026-0441",
    title: "Slug catcher SC-001 drain valve replacement",
    equipment: "SC-001",
    unit: "Common Facilities",
    jobDescription: "Replace actuated drain valve on inlet slug catcher. Common Facilities area.",
    preparedBy: "A. Obi (Isolation Engineer)",
    date: "2026-08-18",
    status: "Active",
    mechanical: "Confirmed",
    spade: "Confirmed",
    cableLock: "N/A",
    electrical: "Pending",
    decon: "Confirmed",
    proving: "Confirmed",
    psf1: "Pass",
    isolationPoints: [
      { id: "IP-060", tag: "SC001-DRAIN-ISO", type: "Valve", description: "Drain isolation valve", status: "Closed" },
      { id: "IP-061", tag: "SP-SC001-01", type: "Spade", description: "Drain spade — 4\" 600#", status: "Inserted" },
    ],
  },
  {
    id: "ICC-2026-0448",
    title: "Flare KO drum FKD-001 level transmitter replacement",
    equipment: "FKD-001",
    unit: "Common Facilities",
    jobDescription: "Replace faulty level transmitter LT-FKD-001 on flare knockout drum.",
    preparedBy: "A. Obi (Isolation Engineer)",
    date: "2026-08-19",
    status: "Active",
    mechanical: "Confirmed",
    spade: "N/A",
    cableLock: "N/A",
    electrical: "Confirmed",
    decon: "Confirmed",
    proving: "Confirmed",
    psf1: "Pass",
    isolationPoints: [
      { id: "IP-070", tag: "FKD001-LT-ISO", type: "Valve", description: "Instrument root valve isolation", status: "Closed" },
      { id: "IP-071", tag: "EIC-FKD-01", type: "EIC", description: "Loop power isolation in marshalling cabinet", status: "Locked" },
    ],
  },
];

export interface SpadePoint {
  id: string;
  tag: string;
  description: string;
  area: string;
  unit: string;
  status: SpadeStatus;
  icc: string;
  insertedBy?: string;
  insertedAt?: string;
}

export const SPADE_BOARD: SpadePoint[] = [
  { id: "SP-001", tag: "SP-K2401-01", description: "K-2401 suction — 8\" 600# ANSI", area: "Compression", unit: "Train 2", status: "Red", icc: "ICC-2026-0412", insertedBy: "O. Adeyemi", insertedAt: "2026-08-12 06:10" },
  { id: "SP-002", tag: "SP-K2401-02", description: "K-2401 discharge — 6\" 600# ANSI", area: "Compression", unit: "Train 2", status: "Red", icc: "ICC-2026-0412", insertedBy: "O. Adeyemi", insertedAt: "2026-08-12 06:20" },
  { id: "SP-003", tag: "SP-E4410-01", description: "E-4410 inlet — 10\" 600# ANSI", area: "Fuel Gas", unit: "Train 2", status: "Red", icc: "ICC-2026-0423", insertedBy: "F. Ibrahim", insertedAt: "2026-08-16 07:45" },
  { id: "SP-004", tag: "SP-E4410-02", description: "E-4410 outlet — 10\" 600# ANSI", area: "Fuel Gas", unit: "Train 2", status: "Red", icc: "ICC-2026-0423", insertedBy: "F. Ibrahim", insertedAt: "2026-08-16 07:50" },
  { id: "SP-005", tag: "SP-P101A-01", description: "P-101A drain — 2\" 300# ANSI", area: "Pumps", unit: "Train 1", status: "White", icc: "ICC-2026-0418" },
  { id: "SP-006", tag: "SP-V3001-01", description: "V-3001 inlet — 12\" 600#", area: "Separation", unit: "Train 3", status: "Red", icc: "ICC-2026-0405", insertedBy: "M. Uche", insertedAt: "2026-08-11 08:00" },
  { id: "SP-007", tag: "SP-V3001-02", description: "V-3001 liquid outlet", area: "Separation", unit: "Train 3", status: "Red", icc: "ICC-2026-0405", insertedBy: "M. Uche", insertedAt: "2026-08-11 08:15" },
  { id: "SP-008", tag: "SP-SC001-01", description: "SC-001 drain — 4\" 600#", area: "Slug Catcher", unit: "Common Facilities", status: "Red", icc: "ICC-2026-0441", insertedBy: "A. Obi", insertedAt: "2026-08-18 06:30" },
  { id: "SP-009", tag: "SP-T1-FLARE-01", description: "Flare header isolation", area: "Flare", unit: "Common Facilities", status: "Grey" , icc: "—" },
  { id: "SP-010", tag: "SP-T1-FUEL-01", description: "Train 1 fuel gas bypass — available", area: "Fuel Gas", unit: "Train 1", status: "White", icc: "—" },
];

// ─── T3: Operational Compliance ──────────────────────────────────────────────

export interface EosrSection {
  id: number;
  code: string;
  title: string;
  required: boolean;
}

export const EOSR_SECTIONS: EosrSection[] = [
  { id: 1, code: "§1", title: "Production & Process Overview", required: true },
  { id: 2, code: "§2", title: "Safety & Environmental Events", required: true },
  { id: 3, code: "§3", title: "Equipment Defects & Abnormalities", required: true },
  { id: 4, code: "§4", title: "Maintenance & Work Permit Activity", required: true },
  { id: 5, code: "§5", title: "Alarm Management", required: true },
  { id: 6, code: "§6", title: "Inhibited Alarms & Bypasses", required: true },
  { id: 7, code: "§7", title: "Process Safety — SCE Activity", required: true },
  { id: 8, code: "§8", title: "Environmental Monitoring", required: false },
  { id: 9, code: "§9", title: "Personnel & Handover Notes", required: true },
  { id: 10, code: "§10", title: "Production Optimisation Actions", required: false },
  { id: 11, code: "§11", title: "Rotating Equipment Performance", required: true },
  { id: 12, code: "§12", title: "Utilities & Off-sites", required: false },
  { id: 13, code: "§13", title: "HSEQ & Competency", required: false },
];

export interface FieldEntry {
  id: string;
  timestamp: string;
  author: string;
  role: "Operator" | "Supervisor" | "HPSO";
  raw: string;
  sections: number[];
  tag?: string;
  observationType: "Defect" | "Alarm" | "Activity" | "Optimisation" | "Safety" | "Routine";
  escalated: boolean;
  confidence: Confidence;
  offlineQueued?: boolean;
}

export const EOSR_ENTRIES: FieldEntry[] = [
  { id: "E001", timestamp: "06:05", author: "T. Okonkwo", role: "Operator", raw: "P-201A bearing temp elevated ~24% above normal. A running / B standby. Maintenance flagged. Temp reading 82°C vs norm 66°C. Vibration within tolerance.", sections: [3, 11], tag: "P-201A", observationType: "Defect", escalated: true, confidence: "High" },
  { id: "E002", timestamp: "06:12", author: "T. Okonkwo", role: "Operator", raw: "Train 2 K-2401 compressor isolated under ICC-2026-0412. Seal overhaul commenced 06:10. Work area barriered.", sections: [4, 11], tag: "K-2401", observationType: "Activity", escalated: false, confidence: "High" },
  { id: "E003", timestamp: "06:18", author: "S. Musa", role: "Supervisor", raw: "Alarm 44PICA-774 high pressure activated 05:55, cleared 06:02 after operator adjusted setpoint. No process excursion confirmed.", sections: [5, 7], tag: "44PICA-774", observationType: "Alarm", escalated: false, confidence: "High" },
  { id: "E004", timestamp: "06:31", author: "T. Okonkwo", role: "Operator", raw: "Toured Train 1 pump deck — all pumps running normally. P-301A discharge pressure 18.4 barg, within limits.", sections: [1, 11], tag: "P-301A", observationType: "Routine", escalated: false, confidence: "High" },
  { id: "E005", timestamp: "06:48", author: "B. Eze", role: "Operator", raw: "V-4401 KO drum level at 42% — within normal operating range. Drain pot valve operated once, drain confirmed clear.", sections: [1, 3], tag: "V-4401", observationType: "Routine", escalated: false, confidence: "High" },
  { id: "E006", timestamp: "07:02", author: "S. Musa", role: "Supervisor", raw: "Flare pilot re-ignited after brief flame out during gas composition change. Confirmed re-light, plant alarm cleared. Logged as minor event.", sections: [2, 8], tag: "FKD-001", observationType: "Safety", escalated: false, confidence: "High" },
  { id: "E007", timestamp: "07:14", author: "T. Okonkwo", role: "Operator", raw: "E-4420 outlet temp reading 214°C — above 210°C normal. Cleared manually after steam rate adjustment. 44TICA-016 alarm noted. No trip initiated.", sections: [3, 7], tag: "E-4420", observationType: "Alarm", escalated: true, confidence: "High" },
  { id: "E008", timestamp: "07:22", author: "B. Eze", role: "Operator", raw: "Train 3 separator V-3001 in isolation for internal inspection (ICC-2026-0405). Feed rerouted via V-3002. Production unaffected.", sections: [4, 1], tag: "V-3001", observationType: "Activity", escalated: false, confidence: "High" },
  { id: "E009", timestamp: "07:35", author: "S. Musa", role: "Supervisor", raw: "Inhibited alarm list reviewed — 44LIA-771 inhibited since 19 Jan 2025, proof test overdue. Raised SAP PM work order 41251884 for scheduling. Logged against §6 and §7.", sections: [6, 7], tag: "44LIA-771", observationType: "Safety", escalated: true, confidence: "High" },
  { id: "E010", timestamp: "07:48", author: "A. Bello", role: "HPSO", raw: "Morning safety brief conducted. BT-19 threat line 14 barrier status briefed to all team leads. Omnisafe action OMN-BT19-014 remains open. No change to risk status.", sections: [7, 9], tag: "44TZA-044", observationType: "Safety", escalated: false, confidence: "High" },
  { id: "E011", timestamp: "08:05", author: "T. Okonkwo", role: "Operator", raw: "Production rate Train 2 stable at 3.82 MTD LNG. GTS export on spec. No off-spec events this shift.", sections: [1, 10], observationType: "Routine", escalated: false, confidence: "High" },
  { id: "E012", timestamp: "08:18", author: "B. Eze", role: "Operator", raw: "P-201A bearing temp now 88°C after 2 hours — rising trend continuing. Work order raised. Recommend engineering review before next shift. Third consecutive shift with elevated reading.", sections: [3, 11], tag: "P-201A", observationType: "Defect", escalated: true, confidence: "High" },
  { id: "E013", timestamp: "08:31", author: "S. Musa", role: "Supervisor", raw: "SoSO item 4 (valve round, area 3A) complete. All accessible valves checked and no leaks found. Waypoint signed off.", sections: [9, 13], observationType: "Activity", escalated: false, confidence: "High" },
  { id: "E014", timestamp: "08:45", author: "T. Okonkwo", role: "Operator", raw: "Train 1 cooling water flow drop noted on CW-101 — 5% below setpoint. Checked strainer — partially blocked. Cleared. Flow restored.", sections: [3, 12], tag: "CW-101", observationType: "Defect", escalated: false, confidence: "High", offlineQueued: true },
  { id: "E015", timestamp: "09:00", author: "S. Musa", role: "Supervisor", raw: "Shift changeover summary prepared. Outstanding items: P-201A bearing trend (escalated), ICC-2026-0418 PSF#1 block (pending spade insertion), E-4420 temp excursion (one-off, no repeat).", sections: [9], observationType: "Routine", escalated: false, confidence: "High" },
];

export type HandoverRole = "Operator" | "Supervisor" | "HPSO";

export interface HandoverSentence {
  id: string;
  text: string;
  section: string;
  citation: Citation;
  watchpoint?: boolean;
}

export interface HandoverNote {
  role: HandoverRole;
  generatedAt: string;
  sentences: HandoverSentence[];
  watchpoints: { tag: string; description: string; trend: string }[];
}

export const HANDOVER_NOTES: Record<HandoverRole, HandoverNote> = {
  Operator: {
    role: "Operator",
    generatedAt: "09:02 WAT",
    sentences: [
      { id: "H-O1", text: "P-201A bearing temperature is elevated at 88°C (+33% above normal 66°C baseline) with a confirmed rising trend across three consecutive shifts — a maintenance work order is raised.", section: "Equipment", citation: { system: "EoSR", ref: "T2-2026-0822-D §3 / §11", age: "54 min ago" }, watchpoint: true },
      { id: "H-O2", text: "K-2401 compressor is isolated under ICC-2026-0412 for dry-gas seal overhaul; the work area is barriered and PSF#1 is confirmed.", section: "Isolation", citation: { system: "Isolation Register", ref: "ICC-2026-0412", age: "3h ago" } },
      { id: "H-O3", text: "E-4420 outlet temperature reached 214°C at 07:14 (alarm limit 210°C); cleared after steam adjustment, no trip, no repeat in this shift.", section: "Process", citation: { system: "EoSR", ref: "T2-2026-0822-D §3", age: "1h 48m ago" } },
      { id: "H-O4", text: "V-4401 KO drum level held at 42% throughout shift; drain pot operated once and confirmed clear.", section: "Process", citation: { system: "EoSR", ref: "T2-2026-0822-D §1", age: "2h 17m ago" } },
      { id: "H-O5", text: "44LIA-771 remains inhibited with proof test overdue — SAP PM WO 41251884 raised this shift for scheduling.", section: "Inhibited Alarms", citation: { system: "SAP PM", ref: "WO 41251884", age: "1h 27m ago" } },
      { id: "H-O6", text: "ICC-2026-0418 PSF#1 gate remains blocked — spade SP-P101A-01 not yet inserted on the hydrocarbon drain line.", section: "Isolation", citation: { system: "Isolation Register", ref: "ICC-2026-0418", age: "8h ago" } },
    ],
    watchpoints: [
      { tag: "P-201A", description: "Bearing temp rising — 3 consecutive shifts, 66°C → 88°C (+33%)", trend: "▲ Rising" },
    ],
  },
  Supervisor: {
    role: "Supervisor",
    generatedAt: "09:02 WAT",
    sentences: [
      { id: "H-S1", text: "P-201A bearing temperature has trended from 66°C to 88°C over three consecutive shifts — recommend engineering review and consider switching to B pump before next rotation.", section: "Equipment Risk", citation: { system: "EoSR", ref: "T2-2026-0822-D §3 / §11", age: "54 min ago" }, watchpoint: true },
      { id: "H-S2", text: "Train 2 compressor K-2401 is under planned outage (ICC-2026-0412, PSF#1 Pass); estimated return to service subject to seal overhaul completion and proving run.", section: "Production Risk", citation: { system: "Isolation Register", ref: "ICC-2026-0412", age: "3h ago" } },
      { id: "H-S3", text: "BT-19 threat line 14 barrier remains ABSENT — Omnisafe action OMN-BT19-014 is 487 days overdue; E-4420 temp excursion this shift is a concurrent watchpoint.", section: "Process Safety", citation: { system: "Omnisafe", ref: "OMN-BT19-014", age: "4h ago" } },
      { id: "H-S4", text: "ICC-2026-0418 sign-off is blocked on PSF#1 — spade insertion pending; do not progress P-101A drain work until confirmed.", section: "LOTO Compliance", citation: { system: "Isolation Register", ref: "ICC-2026-0418", age: "8h ago" } },
      { id: "H-S5", text: "SoSO item 4 (valve round area 3A) completed; all other outstanding SoSO items are for next shift unless covered in handover.", section: "SoSO Compliance", citation: { system: "EoSR", ref: "T2-2026-0822-D §9", age: "29 min ago" } },
      { id: "H-S6", text: "Inhibited alarm 44LIA-771 remains active — overdue proof test; review inhibit extension with instrument team before next test window.", section: "Alarm Management", citation: { system: "EoSR", ref: "T2-2026-0822-D §6", age: "1h 27m ago" } },
    ],
    watchpoints: [
      { tag: "P-201A", description: "Bearing temp rising — engineering review recommended before next rotation", trend: "▲ Rising" },
      { tag: "E-4420", description: "One temp excursion this shift (+4°C above limit) — monitor for repeat", trend: "→ Stable (one-off)" },
    ],
  },
  HPSO: {
    role: "HPSO",
    generatedAt: "09:02 WAT",
    sentences: [
      { id: "H-H1", text: "P-201A bearing degradation trend (66°C → 88°C, +33% over three shifts) constitutes a potential loss of rotating equipment integrity — flag for immediate engineering assessment and consider outage planning.", section: "Integrity Risk", citation: { system: "EoSR", ref: "T2-2026-0822-D §3 / §11", age: "54 min ago" }, watchpoint: true },
      { id: "H-H2", text: "BT-19 threat line 14 remains ABSENT — this is the highest-priority process safety exposure: no valid control barrier exists on the 44TICA-016 fail-open pathway, 487 days past remedial action target.", section: "Major Hazard", citation: { system: "Omnisafe", ref: "OMN-BT19-014", age: "4h ago" } },
      { id: "H-H3", text: "ICC PSF#1 violation (ICC-2026-0418) has been flagged and sign-off blocked — this demonstrates the gate working as intended; resolution requires field confirmation of second barrier.", section: "LOTO Governance", citation: { system: "Isolation Register", ref: "ICC-2026-0418", age: "8h ago" } },
      { id: "H-H4", text: "Train 2 production is unaffected by the K-2401 planned outage; Train 2 rate stable at 3.82 MTD LNG.", section: "Production", citation: { system: "EoSR", ref: "T2-2026-0822-D §1", age: "2h 3m ago" } },
      { id: "H-H5", text: "Shift team demonstrated proactive EoSR completion — 15 field entries logged, SoSO item 4 completed, all escalations appropriately flagged.", section: "Team Performance", citation: { system: "EoSR", ref: "T2-2026-0822-D §9", age: "29 min ago" } },
    ],
    watchpoints: [
      { tag: "P-201A", description: "Imminent bearing failure risk — 3-shift trend, engineering action required", trend: "▲▲ Escalating" },
      { tag: "BT-19 TL-14", description: "Barrier ABSENT — 487d overdue remedial action — highest process safety priority", trend: "⚠ No change" },
    ],
  },
};

// ─── T4: Shift Performance (STP) ─────────────────────────────────────────────

export interface StpDimension {
  id: string;
  name: string;
  maxPoints: number;
  description: string;
}

export const STP_DIMENSIONS: StpDimension[] = [
  { id: "ps", name: "Process Safety", maxPoints: 120, description: "SCE status, barrier maintenance, PSM activity" },
  { id: "am", name: "Alarm Management", maxPoints: 100, description: "Alarm rates, standing alarms, flood events" },
  { id: "ptw", name: "PTW Effectiveness", maxPoints: 100, description: "Permit quality, gas-test compliance, closure rate" },
  { id: "pc", name: "Procedure Compliance", maxPoints: 100, description: "Step-by-step adherence, deviation logging" },
  { id: "os", name: "Off-spec Management", maxPoints: 80, description: "Off-spec events, root cause closure" },
  { id: "tm", name: "Trip Management", maxPoints: 80, description: "Trip frequency, post-trip reviews" },
  { id: "env", name: "Environmental", maxPoints: 70, description: "Emissions, discharge, regulatory compliance" },
  { id: "hse", name: "HSE Walkabouts/Audits", maxPoints: 60, description: "Tour frequency, findings raised and closed" },
  { id: "mcc", name: "M&CC Monitoring", maxPoints: 60, description: "Maintenance & corrosion control tracking" },
  { id: "pi", name: "Plant Integrity Monitoring", maxPoints: 70, description: "Inspection currency, RBI completion" },
  { id: "po", name: "Production Optimisation", maxPoints: 60, description: "Optimisation actions identified and implemented" },
  { id: "ia", name: "Inhibited Alarms", maxPoints: 50, description: "Duration, review frequency, authorisation" },
  { id: "de", name: "Desktop Exercises", maxPoints: 50, description: "Scenario participation, learning capture" },
];

export interface TeamScores {
  team: string;
  total: number;
  cycleMovement: number;
  scores: Record<string, number>;
}

export const STP_TEAMS: TeamScores[] = [
  {
    team: "C",
    total: 878,
    cycleMovement: 1,
    scores: { ps: 101, am: 95, ptw: 87, pc: 93, os: 71, tm: 70, env: 65, hse: 55, mcc: 51, pi: 62, po: 45, ia: 42, de: 41 },
  },
  {
    team: "A",
    total: 831,
    cycleMovement: -1,
    scores: { ps: 98, am: 88, ptw: 77, pc: 89, os: 68, tm: 66, env: 62, hse: 53, mcc: 49, pi: 60, po: 42, ia: 40, de: 39 },
  },
  {
    team: "D",
    total: 803,
    cycleMovement: 1,
    scores: { ps: 96, am: 85, ptw: 72, pc: 85, os: 64, tm: 64, env: 60, hse: 51, mcc: 46, pi: 58, po: 40, ia: 41, de: 41 },
  },
  {
    team: "B",
    total: 742,
    cycleMovement: -2,
    scores: { ps: 90, am: 80, ptw: 41, pc: 82, os: 62, tm: 68, env: 58, hse: 48, mcc: 44, pi: 58, po: 38, ia: 38, de: 35 },
  },
];

export interface CycleAlert {
  id: string;
  team: string;
  dimension: string;
  severity: "High" | "Medium" | "Low";
  headline: string;
  detail: string;
  correctionWindow: string;
  timestamp: string;
  confidence: Confidence;
}

export const WITHIN_CYCLE_ALERTS: CycleAlert[] = [
  {
    id: "CA-001",
    team: "B",
    dimension: "PTW Effectiveness",
    severity: "High",
    headline: "Team B — PTW gas-test compliance 32% this week",
    detail: "Weekly gas-test completion audit shows 12 of 38 applicable permits had a confirmed atmospheric gas test result before work commencement. This is the single largest driver of the current inter-shift points gap (41/100 vs Team C's 87/100 in this dimension). Pattern began on day 6 of 14.",
    correctionWindow: "4 days remaining in cycle",
    timestamp: "06:55 today",
    confidence: "High",
  },
  {
    id: "CA-002",
    team: "A",
    dimension: "Process Safety",
    severity: "Medium",
    headline: "Team A — SCE acceptance form AF-BT19-771B unsigned",
    detail: "Acceptance form for 44RV-771B certificate expiry deviation has been Awaiting sign-off for 12 days. This deducts 4 points from the Process Safety dimension and is at risk of escalating to a higher deduction band if not resolved before cycle end.",
    correctionWindow: "5 days remaining in cycle",
    timestamp: "06:55 today",
    confidence: "High",
  },
  {
    id: "CA-003",
    team: "D",
    dimension: "Inhibited Alarms",
    severity: "Medium",
    headline: "Team D — 44LIA-771 inhibit duration approaching review threshold",
    detail: "44LIA-771 has been inhibited since 19 Jan 2025. The inhibit authorisation is due for renewal and proof test. If not reviewed within this cycle, an automatic deduction will apply under the Inhibited Alarms dimension.",
    correctionWindow: "5 days remaining in cycle",
    timestamp: "07:10 today",
    confidence: "Medium",
  },
  {
    id: "CA-004",
    team: "B",
    dimension: "Alarm Management",
    severity: "Low",
    headline: "Team B — standing alarm count elevated (14 alarms > 24 hrs)",
    detail: "14 alarms have been in standing state for more than 24 hours on Team B's watch. The threshold for a minor deduction is 10. Reviewing and rationalising these before cycle end would recover approximately 3 points.",
    correctionWindow: "4 days remaining in cycle",
    timestamp: "07:30 today",
    confidence: "High",
  },
];

export interface CycleReportDimension {
  dimensionId: string;
  name: string;
  maxPoints: number;
  scores: { team: string; score: number }[];
  narrative: string;
}

export const CYCLE_REPORT: {
  cycleId: string;
  period: string;
  day: number;
  of: number;
  dimensions: CycleReportDimension[];
  overallNarrative: string;
  rankingNarrative: string;
} = {
  cycleId: "2026-16",
  period: "08 Aug – 21 Aug 2026",
  day: 9,
  of: 14,
  dimensions: STP_DIMENSIONS.map((d) => ({
    dimensionId: d.id,
    name: d.name,
    maxPoints: d.maxPoints,
    scores: STP_TEAMS.map((t) => ({ team: t.team, score: t.scores[d.id] })),
    narrative:
      d.id === "ptw"
        ? "Team B's 32% weekly gas-test compliance score is the standout deduction — 59 points below Team C in a single dimension, and the primary driver of their fourth-place position. This pattern began on day 6 and requires correction before cycle close. Teams A, C, and D are all within normal band."
        : d.id === "ps"
        ? "Process Safety scores are constrained by the BT-19 threat-line-14 ABSENT barrier across all teams; the SCE status is plant-wide and does not differentiate between teams. AF-BT19-771B unsigned for Team A applies a marginal deduction."
        : d.id === "am"
        ? "Team C leads on Alarm Management with 95/100, driven by zero standing-alarm additions this cycle. Team B's elevated standing-alarm count (14 alarms > 24 hrs) results in a minor deduction relative to peers."
        : `Scores in ${d.name} are within expected range across all teams this cycle.`,
  })),
  overallNarrative:
    "Cycle 2026-16 is on day 9 of 14. Team C holds the overall lead at 878 points, driven by strong performance in Alarm Management and Procedure Compliance. The most significant story this cycle is Team B's PTW Effectiveness score: a 32% weekly gas-test compliance rate has created a 136-point gap between B and the leader. Teams A and D are closely matched in the 800–831 band. Scores are computed deterministically from verified operational records; the narrative above describes where and why deductions occurred — a narrative error cannot change a score.",
  rankingNarrative:
    "Rank 1 Team C (878) · Rank 2 Team A (831) · Rank 3 Team D (803) · Rank 4 Team B (742). Cycle-on-cycle movement: C ▲1, A ▼1, D ▲1, B ▼2.",
};

// ─── Audit Trail ─────────────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  timestamp: string;
  module: "T1" | "T2" | "T3" | "T4" | "System" | "ProSafe Intelligence";
  actionType: "Classification" | "Draft" | "Query" | "Briefing" | "Alert" | "Gate check" | "Routing" | "Review request" | "Escalation";
  description: string;
  sourceSystems: string[];
  confidence: Confidence;
  user: string;
  outcome: "Completed" | "Queued for review" | "Blocked" | "Approved";
}

export const AUDIT_TRAIL: AuditEntry[] = [
  { id: "AU-001", timestamp: "09:02", module: "T3", actionType: "Draft", description: "Generated crew change handover note — 14-day synthesis across 3 role views (Operator / Supervisor / HPSO)", sourceSystems: ["EoSR", "Omnisafe", "Isolation Register"], confidence: "High", user: "System", outcome: "Completed" },
  { id: "AU-002", timestamp: "08:31", module: "T3", actionType: "Routing", description: "Field note 'P-201A bearing temp elevated' routed to EoSR §3, §11 — tag extracted: P-201A — escalation flag raised", sourceSystems: ["EoSR"], confidence: "High", user: "T. Okonkwo", outcome: "Completed" },
  { id: "AU-003", timestamp: "08:05", module: "T2", actionType: "Gate check", description: "PSF#1 compliance check run on ICC-2026-0418 — BLOCKED: single barrier on hydrocarbon drain, sign-off prevented", sourceSystems: ["Isolation Register", "PSF Standard rev 6"], confidence: "High", user: "System", outcome: "Blocked" },
  { id: "AU-004", timestamp: "07:42", module: "T1", actionType: "Classification", description: "44RV-771B classified Degraded — certificate expired 02 Jun 2026, SAP PM WO 41244102 raised", sourceSystems: ["SAP PM"], confidence: "High", user: "System", outcome: "Completed" },
  { id: "AU-005", timestamp: "07:38", module: "T1", actionType: "Briefing", description: "Daily Barrier Health Briefing synthesised for BT-19 — 6 degraded/absent items surfaced", sourceSystems: ["Omnisafe", "SAP PM"], confidence: "High", user: "System", outcome: "Completed" },
  { id: "AU-006", timestamp: "07:31", module: "T2", actionType: "Draft", description: "Isolation certificate ICC-2026-0412 drafted from work order text 'K-2401 seal overhaul — process isolation required'", sourceSystems: ["Isolation Register", "SAP PM"], confidence: "Medium", user: "System", outcome: "Completed" },
  { id: "AU-007", timestamp: "07:14", module: "T3", actionType: "Routing", description: "Field note 'E-4420 outlet temp 214°C' routed to EoSR §3, §7 — escalation raised to Supervisor", sourceSystems: ["EoSR"], confidence: "High", user: "T. Okonkwo", outcome: "Completed" },
  { id: "AU-008", timestamp: "07:12", module: "T1", actionType: "Classification", description: "44RV-002B could not be classified — no Performance Standard linkage in SAP PM — queued for barrier-owner review", sourceSystems: ["SAP PM"], confidence: "Low", user: "System", outcome: "Queued for review" },
  { id: "AU-009", timestamp: "06:55", module: "T4", actionType: "Alert", description: "Within-cycle alert generated — Team B PTW gas-test compliance 32%, correction window 4 days", sourceSystems: ["STP Register", "PTW System"], confidence: "High", user: "System", outcome: "Completed" },
  { id: "AU-010", timestamp: "06:48", module: "T2", actionType: "Gate check", description: "Cross-ICC conflict detected — valve 44-XV-118 shared between ICC-2026-0423 and ICC-2026-0431; ICC-2026-0431 suspended", sourceSystems: ["Isolation Register"], confidence: "High", user: "System", outcome: "Blocked" },
  { id: "AU-011", timestamp: "06:40", module: "ProSafe Intelligence", actionType: "Query", description: "Query: 'Which BT-19 barriers are currently Absent?' — answered with 2 citations, High confidence", sourceSystems: ["Omnisafe", "SAP PM"], confidence: "High", user: "A. Bello", outcome: "Completed" },
  { id: "AU-012", timestamp: "06:32", module: "T1", actionType: "Escalation", description: "Escalation raised to barrier owner (Inspection Engineer) for 44RV-771B — cert expiry 81 days overdue", sourceSystems: ["Barrier Register"], confidence: "High", user: "A. Bello", outcome: "Completed" },
  { id: "AU-013", timestamp: "06:20", module: "T4", actionType: "Classification", description: "STP leaderboard updated — Team C leads (878/1000), Team B drops to 4th following PTW dimension deduction", sourceSystems: ["STP Register"], confidence: "High", user: "System", outcome: "Completed" },
  { id: "AU-014", timestamp: "05:55", module: "T3", actionType: "Routing", description: "Offline-queued field entry (CW-101 strainer block) submitted — routed to §3, §12 on sync", sourceSystems: ["EoSR"], confidence: "High", user: "T. Okonkwo", outcome: "Completed" },
  { id: "AU-015", timestamp: "05:40", module: "ProSafe Intelligence", actionType: "Query", description: "Query: 'Show all jobs where PSF#1 compliance has not been confirmed' — returned ICC-2026-0418, High confidence", sourceSystems: ["Isolation Register", "PSF Standard rev 6"], confidence: "High", user: "S. Musa", outcome: "Completed" },
  { id: "AU-016", timestamp: "00:00", module: "System", actionType: "Briefing", description: "Cycle 2026-16 mid-cycle report generated — day 9 of 14 snapshot committed to audit log", sourceSystems: ["STP Register", "EoSR", "Omnisafe", "SAP PM"], confidence: "High", user: "System", outcome: "Completed" },
];

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
