import Editor from "./memo/Editor";
import { getMemoToday } from "./memo/queries";
import MemoSheet from "./memo/MemoSheet";

export default async function Home() {
  const memo = await getMemoToday();

  return (
    <main className="flex h-full flex-col items-center justify-between p-4">
      <MemoSheet />
      <Editor memo={memo} />
      {memo.image && (
        <div className="pb-4">
          <img src={memo.image} alt="Memo Image" className="max-w-full h-auto" />
        </div>
      )}
    </main>
  );
}
