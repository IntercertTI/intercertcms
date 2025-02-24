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
import { Input } from "@/components/ui/input"
import {login} from "@/utils/actions/auth/login";
import { Loader2 } from "lucide-react"
import { useState } from "react"

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

        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        await login(formData);

        setButtonSubmit(false);
        return;
    }

    return (
        <div className={`flex justify-center items-center`}>
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
                                    <Input placeholder="Your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    <Button type="submit" disabled={buttonSubmit}>
                        {buttonSubmit && <Loader2 className="animate-spin" />}
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
}