import { getDateFromURLParams } from "@/lib/utils";
import { Timeblock, TimeblockResponseDTO } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getTimeblocks } from "../timeblocks/api";
import CalendarBlock from "../timeblocks/calendar-timeblock";

export default function DayView() {
  let date = getDateFromURLParams();
  const dateUTC = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  function convertAndFilterTimeblocks(data: any) {
    const timeblocks: Timeblock[] = data
      .map((t: TimeblockResponseDTO) => {
        const block: Timeblock = {
          id: t.id,
          name: t.name,
          location: t.location,
          startTime: new Date(t.startTime),
          endTime: new Date(t.endTime),
        };
        return block;
      })
      .filter((t: Timeblock) => {
        const startUTCDate = Date.UTC(
          t.startTime.getFullYear(),
          t.startTime.getMonth(),
          t.startTime.getDate(),
        );
        const endUTCDate = Date.UTC(
          t.endTime.getFullYear(),
          t.endTime.getMonth(),
          t.endTime.getDate(),
        );
        return (
          (startUTCDate >= dateUTC && startUTCDate <= dateUTC) ||
          (endUTCDate >= dateUTC && endUTCDate <= dateUTC)
        );
      });

    return timeblocks;
  }

  function createDayHeader() {
    const today = new Date(Date.now());


    if (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    ) {
      return (
        <div className="flex flex-col justify-center text-center bg-orange-500 text-white">
          <h3 className="text-sm">
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </h3>
          <h1 className="text-2xl">{date.getDate()}</h1>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center text-center">
          <h3 className="text-sm">
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </h3>
          <h1 className="text-2xl">{date.getDate()}</h1>
        </div>
      );
    }
  }

  const { isPending, data } = useQuery({
    queryKey: ["timeblocks"],
    queryFn: getTimeblocks,
  });

  return (
    <>
      <div
        id="dayContainer"
        className="relative w-full h-full grid grid-cols-[4rem_repeat(1,_1fr)] grid-rows-[4rem_repeat(24,_1fr)] "
      >
        <div className=""></div>

        {createDayHeader()}

        {[...Array(24)].map((_, i) => (
          <>
            <div id={"time-" + i} className="">
              <p className="top text-sm text-center transform -translate-y-1/2">
                {i + ":00"}
              </p>
            </div>

            <div id="1" className="border border-neutral-200"></div>
          </>
        ))}

        {isPending ? (
          <h1>Loading</h1>
        ) : (
          convertAndFilterTimeblocks(data).map((timeblock) => (
            <CalendarBlock key={timeblock.id} timeblock={timeblock} view="Day"/>
          ))
        )}
      </div>
    </>
  );
}

