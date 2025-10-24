import RectangleButton from "./RectangleButton";

export default function ButonContainer() {
    return (
        <div className="h-12 bg-color1 flex flex-row justify-around items-center shadow-sm md:h-12">
            <RectangleButton/>
            <RectangleButton/>
            <RectangleButton/>
            <RectangleButton/>

            {/* <p>Button Container</p> */}
        </div>
   );
}
