const entryScreen = document.querySelector("#entryScreen");
const openButton = document.querySelector("#openInvitation");
const musicToggle = document.querySelector("#musicToggle");
const backgroundMusic = document.querySelector("#backgroundMusic");
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxlGOv1RnK7xu76RklxP_xR2nq6B2PQpdDCf8pFyvw68-CvyuUeAvhVsgUHyC2RJ1AXOQ/exec";
let musicPlaying = false;
let currentLanguage = "en";

const translations = {
  en: {
    entryNote: "A LITTLE NOTE FROM US", openInvitation: "Open your invitation", entryFootnote: "A LITTLE MUSIC IS WAITING INSIDE",
    mainNavigation: "Main navigation", navStory: "Our story", navDay: "The day", navGallery: "Gallery", navRsvp: "RSVP", chooseLanguage: "Choose language",
    playMusic: "Play background music", pauseMusic: "Pause background music", retryMusic: "Retry background music", musicOn: "Music on", musicOff: "Music off", musicUnavailable: "Music unavailable",
    heroImageAlt: "Romeo and Juliet together", heroFamilies: "TOGETHER WITH OUR FAMILIES", heroInvite: "joyfully invite you to celebrate their wedding", heroDate: "TUESDAY, THE TWELFTH OF JANUARY", heroYear: "TWO THOUSAND AND TWENTY-SEVEN · COLOMBO, SRI LANKA", heroCta: "COME CELEBRATE WITH US", heroSideNote: "A DAY TO REMEMBER",
    storyKicker: "A NOTE FROM THE TWO OF US", storyEyebrow: "HOW IT ALL BEGAN", storyTitle: "Every good story<br>has a <em>first chapter.</em>", storyCopy: "We met at university, where a beautiful friendship slowly grew into love. After sharing many memories and supporting each other through life’s journey, our love has now brought us to this special day.", signature: "With love, Romeo & Juliet", storyImageAlt: "Romeo and Juliet walking together outdoors", storyCaption: "A little more in love, every day.",
    detailsKicker: "SAVE THE DATE", detailsTitle: "The day, <em>together.</em>", detailsIntro: "One lovely day. All our favourite people.", dateLabel: "THE DATE", weekday: "Tuesday", dateValue: "12 January 2027", timeLabel: "THE TIME", timeValue: "Half past two", guestArrival: "Guests from 2:00 PM", placeLabel: "THE PLACE", directions: "GET DIRECTIONS",
    countdownEyebrow: "THE DAYS ARE GETTING CLOSER", countdownTitle: "Until we say<br><em>“I do.”</em>", countdownLabel: "Countdown to the wedding", days: "DAYS", hours: "HOURS", minutes: "MINUTES", seconds: "SECONDS",
    scheduleKicker: "THE CELEBRATION", scheduleTitle: "A day full of <em>lovely things.</em>", scheduleIntro: "Tuesday, 12 January · The Cinnamon Lakeside", doorsTitle: "Doors open", doorsCopy: "Find your seat, say hello, and enjoy a little something to sip.", ceremonyTitle: "The ceremony", ceremonyCopy: "We make it official, surrounded by our favourite people.", drinksTitle: "Drinks & garden strolls", drinksCopy: "Raise a glass, wander a while, and let us steal you for a photo.", dinnerTitle: "Dinner & dancing", dinnerCopy: "Good food, heartfelt toasts, and a dance floor waiting for you.",
    galleryKicker: "LITTLE MOMENTS, BIG LOVE", galleryTitle: "Us, <em>lately.</em>", galleryIntro: "A few favourite frames from our story so far.", galleryImageOne: "A joyful wedding-day embrace", galleryImageTwo: "A quiet moment during a wedding ceremony", galleryImageThree: "A couple celebrating together", galleryCaptionOne: "THE BEGINNING OF FOREVER", galleryCaptionTwo: "JUST THE TWO OF US", galleryCaptionThree: "OUR KIND OF HAPPY",
    locationKicker: "FIND YOUR WAY", locationTitle: "Meet us in<br><em>the garden.</em>", mapTitle: "Map showing The Cinnamon Lakeside, Colombo",
    rsvpKicker: "WE HOPE YOU CAN MAKE IT", rsvpDeadline: "KINDLY REPLY BY 20 NOVEMBER 2026", rsvpTitle: "Will you join<br><em>our story?</em>", rsvpIntro: "Your presence would mean the world to us. Please let us know by 20 November.", yourName: "YOUR NAME", namePlaceholder: "As it appears on your invitation", willAttend: "WILL YOU BE THERE?", accepts: "HAPPILY ACCEPTS", declines: "REGRETFULLY DECLINES", guestCountLabel: "NUMBER OF GUESTS", justMe: "Just me", twoGuests: "Two guests", dietaryLabel: "DIETARY NOTES", optional: "(OPTIONAL)", dietaryPlaceholder: "Anything we should know?", sendRsvp: "SEND OUR RSVP",
    songEyebrow: "ONE LITTLE QUESTION", songTitle: "Have a song for <em>the dance floor?</em>", songLabel: "Song suggestion", songPlaceholder: "Artist · Song title", sendSong: "Send song suggestion", shareEyebrow: "CAN'T KEEP A GOOD THING TO YOURSELF", shareTitle: "Pass the <em>love along.</em>", shareWhatsapp: "SHARE ON WHATSAPP", copyLink: "COPY INVITATION LINK", backToTop: "Back to top", footerLove: "WITH ALL OUR LOVE, ROMEO & JULIET",
    sheetsMissing: "Google Sheets is not connected yet. Add the Apps Script web app URL in script.js.", sendingRsvp: "Sending your RSVP...", acceptedOne: " We have you down for one guest.", acceptedMany: " We have you down for {count} guests.", declined: " We will miss you and send our love.", rsvpSent: "Thank you, {name}! Your RSVP has been sent.", rsvpFailed: "We couldn't send your RSVP. Please check your connection and try again.", sendingSong: "Sending your song suggestion...", songAdded: "Lovely choice! “{song}” has been added to our request list.", songFailed: "We couldn't send your song suggestion. Please check your connection and try again.", linkCopied: "Invitation link copied.", copyUnavailable: "Copy is unavailable here. You can copy the page address from your browser.",
    whatsappText: "Join Romeo & Juliet for their wedding on 12 January 2027 at Cinnamon Lakeside Colombo!"
  },
  si: {
    entryNote: "අපෙන් පුංචි පණිවිඩයක්", openInvitation: "ඔබේ ආරාධනා පත්‍රය විවෘත කරන්න", entryFootnote: "ඇතුළත ඔබ වෙනුවෙන් පුංචි සංගීතයක් තියෙනවා",
    mainNavigation: "ප්‍රධාන මෙනුව", navStory: "අපේ කතාව", navDay: "මංගල දිනය", navGallery: "ඡායාරූප", navRsvp: "පැමිණීම දන්වන්න", chooseLanguage: "භාෂාව තෝරන්න",
    playMusic: "පසුබිම් සංගීතය වාදනය කරන්න", pauseMusic: "පසුබිම් සංගීතය නවත්වන්න", retryMusic: "සංගීතය නැවත වාදනය කරන්න", musicOn: "සංගීතය ක්‍රියාත්මකයි", musicOff: "සංගීතය අක්‍රියයි", musicUnavailable: "සංගීතය ලබාගත නොහැක",
    heroImageAlt: "එකට සිටින රෝමියෝ සහ ජුලියට්", heroFamilies: "අපේ පවුල් සමඟ එක්ව", heroInvite: "අපගේ විවාහ මංගල්‍යය සමරන්න ඔබට සෙනෙහසින් ආරාධනා කරමු", heroDate: "ජනවාරි දොළොස්වන අඟහරුවාදා", heroYear: "දෙදහස් විසි හත · කොළඹ, ශ්‍රී ලංකාව", heroCta: "අප සමඟ සතුට බෙදාගන්න", heroSideNote: "මතකයේ රැඳෙන දවසක්",
    storyKicker: "අප දෙදෙනාගෙන් පුංචි සටහනක්", storyEyebrow: "අපේ කතාව ඇරඹුණු හැටි", storyTitle: "හැම ලස්සන කතාවකම<br><em>පළමු පරිච්ඡේදයක් ඇත.</em>", storyCopy: "විශ්වවිද්‍යාලයේදී හමු වූ අප දෙදෙනාගේ සුන්දර මිත්‍රත්වය කෙමෙන් ආදරයක් බවට පත් වුණා. ජීවිතයේ බොහෝ මතක බෙදාගෙන, එකිනෙකාට ශක්තියක් වෙමින් ආ ගමන අපව අද මේ විශේෂ දවසට රැගෙන ආවා.", signature: "ආදරයෙන්, රෝමියෝ සහ ජුලියට්", storyImageAlt: "එළිමහනේ එකට ඇවිදින රෝමියෝ සහ ජුලියට්", storyCaption: "දවසින් දවස තවත් ආදරයෙන්.",
    detailsKicker: "දිනය වෙන් කරගන්න", detailsTitle: "අපේ දවස, <em>එකට.</em>", detailsIntro: "ලස්සන දවසක්. අපේ ආදරණීයයන් සමඟ.", dateLabel: "දිනය", weekday: "අඟහරුවාදා", dateValue: "2027 ජනවාරි 12", timeLabel: "වේලාව", timeValue: "ප.ව. 2.30ට", guestArrival: "අමුත්තන්ගේ පැමිණීම ප.ව. 2.00 සිට", placeLabel: "ස්ථානය", directions: "ගමන් මඟ බලන්න",
    countdownEyebrow: "දවස ටිකෙන් ටික ළං වෙනවා", countdownTitle: "අපි <em>“ඔව්”</em><br>කියන තුරු.", countdownLabel: "විවාහ මංගල්‍යයට ඉතිරි කාලය", days: "දින", hours: "පැය", minutes: "මිනිත්තු", seconds: "තත්පර",
    scheduleKicker: "උත්සවයේ වැඩසටහන", scheduleTitle: "සතුටින් පිරුණු <em>දවසක්.</em>", scheduleIntro: "ජනවාරි 12 අඟහරුවාදා · සිනමන් ලේක්සයිඩ්", doorsTitle: "අමුත්තන් පිළිගැනීම", doorsCopy: "ඔබේ අසුන සොයාගෙන, අප සමඟ සුහදව කතාබහ කරමින් පානයක රස බලන්න.", ceremonyTitle: "විවාහ මංගල්‍යය", ceremonyCopy: "අපේ ආදරණීයයන් මැද අපගේ ආදර කතාවට නිල මුද්‍රාව තබන මොහොත.", drinksTitle: "පානයක් සහ උද්‍යාන සවාරියක්", drinksCopy: "අප සමඟ වීදුරුවක් ඔසවා, මඳක් ඇවිද, සිහිවටන ඡායාරූපයකට එක්වන්න.", dinnerTitle: "රාත්‍රී භෝජනය සහ නර්තනය", dinnerCopy: "රසවත් ආහාර, සෙනෙහෙබර සුබපැතුම් සහ ඔබ එනතුරු බලා සිටින නර්තන තලයක්.",
    galleryKicker: "පුංචි මොහොතවල්, ලොකු ආදරයක්", galleryTitle: "අපේ <em>මතක.</em>", galleryIntro: "අපේ ආදර කතාවේ ප්‍රියතම මතක කිහිපයක්.", galleryImageOne: "විවාහ දිනයේ සතුටින් වැළඳගන්නා යුවළ", galleryImageTwo: "විවාහ උත්සවයේ නිහඬ ආදරණීය මොහොතක්", galleryImageThree: "එකට සතුට සමරන යුවළ", galleryCaptionOne: "සදාකාලික ආදරයේ ඇරඹුම", galleryCaptionTwo: "අප දෙදෙනා පමණක්", galleryCaptionThree: "අපේ සතුටේ හැටි",
    locationKicker: "ඔබ එන මඟ", locationTitle: "උද්‍යානයේදී<br><em>හමුවෙමු.</em>", mapTitle: "කොළඹ සිනමන් ලේක්සයිඩ් සිතියම",
    rsvpKicker: "ඔබ පැමිණෙනු ඇතැයි අපි බලාපොරොත්තු වෙමු", rsvpDeadline: "කරුණාකර 2026 නොවැම්බර් 20ට පෙර පිළිතුරු දෙන්න", rsvpTitle: "අපේ කතාවට<br><em>එකතු වෙනවාද?</em>", rsvpIntro: "ඔබේ පැමිණීම අපට මහත් සතුටක්. නොවැම්බර් 20ට පෙර ඔබේ පැමිණීම දන්වන්න.", yourName: "ඔබේ නම", namePlaceholder: "ආරාධනා පත්‍රයේ සඳහන් නම", willAttend: "ඔබ පැමිණෙනවාද?", accepts: "සතුටින් පැමිණෙමි", declines: "කනගාටුවෙන් පැමිණිය නොහැක", guestCountLabel: "අමුත්තන් ගණන", justMe: "මා පමණයි", twoGuests: "දෙනෙක්", dietaryLabel: "ආහාර සීමා", optional: "(අත්‍යවශ්‍ය නැත)", dietaryPlaceholder: "අප දැනගත යුතු යමක් තිබේද?", sendRsvp: "පැමිණීම තහවුරු කරන්න",
    songEyebrow: "පුංචි ප්‍රශ්නයක්", songTitle: "නර්තන තලයට <em>ගීතයක් යෝජනා කරනවාද?</em>", songLabel: "ගීත යෝජනාව", songPlaceholder: "ගායකයා · ගීතයේ නම", sendSong: "ගීත යෝජනාව යවන්න", shareEyebrow: "මේ සතුට ඔබේ ආදරණීයයන් සමඟත් බෙදාගන්න", shareTitle: "ආදරය <em>බෙදාගන්න.</em>", shareWhatsapp: "WHATSAPP හරහා බෙදාගන්න", copyLink: "ආරාධනා සබැඳිය පිටපත් කරන්න", backToTop: "පිටුවේ ඉහළට", footerLove: "ආදරයෙන්, රෝමියෝ සහ ජුලියට්",
    sheetsMissing: "Google Sheets සම්බන්ධ කර නැත. script.js ගොනුවට Apps Script web app URL එක එක් කරන්න.", sendingRsvp: "ඔබේ පිළිතුර යවමින්...", acceptedOne: " ඔබගේ පැමිණීම එක් අයෙකු ලෙස සටහන් කළා.", acceptedMany: " ඔබගේ පැමිණීම අමුත්තන් {count} දෙනෙකු ලෙස සටහන් කළා.", declined: "ඔබ නැති අඩුව දැනේවි. අපේ ආදරය පිළිගන්න.", rsvpSent: "ස්තුතියි, {name}! ඔබේ පිළිතුර ලැබුණා.", rsvpFailed: "ඔබේ පිළිතුර යැවීමට නොහැකි වුණා. සම්බන්ධතාව පරීක්ෂා කර නැවත උත්සාහ කරන්න.", sendingSong: "ඔබේ ගීත යෝජනාව යවමින්...", songAdded: "ලස්සන තේරීමක්! “{song}” ගීතය අපේ යෝජනා ලැයිස්තුවට එක් කළා.", songFailed: "ගීත යෝජනාව යැවීමට නොහැකි වුණා. සම්බන්ධතාව පරීක්ෂා කර නැවත උත්සාහ කරන්න.", linkCopied: "ආරාධනා සබැඳිය පිටපත් කළා.", copyUnavailable: "මෙහිදී පිටපත් කළ නොහැක. බ්‍රවුසරයේ ලිපින තීරුවෙන් පිටපත් කරන්න.",
    whatsappText: "2027 ජනවාරි 12 වන දින කොළඹ සිනමන් ලේක්සයිඩ්හි පැවැත්වෙන රෝමියෝ සහ ජුලියට්ගේ විවාහ මංගල්‍යයට එක්වන්න!"
  }
};

