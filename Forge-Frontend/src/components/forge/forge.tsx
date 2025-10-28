import { Anvil } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgeTimeblock } from "./api";

export default function Forge()  {
    const [message, setMessage] = useState("")
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            return forgeTimeblock(message)
        },
        onSuccess: () => {
            setMessage("")
            queryClient.invalidateQueries({ queryKey: ["timeblocks"] })
        }
    })

    return (
        <form className='flex flex-col gap-1 h-full' onSubmit={(e) => mutation.mutate(e)}>
            <Textarea className="h-1/3 w-19/20 self-center mb-2" placeholder="Forge calendar timeblock from text! e.g Gym workout 12-1 tomorrow." value={message} onChange={(e) => setMessage(e.target.value)}>
            </Textarea>
            <Button className="w-9/10 self-center bg-orange-500 hover:bg-orange-400" type="submit">
                Forge
                <Anvil />
            </Button>
            {mutation.isPending ? (
                <>
                    <p className="text-center">Forging Request...</p>
                </>
            ) : <></>}
        </form>
    )
}

