import { Link } from "react-router-dom";
import uthentication1 from "../../assets/author/images1.png"
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";



const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {createUser} = useContext(AuthContext)

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      
    })
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
              <input type="password" {...register("password", { 
                required: true,
                maxLength: 20, 
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/})} name="password" className="input" placeholder="" />
              {errors.password?.type === "required" && (
                <p className="text-red-600 font-semibold">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 font-semibold">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 font-semibold">Password must be less than 20 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 font-semibold">Password must have one Uppercase, one lowar case, one number and one special character.</p>
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