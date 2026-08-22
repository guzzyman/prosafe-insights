# Prosafe Insights

Lovable Build Prompt — NLNG IOSP Suite (Interactive Demo / Mock)

How to use this file. Paste the block below (everything under "═══ PROMPT START ═══") into Lovable as your initial build prompt. It is written to produce a polished, clickable, front-end-only demo of the Prosafe Intelligent Operations & Safety Platform for Nigeria LNG — with realistic mock data and simulated AI, suitable for showing NLNG stakeholders and your own team. After the first generation, use the follow-up prompts at the bottom to build out each remaining screen one at a time (Lovable does better with incremental scope than one giant generation).

Important framing for the tool: this is a demo with mock/simulated data — no real backend, no real NLNG data, no external API keys. All "AI" responses are pre-scripted or template-generated on the client so the demo is instant, reliable, and offline. Keep it that way.

═══ PROMPT START ═══

Build a professional, investor-grade interactive demo web app called "Prosafe IOSP Suite" — an Intelligent Operations & Safety Platform for a large LNG (Liquefied Natural Gas) plant operator. This is a front-end-only clickable prototype with realistic mock data and simulated AI (no backend, no real API calls, no login required — a "Enter Demo" splash is fine). The audience is senior oil & gas operations and process-safety leaders, plus an internal engineering team. It must feel like a real, deployed control-room-grade product, not a toy.

Product concept (context for you, the builder)

The platform sits on top of an LNG plant's existing systems and turns scattered operational data into live, trustworthy intelligence across four modules. The guiding design principle is "grounded, cited, confidence-scored, human-in-command" — every AI output shows its evidence, a confidence level, and a source citation, and never triggers action on its own. Surface that principle visibly throughout (evidence panels, citation chips, confidence badges).

The four modules (build as a left-hand nav; each is a full section):

T1 — Barrier Visibility (major-hazard safety-barrier status)

T2 — LOTO Assurance (equipment isolation / lock-out management)

T3 — Operational Compliance (field shift logs + AI handover notes)

T4 — Shift Performance (automated shift-team scorecard) Plus a global "Ask IOSP" natural-language query bar available on every screen, and a global Audit Trail view.

Design system (make it look serious and modern)

