const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8xdK90ZS8CtoqbmkS5KGtUda6o3aZVVI6Ucj5aA30UEaamtxIXWyvAM6Xq_XRtsSO8A/exec";

const form = document.querySelector(".enquiry-form");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

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

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    alert("Thank you! Your enquiry has been submitted.\nReference ID: " + result.leadId);

    form.reset();

  });

}