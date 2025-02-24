'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {login} from "@/utils/actions/auth/login";
import { Loader2 } from "lucide-react"
import { useState } from "react"

import { toast } from "sonner";
import {redirect} from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
})


export default function LoginPage() {

    const [buttonSubmit, setButtonSubmit] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setButtonSubmit(true);

        const response = await login(values);

        if (response != "success") {
            toast.error("Login Failed", {
                    description: response,
                });
        }
        else {
            toast.success("Login successful");
            redirect("/editor/article-dashboard");
        }

        setButtonSubmit(false);
        return;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[400px] ">
                <CardHeader>
                    <CardTitle> Login </CardTitle>
                    <CardDescription> get into your account </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your email" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            <Button type="submit" disabled={buttonSubmit} className={`w-full`}>
                                {buttonSubmit && <Loader2 className="animate-spin" />}
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}