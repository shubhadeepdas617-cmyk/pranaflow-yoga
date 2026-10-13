const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const programs = {
  asana: { name: "Asana Practice", price: "₹999", duration: "4 weeks" },
  pranayama: { name: "Pranayama & Kriya", price: "₹1,199", duration: "4 weeks" },
  meditation: { name: "Meditation & Mindfulness", price: "₹799", duration: "3 weeks" },
  karma: { name: "Karma Yoga Philosophy", price: "₹699", duration: "3 weeks" },
  complete: { name: "Complete Yoga Wellness Package", price: "₹2,999", duration: "8 weeks" }
};

const programSelect = document.querySelector("#program");
const selectedName = document.querySelector("#selected-name");
const selectedPrice = document.querySelector("#selected-price");
const statusMessage = document.querySelector("#form-status");

function updateSelectedProgram(key) {
  const program = programs[key];
  if (!program) {
    selectedName.textContent = "Choose a program above";
    selectedPrice.textContent = "—";
    return;
  }
  selectedName.textContent = program.name;
  selectedPrice.textContent = program.price;
  programSelect.value = key;
}

document.querySelectorAll(".enroll-btn").forEach(button => {
  button.addEventListener("click", () => {
    updateSelectedProgram(button.dataset.program);
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector("#name").focus({ preventScroll: true }), 500);
  });
});

programSelect.addEventListener("change", () => updateSelectedProgram(programSelect.value));

document.querySelectorAll(".faq-item > button").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#enrollment-form").addEventListener("submit", event => {
  event.preventDefault();
  statusMessage.textContent = "";
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    statusMessage.textContent = "Please complete the required fields with valid information.";
    return;
  }

  const data = new FormData(form);
  const program = programs[data.get("program")];
  if (!program) {
    statusMessage.textContent = "Please choose a program before submitting.";
    return;
  }

  const subject = encodeURIComponent(`PranaFlow Yoga enrollment request — ${program.name}`);
  const body = encodeURIComponent(
    `Hello PranaFlow Yoga,\n\nI would like to request enrollment.\n\n` +
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n` +
    `Program: ${program.name}\nPrice: ${program.price}\nDuration: ${program.duration}\n` +
    `Preferred schedule: ${data.get("schedule")}\nMessage: ${data.get("message") || "Not provided"}\n\n` +
    `Please contact me with the next steps.`
  );

  // Demo submission: opens the visitor's configured email app. Replace this with a real
  // form service endpoint if you need submissions delivered without an email client.
  statusMessage.textContent = "Your email app should open with the enrollment request. Review it and press Send to submit.";
  window.location.href = `mailto:hello@pranaflow.example?subject=${subject}&body=${body}`;
});
