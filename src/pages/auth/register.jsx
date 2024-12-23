//bagian regiter

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//sama kek login bang
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

//inisialisasi user untuk daftar
const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
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

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-white">
          Buat <span className="text-red-500">Akun</span>
        </h1>
        {/* di matiin sementara kalau di butuhin baru di nyalain buat kondisi user salah masuk */}
        {/* <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p> */}
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Daftar"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="space-y-2 mt-4">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2">
           {/* //sama ae bang udah */}
            <i className="md:size-auto"><FaFacebook /></i>
              <i className="fab fa-facebook"></i>
              <span>Masuk dengan Facebook</span>
            </button>
            <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 border">
            <i className="md:size-auto"><FcGoogle /></i>
              <i className="fab fa-google text-red-500"></i>
              <span>Masuk dengan Google</span>
            </button>
          </div>
    </div>
    
  );
}

export default AuthRegister;
