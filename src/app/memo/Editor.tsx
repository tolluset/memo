"use client";

import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { upsertMemo } from "./queries";
import { SelectMemo } from "@/db/schema";
import { timeFormatting } from "@/lib/utils";
import { useState } from "react";

export default function Editor({ memo }: { memo: SelectMemo }) {
  const [image, setImage] = useState<string | null>(memo.image ?? null);

  const onKeyUpTextArea = useDebounce(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const content = target.value;

      await upsertMemo({ id: memo.id, content, image });
    },
    1000,
  );

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setImage(base64String);
        await upsertMemo({ id: memo.id, content: memo.content, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div className="pb-4">
        <input type="file" accept="image/*" onChange={onImageChange} />
      </div>
      {image && (
        <div className="pb-4">
          <img src={image} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </section>
  );
}
