import SplitLine from "../SplitLine";
import InformationTitle from "./InformationTitle";
import StatisticBar from "./StatisticBar";
import StatusBar from "./StatusBar";

export default function InformationView() {
    return (
    <div className="flex-1 flex flex-col min-h-0 bg-color1">
        <InformationTitle/>

        <div className="flex-1 flex flex-col items-center pt-8 gap-8 overflow-y-auto">
          <div className="h-fit gap-3 w-full flex flex-col items-center">
            <StatusBar/>
            <StatusBar/>
            <StatusBar/>
            <StatusBar/>
          </div>

          <SplitLine/>

          <div className="flex flex-row flex-wrap gap-5 px-3 justify-center w-full">
            <StatisticBar/>
            <StatisticBar/>
            <StatisticBar/>
          </div>

          <SplitLine/>

          <div className="flex flex-row gap-2 justify-center">
            <p className="text-black font-extrabold">Product Status: </p>
            <p className="text-red-500 font-extrabold">Broken</p>
          </div>

        </div>
    </div>
    );
}
