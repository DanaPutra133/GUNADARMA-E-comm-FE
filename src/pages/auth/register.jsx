import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"; // Icon untuk toggle visibility
import { FcGoogle } from "react-icons/fc";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk mengatur visibility password
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-white">
          Buat <span className="text-red-500">Akun</span>
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        {/* Input Nama Pengguna */}
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-white"
          >
            Nama Pengguna
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>

        {/* Input Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>

        {/* Input Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"} // Kondisional berdasarkan state visibility
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {/* Tombol untuk toggle password visibility */}
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
          className="w-full py-2 px-4 bg-zinc-100 text-sky-400 rounded-lg hover:bg-sky-700 font-bold"
        >
          Daftar
        </button>
      </form>

      {/* Link ke Login */}
      <p className="mt-2 text-end text-white">
        Sudah memiliki akun?
        <Link
          className="font-medium ml-1 text-red-500 hover:underline"
          to="/auth/login"
        >
          Masuk
        </Link>
      </p>
 {/* gimik */}
      {/* Tombol Registrasi dengan Media Sosial */}
      <div className="space-y-2 mt-4">
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2">
          <FaFacebook />
          <span>Daftar dengan Facebook</span>
        </button>
        <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 border">
          <FcGoogle />
          <span>Daftar dengan Google</span>
        </button>
      </div>
    </div>
  );
}

export default AuthRegister;
