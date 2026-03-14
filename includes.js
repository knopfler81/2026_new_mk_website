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

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#menu");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    document.querySelectorAll(".navigation > li").forEach((item) => {
      const trigger = item.querySelector(":scope > a, :scope > button");

      if (trigger && item.querySelector("ul")) {
        trigger.addEventListener("click", (e) => {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            item.classList.toggle("open");
          }
        });
      }
    });
  } catch (error) {
    console.error("Erreur includes :", error);
  }
}

loadIncludes();