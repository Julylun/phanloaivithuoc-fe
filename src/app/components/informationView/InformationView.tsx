import SplitLine from "../SplitLine";
import InformationTitle from "./InformationTitle";
import ProductStatus, { ProductStatusEnum } from "./ProductStatus";
import StatisticBar, { StatisticBarColor } from "./StatisticBar";
import StatusBar, { StatusBarColor } from "./StatusBar";

export default function InformationView() {
    return (
    <div className="flex-1 flex flex-col min-h-0 bg-color1">
        <InformationTitle/>

        <div className="flex-1 flex flex-col items-center pt-8 gap-8 overflow-y-auto">
          <div className="h-fit gap-3 w-full flex flex-col items-center">
            <StatusBar name={"Camera: "} color={StatusBarColor.GREEN}/>
            <StatusBar name={"PLC: "} color={StatusBarColor.GREEN}/>
            <StatusBar name={"Conveyor: "} color={StatusBarColor.RED}/>
            <StatusBar name={"Sensor 1: "} color={StatusBarColor.GREEN}/>
            <StatusBar name={"Sensor 2: "} color={StatusBarColor.GREEN}/>
          </div>

          <SplitLine/>

          <div className="flex flex-row flex-wrap gap-5 px-3 justify-center w-full">
            <StatisticBar name={'Normal tablet strips'} value={100} color={StatisticBarColor.GREEN}/>
            {/* <StatisticBar name={'Missing pills'} value={100} color={StatisticBarColor.YELLOW}/> */}
            <StatisticBar name={'Error tablet strips'} value={100} color={StatisticBarColor.RED}/>
            <SplitLine/>
            <StatisticBar name={'Total tablet strips'} value={200} color={StatisticBarColor.SECRET}/>
          </div>

          {/* <SplitLine/> */}

          <ProductStatus status={ProductStatusEnum.BROKEN_MISSING_CORNER}/>

        </div>
    </div>
    );
}
