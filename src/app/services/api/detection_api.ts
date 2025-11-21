const api = 'http://localhost:8000/detection/'

export const startDetection = async () => {
    await fetch(api + 'start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})});
}

export const stopDetection = async () => {
    await fetch(api + 'stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})}
    );
}
export const exportDetection = async (date: string, type: string = "day") => {
    const url = new URL(`${api}export`);
    url.searchParams.append("date", date);
    url.searchParams.append("type", type);

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Export failed: ${response.statusText}`);
        }

        // Lấy blob từ response
        const blob = await response.blob();
        
        // Tạo URL tạm thời và download file
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        
        // Lấy filename từ Content-Disposition header hoặc tạo tên mặc định
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = `detection_${date}.xlsx`;
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch) {
                filename = filenameMatch[1];
            }
        }
        
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Export error:", error);
        throw error;
    }
}
export const resetData = () => {

}
