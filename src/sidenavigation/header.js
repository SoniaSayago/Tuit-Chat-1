import Image from 'next/image';
import logoBlanco from '../../../public/assets/logoBlanco.png';

export default function SidenavHeader() {
  return (
    <div className="bg-white flex h-20 items-center justify-center mb-6 sticky top-0 z-10">
        <Image src={logoBlanco} alt="logo" width={200} height={70} />
        <p className="text-center mt-0">Share | Connect | Enjoy</p>

    </div>
  );
}
