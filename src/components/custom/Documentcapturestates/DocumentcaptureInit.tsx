import { useState } from "react";
import { Button } from "../../ui/button";
import UploadCIN from "../../../services/UploadCIN";

export default function DocumentcaptureInit({
  proceed,
}: {
  proceed: (step: number) => void;
}) {
  const [isready, setisready] = useState<boolean>(true);

  const handlescan = async () => {
    const res = await UploadCIN();
    if (typeof res == "boolean") {
      setisready(res ? true : false);
      proceed(res ? 1 : 2);
    }
  };

  return (
    <div className="sm:w-150 flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a]">
          Insertion de la photo
        </h2>
      </div>

      <div className="flex flex-row gap-5 relative overflow-hidden">
        <div className="h-64 w-full object-cover sm:h-72 bg-primary text-white rounded-lg border border-[#e4e4e7]">
          Recto
        </div>
        <div className="h-64 w-full object-cover sm:h-72 bg-primary text-white rounded-lg border border-[#e4e4e7]">
          Verso
        </div>
      </div>

      <div className="flex flex-row items-center justify-center">
        <Button
          className="h-12.75
        min-w-34
        rounded-xl
        bg-primary
        px-6
        text-[15px]
        font-semibold
        text-white
        hover:bg-primary"
          disabled={isready ? false : true}
          onClick={handlescan}
        >
          Scanner
        </Button>
      </div>
    </div>
  );
}
