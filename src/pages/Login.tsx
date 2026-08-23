import { Shield } from "lucide-react";
import Loginform from "../components/custom/form/Loginform";
import { Label } from "../components/ui/label";

export default function Login() {
  return (
    <div className="flex flex-row min-h-screen w-full">
      <div className="hidden w-1/2 bg-[url('/assets/background_auth.jpg')] bg-cover bg-center sm:flex flex-col">
        <div className="m-5 p-5">
          <div className="flex flex-row gap-2 items-center mb-5">
            <Shield className="text-primary"></Shield>
            <Label className="text-primary text-2xl">Enrolment App</Label>
          </div>
          <div className="w-2/3 flex flex-row items-center text-left mt-5">
            <Label className="text-md text-slate-600">
              Secure biometric and demographic data capture portal. Restricted
              to authorized government agents.
            </Label>
          </div>
        </div>

        <div className="m-5 p-5 mt-auto">
          <div className="flex flex-row text-primary text-sm gap-2">
            <Shield></Shield>
            <Label>End-to-End Encrypted Session</Label>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex flex-col items-center text-center justify-center bg-[#F8F9FA]">
        <Loginform></Loginform>
        <div className="mt-auto mb-5">
          <Label className="text-slate-400">
            © 2024 National Identity Systems. Restricted Government Access.
          </Label>
        </div>
      </div>
    </div>
  );
}
