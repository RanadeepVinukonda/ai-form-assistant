# AI Form & Government Application Assistant — AGENTS.md

## Product Vision

A practical, trustworthy AI platform that helps users complete complex forms (government, visa, tax, scholarship, college, insurance, KYC, onboarding) by explaining fields in plain language, suggesting answers, detecting errors, and remembering progress. The goal: reduce form abandonment and confusion to near zero.

**Tagline:** "Forms made simple. AI that actually helps."

## Market Positioning

| Dimension | Position |
|-----------|----------|
| Category | AI-Powered Form Assistance / Document Automation |
| Target | US + India international students, visa applicants, job seekers, parents, SMEs, HR teams |
| Differentiation | Not a generic chatbot — purpose-built per-form AI with OCR, validation, multi-language, progress saving |
| Pricing | Freemium: free for basic forms + ads; Pro subscription for priority/SaaS features |
| SEO Angle | Capture "how to fill [form name]" + "form assistance" search traffic |

## Problem Analysis

**Core pain:** Complex forms waste time, cause anxiety, and lead to costly rejections.

| Pain Point | Impact | Our Solution |
|------------|--------|-------------|
| Confusing field language | Users skip or fill incorrectly | AI field explanations in plain language |
| No guidance on expected answers | Wrong submissions, rejections | Smart suggestions + examples |
| Errors not caught before submit | Rejections, fees wasted | Real-time validation + error detection |
| Multi-language barrier | Non-native speakers struggle | 20+ language support (Gemini) |
| Progress not saved | Users restart, abandon | Auto-save to localStorage + cloud |
| Papers everywhere | Lost documents, scanning hassle | OCR upload + PDF parsing |
| No conversation | Users feel alone | Chat-like guidance mode |

## User Personas

### 1. Priya (International Student)
- Applying for US F-1 visa + DS-160 form
- Anxious about rejection, needs field-by-field handholding
- Native Telugu speaker, moderate English

### 2. Rajesh (Freelancer)
- Filing IT returns for the first time
- Confused by tax terminology
- Wants to finish in 30 min, not 3 hours

### 3. Sunita (Parent)
- Helping daughter with college applications (Common App)
- Not tech-savvy, prefers step-by-step walkthrough
- Needs PDF upload for documents

### 4. Ankit (Job Seeker)
- Filling multiple onboarding forms across companies
- Tired of re-entering the same data
- Wants one profile that fills everything

### 5. Priya HR (SME)
- Onboarding 50+ employees/month
- Manual KYC document verification is slow
- Needs bulk upload + validation

### 6. Vikram (Small Business Owner)
- Applying for MSME/UDYAM registration
- Doesn't know which documents are needed
- Wants guided checklist + status tracker

## Core User Flows

```
1. Discover → Land on homepage → Search/form catalog → Select form
2. Start   → Create account (optional) → Form intro + checklist
3. Fill    → Field-by-field with AI explanations → Suggestions → Validation
4. Upload  → OCR scan documents → Auto-fill matching fields
5. Review  → Error check → Missing fields flagged → Preview
6. Download → PDF with filled data → Share/link
7. Submit  → Link to official portal → Track status
```

**Alternative flow (guest):** Start filling immediately without account, prompt to save at end.

## Feature Prioritization (MVP → V2 → V3)

### MVP (Ship in 4–6 weeks)
- [ ] Homepage + form catalog (30 forms)
- [ ] Form builder: field-by-field rendering from JSON schema
- [ ] AI field explanations (Gemini free API)
- [ ] Real-time validation (required fields, format checks)
- [ ] Auto-save to localStorage
- [ ] OCR upload for common docs (Aadhaar, PAN, Passport)
- [ ] PDF download of filled form
- [ ] Multi-language: English + Hindi + Telugu
- [ ] Chat mode toggle
- [ ] Google AdSense integration
- [ ] Mobile-first responsive design
- [ ] 1–2 showcase forms (DS-160, Income Tax)

