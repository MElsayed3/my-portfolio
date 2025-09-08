
// Hero animation on load
    window.addEventListener("load", () => {
      const hero = document.querySelector("#home");
      hero.classList.add("fade-down");
    });


document.addEventListener("DOMContentLoaded", () => {
  //nav active link selector
const navLinks = document.querySelectorAll(".nav-link a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // remove active color from all parents
    navLinks.forEach(l => l.parentElement.classList.remove("bg-blue-700"));

    // add active color to the parent of the clicked <a>
    link.parentElement.classList.add("bg-blue-700");
  });

});




//scrolling changing the color of nav items


  const observeSectionScroll = () => {
  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.offsetHeight : 0;
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link a"));

  if (!sections.length || !navLinks.length) return;

  // Helper: set active class on the correct .nav-link parent
  function setActive(id) {
    navLinks.forEach(a => {
      a.parentElement.classList.toggle("bg-blue-700", a.getAttribute("href") === `#${id}`);
    });
  }

  // Click behavior: mark clicked item active immediately
  navLinks.forEach(a => {
    a.addEventListener("click", () => {
      setActive(a.getAttribute("href").slice(1));
    });
  });

  // If IntersectionObserver supported -> robust ratio-based approach
  if ("IntersectionObserver" in window) {
    // initialize ratios object
    const ratios = {};
    sections.forEach(s => ratios[s.id] = 0);

    // many thresholds to get fine-grained intersectionRatio updates
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver((entries) => {
      // update ratios for changed entries
      entries.forEach(entry => {
        ratios[entry.target.id] = entry.intersectionRatio;
      });

      // pick the id with the highest ratio
      const bestId = Object.keys(ratios).reduce((best, id) => {
        return (ratios[id] > (ratios[best] ?? -1)) ? id : best;
      }, sections[0].id);

      setActive(bestId);
    }, {
      root: null,
      // offset for sticky navbar (top) and make detection earlier/later with bottom offset
      rootMargin: `-80px 0px 0px 0px`,
      threshold: 0.2
    });

    sections.forEach(s => observer.observe(s));
    return;
  }

  // Fallback: requestAnimationFrame-based scroll check
  let ticking = false;
  function onScrollUpdate() {
    const fromTop = window.scrollY + navHeight + 8; // small offset
    let current = sections[0].id;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (fromTop >= top && fromTop < bottom) {
        current = section.id;
      }
    });
    setActive(current);
  }

  document.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScrollUpdate();
        ticking = false;
      });
      ticking = true;
    }
  });

  }
  
  observeSectionScroll();

  //end of changing the color of nav items on scrolling


  const cards = document.querySelectorAll(".fade-scroll");

    const observercard = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observercard.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observercard.observe(card));



    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    let isOpen = false;

    btn.addEventListener("click", () => {
      if (!isOpen) {
        menu.classList.remove("hidden", "menu-close");
        menu.classList.add("menu-open");
        isOpen = true;
      } else {
        menu.classList.remove("menu-open");
        menu.classList.add("menu-close");
        setTimeout(() => {
          menu.classList.add("hidden");
          menu.classList.remove("menu-close");
        }, 300);
        isOpen = false;
      }
    });

   
    // Fade-in on scroll
    const fadeElems = document.querySelectorAll(".fade-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });
    fadeElems.forEach(el => observer.observe(el));



    // Service cards fade-in
    const services = document.querySelectorAll(".fade-service");

  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer1.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.2 });

  services.forEach(service => observer1.observe(service));

});


