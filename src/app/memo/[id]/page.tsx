import Editor from "../Editor";
import { getMemo } from "@/app/memo/queries";
import MemoSheet from "../MemoSheet";

export default async function Memo({
  params: { id },
}: {
  params: { id: string };
}) {
  const memo = await getMemo(id);

  return (
    <main className="flex h-full flex-col items-center justify-between p-4">
      <MemoSheet />
      <Editor memo={memo} />;
    </main>
  );
}
