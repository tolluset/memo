import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { PAGE } from "@/constants/url";
import { timeFormatting } from "@/lib/utils";
import Link from "next/link";
import Editor from "../Editor";
import { getMemo, getMemos } from "@/app/memo/queries";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default async function Memo({
  params: { id },
}: {
  params: { id: string };
}) {
  const memo = await getMemo(id);
  const memos = await getMemos();

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: PAGE.signIn });
  };

  return (
    <main className="flex h-full flex-col items-center justify-between p-4">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex justify-end w-full">
            <Button variant="outline">메뉴</Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>메뉴</SheetTitle>
            <SheetDescription>날짜별 메모임 ㅇㅅㅇ</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col py-4">
            {memos.map((memo) => (
              <Link
                key={memo.id}
                href={PAGE.memo(memo.id)}
                className="pt-2 w-full text-gray-500"
              >
                {timeFormatting(memo.created_at)}
              </Link>
            ))}
          </div>
          <hr className="pb-4" />
          <SheetFooter>
            <form action={handleSignOut}>
              <Button variant="outline" className="w-full">
                로그아웃
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Editor memo={memo} />;
    </main>
  );
}
