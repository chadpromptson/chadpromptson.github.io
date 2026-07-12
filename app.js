const counter = document.querySelector("#revenue-counter");
const toast = document.querySelector("#toast");
const checkoutButtons = document.querySelectorAll("[data-checkout]");
const copyButtons = document.querySelectorAll("[data-copy-prompt]");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let simulatedRevenue = 1_337_420.69;
let previousTick = performance.now();
let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 3200);
}

function updateRevenue(now) {
  const elapsedSeconds = Math.min((now - previousTick) / 1000, 1);
  const confidenceMultiplier = 1 + Math.abs(Math.sin(now / 1_350)) * 4.2;
  simulatedRevenue += elapsedSeconds * 18_000 * confidenceMultiplier;
  previousTick = now;

  if (counter) {
    counter.textContent = money.format(simulatedRevenue);
  }

  window.requestAnimationFrame(updateRevenue);
}

window.requestAnimationFrame(updateRevenue);

checkoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToast("Imaginary capital accepted. Stripe remains safely in test mode.");
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const prompt = button.closest(".prompt-card")?.querySelector("pre")?.textContent?.trim();

    if (!prompt) {
      showToast("The prompt pivoted before it could be copied.");
      return;
    }

    try {
      await navigator.clipboard.writeText(`PARODY / SATIRE PROMPT\n\n${prompt}`);
      showToast("Parody prompt copied. Generational screenshots are now inevitable.");
    } catch {
      showToast("Clipboard funding round failed. Please copy the prompt manually.");
    }
  });
});
