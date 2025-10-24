import Image from "next/image";
import TestImage from "../../../assets/test/test.jpg"


type CameraProps = {
    screenName: string;
};
export default function CameraView({screenName}: CameraProps) {
    return (
        <div className="w-4/9 h-3/4  flex flex-col md:h-2/5 md:w-9/12 lg:w-4/9 lg:h-3/5">
            <div className="h-5 ">
                <p className=" text-black">{screenName}</p>
            </div>
            <div className="flex-1 flex justify-center items-center bg-black">
                <Image src={TestImage} alt=""/>
            </div>
        </div>
    );
}
