import { Tabs, TabsList, TabsTrigger, TabsContent} from "../ui/tabs";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";



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
                    <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}