Aesthetic: industrial control-room / mission-control. Dark theme by default with a clean light-theme toggle. Deep slate/navy backgrounds (#0B1220, #111A2B), card surfaces #16213A, hairline borders #243049.

Accent & status colors: primary accent teal/cyan #22D3EE; status semantics used consistently everywhere — Intact = green #10B981, Degraded = amber #F59E0B, Absent = red #EF4444, Unassessed = grey #64748B. Use small colored dot + label, never color alone (accessibility).

Typography: clean geometric sans (Inter or similar). Tabular/monospaced figures for all numbers, tags, and timestamps. Generous spacing, strong hierarchy, no clutter.

Components: rounded-xl cards with subtle shadows; sticky top bar with plant/train selector, live clock, and the global "Ask IOSP" bar; left sidebar nav with module icons; status pills; data tables with sortable columns; drill-down side-drawers; toast notifications for alerts. Subtle motion (fade/slide, animated count-ups, a gently pulsing "LIVE" dot). Fully responsive; wide tables scroll inside their own container (never break the page layout). Include a small "DEMO — simulated data" watermark chip in the top bar.

Brand: header shows "PROSAFE" wordmark + "IOSP Suite" and a small "for Nigeria LNG" tag. Footer: "Demo build · simulated data · not connected to live systems."

Global elements (build these first)

App shell: sidebar (T1–T4, Audit Trail, Settings) + top bar (train selector: Train 1 / Train 2 / Train 3 / Common Facilities; live clock ticking in Africa/Lagos time; theme toggle; "Ask IOSP" bar; user avatar "HPSO — A. Bello").

"Ask IOSP" natural-language query (signature feature): a prominent search/command bar. Typing a question opens a results panel that returns a grounded answer + a confidence badge + citation chips (e.g. "Source: Omnisafe · SAP PM · updated 4h ago") + a "view evidence" expander showing the underlying mock records. Pre-wire these example questions as clickable suggestion chips, each returning a scripted, realistic answer:

"Which BT-19 barriers are currently Absent?"

"Are the High-criticality remedial actions from the BT-19 handshake — threats 14 and 15 — closed?"

"Show all jobs where PSF#1 compliance has not been confirmed."

"What happened with the Train 2 compressor last rotation?"

"Which shift team leads the STP leaderboard this cycle, and why?"

Home / Command Center landing page: an executive overview with 4 KPI tiles (one per module), a "Major Hazard Status" mini-board, an "AI Activity" feed (recent classifications/drafts/syntheses with confidence), and an alerts strip. Each tile deep-links into its module.

Mock data (use these — they make the demo credible; all fictional but realistic)

Seed a mockData module with the following. Keep tag numbers and IDs monospaced.

Plant / shifts: Trains 1–3 + Common Facilities. Shift teams A, B, C, D. Current HPSO: "A. Bello". Rotation day 9 of 14.

T1 — BT-19 Fuel Gas System bow-tie: 109 threat-to-consequence lines, 124 Safety Critical Elements (SCEs), 14 Critical Human Barrier categories. Overall barrier health: mostly Intact with a few Degraded and 2 Absent. Seed ~20 representative SCEs with tags like 44RV-771A/B, 44RV-002A/B, 44PICA-774, 44PICA-002, 44LIA-771, 44TICA-016, 44TZA-018, 44TZA-019, 44TZA-044, 44LZA-005, 320TZA-826, 1/2/344RV-004A/B, on equipment V-4401, E-4420, E-4410, E-4430. Each SCE row: tag, description, SCA type (Proactive Maintenance / IPF Test / Inspection & Certification / RBI), state (Intact/Degraded/Absent/Unassessed), threat line(s), barrier owner role, last evidence, source system, confidence.

Flagship Absent case — threat line 14: 44TICA-016 fail-open → E-4420 mechanical failure, rated "Not Tolerable / Not ALARP" (Dec 2019 handshake). Remedial action: install 44TZA-044 downstream of E-4420, High criticality, Omnisafe action OMN-BT19-014 OPEN, 487 days overdue → threat line 14 shows ABSENT / no valid control barrier. This is the hero drill-down.

A few Unassessed cases: SCE "not confirmed in SAP PM with Performance Standard" (ties to why a barrier is Unassessed).

T2 — Isolations: ~8 active Isolation Confirmation Certificates (ICCs). Example: ICC-2026-0412 — "Centrifugal compressor K-2401 seal overhaul, Train 2". Components per ICC: mechanical isolation points (valves), spade/blind list, cable locks (Smithlock), electrical (EIC/HVEC), decontamination tag, proving record, PSF#1 status. Seed one ICC with a PSF#1 violation flagged (single barrier on a hydrocarbon drain — blocked from sign-off), one with a cross-ICC conflict (two jobs share valve 44-XV-118), and one fully green. Digital Spade Board statuses: White (available) / Red (spade inserted) / Grey (job ongoing).

T3 — Shift logs: an EoSR (End of Shift Report) with 13 sections; ~15 field entries from operators with equipment tags and natural-language observations (e.g. "P-201A bearing temp elevated ~24% above normal, A running / B standby, maintenance flagged"). A repeat-pattern watchpoint: "bearing temp rising across 3 consecutive shifts on P-201A". A generated Crew Change Handover Note (role views: Operator / Supervisor / HPSO) with every sentence carrying a citation chip to a source entry.

T4 — STP scorecard: 13 dimensions (Process Safety, Alarm Management, PTW Effectiveness, Procedure Compliance, Off-spec Management, Trip Management, Environmental, HSE Walkabouts/Audits, M&CC Monitoring, Plant Integrity Monitoring, Production Optimisation, Inhibited Alarms, Desktop Exercises). Live leaderboard of teams A/B/C/D with points, maxima, traffic-light per dimension, cycle-on-cycle movement. Seed a story: Team C leads; Team B dropped on "PTW Effectiveness" due to a 32% weekly permit-gas-test score (a within-cycle alert fired).

Screens to build (each is a section under the module)

T1 — Barrier Visibility

Major Hazard Status Board — grid of bow-ties (BT-19 prominent) each showing overall barrier health (green/amber/red), for CCR display. Big, glanceable, auto-refresh feel.

BT-19 Barrier Dashboard — the 109 threat lines and 124 SCEs; filter by state/SCA type/equipment; sortable table + a visual "bow-tie" summary strip. Clicking an SCE opens a drill-down drawer: current state, the evidence synthesis (last SCA completion, active work orders, Omnisafe status, latest EoSR reference, acceptance-form status — each cited), the reasoning path ("why this state"), confidence, and barrier-owner. The threat-line-14 / 44TZA-044 case is the showcase.

Daily Barrier Health Briefing — an auto-generated morning briefing card listing every Degraded/Absent barrier with SCE tag, SCA type, source, days overdue, recommended action; "regenerate" button that shows a brief AI-thinking animation then re-renders.

Barrier Owner Portal — a role view (e.g. "Inspection Engineer") showing SCAs due, acceptance-form sign-off status, qualification currency.

T2 — LOTO Assurance

Unified ICC Dashboard — list of active ICCs with a single-screen status per equipment: mechanical / spade / cable-lock / electrical / decon / proving / PSF#1 — each a colored chip. This "one screen instead of seven systems" is the whole point; make it obvious.

ICC detail + GenAI ICC drafting — open ICC-2026-0412; show the AI-drafted isolation certificate generated from a free-text work order ("K-2401 seal overhaul — process isolation required"), with the applied minimum-isolation standard, auto-generated spade list, and a PSF#1 compliance check that visibly PASSES on this one but BLOCKS the violation ICC (show a red "Cannot proceed to sign-off — second barrier required on hydrocarbon drain" gate). Include a "human review & approve" button (with the note that AI drafts, humans approve).

Digital Spade Control Board — a live board of spade points with White/Red/Grey plate visuals, site-wide, filterable by area/train.

Conflict Detection — a panel that flags the two ICCs sharing valve 44-XV-118 with an explanation of the conflict (direct) and an example indirect conflict.

T3 — Operational Compliance

Field Capture (tablet view) — a mobile-styled EoSR entry screen: operator types a natural-language field note; simulated AI parses it and shows which of the 13 EoSR sections it routes to (often several), extracted equipment tag, observation type, and a supervisor-escalation toggle for threshold breaches. Show an offline/queued indicator.

EoSR Live View — the 13-section shift log filling with entries; supervisor compliance dashboard (SoSO items complete/outstanding, round waypoints, deviations).

AI Crew Change Handover Note — the generated 14-day handover with a role selector (Operator / Supervisor / HPSO); every sentence has a citation chip linking to the source EoSR entry; a "watchpoints" section with the P-201A bearing-temp trend; a "review & approve (18 min vs 2 hrs manual)" call-to-action.

T4 — Shift Performance

Live STP Leaderboard — teams A/B/C/D across the 13 dimensions, traffic-light coded, with points/maxima, live ranking, cycle-on-cycle arrows. CCR-display styling.

Within-Cycle Alerts — a feed of scoreable events with AI context ("Team B — PTW gas-test compliance 32% this week, largest driver of the current inter-shift gap; correction window: 4 days"), delivered "while conditions are fresh."

Automated Cycle Report — a generated end-of-cycle report with all dimension scores, ranking, year-to-date, and an AI variance narrative ("where and why deductions occurred") — with a visible note: "scores are deterministic; the AI writes only the narrative — a narrative error can never change a score."

Global: Audit Trail — a searchable, immutable-looking log of every AI inference and user action (timestamp, module, source systems, confidence, user) with filters. Reinforces traceability.

Interaction & "AI" behavior (simulate convincingly, all client-side)

When any AI output is generated/regenerated, show a brief (~1–1.5s) "reasoning…" shimmer, then reveal the result with a confidence badge and citations.

Confidence badges: High / Medium / Low with color; Low-confidence items are visibly "queued for human review" rather than shown as fact — demonstrate this on at least one T1 classification and one T3 routing.

"Unassessed" must appear as a first-class, proud state ("insufficient evidence — will not guess"), not an error.

Alerts: fire a couple of toast notifications on load (e.g. "BT-19 threat line 14 — barrier ABSENT", "ICC PSF#1 check blocked a sign-off") to show the system is "live".

Nothing performs real actions; every "approve/override/escalate" is a simulated confirmation with a toast.

Technical constraints

React + Tailwind, component-based, a single mockData.ts/mockData.js seeding everything, and a tiny client-side "aiSimulator" helper that returns scripted responses with a fake delay. Use lucide-react icons and recharts (or similar) for the leaderboard bars, trend sparklines, and barrier-health donuts. No backend, no auth provider, no external API keys, no browser-storage dependency for core state (keep state in memory). Keep it fast and self-contained so it demos reliably offline.

Accessibility: status never by color alone; keyboard-navigable; sufficient contrast in both themes.

Start by building the app shell + Home Command Center + the global "Ask IOSP" bar + T1 Major Hazard Status Board and BT-19 Barrier Dashboard (with the threat-line-14 drill-down). Make those excellent and cohesive first; I'll ask for T2, T3, T4, and the Audit Trail next.

═══ PROMPT END ═══

Follow-up prompts (paste one at a time after the first build)

Build T2:

Now build the T2 — LOTO Assurance module exactly as specified: Unified ICC Dashboard (one-screen status across mechanical/spade/cable-lock/electrical/decon/proving/PSF#1), the ICC detail screen with GenAI ICC drafting from a free-text work order and the PSF#1 gate that blocks sign-off on the violation ICC (ICC with single barrier on a hydrocarbon drain), the Digital Spade Control Board (White/Red/Grey), and Conflict Detection flagging the two ICCs sharing valve 44-XV-118. Reuse the design system, status colors, confidence badges, and citation pattern from T1.

Build T3:

Now build the T3 — Operational Compliance module: the mobile-styled Field Capture screen (natural-language note → simulated AI routes it to several of the 13 EoSR sections, extracts the equipment tag, offers supervisor escalation, shows an offline-queued indicator), the EoSR Live View with the supervisor compliance dashboard, and the AI Crew Change Handover Note with a role selector (Operator/Supervisor/HPSO) where every sentence carries a citation chip and there's a P-201A bearing-temp watchpoint. Keep the "review & approve (18 min vs 2 hrs)" framing.

Build T4:

Now build the T4 — Shift Performance module: the Live STP Leaderboard (teams A/B/C/D across 13 dimensions, traffic-light, points/maxima, cycle-on-cycle arrows, CCR-display styling with recharts bars), the Within-Cycle Alerts feed (Team B PTW gas-test 32% story), and the Automated Cycle Report with the AI variance narrative and the visible note that "scores are deterministic; AI writes only the narrative." Use donuts/sparklines for trends.

Build the Audit Trail + polish:

Now build the global Audit Trail (searchable, immutable-looking log of every AI inference and user action with timestamp, module, source systems, confidence, user, and filters). Then do a polish pass: ensure the theme toggle works everywhere, the "Ask IOSP" suggestion chips all return scripted grounded answers with citations, two alert toasts fire on load, and the "DEMO — simulated data" chip is visible. Make sure all wide tables scroll within their own container and the app is fully responsive.

Notes for you (Abdulquadri) — not for pasting

Why this demo wins the room: it makes your architecture principles visible — the four-state model (including a proud "Unassessed"), grounded+cited answers, confidence gating, the PSF#1 hard gate, deterministic-score/AI-narrative separation, and the audit trail. Those are precisely the things a process-safety organisation needs to see to trust AI.

The three "mic-drop" moments to demo live: (1) the threat-line-14 drill-down (open High-criticality action → Absent barrier → briefing text, all cited); (2) the PSF#1 gate blocking an unsafe ICC sign-off; (3) the AI crew-change handover where every sentence is clickable to its source EoSR entry.

All names, IDs, and figures are fictional but structurally faithful to the real NLNG frameworks (BT-19, the SCE tags, the STP dimensions, the isolation registers). Keep them fictional in any external showing.

If Lovable struggles with one big screen, split it: build the table first, then the drill-down drawer, then the AI panel. Incremental beats monolithic.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/533550e8-65e5-4db6-819c-76e1c3cab351).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
