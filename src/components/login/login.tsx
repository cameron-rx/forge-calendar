import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "../ui/tabs";
import RegisterForm from "./register-form";



export default function Login() {

    const [error, setError] = useState<string | null>(null)


    return (
        <div className="flex flex-col justify-center align-middle">
            <img className="max-w-1/10 h-auto"src="forge-logo.png"></img>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Input type="email" id="email" placeholder="Email"/>
                    <Input type="password" id="password" placeholder="Password"/>
                    <Button type="submit">Login</Button> 
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}