### V2 (3 months)
- [ ] User accounts (Firebase Auth)
- [ ] Cloud save + multi-device sync (Supabase/Firestore)
- [ ] 50+ forms
- [ ] Pro subscription (Stripe)
- [ ] AI suggestion prefill for common fields
- [ ] Form sharing (generate link with prefilled data)
- [ ] Bulk form fill (enter once, fill multiple forms)
- [ ] 10+ languages
- [ ] Error detection before download
- [ ] Dark mode

### V3 (6+ months)
- [ ] Enterprise admin dashboard (HR onboarding)
- [ ] Team collaboration on forms
- [ ] API for form templates
- [ ] Custom form builder (drag & drop)
- [ ] Advanced OCR (table extraction, signatures)
- [ ] WhatsApp integration for conversational fill
- [ ] Auto-submit to government portals (where available)
- [ ] AI form training (train on your documents)
- [ ] Browser extension

## Competitor Analysis

| Competitor | Strength | Our Edge |
|-----------|----------|----------|
| **DocuSign** | Enterprise trust, e-signature | AI guidance, lower cost, focus on developing world forms |
| **Zoho Forms** | Low-code builder | AI explanations, OCR, multi-language |
| **Google Forms** | Free, simple | Complex form support, validation, progress save |
| **ChatGPT / Gemini** | General AI | Purpose-built form UI, not just chat |
| **FormBee / Typeform** | Great UX | Government/serious form focus, OCR |
| **Turbotax** | Tax expertise | Multi-form types (not just tax), free tier |
| **Lawyera** | Legal document AI | Build for common person, not just legal |

## Monetization Strategy

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Basic forms, ads, OCR (3/month), 1 language, localStorage |
| **Pro** | $9.99/mo | All forms, unlimited OCR, 20 languages, cloud save, AI suggestions, PDF export, ad-free |
| **Enterprise** | Custom | Team accounts, admin dashboard, custom forms, API access, SLA, bulk OCR, dedicated AI training |

**AdSense revenue:** Place non-intrusive native ads between form sections and on results page. Estimated RPM: $5–8 (finance/government niche).

**Direct traffic strategy:** SEO-optimized per-form landing pages → free form → upsell Pro for advanced features.

## SEO Strategy

- **Per-form landing pages:** `/{form-type}/{form-name}` (e.g. `/visa/ds-160`) each with unique title, meta description, h1, JSON-LD (HowTo + FAQ schema)
- **Long-tail keywords:** "how to fill DS-160 form step by step", "income tax return filing guide for freelancers"
- **Content hub:** Blog posts comparing forms, region-specific guides
- **Internal linking:** Related forms at bottom of each page
- **Technical SEO:** fast TTFB (<500ms), 100 Lighthouse, proper sitemap, robots.txt, semantic HTML
- **Schema.org:** `HowTo`, `FAQPage`, `SoftwareApplication`, `Service`
- **Backlink strategy:** Guest posts on visa/education/finance blogs; free embeddable "form assistant widget"

## Technical Architecture

```
Frontend (Vite + React + Tailwind + DaisyUI + Framer Motion)
    ↕ REST API
Backend (Node.js + Express)
    ↕ Database
Firebase (Auth) + Supabase (DB + Storage)
    ↕ External APIs
Gemini API (AI) + Tesseract.js (OCR) + PDF.js (Parse)
    ↕
Hosting: Vercel (frontend) + Render (backend)
```

**Why Vite + React over Next.js:** Simpler deployment (static on Vercel), no SSR complexity needed since forms are client-interactive, better dev experience for a form-heavy app. We use Express for API + auth + AI proxy.

**Why Firebase + Supabase dual:** Firebase Auth for easy social login, Supabase for relational form schema + storage + real-time.

## Database Architecture (Supabase)

```
users
  id, email, name, locale, tier, created_at

forms
  id, slug, title, category, country, schema_json, created_at

user_forms
  id, user_id, form_id, data_json, status, language, progress, created_at, updated_at

documents
  id, user_form_id, filename, file_url, extracted_text, created_at

ai_explanations (cache)
  id, field_id, language, explanation_text, created_at

payments (V2)
  id, user_id, stripe_id, tier, expires_at
```

