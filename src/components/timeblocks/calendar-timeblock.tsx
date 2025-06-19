import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Timeblock } from "@/types/types";
import { Button } from "../ui/button";
import TimeblockForm from "./timeblock-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimeblock, updateTimeblock } from "./api";
import { getDateFromURLParams, getEndOfWeek, getStartOfWeek } from "@/lib/utils";

interface props {
  timeblock: Timeblock;
  view: String;
}

export default function CalendarBlock({ timeblock, view }: props) {
  const [errorMessage, setErrorMessage] = useState("");

  let offset = 0
  if (view === "Week") {
    offset = 7;
  } else if (view === "Day") {
    offset = 1;
  }

  const createBlock = (
    day: number,
    hour: number,
    min: number,
    hourDiff: number,
    minDiff: number,
    name: string,
    timespan: string,
  ) => {

    const position = {
      width: `calc((100% - 4rem) / ${offset})`,
      height: `calc((((100% - 4rem) / 24) * ${hourDiff}) + (((100% - 4rem) / 1440) * ${minDiff}))`,
      top: `calc((((100% - 4rem) / 24) * ${hour}) + (((100% - 4rem) / 1440) * ${min}) + 4rem)`,
      left: `calc((((100% - 4rem) / ${offset}) * ${day}) + 4rem)`,
    };

    return (
      <DialogTrigger asChild>
        <div
          className="z-50 absolute text-white bg-orange-300 rounded-xl shadow-neutral-600 pl-5 pt-2 shadow-md cursor-pointer"
          style={position}
        >
          <>
            {minDiff < 45 && hourDiff <= 1 ? null : (
              <h1 className="text-sm text-shadow-neutral-600 text-shadow-xs font-bold truncate">
                {name}
              </h1>
            )}
            {hourDiff <= 1 ? null : (
              <h1 className="text-sm  text-shadow-neutral-600 text-shadow-xs font-bold">
                {timespan}
              </h1>
            )}
          </>
        </div>
      </DialogTrigger>
    );
  };

  const renderBlocks = () => {
    const startTimeString = timeblock.startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    const endTimeString = timeblock.endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    const calendarBlocks = [];

    let currentDateTime = new Date(timeblock.startTime);
    const startOfWeek = getStartOfWeek();

    // Incase calendar block starts before week does only render blocks in current week
    if (currentDateTime < startOfWeek) {
      currentDateTime = new Date(startOfWeek);
      currentDateTime.setHours(0);
      currentDateTime.setMinutes(0);
    }

    // For day view start on current day
    if  (view === "Day") {
      if (currentDateTime < getDateFromURLParams()) {
        currentDateTime = new Date(getDateFromURLParams());
        currentDateTime.setHours(0);
        currentDateTime.setMinutes(0)
      }
    }

    let complete = false;

    while (!complete) {
      // Dont want to draw blocks outside of week
      if (currentDateTime.getDate() > getEndOfWeek().getDate()) {
        complete = true;
      }
      // Only want to draw on current day if on day view
      else if (currentDateTime.getDate() != getDateFromURLParams().getDate() && view =="Day") {
        complete = true;
      } 
      // If block does not end on current date draw up till midnight on this date
      else if (currentDateTime.getDate() != timeblock.endTime.getDate()) {
        let day = 0
        if (view == "Week") {
            day = currentDateTime.getDay()
        }

        calendarBlocks.push(
          createBlock(
            day,
            currentDateTime.getHours(),
            currentDateTime.getMinutes(),
            23 - currentDateTime.getHours(),
            59 - currentDateTime.getMinutes(),
            timeblock.name,
            `${startTimeString} - ${endTimeString}`,
          ),
        );
        currentDateTime.setDate(currentDateTime.getDate() + 1);
        currentDateTime.setHours(0, 0);
      }
      // If block does end on this date draw using given times 
      else if (currentDateTime.getDate() == timeblock.endTime.getDate()) {

        let day = 0
        if (view == "Week") {
            day = currentDateTime.getDay()
        }

        calendarBlocks.push(
          createBlock(
            day,
            currentDateTime.getHours(),
            currentDateTime.getMinutes(),
            timeblock.endTime.getHours() - currentDateTime.getHours(),
            timeblock.endTime.getMinutes() - currentDateTime.getMinutes(),
            timeblock.name,
            `${startTimeString} - ${endTimeString}`,
          ),
        );
        complete = true;
      }
    }
    return calendarBlocks;
  };

  // Create query for updating timeblock from edit form values
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (t: Timeblock) => {
      return updateTimeblock(t);
    },
    onSuccess: (data) => {
      console.log("Updated timeblock");
      console.log(data);
      setErrorMessage("");
      queryClient.invalidateQueries({ queryKey: ["timeblocks"] });
      setEditMode(false);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (t: Timeblock) => {
      console.log("Starting delete mutation");
      return deleteTimeblock(t);
    },
    onSuccess: (data) => {
      console.log("Deleted timeblock");
      queryClient.invalidateQueries({
        queryKey: ["timeblocks"],
        refetchType: "all",
      });
      console.log(data);
    },
  });

  const formDefaults = {
    name: timeblock.name,
    location: timeblock.location,
    startHour: timeblock.startTime.getHours(),
    startMinute: timeblock.startTime.getMinutes(),
    endHour: timeblock.endTime.getHours(),
    endMinute: timeblock.endTime.getMinutes(),
    startDate: new Date(
      timeblock.startTime.getFullYear(),
      timeblock.startTime.getMonth(),
      timeblock.startTime.getDate(),
    ),
    endDate: new Date(
      timeblock.endTime.getFullYear(),
      timeblock.endTime.getMonth(),
      timeblock.endTime.getDate(),
    ),
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setEditMode(false);
        setErrorMessage("");
      }}
    >
      {renderBlocks()}
      <DialogContent className="p-8">
        {editMode ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Timeblock</DialogTitle>
            </DialogHeader>
            <TimeblockForm
              defaults={formDefaults}
              onSubmitFn={(t: Timeblock) => {
                t.id = timeblock.id;
                updateMutation.mutate(t);
              }}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{timeblock.name}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{timeblock.location}</DialogDescription>
            <DialogDescription>
              {timeblock.startTime.toLocaleString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              -{" "}
              {timeblock.endTime.toLocaleString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </DialogDescription>
            <DialogDescription>
              {timeblock.startTime.toLocaleDateString()}
            </DialogDescription>
            <div className="flex flex-row justify-start gap-4">
                <Button className="w-1/5" onClick={() => setEditMode(true)}>Edit</Button>
                <Button className="w-1/5"
                  onClick={() => {
                    deleteMutation.mutate(timeblock);
                    setOpen(false);
                  }}
                >
                  Delete
                </Button>
            </div>
          </>
        )}
        <h1>{errorMessage}</h1>
      </DialogContent>
    </Dialog>
  );
}
