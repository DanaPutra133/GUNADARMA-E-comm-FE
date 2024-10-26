import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
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
    <CommonForm
  formControls={loginFormControls}
  buttonText={"LOGIN"}
  formData={formData}
  setFormData={setFormData}
  onSubmit={onSubmit}
/>
</div>
       <p className="mt-2 text-end text-white">
          gak punya akun?
          <Link
            className="font-medium ml-1 text-red-500 hover:underline"
            to="/auth/register"
          >
            daftar
          </Link>
        </p>
        <div className="space-y-2 mt-4">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2">
              <i className="fab fa-facebook"></i>
              <span>Continue with Facebook</span>
            </button>
            <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 border">
              <i className="fab fa-google text-red-500"></i>
              <span>Continue with Google</span>
            </button>
          </div>
    </div>
  );
}

export default AuthLogin;
