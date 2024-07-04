import Image from "next/image";
import Logo from "@/images/Logo-upe-site.png";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";

export default function Banner({ onclick }) {
  return (
    <div className="bg-white w-full h-[90px] flex items-center justify-between px-4 shadow-md">
      <section className=" flex flex-row items-center gap-2">
        <button onClick={onclick}>
          <DensityMediumOutlinedIcon className="text-blue-700"/>
        </button>
        <Image
          src={Logo}
          alt="Logo-UPE"
          width={100}
          height={50}
          priority={true}
        />
      </section>
      <div className="flex items-center font-sans text-red-500">Saúde dos servidores UPE</div>
    </div>
  );
}
