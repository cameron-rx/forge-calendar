import { clsx, type ClassValue } from "clsx"
import { useParams } from "react-router"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFromURLParams() {
  let params = useParams()

  if (params.year && params.month && params.day) {
    let day = parseInt(params.day) - 1;
    let month = parseInt(params.month) -1;
    let year = parseInt(params.year);

    return new Date(year,month,day);
  }

  return new Date(Date.now())
}

export function getStartOfWeek() {
  let currentDay = getDateFromURLParams();
  let dayOfWeek = currentDay.getDay();

  let date = currentDay.getDate() - dayOfWeek;
  let startOfWeek = new Date(currentDay.getFullYear(), currentDay.getMonth(), date);
  return startOfWeek;
}

export function getEndOfWeek() {
  let currentDay = getDateFromURLParams();
  let dayOfWeek = currentDay.getDay();

  let date = currentDay.getDate() + (6 - dayOfWeek);
  let endOfWeek = new Date(currentDay.getFullYear(), currentDay.getMonth(), date);
  return endOfWeek;
}
