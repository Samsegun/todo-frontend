import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { Button } from "@/components/ui/button";
import { useSignin } from "@/hooks/useAuth";
import { Link } from "react-router";

const formSchema = z.object({
    emailUsername: z.string().nonempty("Field cannot be empty"),
    password: z.string().nonempty("Password cannot be empty"),
});

function Login() {
    const signinMutation = useSignin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailUsername: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { emailUsername, password } = values;

        signinMutation.mutate({ emailUsername, password });
    }

    return (
        <PageWrapper>
            <PageHeader>Log In</PageHeader>

            <section className=' mt-8 w-11/12 md:w-4/5 mx-auto'>
                <Form {...form}>
                    {signinMutation.isError && (
                        <p className='text-red-500 my-4 text-center capitalize'>
                            {signinMutation.error.message}!
                        </p>
                    )}

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='emailUsername'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email or Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Email or Username'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Password'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={signinMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] block mx-auto w-1/2 lg:w-4/12'>
                            {signinMutation.isPending ? "Log In..." : "Log In"}
                        </Button>

                        <p className='text-center'>
                            Don't have an account?{" "}
                            <Link
                                to={"/signup"}
                                className='text-[#32bc9c7b] underline font-bold'>
                                Create account
                            </Link>
                        </p>
                    </form>
                </Form>
            </section>
        </PageWrapper>
    );
}

export default Login;
