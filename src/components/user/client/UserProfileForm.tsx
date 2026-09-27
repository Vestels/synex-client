"use client";

import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/interfaces/user.interface";
import { Gender } from "@/enums/user.enum";
import { useTranslations } from "next-intl";
import { getChangedFields, handleUpdateField } from "@/utils/form.util";
import { useUnsavedChangesStore } from "@/stores/unsaved-changes.store";
import { updateCurrentUserProfileAction } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

export default function UserProfileForm({ initialPreferences }: { initialPreferences: UserProfile }) {
  const router = useRouter();
  const translate = useTranslations("APP");
  const [formData, setFormData] = useState<UserProfile>(initialPreferences);
  const formDataRef = useRef(formData);

  const registerForm = useUnsavedChangesStore((state) => state.registerForm);
  const unregisterForm = useUnsavedChangesStore((state) => state.unregisterForm);
  const markChanged = useUnsavedChangesStore((state) => state.markChanged);
  const markSaved = useUnsavedChangesStore((state) => state.markSaved);

  useEffect(() => {
    formDataRef.current = formData;

    const changed = JSON.stringify(formData) !== JSON.stringify(initialPreferences);

    if (changed) {
      markChanged("user");
    } else {
      markSaved("user");
    }
  }, [formData, initialPreferences, markChanged, markSaved]);

  useEffect(() => {
    registerForm(
      "user",

      async () => {
        const changedFields = getChangedFields(initialPreferences, formDataRef.current);
        await updateCurrentUserProfileAction(changedFields);
        router.refresh();
      },

      () => {
        setFormData(initialPreferences);
        formDataRef.current = initialPreferences;
      },
    );

    return () => {
      unregisterForm("user");
    };
  }, [registerForm, unregisterForm, initialPreferences, router]);

  return (
    <div className="user-informations">
      <div className="user-informations__data-row">
        <label htmlFor="birthDate" className="property property--required">
          {translate("PROFILE.PERSONAL.BIRTH_DATE")}
          <sup className="input-requirement">{`(${translate("REQUIREMENTS.REQUIRED")})`}</sup>
        </label>

        <input
          id="birthDate"
          type="date"
          className="value"
          value={formData.birthDate ?? ""}
          required
          onChange={(event) => handleUpdateField(setFormData, "birthDate", event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="gender" className="property property--required">
          {translate("PROFILE.PERSONAL.GENDER.LABEL")}
          <sup className="input-requirement">{`(${translate("REQUIREMENTS.REQUIRED")})`}</sup>
        </label>

        <select
          id="gender"
          className="value"
          value={formData.gender ?? ""}
          onChange={(event) => handleUpdateField(setFormData, "gender", event.target.value as Gender)}>
          <option value="" disabled>
            {translate("PROFILE.PERSONAL.GENDER.PLACEHOLDER")}
          </option>

          {Object.values(Gender).map((gender) => (
            <option key={gender} value={gender}>
              {translate(`ENUMS.GENDER.${gender}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="nickname" className="property">
          {translate("PROFILE.PERSONAL.NICKNAME")}
        </label>

        <input
          id="nickname"
          type="text"
          className="value"
          value={formData.nickname ?? ""}
          onChange={(event) => handleUpdateField(setFormData, "nickname", event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="lastName" className="property">
          {translate("PROFILE.PERSONAL.LASTNAME")}
        </label>

        <input
          id="lastName"
          type="text"
          className="value"
          value={formData.lastName ?? ""}
          onChange={(event) => handleUpdateField(setFormData, "lastName", event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="firstName" className="property">
          {translate("PROFILE.PERSONAL.FIRSTNAME")}
        </label>

        <input
          id="firstName"
          type="text"
          className="value"
          value={formData.firstName ?? ""}
          onChange={(event) => handleUpdateField(setFormData, "firstName", event.target.value)}
        />
      </div>
    </div>
  );
}
