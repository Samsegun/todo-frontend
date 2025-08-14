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
import StyledButton from "@/components/customUi/StyledButton";
import { Link } from "react-router";

const formSchema = z.object({
    emailUsername: z.string().nonempty("Field cannot be empty"),
    password: z.string().nonempty("Password cannot be empty"),
});

function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailUsername: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <PageWrapper>
            <PageHeader>Log In</PageHeader>

            <section className=' mt-8 w-11/12 md:w-4/5 mx-auto'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='emailUsername'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
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

                        <StyledButton
                            type='submit'
                            styles='bg-[#32bc9c7b] hover:bg-[#325149da] block mx-auto w-1/2 lg:w-4/12'>
                            Log In
                        </StyledButton>

                        <p className='text-center'>
                            Don't have an account?{" "}
                            <Link
                                to={"/register"}
                                className='text-[#32bc9c7b] underline font-bold'>
                                Register
                            </Link>
                        </p>
                    </form>
                </Form>
            </section>
        </PageWrapper>
    );
}

export default Login;
