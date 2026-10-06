import { create } from 'zustand';

export type FormKey = 'user' | 'preferences' | 'identities';

type FormAction = () => void | Promise<void>;

const saveFunctions = new Map<FormKey, FormAction>();
const resetFunctions = new Map<FormKey, FormAction>();

interface UnsavedChangesState {
  changedForms: Set<FormKey>;
  errorForms: Set<FormKey>;
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
  errorForms: new Set(),
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

      const errorForms = new Set(state.errorForms);
      errorForms.delete(key);

      return { changedForms, errorForms };
    });
  },

  saveChanges: async () => {
    set({ isSaving: true, errorForms: new Set() });
    const { changedForms } = get();
    const nextChangedForms = new Set(changedForms);
    const nextErrorForms = new Set<FormKey>();

    for (const key of Array.from(changedForms)) {
      try {
        const saveFn = saveFunctions.get(key);
        if (saveFn) {
          await saveFn();
          nextChangedForms.delete(key);
        }
      } catch {
        nextErrorForms.add(key);
      }
    }

    set({
      changedForms: nextChangedForms,
      errorForms: nextErrorForms,
      isSaving: false,
    });
  },

  discardChanges: () => {
    const { changedForms } = get();

    changedForms.forEach((key) => {
      resetFunctions.get(key)?.();
    });

    set({ changedForms: new Set(), errorForms: new Set() });
  },
}));
