import { Dispatch, SetStateAction } from 'react';

export const handleUpdateField = <T, K extends keyof T>(
  setFormData: Dispatch<SetStateAction<T>>,
  field: K,
  value: T[K]
) => {
  setFormData((previous) => ({
    ...previous,
    [field]: value,
  }));
};

export function getChangedFields<T extends object>(initial: T, current: T): Partial<T> {
  const changed: Partial<T> = {};

  for (const key of Object.keys(current) as Array<keyof T>) {
    if (current[key] !== initial[key]) {
      changed[key] = current[key];
    }
  }

  return changed;
}
