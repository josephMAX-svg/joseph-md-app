# Research-Paper PRODUCTION Pipeline (Claude Code Multi-Agent)
### Dr. Joseph Soto Tocas — Dermatology + research record toward Mayo Clinic
**Goal:** topic → publication-ready manuscript, from zero, ~1h/day human review.
**Model:** A staged protocol. Agents draft; *you* decide. Every stage has a hard deadline and a ~10–15 min human gate. Five gates = ~1h/day.

> **Opinionated thesis:** Your scarce resource is not writing — Claude writes fast. Your scarce resources are (1) *judgment on what is true*, (2) *clinical material you legally own* (your own patients/cases), and (3) *a real co-author/mentor who signs off*. Build the pipeline around protecting those three. The highest-ROI first paper is a **case report from your own patient** — you already own the data, IRB burden is minimal, and dermatology is the single most image-driven, case-report-friendly specialty in medicine.

---

## 0. ROI RANKING — read this first (highest-yield first)

| Rank | Move | Why it's #1 ROI | Time-to-PubMed |
|------|------|-----------------|----------------|
| 1 | **Case report from YOUR OWN derm patient** (with image) | You own the data. No literature dependency. Dermatology = visual = editors love it. CARE checklist is short. | 6–10 weeks |
| 2 | **Narrative review** on a narrow derm topic you'll need for boards anyway (double-dips with MIR/USMLE/ENCAPS study) | Compounds with exam prep. No new data needed. | 8–12 weeks |
| 3 | **Scoping review** (PRISMA-ScR) on a gap you find while doing #1/#2 | Higher prestige than narrative, structured/reproducible, Claude excels at the mechanical screening | 12–20 weeks |
| 4 | Image-based "Quiz / Clinical image" submissions (NEJM Images, JAAD "Notes & Comments") | Tiny, fast, indexed, builds CV line-items | 4–8 weeks |
| ❌ | Systematic review + meta-analysis as FIRST paper | Trap. Needs ≥2 screeners, stats, months, and a methodologist. Do it as paper #4–5, not #1. | avoid for now |

**Compounding rule:** every topic you pick for a paper MUST be a topic on your exam-prep critical list. One unit of study → two outputs (exam mastery + publication). Never research something you won't be tested on.

---

## 1. THE AGENT ROLES & HANDOFFS

Pipeline is a **directed chain with human gates (◆) between phases.** Each agent is a Claude Code sub-agent (a `.md` prompt file in `RESEARCH_PIPELINE/agents/`) plus a small Python or bash tool it can call. Data flows as plain files in a per-paper folder so everything is inspectable and version-controlled in git.

```
TOPIC
  └─►[A1 Lit-Search]──search_results.json
        └─►[A2 Screen/Extract]──included.csv + evidence_table.md
              ◆ GATE 1 (you: 10 min — approve included studies)
              └─►[A3 Background / Marco teórico]──background.md
                    └─►[A4 Introduction]──intro.md
                          ◆ GATE 2 (you: 10 min — approve framing + thesis)
                          └─►[A5 Methods]──methods.md
                                └─►[A6 Results/Figures]──results.md + /figures
                                      ◆ GATE 3 (you: 15 min — verify numbers/figures)
                                      └─►[A7 Writing/Style]──manuscript.md
                                            ◆ GATE 4 (you: 15 min — read aloud, fact-check)
                                            └─►[A8 Submission-prep]──cover_letter + checklist
                                                  ◆ GATE 5 (you: 10 min — final sign-off)
                                                  └─► CO-AUTHOR/MENTOR review → SUBMIT
```

> **The non-negotiable human anchor:** A "review/extraction" agent can hallucinate a p-value or a citation. You are a physician — *your* job at each gate is to assume the agent lied and spot-check. Specifically: open the actual PDF for ≥2 random claims per gate and confirm them. This is the entire reason the pipeline is safe.

---

### A1 — Literature-Search Agent
**Job:** Turn a topic into a deduplicated, ranked list of real, retrievable papers — legal open-access first.

