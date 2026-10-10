'use client';

import { AUTH } from '@/constants/constants';
import { IdentityProvider } from '@/enums/user.enum';
import { authenticateAuth0ClientSpa } from '@/libs/auth0-secondary.lib';
import { useAccountLinkingStore } from '@/stores/account-linking.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import Button from '@/components/Button';
import CheckMarkSvg from '@/components/svgs/CheckMarkSvg';
import ErrorSvg from '@/components/svgs/ErrorSvg';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';

type LinkAccountButtonProps = {
  provider: IdentityProvider;
  connection: string;
  translate: string;
};

export default function LinkAccountButton({
  provider,
  connection,
  translate,
}: LinkAccountButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { setError, clearError, hasError } = useAccountLinkingStore(
    useShallow((state) => ({
      setError: state.setError,
      clearError: state.clearError,
      hasError: state.hasError,
    }))
  );

  const handleLinking = async () => {
    setLoading(true);
    setSuccess(false);
    clearError();

    try {
      const { idToken } = await authenticateAuth0ClientSpa(connection);

      const response = await fetch(`/api/${AUTH.BASE}/${AUTH.LINKING}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: provider,
          secondaryIdToken: idToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Linking failed');
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant={'primary'} onClick={handleLinking} disabled={loading}>
        {hasError && <ErrorSvg />}
        {success && <CheckMarkSvg />}
        {loading ? <SpinnerSvg /> : translate}
      </Button>
    </div>
  );
}
