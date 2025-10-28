import { Timeblock } from "@/types/types";


export const getTimeblocks = async () => {
  const response = await fetch(`/api/timeblock`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const createTimeblock = async (t: Timeblock) => {

  const req = new Request(`/api/timeblock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: t.name,
      Location: t.location,
      StartTime: t.startTime.toISOString(),
      EndTime: t.endTime.toISOString(),
    }),
  });

  const response = await fetch(req, { credentials: "include" });

  if (!response.ok) {
    if (response.status == 409) {
      throw new Error("There exsits a timeblock in this timespan already");
    } else {
      throw new Error("Network response was not ok");
    }
  }

  return response.json();
};

export const updateTimeblock = async (t: Timeblock) => {
  const req = new Request(`/api/timeblock/${t.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: t.name,
      Location: t.location,
      StartTime: t.startTime.toISOString(),
      EndTime: t.endTime.toISOString(),
    }),
  });

  const response = await fetch(req, { credentials: "include" });

  if (!response.ok) {
    if (response.status == 409) {
      throw new Error("There exsits a timeblock in this timespan already");
    } else {
      throw new Error("Network response was not ok");
    }
  }

  return response.json();
};

export const deleteTimeblock = async (t: Timeblock) => {
  const req = new Request(`/api/timeblock/${t.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(req, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response;
};
