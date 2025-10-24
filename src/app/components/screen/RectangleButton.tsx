export enum RectangleButtonColor {
    GREEN, RED, ORANGE, BLUE
}

type RectangleProps = {
    name: string;
    _function: () => void;
    color: RectangleButtonColor
};

export default function RectangleButton({name, _function, color}: RectangleProps) {
    return (
        <button onClick={_function} className={`w-20 h-9 bg-[#61c134] shadow cursor-pointer ${(color == RectangleButtonColor.GREEN) ? 'bg-[#61c134]' : (color == RectangleButtonColor.RED) ? 'bg-[#da2d2d]' : (color == RectangleButtonColor.ORANGE)? 'bg-[#e18c2a]' : 'bg-[#04579f]'}`}>
            <p>{name}</p>
        </button>
    )
}

