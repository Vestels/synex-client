'use client';

import { deleteLinkedAccountAction } from '@/actions/user.actions';
import Button from '@/components/Button';
import CheckMarkSvg from '@/components/svgs/CheckMarkSvg';
import ErrorSvg from '@/components/svgs/ErrorSvg';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';
import TrashSvg from '@/components/svgs/TrashSvg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteLinkedAccountButtonProps = {
  provider: string;
};

export default function DeleteLinkedAccountButton({ provider }: DeleteLinkedAccountButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteLinkedAccountAction(provider);

      setSuccess(true);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={'subtle'} iconOnly={true} onClick={handleDelete}>
      {error ? <ErrorSvg /> : loading ? <SpinnerSvg /> : success ? <CheckMarkSvg /> : <TrashSvg />}
    </Button>
  );
}
