
export enum StatisticBarColor {
    RED, GREEN, YELLOW, SECRET
}

type StatisticBarProps = {
    name: String,
    value: number,
    color: StatisticBarColor
}

export default function StatisticBar({name, value, color}: StatisticBarProps) {
    return (
        <div className="flex flex-row w-fit items-center gap-1 text-black">
            <div className={`size-4 ${(color == StatisticBarColor.GREEN) ? 'bg-green-400' : (color == StatisticBarColor.YELLOW) ? 'bg-amber-200' : (color == StatisticBarColor.SECRET) ? 'bg-cyan-300' : 'bg-red-400'}`}></div>
            <p className="whitespace-nowrap">{name}: {value}</p>
        </div>
    );
}



