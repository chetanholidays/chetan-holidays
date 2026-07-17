import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generateTourPDF(filename = "tour-itinerary.pdf") {
  const element = document.getElementById("pdf-content");

  if (!element) {
    console.error("PDF content not found.");
    return;
  }

  try {
    // Wait for rendering
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Wait for all images inside the PDF template
    const images = element.querySelectorAll("img");

    await Promise.all(
      [...images].map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
console.log("scrollHeight:", element.scrollHeight);
console.log("offsetHeight:", element.offsetHeight);
console.log("clientHeight:", element.clientHeight);
    console.log("scrollHeight:", element.scrollHeight);
console.log("offsetHeight:", element.offsetHeight);
console.log("clientHeight:", element.clientHeight);

const canvas = await html2canvas(element, {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff",
  logging: false,

  width: element.scrollWidth,
  height: element.scrollHeight,

  windowWidth: element.scrollWidth,
  windowHeight: element.scrollHeight
});

    const imgData = canvas.toDataURL("image/jpeg", 1);

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;
    }

    pdf.save(filename);

  } catch (err) {
    console.error("PDF generation failed:", err);
  }
}