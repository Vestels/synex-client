'use client';

import Button from '@/components/Button';
import CheckMarkSvg from '@/components/svgs/CheckMarkSvg';
import ErrorSvg from '@/components/svgs/ErrorSvg';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';
import TrashSvg from '@/components/svgs/TrashSvg';
import { useAccountLinkingStore } from '@/stores/account-linking.store';
import { deleteLinkedAccountAction } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

type DeleteLinkedAccountButtonProps = {
  provider: string;
};

export default function DeleteLinkedAccountButton({ provider }: DeleteLinkedAccountButtonProps) {
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

  const handleDelete = async () => {
    setLoading(true);
    setSuccess(false);
    clearError();

    try {
      await deleteLinkedAccountAction(provider);

      setSuccess(true);
      router.refresh();
    } catch {
      setError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={'subtle'} iconOnly={true} onClick={handleDelete}>
      {hasError ? (
        <ErrorSvg />
      ) : loading ? (
        <SpinnerSvg />
      ) : success ? (
        <CheckMarkSvg />
      ) : (
        <TrashSvg />
      )}
    </Button>
  );
}
