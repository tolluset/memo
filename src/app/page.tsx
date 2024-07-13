import Editor from "./memo/Editor";

const ACTIVITY = {
  name: "ㅇㅅㅇ",
  date: timeFormatting(new Date()),
  memo: "ㅇㅁㅇ 여기다 메모쓰기",
};

export default function Home() {
  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <Editor activity={ACTIVITY} />
    </main>
  );
}

function timeFormatting(date: Date) {
  // 9시간을 더하기 (밀리초 단위로 더함)
  const nineHoursLater = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // 'Asia/Seoul' 시간대에 맞추기
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("ko-KR", options);
  const [year, month, day] = formatter
    .formatToParts(nineHoursLater)
    .filter((part) => part.type !== "literal")
    .map((part) => part.value);

  // 'YYYY-MM-DD' 형식으로 출력하기
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
