import { useEffect, useRef, useState } from "react";
import CameraView, { CameraViewRef } from "./CameraView";

interface StreamData {
  image: string,
//   rawImage: string; // base64 cho real-time (không detections)
//   detectedImage: string; // base64 cho detected (với bbox)
  detections: any[]; // Optional: detections data nếu cần overlay JS
}

export default function CameraContainer() {
const realtimeRef = useRef<CameraViewRef>(null);
    const detectedRef = useRef<CameraViewRef>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState("Đang kết nối..."); // Bắt đầu với status kết nối

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
        if (!data.image) {
          console.warn("No image in payload:", data);
          return; // Skip nếu không có image
        }
        // Update hai view
        if (realtimeRef.current) {
            realtimeRef.current.updateImage(data.image);
        }
        if (detectedRef.current) {
            detectedRef.current.updateImage(data.image);
        }
        console.log(`Received frame with ${data.detections.length} detections`);
        } catch (err) {
        console.error("Lỗi parse message:", err);
        }
    };

    socket.onclose = () => {
        setStatus("Đã ngắt kết nối.");
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

    // Tự động connect khi component mount
    useEffect(() => {
    connect();

    // Cleanup khi unmount hoặc reconnect nếu cần
    return () => {
        if (ws) ws.close();
    };
    }, []); // [] để chạy chỉ một lần khi mount
    return (
        <div className="flex-1 flex flex-row justify-center items-center gap-4 md:gap-2 md:flex-col lg:gap-2 xl:flex-row">
            <CameraView screenName={"Real-time camera"} ref={realtimeRef}/>
            <CameraView screenName={"Dectected camera"} ref={detectedRef}/>
        </div>
    );
}
