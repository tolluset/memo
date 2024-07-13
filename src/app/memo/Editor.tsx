"use client";

// import { Activity } from "~/app/activities/model";
import { Textarea } from "@/components/ui/textarea";
// import { updateActivityAction } from "~/app/activities/action";
import { useDebounce } from "@/hooks/useDebounce";

interface Activity {
  date: string;
  memo: string;
}

export default function Editor({ activity }: { activity: any }) {
  const onKeyUpTextArea = useDebounce(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const memo = target.value;

      //   updateActivityAction({
      //     activity: { ...activity, memo },
      //   });
    },
    1000,
  );

  return (
    <section className="w-full">
      <div className="pb-4">
        <h1 className="font-bold">{activity.date}</h1>
      </div>
      <div className="pb-4">
        <Textarea
          defaultValue={activity.memo}
          onKeyUp={onKeyUpTextArea}
          autoFocus
          className="h-[90vh] border-none shadow-none  resize-none focus-visible:ring-transparent"
        />
      </div>
    </section>
  );
}
