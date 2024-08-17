import { Button } from "@/components/ui/button";
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
import { getMemos } from "./queries";

export default async function MemoSheet() {
  const memos = await getMemos();

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: PAGE.signIn });
  };

  return (
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
  );
}
