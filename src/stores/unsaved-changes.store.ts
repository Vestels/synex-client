import { create } from 'zustand';

export type FormKey = 'user' | 'preferences' | 'identities';

type FormAction = () => void | Promise<void>;

const saveFunctions = new Map<FormKey, FormAction>();
const resetFunctions = new Map<FormKey, FormAction>();

interface UnsavedChangesState {
  changedForms: Set<FormKey>;
  isSaving: boolean;

  registerForm: (key: FormKey, save: FormAction, reset: FormAction) => void;
  unregisterForm: (key: FormKey) => void;

  markChanged: (key: FormKey) => void;
  markSaved: (key: FormKey) => void;

  saveChanges: () => Promise<void>;
  discardChanges: () => void;
}

export const useUnsavedChangesStore = create<UnsavedChangesState>((set, get) => ({
  changedForms: new Set(),
  isSaving: false,

  registerForm: (key, save, reset) => {
    saveFunctions.set(key, save);
    resetFunctions.set(key, reset);
  },

  unregisterForm: (key) => {
    saveFunctions.delete(key);
    resetFunctions.delete(key);
  },

  markChanged: (key) => {
    set((state) => {
      if (state.changedForms.has(key)) {
        return state;
      }

      const changedForms = new Set(state.changedForms);
      changedForms.add(key);

      return { changedForms };
    });
  },

  markSaved: (key) => {
    set((state) => {
      if (!state.changedForms.has(key)) {
        return state;
      }

      const changedForms = new Set(state.changedForms);
      changedForms.delete(key);

      return { changedForms };
    });
  },

  saveChanges: async () => {
    const { changedForms } = get();
    set({ isSaving: true });

    try {
      await Promise.all(Array.from(changedForms).map((key) => saveFunctions.get(key)?.()));

      set({ changedForms: new Set() });
    } finally {
      set({ isSaving: false });
    }
  },

  discardChanges: () => {
    const { changedForms } = get();

    changedForms.forEach((key) => {
      resetFunctions.get(key)?.();
    });

    set({ changedForms: new Set() });
  },
}));
