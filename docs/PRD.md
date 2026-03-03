# Fees Manager – Product Requirements (Demo)

**Version:** 1.1  
**Source:** Case study ([oscarabizanda.site/fees-manager](https://oscarabizanda.site/fees-manager)), Figma ([Fees Manager](https://www.figma.com/design/NZKq7OKJFGpDweByzw7VBR/Fees-Manager?node-id=197-2170&m=dev)), and alignment with design.

---

## 1. Product summary

Fees Manager is an **admin-facing module** for council staff to update annual fee schedules in bulk and by individual fee. The demo focuses on the full admin flow: **bulk upload and validation**, **approval workflow**, and **individual fee editing**, with no resident-facing UI in scope for v1.

---

## 2. Primary user

**Content & Finance Team Member**  
Council staff (finance officers, content publishers, admins) who:

- Prepare and upload fee spreadsheets for the new financial year.
- Review validation errors and fix data before publishing.
- Approve or publish bulk updates.
- Edit individual fees and need changes to reflect across all relevant service pages.

---

## 3. First screen (entry point)

**Dashboard / overview**  
The first screen of the demo is the **Dashboard / overview**, not the upload form. A hiring manager has seconds to form an impression; they must land on a **data-rich** view that shows the product and UI at a glance.

- **Pre-populate the Dashboard** with static JSON: a mix of successful updates, pending reviews, and (optionally) one with errors. Show metrics (e.g. success rate, update counts), recent updates table, and status indicators (success / error).
- **Prominent CTA:** Add a clear **“Start New Update”** (or equivalent) button or link that navigates to the **New fee update** flow. The upload form is reached from here, not the other way around.

**New fee update (reached via CTA)**  
From Figma (node 197:2170), the upload screen includes:

- **Update name** (required) – e.g. “Annual Fees 2024–2025”.
- **Reference ID** (optional).
- **Comments** (optional).
- **Select status** – e.g. Draft, Review, Approved, Published.
- **Upload template** – primary area: drag and drop or browse, “Download blank template” link, supported types .xlsx, .csv.
- **Actions:** Cancel, **Upload**.

All other screens (fee list, validation, individual edit) support or follow from the Dashboard and this flow.

---

## 4. Core flows (admin-only for v1)

| # | Flow | Description |
|---|------|--------------|
| 1 | **Bulk upload & validation** | Upload template → see row/field errors → fix or re-upload. Real-time validation and clear error messages. |
| 2 | **Bulk review & approval** | View imported fee list for an update → filter/search → approve or publish. Status: Draft / Review / Approved / Published. |
| 3 | **Individual fee editing** | Open a fee from the list → edit fields → save; changes apply to all connected service pages (behaviour implied; UI shows success/confirmation). |
| 4 | **Audit / status** | See what is draft, pending, or published (dashboard and list views). |

Resident-facing search/browse of fees is **out of scope** for this PRD.

---

## 5. Key screens (from Figma)

- **Dashboard / overview** – First screen of the demo. Metrics (e.g. success rate, update counts), recent updates table, status indicators (success / error). Prominent “Start New Update” CTA to upload flow.
- **New fee update** – Reached via CTA. Form with upload as primary; see Section 3.
- **Fee update detail** – Single update: metrics (e.g. new/updated fees, errors, value change), status, actions (Approve, Publish, Submit for review), fee table with columns (Fee name, Category, Old/New amount, Change, Status).
- **Upload / validation feedback** – Progress (e.g. “90% processed”), error count, “Review errors” and inline table errors.
- **Fees list (all fees)** – Table: Fee name, Category, Subcategory, Amount, Units, Effective/Expiry date, Status, Actions (edit, delete).
- **Fee detail / edit** – Form: Fee name, Description, Category, Subcategory, Amount, Units, Effective date, Expiry date (add/edit individual fee).
- **Edit fee modal** – Simplified edit for one fee.
- **Delete fee** – Confirmation before delete.

---

## 6. Data model and state (realistic but scoped)

**Entities**

- **Fee update** – Name, reference ID, comments, status, uploaded file / processed data, created/updated timestamps.
- **Fee** – Name, description, category, subcategory, amount, units, effective date, expiry date, status (e.g. New, Updated, Error, Published, Draft).
- **Categories** – A small set of fee categories (e.g. Waste, Parking, Licensing) and optional subcategories.
- **Validation** – Required fields, numeric ranges, duplicate checks; errors shown at upload and in the fee table.

**Global state (required)**  
No backend is used for the demo; data is in-memory. To avoid state reset on navigation, **mock data must be held in global state** (e.g. **React Context** or **Zustand**). A simulated file upload must populate this store so that the same data is visible on the Dashboard, Fee List, and Fee Update Detail screens when the user navigates between them. Do not rely on local component state alone for cross-screen data.

**Mock behaviour (explicit)**  
Define a **hardcoded simulation** so the demo is repeatable and the error UI is visible without a real file:

- **On “Upload”:** Simulate processing (e.g. `setTimeout` of ~2 seconds) before resolving. Option A: resolve with success and add the new update + fees to global state so they appear on the Dashboard and Fee List. Option B (for showing errors): after the delay, resolve with **3 predefined validation errors** (e.g. missing required field, invalid amount, duplicate code) so the hiring manager immediately sees the validation feedback UI and “Review errors” flow without uploading a real broken CSV.
- **Predefined errors:** Document or hardcode the 3 sample errors (message + field/row) so the error list and inline table highlights are consistent and demonstrable.

---

## 7. Non-goals (for this demo)

- Resident-facing fee search or discovery.
- Real auth or permissions (single “Content & Finance” user is enough).
- Full council-specific business rules or legislation.
- Real file processing (mock upload and validation is enough).

---

## 8. Figma alignment

- **File:** [Fees Manager](https://www.figma.com/design/NZKq7OKJFGpDweByzw7VBR/Fees-Manager?node-id=197-2170&m=dev).
- **Primary node for “New fee update” / bulk upload:** `197:2170`.
- Design uses a dark theme, status colours (e.g. green/red/orange), and a workflow-oriented layout consistent with the Content & Finance Team Member persona and bulk-first strategy from the case study.

---

## 9. Success criteria for the demo

- User opens the app and lands on the **Dashboard / overview** with pre-populated data (updates, metrics, status).
- A clear **“Start New Update”** CTA leads to the upload flow; user can complete **upload (mocked) → see validation feedback** (e.g. 3 predefined errors after ~2s delay) **→ review fee list → approve/publish (mocked)** and **edit one fee** from the list with clear confirmation.
- Data persists across navigation (Dashboard, Fee List, Update Detail) via global state; no empty screens after a simulated upload.
- UI is built from ShadCN components and matches the Figma structure and flows above.
- No resident-facing screens are required for v1.
