"use client";

import { useTransition } from "react";
import { deleteCurrentUserAction, requestClearDeleteForCurrentUserAction } from "@/actions/user.actions";
import Button from "@/components/Button";
import SpinnerSvg from "@/components/svgs/SpinnerSvg";
import { useRouter } from "next/navigation";

interface UserActionButtonProps {
  children: React.ReactNode;
  onClick: "delete" | "cleardelete";
}

export default function UserActionButton({ children, onClick }: UserActionButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        if ("delete" === onClick) {
          await deleteCurrentUserAction();
        } else {
          await requestClearDeleteForCurrentUserAction();
        }

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Button className="button--user-action" variant={"subtle"} disabled={isPending} onClick={handleClick}>
      {isPending ? <SpinnerSvg /> : children}
    </Button>
  );
}
