import UnsavedChangesPanelWrapper from "@/app/components/user/client/UnsavedChangesPanelWrapper";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <UnsavedChangesPanelWrapper />
    </>
  );
}
