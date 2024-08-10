import { Button } from "@/components/ui/button";
import Editor from "./memo/Editor";

const ACTIVITY = {
  date: timeFormatting(new Date()),
  memo: "ㅇㅁㅇ 여기다 메모쓰기",
};

export default function Home() {
  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <div className="flex justify-end w-full">
        <Button variant="outline">
          <a href="/signin">로그인</a>
        </Button>
      </div>
      <Editor activity={ACTIVITY} />
    </main>
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
