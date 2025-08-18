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
import { Link } from "react-router";
import { z } from "zod";

import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useAuth";

const formSchema = z.object({
    email: z.email("Invalid email format"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

function Signup() {
    const signupMutation = useSignup();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, username, password } = values;

        signupMutation.mutate({ email, username, password });
    }

    return (
        <PageWrapper>
            <PageHeader>Create an Account</PageHeader>

            <section className=' mt-8 w-11/12 md:w-4/5 mx-auto'>
                <Form {...form}>
                    {signupMutation.isError && (
                        <p className='text-red-500 my-4 text-center capitalize'>
                            {signupMutation.error.message}!
                        </p>
                    )}

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='xyz@mail.com'
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Sam Segun'
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
                            disabled={signupMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] block mx-auto w-1/2 lg:w-4/12'>
                            {signupMutation.isPending
                                ? "Creating acccount..."
                                : "Create account"}
                        </Button>

                        <p className='text-center'>
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className='text-[#32bc9c7b] underline font-bold'>
                                Log In
                            </Link>
                        </p>
                    </form>
                </Form>
            </section>
        </PageWrapper>
    );
}

export default Signup;
