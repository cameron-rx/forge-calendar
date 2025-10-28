import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { register } from "./api";

const aspNETPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(aspNETPasswordRegex, "Password must contain at least one uppercase letter, one number, and one special character"),
    passwordRetype: z.string()
}).refine((data) => data.password == data.passwordRetype, {
    path: ["passwordRetype"],
    message: "Passwords do not match"
})

export default function RegisterForm() {
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordRetype: ""
        },
    })

    const tryRegister = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await register({email: values.email, password: values.password})
            if (res) {
                setMessage(`Success Account Created:  Proceed to login`)
            }

        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(tryRegister)} className="space-y-3">
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
            {message ? <h1>{message}</h1> : null}
        </Form>
    )
}