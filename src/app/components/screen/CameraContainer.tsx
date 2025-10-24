import CameraView from "./CameraView";

export default function CameraContainer() {
    return (
        <div className="flex-1 flex flex-row justify-center items-center gap-4 md:gap-2 md:flex-col lg:gap-2 xl:flex-row">
            <CameraView screenName={"Real-time camera"}/>
            <CameraView screenName={"Dectected camera"}/>
        </div>
    );
}
