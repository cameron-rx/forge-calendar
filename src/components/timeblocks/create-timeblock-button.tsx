import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import CreateTimeblockForm from "./create-timeblock-form"
import { useState } from "react"

export default function CreateTimeblockButton() {
    const [active, setActive] = useState(false)

    return (
    <Dialog open={active} onOpenChange={setActive}>
        <DialogTrigger>Create</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Timeblock</DialogTitle>
            </DialogHeader>
            <CreateTimeblockForm setActive={setActive}/>
        </DialogContent>
    </Dialog>
    )
}