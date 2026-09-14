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
import { ProfileSchema } from '@/validators/schemas';

export default function UserProfileForm({ initialProfile }: { initialProfile: UserProfile }) {
  const router = useRouter();
  const translate = useTranslations('APP');
  const [formData, setFormData] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formDataRef = useRef(formData);

  const { registerForm, unregisterForm, markChanged, markSaved } = useUnsavedChangesStore(
    useShallow((state) => ({
      registerForm: state.registerForm,
      unregisterForm: state.unregisterForm,
      markChanged: state.markChanged,
      markSaved: state.markSaved,
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
        const validator = ProfileSchema.safeParse(formDataRef.current);
        if (!validator.success) {
          const fieldErrors: Record<string, string> = {};
          validator.error.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0] as string] = issue.message;
            }
          });
          setErrors(fieldErrors);
          throw new Error('Validation error.');
        }

        setErrors({});
        const changedFields = getChangedFields(initialProfile, formDataRef.current);
        await updateCurrentUserProfileAction(changedFields);
        router.refresh();
      },

      () => {
        setErrors({});
        setFormData(initialProfile);
        formDataRef.current = initialProfile;
      }
    );

    return () => {
      unregisterForm('user');
    };
  }, [registerForm, unregisterForm, initialProfile, router]);

  const handleChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    handleUpdateField(setFormData, field, value);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="user-informations">
      <div className="user-informations__data-row">
        <label htmlFor="birthDate" className="property property--required">
          {translate('PROFILE.PERSONAL.BIRTH_DATE')}
          <sup className="input-requirement">{`(${translate('REQUIREMENTS.REQUIRED')})`}</sup>
        </label>

        <input
          id="birthDate"
          className={`value ${errors.birthDate ? 'input--error' : ''}`}
          type="date"
          value={formData.birthDate ?? ''}
          required
          onChange={(event) => handleChange('birthDate', event.target.value.trim())}
        />
        {errors.birthDate && (
          <>
            <div></div>
            <p className="value error-message">{translate('PROFILE.VALIDATORS.BIRTH_DATE')}</p>
          </>
        )}
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="gender" className="property property--required">
          {translate('PROFILE.PERSONAL.GENDER.LABEL')}
          <sup className="input-requirement">{`(${translate('REQUIREMENTS.REQUIRED')})`}</sup>
        </label>

        <select
          id="gender"
          className="value"
          value={formData.gender ?? ''}
          required
          onChange={(event) => handleChange('gender', event.target.value as Gender)}
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
          className={`value ${errors.nickname ? 'input--error' : ''}`}
          type="text"
          value={formData.nickname ?? ''}
          onChange={(event) => handleChange('nickname', event.target.value.trim())}
        />
        {errors.nickname && (
          <>
            <div></div>
            <p className="value error-message">{translate('PROFILE.VALIDATORS.NICKNAME')}</p>
          </>
        )}
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="lastName" className="property">
          {translate('PROFILE.PERSONAL.LASTNAME')}
        </label>

        <input
          id="lastName"
          className={`value ${errors.lastName ? 'input--error' : ''}`}
          type="text"
          value={formData.lastName ?? ''}
          onChange={(event) => handleChange('lastName', event.target.value.trim())}
        />
        {errors.lastName && (
          <>
            <div></div>
            <p className="value error-message">{translate('PROFILE.VALIDATORS.LASTNAME')}</p>
          </>
        )}
      </div>

      <div className="user-informations__data-row">
        <label htmlFor="firstName" className="property">
          {translate('PROFILE.PERSONAL.FIRSTNAME')}
        </label>

        <input
          id="firstName"
          className={`value ${errors.firstName ? 'input--error' : ''}`}
          type="text"
          value={formData.firstName ?? ''}
          onChange={(event) => handleChange('firstName', event.target.value.trim())}
        />
        {errors.firstName && (
          <>
            <div></div>
            <p className="value error-message">{translate('PROFILE.VALIDATORS.FIRSTNAME')}</p>
          </>
        )}
      </div>
    </div>
  );
}
