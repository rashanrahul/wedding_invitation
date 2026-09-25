const entryScreen = document.querySelector("#entryScreen");
const openButton = document.querySelector("#openInvitation");
const musicToggle = document.querySelector("#musicToggle");
const backgroundMusic = document.querySelector("#backgroundMusic");
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
  await startMusic();
});

musicToggle.addEventListener("click", () => {
  if (musicPlaying) stopMusic();
  else startMusic();
});

const weddingDate = new Date("2027-06-12T14:30:00+01:00").getTime();
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

document.querySelector("#rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const attendance = form.get("attendance");
  const guests = form.get("guests");
  const guestText = attendance === "joyfully accepts" ? ` We have you down for ${guests} guest${guests === "1" ? "" : "s"}.` : " We will miss you and send our love.";
  document.querySelector("#rsvpMessage").textContent = `Thank you, ${name}! Your reply has been noted.${guestText}`;
  event.currentTarget.reset();
});

document.querySelector("#feedbackForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const song = new FormData(event.currentTarget).get("song").trim();
  document.querySelector("#feedbackMessage").textContent = `Lovely choice! “${song}” has been added to our request list.`;
  event.currentTarget.reset();
});

const shareText = "Join Olivia & James for their wedding on 12 June 2027 at The Orangery, Kew Gardens!";
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