"use client";

import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { upsertMemo } from "./queries";
import { SelectMemo } from "@/db/schema";

export default function Editor({ memo }: { memo: SelectMemo }) {
  const onKeyUpTextArea = useDebounce(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const content = target.value;

      await upsertMemo({ id: memo.id, content });
    },
    1000,
  );

  return (
    <section className="w-full">
      <div className="pb-4">
        <h1 className="font-bold">{timeFormatting(memo.created_at)}</h1>
      </div>
      <div className="pb-4">
        <Textarea
          defaultValue={memo.content ?? ""}
          onKeyUp={onKeyUpTextArea}
          autoFocus
          className="h-[90vh] border-none shadow-none  resize-none focus-visible:ring-transparent"
        />
      </div>
    </section>
  );
}

function timeFormatting(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  const formatter = new Intl.DateTimeFormat("ko-KR", options);
  const [year, month, day] = formatter
    .formatToParts(date)
    .filter((part) => part.type !== "literal")
    .map((part) => part.value);

  // 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
