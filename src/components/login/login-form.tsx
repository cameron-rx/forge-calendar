import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { login } from "./api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default function LoginForm() {
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const {setAuth}= useAuth()
    const navigate = useNavigate()

    const tryLogin = async (values: z.infer<typeof formSchema>) => {
        console.log("Attempting login")
        try {
            const success = await login({email: values.email, password: values.password})
            if (success) {
                setAuth(true)
                navigate("/app")
                setMessage("Success")
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(tryLogin)} className="space-y-3">
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
                <Button className="" type="submit">Login</Button>
            </form>
            {message ? <h1>{message}</h1> : null}
        </Form>
    )
}