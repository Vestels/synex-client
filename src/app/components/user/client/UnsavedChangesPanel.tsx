"use client";

import { useTranslations } from "next-intl";
import Button from "@/app/components/Button";
import { useUnsavedChangesStore } from "@/stores/unsaved-changes.store";
import SpinnerSvg from "../../svgs/SpinnerSvg";

type UnsavedChangesPanelProps = {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
};

export default function UnsavedChangesPanel({ hasUnsavedChanges, isSaving }: UnsavedChangesPanelProps) {
  const translate = useTranslations("APP");
  const saveChanges = useUnsavedChangesStore((state) => state.saveChanges);
  const discardChanges = useUnsavedChangesStore((state) => state.discardChanges);

  if (!hasUnsavedChanges) {
    return null;
  }

  return (
    <>
      <p className="unsaved-changes-panel__status-label">{translate("PROFILE.UNSAVED_CHANGES_PANEL.LABEL")}</p>

      <div className="unsaved-changes-panel__actions">
        <Button onClick={saveChanges} disabled={isSaving}>
          {isSaving ? <SpinnerSvg /> : translate("ACTIONS.PROFILE.SAVE")}
        </Button>
        <Button variant={"secondary"} onClick={discardChanges} disabled={isSaving}>
          {translate("ACTIONS.PROFILE.CANCEL")}
        </Button>
      </div>
    </>
  );
}
