import { useEffect, useRef, useState } from "react";
import CameraViewStream, { CameraViewRef } from "./CameraViewStream";
import CameraView from "./CameraView";

interface StreamData {
  image: string,
//   rawImage: string; // base64 cho real-time (không detections)
//   detectedImage: string; // base64 cho detected (với bbox)
  detections: any[]; // Optional: detections data nếu cần overlay JS
}

interface DetectedResultData {
    class_number: number | null,
    detected_image: string | null
}
const getDetectedResult = async (): Promise<DetectedResultData> => {
    let rawResult = await fetch('http://localhost:8000/detection/get-result')
    // console.log(await rawResult.json())
    return  (rawResult.ok) ? (await rawResult.json()) : {'class_number': null, 'detected_image': null}
}

export default function CameraContainer() {
    const realtimeRef = useRef<CameraViewRef>(null);
    const detectedRef = useRef<CameraViewRef>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState("Đang kết nối..."); // Bắt đầu với status kết nối
    const [detectedImage, setDetectedImage] = useState<string | null>(null)

    const refreshDetectedImage = async () => {
        let result = await getDetectedResult();
        console.log('detected: ' + result.detected_image)
        setDetectedImage((result.detected_image) ? result.detected_image : null)
    }

    const wsUrl = "ws://127.0.0.1:8000/ws/video-stream"; // Khớp endpoint backend

    const connect = () => {
    const socket = new WebSocket(wsUrl);
    setWs(socket);

    socket.onopen = () => {
        setStatus("Kết nối thành công! Đang stream...");
        setIsConnected(true);
    };

    socket.onmessage = (event) => {
        try {
            const data: StreamData = JSON.parse(event.data);
            // console.log(data)
        if (!data.image) {
          console.warn("No image in payload:", data);
          return; // Skip nếu không có image
        }
        // Update hai view
        if (realtimeRef.current) {
            realtimeRef.current.updateImage(data.image);
        }
        console.log(`Received frame with ${data.detections.length} detections`);
        } catch (err) {
        console.error("Lỗi parse message:", err);
        }
    };

    socket.onclose = () => {
        setStatus("Đã ngắt kết nối.");
        console.log('disconnected')
        setIsConnected(false);
    };

    socket.onerror = (err) => {
        setStatus("Lỗi kết nối: "  + err || "Unknown error");
        console.error(err);
    };
    };

    const disconnect = () => {
    if (ws) {
        ws.close();
        setWs(null);
    }
        setStatus("Đã ngắt.");
        setIsConnected(false);
    };

    useEffect(() => {
        connect();
        setInterval(refreshDetectedImage, 2000)
        return () => {
         if (ws) ws.close();
        };
    }, []); // [] để chạy chỉ một lần khi mount
    
    return (
        <div className="flex-1 flex flex-row justify-center items-center gap-4 md:gap-2 md:flex-col lg:gap-2 xl:flex-row">
            <CameraViewStream screenName={"Real-time camera"} ref={realtimeRef}/>
            <CameraView screenName={"Detected camera"} image={detectedImage} />
        </div>
    );
}
