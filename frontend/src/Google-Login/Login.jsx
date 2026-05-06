import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const roleRedirects = {
  tenant: "/",
  landlord: "/dashboard/landlord",
  admin: "/dashboard/admin",
};

const getRoleFromPath = (pathname) => {
  const role = pathname.split("/").pop();
  if (role === "admin") return "admin";
  return role === "landlord" ? "landlord" : "tenant";
};

const Login = () => {
  const location = useLocation();
  const role = getRoleFromPath(location.pathname);
  const [mode, setMode] = useState("signup");

  const redirectUrl = roleRedirects[role];
  const unsafeMetadata = useMemo(() => ({ role }), [role]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 py-10"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <SignedIn>
        <Navigate to={redirectUrl} replace />
      </SignedIn>

      <SignedOut>
        <div className="relative w-full max-w-md flex flex-col items-center gap-4">
          <div className="flex w-full rounded-lg bg-white p-1 shadow">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition ${
                mode === "signin"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sign in
            </button>
          </div>

          {mode === "signup" ? (
            <SignUp
              unsafeMetadata={unsafeMetadata}
              forceRedirectUrl={redirectUrl}
              signInUrl={`/login/${role}`}
              signInForceRedirectUrl={redirectUrl}
            />
          ) : (
            <SignIn
              forceRedirectUrl={redirectUrl}
              signUpUrl={`/login/${role}`}
              signUpForceRedirectUrl={redirectUrl}
            />
          )}
        </div>
      </SignedOut>
    </div>
  );
};

export default Login;
