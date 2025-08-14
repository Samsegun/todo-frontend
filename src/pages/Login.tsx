function Login() {
    return (
        <section>
            <form>
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
    );
}

export default Login;
