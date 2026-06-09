Dossier written and saved. Delivered as a structured markdown research dossier at:

**`D:\joseph-md-app\RESEARCH_PIPELINE\RESEARCH_PRODUCTION_PIPELINE.md`**

It's ready to save as-is and turn into app data (it mirrors your ENCAPS structure: priority tags, spaced-repetition reuse, day-by-day schedule, deadlines, fixed micro-schedule slot).

### What it contains (all 5 requested deliverables)
1. **8 agent roles + handoffs** (A1 Lit-Search → A2 Screen/Extract → A3 Background/marco-teórico → A4 Intro → A5 Methods → A6 Results/Figures → A7 Writing → A8 Submission) with 5 human-in-the-loop gates between phases, drawn as a directed chain.
2. **Concrete inputs/outputs + free tools per agent**, plus a quick-reference table mapping each agent to PubMed E-utilities, Europe PMC REST, Unpaywall, OpenAlex, DOAJ, and Zotero — with a reusable YAML extraction schema.
3. **First-week build plan** (Day 0 weekend → Day 5) using Claude Code: Day 1 build the lit-search agent, Day 2 the extraction schema/screener, Day 3 pick paper + protocol, Day 4 background/intro agents, Day 5 methods + the one-command gated runner.
4. **Easiest first paper types** ranked by ROI (case report from his own patient = #1, narrative review #2, scoping review #3) with a 12-week arc to submission.
5. **Risks/limits + the ~1h/day review ritual** as a 5-gate table (10–15 min each; usually only one gate per day).

### Key load-bearing facts I verified (not from memory)
- **PubMed E-utilities:** base `eutils.ncbi.nlm.nih.gov/entrez/eutils/`; 3 req/s, rising to **10 req/s with a free API key**; `retmax` cap 10,000.
- **OpenAlex changed recently:** an **API key is now REQUIRED (since Feb 13, 2026)** and the `mailto=` polite pool is **discontinued** — flagged as an uncertainty to re-confirm at signup, since it's fresh.
- **Unpaywall:** `api.unpaywall.org/v2/{DOI}?email=...` — free, returns best legal OA PDF.
- **Europe PMC** full text via `.../rest/{PMCID}/fullTextXML`.
- **Zotero Web API v3:** `Zotero-API-Key` header, ≤50 items per write.
- **Reporting guidelines:** CARE for case reports, **PRISMA-ScR (20+2 items, 2018)** for scoping reviews, all on EQUATOR.
- **Sci-Hub vs CyberLeninka** handled per your request: CyberLeninka = legal, mostly CC-BY; Sci-Hub = shadow library, illegal in many jurisdictions (Elsevier US$15M judgment), with a hard pipeline rule of **legal-OA-only** and legitimate alternatives for paywalled papers.
- **JAAD Case Reports APC ≈ US$850** (verified); flagged that I could **not** verify a current 2026 Cureus fee, so it's marked "confirm before assuming free."

### The single most opinionated recommendation in the dossier
First paper = a **case report from one of his own dermatology patients** (he owns the data, minimal IRB burden, derm is the most image/case-friendly specialty), and **task #1 of Week 1 is securing a senior co-author/mentor** — both an integrity safeguard and the realistic path to acceptance and an eventual Mayo letter.

Three honesty/uncertainty flags are called out explicitly in the doc: the recent OpenAlex key change, the unverified Cureus APC, and institution-specific IRB/consent rules.