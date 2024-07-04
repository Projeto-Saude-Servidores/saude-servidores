import Image from "next/image";
import Logo from "@/images/Logo-upe-site.png";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";

export default function Banner({ onclick }) {
  return (
    <div className="bg-white w-full h-[90px] flex items-center justify-between   px-4 shadow-bottom">
      <section className=" flex flex-row items-center gap-2">
        <button onClick={onclick}>
          <DensityMediumOutlinedIcon />
        </button>
        <Image
          src={Logo}
          alt="Logo-UPE"
          width={100}
          height={50}
          priority={true}
        />
      </section>
      <div className="flex items-center">Saúde dos servidores UPE</div>
    </div>
  );
}
