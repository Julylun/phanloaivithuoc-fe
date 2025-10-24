import Image from "next/image";
import Logo from '../../../assets/logo.png'

export default function Header() { 
  return (
    <div className="bg-color1 flex gap-4 flex-row pt-2 pl-2 pb-2 h-20 drop-shadow-sm">
        <div className="flex w-fit gap-2">
          <Image src={Logo} alt="University logo" className="size-15 rounded-full"/>
          <div className="flex flex-col justify-center font-bold text-black text-start h-14">
            <p className="">ĐẠI HỌC ĐÀ NẴNG</p>
            <p className="">TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT</p>
          </div>
        </div>
        <div className="hidden flex-1 justify-center items-center md:flex md:flex-col">
          <p className="uppercase text-center text-black font-bold">đồ án tốt nghiệp</p>
          <p className="uppercase text-center text-xl font-bold text-red-400">Hệ thống kiểm tra lỗi vỉ thuốc sử dụng mô hình Yolo v8</p>
        </div>
    </div>
 );
}
