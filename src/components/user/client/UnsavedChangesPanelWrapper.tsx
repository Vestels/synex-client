'use client';

import UnsavedChangesPanel from '@/components/user/client/UnsavedChangesPanel';
import { useUnsavedChangesStore } from '@/stores/unsaved-changes.store';

export default function UnsavedChangesPanelWrapper() {
  const hasUnsavedChanges = useUnsavedChangesStore((state) => state.changedForms.size > 0);
  const isSaving = useUnsavedChangesStore((state) => state.isSaving);

  return (
    <section className={`unsaved-changes ${hasUnsavedChanges ? 'is-visible' : ''}`} role="alert">
      <div className="unsaved-changes-panel">
        <UnsavedChangesPanel hasUnsavedChanges={hasUnsavedChanges} isSaving={isSaving} />
      </div>
    </section>
  );
}
