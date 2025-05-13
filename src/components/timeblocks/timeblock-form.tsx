import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Timeblock } from "@/types/types"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  location: z.string().min(1).max(50),
  startHour: z.coerce.number(),
  startMinute: z.coerce.number(),
  startDate: z.date(),
  endHour: z.coerce.number(),
  endMinute: z.coerce.number(),
  endDate: z.date(),
}).superRefine((data, ctx) => {
  const startTime = new Date(data.startDate.getFullYear(), data.startDate.getMonth(), data.startDate.getDate(), data.startHour, data.startMinute)
  const endTime = new Date(data.endDate.getFullYear(), data.endDate.getMonth(), data.endDate.getDate(), data.endHour, data.endMinute)
  if (endTime < startTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['startDate'], // first path
      message: "",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['startHour'], // first path
      message: "",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['startMinute'], // first path
      message: "",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['endHour'], // first path
      message: "",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['endMinute'], // first path
      message: "",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Make sure your start time comes after your end time.",
      path: ['endDate'], // first path
    });
  }
})

interface props {
  onSubmitFn: (t: Timeblock) => void
  defaults: {name:string, location: string, startHour: number, startMinute: number, endHour: number, endMinute: number, startDate: Date, endDate: Date}
}
export default function TimeblockForm({onSubmitFn, defaults}: props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaults.name,
      location: defaults.location,
      startHour: defaults.startHour,
      startMinute: defaults.startMinute,
      startDate: defaults.startDate,
      endHour: defaults.endHour,
      endMinute: defaults.endMinute,
      endDate: defaults.endDate
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    const startDate = new Date(values.startDate.getFullYear(), values.startDate.getMonth(), values.startDate.getDate(), values.startHour, values.startMinute)
    const endDate = new Date(values.endDate.getFullYear(), values.endDate.getMonth(), values.endDate.getDate(), values.endHour, values.endMinute)
    const timeblock: Timeblock = {id: 0, name: values.name, location: values.location, startTime: startDate, endTime: endDate};
    onSubmitFn(timeblock)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Start Time</FormLabel>
        <div className="flex row ">
          <FormField
            control={form.control}
            name="startHour"
            render={({ field }) => (
              <FormItem className="pr-1">
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start hour" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(24)].map((_x, i) =>
                      <SelectItem key={i} value={i.toString()}>{i < 10 ? "0" + i : i}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startMinute"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start minute" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(12)].map((_x, i) =>
                      <SelectItem key={i} value={(i * 5).toString()}>{(i * 5) < 10 ? "0" + (i * 5) : i * 5}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>End Time</FormLabel>
        <div className="flex row ">
          <FormField
            control={form.control}
            name="endHour"
            render={({ field }) => (
              <FormItem className="pr-1">
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start hour" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(24)].map((_x, i) =>
                      <SelectItem key={i} value={i.toString()}>{i < 10 ? "0" + i : i}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endMinute"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start minute" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(12)].map((_x, i) =>
                      <SelectItem key={i} value={(i * 5).toString()}>{(i * 5) < 10 ? "0" + (i * 5) : i * 5}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
