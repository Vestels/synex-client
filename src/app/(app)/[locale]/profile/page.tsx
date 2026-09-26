import UserProfileClient from "@/components/user/server/UserProfileWrapper";

export const dynamic = "force-dynamic";

export default async function Profile() {
  return <UserProfileClient />;
}
