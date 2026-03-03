# Fees Manager – Technical checklist

Use this before and during Step 1 (routing + global state). "Measure twice, cut once."

---

## Step 1 prerequisites (read before implementing)

### 1. React Router

- Use **`createBrowserRouter`** and **`RouterProvider`** (React Router v6.4+ data APIs). Do not use the older `<BrowserRouter>` + `<Routes>` pattern for the root.
- **Default route `/`** must render the **Dashboard** (first screen per PRD).
- Other routes: e.g. `/new-update`, `/updates/:id`, `/fees`. Wire in `src/main.tsx` and/or `src/App.tsx`.

### 2. Base path (deployment)

- If the app is deployed at a **subpath** (e.g. `https://oscarabizanda.site/fees-manager`), set **`basename: '/fees-manager'`** (or the correct path) on the router so links and refresh work. If the app is at the domain root, omit basename or set `basename: '/'`.

### 3. Global state (Zustand)

- Use **Zustand** (not React Context) for demo data: lightweight, minimal boilerplate, easy for Cursor to maintain.
- Create a single store file, e.g. **`src/store/store.ts`** or **`src/lib/store.ts`**, that holds:
  - **Fee updates** (list of updates with id, name, status, dates, metrics).
  - **Fees** (list of fee records for updates: fee name, category, amounts, status).
  - **Current upload in progress** (optional: loading state, progress, validation errors from mock upload).
- **Seed the store** with static data so the Dashboard is pre-populated on first load. Do not leave the store empty.

### 4. Seed data (Dashboard variety)

- Seed data must include a **mix of statuses** so the Dashboard looks real and demonstrates ShadCN usage:
  - At least one **Success** (or Published) update.
  - At least one **Pending** (or Review / Draft) update.
  - Optionally one with **Error** (or validation errors) so error badges and states are visible.
- Include enough fields for the recent-updates table: update name, date, status, total fees count, error count (if any). Match the data shape to what the Dashboard and PRD expect.

### 5. Mock upload (for Step 3, documented here)

- On "Upload" in the New fee update flow: **simulate ~2s delay** (e.g. `setTimeout`) before resolving.
- Then either: **(A)** add the new update + fees to the Zustand store and redirect, or **(B)** set 3 **predefined validation errors** in store/state so the validation feedback UI is visible. Hardcode the 3 errors (message + field/row) per PRD Section 6.

---

## References

- **Product and flows:** [docs/PRD.md](PRD.md)
- **Build order and UI:** [.cursorrules](../.cursorrules), [.cursor/rules/](../.cursor/rules/)
- **Next steps plan:** See Cursor plan "Fees Manager next steps" (routing, Dashboard, New fee update, validation, fee list).
