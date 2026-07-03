document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CORE ELEMENTS SETUP
  // ==========================================
  const bgMusic = document.getElementById("bg-music");
  const toggleMusicBtn = document.getElementById("toggle-music");
  const trackInfo = document.querySelector(".track-info");
  const heartsContainer = document.getElementById("hearts-container");
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const openBtn = document.getElementById("open-btn");
  const heartColors = ["#ff69b4", "#ff1493", "#ff3344", "#ffb6c1", "#ff0055"];

  // ==========================================
  // 2. NATIVE TOUCH/CLICK BURST PARTICLES
  // ==========================================
  document.addEventListener("pointerdown", (e) => {
    // Jangan ledakkan hati kalau klik tombol atau modal agar tidak mengganggu UI
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
      const distance = Math.random() * 90 + 30; // Premium spread
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

  // ==========================================
  // 3. MAGIC HEART CURSOR TRAIL
  // ==========================================
  const cursor = document.getElementById("custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  // ==========================================
  // 4. ADAPTIVE 3D TILT EFFECT (DESKTOP ONLY)
  // ==========================================
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

  // ==========================================
  // 5. FULLSCREEN LIGHTBOX (GALLERY)
  // ==========================================
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox) {
    document.querySelectorAll(".polaroid").forEach((card) => {
      card.addEventListener("click", () => {
        const imgElement = card.querySelector("img");
        const captionElement = card.querySelector(".caption");

        lightboxImg.src = imgElement.src;
        lightboxCaption.innerText = captionElement.innerText;

        lightbox.classList.remove("hidden");
        setTimeout(() => lightbox.classList.add("active"), 10);
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      setTimeout(() => lightbox.classList.add("hidden"), 300);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        setTimeout(() => lightbox.classList.add("hidden"), 300);
      }
    });
  }

  // ==========================================
  // 6. HOME HERO TYPEWRITER
  // ==========================================
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

  // ==========================================
  // 7. LONG LETTER SEQUENTIAL TYPEWRITER
  // ==========================================
  const letterContainer = document.getElementById(
    "typewriter-letter-container",
  );
  if (letterContainer) {
    const letterParagraphs = [
      "Happy 1st month anniversary, my favorite person! ❤️",
      "Satu bulan ini mungkin terdengar singkat bagi sebagian orang, tapi buat aku, bulan ini adalah salah satu chapter terbaik dalam hidupku. Waktu rasanya berjalan cepat banget kalau aku lagi sama kamu.",
      "Tapi di saat yang sama, setiap detik bersamamu terasa begitu bermakna. Sama seperti lagu yang lagi main sekarang—there's something about you yang selalu berhasil bikin aku tersenyum setiap kali nama kamu muncul di layar HP-ku.",
      "Aku perhatiin akhir-akhir ini kamu lagi banyak pikiran dan mungkin lelah. Aku tahu kadang hidup bisa terasa berat, capek, dan mungkin nggak setiap hari berjalan sesuai dengan apa yang kamu rencanakan.",
      "Kadang kamu mungkin merasa kewalahan dan mulai meragukan diri sendiri. Tapi aku mau kamu tahu satu hal penting: You are doing amazing.",
      "Kamu itu hebat, kamu tangguh, dan aku akan selalu bangga sama kamu. Apapun yang lagi kamu kejar, apapun yang lagi kamu hadapi sekarang, tolong jangan pernah merasa sendirian ya?",
      "Aku akan selalu ada di sini buat jadi pendengar yang baik, tempat bersandar saat kamu capek, dan supporter nomor satu kamu di garis paling depan.",
      "Tolong jangan lupa istirahat, makan yang teratur, dan jangan terlalu keras sama diri sendiri. Kamu pantas mendapatkan semua hal baik dan kebahagiaan di dunia ini.",
      "Terima kasih udah kasih aku kesempatan buat jadi bagian dari hari-harimu, jadi alasan senyummu, dan jadi tempat kamu berbagi banyak cerita.",
      "Semoga ini bukan cuma soal satu bulan pertama, tapi menjadi awal dari sangat banyak bulan dan tahun yang penuh dengan petualangan dan memori indah bareng kita.",
      "Keep shining, keep being the amazing person you are. I love you more than words can say! ✨",
      "With all my heart,",
      "Leonard",
    ];

    let currentPara = 0;
    let currentChar = 0;
    let currentElement = null;

    function typeLetter() {
      if (currentPara < letterParagraphs.length) {
        if (currentChar === 0) {
          currentElement = document.createElement("p");
          currentElement.className = "letter-para typing-cursor";

          if (currentPara === letterParagraphs.length - 1) {
            currentElement.classList.add("signature");
          } else if (currentPara === letterParagraphs.length - 2) {
            currentElement.classList.add("sign-off");
          }

          letterContainer.appendChild(currentElement);
        }

        if (currentChar < letterParagraphs[currentPara].length) {
          currentElement.textContent +=
            letterParagraphs[currentPara].charAt(currentChar);
          currentChar++;

          let typeSpeed = Math.random() * 30 + 20;

          const lastChar = letterParagraphs[currentPara].charAt(
            currentChar - 1,
          );
          if ([".", "!", "?"].includes(lastChar)) typeSpeed += 400;
          if ([",", ":"].includes(lastChar)) typeSpeed += 200;

          setTimeout(typeLetter, typeSpeed);
        } else {
          currentElement.classList.remove("typing-cursor");
          currentPara++;
          currentChar = 0;
          setTimeout(typeLetter, 800);
        }
      }
    }

    setTimeout(typeLetter, 1000);
  }

  // ==========================================
  // 8. APP OVERLAY MENU NAVIGATION
  // ==========================================
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

  // ==========================================
  // 9. MULTI-PAGE MUSIC SYNCHRONIZATION
  // ==========================================
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

  // ==========================================
  // 10. BACKGROUND FLOATING HEARTS
  // ==========================================
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
