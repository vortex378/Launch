const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const texts = [
  "Practice makes perfect. Keep typing to improve speed.",
  "Typing tests help you become more accurate.",
  "Speed and accuracy are key to efficient typing."
];

let startTime, timer;
let currentText = "";

function startTest() {
  clearInterval(timer);
  textInput.value = "";
  currentText = texts[Math.floor(Math.random() * texts.length)];
  textDisplay.textContent = currentText;
  timeDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  startTime = null;

  textInput.disabled = false;
  textInput.focus();

  timer = setInterval(() => {
    if (startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timeDisplay.textContent = elapsed;
    }
  }, 1000);
}

textInput.addEventListener("input", () => {
  if (!startTime) startTime = Date.now();

  const typedText = textInput.value;
  const elapsedTime = (Date.now() - startTime) / 1000 / 60; // minutes

  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsedTime);
  wpmDisplay.textContent = wpm;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) correctChars++;
  }

  const accuracy = Math.round((correctChars / typedText.length) * 100);
  accuracyDisplay.textContent = accuracy;

  if (typedText === currentText) {
    clearInterval(timer);
    textInput.disabled = true;
  }
});

startTest(); // Auto start on load
