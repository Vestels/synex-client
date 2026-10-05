'use client';

import { useState, useTransition } from 'react';
import {
  deleteCurrentUserAction,
  requestClearDeleteForCurrentUserAction,
} from '@/actions/user.actions';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';
import ErrorSvg from '@/components/svgs/ErrorSvg';

interface UserActionButtonProps {
  children: React.ReactNode;
  onClick: 'delete' | 'cleardelete';
}

export default function UserActionButton({ children, onClick }: UserActionButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      try {
        if ('delete' === onClick) {
          await deleteCurrentUserAction();
        } else {
          await requestClearDeleteForCurrentUserAction();
        }

        setError(false);
        router.refresh();
      } catch {
        setError(true);
      }
    });
  };

  return (
    <Button
      className="button--user-action"
      variant={'subtle'}
      disabled={isPending}
      onClick={handleClick}
    >
      {error && <ErrorSvg />}
      {isPending ? <SpinnerSvg /> : children}
    </Button>
  );
}
