import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icon untuk toggle visibility

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk mengatur visibility password
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Masuk dengan <span className="text-red-500">akun</span> kamu
        </h1>
      </div>
      <div className="">
        <form onSubmit={onSubmit}>
          {/* Input Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          {/* Input Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} // Kondisional berdasarkan state visibility
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              {/* tombol untuk menghilangkan password */}
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-zinc-100 text-sky-400 rounded-lg hover:bg-sky-800 font-bold"
          >
            MASUK
          </button>
        </form>
      </div>

      {/* Link ke halaman register */}
      <p className="mt-2 text-end text-white">
        Belum memiliki akun?
        <Link
          className="font-medium ml-1 text-red-500 hover:underline"
          to="/auth/register"
        >
          Daftar
        </Link>
      </p>
 {/* gimik */}
      {/* Tombol login dengan Facebook dan Google */}
      <div className="space-y-2 mt-4">
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2">
          <i className="md:size-auto">
            <FaFacebook />
          </i>
          <span>Masuk dengan Facebook</span>
        </button>
        <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 border">
          <i className="md:size-auto">
            <FcGoogle />
          </i>
          <span>Masuk dengan Google</span>
        </button>
      </div>
    </div>
  );
}

export default AuthLogin;
