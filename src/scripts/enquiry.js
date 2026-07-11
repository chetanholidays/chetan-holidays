const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx8xdK90ZS8CtoqbmkS5KGtUda6o3aZVVI6Ucj5aA30UEaamtxIXWyvAM6Xq_XRtsSO8A/exec";

/* -------------------------
   PDF MODAL
------------------------- */

const pdfModal = document.getElementById("pdfModal");
const openPdfBtn = document.getElementById("downloadPdfBtn");
const closePdfBtn = document.getElementById("closePdfModal");

if (openPdfBtn && pdfModal) {

  openPdfBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pdfModal.classList.add("active");
  });

}

if (closePdfBtn && pdfModal) {

  closePdfBtn.addEventListener("click", () => {
    pdfModal.classList.remove("active");
  });

}

window.addEventListener("click", (e) => {

  if (e.target === pdfModal) {
    pdfModal.classList.remove("active");
  }

});

/* -------------------------
   NORMAL ENQUIRY FORM
------------------------- */

const enquiryForm = document.querySelector(".enquiry-form");

if (enquiryForm) {

  enquiryForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(enquiryForm);

    const data = {
      source: "Website Enquiry",
      tour: "Kashmir Family Tour",
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      adults: formData.get("adults"),
      children: formData.get("children"),
      departure: formData.get("departure"),
      message: formData.get("message")
    };

    try {

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });

      alert("Thank you! Your enquiry has been submitted.");

      enquiryForm.reset();

    } catch (err) {

      console.error(err);

      alert("Unable to submit enquiry.");

    }

  });

}

/* -------------------------
   PDF DOWNLOAD FORM
------------------------- */

const pdfForm = document.getElementById("pdfLeadForm");

if (pdfForm) {

  pdfForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const button = document.getElementById("downloadPdfSubmit");

    button.disabled = true;
    button.textContent = "Preparing PDF...";

    const formData = new FormData(pdfForm);

    const data = {
      source: "PDF Download",
      tour: formData.get("tour"),
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      city: formData.get("city")
    };

    try {

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });

      pdfForm.reset();

      pdfModal.classList.remove("active");

      alert("Thank you! Your itinerary is ready.");

      setTimeout(() => {

        window.print();

      }, 500);

    } catch (err) {

      console.error(err);

      alert("Unable to generate itinerary.");

    }

    button.disabled = false;
    button.textContent = "Download Itinerary PDF";

  });

}