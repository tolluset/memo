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
      {memo.image && (
        <div className="pb-4">
          <img src={memo.image} alt="Memo Image" className="max-w-full h-auto" />
        </div>
      )}
    </main>
  );
}
