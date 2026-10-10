import { create } from 'zustand';

interface AccountLinkingState {
  hasError: boolean;
  setError: () => void;
  clearError: () => void;
}

export const useAccountLinkingStore = create<AccountLinkingState>((set) => ({
  hasError: false,
  setError: () => set({ hasError: true }),
  clearError: () => set({ hasError: false }),
}));
