import { Link } from "react-router-dom";
import uthentication1 from "../../assets/author/images1.png"
import { useForm } from "react-hook-form";



const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse mt-20">
        <div className="text-center md:w-1/2 lg:text-left ml-10">
          <img src={uthentication1} alt="" />
        </div>
        <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-[26px] font-semibold">Create Account</h2>
            <p className="font-semibold pb-5">Please sign up to book appointment</p>
            <fieldset className="fieldset">
              <label className="label font-semibold">Full Name</label>
              <input type="name" {...register("name", { required: true })} name="name" className="input" placeholder="" />
              {errors.name && <span className="text-red-600 font-semibold">Name is required</span>}
              <label className="label font-semibold">Email</label>
              <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="" />
              {errors.email && <span className="text-red-600 font-semibold">Email is required</span>}
              <label className="label font-semibold">Password</label>
              <input type="password" {...register("password", { required: true, maxLength: 20, minLength: 6 })} name="password" className="input" placeholder="" />
              {errors.password?.type === "required" && (
                <p className="text-red-600 font-semibold">Password is required</p>
              )}
              <input className="btn btn-neutral font-bold bg-[#5F6FFF] mt-4" type="submit" value="Create account" />
            </fieldset>
          </form>
          <p className="text-center pb-10">Already have an account? <Link to="/login"
            className="text-[#5F6FFF] underline"> Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;