function translate(key, values = {}) {
  return Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, value), translations[currentLanguage][key]);
}

function updateMusicLabels() {
  const label = musicPlaying ? "musicOn" : "musicOff";
  const ariaLabel = musicPlaying ? "pauseMusic" : "playMusic";
  musicToggle.querySelector(".music-label").textContent = translate(label);
  musicToggle.setAttribute("aria-label", translate(ariaLabel));
}

function updateWhatsappLink() {
  const shareText = `${translate("whatsappText")} ${window.location.href}`;
  document.querySelector("#whatsappShare").href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
}

function setLanguage(language) {
  currentLanguage = language === "si" ? "si" : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dataset.language = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = translate(element.dataset.i18nAlt);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = translate(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.languageOption === currentLanguage));
  });

  updateMusicLabels();
  updateWhatsappLink();
  try {
    localStorage.setItem("invitation-language", currentLanguage);
  } catch {
    // Language selection still works for this visit if storage is unavailable.
  }
}

try {
  currentLanguage = localStorage.getItem("invitation-language") === "si" ? "si" : "en";
} catch {
  currentLanguage = "en";
}
document.querySelectorAll("[data-language-option]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageOption));
});
setLanguage(currentLanguage);

async function startMusic() {
  try {
    await backgroundMusic.play();
    musicPlaying = true;
    musicToggle.setAttribute("aria-pressed", "true");
    updateMusicLabels();
  } catch {
    musicPlaying = false;
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", translate("retryMusic"));
    musicToggle.querySelector(".music-label").textContent = translate("musicUnavailable");
  }
}

