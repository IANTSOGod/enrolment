import { ArrowRight, Eye, EyeOff, Fingerprint, IdCard } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";

export default function Loginform() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="flex sm:w-105 flex-col px-6 py-6 my-auto mx-auto sm:border-2 rounded-[6px] sm:bg-white">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Agent Authentication
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Sign in to National Identity Systems
        </p>
      </div>

      <form onSubmit={handlesubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Agent ID"
          className="h-9 rounded-none border-slate-400 text-xs"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Passcode"
            className="h-9 rounded-none border-slate-400 pr-10 text-xs"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-start gap-2 rounded-sm border border-slate-200 bg-slate-100 px-2 py-2.5">
          <span className="mt-0.5 text-[10px] text-primary">▣</span>

          <p className="text-[9px] leading-3.5 text-slate-600">
            MFA Token will be requested upon successful credential verification.
            Ensure your hardware key is connected.
          </p>
        </div>

        <Button
          type="submit"
          className="h-9 w-full rounded-md bg-primary text-xs hover:bg-[#151b65] text-secondary"
        >
          Login to System
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </form>

      <div className="my-5 flex items-center gap-2">
        <Separator className="flex-1" />

        <span className="whitespace-nowrap text-[9px] font-medium tracking-wider text-slate-400">
          ALTERNATIVE METHODS
        </span>

        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-md border-slate-400 text-[10px] text-primary"
        >
          <IdCard className="h-3.5 w-3.5" />
          Badge Scan
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-md border-slate-400 text-[10px] text-primary"
        >
          <Fingerprint className="h-3.5 w-3.5" />
          Biometrics
        </Button>
      </div>

      <div className="mt-7 text-center">
        <button
          type="button"
          className="text-[9px] font-medium text-primary hover:underline"
        >
          Forgot Agent ID or Passcode?
        </button>
      </div>
    </div>
  );
}
