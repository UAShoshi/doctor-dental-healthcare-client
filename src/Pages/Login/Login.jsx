import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import uthentication1 from "../../assets/author/images1.png"
import Swal from "sweetalert2";



const Login = () => {

  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);

         // users.json থেকে user information নেওয়া
        fetch("/data/users.json")
          .then(res => res.json())
          .then(users => {

            // Login করা email দিয়ে user খুঁজবে
            const currentUser = users.find(
              item => item.email === user.email
            );

            console.log("Current User:", currentUser);

            // User পাওয়া না গেলে
            if (!currentUser) {
              Swal.fire({
                title: "User information not found!",
                icon: "error",
              });

              return;
            }

            Swal.fire({
              title: "User login successful!",
              icon: "success",
              draggable: true
            });

            // Role অনুযায়ী Dashboard এ পাঠাবে
            if (currentUser.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }

          });
      })
      .catch(error => {
        console.log(error);

        Swal.fire({
          title: "Login failed!",
          text: error.message,
          icon: "error",
        });
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={uthentication1} alt="" />
          </div>
          <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <h2 className="text-[26px] font-semibold">Login</h2>
              <p className="font-semibold pb-5">Please login to book appointment</p>
              <fieldset className="fieldset">
                <label className="label font-semibold">Email</label>
                <input type="email" name="email" className="input" placeholder="" />
                <label className="label font-semibold">Password</label>
                <input type="password" name="password" className="input" placeholder="" />
                <input className="btn btn-neutral font-bold bg-[#5F6FFF] mt-4" type="submit" value="login" />
              </fieldset>
            </form>
            <p className="text-center pb-10">New here? <Link to="/signup"
              className="text-[#5F6FFF] underline">Create account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;