function stopMusic() {
  musicPlaying = false;
  backgroundMusic.pause();
  musicToggle.setAttribute("aria-pressed", "false");
  updateMusicLabels();
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
    message.textContent = translate("sheetsMissing");
    return;
  }

  const form = new FormData(formElement);
  const rsvp = {
    name: form.get("name").trim(),
    mobile: form.get("mobile").trim(),
    attendance: form.get("attendance"),
    guests: form.get("guests"),
    dietary: form.get("dietary").trim(),
  };
  const submitButton = formElement.querySelector("button[type=submit]");
  submitButton.disabled = true;
  message.textContent = translate("sendingRsvp");

  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(rsvp),
    });
    const guestText = rsvp.attendance === "joyfully accepts"
      ? rsvp.guests === "1" ? translate("acceptedOne") : translate("acceptedMany", { count: rsvp.guests })
      : translate("declined");
    message.textContent = `${translate("rsvpSent", { name: rsvp.name })}${guestText}`;
    formElement.reset();
  } catch {
    message.textContent = translate("rsvpFailed");
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const song = new FormData(event.currentTarget).get("song").trim();
  const formElement = event.currentTarget;
  const message = document.querySelector("#feedbackMessage");
  const submitButton = formElement.querySelector("button[type=submit]");
  if (!RSVP_ENDPOINT) {
    message.textContent = translate("sheetsMissing");
    return;
  }

  submitButton.disabled = true;
  message.textContent = translate("sendingSong");
  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ type: "song", song }),
    });
    message.textContent = translate("songAdded", { song });
    formElement.reset();
  } catch {
    message.textContent = translate("songFailed");
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#copyLink").addEventListener("click", async () => {
  const message = document.querySelector("#shareMessage");
  try {
    await navigator.clipboard.writeText(window.location.href);
    message.textContent = translate("linkCopied");
  } catch {
    message.textContent = translate("copyUnavailable");
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