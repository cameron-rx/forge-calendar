import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "./components/ui/tabs";

export default function Login() {
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
                    <Input type="email" id="email" placeholder="Email"/>
                    <Input type="password" id="password" placeholder="Password"/>
                    <Input type="password" id="password2" placeholder="Retype Password"/>
                    <Button type="submit">Register</Button> 
                </TabsContent>
            </Tabs>
        </div>
    )
}