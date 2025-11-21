"use client";

import { useRouter } from "next/navigation";
import RectangleButton, { RectangleButtonColor } from "./RectangleButton";
import {DetectionAPI} from '../../services/api/api_services'

const __function = () => {}
export default function ButonContainer() {
    const router = useRouter();

    const handleExport = () => {
        router.push("/export");
    };

    return (
        <div className="h-12 bg-color1 flex flex-row justify-around items-center shadow-sm md:h-12">
            <RectangleButton name="Start" _function={DetectionAPI.startDetection} color={RectangleButtonColor.GREEN}/>
            <RectangleButton name="Stop" _function={DetectionAPI.stopDetection} color={RectangleButtonColor.RED}/>
            <RectangleButton name="Reset" _function={DetectionAPI.resetData} color={RectangleButtonColor.ORANGE}/>
            <RectangleButton name="Export" _function={handleExport} color={RectangleButtonColor.BLUE}/>
            {/* <p>Button Container</p> */}
        </div>
   );
}
