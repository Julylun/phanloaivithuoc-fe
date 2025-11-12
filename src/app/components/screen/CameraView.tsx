import Image from "next/image";
import TestImage from "../../../assets/test/test.jpg"
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Source_Code_Pro } from "next/font/google";
import Favicon from '../../favicon.ico'


type CameraProps = {
    screenName: string,
    image: any 
};

export default function CameraView({ screenName, image }: CameraProps) {
    console.log('image value:', image, 'type:', typeof image); // Debug: Kiểm tra image
    console.log('Favicon:', Favicon); // Debug: Kiểm tra Favicon (nên là object StaticImport, không phải "")

    // Validate và build source an toàn
    let source: string | null = null;
    if (image && typeof image === 'string' && image.trim() !== '') {
        source = 'data:image/jpeg;base64,' + image.trim();
    }

    const imgSrc = source || Favicon; // Hoặc source || null nếu không fallback

    return (
        <div className="w-4/9 h-3/4 flex flex-col md:h-2/5 md:w-9/12 lg:w-4/9 lg:h-3/5">
            <div className="h-5">
                <p className="text-black">{screenName}</p>
            </div>
            <div className="flex-1 flex justify-center items-center bg-black">
                {/* Conditional render: Chỉ render nếu có src valid */}
                {imgSrc ? (
                    <Image 
                        width={300} 
                        height={200} // Thêm height để tránh layout shift (Next.js yêu cầu)
                        className="w-full h-full object-cover" // object-cover để fit
                        src={imgSrc} 
                        alt={screenName || "Camera view"} // Alt tốt hơn "abc"
                        priority={false} // Nếu không phải above-fold
                    />
                ) : (
                    // Placeholder nếu không có image: Div rỗng hoặc spinner
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No image available
                    </div>
                )}
            </div>
        </div>
    );
}