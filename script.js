document.body.classList.add("is-loading");

const releaseLoader = () => {
  document.body.classList.add("is-ready");
  document.body.classList.remove("is-loading");
};

window.addEventListener("load", () => {
  window.setTimeout(releaseLoader, 1100);
});

window.setTimeout(releaseLoader, 2600);

const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (supportsFinePointer.matches) {
  const cards = document.querySelectorAll(".js-tilt-card");

  const resetCard = (card) => {
    card.classList.remove("is-tilting");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--ix", "0px");
    card.style.setProperty("--iy", "0px");
    card.style.setProperty("--ax", "0px");
    card.style.removeProperty("--glow-x");
    card.style.removeProperty("--glow-y");
  };

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const tiltY = (px - 0.5) * 10;
      const tiltX = (0.5 - py) * 8;

      card.classList.add("is-tilting");
      card.style.setProperty("--rx", `${tiltX}deg`);
      card.style.setProperty("--ry", `${tiltY}deg`);
      card.style.setProperty("--ix", `${(px - 0.5) * 6}px`);
      card.style.setProperty("--iy", `${(py - 0.5) * 5}px`);
      card.style.setProperty("--ax", `${(px - 0.5) * 8}px`);
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    });

    card.addEventListener("pointerleave", () => resetCard(card));
    card.addEventListener("blur", () => resetCard(card));
  });
}

const installAppButton = document.getElementById("installAppButton");
let deferredInstallPrompt = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;

  if (installAppButton) {
    installAppButton.hidden = false;
  }
});

if (installAppButton) {
  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installAppButton.hidden = true;
  });
}

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;

  if (installAppButton) {
    installAppButton.hidden = true;
  }
});
