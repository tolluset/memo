import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeFormatting(date: Date) {
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
