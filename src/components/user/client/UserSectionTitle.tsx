'use client';

import ErrorSvg from '@/components/svgs/ErrorSvg';
import { useAccountLinkingStore } from '@/stores/account-linking.store';
import { useUnsavedChangesStore } from '@/stores/unsaved-changes.store';
import { useShallow } from 'zustand/shallow';

type UserSectionTitleProps = {
  title: string;
  forSection?: 'user' | 'preferences' | 'identities';
};

export default function UserSectionTitle({ title, forSection }: UserSectionTitleProps) {
  const { profileDataError, preferencesDataError } = useUnsavedChangesStore(
    useShallow((state) => ({
      profileDataError: state.errorForms.has('user'),
      preferencesDataError: state.errorForms.has('preferences'),
    }))
  );

  const identitiesDataError = useAccountLinkingStore((state) => state.hasError);

  const isCurrentSectionInError =
    (forSection === 'user' && profileDataError) ||
    (forSection === 'preferences' && preferencesDataError) ||
    (forSection === 'identities' && identitiesDataError);

  return (
    <div>
      <h2 className="section-title">
        {title}
        {isCurrentSectionInError && <ErrorSvg />}
      </h2>
      <hr className="divider" />
    </div>
  );
}
