const entryScreen = document.querySelector("#entryScreen");
const openButton = document.querySelector("#openInvitation");
const musicToggle = document.querySelector("#musicToggle");
const backgroundMusic = document.querySelector("#backgroundMusic");
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxlGOv1RnK7xu76RklxP_xR2nq6B2PQpdDCf8pFyvw68-CvyuUeAvhVsgUHyC2RJ1AXOQ/exec";
let musicPlaying = false;

async function startMusic() {
  try {
    await backgroundMusic.play();
    musicPlaying = true;
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.setAttribute("aria-label", "Pause background music");
    musicToggle.querySelector(".music-label").textContent = "Music on";
  } catch {
    musicPlaying = false;
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Retry background music");
    musicToggle.querySelector(".music-label").textContent = "Music unavailable";
  }
}

function stopMusic() {
  musicPlaying = false;
  backgroundMusic.pause();
  musicToggle.setAttribute("aria-pressed", "false");
  musicToggle.setAttribute("aria-label", "Play background music");
  musicToggle.querySelector(".music-label").textContent = "Music off";
}

openButton.addEventListener("click", async () => {
  entryScreen.classList.add("is-open");
  document.querySelector(".hero").classList.add("celebrating");
  window.setTimeout(() => document.querySelector(".hero").classList.remove("celebrating"), 2200);
  await startMusic();
});

musicToggle.addEventListener("click", () => {
  if (musicPlaying) stopMusic();
  else startMusic();
});

const weddingDate = new Date("2027-01-12T14:30:00+05:30").getTime();
const countdownParts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const seconds = Math.floor(remaining / 1000);
  countdownParts.days.textContent = String(Math.floor(seconds / 86400)).padStart(3, "0");
  countdownParts.hours.textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
  countdownParts.minutes.textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  countdownParts.seconds.textContent = String(seconds % 60).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelector("#rsvpForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const message = document.querySelector("#rsvpMessage");
  if (!RSVP_ENDPOINT) {
    message.textContent = "Google Sheets is not connected yet. Add the Apps Script web app URL in script.js.";
    return;
  }

  const form = new FormData(formElement);
  const rsvp = {
    name: form.get("name").trim(),
    attendance: form.get("attendance"),
    guests: form.get("guests"),
    dietary: form.get("dietary").trim(),
  };
  const submitButton = formElement.querySelector("button[type=submit]");
  submitButton.disabled = true;
  message.textContent = "Sending your RSVP...";

  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(rsvp),
    });
    const guestText = rsvp.attendance === "joyfully accepts" ? ` We have you down for ${rsvp.guests} guest${rsvp.guests === "1" ? "" : "s"}.` : " We will miss you and send our love.";
    message.textContent = `Thank you, ${rsvp.name}! Your RSVP has been sent.${guestText}`;
    formElement.reset();
  } catch {
    message.textContent = "We couldn't send your RSVP. Please check your connection and try again.";
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#feedbackForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const song = new FormData(event.currentTarget).get("song").trim();
  document.querySelector("#feedbackMessage").textContent = `Lovely choice! “${song}” has been added to our request list.`;
  event.currentTarget.reset();
});

const shareText = "Join Anuruddhe & Chethana for their wedding on 12 January 2027 at Cinnamon Lakeside Colombo!";
const whatsappLink = document.querySelector("#whatsappShare");
whatsappLink.href = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.href}`)}`;

document.querySelector("#copyLink").addEventListener("click", async () => {
  const message = document.querySelector("#shareMessage");
  try {
    await navigator.clipboard.writeText(window.location.href);
    message.textContent = "Invitation link copied.";
  } catch {
    message.textContent = "Copy is unavailable here. You can copy the page address from your browser.";
  }
});

const scrollProgress = document.querySelector("#scrollProgress");
const backToTop = document.querySelector("#backToTop");
let scrollFrame = 0;

function updateScrollControls() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
  backToTop.classList.toggle("is-visible", window.scrollY > 650);
  scrollFrame = 0;
}

window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollControls);
}, { passive: true });
window.addEventListener("resize", updateScrollControls);
updateScrollControls();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.documentElement.classList.add("motion-ready");
const revealTargets = document.querySelectorAll(
  ".story-content, .story-photo, .details-heading, .detail-item, .directions-link, .countdown-intro, .countdown-grid, .schedule-heading, .timeline article, .gallery-heading, .gallery-grid figure, .location-copy, .map-frame, .rsvp-intro, .rsvp-form, .feedback-inner, .share"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}