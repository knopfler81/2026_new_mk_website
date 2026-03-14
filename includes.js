async function loadIncludes() {
  try {
    const headerTarget = document.getElementById("site-header");
    const footerTarget = document.getElementById("site-footer");

    if (headerTarget) {
      const headerResponse = await fetch("header.html");
      if (!headerResponse.ok) {
        throw new Error("Impossible de charger header.html");
      }
      headerTarget.innerHTML = await headerResponse.text();
    }

    if (footerTarget) {
      const footerResponse = await fetch("footer.html");
      if (!footerResponse.ok) {
        throw new Error("Impossible de charger footer.html");
      }
      footerTarget.innerHTML = await footerResponse.text();
    }

    const isMobileMenu = () => window.matchMedia("(max-width: 780px)").matches;

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("menu");
    const navigation = nav ? nav.querySelector(".navigation") : null;

    if (toggle && nav) {
      toggle.addEventListener("click", function (e) {
        if (!isMobileMenu()) return;

        e.preventDefault();
        e.stopPropagation();

        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));

        if (!open) {
          nav.querySelectorAll("li.open").forEach(function (li) {
            li.classList.remove("open");
          });
        }
      });
    }

    if (navigation) {
      navigation.addEventListener("click", function (e) {
        if (!isMobileMenu()) return;

        const link = e.target.closest("a");
        if (!link) return;

        const item = link.parentElement;
        if (!item || item.tagName !== "LI") return;

        const submenu = Array.from(item.children).find(function (child) {
          return child.tagName === "UL";
        });

        if (!submenu) return;

        e.preventDefault();
        e.stopPropagation();

        const isOpen = item.classList.contains("open");

        Array.from(item.parentElement.children).forEach(function (sibling) {
          if (sibling !== item) {
            sibling.classList.remove("open");
            sibling.querySelectorAll("li.open").forEach(function (sub) {
              sub.classList.remove("open");
            });
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          item.querySelectorAll("li.open").forEach(function (sub) {
            sub.classList.remove("open");
          });
        } else {
          item.classList.add("open");
        }
      });
    }

    document.addEventListener("click", function (e) {
      if (!isMobileMenu()) return;
      if (nav && !nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        nav.querySelectorAll("li.open").forEach(function (li) {
          li.classList.remove("open");
        });
      }
    });
  } catch (error) {
    console.error("Erreur includes :", error);
  }
}

loadIncludes();