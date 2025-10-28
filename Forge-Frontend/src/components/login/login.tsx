import { Tabs, TabsList, TabsTrigger, TabsContent} from "../ui/tabs";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";



export default function Login() {

    return (
        <div className="flex flex-col justify-center content-center items-center mt-40 ml-auto mr-auto">
            <img className="max-w-2/3 md:max-w-1/3 lg:max-w-1/6 h-auto mb-5"src="forge-logo.png"></img>
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