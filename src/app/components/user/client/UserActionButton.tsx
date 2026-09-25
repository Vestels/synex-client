"use client";

import { useState } from "react";
import { deleteCurrentUserAction, requestClearDeleteForCurrentUserAction } from "@/actions/user.actions";
import Button from "@/app/components/Button";
import SpinnerSvg from "@/app/components/svgs/SpinnerSvg";
import { useRouter } from "next/navigation";
import { delay } from "@/utils/delay.util";

interface UserActionButtonProps {
  children: React.ReactNode;
  onClick: "delete" | "cleardelete";
}

export default function UserActionButton({ children, onClick }: UserActionButtonProps) {
  const router = useRouter();
  const [isPending, updatePending] = useState(false);

  const handleClick = async () => {
    updatePending(true);

    try {
      if ("delete" === onClick) {
        await deleteCurrentUserAction();
      } else {
        await requestClearDeleteForCurrentUserAction();
      }

      // TODO - remove later
      await delay(500);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      updatePending(false);
    }
  };

  return (
    <Button className="button--user-action" variant={"secondary"} disabled={isPending} onClick={handleClick}>
      {isPending ? <SpinnerSvg /> : children}
    </Button>
  );
}
