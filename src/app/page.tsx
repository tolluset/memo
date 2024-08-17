import { Button } from "@/components/ui/button";
import Editor from "./memo/Editor";
import { getMemos, getMemoToday } from "./memo/queries";
import { PAGE } from "@/constants/url";
import { signOut } from "@/auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { timeFormatting } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const memo = await getMemoToday();
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
            <SheetDescription>메뉴임 ㅇㅅㅇ</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col">
            {memos.map((memo) => (
              <Link
                key={memo.id}
                href={PAGE.memo(memo.id)}
                className="pt-2 w-full"
              >
                {timeFormatting(memo.created_at)}
              </Link>
            ))}
          </div>
          <SheetFooter>
            <form action={handleSignOut}>
              <Button variant="outline" className="w-full">
                로그아웃
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Editor memo={memo} />
    </main>
  );
}
