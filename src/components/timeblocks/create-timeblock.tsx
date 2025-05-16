import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimeblockForm from "./timeblock-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timeblock } from "@/types/types";
import { createTimeblock } from "./api";

export default function CreateTimeblockButton() {
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (t: Timeblock) => {
      return createTimeblock(t);
    },
    onSuccess: () => {
      console.log("Timeblock added");
      queryClient.invalidateQueries({ queryKey: ["timeblocks"] });
      setErrorMessage("");
      setActive(false);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const formDefaults = {
    name: "",
    location: "",
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  };

  return (
    <Dialog open={active} onOpenChange={setActive}>
      <DialogTrigger>
        <div className="bg-black w-9/10 text-primary-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3">
          Create
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Timeblock</DialogTitle>
        </DialogHeader>
        <TimeblockForm
          defaults={formDefaults}
          onSubmitFn={(t: Timeblock) => mutation.mutate(t)}
        />
        <h1>{errorMessage}</h1>
      </DialogContent>
    </Dialog>
  );
}
