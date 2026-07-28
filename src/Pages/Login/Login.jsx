

const Login = () => {
  const handleLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    
  }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src="" alt="" />
          </div>
          <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <h2 className="text-[26px] font-semibold">Create Account</h2>
              <p className="font-semibold pb-5">Please sign up to book appointment</p>
              <fieldset className="fieldset">
                <label className="label font-semibold">Full Name</label>
                <input type="name" name="name" className="input" placeholder="name" />
                <label className="label font-semibold">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />
                <label className="label font-semibold">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <input className="btn btn-neutral mt-4" type="submit" value="login" />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;