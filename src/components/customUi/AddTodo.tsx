import { useCreateTodo } from "@/hooks/useTodos";
import useProfileStore from "@/store/userProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMenuModalContext } from "./Menu";
import StyledButton from "./StyledButton";

const formSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .max(1000, "Description must be less than 1000 characters")
        .optional(),
});

function AddTodo() {
    const createTodoMutation = useCreateTodo();
    const { closeMenu } = useMenuModalContext();

    const { user } = useProfileStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, description } = values;

        try {
            await createTodoMutation.mutateAsync({
                creator: user!._id,
                title,
                description,
            });
            closeMenu();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            {createTodoMutation.isError && (
                <p className='text-red-500 my-4 text-center capitalize'>
                    {createTodoMutation.error.message}!
                </p>
            )}

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 px-4 py-2'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xl'>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter todo title'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xl'>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Enter todo description'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <p className='flex justify-end gap-2'>
                    <StyledButton
                        type='submit'
                        disabled={createTodoMutation.isPending}
                        variant={"todoOps"}>
                        {createTodoMutation.isPending
                            ? "Creating Todo..."
                            : "Create Todo"}
                    </StyledButton>

                    <StyledButton
                        type='button'
                        variant={"destructive"}
                        onClick={closeMenu}>
                        Cancel
                    </StyledButton>
                </p>
            </form>
        </Form>
    );
}

export default AddTodo;
