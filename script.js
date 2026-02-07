const surprises = [
  {
    day: 7,
    name: "Rose Day",
    pass: "ROSE123",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200",
    code: "while(love) {\n  rose.bloom();\n  fragrance.spread();\n}",
    msg: "🌹 A digital rose for the one who makes every day bloom with happiness.",
  },
  {
    day: 8,
    name: "Propose Day",
    pass: "MINE2026",
    img: "https://images.unsplash.com/photo-1516589174184-c6852661448c?w=1200",
    code: "if (heart.ask() === 'Yes') {\n  happiness++;\n  future = 'Together';\n}",
    msg: "💍 I don't need a UI to see how beautiful our future is. Will you stay in my heart?",
  },
  {
    day: 9,
    name: "Chocolate Day",
    pass: "SWEETIE",
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200",
    code: "love.energy = 'Infinite';\nlove.mood = 'Extra Sweet';",
    msg: "🍫 Sweeter than the finest cocoa and warmer than a hot chocolate on a winter night.",
  },
  {
    day: 10,
    name: "Teddy Day",
    pass: "HUGME",
    img: "https://images.unsplash.com/photo-1559440666-4477c282495b?w=1200",
    code: "import warm_hug;\nmy_heart.wrap(teddy_hug);",
    msg: "🧸 Sending you a soft, fluffy digital teddy to hold until I'm there to hold you.",
  },
  {
    day: 11,
    name: "Promise Day",
    pass: "FOREVER",
    img: "https://images.unsplash.com/photo-1531323385177-2e23e7bf7c1b?w=1200",
    code: "promise.always((love) => {\n  stay(forever);\n  yield heart;\n});",
    msg: "🤝 I promise to be your debugger in life and your partner in every adventure.",
  },
  {
    day: 12,
    name: "Hug Day",
    pass: "SQUEEZE",
    img: "https://images.unsplash.com/photo-1516728775854-95867ff17464?w=1200",
    code: "body.merge(you_heart);\nreturn 'Peace and Comfort';",
    msg: "🫂 A digital squeeze for my favorite human. You are my safe place.",
  },
  {
    day: 13,
    name: "Kiss Day",
    pass: "SMOOCH",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200",
    code: "love.seal('💋');\n// Verified by Eternal Heart",
    msg: "💋 Sending a million digital kisses to the one who owns my heart.",
  },
  {
    day: 14,
    name: "Valentine's Day",
    pass: "MYLOVE",
    img: "https://images.unsplash.com/photo-1518107616385-ad3089197f0e?w=1200",
    code: "Error 404: Words Not Found.\nJust pure, unadulterated love. ❤️",
    msg: "💝 Happy Valentine's Day! You are the best thing that ever happened to me.",
  },
];

function init() {
  const timeline = document.getElementById("timeline");
  const now = new Date();

  surprises.forEach((s, index) => {
    // Current Year 2026, Month 1 (February)
    const targetDate = new Date(2026, 1, s.day);
    const isLocked = now < targetDate;

    const card = document.createElement("div");
    card.className = `day-card ${isLocked ? "locked" : ""}`;
    card.id = `card-${index}`;

    let content = `<h3>Feb ${s.day}</h3><p>${s.name}</p>`;

    if (isLocked) {
      content += `<div class="timer" id="timer-${index}"></div>`;
      startCountdown(targetDate, `timer-${index}`);
    } else {
      content += `
        <div class="pass-area" id="pass-area-${index}">
          <input type="text" class="pass-input" id="input-${index}" placeholder="Secret Code">
          <br>
          <button class="pass-btn" onclick="verify('${index}')">Unlock</button>
        </div>
      `;
      // Clicking the card reveals the password input
      card.onclick = (e) => {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
          showPassField(index);
        }
      };
    }

    card.innerHTML = content;
    timeline.appendChild(card);
  });
}

function showPassField(index) {
  // Hide other open password fields
  document
    .querySelectorAll(".pass-area")
    .forEach((el) => (el.style.display = "none"));
  // Show the clicked one
  document.getElementById(`pass-area-${index}`).style.display = "block";
}

function verify(index) {
  const input = document.getElementById(`input-${index}`);
  const card = document.getElementById(`card-${index}`);
  const s = surprises[index];

  if (input.value.trim().toUpperCase() === s.pass) {
    openSurprise(s);
  } else {
    card.classList.add("error-shake");
    input.style.borderColor = "red";
    setTimeout(() => {
      card.classList.remove("error-shake");
    }, 300);
  }
}

function openSurprise(s) {
  document.body.style.backgroundImage = `url('${s.img}')`;
  document.getElementById("overlay").style.background = "rgba(0,0,0,0.5)";
  document.getElementById("main-header").style.display = "none";
  document.getElementById("timeline").style.display = "none";

  const display = document.getElementById("surprise-display");
  display.style.display = "block";
  document.getElementById("surprise-title").innerText = s.name;
  document.getElementById("surprise-content").innerText = s.msg;
  document.getElementById("love-code-block").innerText = s.code;
}

function closeSurprise() {
  document.body.style.backgroundImage = "none";
  document.getElementById("overlay").style.background =
    "rgba(255, 240, 243, 0.85)";
  document.getElementById("main-header").style.display = "block";
  document.getElementById("timeline").style.display = "grid";
  document.getElementById("surprise-display").style.display = "none";
}

function startCountdown(date, id) {
  setInterval(() => {
    const diff = date - new Date();
    const el = document.getElementById(id);
    if (!el) return;
    if (diff <= 0) {
      el.innerText = "Available Now!";
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerText = `${h}h ${m}m ${s}s`;
  }, 1000);
}

// Start the app
init();
