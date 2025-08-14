import { z } from "zod";

import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";

const formSchema = z.object({
    email: z.email("Invalid email format"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be less than 20 characters"),
    password: z.string().min(3, "password must be at least 3 characters"),
});

function Register() {
    return (
        <PageWrapper>
            <PageHeader>Create an Account</PageHeader>

            <section className='bg-amber-500 mt-8'>
                <form className='bg-black'>
                    <div>
                        <label htmlFor='email'>Email or Username</label>
                        <input type='text' id='email' />
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' />
                    </div>
                </form>
            </section>
        </PageWrapper>
    );
}

export default Register;