- **Inputs:** topic string, PICO/concept terms, date range, language, study-type filter.
- **Outputs:** `search_results.json` (PMID, DOI, PMCID, title, year, journal, abstract, OA-status, OA-PDF-URL, source-DB), plus `search_log.md` (exact queries run + counts — needed for PRISMA/reproducibility).
- **FREE tools/APIs (use in this priority order):**
  1. **PubMed E-utilities** — base `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`. Flow: `esearch.fcgi` → PMIDs, then `efetch.fcgi`/`esummary.fcgi` for metadata. **Get a free API key** (NCBI account → Settings) to go from **3 → 10 req/s**; pass `&api_key=...`. `retmax` max 10,000 — page with `retstart`. *(verified: NCBI E-utilities docs)*
  2. **Europe PMC REST** — `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=...&format=json`. Covers PubMed + preprints + patents + Agricola (~33M+ records). Full text (open subset) via `.../rest/{PMCID}/fullTextXML`. No key needed. Best single source for **machine-readable full text**. *(verified: europepmc.org/RestfulWebService)*
  3. **OpenAlex** — `https://api.openalex.org/works?filter=...`. ⚠️ **As of Feb 13 2026 an API key is REQUIRED.** Free key at `openalex.org/settings/api` → 100,000 credits/day (without key: 100/day, testing only). The old `mailto=` polite pool is **discontinued**. Great for citation graph / "find related" / venue & author metadata. *(verified: OpenAlex changelog + Authentication & Pricing docs — note this is a recent change; re-confirm at signup.)*
  4. **Unpaywall** — `https://api.unpaywall.org/v2/{DOI}?email=YOUR_EMAIL`. Free, requires your email in the query. Returns the **best legal OA PDF** for a DOI. This is your legal "get the full text" hammer. *(verified: unpaywall.org/products/api)*
  5. **DOAJ API** — `https://doaj.org/api/search/articles/{query}`. Directory of Open Access Journals; 100% legal OA. Good for finding OA *journals* to later submit to, and OA articles.
  6. **Preprints:** medRxiv/bioRxiv API (`https://api.biorxiv.org/`) for the newest signal.
