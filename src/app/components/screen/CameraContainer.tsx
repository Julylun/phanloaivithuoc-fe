import { useEffect, useRef } from "react";
import CameraView from "./CameraView";

export default function CameraContainer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const socketRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const realtimeVideoRef = useRef<HTMLVideoElement>(null);
    const detectedVideoRef = useRef<HTMLVideoElement>(null);



    useEffect(() => {
        
        const setupCameraStream = async () => {
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Thêm STUN server
            })
            // Thu thập ICE candidates
            pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("ICE candidate:", event.candidate);
                // Có thể gửi candidate này đến server nếu cần
            }};

            pc.onconnectionstatechange = () => {
            console.log("WebRTC connection state:", pc.connectionState);
            if (pc.connectionState === "failed" || pc.connectionState === "closed") {
                console.error("WebRTC connection failed or closed");
            }};

            const stream = await navigator.mediaDevices.getUserMedia({ video:{
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 15, max: 15 },
            }})

            if (realtimeVideoRef.current) realtimeVideoRef.current.srcObject = stream
            if (detectedVideoRef.current) detectedVideoRef.current.srcObject = stream

            stream.getVideoTracks().forEach((track) => {
                console.log("Video track settings:", track.getSettings());
                pc.addTrack(track, stream);
                track.onended = () => {
                    console.log("Video track ended");
            };});

            const offer = await pc.createOffer()
            const sdp = offer.sdp!!.replace(
                /a=fmtp:(\d+) .*/,
                `a=fmtp:$1 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1`
            );
            await pc.setLocalDescription(offer)

            const response = await fetch("http://localhost:8000/webrtc/offer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sdp: sdp, type: offer.type }),
            });
            const answer = await response.json()
            console.log("Answer from server:", answer);
            await pc.setRemoteDescription(answer)
        }
        setupCameraStream()


        const canvas = document.createElement("canvas");
        canvasRef.current = canvas;
    });


    return (
        <div className="flex-1 flex flex-row justify-center items-center gap-4 md:gap-2 md:flex-col lg:gap-2 xl:flex-row">
            <CameraView screenName={"Real-time camera"} ref={realtimeVideoRef}/>
            <CameraView screenName={"Dectected camera"} ref={detectedVideoRef}/>
        </div>
    );
}
