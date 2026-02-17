


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});


/* ================= SKILLS STAGGER ANIMATION ================= */

const skillCards = document.querySelectorAll("#skills .card-hover");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 120);
    }
  });
}, { threshold: 0.2 });

skillCards.forEach(card => skillObserver.observe(card));


/* ================= SECTION REVEAL ================= */

const sections = document.querySelectorAll(".reveal");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      const items = entry.target.querySelectorAll(".reveal-item");

      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("active");
        }, index * 150);
      });
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));


/* ================= SLIDE ANIMATION ================= */

const slideElements = document.querySelectorAll(".slide-left, .slide-right, .slide-up");

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

slideElements.forEach(el => slideObserver.observe(el));


/* ================= NAV ACTIVE + PROGRESS BAR ================= */

const sectionsForNav = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

  let current = "";

  sectionsForNav.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});


/* ================= LOADER ================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 800);
});


/* ================= RIPPLE EFFECT ================= */

document.querySelectorAll(".ripple").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.offsetX - radius}px`;
    circle.style.top = `${e.offsetY - radius}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});


/* ================= MAGNETIC HOVER ================= */

document.querySelectorAll(".card-hover").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

});


/* ================= THEME TOGGLE (WITH SAVE) ================= */

const toggleBtn = document.getElementById("theme-toggle");
const body = document.getElementById("theme-body");

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  toggleBtn.textContent = "☾";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    toggleBtn.textContent = "☾";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "☼";
    localStorage.setItem("theme", "dark");
  }
});

/* ================= CONTACT FORM API ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    if (message.length < 5) {
      alert("Message must contain at least 5 characters.");
      return;
    }

    

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      // if (data.success) {
      //   alert("Message sent successfully 🚀");
      // } else if (data.errors) {
      //   alert(data.errors[0].msg);
      // } else {
      //   alert("Something went wrong");
      // }
      
      if (data.success) {
        contactForm.reset();

        const modal = document.getElementById("successModal");
        const box = document.getElementById("successBox");

        modal.classList.remove("hidden");
        modal.classList.add("flex");

        setTimeout(() => {
          box.classList.remove("scale-90", "opacity-0");
          box.classList.add("scale-100", "opacity-100");
        }, 100);

        setTimeout(() => {
          closeSuccessModal();
        }, 4000);
        } else {
          alert("Something went wrong");
        }
      




    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  });
}


function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  const box = document.getElementById("successBox");

  box.classList.remove("scale-100", "opacity-100");
  box.classList.add("scale-90", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 400);
}

document.getElementById("closeSuccess").addEventListener("click", closeSuccessModal);
