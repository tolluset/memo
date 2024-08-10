import { Button } from "@/components/ui/button";
import Editor from "./memo/Editor";
import { getMemoToday } from "./memo/queries";
import { PAGE } from "@/constants/url";
import { session, signOut } from "@/auth";

export default async function Home() {
  const user = await session();
  const memo = await getMemoToday();

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: PAGE.signIn });
  };

  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <div className="flex justify-end w-full">
        {user ? (
          <form action={handleSignOut}>
            <Button variant="outline">로그아웃</Button>
          </form>
        ) : (
          <a href={PAGE.signIn}>
            <Button variant="outline">로그인</Button>
          </a>
        )}
      </div>
      <Editor memo={memo} />
    </main>
  );
}
