import Image from "next/image";
import TestImage from "../../../assets/test/test.jpg"

export default function CameraView() {
    return (
        <div className="w-4/9 h-3/4 bg-red-500 flex flex-col md:h-2/5 md:w-9/12 lg:w-4/9 lg:h-3/5">
            <div className="h-5 bg-pink-400">
                <p className="bg-pink-800 text-black">Screen 1</p>
            </div>
            <div className="flex-1 flex justify-center items-center bg-black">
                <Image src={TestImage} alt=""/>
            </div>
        </div>
    );
}
