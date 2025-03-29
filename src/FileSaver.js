import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { autoTable} from "jspdf-autotable";

function exportToCSV(devices) {
    if (!devices || devices.length === 0) {
        console.error("No data available for export.");
        return;
    }

    const csvContent = [
        ["Model", "Vendor", "OS", "OS Version", "Browser"],
        ...devices.map((device) => [
            device.model,
            device.vendor,
            device.osName,
            device.osVersion,
            device.browserName,
        ]),
    ]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "devices.csv");
}

function exportToPDF(devices) {
    if (!devices || devices.length === 0) {
        console.error("No data available for export.");
        return;
    }

    const doc = new jsPDF();
    doc.text("Devices Information", 10, 10);

    // Table Headers
    const headers = [["Model", "Vendor", "OS", "OS Version", "Browser"]];
    const data = devices.map((device) => [
        device.model,
        device.vendor,
        device.osName,
        device.osVersion,
        device.browserName,
    ]);

    autoTable(doc,{
        head: headers,
        body: data,
    });

    doc.save("devices.pdf");
}

export { exportToCSV, exportToPDF };
