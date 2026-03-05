import { useForm } from "react-hook-form";
import { axiosApi } from "../config/axiosApi";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosApi.post("/user/login", data);

      console.log(res.data);
      alert("Login Successful");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              {...register("password", { required: "Password is required" })}
            />
            <p className="text-sm text-red-500 mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
