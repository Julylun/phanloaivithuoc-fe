"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ExportForm from "../components/export/ExportForm";

export default function ExportPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-color1 p-4">
            <ExportForm />
        </div>
    );
}

