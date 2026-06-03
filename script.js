const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const freeSpinCount = document.getElementById("freeSpinCount");
const freeBetCount = document.getElementById("freeBetCount");

const useSpinBtn = document.getElementById("useSpinBtn");
const useBetBtn = document.getElementById("useBetBtn");

const prizes = [
  "FREE SPIN",
  "FREE BET",
  "$5 BET",
  "TRY AGAIN",
  "$10 BET",
  "BONUS"
];

let spinning = false;
let currentRotation = 0;
let freeSpins = 0;
let freeBets = 0;

spinBtn.addEventListener("click", spinWheel);

useSpinBtn.addEventListener("click", function () {
  if (freeSpins > 0) {
    freeSpins--;
    updateRewards();
    spinWheel();
  } else {
    result.textContent = "You do not have any free spins!";
  }
});

useBetBtn.addEventListener("click", function () {
  if (freeBets > 0) {
    freeBets--;
    updateRewards();
    result.textContent = "You used a FREE BET!";
  } else {
    result.textContent = "You do not have any free bets!";
  }
});

function spinWheel() {
  if (spinning) {
    return;
  }

  spinning = true;
  result.textContent = "Spinning...";

  const randomPrize = Math.floor(Math.random() * prizes.length);
  const extraRotation = 1800;
  const prizeRotation = randomPrize * 60;

  currentRotation += extraRotation + prizeRotation;

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(function () {
    const prize = prizes[randomPrize];

    if (prize === "FREE SPIN") {
      freeSpins++;
      result.textContent = "You won a FREE SPIN!";
    } else if (prize === "FREE BET") {
      freeBets++;
      result.textContent = "You won a FREE BET!";
    } else {
      result.textContent = "You won: " + prize;
    }

    updateRewards();
    spinning = false;
  }, 4000);
}

function updateRewards() {
  freeSpinCount.textContent = "You have " + freeSpins + " free spins.";
  freeBetCount.textContent = "You have " + freeBets + " free bets.";
}
