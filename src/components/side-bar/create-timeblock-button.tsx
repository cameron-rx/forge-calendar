import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import CreateTimeblockForm from "./create-timeblock-form"

export default function CreateTimeblockButton() {
    return (
    <Dialog>
        <DialogTrigger>Create</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Timeblock</DialogTitle>
            </DialogHeader>
            <CreateTimeblockForm />
        </DialogContent>
    </Dialog>
    )
}