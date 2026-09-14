import UnsavedChangesPanelWrapper from '@/components/user/client/UnsavedChangesPanelWrapper';

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="profile-page">
        {children}
        <UnsavedChangesPanelWrapper />
      </section>
    </>
  );
}
