export default function StatusBar() {
    return (
        <div className="flex flex-row w-2/3 p-2 bg-color2 shadow-[inset_0px_0px_5px_2px_rgba(0,0,0,0.1)] justify-between items-center">
            <p className="text-black font-extrabold">Status 1</p>
            <div className="flex justify-center items-center size-8 shadow-sm bg-color3">
                <div className="h-3/4 w-3/4 bg-[#0EDB37] shadow-sm rounded-full"></div>
            </div>
        </div>
    );
}
