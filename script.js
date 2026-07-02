window.addEventListener("load", () => {

    /* =========================
    🌸 INTRO SYSTEM
    ========================= */

    const intro = document.getElementById("intro");
    const app = document.getElementById("app");

    const today = new Date().toDateString();
    const lastSeen = localStorage.getItem("introDate");

    const showIntro = lastSeen !== today;

    if (intro) {
        if (showIntro) {

            setTimeout(() => {

                intro.style.opacity = "0";

                setTimeout(() => {
                    intro.remove();

                    if (app) app.style.opacity = "1";

                    localStorage.setItem("introDate", today);
                }, 900);

            }, 2500);

        } else {
            intro.remove();
            if (app) app.style.opacity = "1";
        }
    }

    /* =========================
    🌸 CARD ANIMATION
    ========================= */

    const cards = document.querySelectorAll(".card");

    if (cards && cards.length) {

        cards.forEach((card, index) => {

            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";

            setTimeout(() => {
                card.style.transition = "0.5s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 80);

        });
    }

});


/* =========================
🌸 MUSIC SYSTEM
========================= */

const music = document.getElementById("music");
const btn = document.getElementById("music-btn");

let isPlaying = false;

if (music && btn) {

    btn.addEventListener("click", async () => {

        if (!isPlaying) {

            music.volume = 0.4;

            try {
                await music.play();
                btn.innerText = "⏸ Pause";
                isPlaying = true;
            } catch (err) {
                console.warn("Autoplay blocked");
            }

        } else {

            music.pause();
            btn.innerText = "🎵 Music";
            isPlaying = false;
        }
    });
}


/* =========================
🌸 ANIME SYSTEM (SAFE + FILE-BASED READY)
========================= */

function toggleAnime(name) {

    const box = document.getElementById("anime-detail");
    if (!box) return;

    // اگر همون قبلی کلیک شد → ببند
    if (box.dataset.current === name) {
        box.style.display = "none";
        box.dataset.current = "";
        box.innerHTML = "";
        return;
    }

    // 👇 اینجا دیگه یا template یا fallback فایل جدا
    const templates = {
        demon: document.getElementById("demon-template"),
        jojo: document.getElementById("jojo-template"),
        castlevania: document.getElementById("castlevania-template"),
        drstone: document.getElementById("drstone-template")
    };

    const selected = templates[name];

    // ❌ اگر template وجود نداشت → برو صفحه جدا
    if (!selected) {
        window.location.href = `${name}.html`;
        return;
    }

    // ✔️ اگر template وجود داشت
    box.innerHTML = selected.innerHTML;
    box.style.display = "block";
    box.dataset.current = name;
}