**Why `schema_json`:** Each form is defined by a JSON schema (fields, validation rules, help text). This makes adding new forms a config change, not a code change.

## API Architecture (Express)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/forms` | GET | List available forms |
| `/api/forms/:slug` | GET | Get form schema |
| `/api/forms/:slug/explain/:field` | POST | AI explanation (cached) |
| `/api/forms/:slug/validate` | POST | Validate form data |
| `/api/forms/:slug/suggest` | POST | AI suggest field values |
| `/api/user-forms` | GET/POST | Save/load user progress |
| `/api/ocr` | POST | OCR document → text + fields |
| `/api/translate` | POST | Translate field text (Gemini) |
| `/api/forms/:slug/download` | POST | Generate filled PDF |

**Auth:** Firebase token verified via middleware on all `/api/user-forms`, `/api/ocr`, `/api/translate`.

## Security Considerations

- **No PII storage without user consent:** User data stored only when account created
- **Firebase Auth** for authentication (OAuth providers supported)
- **Rate limiting** on AI/OCR endpoints (per IP, per user)
- **File upload validation:** Check MIME type, size limit (10MB), scan for malware
- **API keys stored server-side** (Gemini key in Express env vars, never in frontend)
- **CORS:** Restrict to own domain
- **Content Security Policy:** Strict CSP headers
- **GDPR compliance:** Data deletion option, cookie consent banner
- **Form data encryption at rest** (Supabase's built-in encryption)

## Scalability Planning

- **Frontend:** Vite build outputs static files → CDN-cached on Vercel. Zero server cost for page loads.
- **Backend:** Express on Render (auto-scaling with horizontal replicas). Stateless — session in Supabase.
- **Database:** Supabase free tier (500MB, 5GB bandwidth) → upgrade to Pro ($25/mo) at scale.
- **AI:** Gemini 1.5 Flash free tier (60 req/min) → paid tier at scale. Cache explanations in DB to avoid repeat calls.
- **OCR:** Tesseract.js runs client-side in browser (no server cost, no latency).
- **PDF parsing:** pdf.js runs client-side.
- **CDN:** Vercel Edge Network for static assets.
- **Caching:** Form schemas cached at build time (static JSON). AI responses cached in Supabase.

## AI Workflow Architecture

```
User asks "what is this field?"
        ↓
Frontend sends field_id + form_slug + language to /api/forms/:slug/explain/:field
        ↓
Express checks cache (ai_explanations table) → return cached if exists
        ↓
If not cached, call Gemini API:
  Prompt template: "Explain the form field '{field_label}' in form '{form_name}' in simple language in {language}. 
   Include: what it means, what to put there, example of correct answer. Keep under 100 words."
        ↓
Store in cache → return to frontend
        ↓
Frontend displays explanation in expandable tooltip below field
```

**Suggestion flow:**
```
User clicks "Suggest" button on a field
        ↓
Frontend sends field_id + partial form data to /api/forms/:slug/suggest
        ↓
Express constructs prompt with existing form data context
        ↓
Gemini returns suggested value based on context
        ↓
User can accept or edit the suggestion
```

## OCR Pipeline Architecture

```
User uploads document (image/PDF)
        ↓
Frontend reads file client-side via FileReader
        ↓
If image → Tesseract.js OCR (client-side, no upload needed)
If PDF → pdf.js to extract text → fallback to image OCR for scanned PDFs
        ↓
Extracted text returned to user in preview modal
        ↓
User selects relevant text → clicks "Apply to field"
        ↓
OR AI auto-matches fields: send extracted text + form schema to /api/ocr/parse
        ↓
Gemini maps extracted text to form fields → returns field:value pairs
        ↓
User reviews and confirms auto-fill
```

**Why client-side OCR first:** No server cost, no privacy concerns with sensitive documents, instant processing. Server-side AI matching only runs when user explicitly clicks auto-fill.

## Mobile UX Strategy

- **Touch-first:** All interactive elements ≥44px tap target (WCAG 2.2)
- **Bottom sheet** for field explanations (not modals)
- **Sticky progress bar** at top
- **Single-column layout** by default
- **Back/forward swipe gestures** between form sections
- **Voice input** for text fields (native browser Speech-to-Text API)
- **Offline support:** Form fills continue even without internet (localStorage), sync when online
- **Camera upload** for documents (native camera input)

## Accessibility Strategy

- **WCAG 2.2 AA compliant** (target AAA)
- Full keyboard navigation with visible focus rings
- `aria-label`, `aria-describedby`, `aria-live` on all dynamic content (AI explanations, errors)
- Screen reader announcements for: field errors, auto-save confirmations, progress updates
- Color contrast ratio ≥4.5:1 (DaisyUI base theme already passes; test with axe DevTools)
- Focus management: trap focus in modals/bottom sheets, return to trigger element on close
- Skip-to-content link
- Reduce motion preference respected (Framer Motion uses `useReducedMotion`)
- All features usable without JavaScript? No — this is inherently interactive. Provide fallback message with phone/email contact.

## Future SaaS Expansion Ideas

1. **HR Onboarding Suite:** Companies upload their onboarding forms → employees fill with AI guidance → HR dashboard tracks completion
2. **Document Verification Service:** Validate uploaded documents against form requirements (AI checks for completeness, blur detection, expiration)
3. **Auto-Submit API:** For partners (visa consultants, CA firms) — batch submit forms programmatically
4. **White-label Forms:** Companies pay to host our form assistant on their domain
5. **Form Templates Marketplace:** Users sell their custom form templates
6. **WhatsApp Bot:** Fill forms via WhatsApp conversation
7. **Blockchain Verification:** Tamper-proof form submission receipts
8. **AI Notary:** Identity verification + AI witness for digital forms

## Enterprise Use Cases

| Case | Pain | Solution |
|------|------|----------|
| **HR onboarding** | 50+ documents/hr to verify | Bulk OCR + validation dashboard |
| **Visa consultancy** | Manual client form filling | Client fills via our portal with AI guidance, consultant reviews |
| **CA firms** | Tax filing for 100s of clients | Batch templates + prefilled client data |
| **Educational institutions** | Application processing | Student fills with AI → admin reviews single page summary |

## Viral Growth Loops

1. **Shareable form link:** Users share their filled form preview → recipient clicks → discovers platform
2. **"Help me fill this" button:** User sends WhatsApp link to friend → friend opens our app
3. **Embeddable widget:** Bloggers embed form assistant on articles → drives signups
4. **Form completion certificate:** Users share "I completed my [form] with AI Form Assistant" on LinkedIn
5. **Referral credits:** 1 month Pro for every 3 friends who sign up

## UI/UX Philosophy

- **Trust > Delight:** Professional, clean, no gimmicks. Forms are serious business.
- **Progressive disclosure:** Show only what's needed right now. Section-by-section flow.
- **Error prevention > Error detection:** Guide users before they make mistakes.
- **Conversational when needed, structured by default:** Toggle between form grid and chat view.
- **White space is free:** Generous padding, clear visual hierarchy.
- **Data density controlled:** Never overwhelm with too many fields at once.
- **Consistent patterns:** Every form follows the same interaction model — learn once, use anywhere.

**Color palette:** Blue-primary (trust) + warm accents (friendliness). Not cold/clinical.

**Typography:** Inter (clean, readable) for UI. Noto Sans for multi-language support.

## Performance Optimization Strategy

| Strategy | Impact |
|----------|--------|
| Lazy-load form schemas (load on demand, not on page load) | Cold start cut by 60% |
| Tesseract.js loaded only when OCR tab activated | Bundle size impact: +2MB only when needed |
| AI explanations cached in Supabase (avoid duplicate API calls) | Latency: 150ms vs 2s for uncached |
| Form data saved to localStorage every 3 seconds (debounced) | No blocking writes |
| Vite code splitting per form type | Each form bundle <50KB |
| Static form catalog on homepage (no JS needed) | Instant paint, good LCP |
| Preconnect to Gemini API + Supabase | DNS resolved early |
| Image optimization: WebP, lazy load | Better LCP |
| Minimal third-party JS (only AdSense + analytics) | Fewer render-blocking scripts |

## Risk Analysis

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Gemini API rate limit hit | Medium | High | Cache aggressively, queue system, fallback to static hints |
| Users upload sensitive PII | High | High | Client-side OCR (data never leaves browser), clear privacy policy |
| Government forms change frequently | Medium | Medium | Schema-driven (update JSON, not code), versioning on forms |
| Low conversion to Pro | Medium | Medium | A/B test pricing, add value upfront in free tier |
| Competitor copies idea | High | Medium | Focus on UX depth + niche forms + community SEO |
| AdSense disapproves | Low | High | Apply for finance/government category, clear content policy |
| OCR accuracy on poor images | Medium | Medium | Guide "best lighting" tips, accept manual input fallback |

## MVP Scope vs Future Scope

| Feature | MVP | V2 | V3 |
|---------|-----|----|----|
| Form rendering from JSON | ✓ | | |
| AI field explanations | ✓ | | |
| Real-time validation | ✓ | | |
| Auto-save (localStorage) | ✓ | | |
| OCR upload (client-side) | ✓ | | |
| PDF download | ✓ | | |
| 2 languages | ✓ | | |
| 30 forms (JSON) | ✓ | | |
| AdSense | ✓ | | |
| Mobile responsive | ✓ | | |
| Chat mode | ✓ | | |
| User accounts | | ✓ | |
| Cloud sync | | ✓ | |
| 50+ forms | | ✓ | |
| Pro subscription | | ✓ | |
| 10+ languages | | ✓ | |
| Bulk fill | | ✓ | |
| AI suggestions | | ✓ | |
| Form sharing | | ✓ | |
| Enterprise dashboard | | | ✓ |
| Custom forms builder | | | ✓ |
| API access | | | ✓ |
| WhatsApp integration | | | ✓ |
| Auto-submit | | | ✓ |

## Suggested Folder Structure

```
/
├── frontend/           # Vite + React app
│   ├── public/
│   │   ├── ads.txt
│   │   ├── manifest.json
│   │   └── forms/      # Static form JSON schemas (built at deploy time)
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── routes/
│   │   │   ├── Home.jsx
│   │   │   ├── FormPage.jsx
│   │   │   ├── FormFill.jsx
│   │   │   ├── Dashboard.jsx (V2)
│   │   │   └── BlogPage.jsx
│   │   ├── components/
│   │   │   ├── layout/        # Header, Footer, Navigation
│   │   │   ├── form/          # FieldRenderer, FormStepper, ValidationMessage
│   │   │   ├── ai/            # FieldExplanation, AISuggestion, ChatMode
│   │   │   ├── ocr/           # DocumentUploader, OCRPreview, AutoFillReview
│   │   │   ├── ui/            # Button, Input, Select, Modal, ProgressBar, BottomSheet
│   │   │   └── seo/           # JSONLD, FAQSection, RelatedForms
│   │   ├── hooks/
│   │   │   ├── useForm.js
│   │   │   ├── useAutoSave.js
│   │   │   ├── useAI.js
│   │   │   ├── useOCR.js
│   │   │   └── useTranslation.js
│   │   ├── lib/
│   │   │   ├── api.js         # Express API client
│   │   │   ├── validation.js
│   │   │   ├── formUtils.js
│   │   │   └── seoUtils.js
│   │   ├── contexts/
│   │   │   └── FormContext.jsx
│   │   └── assets/
│   └── vite.config.js
├── backend/            # Express API
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── forms.js
│   │   │   ├── userForms.js
│   │   │   ├── ai.js
│   │   │   ├── ocr.js
│   │   │   └── payments.js (V2)
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── rateLimit.js
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── gemini.js
│   │   │   ├── supabase.js
│   │   │   └── firebase.js
│   │   ├── lib/
│   │   │   ├── formSchemas.js  # Load JSON schemas
│   │   │   └── cache.js
│   │   └── config/
│   │       └── env.js
│   └── package.json
├── shared/
│   └── form-schemas/   # shared JSON schemas for forms (git submodule or symlink)
├── public/             # root-level static (for Vercel direct deploy)
│   ├── ads.txt
│   └── robots.txt
├── AGENTS.md
├── package.json        # root workspace
└── vercel.json         # Vercel config (frontend routing + API proxy)
```

## State Management Planning

- **`FormContext`** (React Context): Holds current form data, validation state, progress, language
- **`useAutoSave` hook:** Debounces form data writes to localStorage (3s debounce, keyed by form slug + timestamp)
- **`useAI` hook:** Manages AI explanation loading, caching, error states
- **`useOCR` hook:** Manages Tesseract.js worker lifecycle, text extraction, mapping
- **No Redux/Zustand needed** — forms are page-local, not cross-page shared state. Context + hooks is sufficient.
- For V2 cloud sync: conflict resolution (last-write-wins with timestamp, plus manual merge prompt)

## Authentication Strategy

- **Firebase Authentication** with Google + Email/Password providers
- Guest mode: no auth needed, form data saved to localStorage + indexedDB
- On first "Save to cloud": prompt create account (email or Google)
- Session: Firebase JWT stored in memory + httpOnly cookie
- Auth middleware on Express: verify Firebase ID token on every /api/user-forms, /api/ocr/parse request
- Profile: `POST /api/auth/profile` saves user preferences (language, tier, name) to Supabase

## Error Handling Strategy

**Frontend:**
- Every user-facing error has a human-readable message in the user's language
- Network failures: retry button with exponential backoff toast
- AI failures: fallback to static field hints (pre-written in form schema)
- OCR failures: "Could not read this document. Try a clearer photo or type manually."
- Validation errors: inline below the field with red border + explanation + suggested fix
- Form submission errors: summary banner at top listing all issues, grouped by section

**Backend:**
- All Express routes wrapped in try/catch → `errorHandler` middleware
- Graceful degradation: if AI API is down, return static hints with headers `X-AI-Available: false`
- Rate limit exceeded: return 429 with `Retry-After` header, frontend shows "AI busy, try again in {n} seconds"
- Database errors: retry (x3), then return 503 with "Service temporarily unavailable"
- All errors logged to console with correlation ID (no PII in logs)

## Commands

```bash
# Frontend
cd frontend
npm run dev          # Vite dev server on :5173
npm run build        # Production build
npm run lint         # ESLint
npm run preview      # Preview build locally

# Backend
cd backend
npm run dev          # Express with nodemon on :3001
npm start            # Production start
npm run lint

# Full stack (root)
npm run dev          # runs both concurrently (concurrently package)
npm run build        # builds both
```

## Architecture Constraints

- **Form schemas are JSON files** in `shared/form-schemas/`. Adding a new form = adding one JSON file + listing it in the catalog. No code changes.
- **AI runs on server** (Express) via Gemini API. Client never holds the API key.
- **OCR runs on client** (Tesseract.js + pdf.js in browser). No upload to server needed.
- **Auth-optional:** Core form filling works without an account. Save/load across devices requires login.
- **AdSense:** Native ads between form sections. No popups, no interstitials.
- **SEO pages are static** (pre-built HTML). The form filler UI loads client-side JS after static content renders.

## Deployment

- **Frontend:** Vercel — `npm run build` outputs to `frontend/dist`, configured in `vercel.json`
- **Backend:** Render — Express service on free tier (sleeps after 15 min idle, wakes on request)
- **Database:** Supabase — free tier, then upgrade
- **Auth:** Firebase Auth — free tier (50K MAU)
- **AI:** Gemini API — free tier (60 requests/min)
- **Alternative (lower cost):** Full static on Vercel with Cloudflare Workers for API proxy (if Express on Render goes paid)

Environment variables needed:
```
VITE_API_URL=                  # Backend URL
GEMINI_API_KEY=                # Gemini API key
SUPABASE_URL=                  # Supabase project URL
SUPABASE_ANON_KEY=             # Supabase anon key
SUPABASE_SERVICE_KEY=          # Supabase service role key (server only)
FIREBASE_PROJECT_ID=           # Firebase project
FIREBASE_PRIVATE_KEY=          # Firebase admin private key (server only)
FIREBASE_CLIENT_EMAIL=         # Firebase client email (server only)
```

## Key Technical Decisions & Rationale

| Decision | Why |
|----------|-----|
| Vite + React (not Next.js) | Form UIs are entirely client-interactive; SSR adds complexity without benefit. Vite builds are smaller, faster to iterate. |
| Express (not Next.js API routes) | Separate backend means independent scaling. Express is simpler for API-only. |
| DaisyUI on top of Tailwind | Speeds up UI development with accessible, themeable components. Override when needed. |
| Client-side OCR (not server) | Zero server cost, no PII leaves browser, instant feedback. Only AI matching needs server. |
| Firebase Auth + Supabase DB | Firebase has best social auth UX. Supabase has better relational DB for form schemas. |
| Gemini API (not OpenAI) | Generous free tier (60 req/min), fine for per-field explanations. Fewer token costs. |
| Form schemas as JSON | Adding forms = adding JSON, not code. Non-developers can contribute form templates. |
| localStorage first, cloud sync second | Users can start immediately without friction. Cloud sync is a Pro upgrade incentive. |

## SEO & Content Strategy

- **Per-form landing page:** `/{category}/{form-slug}` with 500+ words of helpful content, schema markup, and form embed
- **Schema types:** `HowTo` (step-by-step), `FAQPage` (common questions), `SoftwareApplication` (the tool itself)
- **Blog section:** `/{category}/guides/{slug}` — "Complete Guide to Filling [Form Name]" — ranks for long-tail keywords
- **Internal linking grid:** "Related forms you might need" at the bottom of each page
- **Breadcrumb JSON-LD:** Category > Form Name for each page
- **Canonical URLs** on all pages to prevent duplicate content
- **Meta descriptions** written per-page, not templated, including target keywords

## AdSense Strategy

- Apply for **Finance** category (tax forms) + **Government** + **Education**
- Ad placement: Between form sections (not within fields), after form download, on results page
- Ad format: Native in-feed, display banner (below fold), matched content
- **Never interfere with form filling experience** — no popups, no interstitials during fill
- Add `ads.txt` to domain root before submitting application
- Target RPM: $8–12 (government/finance/education niches have high CPM)

## Development Workflow

1. Add a new form: create `shared/form-schemas/{category}/{form-name}.json`
2. The form catalog auto-discovers new JSON files in the schema directory
3. Test locally: `npm run dev` (runs frontend + backend concurrently)
4. Run linter: `npm run lint` before commit
5. Preview build: `npm run build && npm run preview`
6. Deploy: push to main → Vercel auto-deploys frontend, Render auto-deploys backend

### File Naming
- React components: PascalCase (`FieldRenderer.jsx`)
- Hooks: camelCase with `use` prefix (`useAutoSave.js`)
- Utils: camelCase (`formUtils.js`)
- Form schemas: kebab-case (`ds-160.json`, `income-tax-return.json`)

## Conventions
- JSX: double quotes for JSX props, single quotes for JS
- CSS: Tailwind utility classes. Custom CSS only if Tailwind can't express it.
- Imports: absolute imports from `src/` (configured in vite.config.js)
- Error boundaries at route level (each form page)
- No default exports except route components
- API responses follow `{ data, error }` pattern consistently

## Future Reading / References
- `shared/form-schemas/` — JSON schema format documentation
- `frontend/src/hooks/useForm.js` — form state management hook
- `backend/src/services/gemini.js` — AI integration service
- Form schema spec: `docs/form-schema-spec.md` (to be created)
