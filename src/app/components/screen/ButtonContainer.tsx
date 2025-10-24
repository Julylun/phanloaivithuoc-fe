import RectangleButton, { RectangleButtonColor } from "./RectangleButton";

const __function = () => {}
export default function ButonContainer() {
    return (
        <div className="h-12 bg-color1 flex flex-row justify-around items-center shadow-sm md:h-12">
            <RectangleButton name="Start" _function={__function} color={RectangleButtonColor.GREEN}/>
            <RectangleButton name="Stop" _function={__function} color={RectangleButtonColor.RED}/>
            <RectangleButton name="Reset" _function={__function} color={RectangleButtonColor.ORANGE}/>
            <RectangleButton name="Export" _function={__function} color={RectangleButtonColor.BLUE}/>
            {/* <p>Button Container</p> */}
        </div>
   );
}
