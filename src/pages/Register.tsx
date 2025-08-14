import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";

function Register() {
    return (
        <PageWrapper>
            <PageHeader>Create an Account</PageHeader>

            <section className='bg-amber-500 min-h-[80vh]'>
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
