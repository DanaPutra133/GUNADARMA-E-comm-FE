import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-white w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          //buat ganti bar side logo
          <h1 className="text-4xl text-black font-extrabold tracking-tight">
            <img src="https://api.betabotz.eu.org/api/tools/get-upload?id=f/64e3beki.jpg"></img>
            ganti logo nya
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-blue-400 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
