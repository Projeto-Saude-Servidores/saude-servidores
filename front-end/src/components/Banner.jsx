import Image from "next/image";
import Logo from "@/images/Logo-upe-site.png";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import Hamburger from "hamburger-react";
import { useState } from "react";
export default function Banner({ onclick }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="bg-white w-full bg-opacity-95 h-[90px] flex items-center justify-between px-4 shadow-md fixed top-0 left-0 z-50">
      <section className="flex flex-row items-center gap-2">
        <button onClick={onclick}>
          <Hamburger
            toggled={isOpen}
            color={isOpen ? "#d62728" : "#1f77b4"}
            toggle={setOpen}
          />
        </button>
        <Image
          src={Logo}
          alt="Logo-UPE"
          width={100}
          height={50}
          priority={true}
        />
      </section>

      <div className="flex items-center font-sans text-red-500">
        Saúde dos servidores UPE
      </div>
    </div>
  );
}
