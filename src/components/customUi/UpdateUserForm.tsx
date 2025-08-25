import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import { useUpdateUser } from "@/hooks/useAuth";
import useProfileStore from "@/store/userProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import StyledButton from "./StyledButton";

const formSchema = z.object({
    email: z.email("Invalid email format"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters"),
});

function UpdateUserForm() {
    const { user } = useProfileStore();
    const updateUserMutation = useUpdateUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user?.email,
            username: user?.username,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { username } = values;

        updateUserMutation.mutate({
            userId: user!._id,
            updates: { username },
        });
    }

    return (
        <section className='my-6'>
            <article
                className='p-3 lg:p-4
rounded-lg border border-gray-100'>
                <h2 className='mb-4 text-xl font-bold md:text-2xl'>Profile</h2>

                <Form {...form}>
                    {updateUserMutation.isError && (
                        <p className='text-red-500 my-4 text-center capitalize'>
                            {updateUserMutation.error.message}!
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
                                            placeholder='John@mail.com'
                                            type='email'
                                            disabled
                                            className='cursor-not-allowed'
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
                                            placeholder='John'
                                            type='text'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className='flex justify-end'>
                            <StyledButton
                                type='submit'
                                disabled={updateUserMutation.isPending}
                                variant={"todoOps"}>
                                {updateUserMutation.isPending
                                    ? "Updating Profile..."
                                    : "Update Profile"}
                            </StyledButton>
                        </p>
                    </form>
                </Form>
            </article>
        </section>
    );
}

export default UpdateUserForm;
