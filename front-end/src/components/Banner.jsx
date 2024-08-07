import Image from "next/image";
import Logo from "@/images/Logo-upe-site.png";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import Hamburger from "hamburger-react";
import { useState } from "react";
export default function Banner({ onclick }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="bg-white w-full h-[50px] flex items-center justify-between px-4 shadow-md ">
      <section className="flex flex-row items-center gap-2">
        {/* <button onClick={onclick}>
          <Hamburger
            toggled={isOpen}
            color={isOpen ? "#d62728" : "#1f77b4"}
            toggle={setOpen}
          />
        </button> */}
        <Image
          src={Logo}
          alt="Logo-UPE"
          width={80}
          height={40}
          priority={true}
        />
      </section>

      <div className="flex items-center font-sans text-red-500">
        Saúde dos servidores UPE
      </div>
    </div>
  );
}
