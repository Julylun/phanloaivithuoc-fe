
export enum StatusBarColor {
    RED, GREEN
}

type StatusBarProps = {
    name: String;
    color: StatusBarColor
}


export default function StatusBar({name, color = StatusBarColor.GREEN}: StatusBarProps) {
    return (
        <div className="flex flex-row w-2/3 p-2 bg-color2 shadow-[inset_0px_0px_5px_2px_rgba(0,0,0,0.1)] justify-between items-center">
            <p className="text-black font-extrabold">{name}</p>
            <div className="flex justify-center items-center size-8 shadow-sm bg-color3">
                <div className={`h-3/4 w-3/4 shadow-sm rounded-full ${(color == StatusBarColor.GREEN) ? 'bg-[#0EDB37]' : 'bg-[#ed0a0a]'}`}></div>
            </div> 
        </div>
    );
}
