"use client";

import { useEffect, useState } from "react";
import SplitLine from "../SplitLine";
import InformationTitle from "./InformationTitle";
import ProductStatus, { ProductStatusEnum } from "./ProductStatus";
import StatisticBar, { StatisticBarColor } from "./StatisticBar";
import StatusBar, { StatusBarColor } from "./StatusBar";

type SignalData = {
  camera: boolean;
  plc: boolean;
  conveyor: boolean;
  sensor_1: boolean;
  sensor_2: boolean;
  count_normal_pills: number;
  count_error_pills: number;
  last_result: number;
};

export default function InformationView() {
  const [camera, setCamera] = useState<boolean>(false);
  const [plc, setPlc] = useState<boolean>(false);
  const [conveyor, setConveyor] = useState<boolean>(false);
  const [sensor1, setSensor1] = useState<boolean>(false);
  const [sensor2, setSensor2] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [countErrorPills, setCountErrorPills] = useState<number>(0);
  const [countNormalPills, setCountNormalPills] = useState<number>(0);
  const [lastResult, setLastResult] = useState<number>(-1);

  const setAllStatusToRed = () => {
    setCamera(false);
    setPlc(false);
    setConveyor(false);
    setSensor1(false);
    setSensor2(false);
    setCountErrorPills(0);
    setCountNormalPills(0);
    setLastResult(-1);
  };

  useEffect(() => {
    const wsUrl = "ws://127.0.0.1:8000/ws/signal";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Signal WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data: SignalData = JSON.parse(event.data);
        setCamera(data.camera);
        setPlc(data.plc);
        setConveyor(data.conveyor);
        setSensor1(data.sensor_1);
        setSensor2(data.sensor_2);
        setCountErrorPills(data.count_error_pills);
        setCountNormalPills(data.count_normal_pills);
        setLastResult(data.last_result);
      } catch (err) {
        console.error("Error parsing signal data:", err);
      }
    };

    socket.onclose = () => {
      console.log("Signal WebSocket disconnected");
      setIsConnected(false);
      setAllStatusToRed();
    };

    socket.onerror = (err) => {
      console.error("Signal WebSocket error:", err);
      setIsConnected(false);
      setAllStatusToRed();
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-color1">
      <InformationTitle />

      <div className="flex-1 flex flex-col items-center pt-8 gap-8 overflow-y-auto">
        <div className="h-fit gap-3 w-full flex flex-col items-center">
          <StatusBar
            name={"Camera: "}
            color={
              isConnected && camera ? StatusBarColor.GREEN : StatusBarColor.RED
            }
          />
          <StatusBar
            name={"PLC: "}
            color={
              isConnected && plc ? StatusBarColor.GREEN : StatusBarColor.RED
            }
          />
          <StatusBar
            name={"Conveyor: "}
            color={
              isConnected && conveyor
                ? StatusBarColor.GREEN
                : StatusBarColor.RED
            }
          />
          <StatusBar
            name={"Sensor 1: "}
            color={
              isConnected && sensor1 ? StatusBarColor.GREEN : StatusBarColor.RED
            }
          />
          <StatusBar
            name={"Sensor 2: "}
            color={
              isConnected && sensor2 ? StatusBarColor.GREEN : StatusBarColor.RED
            }
          />
        </div>

        <SplitLine />

        <div className="flex flex-row flex-wrap gap-5 px-3 justify-center w-full">
          <StatisticBar
            name={"Normal tablet strips"}
            value={countNormalPills}
            color={StatisticBarColor.GREEN}
          />
          {/* <StatisticBar name={'Missing pills'} value={100} color={StatisticBarColor.YELLOW}/> */}
          <StatisticBar
            name={"Error tablet strips"}
            value={countErrorPills}
            color={StatisticBarColor.RED}
          />
          <SplitLine />
          <StatisticBar
            name={"Total tablet strips"}
            value={countErrorPills + countNormalPills}
            color={StatisticBarColor.SECRET}
          />
        </div>

        {/* <SplitLine/> */}

        <ProductStatus status={lastResult as ProductStatusEnum} />
      </div>
    </div>
  );
}
