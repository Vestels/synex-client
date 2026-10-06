'use client';

import { useEffect, useRef, useState } from 'react';
import { UserProfile } from '@/interfaces/user.interface';
import { Gender } from '@/enums/user.enum';
import { useTranslations } from 'next-intl';
import { getChangedFields, handleUpdateField } from '@/utils/form.util';
import { useUnsavedChangesStore } from '@/stores/unsaved-changes.store';
import { updateCurrentUserProfileAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

export default function UserProfileForm({ initialProfile }: { initialProfile: UserProfile }) {
  const router = useRouter();
  const translate = useTranslations('APP');
  const [formData, setFormData] = useState<UserProfile>(initialProfile);
  const formDataRef = useRef(formData);

  const { registerForm, unregisterForm, markChanged, markSaved, isProfileFormError } =
    useUnsavedChangesStore(
      useShallow((state) => ({
        registerForm: state.registerForm,
        unregisterForm: state.unregisterForm,
        markChanged: state.markChanged,
        markSaved: state.markSaved,
        isProfileFormError: state.errorForms.has('user'),
      }))
    );

  useEffect(() => {
    formDataRef.current = formData;

    const changed = JSON.stringify(formData) !== JSON.stringify(initialProfile);

    if (changed) {
      markChanged('user');
    } else {
      markSaved('user');
    }
  }, [formData, initialProfile, markChanged, markSaved]);

  useEffect(() => {
    registerForm(
      'user',

      async () => {
        const changedFields = getChangedFields(initialProfile, formDataRef.current);
        await updateCurrentUserProfileAction(changedFields);
        router.refresh();
      },

      () => {
        setFormData(initialProfile);
        formDataRef.current = initialProfile;
      }
    );

    return () => {
      unregisterForm('user');
    };
  }, [registerForm, unregisterForm, initialProfile, router]);

  return (
    <div className="user-informations">
      <div className="user-informations__data-row">
        <label htmlFor="birthDate" className="property property--required">
          {translate('PROFILE.PERSONAL.BIRTH_DATE')}
          <sup className="input-requirement">{`(${translate('REQUIREMENTS.REQUIRED')})`}</sup>
        </label>

        <input
          id="birthDate"
          type="date"
          className={`value ${isProfileFormError ? 'input--error' : ''}`}
          value={formData.birthDate ?? ''}
          required
          onChange={(event) => handleUpdateField(setFormData, 'birthDate', event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="gender" className="property property--required">
          {translate('PROFILE.PERSONAL.GENDER.LABEL')}
          <sup className="input-requirement">{`(${translate('REQUIREMENTS.REQUIRED')})`}</sup>
        </label>

        <select
          id="gender"
          className={`value ${isProfileFormError ? 'input--error' : ''}`}
          value={formData.gender ?? ''}
          onChange={(event) =>
            handleUpdateField(setFormData, 'gender', event.target.value as Gender)
          }
        >
          <option value="" disabled>
            {translate('PROFILE.PERSONAL.GENDER.PLACEHOLDER')}
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
          {translate('PROFILE.PERSONAL.NICKNAME')}
        </label>

        <input
          id="nickname"
          type="text"
          className={`value ${isProfileFormError ? 'input--error' : ''}`}
          value={formData.nickname ?? ''}
          onChange={(event) => handleUpdateField(setFormData, 'nickname', event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="lastName" className="property">
          {translate('PROFILE.PERSONAL.LASTNAME')}
        </label>

        <input
          id="lastName"
          type="text"
          className={`value ${isProfileFormError ? 'input--error' : ''}`}
          value={formData.lastName ?? ''}
          onChange={(event) => handleUpdateField(setFormData, 'lastName', event.target.value)}
        />
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="firstName" className="property">
          {translate('PROFILE.PERSONAL.FIRSTNAME')}
        </label>

        <input
          id="firstName"
          type="text"
          className={`value ${isProfileFormError ? 'input--error' : ''}`}
          value={formData.firstName ?? ''}
          onChange={(event) => handleUpdateField(setFormData, 'firstName', event.target.value)}
        />
      </div>
    </div>
  );
}
