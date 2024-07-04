import Image from 'next/image';
import Logo from '@/images/Logo-upe-site.png';

export default function Banner() {
  return (
    <div className="bg-white w-full h-[90px] flex items-center justify-between px-4 shadow-bottom">
      <Image src={Logo} alt="Logo-UPE" width={100} height={50} priority={true} />
      <div className="flex items-center">
        Saúde dos servidores UPE
      </div>

      
    </div>
  );
}
