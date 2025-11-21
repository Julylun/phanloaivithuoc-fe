"use client";

import { useState } from "react";
import { DetectionAPI } from "../../services/api/api_services";

type ExportType = "day" | "month" | "year";

export default function ExportForm() {
    const [exportType, setExportType] = useState<ExportType>("day");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [isExporting, setIsExporting] = useState<boolean>(false);

    const handleExport = async () => {
        let dateParam = "";
        
        if (exportType === "day") {
            if (!selectedDate) {
                alert("Vui lòng chọn ngày");
                return;
            }
            dateParam = selectedDate;
        } else if (exportType === "month") {
            if (!selectedMonth) {
                alert("Vui lòng chọn tháng");
                return;
            }
            dateParam = selectedMonth;
        } else if (exportType === "year") {
            if (!selectedYear) {
                alert("Vui lòng chọn năm");
                return;
            }
            dateParam = selectedYear;
        }

        setIsExporting(true);
        try {
            await DetectionAPI.exportDetection(dateParam, exportType);
        } catch (error) {
            console.error("Export error:", error);
            alert("Có lỗi xảy ra khi xuất dữ liệu");
        } finally {
            setIsExporting(false);
        }
    };

    // Tạo danh sách năm (từ 2020 đến năm hiện tại)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

    return (
        <div className="w-full max-w-md bg-color2 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Xuất dữ liệu</h2>
            
            {/* Chọn loại export */}
            <div className="mb-6">
                <label className="block text-black font-semibold mb-2">Chọn loại xuất:</label>
                <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="day"
                            checked={exportType === "day"}
                            onChange={(e) => {
                                setExportType(e.target.value as ExportType);
                                setSelectedDate("");
                            }}
                            className="mr-2"
                        />
                        <span className="text-black">Theo ngày</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="month"
                            checked={exportType === "month"}
                            onChange={(e) => {
                                setExportType(e.target.value as ExportType);
                                setSelectedMonth("");
                            }}
                            className="mr-2"
                        />
                        <span className="text-black">Theo tháng</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="year"
                            checked={exportType === "year"}
                            onChange={(e) => {
                                setExportType(e.target.value as ExportType);
                                setSelectedYear("");
                            }}
                            className="mr-2"
                        />
                        <span className="text-black">Theo năm</span>
                    </label>
                </div>
            </div>

            {/* Date picker cho ngày */}
            {exportType === "day" && (
                <div className="mb-6">
                    <label className="block text-black font-semibold mb-2">Chọn ngày:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>
            )}

            {/* Month picker cho tháng */}
            {exportType === "month" && (
                <div className="mb-6">
                    <label className="block text-black font-semibold mb-2">Chọn tháng:</label>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        max={`${currentYear}-12`}
                    />
                </div>
            )}

            {/* Year picker cho năm */}
            {exportType === "year" && (
                <div className="mb-6">
                    <label className="block text-black font-semibold mb-2">Chọn năm:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                    >
                        <option value="">-- Chọn năm --</option>
                        {years.map((year) => (
                            <option key={year} value={year.toString()}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Nút Export và Cancel */}
            <div className="flex gap-4">
                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex-1 bg-[#04579f] text-white py-2 px-4 rounded font-semibold hover:bg-[#034080] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isExporting ? "Đang xuất..." : "Xuất dữ liệu"}
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="flex-1 bg-gray-400 text-white py-2 px-4 rounded font-semibold hover:bg-gray-500"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
}

