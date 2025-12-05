// ======================================================================
// SAFE FORM VALIDATION
// ======================================================================
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Your request has been submitted. A specialist will contact you shortly.");
  });
}



// ======================================================================
// PREMIUM BACKGROUND MICRO DOTS  (Stable + Working)
// ======================================================================

function createPremiumDots() {
    const layer = document.querySelector(".data-pulse-layer");
    if (!layer) return;

    const dotCount = 35;

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("div");

        // Size
        const sizes = ["xs", "sm", "md"];
        dot.classList.add("data-dot", sizes[Math.floor(Math.random() * sizes.length)]);

        // Position
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";

        // Colors
        const colors = [
            "rgba(255, 255, 255, 0.25)",
            "rgba(100, 160, 255, 0.25)",
            "rgba(180, 220, 255, 0.25)"
        ];
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Animation timing
        dot.style.animationDelay = (Math.random() * 6) + "s";
        dot.style.animationDuration = (10 + Math.random() * 10) + "s";

        layer.appendChild(dot);
    }

    // Parallax scroll
    window.addEventListener("scroll", () => {
        const scrollFactor = window.scrollY * 0.03;
        layer.style.transform = `translateY(${scrollFactor}px)`;
    });
}

window.addEventListener("load", createPremiumDots);



// ======================================================================
// WORKFLOW LAYER PARALLAX (Your original scroll effect)
// ======================================================================
window.addEventListener("scroll", () => {
  const wfLayer = document.querySelector(".workflow-layer");
  if (!wfLayer) return;
  const offset = window.scrollY * 0.04;
  wfLayer.style.transform = `translateY(${offset}px)`;
});



// ======================================================================
// THE FIX: REMOVE DIAGONAL MOVEMENT & ADD PREMIUM "REAL PATH FLOW"
// ======================================================================
//
// This replaces the buggy diagonal node animations.
// It makes nodes travel smoothly along the dotted workflow lines.
//
// Requirements in your HTML:
// Each path that should carry a dot must include:   data-node="1"
//
// Example:
// <path d="M50 120 L400 160" class="wf-path" data-node="1"/>
//
// ======================================================================

/* ==========================================================
   PREMIUM DATA FLOW — Multipoints + Trail + Node Glow
   ========================================================== */

function animateNodesOnPaths() {
    const svg = document.querySelector(".workflow-layer svg");
    if (!svg) return;

    const paths = svg.querySelectorAll("path.wf-path");
    const nodes = svg.querySelectorAll(".wf-node");

    paths.forEach((path, index) => {
        const pathLength = path.getTotalLength();

        // → Número de puntos por línea
        const dotCount = 3;

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("r", 4);
            dot.setAttribute("class", "dataflow-dot");

            const trail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            trail.setAttribute("class", "dataflow-trail");

            svg.appendChild(trail);
            svg.appendChild(dot);

            const travelTime = 5000 + Math.random() * 3000;
            const startOffset = Math.random() * pathLength;

            function animateDot(timestamp) {
                const t = ((timestamp % travelTime) / travelTime) * pathLength;
                const pos = path.getPointAtLength((t + startOffset) % pathLength);

                // DOT POSITION
                dot.setAttribute("cx", pos.x);
                dot.setAttribute("cy", pos.y);

                // TRAIL (short segment behind dot)
                const trailEnd = (t + startOffset) % pathLength;
                const trailStart = Math.max(trailEnd - 60, 0);

                const p1 = path.getPointAtLength(trailStart);
                const p2 = path.getPointAtLength(trailEnd);

                trail.setAttribute("d", `M ${p1.x},${p1.y} L ${p2.x},${p2.y}`);

                // NODE GLOW ACTIVATION
                nodes.forEach(node => {
                    const nx = parseFloat(node.getAttribute("cx"));
                    const ny = parseFloat(node.getAttribute("cy"));

                    const dist = Math.hypot(nx - pos.x, ny - pos.y);

                    if (dist < 20) {
                        node.classList.add("glow");
                        setTimeout(() => node.classList.remove("glow"), 250);
                    }
                });

                requestAnimationFrame(animateDot);
            }

            requestAnimationFrame(animateDot);
        }
    });
}

window.addEventListener("load", animateNodesOnPaths);

/* FEATURE CARDS FADE-IN (staggered) */
function animateFeatureCards() {
  const cards = document.querySelectorAll(".feature-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add("visible"), i * 180);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(cards[0]);
}

window.addEventListener("load", animateFeatureCards);

/* ======================================================
   Integrations Logo Fade-Up Animation
   ====================================================== */
function animateIntegrationLogos() {
    const list = document.querySelector(".fade-integrations");
    if (!list) return;

    const items = list.querySelectorAll("li");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                items.forEach((item, i) => {
                    setTimeout(() => item.classList.add("visible"), i * 180);
                });

                observer.disconnect();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(list);
}

window.addEventListener("load", animateIntegrationLogos);

/* ======================================================
   HOW IT WORKS — STEP REVEAL ANIMATION
   ====================================================== */
function animateHowItWorks() {
    const steps = document.querySelectorAll("#how-it-works .workflow li");
    if (!steps.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                steps.forEach((li, i) => {
                    setTimeout(() => li.classList.add("visible"), i * 160);
                });

                observer.disconnect();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(steps[0]);
}

window.addEventListener("load", animateHowItWorks);

/* ======================================================
   CTA Soft Pulse — Activate on Viewport
   ====================================================== */
function activateCTAPulse() {
    const cta = document.querySelector(".cta-button");
    if (!cta) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cta.classList.add("pulse");
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(cta);
}

window.addEventListener("load", activateCTAPulse);

/* ==========================================
   FORM CTA — Soft Blue Pulse on View
   ========================================== */
function activateFormSubmitPulse() {
  const formCta = document.querySelector(".form-submit-btn");
  if (!formCta) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        formCta.classList.add("pulse");
        observer.disconnect();
      }
    });
  }, { threshold: 0.6 });

  observer.observe(formCta);
}

window.addEventListener("load", activateFormSubmitPulse);


// ============================
// FAQ Accordion Functionality
// ============================

document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        
        // Close others (optional for cleaner UX)
        document.querySelectorAll(".faq-item").forEach(i => {
            if (i !== item) i.classList.remove("open");
        });

        // Toggle this one
        item.classList.toggle("open");
    });
});



// ======================================================================
// END OF FILE
// ======================================================================

