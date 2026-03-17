import { create } from 'zustand'

export type UpdateStatus = 'draft' | 'review' | 'approved' | 'published' | 'error'

export interface FeeUpdate {
  id: string
  name: string
  referenceId?: string
  status: UpdateStatus
  createdAt: string
  totalFees: number
  errorCount: number
  feeIds: string[]
}

export interface Fee {
  id: string
  updateId: string
  feeName: string
  category: string
  oldAmount: number | null
  newAmount: number
  change: number
  status: 'new' | 'updated' | 'error'
}

export interface ValidationError {
  row?: number
  field: string
  message: string
}

interface UploadState {
  isUploading: boolean
  progress: number
  errors: ValidationError[]
}

interface FeesStore {
  updates: FeeUpdate[]
  fees: Fee[]
  upload: UploadState
  addUpdate: (update: FeeUpdate, newFees: Fee[]) => void
  setUploadState: (state: Partial<UploadState>) => void
  clearUploadErrors: () => void
  updateFee: (feeId: string, patch: Partial<Pick<Fee, 'feeName' | 'category' | 'newAmount'>>) => void
  removeFee: (feeId: string) => void
}

const seedUpdates: FeeUpdate[] = [
  {
    id: '1',
    name: 'Annual Fees 2024–2025',
    referenceId: 'REF-2024-001',
    status: 'published',
    createdAt: '2024-06-15',
    totalFees: 97,
    errorCount: 0,
    feeIds: ['f1', 'f2', 'f3'],
  },
  {
    id: '2',
    name: 'Q3 Fee Schedule Update',
    referenceId: 'REF-2024-002',
    status: 'review',
    createdAt: '2024-09-01',
    totalFees: 23,
    errorCount: 0,
    feeIds: ['f4', 'f5'],
  },
  {
    id: '3',
    name: 'Waste & Parking 2025',
    referenceId: 'REF-2025-001',
    status: 'error',
    createdAt: '2025-01-10',
    totalFees: 45,
    errorCount: 3,
    feeIds: ['f6', 'f7', 'f8'],
  },
]

const seedFees: Fee[] = [
  { id: 'f1', updateId: '1', feeName: 'Residential waste collection', category: 'Waste', oldAmount: 120, newAmount: 125, change: 5, status: 'updated' },
  { id: 'f2', updateId: '1', feeName: 'Parking permit', category: 'Parking', oldAmount: 50, newAmount: 55, change: 5, status: 'updated' },
  { id: 'f3', updateId: '1', feeName: 'Building permit', category: 'Licensing', oldAmount: null, newAmount: 200, change: 200, status: 'new' },
  { id: 'f4', updateId: '2', feeName: 'Commercial waste', category: 'Waste', oldAmount: 350, newAmount: 360, change: 10, status: 'updated' },
  { id: 'f5', updateId: '2', feeName: 'Event permit', category: 'Licensing', oldAmount: 75, newAmount: 80, change: 5, status: 'updated' },
  { id: 'f6', updateId: '3', feeName: 'Green waste bin', category: 'Waste', oldAmount: 80, newAmount: 0, change: -80, status: 'error' },
  { id: 'f7', updateId: '3', feeName: 'Street parking', category: 'Parking', oldAmount: 3.5, newAmount: 4, change: 0.5, status: 'updated' },
  { id: 'f8', updateId: '3', feeName: 'Unnamed fee', category: '', oldAmount: null, newAmount: 0, change: 0, status: 'error' },
]

export const useFeesStore = create<FeesStore>((set) => ({
  updates: seedUpdates,
  fees: seedFees,
  upload: {
    isUploading: false,
    progress: 0,
    errors: [],
  },
  addUpdate: (update, newFees) =>
    set((state) => ({
      updates: [update, ...state.updates],
      fees: [...newFees, ...state.fees],
    })),
  setUploadState: (state) =>
    set((prev) => ({
      upload: { ...prev.upload, ...state },
    })),
  clearUploadErrors: () =>
    set((state) => ({
      upload: { ...state.upload, errors: [] },
    })),
  updateFee: (feeId, patch) =>
    set((state) => {
      const fee = state.fees.find((f) => f.id === feeId)
      if (!fee) return state
      const updated = { ...fee, ...patch }
      if (patch.newAmount != null && fee.oldAmount != null) {
        updated.change = Number((updated.newAmount - fee.oldAmount).toFixed(2))
      } else if (patch.newAmount != null) {
        updated.change = updated.newAmount
      }
      return {
        fees: state.fees.map((f) => (f.id === feeId ? updated : f)),
      }
    }),
  removeFee: (feeId) =>
    set((state) => {
      const fee = state.fees.find((f) => f.id === feeId)
      if (!fee) return state
      return {
        fees: state.fees.filter((f) => f.id !== feeId),
        updates: state.updates.map((u) =>
          u.id === fee.updateId
            ? {
                ...u,
                totalFees: Math.max(0, u.totalFees - 1),
                feeIds: u.feeIds.filter((id) => id !== feeId),
              }
            : u
        ),
      }
    }),
}))

// ─── Theme store ──────────────────────────────────────────────────────────────
interface ThemeStore {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (typeof window !== 'undefined'
    ? (localStorage.getItem('cms-theme') as 'dark' | 'light' | null)
    : null) ?? 'dark',
  toggleTheme: () =>
    set((state) => {
      const next: 'dark' | 'light' = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('cms-theme', next)
      document.documentElement.setAttribute('data-theme', next)
      return { theme: next }
    }),
}))