- **CyberLeninka & Sci-Hub — what the user asked about, stated plainly:**
  - **CyberLeninka** (`cyberleninka.org`) — a **legal** Russian open-science aggregator; most content is **CC-BY / Creative Commons**, so redistribution is permitted. Fine to use, but coverage skews Russian/regional and it is **not** a primary index for high-impact derm literature. Use as a *supplement*, not a backbone. *(verified: cyberleninka.org/about)*
  - **Sci-Hub** (`sci-hub.*`) — a **shadow library** that bypasses paywalls **regardless of copyright**. It is **illegal in many jurisdictions** (Elsevier won a US$15M US judgment; blocked in the US, India, Russia, parts of the EU). **Do NOT wire it into an automated pipeline and do not rely on it for a manuscript you intend to publish** — using pirated full text in a record you submit is an integrity and legal liability, and many institutions/journals treat it as misconduct. **Hard rule for this pipeline: legal OA only** (PMC, Europe PMC, Unpaywall, DOAJ, preprints, your institution's licensed access). If a paper is paywalled and you genuinely need it, get it the legitimate way: institutional login, interlibrary loan, or email the corresponding author for a reprint (works ~50% of the time, totally legal). *(verified: en.wikipedia.org/wiki/Sci-Hub)*
- **Quality bar before handoff:** dedupe by DOI then by normalized title; flag retractions (PubMed publication-type / RetractionWatch); keep the `search_log.md` exact so it survives peer review.

---

### A2 — Screening & Extraction Agent
**Job:** Apply inclusion/exclusion criteria, then pull structured data into an evidence table.

- **Inputs:** `search_results.json`, an **explicit** inclusion/exclusion rubric (you write this once with the agent), the extraction schema.
- **Outputs:** `screening.csv` (per record: include/exclude + one-line reason), `included.csv`, `evidence_table.md` (one row per study: design, n, population, intervention, key outcome + effect size, limitations, **PMID + page/section the claim came from**), and PRISMA counts (identified / screened / included / excluded-with-reasons).
- **Extraction schema (define on Day 2 — this is your reusable asset):**
  ```yaml
  study_id: PMID
  citation: AMA-format string
  design: [RCT|cohort|case-control|case-series|case-report|review|...]
  n: integer
  population: text
  exposure_or_intervention: text
  comparator: text
  primary_outcome: text
  effect: {measure: [OR|RR|HR|mean-diff|%], value: float, ci95: [lo,hi], p: float}
  key_finding: one sentence
  limitations: text
  risk_of_bias: [low|some|high|n/a]
  source_quote: verbatim ≤25 words  # provenance — must be checkable
  source_location: "PMCID, section/figure"
  ```
- **FREE tools:** full text via Europe PMC `fullTextXML` (open subset) and Unpaywall PDFs; parse PDFs locally. Push the included set to **Zotero** for citation management.
- **Hard rule:** **every extracted number carries a `source_quote` + `source_location`.** No provenance → the row is marked `UNVERIFIED` and cannot enter the manuscript. This single rule kills 90% of hallucination risk.

**◆ GATE 1 (10 min):** You read `evidence_table.md`, spot-check 2 random `source_quote`s against the real PDF, and approve/trim the included set.

---

### A3 — Background / Marco-Teórico Agent
**Job:** Build the conceptual scaffold — definitions, epidemiology, pathophysiology, current consensus, and the **gap**.
- **Inputs:** approved `evidence_table.md`, topic.
- **Outputs:** `background.md` — structured, every claim cited to a row in the evidence table (no free-floating assertions). Ends with an explicit **"What is unknown"** paragraph that seeds the Introduction's thesis.
- **Style:** neutral, dense, AMA citation markers `[n]` mapped to the Zotero library. No claim without a `[n]`.

---

### A4 — Introduction Agent
**Job:** Funnel from broad importance → specific gap → this paper's aim/question, in ≤4 paragraphs.
- **Inputs:** `background.md`, the gap statement.
- **Outputs:** `intro.md` ending in a single explicit aim sentence ("We report…" / "We aimed to map…"). For a case report: 1–2 short paragraphs on why this case is notable.

**◆ GATE 2 (10 min):** Approve the **framing + thesis**. This is the highest-leverage gate — if the question is wrong, everything downstream is wasted. Change one sentence here, not ten pages later.

---

### A5 — Methods Agent
**Job:** Write reproducible methods matched to the **correct reporting guideline**.
- **Inputs:** paper type, your actual procedure (for a case report: timeline of the patient encounter; for a scoping review: the A1 `search_log.md` + A2 rubric, which ARE your methods).
- **Outputs:** `methods.md` + the matching **EQUATOR checklist** filled in.
- **Reporting guideline by paper type (memorize this — editors desk-reject papers missing them):**
  - **Case report → CARE** checklist *(EQUATOR Network)*
  - **Scoping review → PRISMA-ScR** (20 essential + 2 optional items, 2018) *(verified: equator-network.org/reporting-guidelines/prisma-scr; acpjournals.org M18-0850)*
  - **Systematic review → PRISMA 2020** (later, not your first paper)
  - **Narrative review →** no formal checklist, but follow **SANRA** for quality.
  - All guidelines indexed at **equator-network.org** — the agent should fetch the current checklist, never guess it.
- **Ethics:** case report needs **written patient consent** (CARE requires it) and usually a de-identification pass. Most IRBs deem single case reports exempt, but **confirm with your institution** — this is a *you* task, not an agent task.

---

### A6 — Results / Figures Agent
**Job:** Present findings: case timeline + images (case report), or PRISMA flow + charted data table (scoping review).
- **Inputs:** evidence table / case data.
- **Outputs:** `results.md`, a **PRISMA flow diagram** (counts from A1/A2), data tables, and figure stubs.
- **FREE figure tools:** Python `matplotlib`/`pandas` for charts and the PRISMA flow (deterministic, reproducible from the counts file); export 300+ DPI TIFF/PNG. For the PRISMA diagram specifically, the official **PRISMA Statement** site has a generator; `matplotlib` reproduces it fine. **Clinical photos:** yours, de-identified (crop faces/tattoos/identifiers), with consent on file.
- **Hard rule:** every number in `results.md` must trace to a file the agent can re-derive (the counts JSON, the evidence CSV). No hand-typed totals.

**◆ GATE 3 (15 min):** **Numbers & figures gate.** You re-add the PRISMA arithmetic by hand (identified − duplicates − excluded = included). You confirm each figure shows what the caption claims. This is where fabricated stats die.

---

### A7 — Writing / Style Agent
**Job:** Fuse intro+background+methods+results+discussion into one manuscript in the target journal's voice; add limitations, conclusion, abstract, keywords.
- **Inputs:** all section files + target journal's author guidelines (fetch them).
- **Outputs:** `manuscript.md` (+ structured abstract, title options, keywords, AMA reference list auto-built from Zotero).
- **Style controls:** AMA 11th style; active voice; remove hedging/redundancy; flag any sentence lacking a citation; enforce journal word limits. Run an "AI-tells" pass to strip robotic phrasing (no "delve", "tapestry", "it's important to note").

**◆ GATE 4 (15 min):** **Read the abstract + discussion aloud.** Fact-check 2 more random citations against PubMed. Confirm it sounds like *you*, a clinician — not a chatbot. Edit voice directly.

---

### A8 — Submission-Prep Agent
**Job:** Package for the chosen journal.
- **Inputs:** final manuscript, target journal.
- **Outputs:** cover letter, title page (authors/affiliations/ORCID/conflicts/funding), completed reporting checklist, suggested reviewers, formatted references, and a **journal-fit shortlist** with APCs.
- **Target journals for a derm case report (verify APC at submission — fees change):**
  - **JAAD Case Reports** — open access, case-report-dedicated, **APC ≈ US$850** *(verified: jaadcasereports.org / DOAJ 2352-5126)*. High-prestige for the niche.
  - **Journal of Dermatological Case Reports** (`jdcronline.org`).
  - **Cureus** — fast, indexed in PubMed/PMC, historically low/no APC (**confirm current fee — it has changed; I did not verify a 2026 number, so do not assume free**). Good for a *first* publishable line-item.
  - General OA APCs run roughly **US$300–1200**; budget accordingly. *(verified range: PMC PMC5522590)*

**◆ GATE 5 (10 min):** Final sign-off, then hand to your **human co-author/mentor**. **A trainee almost never publishes solo** — a senior co-author who vouches for the clinical accuracy is both an integrity safeguard and the thing that actually gets you accepted (and gets you the Mayo letter later). *Securing this mentor is task #1 of Week 1.*

---

## 2. INPUTS/OUTPUTS + FREE-TOOL MAP (quick reference)

| Agent | In | Out | Primary free API/tool | Verified note |
|-------|----|----|----------------------|---------------|
| A1 Search | topic, terms | `search_results.json`, `search_log.md` | PubMed E-utils (key→10 req/s), Europe PMC REST, Unpaywall (`?email=`), DOAJ, OpenAlex (**key now required**) | E-utils 3→10 req/s w/ key; OpenAlex key req'd since Feb 13 2026 |
| A2 Screen/Extract | results + rubric | `included.csv`, `evidence_table.md`, PRISMA counts | Europe PMC `fullTextXML`, Unpaywall PDFs, **Zotero Web API v3** | Zotero: `Zotero-API-Key` header; ≤50 items/write |
| A3 Background | evidence table | `background.md` | Claude + Zotero refs | — |
| A4 Intro | background | `intro.md` | Claude | — |
| A5 Methods | procedure/log | `methods.md` + checklist | **EQUATOR** (CARE / PRISMA-ScR) | fetch live checklist |
| A6 Results/Figures | data | `results.md`, `/figures`, PRISMA flow | `matplotlib`, `pandas`, PRISMA generator | reproducible from counts |
| A7 Writing | all sections | `manuscript.md`, abstract | Claude + journal guidelines | AMA 11th |
| A8 Submission | manuscript | cover letter, checklist, journal shortlist | DOAJ (find OA venue), journal sites | verify APCs live |

**Zotero detail (verified, zotero.org/support/dev/web_api/v3):** free; create an API key in account settings; auth via `Zotero-API-Key: <key>` header; write up to 50 items/request; array fields (tags, collections) are treated as complete lists. Use the `pyzotero` Python library to script it.

---

## 3. FIRST-WEEK BUILD PLAN (Claude Code, ~1h/day)

> Philosophy: build the **rails** before the train. By Friday you have a working lit-search + extraction skeleton and a chosen first paper. You do NOT need all 8 agents in week 1 — you need A1, A2, the schema, and a topic.

**Day 0 (this weekend, 30 min) — human-only:**
- DM/email **two potential senior co-authors/mentors** (a derm attending you know). One sentence: "I'm building a small case-report/review; can I work under your supervision?" *Nothing in this pipeline matters without this.*
- Create accounts + free API keys: **NCBI/PubMed**, **OpenAlex**, **Unpaywall** (just needs email), **Zotero**. Store keys in `RESEARCH_PIPELINE/.env` (git-ignored).

**Day 1 — Build the Lit-Search agent (A1).**
- In Claude Code: create `RESEARCH_PIPELINE/agents/A1_search.md` (the agent's system prompt) + `tools/search_pubmed.py` calling E-utilities (`esearch`→`efetch`). Add Europe PMC + Unpaywall calls.
- Test on a real query you care about (a derm topic from your critical exam list). Confirm you get real PMIDs and OA PDF links.
- *Learn today:* E-utilities query syntax + MeSH terms. ~20 min reading NBK25497.

**Day 2 — Build the extraction schema + Screening agent (A2).**
- Write the YAML extraction schema (section A2 above) into `RESEARCH_PIPELINE/schema/extraction.yaml`.
- Create `agents/A2_extract.md` that reads `search_results.json` + the schema and emits `evidence_table.md` with **mandatory `source_quote`**.
- Wire **Zotero** (`pyzotero`) to push included items.
- *Learn today:* what makes a good inclusion/exclusion rubric.

**Day 3 — Pick the paper + write the protocol.**
- **Decide your first paper** (almost certainly a case report from one of your own patients — pick the patient/image today). If you have no case yet, default to a **narrow narrative review** on a CRÍTICA exam topic.
- With the agent, draft a 1-page **protocol**: question, paper type, target journal, reporting checklist (CARE or PRISMA-ScR), deadline. Save as `papers/<slug>/protocol.md`.
- *Learn today:* read the **CARE checklist** end to end (it's short).

**Day 4 — Background + Intro agents (A3, A4); run them on real evidence.**
- Create `agents/A3_background.md`, `agents/A4_intro.md`.
- Run A1→A2→A3→A4 end-to-end on your topic. Read the draft background. **GATE 1 + GATE 2 happen for real today.**
- *Learn today:* how AMA citations + Zotero map to `[n]` markers.

**Day 5 — Methods + the human-gate ritual; write the Makefile/runner.**
- Create `agents/A5_methods.md` that fetches the live EQUATOR checklist.
- Build a single runner (`run.py` or a `Makefile`) so one command executes the chain and **stops at each ◆ gate** awaiting your OK. This is what makes it "~1h/day".
- Define your **daily 1h review block** as a fixed micro-schedule slot (mirror your ENCAPS app's time-slot pattern), e.g. **21:00–22:00**: 5 gates × ~12 min.
- *Weekend:* A6/A7/A8 are built the following week, just-in-time, when you actually reach results/writing.

**Week-1 done = ** working A1–A5, an extraction schema, a chosen paper with a protocol + deadline, a mentor contacted, and a one-command runner with gates.

---

## 4. EASIEST FIRST PAPERS + TARGET TIMELINE

| Type | Difficulty | What you need | Realistic timeline |
|------|-----------|---------------|--------------------|
| **Case report** (best first) | ★☆☆ | 1 interesting own patient + image + consent + CARE checklist + mentor | **6–10 weeks** to submission |
| **Narrative review** | ★★☆ | a narrow topic + ~20–40 sources, no new data | **8–12 weeks** |
| **Scoping review (PRISMA-ScR)** | ★★★ | a registered protocol + systematic search + charting | **12–20 weeks** |
| Clinical image / quiz | ★☆☆ | one striking image + 150 words | **4–8 weeks** |

**Recommended 12-week arc for paper #1 (case report):**
- Wk 1: build pipeline (§3) + secure mentor + pick case.
- Wk 2: consent + de-identify image + draft case timeline (A5/A6).
- Wk 3–4: targeted literature (A1/A2) — only the ~10–15 papers needed to frame the case.
- Wk 5–6: background + intro + discussion (A3/A4/A7), gates 1–2.
- Wk 7: figures + final assembly (A6/A7), gate 3–4.
- Wk 8: mentor review round 1.
- Wk 9–10: revise; submission package (A8), gate 5.
- Wk 11: mentor sign-off → **submit to JAAD Case Reports / Cureus.**
- Wk 12: buffer / start paper #2 (the narrative review you've been compounding from exam study).

---

## 5. RISKS / LIMITS + HOW YOU REVIEW IN ~1h/DAY

**Top risks (and the mitigation built into the gates):**
1. **Hallucinated citations / fake numbers.** → Mandatory `source_quote` + `source_location` per claim; you spot-check 2 PDFs at each of Gates 1, 3, 4. A citation the agent can't quote = deleted.
2. **Sci-Hub / pirated content contaminating a publishable record.** → Hard "legal-OA-only" rule (§A1). Paywalled? Institutional access, ILL, or email the author. Never automate Sci-Hub.
3. **OpenAlex/API drift.** → Keys/limits changed in Feb 2026 (OpenAlex now needs a key; polite pool gone). Re-verify endpoints at build time; don't trust any hardcoded limit for more than a few months.
4. **Ethics/consent for case reports.** → Written patient consent + de-identification + your IRB's exemption rule. This is a *human* task, never delegated.
5. **Self-plagiarism / paraphrase-too-close.** → Run text through a similarity check before submission; the writing agent must paraphrase, never copy `source_quote`s into prose.
6. **Authorship integrity.** → ICMJE criteria; AI is a tool, not an author. Disclose AI assistance per the target journal's policy (most now require a statement).
7. **Solo-trainee submission gets ignored.** → Mentor co-author from Day 0.

**Your ~1h/day = the 5 gates (fixed evening block, ENCAPS-style slot):**
| Gate | Min | You do exactly this |
|------|-----|---------------------|
| ◆1 Included studies | 10 | Read evidence table; verify 2 random `source_quote`s vs PDF; cut junk. |
| ◆2 Framing/thesis | 10 | Is the question right & novel? Fix the aim sentence. |
| ◆3 Numbers/figures | 15 | Re-add PRISMA math by hand; confirm each figure ↔ caption. |
| ◆4 Voice/fact | 15 | Read abstract+discussion aloud; fact-check 2 citations; de-robotize. |
| ◆5 Final sign-off | 10 | Checklist complete? Consent on file? Hand to mentor. |

On any given day you're usually at **one** gate, not all five — so most days the review is **10–15 min**, leaving the rest of your hour for the next agent build or exam study. The full ~1h only happens on assembly-heavy days.

---

## 6. COMPOUNDING WITH YOUR EXISTING ENCAPS/STUDY SYSTEM

Map this pipeline onto the app structure you already built:
- **Priority tagging** (CRÍTICA/ALTA/MEDIA/BAJA): tag each candidate paper topic by exam-yield. **Only research CRÍTICA/ALTA topics** so every paper doubles as board prep.
- **Spaced repetition reuse:** the `evidence_table.md` rows are *ready-made flashcards*. Pipe key findings into your SR deck at your existing intervals (1,3,7,28,63 d). One literature search → exam retention.
- **Day-by-day schedule + deadlines:** drop the §3 Day-1…Day-5 build tasks and the §4 12-week arc straight into your day-by-day schedule as dated items with deadlines.
- **Micro-schedule slot:** reserve a fixed 1h "Research" slot (e.g., 21:00–22:00) exactly like your ENCAPS time slots; that slot IS the human-gate hour.

---

### APPENDIX — Verified source URLs
- PubMed E-utilities intro: https://www.ncbi.nlm.nih.gov/books/NBK25497/ · params: https://www.ncbi.nlm.nih.gov/books/NBK25499/ · API keys: https://ncbiinsights.ncbi.nlm.nih.gov/2017/11/02/new-api-keys-for-the-e-utilities/
- Europe PMC REST: https://europepmc.org/RestfulWebService
- Unpaywall API: https://unpaywall.org/products/api
- OpenAlex auth/pricing (key now required): https://docs.openalex.org/how-to-use-the-api/rate-limits-and-authentication · https://help.openalex.org/hc/en-us/articles/24397762024087-Pricing
- DOAJ: https://doaj.org/api · OpenAlex works filter: https://docs.openalex.org/api-entities/works/filter-works
- Zotero Web API v3: https://www.zotero.org/support/dev/web_api/v3/basics
- EQUATOR Network: https://www.equator-network.org · PRISMA-ScR: https://www.equator-network.org/reporting-guidelines/prisma-scr/ · PRISMA-ScR paper: https://www.acpjournals.org/doi/10.7326/M18-0850
- CARE (case reports): https://www.care-statement.org · via EQUATOR
- JAAD Case Reports: https://www.jaadcasereports.org/ · DOAJ record: https://doaj.org/toc/2352-5126
- Choosing a case-report journal: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5522590/
- Sci-Hub (legal status): https://en.wikipedia.org/wiki/Sci-Hub · CyberLeninka (legal/CC): https://cyberleninka.org/about

> **Uncertainty flags (stated honestly):** (1) OpenAlex API-key requirement & limits and the polite-pool removal are *recent (Feb 2026)* — re-confirm at signup. (2) Cureus's current APC: I did **not** verify a 2026 figure — check before assuming it's free. (3) Journal APCs generally drift; verify every fee on the journal site at submission time. (4) IRB/consent rules are institution-specific — confirm with your own institution, not from this doc.
