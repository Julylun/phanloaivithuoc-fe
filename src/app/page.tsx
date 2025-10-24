"use client";


import Footer from "./components/footer/_Footer";
import Header from "./components/header/_Header";
import InformationView from "./components/informationView/InformationView";
import ButtonContainer from "./components/screen/ButtonContainer";
import CameraContainer from "./components/screen/CameraContainer";
import CameraView from "./components/screen/CameraView";

export default function Home() { //component
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col bg-color1 md:flex-row">
        <div className="h-1/2 w-full min-h-1/2 shadow-inner shadow-gray-500/80 flex flex-col bg-color1 md:h-full md:w-3/5 lg:w-4/6">
          <CameraContainer/>
          <ButtonContainer/>
        </div>
        <InformationView/>
      </div>
      <Footer />
    </div>
  );
}
