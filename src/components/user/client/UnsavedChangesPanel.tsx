'use client';

import { useTranslations } from 'next-intl';
import { useUnsavedChangesStore } from '@/stores/unsaved-changes.store';
import Button from '@/components/Button';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';
import ErrorSvg from '@/components/svgs/ErrorSvg';

type UnsavedChangesPanelProps = {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
};

export default function UnsavedChangesPanel({
  hasUnsavedChanges,
  isSaving,
}: UnsavedChangesPanelProps) {
  const translate = useTranslations('APP');
  const saveChanges = useUnsavedChangesStore((state) => state.saveChanges);
  const error = useUnsavedChangesStore((state) => state.error);
  const discardChanges = useUnsavedChangesStore((state) => state.discardChanges);

  if (!hasUnsavedChanges) {
    return null;
  }

  return (
    <>
      <p className="unsaved-changes-panel__status-label">
        {translate('PROFILE.UNSAVED_CHANGES_PANEL.LABEL')}
      </p>

      <div className="unsaved-changes-panel__actions">
        <Button className="button--user-action" onClick={saveChanges} disabled={isSaving}>
          {error && <ErrorSvg />}
          {isSaving ? <SpinnerSvg /> : translate('ACTIONS.PROFILE.SAVE')}
        </Button>
        <Button
          className="button--user-action"
          variant={'secondary'}
          onClick={discardChanges}
          disabled={isSaving}
        >
          {translate('ACTIONS.PROFILE.CANCEL')}
        </Button>
      </div>
    </>
  );
}
