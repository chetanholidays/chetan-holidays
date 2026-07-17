import { generateTourPDF } from "../utils/generatePdf.js";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx8xdK90ZS8CtoqbmkS5KGtUda6o3aZVVI6Ucj5aA30UEaamtxIXWyvAM6Xq_XRtsSO8A/exec";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pdfModal");
  const openBtn = document.getElementById("downloadPdfBtn");
  const closeBtn = document.getElementById("closePdfModal");
  const form = document.getElementById("pdfLeadForm");

  if (!modal || !openBtn || !closeBtn || !form) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
      source: "PDF Download",
      tour: formData.get("tour"),
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      city: formData.get("city"),
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    });

    generateTourPDF(`${data.tour}.pdf`);

    form.reset();
    modal.classList.remove("active");
  });
});