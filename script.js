document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const toggleMusicBtn = document.getElementById("toggle-music");
  const trackInfo = document.querySelector(".track-info");
  const heartsContainer = document.getElementById("hearts-container");
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const openBtn = document.getElementById("open-btn");
  const heartColors = ["#ff69b4", "#ff1493", "#ff3344", "#ffb6c1", "#ff0055"];

  // Burst Particle (Klik/Tap di layar)
  document.addEventListener("pointerdown", (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("#lightbox-modal")
    )
      return;

    const burstCount = 7;
    for (let i = 0; i < burstCount; i++) {
      const heart = document.createElement("i");
      heart.classList.add("fas", "fa-heart", "burst-particle");

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 90 + 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";
      heart.style.setProperty("--dx", `${dx}px`);
      heart.style.setProperty("--dy", `${dy}px`);
      heart.style.color =
        heartColors[Math.floor(Math.random() * heartColors.length)];

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 700);
    }
  });

  const cursor = document.getElementById("custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) {
    const polaroids = document.querySelectorAll(".tilt-effect");
    polaroids.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = -12 + (x / rect.width) * 24;
        const rotateX = 12 - (y / rect.height) * 24;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
        card.style.boxShadow = `0 15px 35px rgba(255, 20, 147, 0.2)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });
  }

  // === NEW: FULLSCREEN LIGHTBOX LOGIC ===
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox) {
    // Buka gambar saat polaroid diklik
    document.querySelectorAll(".polaroid").forEach((card) => {
      card.addEventListener("click", () => {
        const imgElement = card.querySelector("img");
        const captionElement = card.querySelector(".caption");

        // Ambil source foto asli
        lightboxImg.src = imgElement.src;
        lightboxCaption.innerText = captionElement.innerText;

        lightbox.classList.remove("hidden");
        setTimeout(() => lightbox.classList.add("active"), 10);
      });
    });

    // Tutup saat tombol X ditekan
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      setTimeout(() => lightbox.classList.add("hidden"), 300);
    });

    // Tutup saat area gelap di luar foto ditekan
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        setTimeout(() => lightbox.classList.add("hidden"), 300);
      }
    });
  }

  // Typewriter
  const typewriterElement = document.getElementById("typewriter-text");
  if (typewriterElement) {
    const textToType = "1st Month Anniversary";
    let charIndex = 0;

    function typeWriter() {
      if (charIndex < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 110);
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mainContent.classList.contains("hidden") && charIndex === 0) {
          setTimeout(typeWriter, 600);
        }
      });
    });
    observer.observe(mainContent, {
      attributes: true,
      attributeFilter: ["class"],
    });
    if (!introScreen) setTimeout(typeWriter, 600);
  }

  const letterLines = document.querySelectorAll(".reveal-line");
  if (letterLines.length > 0) {
    setTimeout(() => {
      letterLines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add("fade-in-line");
        }, index * 1100);
      });
    }, 400);
  }

  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const letterMenu = document.getElementById("letter-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  if (menuToggleBtn && letterMenu && closeMenuBtn) {
    menuToggleBtn.addEventListener("click", () => {
      letterMenu.classList.remove("hidden");
      setTimeout(() => letterMenu.classList.add("active"), 15);
    });
    closeMenuBtn.addEventListener("click", () => {
      letterMenu.classList.remove("active");
      setTimeout(() => letterMenu.classList.add("hidden"), 350);
    });
  }

  const musicPlayingStatus = localStorage.getItem("musicPlaying");
  const musicCurrentTime = localStorage.getItem("musicTime");
  const isUnlocked = localStorage.getItem("siteUnlocked");

  if (musicCurrentTime) bgMusic.currentTime = parseFloat(musicCurrentTime);
  bgMusic.volume = 0.4;

  if (introScreen) {
    if (isUnlocked === "true") {
      introScreen.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("fade-in");
      autoPlayLogic();
    } else {
      openBtn.addEventListener("click", () => {
        introScreen.style.opacity = "0";
        introScreen.style.visibility = "hidden";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("fade-in");

        localStorage.setItem("siteUnlocked", "true");
        localStorage.setItem("musicPlaying", "true");
        bgMusic.play();
        updateUIState(true);
      });
    }
  } else {
    autoPlayLogic();
  }

  function autoPlayLogic() {
    if (musicPlayingStatus === "true" || musicPlayingStatus === null) {
      bgMusic
        .play()
        .then(() => updateUIState(true))
        .catch(() => {
          updateUIState(false);
          localStorage.setItem("musicPlaying", "false");
        });
    } else {
      updateUIState(false);
    }
  }

  bgMusic.addEventListener("timeupdate", () =>
    localStorage.setItem("musicTime", bgMusic.currentTime),
  );

  toggleMusicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      localStorage.setItem("musicPlaying", "true");
      updateUIState(true);
    } else {
      bgMusic.pause();
      localStorage.setItem("musicPlaying", "false");
      updateUIState(false);
    }
  });

  function updateUIState(isPlaying) {
    if (isPlaying) {
      toggleMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      trackInfo.classList.add("playing");
    } else {
      toggleMusicBtn.innerHTML = '<i class="fas fa-play"></i>';
      trackInfo.classList.remove("playing");
    }
  }

  setInterval(createHeart, 500);

  function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart", "heart-shape");

    const size = Math.random() * 1.1 + 0.5;
    const leftPosition = Math.random() * 100;
    const duration = Math.random() * 4 + 6;
    const randomColor =
      heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.style.fontSize = `${size}rem`;
    heart.style.left = `${leftPosition}vw`;
    heart.style.color = randomColor;
    heart.style.animationDuration = `${duration}s`;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }
});
