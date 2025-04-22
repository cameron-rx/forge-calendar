import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const aspNETPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(aspNETPasswordRegex),
    passwordRetype: z.string()
}).refine((data) => data.password == data.passwordRetype, {
    path: ["passwordRetype"],
    message: "Passwords do not match"
})

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordRetype: ""
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => console.log("Submit"))} className="space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordRetype"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Retype Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Register</Button>
            </form>
        </Form>
    )
}